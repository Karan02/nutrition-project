require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
// app.use(multer({
//   dest: 'uploads/'
// }));
const port = process.env.PORT || 4000;
const database = `${process.env.MONGO_URI}/${process.env.MONGODB_NAME}`;
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
console.log("welcome")
app.use(bodyParser.json({limit: '100mb'}));
app.get('/',(req, res) => {
 
  res.send("welcome")
})
mongoose.connect(
  database,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
.then(()=>{
  require('../app/routes/nutrition.routes')(app);
  app.listen(port, ()=> {
    console.log(`server running on http://localhost:${port}`);
  });
})
.catch((err)=>{
  console.log('fail to connect due to', err);
})