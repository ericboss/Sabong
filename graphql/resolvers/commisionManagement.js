const { roles,statuss,transactionTypes,sourceCommission,setCommissionPercentage } = require('../data');
const checkAuth = require('../../util/check-auth');
const User = require('../models/Users');
const Commission = require('../models/CommissionManagement');
const CommissionLogs = require('../models/SourceCommissions');
var randomstring = require("randomstring");
const { UserInputError } = require('apollo-server');

module.exports = {
    Mutation: {
        async updateCommisions(_,{userId, playerBetWon}, context ){
            let firstValue = Object.values(context)[0];       
            const user = checkAuth(firstValue);
            try {
                // Find user orresponding to ID
                const UserReferee = await User.findById(userId);
                // validates user is a player
                if(UserReferee.role !== roles.Player){
                    throw new Error("User must be a player")
                }
                // updates users wallet based on amount won

                await User.updateOne({ username: UserReferee.username}, {
                    walletPoints: playerBetWon + UserReferee.walletPoints
                  });
                

                const referrer = await User.findOne({ username: UserReferee.referrer});
                // updates commision for masters agent
                if (referrer.role === roles.MasterAgent){
                    const commision = setCommissionPercentage.commissionMA * playerBetWon;
                    const MACommision = referrer.commisionPoints + commision
                    await User.updateOne({ username: UserReferee.referrer}, {
                        commisionPoints: MACommision,
                    

                      });
                      const commissionlogs = new CommissionLogs({
                        amount: playerBetWon,
                        user:referrer._id,
                        CommissionAmount: commision,
                        sourceRole:sourceCommission.MasterAgentPlayers,
                        createdAt: new Date().toISOString(),
                      })
                      const logs = await commissionlogs.save() 

                      return "Successfully Updated";
                }
                // handles commission if referrer is a gold agent
                if(referrer.role === roles.GoldAgent){
                    const GAReferrer = User.findOne({ username: referrer.referrer });
                    const commision = setCommissionPercentage.commissionGA * playerBetWon;
                    const MACommision = GAReferrer.commisionPoints + commision
                    const GACommision = referrer.commisionPoints + commision
                    await User.updateOne({ username: UserReferee.referrer}, {
                        commisionPoints: GACommision,
                       
                      });
                      const commissionlogs = new CommissionLogs({
                        amount: playerBetWon,
                        user:GAReferrer._id,
                        CommissionAmount: commision,
                        sourceRole:sourceCommission.GoldAgentPlayers,
                        createdAt: new Date().toISOString(),
                      })
                      const logs = await commissionlogs.save() 

                      
                      const maref = await User.findOne({ username: GAReferrer.referrer});
                      await User.updateOne({ username: GAReferrer.referrer}, {
                        commisionPoints: MACommision
                      });

                      const commissionlogs1 = new CommissionLogs({
                        amount: playerBetWon,
                        user:maref._id,
                        CommissionAmount: commision,
                        sourceRole:sourceCommission.GoldAgentPlayers,
                        createdAt: new Date().toISOString(),
                      })
                      const logs1 = await commissionlogs1.save() 
                     
                      return "Successfully updated"
                
                }
                
              } catch (err) {
                throw new Error(err);
              }


        },
        async commisionCashOut(_,{ CashOutInput: { usernameReferree,amount,detail } }, context){

            let firstValue = Object.values(context)[0];       
            const user = checkAuth(firstValue);
            const user1 = await User.findById(user.id);
            const userRole = user1.role;
            const username = user.username
            let commisionPoints = user1.commisionPoints;
            
                const userReferree = await User.findOne({ username: usernameReferree});
           
            

            if (userRole !== roles.MasterAgent){
                // validates user is a master agent
                throw new UserInputError("You are not allowed to perform this transaction", {
                    errors : {
                        role: "Only Master Agents can perform this transaction"
                    }
                })
            }
            if (userReferree.status !== statuss.active){
                // validates player or agent  is aactive
                throw new UserInputError("Only active agents can request cashout", {
                    errors : {
                        role: "Only Active players can perform this transaction"
                    }
                })
            }

                if( username !== userReferree.referrer){
                    // validates agent make trasactions for the agents or players he referred
               
                    throw new UserInputError("You are not allowed to perform this transaction", {
                        errors : {
                            referrer: "You can perform this transaction only on the agents you referred"
                        }
                    }) 
                }

                if( userReferree.role !== roles.GoldAgent){
                    // validates agent make trasactions for the agents or players he referred
               
                    throw new UserInputError("You can perform this action only on Gold Agents", {
                        errors : {
                            referrer: "You can perform this action only on Gold Agents"
                        }
                    }) 
                }
                
                



                   // validates agent has enough funds to perform transaction
                    if (amount > commisionPoints){
                        throw new UserInputError("You are do not have enough funds", {
                            errors : {
                                referrer: "You do not have enough funds to perform this transaction"
                            }
                        })  
                    };
                    // validates user has enough funds to perform transaction
                    if (amount > userReferree.commisionPoints){
                        throw new UserInputError("user does not have enough funds", {
                            errors : {
                                referrer: "User does not have enough funds to perform this transaction"
                            }
                        })  
                    };

                   
                      //updates player or agent wallet 
                      await User.updateOne({ username: usernameReferree }, {
                        commisionPoints: userReferree.commisionPoints - amount
                      });

                      const transactionId  = randomstring.generate(10
                        );
                      const newtransaction = new Commission({
                        Amount:amount,
                        transactionId,
                        user: user._id,
                        usernameReferree,
                        detail,
                        createdAt: new Date().toISOString(),
                      });
                
                      const transaction = await newtransaction.save();

                      return newtransaction;
               



            
        }
    },

    Query: {
        async getTopCommissions(_,__, context){
            let firstValue = Object.values(context)[0];     
            const user = checkAuth(firstValue);
            try{

                const topCommissions = await User.find({referrer: user.username, }).sort( { commisionPoints: -1 } ).limit(10);
                console.log(topCommissions)
                return topCommissions;
            }catch(err){
                throw new Error(err)
            }
            
            
        },
       
        async getReferreeCurrentCommisionPoints(_, { userId}, context){
            let firstValue = Object.values(context)[0];     
            const user = checkAuth(firstValue);
            const userReferree = await User.findById(userId);
        
            console.log(userReferree.role)

        if(userReferree){
            // validates that agent is the referrer and referree is gold agent
            if ( user.username === userReferree.referrer && userReferree.role === roles.GoldAgent ){

                    const amount = userReferree.commisionPoints;
                    return amount
                
                
            }else{
                throw new UserInputError("You are not allowed to view this user wallet",{
                    errors:{
                        referrer: "You are not allowed to view this users wallet"
                    }
                })
            }
        }else{
            throw new Error("User not found")
           
        }
    },
        async getUserCurrentCommisionPoints(_,args, context){
            let firstValue = Object.values(context)[0];     
            const user = checkAuth(firstValue);
            const user1 = await User.findById(user.id)
            const amount = user1.commisionPoints;
                return amount
           
        }, 
        async getCommissionLogs(_, __, context){
            let firstValue = Object.values(context)[0];     
            const user = checkAuth(firstValue);
            const user1 = await User.findById(user.id)

            try {
                const commissions = await Commission.find().sort({ createdAt: -1 });
                return commissions;
              } catch (err) {
                throw new Error(err);
              }

             
        },


    }
}