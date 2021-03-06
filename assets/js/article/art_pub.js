$(function () {
  const form = layui.form;
  //获取文章列表添加到下拉列表里面
  const initArtList = () => {
    //发起请求
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取文章列表失败");
        }
        //引用模板
        const htmlStr = template("tpl-cate", res);
        $("[name=cate_id]").html(htmlStr);
        form.render("select");
      },
    });
  };

  // 1. 初始化图片裁剪器
  var $image = $("#image");

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: ".img-preview",
  };

  // 3. 初始化裁剪区域
  $image.cropper(options);
  //给选择封面按钮绑定 点击事件
  $("#btnChooseImage").click(() => {
    $("#coverFile").click();
  });

  //监听coverFile的change事件
  $("#coverFile").change(function (e) {
    // 获取到文件的列表数组
    var files = e.target.files;
    // 判断用户是否选择了文件
    if (files.length === 0) {
      return;
    }
    // 根据文件，创建对应的 URL 地址
    var newImgURL = URL.createObjectURL(files[0]);
    // 为裁剪区域重新设置图片
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  let art_state = "已发布";
  //给另存为草稿按钮绑定点击事件
  $("#btnSave2").click(() => {
    art_state = "草稿";
  });

  //提交事件
  $("#form-pub").submit(function (e) {
    e.preventDefault();
    // 2. 基于 form 表单，快速创建一个 FormData (js原生)对象
    let fd = new FormData($(this)[0]);
    // 3. 将文章的发布状态，存到 fd 中
    fd.append("state", art_state);
    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280,
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append("cover_img", blob);
        // 6. 发起 ajax 数据请求
        publishArt(fd);
      });
  });
  //发布文章的函数
  const publishArt = function (fd) {
    $.ajax({
      method: "POST",
      url: "/my/article/add",
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("发布文章失败");
        }
        layer.msg("发布文章成功");
        // 发布文章成功后，跳转到文章列表页面
        location.href = "/article/art_list.html";
        // 改变选中的文章状态
        // console.log($("#change"));
        window.parent.change();
      },
    });
  };
  //调用函数
  initArtList();
  // 初始化富文本编辑器
  initEditor();
});
