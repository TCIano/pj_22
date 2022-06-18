// 定义一个查询的参数对象，将来请求数据的时候，
// 需要将请求参数对象提交到服务器
const q = {
  pagenum: 1, // 页码值，默认请求第一页的数据
  pagesize: 2, // 每页显示几条数据，默认每页显示2条
  cate_id: "", // 文章分类的 Id
  state: "", // 文章的发布状态
};

//定义获取文章列表函数
const initArticleList = () => {
  //发送请求获取列表
  $.ajax({
    method: "GET",
    url: "/my/article/list",
    data: q,
    success: (res) => {
      if (res.status !== 0) return layer.msg("获取文章分类列表失败");
      //引入模板,把数据渲染到tbody中
      const htmlStr = template("tpl-table", res);
      $("tbody").html(htmlStr);
    },
  });
};
//调用获取文章列表函数
initArticleList();
