const { MongoClient } = require('mongodb');
let client;

async function connectDb() {
  client = new MongoClient('mongodb://localhost:27017');

  try {
    await client.connect();
    console.log("bağlandı");
    return client;

  } catch (error) {
    console.error("Hata: " + error); 
  }
}

module.exports={connectDb};
