const Users = require('../models/users.js');
const nodemailer = require('nodemailer')
let aesjs = require('aes-js');

const conn = require('../config.js');

const key = conn.key_256;

//шифруем данные
const encryptText = (str) => {
    let textBytes = aesjs.utils.utf8.toBytes(str);
    let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    let encryptedBytes = aesCtr.encrypt(textBytes);
    let encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);

    return encryptedHex;
}

//дешифруем данные
const decriptData = (str) => {
    let encryptedBytes = aesjs.utils.hex.toBytes(str);
    let aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    let decryptedBytes = aesCtr.decrypt(encryptedBytes);
    let decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);

    return (decryptedText)
}

//отправка на почту
const sendEmail = async (message) => {
    let error;
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
    await transporter.sendMail({
            from: 'Support',
            to: 'Some@googlemail.ru',
            subject: 'Phone number',
            text: 'Your phone number is:' + message,
        }).catch( (err) => {
            error = err;
            console.error(err);
    });
    if (error){
        console.error(error);
        return false;
    }else{
        return true;
    }
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

exports.recovery = async (req, res) => {
    let email = encryptText(req.body.data.email);
    let error;
    let phone = '';
    let send = false;

    await Users.findPhone(email, (err,docs) => {
        if (err) {
            console.error(err)
            error = err;
        }
        if (docs.length > 0){
            phone = docs[0].us_phone
        }
    });

    if (error){
        return res.sendStatus(500);
    }

    if (phone === ''){
        return res.sendStatus(404);
    }else{
        phone = decriptData(phone);
        send = await sendEmail(phone);
    }

    if (!send){
        return res.sendStatus(500);
    }  
    return res.sendStatus(200); 
}

exports.findUser = (req, res) => {
    let email = encryptText(req.body.data.email);
    let phone = encryptText(req.body.data.phone);
    Users.findUser(email, phone, (err,docs) => {
        if (err) {
            console.error(err)
            return res.sendStatus(500);
        }
        if (docs.length > 0){
            return res.sendStatus(200);
        }else{
            return res.sendStatus(400);
        }
        
    });
}