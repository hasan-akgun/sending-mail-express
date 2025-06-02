const express = require("express");
const app = express();

const {connectDb} = require('./src/config.js')
let client;

app.set('view engine', 'pug')
app.set('views', './views');

app.use(express.json()); // JSON verileri için
app.use(express.urlencoded({ extended: true })); // Form verileri için

app.get('/', (req, res) => {
  res.render('index');
})

app.post('/send', async (req, res) => {

  const { name, email, content } = req.body;

  const db = client.db('db');
  const collection = db.collection('mail');

  try {
    await collection.insertOne({
      name: name,
      email: email,
      content: content
    })
    res.status(201)
  }catch(error){
    res.status(500)
  }
  
})

async function startServer() {
  try {
    client = await connectDb();
    app.listen(3000, () => {
      console.log("App running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();