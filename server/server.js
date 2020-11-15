const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port =process.env.PORT || 3001;
const fs = require('fs');
const { json } = require('body-parser');
const { getJSON } = require('jquery');


app.use(cors());

app.use(bodyParser.json());
app.use('/api', (req, res)=> res.json({username:'bryan'}));

app.use('/receiveJSON', (req, res) => {
   console.log('hello')
   var time = req.body.currTime.split("-")
   var fsName = time[0] + time[1] + (parseInt(time[2]) +1 ) + "stream.json";
   var path = './stream_files/' + fsName;
    if (fs.existsSync(path)) {
        fs.readFile(path, (err, data) =>{   
         res.send(data)
        })
    }else{
        fs.readFile('./stream_files/error.json', (err, data) =>{
          
          res.send(data)
        })
    }
   
})

app.get('/showlist', (req, res) => {
    console.log('hey')
     fs.readdir('./stream_files', (err, data) =>{
         res.send(data)
     });
   
 })

 app.use('/copy', (req, res) => {
    console.log('hi')
    console.log(req.body)
    var time = req.body.time.split("-")
    var fsName = time[0] + time[1] + (parseInt(time[2]) +1 ) + "stream.json";
    fs.readFile("./stream_files/" + req.body.fileName, 'utf8', (err, data) =>{ 
        var data = JSON.parse( decodeURIComponent(data)) 
      
        var  firstDate = new Date(req.body.time)    //서버는 날짜가 하루 늦게옴
        var  newDate = new Date(firstDate)   //파일을 만들어야하는 날짜
        newDate.setDate(newDate.getDate() + 1)
        var dayName = newDate.toLocaleString("default", { weekday : 'long' }) // 파일을 만들어야하는 날짜의 요일
        var sendData = []
        const newline_separator = ',';
        for (let i = 0; i < data.length; i++) {

            var a = data[i].date.split(','); // 원본 데이터의 스케쥴별 일자를 얻기위함
            var finalDate = time[0] + "/"  + time[1] + "/" + (parseInt(time[2]) +1 ) + " , " + dayName + " ," + a[2]
            data[i].date = finalDate;
           sendData.push(JSON.stringify(data[i]))
           
        }
       
        console.log(sendData[0])
        var a = "[" + sendData + "]"
        console.log(a)
        // 파일을 read하고 날짜를 변환한 데이터를 선택한 날짜의 파일로 저장
         fs.writeFile("./stream_files/" + fsName, a , 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }

        })
    })
 })

app.use('/saveFile', (req, res) => {
    var time = req.body.time.split("-")
    var fsName = time[0] + time[1] + (parseInt(time[2]) +1 ) + "stream.json";
    var data = JSON.stringify(req.body.data) 
    console.log(fsName)
    console.log(data)
    fs.writeFile("./stream_files/" + fsName, data, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

    })
})

app.listen(port, ()=>{
    console.log(`express is running on ${port}`);
})




 /*
        var rootDates = data[1].date.split(',')
        var HM = rootDates[2].split(':')
        console.log(HM)
        var rootDate = new Date(rootDates[0])
        rootDate.setHours(HM[0])
        rootDate.setMinutes(HM[1])
        console.log(rootDate)
       
        console.log(newDate)
        */