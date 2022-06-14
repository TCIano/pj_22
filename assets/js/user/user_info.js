$(function () {
    const form = layui.form;
    //表单校验
    form.verify({
        nickname: (val) => {
            if (val.length > 6) return layui.msg('用户昵称不能超过六位')
        }
    })

    //获取用户信息
    const initUserInfo = () => {
        //发出请求
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: (res) => {
                if (res.status !== 0) return layer.mes('获取用户信息失败')
                //快速给表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    //点击重置按钮重置 修改信息
    $('#btnReset').click((e) => {
        // 防止默认跳转事件
        e.preventDefault();
        //重新获取用户信息给表单赋值
        initUserInfo();
    })

    //修改按钮监听事件
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        //发送请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                // layer.msg(res.message);
                //修改成功重新渲染头像和用户名
                // console.log(window.parent);
                window.parent.getUserInfo();
            }
        })
    })
    initUserInfo();
})