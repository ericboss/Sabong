const { roles,statuss } = require('../data');
const checkAuth = require('../../util/check-auth');
const User = require('../models/Users');

module.exports = {

Query:{
    async listAgents(parent, args, context,info){
        
        let firstValue = Object.values(context)[0];
        
        const user = checkAuth(firstValue);
        
        const username = user.username;
        try{
        const referree = User.find({referrer:username, status: statuss.active, role:roles.GoldAgent }).sort({ createdAt: -1 });
        
       return referree
        }catch{
            throw new Error("No Agents found ")  
        }

    },
    async listActivePlayers(parent, args, context,info){
        
        let firstValue = Object.values(context)[0];
        
        const user = checkAuth(firstValue);
        
        const username = user.username;
        try{
        const referree = User.find({referrer:username, status: statuss.active, role:roles.Player }).sort({ createdAt: -1 });
        
       return referree
        }catch{
            throw new Error("No active players")  
        }

    },
    async listForApproval(parent, args, context,info){
        
        let firstValue = Object.values(context)[0];
        
        const user = checkAuth(firstValue);
        
        const username = user.username;
        try{
        const referree = User.find({referrer:username, status: statuss.inactive}).sort({ createdAt: -1 });
        
       return referree
        }catch{
            throw new Error("No inactive players")
        }

    }
},

Mutation: {
    async convertToAgent(_ ,{ userId}, context){
        let firstValue = Object.values(context)[0];
        
        const userRef = checkAuth(firstValue);
        const userRef1 = await User.findById(userRef.id);
        const roleRef = userRef1.role
        const user = await User.findById(userId)
       
       
        if( userRef.username === user.referrer && roleRef === roles.MasterAgent && user.walletPoints ===0 && user.status === statuss.active){
            await User.updateOne({ _id: userId }, {
                role: roles.GoldAgent
              });
            return user  
        }else{
            throw new Error(" You are not allowed to convert this player to an agent")
        }

    },
    async activatePlayer(_ ,{ userId}, context){
        let firstValue = Object.values(context)[0];
        
        const userRef = checkAuth(firstValue);
        const user = await User.findById(userId)
       
        if( userRef.username === user.referrer ){
            await User.updateOne({ _id: userId }, {
                status: statuss.active
              });
            return user  
        }else{
            throw new Error(" You are not allowed to activate a user")
        }

    }
}

}