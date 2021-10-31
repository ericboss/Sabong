const { model,Schema } = require('mongoose');

const CommissionCashOutSchema = new Schema({
    Amount: Number,
    transactionId: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    usernameReferree: String,
    detail: String,
    createdAt: String,


});

module.exports = model('CommissionCashOut', CommissionCashOutSchema);