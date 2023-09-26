const db = require("../models");
const kyUserTbl = db.user;
const Op = db.Sequelize.Op;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const postInsertData = async (reqbody, result) => {
  try {
    // Validate request
    if (!reqbody.username || !reqbody.email || !reqbody.password) {
      result({
        Status: "Failure",
        Msg: "Mandatory fields (userName, userEmail, userPwd) missing",
        StatusCode: 400,
        ID: 0,
        Records: [],
      });
      return;
    }

    // Check if username or email already exists
    const existingUser = await kyUserTbl.findOne({
      where: {
        [db.Sequelize.Op.or]: [
          { username: reqbody.username },
          { email: reqbody.email },
        ],
      },
    });

    if (existingUser) {
      result({
        Status: "Failure",
        Msg: "Username or email already in use",
        StatusCode: 400,
        ID: 0,
        Records: [],
      });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(reqbody.password, 10); // 10 is the number of salt rounds

    // Get Max id + 1
    // Since userId is not auto increment. I am incrementing manually.
    const maxId = await kyUserTbl.findAll({
      attributes: [[db.Sequelize.fn("max", db.Sequelize.col("id")), "id"]],
      raw: true,
    });
    let maxIdPlusOne = maxId[0].id ? maxId[0].id + 1 : 1;

    // Create a User
    const payload = {
      id: maxIdPlusOne,
      username: reqbody.username,
      email: reqbody.email,
      password: hashedPassword,
      // isActive: reqbody.isActive ? reqbody.isActive : true
    };

    // Save in the database
    const RetData = await kyUserTbl
      .create(payload)
      .then((data) => {
        delete data.dataValues.createdAt;
        delete data.dataValues.updatedAt;
        delete data.dataValues.password;
        result({
          Status: "Success",
          Msg: "Data saved successfully",
          StatusCode: 200,
          ID: 0,
          Records: data.dataValues,
        });
      })
      .catch((err) => {
        result({
          Status: "Failure",
          Msg: err.message || "Some error occurred while creating the user",
          StatusCode: 400,
          ID: 0,
          Records: [],
        });
      });
  } catch (error) {
    result({
      Status: "Failure",
      Msg: "Error: " + error.message,
      StatusCode: 400,
      ID: 0,
      Records: [],
    });
    return;
  }
};


const signIn = async (reqbody, result) => {
    try {
      if (!reqbody.username || !reqbody.email || !reqbody.password) {
        result({
          Status: "Failure",
          Msg: "Mandatory fields (userName, userEmail, userPwd) missing",
          StatusCode: 400,
          ID: 0,
          Records: [],
        });
        return;
      }
  
      //  Find the user by username and email
      const user = await kyUserTbl.findOne({
        where: {
          username: reqbody.username,
          email: reqbody.email,
        },
      });
  
      // Check if the user exists
      if (!user) {
        result({
          Status: "Failure",
          Msg: "User not found",
          StatusCode: 400,
          ID: 0,
          Records: [],
        });
        return;
      }
  
      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(reqbody.password, user.password);
  
      if (!passwordMatch) {
        result({
          Status: "Failure",
          Msg: "Password incorrect",
          StatusCode: 400,
          ID: 0,
          Records: [],
        });
        return;
      }
  
    //   If the username and password are correct, create a JWT token
      const token = jwt.sign({ userId: user.id }, "your-secret-key", {
        expiresIn: "1h",
      });

  
      result({
        Status: "Success",
        Msg: "Signin successful",
        StatusCode: 200,
        ID: 0,
        Records: {
          username: user.username, // Include only the username in the response
          token, // Include the token in the response
        },
      });
  
    } catch (error) {
      result({
        Status: "Failure",
        Msg: "Error: " + error.message,
        StatusCode: 400,
        ID: 0,
        Records: [],
      });
    }
  };


  const getDataByQuery = async (reqQuery, result) => {
    try {
        //matching exact data value
        let searchStr = {};
        if(reqQuery.id) {
            searchStr.id = {
             [Op.eq]: `${reqQuery.id}`
            }
        }
        if(reqQuery.username) {
            searchStr.username = {
             [Op.iLike]: `${reqQuery.username}`
            }
        }

        if(reqQuery.email) {
            searchStr.email = {
             [Op.eq]: `${reqQuery.email}`
            }
        }
        if(reqQuery.isActive) {
            searchStr.isActive = {
             [Op.eq]: `${reqQuery.isActive}`
            }
        }

        const RetData = await kyUserTbl.findAll({ 
                attributes: ['id', 'username', 'email'],
                where: searchStr,
                order: [
                    ['id', 'DESC']
                ]
            })
            .then(data => {
                // This is for esy understanding
                const records = data.map(result => result.dataValues);
                result({
                    'Status': 'Success',
                    'Msg': 'Data fetching successfully',
                    'StatusCode': 200,
                    'ID': 0,
                    'Records': records
                });
            })
            .catch(err => {
                result({
                    'Status': 'Failure',
                    'Msg': err.message || 'Error occured while fetching data',
                    'StatusCode': 400,
                    'ID': 0,
                    'Records': []
                });
                
            });
    } catch (error) {
        result({
            'Status': 'Failure',
            'Msg': "Error: " + error.message,
            'StatusCode': 400,
            'ID': 0,
            'Records': []
        });
        return; 
    }
};
  

module.exports = {
  postInsertData: postInsertData,
  signIn: signIn,
  getDataByQuery: getDataByQuery,
  
};
