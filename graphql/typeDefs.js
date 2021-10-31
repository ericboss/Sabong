


module.exports =  `
input  RegisterInput {

    firstName: String!
    lastName: String!
    username: String!
    email: String!
    phoneNumber: String!
    password: String!
    confirmPassword: String!
    role: String!
    referralCode: String,
    
   
}
type User{
    id: ID!
    email: String!
    token: String!
    createdAt: String!
    username: String
    walletPoints: Int!
    role: String!
    status: String!
    commisionPoints: Int!


}
input WalletInput{
    transactionType: String!
    usernameReferree:  String!
    amount: Int!
    detail: String
}
type Wallet{
    Amount: Int!
    transactionId: String!
    transactionType: String!
    detail: String
    createdAt: String!
}
type Commission{
    Amount: Int!
    transactionId: String!
    transactionType: String!
    detail: String
    createdAt: String!
}
input CashOut{
    usernameReferree: String!
    amount: Int!
    detail: String
}
type WithdrawalRequests{
    user: String!
    WithdrawalRequestAmount: Int!
    WidthrawalRequestStatus: String!
    role: String!
    createdAt: String!
}
type Query {
    listForApproval: [User]!
    listActivePlayers: [User]!
    listAgents: [User]!
    getReferreeCurrentWallet(userId: ID!): Int!
    getUserCurrentWallet: Int!
    getWalletLogs: [Wallet]!
    getTopCommissions: [User]!
    getReferreeCurrentCommisionPoints(userId:ID!): Int!
    getUserCurrentCommisionPoints: Int!
    getCommissionLogs: [Commission]!
    listWithdrawalRequests: [User]
}
type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String! password: String!): User!
    activatePlayer(userId: ID!): User!
    convertToAgent(userId: ID!): User!
    walletTransaction(walletInput: WalletInput!): User!
    updateCommisions(userId: ID! , playerBetWon: Int!): String!
    commisionCashOut(CashOutInput: CashOut ): Commission!
    WithdrawalRequest(amount : Int!): WithdrawalRequests! 
    widthrawfunds(userId:String, amount:Int): String!
    

 
}


`