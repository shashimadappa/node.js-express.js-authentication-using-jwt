module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "1234",
  DB: "user",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

// module.exports = {
//   HOST: "localhost",
//   USER: "postgres",
//   PASSWORD: "1234",
//   DB: "userauth",
//   dialect: "postgres",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };
