const {ApolloServer} = require('apollo-server');
const resolvers = require('./db/resolvers');
const typeDefs = require('./db/schema');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});


const conectarDB = require('./config/db');

// conectar a la db
conectarDB();


// schema




// resolvers


// servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        // console.log(req.headers['authorization'])

        // console.log(req.headers)
        
        const token = req.headers['authorization'] || '';
        if(token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ',''), process.env.SECRET);
                console.log(usuario);
                return {
                    usuario
                }
            } catch (error) {
                console.log('Hubo un error')
                console.log(error)
            }
        }
    
    }
   
  
});

// arrancar servidor
server.listen().then(({url}) => {
    console.log(`server ok en url ${url}`)
})