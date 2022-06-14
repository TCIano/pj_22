$(function () {
    //获取表格数据
    const initTable = () => {
        //发送请求
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status !== 0) return layer.msg('获取文章分类列表失败')
                //使用模板
                const htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
            }
        });
    }

    //调用获取表格数据函数
    initTable()
})