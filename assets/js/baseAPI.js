//请求拦截器
$.ajaxPrefilter((options) => {
    console.log(options);
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // 给headers设置拦截
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.getItem("token"),
        }
    }
    //权限设置,在请求失败与否之后都调用 complete，判断是否身份认证失败
    options.complete = (res) => {
        console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //清除token
            localStorage.removeItem('token')
            //强制跳转到login页面
            location.href = '/login.html'
        }
    }
})