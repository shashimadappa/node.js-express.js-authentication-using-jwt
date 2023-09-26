const signupService = require('../services/user.service');
const settingsMsg = require('../msgcodes/msgcodes');

// Create Register User
const postInsertData = (req, res) => {
  const body = req.body;;

  return signupService.postInsertData(body, (resData) => {
      if(resData && resData.StatusCode){
          let retMsg = resData;

          if(retMsg.Status && retMsg.Status == "Failure"){ //SQL Error
              res.status(500).json({
                  'success': false,
                  'statusCode': retMsg.StatusCode,
                  'msg': retMsg.Msg,
                  'data': []
              });
          }else {
              if (retMsg.Status == "Success") {
                  res.status(200).json({
                      'success': true,
                      'statusCode': signupMsg.codes.SIGNUP_SAVE_SUCCESS,
                      'msg': signupMsg.message.SIGNUP_SAVE_SUCCESS,
                      'data': [ retMsg.Records ]
                  });
              } else {
                  res.status(200).json({
                      'success': false,
                      'statusCode': signupMsg.codes.SIGNUP_SAVE_ERROR,
                      'msg': signupMsg.message.SIGNUP_SAVE_ERROR,
                      'data': retMsg.Records
                  });
              }
          }
      }else {
          res.status(200).json({
              'success': false,
              'statusCode': signupMsg.codes.SIGNUP_SAVE_ERROR,
              'msg': signupMsg.message.SIGNUP_SAVE_ERROR,
              'data': []
          });
      }
  });
};


const signIn = (req, res) => {
  const body = req.body;;

  return signupService.signIn(body, (resData) => {
      if(resData && resData.StatusCode){
          let retMsg = resData;

          if(retMsg.Status && retMsg.Status == "Failure"){ //SQL Error
              res.status(500).json({
                  'success': false,
                  'statusCode': retMsg.StatusCode,
                  'msg': retMsg.Msg,
                  'data': []
              });
          }else {
              if (retMsg.Status == "Success") {
                  res.status(200).json({
                      'success': true,
                      'statusCode': signupMsg.codes.SIGNUP_SAVE_SUCCESS,
                      'msg': signupMsg.message.SIGNUP_SAVE_SUCCESS,
                      'data': [ retMsg.Records ]
                  });
              } else {
                  res.status(200).json({
                      'success': false,
                      'statusCode': signupMsg.codes.SIGNUP_SAVE_ERROR,
                      'msg': signupMsg.message.SIGNUP_SAVE_ERROR,
                      'data': retMsg.Records
                  });
              }
          }
      }else {
          res.status(200).json({
              'success': false,
              'statusCode': signupMsg.codes.SIGNUP_SAVE_ERROR,
              'msg': signupMsg.message.SIGNUP_SAVE_ERROR,
              'data': []
          });
      }
  });
};

// Retrieve all 
const getDataByQuery = (req, res) => {
  let reqQuery = {
      ...req.query
  };
  return signupService.getDataByQuery(reqQuery, (resData) => {
      if(resData && resData.StatusCode){
          let retMsg = resData;

          if(retMsg.Status && retMsg.Status == "Failure"){ //SQL Error
              res.status(500).json({
                  'success': false,
                  'statusCode': retMsg.StatusCode,
                  'msg': retMsg.Msg,
                  'data': []
              });
          }else {
              if (retMsg && retMsg.Records.length > 0) {
                  let retnObj = {
                      'success': true,
                      'statusCode': settingsMsg.codes.SET_FETCH_SUCCESS.replace("#", "user"),
                      'msg': settingsMsg.message.SET_FETCH_SUCCESS.replace("#", "user"),
                      'data': retMsg.Records
                  };
                  res.status(200).json(retnObj);
              } else {
                  res.status(200).json({
                      'success': false,
                      'statusCode': settingsMsg.codes.SET_NO_DATA_FOUND.replace("#", "user"),
                      'msg': settingsMsg.message.SET_NO_DATA_FOUND.replace("#", "user"),
                      'data': retMsg.Records
                  });
              }
          }
      }else if (resData && resData.Records === null){
          res.status(200).json({
              'success': false,
              'statusCode': settingsMsg.codes.SET_NO_DATA_FOUND.replace("#", "user"),
              'msg': settingsMsg.message.SET_NO_DATA_FOUND.replace("#", "user"),
              'data': []
          });
      }
      else {
          res.status(200).json({
              'success': false,
              'statusCode': settingsMsg.codes.SET_FETCH_ERROR.replace("#", "user"),
              'msg': settingsMsg.message.SET_FETCH_ERROR.replace("#", "user"),
              'data': []
          });
      }
  });
};

module.exports = {
  postInsertData: postInsertData,
  signIn: signIn,
  getDataByQuery: getDataByQuery,

}