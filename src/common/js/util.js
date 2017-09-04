/**
*
*日期格式转为日期标准字符串：2017-07-19,num为当前天减去的天数
*
**/
export function formatDate(date, num) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate() - num;  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
}

/**
*
*日期格式转为日期标准字符串：2017-07-19 12:00:00
*
**/
export function formatDateTime(date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    h=h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute;  
    var second=date.getSeconds();  
    second=second < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
}

/**
*
*时间戳/毫秒数转为日期格式
*
**/
export function formatTimes(time, format){
    if(!format){
        format = 'yyyy-MM-dd HH:mm:ss'
    }
    var t = new Date(time);  
    var tf = function(i){return (i < 10 ? '0' : '') + i};  
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){  
        switch(a){  
            case 'yyyy':  
                return tf(t.getFullYear());  
                break;  
            case 'MM':  
                return tf(t.getMonth() + 1);  
                break;  
            case 'dd':  
                return tf(t.getDate());  
                break;  
            case 'HH':  
                return tf(t.getHours());  
                break;  
            case 'mm':  
                return tf(t.getMinutes());  
                break;
            case 'ss':  
                return tf(t.getSeconds());  
                break;  
        }  
    })  
} 

//  将2017-08-01转为8月1日
export function getLocalDate(str){
    var arr = str.split('-')
    return parseInt(arr[1])+'月'+parseInt(arr[2])+'日'
}

// 将11:35:00 转为11:35
export function getLocalHour(str){
    var arr = str.split(':')
    let hour = parseInt(arr[0]) + 8
    let minute = parseInt(arr[1]) === 0 ? arr[1] : parseInt(arr[1])
    hour = hour < 24 ? hour : hour -24
    return hour+':' + minute
}