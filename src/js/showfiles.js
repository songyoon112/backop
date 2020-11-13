import React, { Component } from 'react';
import '../admin.css';
import copy_file from './copyJSON'

class Copy extends Component
{
    constructor(props){
        super(props);
            this.state ={
                list: []
            }
            this.showfile()
           console.log(this.props.curr)
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
            for (let i = 0; i < data.length; i++) {
                this.state.list.push(data[i])
            }
           console.log(this.state.list)
        })
        this.setState({ list : this.state.list })

    }
    list_handler(){
        this.setState({ 
            list : this.state.list
        })
        var listStyle = document.getElementById("copy_list").style
        if(listStyle.visibility === "hidden"){
            listStyle.visibility = "visible"
        }else{
            listStyle.visibility = "hidden"
        }
    }

    render(){
        const lists = this.state.list.map((files, index) =>
        <p  key={files} id = {index} onClick={e => copy_file(this.props.curr, files)}>
            {files}
        </p>
        )
        console.log('h')

        return(
          
            <div >
            <div>
                <button onClick={e =>  this.list_handler()}>복사</button>
            </div>
            <div id = "copy_list">
               {lists}
               </div>
            </div>
        )
    }
    }

    export default Copy