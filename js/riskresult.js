function resultFun(URL){
    var isSubmit = true;
    if(!isSubmit) return;
    isSubmit = false;
    var resultNum = 0, lender_type = 1;
    if(arguments[1] === true) {
        resultNum = 0, lender_type = 1;
    }else{
        if($('.risk-submit-y').length <= 0) return false;
    
        $('i.check-in').each(function(i){
            resultNum += Number($(this).attr('value'));
        });
        switch(resultNum) {
            case resultNum <= 16 :
                lender_type = 1;
                break;
            case resultNum >= 17 && resultNum <= 24 :
                lender_type = 2;
                break;
            case resultNum >= 25 && resultNum <= 32 :
                lender_type = 3;
                break;
            case resultNum > 32 :
                lender_type = 4;
                break;
        }
    }

    var riskDate = new Date(), 
        riskYear = riskDate.getFullYear(), 
        riskMonth = riskDate.getMonth()+1, 
        riskDay = riskDate.getDate(),
        pastYear, pastMonth, pastDay, pastDate;
    
    if(riskMonth + 3 > 12) {
        pastMonth = riskMonth + 3 - 12;
        pastYear = riskYear + 1;
    }else{
        pastMonth = riskMonth + 3;
        pastYear = riskYear;
    }
    pastDay = getDaysInMonth(pastYear, pastMonth);
    pastDay = riskDay > pastDay ? pastDay : riskDay;
    pastDate = pastYear +'-'+ pastMonth +'-'+ pastDay;

    $.ajax({
        type : 'POST',
        url  : '',
        data : {
            'answer' : resultNum,
            'lender_type' : lender_type,
            'end_time' : pastDate
        },
        success: function(){
            ShowEsg('请稍后,正在跳转...');
            window.location.href = URL;
            isSubmit = true;
        },
        error: function(){
            ShowEsg('网络参数错误，请重试');
            isSubmit = true;
        }
    })
}
function getDaysInMonth(year, month) {  
    var date = new Date(year, month, 1);  
    return new Date(date.getTime() - 864e5).getDate();  
}