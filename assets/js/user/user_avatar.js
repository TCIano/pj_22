// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}
//点击上传按钮出现input文件框的
$('#btnChooseImage').click(() => {
    $('#file').click();
})
// 1.3 创建裁剪区域
$image.cropper(options)

//为文件添加监听事件
$('#file').change((e) => {
    console.log(e.target.files);
    if (e.target.files.length === 0) return layer.msg('请选择文件')
    //取到用户的文件
    let file = e.target.files[0]
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file);
    // 3. 重新初始化裁剪区域
    $image
        .cropper("destroy") // 销毁旧的裁剪区域
        .attr("src", imgURL) // 重新设置图片路径
        .cropper(options); // 重新初始化裁剪区域
})

//为上传按钮添加点击事件
$('#btnUpload').click(() => {
    // 1、拿到用户裁切之后的头像
    // 直接复制代码即可
    const dataURL = $image.cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
    })
        .toDataURL("image/png");

    //发送请求
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
            avatar: dataURL
        },
        success: (res) => {
            if (res.status !== 0) return layer.msg('更换头像失败')
            //重新获取用户信息
            window.parent.getUserInfo();
        }

    });
})