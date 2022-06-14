//获取用户基本信息函数
function getUserInfo() {
    //发出请求获取 用户信息
    $.ajax({
        method: "GET",
        url: '/my/userinfo',
        success: (res) => {
            console.log(res);
            if (res.status != 0) return layer.msg(res.message);
            layer.msg(res.message)
            //调用渲染头像函数
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     console.log(res);
        // }
    });
}

//渲染头像
function renderAvatar(data) {
    //拿到用户名
    const name = data.nickname || data.username;
    //如果有自定义头像则使用自定义头像如果没有则使用用户名开头大写为头像
    $("#welcome").html(`欢迎 ${name}`);
    if (data.user_pic == null) {
        $('.layui-nav-img').hide();
        $('.text-avatar').html(name[0].toUpperCase())
    } else {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src', data.user_pic);
    }
}

//点击退出回到登录页面
$('.btnLogout').click(() => {
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },
        function (index) {

            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
})

//调用获取用户信息函数
getUserInfo()