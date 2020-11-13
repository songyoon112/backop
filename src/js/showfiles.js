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
    render(){
        const lists = this.state.list.map((files, index) =>
        <p  key={files} id = {index} onClick={e => copy_file(this.props.curr, files)}>
            {files}
        </p>
        )
        console.log('h')

        return(
            <div id = "copy_list">
               <button onClick={e => this.setState({ list : this.state.list })}>show list</button>
               {lists}
            </div>
        )
    }
    }

    export default Copy