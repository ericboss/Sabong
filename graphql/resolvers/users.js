const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { nanoid }= require('nanoid');
var randomstring = require("randomstring");


const { validateRegisterInput,validateLoginInput } = require('../../util/validators')
const { SECRET_KEY } = require('../../config');
const User = require('../models/Users');
const { roles,statuss } = require('../data');




// function to generate token
function generateToken(user){
    return jwt.sign({
        id: user.id,
        email: user.email,
        username: user.username
    }, SECRET_KEY, { expiresIn: '1h'});
    }

    module.exports = {
        Mutation: {
            async login(_, { username,password }){
                // validates login credentials
                const { errors, valid } = validateLoginInput(username, password);
                const user = await User.findOne( { username });
                if (!valid){
                    throw new UserInputError('Errors', { errors});  
                }
    
                if (!user ){
                    errors.general = 'User not found';
                    throw new UserInputError('Wrong credentials', { errors});
                }
              
                // Validates status is active 
                if(user.status === statuss.inactive){
                    throw new UserInputError('Account not yet Active', {
                        errors: {
                            status: "Your account needs to be approved first before you login"
                        }
                    })
                }
                
                // compare passwords
                const match= await bcrypt.compare(password, user.password);
                if (!match){
                    errors.general = 'Wrong credentials';
                    throw new UserInputError('Wrong credentials', { errors});  
                }
                // generate token
                const token = generateToken(user);
    
                return {
                    ...user._doc,
                    id: user._id,
                    token
                }
    
            },
            async register(_, {registerInput: { firstName,lastName, username,
                email, phoneNumber,password,confirmPassword,role,referralCode}} ){
                    var referrer = "";
                    var status = statuss.inactive;
                    // validates user data
                    const { valid, errors } = validateRegisterInput(firstName,lastName, username,
                        email, phoneNumber,password,confirmPassword);

                    if(!valid){
                        throw new UserInputError('Errors', {errors});
                    }   
                    // Make sure username is not taken
                    
                    const user = await User.findOne({ username })
                    if (user){
                        throw new UserInputError('Username is taken',{
                             errors: {
                                 username: 'This username is taken' 
                             }
                })
                 }
                 // validates first name and last name are not taken

                 const userFirstName = await User.findOne({ firstName });
                 

                 if (userFirstName){
                    const userLastName = userFirstName.lastName;
                     if (userLastName ===lastName  ){
                        throw new UserInputError('User names exists', {
                            errors:{
                                firstName: 'This first name is taken',
                                lastName: 'This lastname is taken'
                            }
                        })
                     }
                 }
                 // Generate referral code for masters agents

                 if (role === roles.MasterAgent){
                    referralCode = randomstring.generate(6) 
                    referrer = username;
                    status = statuss.active;
                    

                 }
                 // Finds players referrer based on referrer code and assigns it to the player.
                 if(role ===roles.Player){
                     if (referralCode !== ""){
                         userReferralCode = await User.findOne({ referralCode});
                         if(userReferralCode){
                                referrer = userReferralCode.referrer;                 
                          
                     }else{
                         throw new UserInputError("Referral code does not exist", {
                             errors: {
                                 referralCode: "This referral code does not exist"
                             }
                         })
                     }
                     }
                     
                 }

                 


                 // hash password
                 password = await bcrypt.hash(password,12);
                 // create user
                const  newUser = new User({
                    firstName,
                    lastName,
                     username,
                    email, 
                    phoneNumber,
                    password,
                    role,
                    referralCode,
                    referrer,
                    status,
                    commisionPoints: 0,
                    walletPoints: 0,
                  

                createdAt: new Date().toISOString()
            });
          const res = await newUser.save();
          
          const token = generateToken(res);
          return {
            ...res._doc,
            id: res._id,
            token
        }


                },
        

        }
    }