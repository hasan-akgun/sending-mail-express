const express = require("express");
const app = express();

const {connectDb} = require('./src/config.js')
const {mailOption, sendMail} = require('./src/mail.js');
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
  client = await connectDb();
  const db = client.db('db');
  const collection = db.collection('mail');

  try {
    await collection.insertOne({
      name: name,
      email: email,
      content: content
    })
    await client.close();

    const mailoption = mailOption(email,name);
    await sendMail(mailoption);

    res.status(201).json({
      success: true
    })
  }catch(error){
    console.log(error);
    res.status(500).json({
      success: false,
    })
  }
  
})

function startServer() {
  try {
    app.listen(3000, () => {
      console.log("App running on port 3000");
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();