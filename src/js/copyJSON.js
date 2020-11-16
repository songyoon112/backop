function copy_file(Time ,fileName){
 var myData = [];
    
        fetch('http://localhost:3001/copy', {
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
              'time': Time,
              'fileName' : fileName
            })
        })
        .then(res =>res.json())
        .then(
          data => {
            console.log(data)
        })
        console.log(myData)
   return myData[0]
}

export default copy_file

