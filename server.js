const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose');
require('dotenv').config();

const typeDefs = require('./typeDefs.js');
const resolvers = require('./resolvers.js');
const { findOrCreateUser } = require('./controllers/userController.js')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(() => console.log('DB CONNECTED'))
.catch(err => console.log(err))

console.log(typeDefs)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let authToken = null
        let currentUser = null
        try {
            authToken = req.headers.authorization
            if (authToken) {
                // find User or create User
                currentUser = await findOrCreateUser(authToken)
            }
        }   catch(err) {
            console.error(`Unable to authenticated user with token ${authToken}`)
        }
        return { currentUser }
    }
})

server.listen().then(({ url }) => {
    console.log(`Server listeing on ${url}`);
})
