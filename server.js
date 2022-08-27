const fastify = require('fastify')({logger:true})
const { MongoClient } = require('mongodb');
require('dotenv').config();
const uri = 'mongodb+srv://umar43202:ibonkpze123@cluster0.981sbsx.mongodb.net/?retryWrites=true&w=majority';
const client  = new MongoClient(uri);


fastify.register(require('@fastify/cors'))
fastify.register(require('@fastify/swagger'),{
    exposeRoute: true,
    routePrefix:'/docs',
    swagger :{
        info:{title: 'Books API', description: 'Books API Documentation'},
    }
})

fastify.register(require('./routes/booksRoute'))

const PORT = process.env.PORT || 3000;

fastify.get('/',(req,res) => {
    res.send('HelloWorld')
})

async function run(){
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        // insert a document 
        console.log("Connected successfully to server");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);

fastify.listen({port: PORT,host:'0.0.0.0'},async (err,address) => {
    if(err){
        fastify.log.error(err)
        process.exit(1);
    }
    console.log(`Server is running on PORT ${address}`)
})

