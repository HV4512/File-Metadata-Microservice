var express = require('express');
var cors = require('cors');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse",upload.single('upfile'),(req,res)=>{
  console.log('File name: ' + req.file.originalname);
  console.log('File type: ' + req.file.mimetype);
  console.log('File size: ' + req.file.size);
  const name = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size;
  res.json({name,type,size});
})



const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
