$(function () {
  const form = layui.form;
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

  //点击删除按钮，删除文章类别，删除按钮为动态添加，所以要用事件委托
  $("tbody").on("click", ".btn-delete", function () {
    const id = $(this).attr("data-id");
    console.log(id);
    //弹出提示框询问是否要删除
    layer.confirm(
      "确定删除该文章分类吗？",
      { icon: 3, title: "提示" },
      (index) => {
        //发出请求
        $.ajax({
          method: "GET",
          url: "/my/article/deletecate/" + id,
          success: (res) => {
            if (res.status !== 0) return layer.msg("删除文章分类失败");
            //删除成功获取文章分类列表
            initTable();
            //关闭弹出层
            layer.close(index);
          },
        });
      }
    );
  });

  //点击编辑按钮，编辑文章分类
  let indexEdit = null;
  $("tbody").on("click", ".btn-edit", function () {
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    const id = $(this).attr("data-id");
    // 发起请求获取对应分类的数据
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });

  // 更新文章分类
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg("更新分类数据失败！");
        }
        layer.msg("更新分类数据成功！");
        layer.close(indexEdit);
        //重新获取列表
        initTable();
      },
    });
  });
  //调用获取表格数据函数
  initTable();
});
