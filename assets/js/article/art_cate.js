$(function () {
  //获取表格数据
  const initTable = () => {
    //发送请求
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: (res) => {
        if (res.status !== 0) return layer.msg("获取文章分类列表失败");
        //使用模板
        const htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  };
  //点击添加按钮添加文章类别
  let indexAdd = null;
  $("#btnAdd").on("click", () => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });

  //点击弹出层提交按钮提交数据
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    //发送请求
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) return layer.msg("添加文章分类失败");
        //添加成功获取文章分类列表
        initTable();
        //关闭弹出层
        layer.close(indexAdd);
      },
    });
  });
  //调用获取表格数据函数
  initTable();
});
