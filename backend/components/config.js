const conn_omc =  ({
    user: 'postgres',
    host: 'localhost',
    database: 'pet_omc',
    password: 'masterpas',
    port: 5432,
    max: 3
});

const key_256 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    29, 30, 31];

const iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,35, 36 ];

const mailConf = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: '',
      pass: '',
    },
  };

module.exports.conn_omc = conn_omc;
module.exports.key_256 = key_256;
module.exports.iv = iv;
module.exports.mailConf = mailConf;

