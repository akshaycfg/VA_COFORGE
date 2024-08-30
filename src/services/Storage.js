var CryptoJS = require("crypto-js");
var SecureStorage = require("secure-web-storage");

// Secure Storage Global secret key
const SECRET_KEY = "D54XgPI7sTXLAlSQh4Qkg0J8mSHIImt5";

var Storage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, SECRET_KEY);

    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);

    data = data.toString();

    return data;
  },
  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);

    data = data.toString(CryptoJS.enc.Utf8);

    return data;
  }
});

export default Storage;