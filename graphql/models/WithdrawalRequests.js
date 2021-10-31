const { model,Schema } = require('mongoose');

const WidthrawalRequestSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,           // authenticated user
        ref: 'users'
    },
    WithdrawalRequestAmount: Number,
    WidthrawalRequestStatus: String,
    role: String,
    createdAt: String,


});

module.exports = model('WidthrawalRequest', WidthrawalRequestSchema);