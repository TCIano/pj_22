$(function () {
    const form = layui.form;
    //chongzhi重置密码表单验证
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        newPwd: (val) => {
            if (val === $('[name=oldPwd]').val()) return '新密码和原始密码不能相同！'
        },
        rePwd: (val) => {
            if (val !== $('[name=newPwd]').val()) return '两次密码不同！'
        }
    })

    // 提交按钮监听事件
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        //发出请求,传送数据
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message);
                //更新成功之后 删除token并且跳转出login页面
                localStorage.removeItem('token')
                window.parent.location.href = '/login.html'
            }
        })
    })

    //表单重置按钮
    $('#btnReset').click((e) => {
        // 阻止重置按钮的默认提交
        e.preventDefault()
        $('.layui-form')[0].reset()
    })
})