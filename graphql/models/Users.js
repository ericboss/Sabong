const { model,Schema } = require('mongoose');

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    phoneNumber: String,
    password: String,
    referralCode: String,
    address:String,
    bankAccountDetails: String,
    facebookUserName: String,
    status:Boolean,
    commisionPoints: Number,
    walletPoints: Number,
    gamePoints: Number,
    createdAt: String,
    role: String,
    referrer: String,
    status: String,
   



});

module.exports = model('User', UserSchema);