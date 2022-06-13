$(function () {
    //点击登录和注册切换
    $('#link_reg').on('click', () => {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    $('#link_login').on('click', () => {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //注册功能实现
    //表单验证
    const form = layui.form;
    form.verify({
        //数组验证密码
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        //对象验证确认密码
        repwd: (value) => {
            //获取确认密码框的内容
            const val = $('#form_reg [name=password]').val();
            console.log(value, val);
            //如果不相等提示
            if (value !== val) return '两次密码不一致';
        }
    });

    //注册按钮点击事件
    $('#form_reg').on('submit', (e) => {
        e.preventDefault();
        //获取表单数据发起请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layer.msg(res.message);
                layer.msg('注册成功');
                //注册成功后跳转到登录页面
                $('#link_login').click();
            },
        });
    });

    //登录按钮点击事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        //发送请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) return layer.msg(res.message);
                layer.msg('登录成功')
                //保存token
                localStorage.setItem('token', res.token)
                //跳转页面
                location.href = '/index.html'
            }
        });
    })
})