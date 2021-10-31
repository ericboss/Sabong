const { roles,statuss,transactionTypes,WidthrawalRequestStatusData } = require('../data');
const checkAuth = require('../../util/check-auth');
const User = require('../models/Users');
const Wallet = require('../models/WalletManagement');
const WithdrawalRequest = require('../models/WithdrawalRequests');
const { nanoid }= require('nanoid');
const { UserInputError } = require('apollo-server');
var randomstring = require("randomstring");


module.exports = {
    Mutation: {

        async widthrawfunds(_, {userId, amount}, context){
            let firstValue = Object.values(context)[0];       
            const user = checkAuth(firstValue);
            const user1 = await User.findById(user.id);
            const userRole = user1.role;
            const username = user.username

            if (userRole !== roles.MasterAgent){
                // validates user is a master agent
                throw new UserInputError("You are not allowed to perform this transaction", {
                    errors : {
                        role: "Only Master Agents can perform this transaction"
                    }
                })
            }

            const referee = await User.findById(userId);
            await User.updateOne({_id: userId}, {
                walletPoints: referee.walletPoints - amount 

            });
            await WithdrawalRequest.updateOne({user: userId}, {
                WidthrawalRequestStatus:WidthrawalRequestStatusData.approved
            })
            return "Succesfully widthrawn"





        },
        async WithdrawalRequest(_, { amount}, context){
            let firstValue = Object.values(context)[0];       
            const user = checkAuth(firstValue);
            const user1 = await User.findById(user.id);
            // validates that user has enough funds to perform transaction
            if(user1.walletPoints <= amount){
                throw new UserInputError("You do not have enough funds to process this request")
            }
            // find all previous users widthrwal requests
        const checkPreviousUserRequests = await WithdrawalRequest.find({ user: user.id, WidthrawalRequestStatus: WidthrawalRequestStatusData.pending});
        console.log(checkPreviousUserRequests)
        
             
            // check if user has status pending for previous widthrwal request   
            
            if (checkPreviousUserRequests.length !==0){
                throw new UserInputError("You cannot perform another widthrwal request. Wait for the previous operation to be approved")
            }
               
       



      

         const widthRequests = new WithdrawalRequest({
            user: user.id,
            WithdrawalRequestAmount: amount,
            WidthrawalRequestStatus: WidthrawalRequestStatusData.pending,
            role: user1.role,
            createdAt: new Date().toISOString(),
         });
         const widthrawal =  await widthRequests.save()

         return widthrawal








        },
        async walletTransaction(_,{ walletInput: { transactionType,usernameReferree,amount,detail } }, context){

            let firstValue = Object.values(context)[0];       
            const user = checkAuth(firstValue);
            const user1 = await User.findById(user.id);
            const userRole = user1.role;
            const username = user.username
            let walletPoints = user1.walletPoints;
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
                throw new UserInputError("Only active players can be loaded", {
                    errors : {
                        role: "Only Active players can perform this transaction"
                    }
                })
            }

                if( username !== userReferree.referrer){
                    // validates agent make trasactions for the agents or players he referred
               
                    throw new UserInputError("You are not allowed to perform this transaction", {
                        errors : {
                            referrer: "You can perform this transaction only on the agents or players you referred"
                        }
                    }) 
                }
                
                if (transactionType === transactionTypes.deposit){
                   
                   
                      //updates player or agent wallet 
                      await User.updateOne({ username: usernameReferree }, {
                        walletPoints: userReferree.walletPoints + amount
                      });

                      const transactionId  = randomstring.generate(10);
                      const newtransaction = new Wallet({
                        Amount:amount,
                        transactionId,
                        transactionType,
                        user: user._id,
                        usernameReferree,
                        detail,
                        createdAt: new Date().toISOString(),
                      });
                
                      const transaction = await newtransaction.save();

                      return userReferree;

                    
                };

                if (transactionType === transactionTypes.withdrawal){
                   
                    // validates user has enough funds to perform transaction
                    if (amount > userReferree.walletPoints){
                        throw new UserInputError("user does not have enough funds", {
                            errors : {
                                referrer: "User does not have enough funds to perform this transaction"
                            }
                        })  
                    };

                   
                      //updates player or agent wallet 
                      await User.updateOne({ username: usernameReferree }, {
                        walletPoints: userReferree.walletPoints - amount
                      });

                      const transactionId  = randomstring.generate(10);
                      const newtransaction = new Wallet({
                        Amount:amount,
                        transactionId,
                        transactionType,
                        user: user._id,
                        usernameReferree,
                        detail,
                        createdAt: new Date().toISOString(),
                      });
                
                      const transaction = await newtransaction.save();

                      return userReferree;
                }



            
        }
    },

    Query: {
        async listWithdrawalRequests(_,__, context ){
            let firstValue = Object.values(context)[0];       
            const user = checkAuth(firstValue);
            const user1 = await User.findById(user.id);
            const userRole = user1.role;
            const username = user1.username
            
           

            if (userRole !== roles.MasterAgent){
                // validates user is a master agent
                throw new UserInputError("You are not allowed to perform this transaction", {
                    errors : {
                        role: "Only Master Agents can perform this transaction"
                    }
                })
            }
        
            var lists = {};
            var lists1 = {};
        

           const referees1 = await User.find({referrer: username});
           
           
           const getGoldAgents = await User.find({referrer: username, role:roles.GoldAgent});
           if(getGoldAgents.length !== 0){
            for( const agent of getGoldAgents ){
          
              const referees2 = await User.find({referrer: agent.username});
              
              if (referees2){
                var lists2 = Object.assign(referees1, referees2);
              }
               
            }
        
            return lists2
          
            }
           




        },
        async getWalletLogs(_, __, context){
            let firstValue = Object.values(context)[0];     
            const user = checkAuth(firstValue);
            const user1 = await User.findById(user.id)

            try {
                const wallets = await Wallet.find().sort({ createdAt: -1 });
                return wallets;
              } catch (err) {
                throw new Error(err);
              }

             
        },
        async getReferreeCurrentWallet(_, { userId}, context){
            let firstValue = Object.values(context)[0];     
            const user = checkAuth(firstValue);
            const userReferree = await User.findById(userId);
            
        if(userReferree){
            // validates that agent is the referrer and status is active
            if ( user.username === userReferree.referrer && userReferree.status === statuss.active ){

                    const amount = userReferree.walletPoints;
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
        async getUserCurrentWallet(_,args, context){
            let firstValue = Object.values(context)[0];     
            const user = checkAuth(firstValue);
            const user1 = await User.findById(user.id)
            const amount = user1.walletPoints;
                return amount
           
        }

    
}}