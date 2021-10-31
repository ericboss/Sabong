const usersResolvers = require('./users');
const forApprovalResolvers = require('./ForApproval.js');
const walletResolvers = require('./wallet.js');
const commissionResolvers = require('./commisionManagement.js');

module.exports = {

    Mutation:{
        ...usersResolvers.Mutation,
        ...forApprovalResolvers.Mutation,
        ...walletResolvers.Mutation,
        ...commissionResolvers.Mutation,

    },
    Query:{
        ...forApprovalResolvers.Query,
        ...walletResolvers.Query,
        ...commissionResolvers.Query,
    }
}