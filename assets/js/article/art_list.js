// 定义一个查询的参数对象，将来请求数据的时候，
// 需要将请求参数对象提交到服务器
const q = {
  pagenum: 1, // 页码值，默认请求第一页的数据
  pagesize: 5, // 每页显示几条数据，默认每页显示2条
  cate_id: "", // 文章分类的 Id
  state: "", // 文章的发布状态
};
const laypage = layui.laypage;
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
      //调用分页函数
      renderPage(res.total);
    },
  });
};

// 定义美化时间的过滤器
template.defaults.imports.dataFormat = function (date) {
  const dt = new Date(date);

  var y = dt.getFullYear();
  var m = padZero(dt.getMonth() + 1);
  var d = padZero(dt.getDate());

  var hh = padZero(dt.getHours());
  var mm = padZero(dt.getMinutes());
  var ss = padZero(dt.getSeconds());

  return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
};

// 定义补零的函数
function padZero(n) {
  return n > 9 ? n : "0" + n;
}

//渲染list下拉列表的分类
const initCateList = () => {
  //发起请求
  $.ajax({
    method: "GET",
    url: "/my/article/cates",
    success: (res) => {
      if (res.status !== 0) return layer.msg("获取文章分类列表失败");
      //填充模板
      const htmlStr = template("tpl-cate", res);
      $("[name=cate_id]").html(htmlStr);
      // 通过 layui 重新渲染表单区域的UI结构
      layui.form.render();
    },
  });
};

//给筛选按钮绑定点击事件
$("#form-search").on("submit", (e) => {
  e.preventDefault();
  //获取表单的值
  let cate_id = $("[name=cate_id]").val();
  let state = $("[name=state]").val();
  //更新q对象的值
  q.cate_id = cate_id;
  q.state = state;
  //重新渲染文章列表
  initArticleList();
});

//分页函数
// let first = true;
const renderPage = (total) => {
  // 调用 laypage.render() 方法来渲染分页的结构
  laypage.render({
    elem: "pageBox", // 分页容器的 Id
    count: total, // 总数据条数
    limit: q.pagesize, // 每页显示几条数据
    curr: q.pagenum, // 设置默认被选中的分页
    layout: ["count", "limit", "prev", "page", "next", "skip"],
    limits: [2, 3, 5, 10], // 每页展示多少条
    // 分页发生切换的时候，触发 jump 回调
    jump: function (obj, first) {
      console.log(obj.curr);
      // 把最新的页码值，赋值到 q 这个查询参数对象中
      q.pagenum = obj.curr;
      if (!first) {
        initArticleList();
      }
    },
  });
};
//给删除按钮添加点击事件
$("tbody").on("click", ".btn-delete", function (index) {
  let id = $(this).attr("data-id");
  let btnLength = $(".btn-delete").length;
  console.log(btnLength);
  console.log(id);
  //发起请求
  layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
    $.ajax({
      method: "GET",
      url: "/my/article/delete/" + id,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("删除文章失败！");
        }
        layer.msg("删除文章成功！");
        if (btnLength === 1) {
          // 如果 btnlen 的值等于1，证明删除完毕之后，页面上就没有任何数据了
          // 页码值最小必须是 1
          //页数不是第一页，页码值减一，第一页的话，页码值不变

          q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
        }
        initArticleList();
      },
    });
    layer.close(index);
  });
});
//调用获取文章分类的函数
initCateList();
//调用获取文章列表函数
initArticleList();
