const roles = {
    MasterAgent: "Master Agent",
    GoldAgent: "Gold Agent",
    Player: "Player"
 }
 const statuss = {
     inactive: "inactive",
     active: "active"
 }
 const transactionTypes = {
     deposit: "deposit",
     withdrawal: "withdrawal"
 }

 const sourceCommission= {
     GoldAgentPlayers: "Gold Agent Players",
     MasterAgentPlayers: "Master Agent Players"
 }
const WidthrawalRequestStatusData = {
    pending:"pending",
    approved:"approved",
    rejected: "rejected"
}

const setCommissionPercentage = {
    commissionMA: 0.02, 
    commissionGA: 0.01
}
 module.exports = {
     roles,
     statuss,
     transactionTypes,
     sourceCommission,
     WidthrawalRequestStatusData,
     setCommissionPercentage,
 }