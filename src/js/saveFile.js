function save_file(file_data, Time){
    console.log(file_data.length)
    if(file_data.length > 0){
        fetch('http://localhost:3001/saveFile', {
           
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
              'data': file_data,
              'time': Time
            })
        })
        

    }else{
        alert("저장할 데이터가 없습니다.")
    }
}

export default save_file

