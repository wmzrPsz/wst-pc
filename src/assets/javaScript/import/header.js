/**
 * 引用JS和CSS头文件
 */
const rootPath = getRootPath(); //项目路径
const htmlPath = rootPath + "pages/common/"

/**
 * 动态加载CSS和JS文件
 */
const dynamicLoading = {
    meta : () => {
        document.write('<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">');
    },
    icon :() =>{
        document.write('<link rel="icon" href="' + rootPath + 'images/favicon.ico" />');
    },
    css: path => {
        if(!path || path.length === 0){
            throw new Error('argument "path" is required!');
        }
        document.write('<link rel="stylesheet" type="text/css" href="' + path + '">');
    },
    js: (path, charset) => {
        if(!path || path.length === 0){
            throw new Error('argument "path" is required!');
        }
        document.write('<script charset="' + (charset ? charset : "UTF-8") + '" src="' + path + '"></script>');
    }
};

/**
 * 取得项目路径
 * @author psz
 */
function getRootPath() {
    //取得当前URL
    let path = window.document.location.href;
    //取得主机地址后的目录
    let pathName = window.document.location.pathname;
    let post = path.indexOf(pathName);
    //取得主机地址
    let hostPath = path.substring(0, post);
    //取得项目名
    let name = pathName.substring(0, pathName.substr(1).indexOf("/") + 1);
    return hostPath + name + "/web/" ;
}

//动态生成meta
dynamicLoading.meta();

//动态生成icon
dynamicLoading.icon();

//动态加载项目 CSS文件
dynamicLoading.css(rootPath + "vendor/bootstrap/bootstrap.min.css");
dynamicLoading.css(rootPath + "vendor/umeditor/themes/default/css/umeditor.css");
dynamicLoading.css(rootPath + "vendor/calendar/calendar-pro.css");
dynamicLoading.css(rootPath + "css/reset.css");
dynamicLoading.css(rootPath + "css/iconfont/iconfont.css");
dynamicLoading.css(rootPath + "css/ez-slider.css");
dynamicLoading.css(rootPath + "css/ez-public.css");
dynamicLoading.css(rootPath + "css/ez-website.css");
dynamicLoading.css(rootPath + "css/E-publc.css");

//动态加载项目 JS文件
dynamicLoading.js(rootPath + "vendor/jquery/jQuery.js");
dynamicLoading.js(rootPath + "vendor/bootstrap/bootstrap.min.js");
dynamicLoading.js(rootPath + "js/ez-public.js");
dynamicLoading.js(rootPath + "js/ez-page.js");
dynamicLoading.js(rootPath + "js/ez-slider.js");
dynamicLoading.js(rootPath + "js/jqPaginator.js");
dynamicLoading.js(rootPath + "js/import/layer/layer.js");
dynamicLoading.js(rootPath + "js/import/base.js");
dynamicLoading.js(rootPath + "js/import/vue.js");
dynamicLoading.js(rootPath + "js/import/common.js");
dynamicLoading.js(rootPath + "js/import/config.js");
dynamicLoading.js(rootPath + "js/import/request.js");
dynamicLoading.js(rootPath + "js/import/md5.js");
dynamicLoading.js(rootPath + "vendor/umeditor/umeditor.config.js");
dynamicLoading.js(rootPath + "vendor/raty/lib/jquery.raty.js");
dynamicLoading.js(rootPath + "vendor/calendar/calendar-two.js");
dynamicLoading.js(rootPath + "vendor/umeditor/umeditor.min.js");
dynamicLoading.js(rootPath + "vendor/umeditor/lang/zh-cn/zh-cn.js");

//关闭
document.close();

//动态加载html
// $(function(){
//     $(".container").append('<div id="header"></div>');
//     $(".header").load(htmlPath + "ez-header.html");
// });

