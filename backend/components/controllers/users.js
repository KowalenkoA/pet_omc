const Users = require('../models/users.js');
const nodemailer = require('nodemailer')
let aesjs = require('aes-js');

const conn = require('../config.js');

const key = conn.key_256;
//const mailConf = conn.mailConf
//const iv = conn.iv;
//----

const encryptText = (str) => {

    let textBytes = aesjs.utils.utf8.toBytes(str);

    let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    let encryptedBytes = aesCtr.encrypt(textBytes);

    let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptedHex);
    return encryptedHex;
}

const decriptData = (str) => {
    let encryptedBytes = aesjs.utils.hex.toBytes(str);

    let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    let decryptedBytes = aesCtr.decrypt(encryptedBytes);

    let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log(decryptedText);
    return (decryptedText)
}

exports.addUser = (req, res) => {
    let email = encryptText(req.body.data.email);
    let phone = encryptText(req.body.data.phone);
    Users.addUser(email, phone, (err) => {
        if (err) {
            console.error(err)
            return res.sendStatus(500);
        }
        return res.sendStatus(200);
    });
}

exports.sendPhone = async (req, res) => {
    let email = encryptText(req.body.data.email);
    let error;
    //let phone = encryptText(req.body.data.phone);
    let phone = '';
    await Users.findPhone(email, (err,docs) => {
        if (err) {
            console.error(err)
            error = err;
        }
        console.log(docs)
        if (docs[0].us_phone){
            phone = docs[0].us_phone
        }
    });
    if (error){
        return res.sendStatus(500);
    }else{
        console.log(phone)
        if (phone === ''){
            return res.sendStatus(404);
        }else{
            phone = decriptData(phone);
            //res.sendStatus(200)
        }
    }
    let testEmailAccount = await nodemailer.createTestAccount();
    const mailConf = {
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testEmailAccount.user,
          pass: testEmailAccount.pass,
        },
      };

    let transporter = nodemailer.createTransport(mailConf);
    let result = await transporter.sendMail({
        from: '"Node js" <nodejs@example.com>',
        to: 'fox94944@yandex.ru.com',
        subject: 'Phone number',
        text: 'Your phone number is:' + phone,
      })
      
      console.log(result)
    return res.sendStatus(200); 
}