import React, { Component } from 'react';
import '../admin.css';
import copy_file from './copyJSON'
import { confirmAlert } from 'react-confirm-alert'; // Import

class Copy extends Component
{
    constructor(props){
        
        super(props);
            this.state ={
                list: []
                
            }
            this.showfile()
           
        }

    showfile(){
      
        fetch('http://localhost:3001/showlist', {
           
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        .then(res =>res.json())
        .then(data => {
            console.log(this.state.list)
            for (let i = 0; i < data.length; i++) {
                this.state.list.push(data[i])
            }
           
        })
        this.setState({ list : this.state.list })
        console.log(this.state.list)
    }

    list_handler(){
        this.setState({ 
            list : this.state.list
        })
        var listStyle = document.getElementById("copy_list").style
       
        if(listStyle.visibility !== "visible"){
            listStyle.visibility = "visible"
        }else{
            listStyle.visibility = "hidden"
        }
    }
    Docopy(files){
        var message =  `${this.props.date} 날짜로 파일을 복사하시겠습니까?`
        confirmAlert({
            title: '파일 복사하기',
            message: message,
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    copy_file(this.props.curr, files, this.props.reviseControl)
                    alert("파일이 복사되었습니다.")
                }
              },
              {
                label: 'No',
                onClick: () => alert('파일 복사를 취소하셨습니다.')
              }
            ]
          });
      
    }

    render(){
        const lists = this.state.list.map((files, index) =>
        <p  key={files} id = {index} onClick={e => this.Docopy(files)}> 
            {files} 
        </p> // 파일명을 누르면 선택된 날짜로 파일이 복사됨
        )
        console.log('h')

        return(
          
            <div >
                <p id="buttons" onClick={e =>  this.list_handler()}>복사</p>
        
            <div id = "copy_list">
            <p> 전체 파일 리스트 </p>
            <div id = "file_list">
               {lists}
               </div>
               </div>
            </div>
        )
    }
    }

    export default Copy