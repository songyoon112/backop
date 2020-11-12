const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;
const fs = require('fs')

app.use(cors());

app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({username:'bryan'}));

app.use('/receiveJSON', (req, res) => {
   
   console.log(req.body.currTime)
   var time = req.body.currTime.split("-")

   var fsName = time[0] + time[1] + (parseInt(time[2]) +1 ) + "stream.json";
   console.log(fsName)
    fs.readFile('./stream_files/' + fsName, (err, data) =>{
     
        res.send(data)
    })
    
})

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})