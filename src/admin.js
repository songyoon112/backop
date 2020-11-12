import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import 'moment-timezone';
import pastCheck from './timecheck';



class Admin extends Component
{
    constructor(props){
        super(props);
            this.state ={
                curr : new Date(),
                days :  [],
                items : [],
                group : '',
                data : [],
            }
            this.receiveJSON("0")
            this.pickDate(this.state.curr)
    }
    
    receiveJSON(nextDate){
       
        if(this.state.curr !== nextDate){
        fetch('http://localhost:3001/receiveJSON', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'currTime': this.state.curr,
            
            })
        })
        .then(res =>res.json())
        .then(data => {
            for (let i = 0; i < data.length; i++) {
              this.state.data.push(data[i])  
            }
         this.display_list();
        })
        }
      }

    display_list(){ 
    //선택날짜의 스케쥴 리스트 프린트
    console.log(this.state.data)
    this.state.items = [];
        if( this.state.group !== "그룹0"){
            for (let i = 0; i < this.state.data.length; i++) {
                if(this.state.data[i].group === this.state.group)
                this.state.items.push(this.state.data[i])
            }
        }
        else{
            for (let i = 0; i < this.state.data.length; i++) {
                if(this.state.data[i].group === this.state.group)
                this.state.items.push(this.state.data[i])
            }
        }
    }

    
    pickDate(e){
        //선택한 날짜의 일주일 달력 프린트
        console.log('hello')
        this.receiveJSON(e);
        var today = new Date()   
        var year = e.getFullYear();
        var month = e.getMonth();
        var day = e.getDate()
        var myDate = new Date(year, month, day, 0 ,0 ,0, 0)
        this.setState({ curr : e })
        this.state.days = [];
        for (let i = 0; i < 7; i++) {
         var setKey = "dateKey" + i
            this.state.days.push({ date: new Date(myDate.setDate(myDate.getDate() - myDate.getDay() + i)), key: setKey }) 
          
        }
        var editable_input = document.getElementsByClassName("editable_input"); 
        if(pastCheck(today, e) === true){
            //선택한 날짜가 과거일 경우
            Array.prototype.forEach.call(editable_input, function(ed) {
                // Do stuff here
                ed.setAttribute('disabled', "disabled");
            });
        }else{
            Array.prototype.forEach.call(editable_input, function(ed) {
                // Do stuff here
                ed.disabled = false //현재 혹은 미래시간에는 사용자가 내용수정 가능
            });
        }


    }
    
    show_list(event){
        var groupID = "그룹" + event.target.options.selectedIndex 
        this.setState({group : groupID})
    }

    show_detail(e){
  
        this.state.data[0].forEach(element => {
                if(element.group === this.state.group)
                {
                    if(element.date === e.target.parentNode.id){
                            console.log(document.getElementById("input_date"));
                            document.getElementById("input_date").innerHTML = element.date
                            document.getElementById("input_title").value = element.title
                            document.getElementById("input_rt").value = element.running_time
                            document.getElementById("input_url").value = element.URL
                            document.getElementById("input_surl").value = element.SURL
                            document.getElementById("input_explan").value = element.explanation
                            document.getElementById("input_type").value = element.type
                            document.getElementById("input_group").value = element.group
                    }
                }
        });
    }



    render(){
 

    const listitems = this.state.items.map((item, index) =>
    <tr key={index} id = {item.date} onClick = {e => this.show_detail(e)}>
    <td><input type="checkbox" style={{width:"30px"}}></input></td>
    <td>{item.date}</td>
    <td>{item.title}</td>
    <td>{item.running_time}</td>
    <td>{item.URL}</td>
    <td>{item.SURL}</td>
    <td>{item.explanation}</td>
    <td>{item.type}</td>
    <td>{item.group}</td>
    </tr>
    )

    const listdays = this.state.days.map((day) =>
        <p  key={day.key} id = {day.key} >
        <Moment format="YYYY/MM/DD, dddd, "  >
            {day.date}
        </Moment>
        </p>
        )
      
        return(
        <div id="detailInfo" style = {{margin:0,}}>
           <select onChange = {e => this.show_list(e)}>
                <option value ="그룹1">전체</option>
                <option value ="그룹1">그룹1</option>
                <option value ="그룹2">그룹2</option>
                <option value ="그룹3">그룹3</option>
           </select>
                <DatePicker
                id = "datepicker"
                selected={this.state.curr}      
                onSelect = {e => this.pickDate(e)}
                
                onKeyDown = {e => e.nativeEvent.returnValue === false}
                value = {this.state.curr}
                /*
                onSelect={handleDateSelect} //when day is clicked
                onChange={handleDateChange} //only when value has changed
                */
                />
                <div id ="weekDays">
                {listdays}
                </div>
                <div style={{margin_left:"50px"}}> 
                
              </div>
              <div>
                <table>
                <tbody>
                    <tr>
                    <td><p >일자 : </p> </td>
                    <td><p id = "PickedDate"><Moment format="YYYY/MM/DD, dddd, HH:mm" id = "input_date">
                        {this.state.curr}
                    </Moment></p></td>
                    </tr>
                    <tr>
                    <td><p>제목 :</p> </td>
                    <td><input className = "editable_input" id = "input_title" ></input> </td>
                    </tr>
                    <tr>
                    <td><p>재생시간 :</p> </td>
                    <td><input className = "editable_input" id = "input_rt" ></input> </td>
                    </tr>
                    <tr>
                    <td><p>위치(URL) :</p> </td>
                    <td><input className = "editable_input" id = "input_url" ></input> </td>
                    </tr>
                    <tr>
                    <td><p>소스위치(URL) :</p> </td>
                    <td><input className = "editable_input" id = "input_surl" ></input> </td>
                    </tr>
                    <tr>
                    <td><p>상세설명 :</p> </td>
                    <td><input className = "editable_input" id = "input_explan" ></input> </td>
                    </tr>
                    <tr>
                    <td><p>구분 :</p> </td>
                    <td><input className = "editable_input" id = "input_type" ></input> </td>
                    </tr>
                    <tr>
                    <td><p>그룹 :</p> </td>
                    <td><input disabled="disabled" id = "editable_input" id = "input_group" ></input> </td>
                    </tr>
                    </tbody>
                </table>
                <table id = "list_table">
                   <tbody>
                    <tr>
                        <td style = {{backgroundColor : "grey"}}><p ></p> </td>
                        <td style = {{width : "150px"}}><p>일자</p> </td>
                        <td ><p>제목</p></td>
                        <td><p>재생시간</p> </td>
                        <td style = {{width : "200px"}}><p>위치(URL)</p> </td>
                        <td style = {{width : "200px"}}><p>소스위치(URL)</p> </td>
                        <td style = {{width : "200px"}}><p>상세설명</p> </td>
                        <td><p>구분</p> </td>
                        <td><p>그룹</p> </td>
                    </tr>
                    {listitems}
                    </tbody>
                </table>
                </div>
                </div>
        )
    }
}



export default Admin;