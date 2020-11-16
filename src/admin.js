import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'react-moment';
import 'moment-timezone';
import pastCheck from './timecheck';
import save_file from './js/saveFile';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Copy from './js/showfiles';

class Admin extends Component
{
    constructor(props){
       
        super(props);
            this.state ={
                curr : new Date(),
                controller : true,
                firstRender : true,
                reviseControl : false,
                days :  [],
                items : [],
                group : '',
                data : [],
             
            }
        this.checked_list = []; //,체크박스에서 표시된 아이디에 대한 배열
         this.handler = this.handler.bind(this)
        this.yesterday = function(d){ d.setDate(d.getDate()-1); return d}(new Date);
       
    }
   handler() {
       this.setState({
           firstRender : true
       })
   }


    receiveJSON(nextDate){ //제일 첫번째로 작동하는 함수
        
        if(this.state.controller){
        fetch('http://localhost:3001/receiveJSON', {     
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'currTime': nextDate,
            
            })
        })
        .then(res =>res.json())
        .then(data => {
            
            if(data[0].error === "아직 해당 날짜의 스케쥴이 존재하지 않습니다."){
                alert(data[0].error)
                delete data[0]["error"]
                this.setState({ 
                    items: [],
                    data : data,
                })
               
            }else{
                this.setState({ 
                    items: [],
                    data : data,
                })
              
               
            }
      
        })
        }
      }


    pickDate(e){
        var e_time = e.toString()
        if(this.state.curr == e_time){
            this.state.controller = false //같은 날짜이므로 데이터를 전송 받지 않는다
        }else{
            this.state.controller = true //다른날짜를 선택했으므로 데이터를 전송 받는다.

        }
        //선택한 날짜의 일주일 달력 프린트
        var today = new Date()   
        var year = e.getFullYear();
        var month = e.getMonth();
        var day = e.getDate()
        var myDate = new Date(year, month, day, 0 ,0 ,0, 0)
        
        this.setState({
            curr : e,
            group : "전체"
        })
        
        var p_check = pastCheck(today, e);
        this.receiveJSON(myDate)
        this.dispalyDays(myDate)
        var editable_input = document.getElementsByClassName("editable_input"); 
        if( p_check === true){
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
    
    dispalyDays(myDate){
        
        this.state.days = []; //일주일에 대한 정보를 컨트롤.
        for (let i = 0; i < 7; i++) {
            var setKey = "dateKey" + i
               this.state.days.push({ date: new Date(myDate.setDate(myDate.getDate() - myDate.getDay() + i)), key: setKey }) 
             
           }

    }

    show_list(index){
   
        
        this.state.items = []; //데이터 배열에서 리스트를 출력할 그룹만 선택하여 item배열로 push한다.
        var groupID = "그룹" + index
       
            document.getElementById("input_group").value  = groupID
            this.display_list(groupID)
            this.setState({group : groupID})
        
        
    }

    display_list(groupID){ 
        //선택날짜의 스케쥴 리스트 프린트
            if( this.state.group !== groupID){
                for (let i = 0; i < this.state.data.length; i++) {
                    if(this.state.data[i].group === groupID){    
                        this.state.items.push(this.state.data[i])
                    }
                }
            }
            else{
                for (let i = 0; i < this.state.data.length; i++) {
                    if(this.state.data[i].group === this.state.group){
                        this.state.items.push(this.state.data[i])
                    }
                    
                }
            }
        }
    
        
    show_detail(e){
        this.state.data.forEach(element => {
                if(element.group === this.state.group)
                {
                    if(element.date === e.target.parentNode.id){
                    
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

    add_list(){
        var item_add = {
                'date' : document.getElementById("input_date").innerHTML,
                "title" : document.getElementById("input_title").value,
                "running_time" : document.getElementById("input_rt").value,
                "URL" : document.getElementById("input_url").value,
                "SURL" : document.getElementById("input_surl").value,
                "explanation" : document.getElementById("input_explan").value,
                "type" : document.getElementById("input_type").value,
                "group" : document.getElementById("input_group").value   
        }
        if(item_add.group == ""){
            alert("원하는 그룹을 선택해주세요")
        }else{
            for (let i = 0; i < this.state.data.length; i++) {
                
                if(item_add.group === this.state.data[i].group){
                    if(item_add.date === this.state.data[i].date){
                      
                        return alert("이미 설정된 스케쥴이 존재합니다.")
                    }
                }
            }
            this.state.reviseControl = true;
            this.state.data.push(item_add);
            this.display_list(item_add.group)
        }
     
    }

    change_Min(number){
        var copyTime = this.state.curr.toString()
        var Time = new Date(copyTime)
        var min = Time.getMinutes()
        Time.setMinutes(min + number)
        this.setState({ curr: Time })
        //document.getElementById("input_date").innerHTML = Time.format('yy/mm/dd')
    }

    box_check(e){
        var status = e.target.checked;
        var boxid = e.target.id;
        if(status === true){
           this.checked_list.push(boxid)
        }else{
            var indexof = this.checked_list.indexOf(boxid)
            this.checked_list.splice(indexof, 1)
        }
      
    }
    remove_list(){
        if(this.checked_list.length > 0){
        var message = this.checked_list.length + "개의 스케쥴을 삭제하시겠습니까?"
        var readdate = document.getElementById("date" + this.checked_list[0]).innerHTML
        if(this.state.data[0].date === readdate){
        }
        confirmAlert({
            title: 'Confirm to submit',
            message: message,
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    for (let i = 0; i < this.checked_list.length; i++) {
                        var readdate = document.getElementById("date" + this.checked_list[i]).innerHTML
                        var readgroup = document.getElementById("group" + this.checked_list[i]).innerHTML
                       for (let j = 0; j < this.state.data.length; j++) {
                           if(this.state.data[j].date === readdate){
                               if(this.state.data[j].group === readgroup){
                                   this.state.data.splice(j, 1)
                               }
                           }
                           
                       }
                    }
                    
                    this.state.reviseControl = true;
                    alert('데이터가 삭제되었습니다.');
                    this.checked_list = [];
                    save_file(this.state.data, this.state.curr)
                    this.show_list(0)
                }
              },
              {
                label: 'No',
                onClick: () => alert('Click No')
              }
            ]
          });
        }
    }
    saveprocess(){
        save_file(this.state.data, this.state.curr)
      
        this.receiveJSON(this.state.curr)
        this.show_list(0)
    }


    render(){
    if(this.state.firstRender){
        var today = new Date()
        today.setHours(0,0,0,0)
        this.receiveJSON(today)
        this.dispalyDays(today)
        this.state.firstRender = false
      
    }
    console.log('난 렌더야')
    
    const listitems = this.state.items.map((item, index) =>
    <tr key={index} id = {item.date} onClick = {e => this.show_detail(e)}>
    <td><input type="checkbox" style={{width:"30px"}}  id = {index} onClick ={e => this.box_check(e)}></input></td>
    <td id={"date" + index} className={item.date} >{item.date}</td>
    <td>{item.title}</td>
    <td>{item.running_time}</td>
    <td>{item.URL}</td>
    <td>{item.SURL}</td>
    <td>{item.explanation}</td>
    <td>{item.type}</td>
    <td id = {"group" + index}>{item.group}</td>
    </tr>
    )

    const listdays = this.state.days.map((day) =>
        <p  key={day.key} id = {day.key} onClick = {e => this.pickDate(day.date)} style={{cursor:"pointer"}} >
        <Moment format="YYYY/MM/DD, dddd, "  >
            {day.date}
        </Moment>
        </p>
        )
      //
        return(
        <div id="detailInfo" style = {{margin:0,}}>
           <select onChange = {e => this.show_list(e.target.options.selectedIndex)} value={this.state.group}  style={{cursor:"pointer"}} id="group_slector">
                <option value ="그룹0">전체</option>
                <option value ="그룹1">그룹1</option>
                <option value ="그룹2">그룹2</option>
                <option value ="그룹3">그룹3</option>
           </select>
                <DatePicker
                id = "datepicker"
                selected={this.state.curr}      
                onSelect = {e => this.pickDate(e)}
                onKeyDown = {e => e.nativeEvent.returnValue === false}
           
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
                    <td style={{display:"flex"}}  id = "PickedDate"><p onClick = {e => this.change_Min(-5)}>{"<<"}</p><p><Moment format="YYYY/MM/DD, dddd, HH:mm" id = "input_date">
                        {this.state.curr}
                    </Moment></p><p onClick = {e => this.change_Min(5)}>{">>"}</p></td>
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
                <div style={{display:"flex", marginLeft:"800px"}}>
                <p onClick = {() => this.add_list()} id="buttons" >추가</p>
                <p onClick = {() => this.remove_list()} id="buttons" >삭제</p>
                <p onClick = {() => this.saveprocess() } id="buttons" >저장</p>
                <Copy curr = {this.state.curr} reviseControl = {this.state.reviseControl} date={this.state.curr} action={this.handler}  />   
                </div>
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