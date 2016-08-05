var alert_flag = false;
var timer;

/** 自定义提示框 */
function myAlert(str) {
    $('#alert_content_p').text(str);
    $('#alert_container').fadeIn(300);
    $('#alert_div').slideToggle(300);
}

/**　关闭提示框 */
function closeAlert(){
    $('#alert-btn').bind('click',function(){
        $('#alert_container').fadeOut(300);
        $('#alert_div').slideToggle(300);
    });
}

function pajx_loadDuodshuo(){
    var dus=$(".ds-thread");
    if($(dus).length==1){
        var el = document.createElement('div');
        el.setAttribute('data-thread-key',$(dus).attr("data-thread-key"));//必选参数
        el.setAttribute('data-url',$(dus).attr("data-url"));
        DUOSHUO.EmbedThread(el);
        $(dus).html(el);         
    }
}