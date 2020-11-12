function pastCheck(curr, pickTime){
 
    if(curr.setHours(0, 0 ,0 ,0) > pickTime.setHours(0,0,0,0)){ // 현재시간 > 선택한시간
        return true; // 과거
    }
    
    return false; // 과거아님
}

export default pastCheck