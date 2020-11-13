function copy_file(Time ,fileName){
 
    
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
   
}

export default copy_file

