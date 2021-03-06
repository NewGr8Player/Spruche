(function ($) {
    var $username = $('#username'),
        $password = $('#password'),
        $remember = $('#remember'),
        $btn = $('#sure_btn');

    $btn.bind('click', function () {
        if ($username.val() == '' || $password.val() == '') {
            myAlert('请输入用户名和密码');
            return false;
        }
        if (!isPassword($password.val())) {
            myAlert('密码只能输入6-20个字母、数字、下划线');
            return false;
        }
        if (!CAPTCHAOBJ.getValidate()){
            myAlert('请滑动验证码！');
            return false;
        }
        else {
            $.ajax({
                type: 'POST',
                url: '/ulogin',
                dataType: 'json',
                traditional: true,
                data: {
                    "username": $username.val(),
                    "password": $password.val(),
                    "geetest_challenge":CAPTCHAOBJ.getValidate().geetest_challenge,
                    "geetest_seccode":CAPTCHAOBJ.getValidate().geetest_seccode,
                    "geetest_validate":CAPTCHAOBJ.getValidate().geetest_validate
                },
                success: function (data) {
                    switch (data.type) {
                        case 0:
                            successLogin(data.user);
                            break;
                        case 1:
                            myAlert('用户名或密码错误');  
                            clearForm();                        
                            break;
                        case 2:
                            myAlert('你是机器人吗？');
                            clearForm();
                            break;
                    }
                     
                },
                error: function (xhr, errorType, error) {
                    myAlert('网络繁忙，请稍后再试...');
                }
            });
            return false;
        }
    });

    //清空表单
    function clearForm(){
        CAPTCHAOBJ.refresh();
        $username.val('');
        $password.val('');
    }

    //密码验证
    function isPassword(str) {
        var patrn = /^(\w){6,20}$/;
        if (!patrn.exec(str)) return false;
        return true
    }
    
    //成功登陆
    function successLogin(user) {
        var save = false;
        if($remember.is(':checked')){
            save = true;
        }
        if(save){
            $.cookie('uid',user.id, { expires: 7 ,path: "/"});
            $.cookie('username',user.username, { expires: 7 ,path: "/"});
            $.cookie('type',user.type, { expires: 7 ,path: "/"});
        }
        else{
            $.cookie('uid',user.id, {path: "/"});
            $.cookie('username',user.username, {path: "/"});
            $.cookie('type',user.type, {path: "/"});
        }
        window.location.href="/";
    }

    closeAlert();
})($);