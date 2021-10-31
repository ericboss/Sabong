const mongoose = require('mongoose');
const { MONGODB } = require('./config');
const { GraphQLServer } = require('graphql-yoga');




const PORT = process.env.port || 4000;

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');



const server = new GraphQLServer({ typeDefs, resolvers,
  context: ({request })=>{
   
     return {
     request
  }},
  cors: {
    origin: true
  }
  
});


server.start(() => console.log(`Server is running on localhost:${PORT}`))
mongoose.connect(MONGODB, { useNewUrlParser: true})
.then(() => {
    console.log("mongoDB Connected")
    
})
  .catch(err => {
    console.error(err)
  })