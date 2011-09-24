/**
 * 現在日時をYYYY-MM-DD HH:mm:SS形式で取得する
 */
var getCurrentTime = function() {
    var date = new Date();
    
    var year   = date.getYear();
    var year4 = (year < 2000) ? year+1900 : year;
    var month  = date.getMonth() + 1;
    var day    = date.getDate();
    var hour   = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    
    if(month < 10){
        month = "0" + month;
    }
    if(day < 10){
        day = "0" + day;
    }
    if(hour < 10){
        hour = "0" + hour;
    }
    if(minute < 10){
        minute = "0" + minute;
    }
    if(second < 10){
        second = "0" + second;
    }
    
    var currentTime = year4 + "年" + 
                      month + "月" + 
                      day + "日 " +
                      hour + ":" + minute + ":" + second;
                      
    return currentTime;
};
