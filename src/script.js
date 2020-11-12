
var datepicker = document.getElementById('datepicker')

function dateClick(){
    
}
var now = new Date(); // 현재 시간과 날짜 now getdate = 11, getDay = 3 즉 수요일 11-3은 둘쨰주 일요일 

var pastCheck = function(pickDate) {
    console.log(now.setDate(0))
    console.log(pickDate.setHours(0,0,0,0))
    if(now.setHours(0, 0 ,0 ,0) < pickDate.setHours(0,0,0,0)){ // 현재시간 <= 선택한시간
        return false; // 현재 혹은 미래
    }
    
    return true; // 결과값이 과거다
}


var month = now.getMonth() + 1; // month 는 1월이 숫자0으로 책정한다.
var curr = month + "//"  + now.getDate() + "//" + now.getFullYear()


var Day_1 = new Date(now.setDate(now.getDate() - now.getDay())) //일요일
var Day_2 = new Date(now.setDate(now.getDate() - now.getDay() + 1)) //월요일
var Day_3 = new Date(now.setDate(now.getDate() - now.getDay() + 2)) //화요일
var Day_4 = new Date(now.setDate(now.getDate() - now.getDay() + 3)) //수요일
var Day_5 = new Date(now.setDate(now.getDate() - now.getDay() + 4)) //목요일
var Day_6 = new Date(now.setDate(now.getDate() - now.getDay() + 5)) //금요일
var Day_7 = new Date(now.setDate(now.getDate() - now.getDay() + 6)) //토요일
console.log(pastCheck(Day_5))
console.log(Day_1)
console.log(Day_2)
console.log(Day_3)
console.log(Day_4)
console.log(Day_5)
console.log(Day_6)
console.log(Day_7)
console.log(now)

function test( group ){
    this.일자 = "일자";
    this.제목 = "제목";
    this.재생시간 = "재생시간";
    this.위치 =  "위치";
    this.소스위치= "소스위치";
    this.상세설명 = "상세설명";
    this.구분 = "구분";
    this.그룹 = group;
}
var test1 = new test("그룹1")
var test2 = new test("그룹2")
var test3 = new test("그룹3")
var test4 = new test("그룹2")

//기존 서버에 4개의 JSON파일이 있다고 가정한다.
var test1JSON = JSON.stringify(test1);
var test2JSON = JSON.stringify(test2);
var test3JSON = JSON.stringify(test3);
var test4JSON = JSON.stringify(test4);
//데이터 객체들을 한개의 array에 저장
var item_data =[];
//체크박스로 체크표시된 p태그의 id값을 저장
var save_ids = [];
item_data.push(test1, test2, test3, test4)
//JSON 파일을 읽어올때 카운트한다.
var loop = 4;
//넘어온 제이슨 파일 수만큼 리스트 생성
function show_list(select){
var parentNode = document.getElementById("item_list")
    if(parentNode.childElementCount > 0){
        while ( parentNode.hasChildNodes() ) 
        { parentNode.removeChild( parentNode.firstChild ); }
    }
     
console.log(select)
    for (let i = 0; i < loop; i++) {
        if (item_data[i].그룹 == select) {
         
            extract_JSON(item_data[i])
        }
    }
}


//상단 내용을 리스트에 추가
 function add_item(){
    var myobj = {
        일자 : document.getElementById("input_1").value,
        제목 : document.getElementById("input_2").value,
        재생시간 : document.getElementById("input_3").value,
        위치 : document.getElementById("input_4").value,
        소스위치: document.getElementById("input_5").value,
        상세설명 : document.getElementById("input_6").value,
        구분 : document.getElementById("input_7").value,
        그룹 : document.getElementById("input_8").value,
    }
    var myJSON = JSON.stringify(myobj)
    extract_JSON(myJSON)
 }
 function remove_item(){
     console.log('삭제')
    for (let i = 0; i < save_ids.length; i++) {
        var element = document.getElementById(save_ids[i]);
        element.parentNode.removeChild(element);   
    }
    
 }

 function check_ids(box){
    console.log(event.target.className)
    if(box.checked == true){
        save_ids.push(event.target.className)
    }else{
      
        var point = save_ids.indexOf(event.target.className)
        console.log(point)
        save_ids.splice(point,1)
    }
    console.log(save_ids)
}

function revise_item() {
    console.log(item_data)
    if(save_ids.length == 0){
        return alert("수정하고 싶은 하나의 아이템을 고르세요")
    }
    if(save_ids.length > 1){
        return alert("아이템은 한개만 선택 가능합니다.")
    }
    if(save_ids.length == 1){
        //데이터값을 변경했다면 1순위 일자확인 2순위 그룹확인후 데이터 교체
        for (let i = 0; i < item_data.length; i++) {
            if(item_data[i].그룹){
                if(item_data[i].일자){
                  item_data[i].제목 =  document.getElementById("input_2").value
                  item_data[i].재생시간 =  document.getElementById("input_3").value
                  item_data[i].위치 =  document.getElementById("input_4").value
                  item_data[i].소스위치=  document.getElementById("input_5").value
                  item_data[i].상세설명 =  document.getElementById("input_6").value
                  item_data[i].구분 =  document.getElementById("input_7").value
                }

            }
        }
        console.log(item_data)
    }

}
//리스트를 클릭할경우 상단에 리스트내용 출력
function click_event(){
      console.log(event)
      console.log(event.target.parentNode.id)
      var parent = document.getElementById(event.target.parentNode.id)
      console.log(parent.childNodes)
      var childNumber = parent.childNodes.length; //9
      for (let i = 1; i < childNumber; i++) {
          //0번은 체크박스임으로 제외
        var input_id = "input_" + i
         document.getElementById(input_id).value = parent.childNodes[i].textContent
          
      }
      
    }

// JSON데이터를 파라미터로 받아서 html코드로 변환하여 리스트에 추가
function extract_JSON(myObj){
    console.log('hello')
    var node = document.createElement("P");
    //현재 item_list div가 가지고 있는 리스트 숫자에서 1을 더함
    listName = "line" + (document.getElementById("item_list").childElementCount + 1);
    node.setAttribute("id", listName);
    node.setAttribute("class", "item_line");
    var check = document.createElement('input');
    check.setAttribute('type', 'checkbox');
    check.setAttribute('onclick', 'check_ids(this)')
    check.setAttribute("class", listName)
    node.setAttribute('onclick', 'click_event(this)')
    node.setAttribute('style', 'click_event(this)')
    var textnode1 = document.createElement("td");
    var textnode2 = document.createElement("td");
    var textnode3 = document.createElement("td");
    var textnode4 = document.createElement("td");
    var textnode5 = document.createElement("td");
    var textnode6 = document.createElement("td");
    var textnode7 = document.createElement("td");
    var textnode8 = document.createElement("td");
    textnode1.innerHTML = myObj.일자
    textnode2.innerHTML = myObj.제목
    textnode3.innerHTML = myObj.재생시간
    textnode4.innerHTML = myObj.위치
    textnode5.innerHTML = myObj.소스위치
    textnode6.innerHTML = myObj.상세설명
    textnode7.innerHTML = myObj.구분
    textnode8.innerHTML = myObj.그룹

    node.appendChild(check);
    node.appendChild(textnode1);
    node.appendChild(textnode2);
    node.appendChild(textnode3);
    node.appendChild(textnode4);
    node.appendChild(textnode5);
    node.appendChild(textnode6);
    node.appendChild(textnode7);
    node.appendChild(textnode8);
    document.getElementById("item_list").appendChild(node);
}