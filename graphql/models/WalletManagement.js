const { model,Schema } = require('mongoose');

const WalletmanagementSchema = new Schema({
    Amount: Number,
    transactionId: String,
    transactionType: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    usernameReferree: String,
    detail: String,
    createdAt: String,


});

module.exports = model('Walletmanagement', WalletmanagementSchema);