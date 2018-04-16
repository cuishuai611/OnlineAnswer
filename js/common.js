$(document).ready(function(){
    var w = $('.risk-wapper').outerWidth(), l = $('.risk-wapper li').length, isTrue = true;
    
    setVal(w,l);
    initNextBtn();
    PrevHide();

    //choose
    $('.risk-container div').bind('click', function() {

        var curIndex = $(this).parents('li').index() + 1;
        $(this).children('i').addClass('check-in');
        $(this).siblings().children('i').removeClass('check-in');
        $('.next-btn').removeClass('untouch');
        if(curIndex == l) {
            $('.risk-submit a').addClass('risk-submit-y');
            $('.next-btn').addClass('hidenode');
        }else{
            $('.risk-container li').eq(curIndex).addClass('cur-page').siblings().removeClass('cur-page');
            moveFun(curIndex);
        }
    })

    
    //next-btn
    $('.next-btn').bind('click', function() {
        if($(this).hasClass('untouch')) return;
        var curIndex = $('.cur-page').index() + 1;
        if(curIndex == l) return;
        $('.cur-page').removeClass('cur-page').next('li').addClass('cur-page');
        moveFun(curIndex);
    });

    //prev-btn
    $('.prev-btn').bind('click', function() {
        var curIndex = $('.cur-page').index() - 1;
        if(curIndex == -1) return;
        $('.cur-page').removeClass('cur-page').prev('li').addClass('cur-page');
        moveFun(curIndex);
    })
    

    //setTab silder
    function moveFun(n){
        var curTit = $('.risk-wapper li').eq(n).attr('risk-title');
        $('#curNum').text(n+1);
        $('.cur-title').text(curTit);
        $('.risk-wapper ul').css('left', -n*w+'px');
        if(n === l - 1) {
            $('.risk-submit a').addClass('risk-submit-s');
        }else{
            $('.risk-submit a').removeClass('risk-submit-s');
        }
        initNextBtn();
        UnNext(l);
        PrevHide();
        return true;
    }

    //submit event
    $('.risk-submit a').bind('click', function(){
        resultFun(URL)
    })
    //close 
    $('.cancel-btn').bind('click', function(){
        $('.layer-out').addClass('layer-hide')
    })
    //window resize
    $(window).bind('resize', function(){
        setVal(w,l);
    })
})

//如果未选择答案，下一题置灰
function initNextBtn() {
    if($('.cur-page i.check-in').length > 0) {
        $('.next-btn').removeClass('untouch');
    }else{
        $('.next-btn').addClass('untouch');
    }
}

function PrevHide(){
    //如果当前是第一题，上一题隐藏
    if($('.cur-page').index() === 0) {
        $('.prev-btn').addClass('hidenode');
    }else{
        $('.prev-btn').removeClass('hidenode');
    }
}

function UnNext(l){
    //如果当前是最后一题，下一题隐藏
    if($('.cur-page').index() + 1 == l) {
        $('.next-btn').addClass('hidenode');
    }else{
        $('.next-btn').removeClass('hidenode');
    }
}

function setVal(w,l){
    var i = $('.cur-page').index();
    $('.risk-wapper ul').css({'width': w*l+'px', 'left': -i*w+'px'});
    $('.risk-wapper li').css({'width': w+'px'});
    $('.loading-layer').hide();
}
//jianting
window.onload = function(){
    pushHistory();
	window.addEventListener("popstate", function(e) {
        var Layer = document.querySelector('.layer-out');
        if(Layer.classList.value.indexOf('layer-hide') > -1) {
        	Layer.classList.remove('layer-hide');
        }else{
        	Layer.classList.add('layer-hide');
        }
        pushHistory();
    }, false);
}