const { model,Schema } = require('mongoose');

const SourceCommissionSchema = new Schema({
   amount: Number,  // player bet amt
    user: {
        type: Schema.Types.ObjectId,           // authenticated user
        ref: 'users'
    },
    CommissionAmount: Number,                // commission earned
    sourceRole:String,                              // referee role - dp or dp-ga
    createdAt: String,


});

module.exports = model('SourceCommissions', SourceCommissionSchema);