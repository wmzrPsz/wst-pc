//url相关的
  // const baseUrl = "http://47.110.130.107:8080/meiguotong/a/interface/";
//  const baseUrl = "http://47.105.70.4:8989/meiguotong/a/interface/";
const baseUrl = "http://localhost:8080/meiguotong/a/interface/";
// const baseUrl = "http://192.168.1.82:8080/meiguotong/a/interface/";

//获取会员详情
const myInforUrl = baseUrl + "member/myInfor";
//根据语言获取国家城市
const getCountryCityUrl = baseUrl + "member/getCountryCity";
//上传图片
const imgUploadUrl = baseUrl + "common/imgUpload";
//发送验证码
const sendSmsUrl = baseUrl + "forlogin/sendSms";
//绑定邮箱
const checkEmailUrl = baseUrl + "forlogin/checkEmail";
//保存个人信息
const updateMyUrl = baseUrl + "member/updateMy";
//获取消息中心系统消息
const getCompushUrl = baseUrl + "member/getCompush";
//获取消息中心评论消息
const getCommentUrl = baseUrl + "member/getComment";
//获取我的草稿
const myDraftUrl = baseUrl + "member/myDraft";
//删除我的草稿
const deleteDraftUrl = baseUrl + "member/deleteDraft";
//获取关于我们
const getArticleUrl = baseUrl + "member/getArticle";
//获取公司子账号
const companyInforUrl = baseUrl + "member/companyInfor";
//修改公司子账号
const updateCompanyInforUrl = baseUrl + "member/updateCompanyInfor";
//验证子账号是否存在
const validateMemberUrl = baseUrl + "member/validateMember";
//获取常用联系人
const getMemberContactUrl = baseUrl + "member/getMemberContact";
//修改常用联系人
const addMemberContactUrl = baseUrl + "member/addMemberContact";
//删除常用联系人
const deleteMemberContactUrl = baseUrl + "member/deleteMemberContact";
//获取我的收藏
const myCollectionUrl = baseUrl + "member/myCollection";
//取消收藏
const deleteCollectionUrl = baseUrl + "member/deleteCollection";
//加入购物车
const addCollectionToCarUrl = baseUrl + "member/addCollectionToCar";
//获取玩家认证信息
const getGuideInfoUrl = baseUrl + "member/getGuideInfo";
//获取玩家擅长属性
const getGuideLabelUrl = baseUrl + "member/getGuideLabel";
//提交玩家认证信息
const addGuideUrl = baseUrl + "member/addGuide";
//获取导游路线规划
const getGuideRouteUrl = baseUrl + "guide/getGuideRoute";
//获取导游路线规划详情
const getGuideRouteDetailUrl = baseUrl + "guide/getGuideRouteDetail";
//获取导游路线景点
const getCityScenicUrl = baseUrl + "guide/getCityScenic";
//修改添加导游路线
const updateGuideRouteUrl = baseUrl + "guide/updateGuideRoute";
//删除导游路线
const deleteGuideRouteUrl = baseUrl + "guide/deleteGuideRoute";
//获取导游价格设置和退款价格设置
const getGuidePriceUrl = baseUrl + "guide/getGuidePrice";
//修改导游价格设置和退款价格设置
const updateGuidePriceUrl = baseUrl + "guide/updateGuidePrice";
//获取标签属性
const getLabelUrl = baseUrl + "common/getLabel";
//根据城市获取景点
const getScenicByCityUrl = baseUrl + "route/getScenicByCity";
//根据语言获取城市
const getCityListUrl = baseUrl + "common/getCityList";
//常规路线搜索
const selectRouteUrl = baseUrl + "route/selectRoute";
//评论列表
const selectCommentUrl = baseUrl + "common/selectComment";
//子评论列表
const getChildCommentUrl = baseUrl + "common/getChildComment";
//评论点赞
const digCommentUrl = baseUrl + "common/digComment";
//添加子评论
const addChildCommentUrl = baseUrl + "common/addChildComment";
//常规路线详情
const getRouteDetailsUrl = baseUrl + "route/getRouteDetails";
//退款说明
const refundInforUrl = baseUrl + "common/refundInfor";
//常规路线行程内容
const getRouteContentUrl = baseUrl + "route/getRouteContent";
//添加购物车
const saveCarUrl = baseUrl + "common/saveCar";
//用户咨询列表
const getConsultUrl = baseUrl + "common/getConsult";
//添加用户咨询
const saveConsultUrl = baseUrl + "common/saveConsult";
//常规路线/参团日期价格
const getRoutePriceDetailsUrl = baseUrl + "route/getRoutePriceDetails";
//获取保险
const getInsuranceUrl = baseUrl + "common/getInsurance";
//常规路线生成订单
const saveRouteOrderUrl = baseUrl + "route/saveRouteOrder";
//获取Logo设置管理
const getLogoUrl = baseUrl + "common/getLogo";
//当地参团搜索
const selectCityRouteUrl = baseUrl + "route/selectCityRoute";
//获取语言
const getLanguageUrl = baseUrl + "common/getLanguage";
//获取货币
const getCurrencyUrl = baseUrl + "common/getCurrency";
//获取基本参数
const getProtocolUrl = baseUrl + "common/getProtocol";
//参团详情
const getCityRouteDetailsUrl = baseUrl + "route/getCityRouteDetails";
//当地参团生成订单
const saveCityRouteOrderUrl = baseUrl + "route/saveCityRouteOrder";
//景点搜索
const selectScenicListUrl = baseUrl + "scenic/selectScenicList";
//获取城市景点数量
const getCityScenicNumUrl = baseUrl + "scenic/getCityScenicNum";
//景点详情
const getScenicDetailsUrl = baseUrl + "scenic/getScenicDetails";
//景点门票数量
const getScenicNumUrl = baseUrl + "scenic/getScenicNum";
//生成景点订单
const saveScenicOrderUrl = baseUrl + "scenic/saveScenicOrder";
//旅游定制的天数列表
const getTravelDayUrl = baseUrl + "customization/getTravelDay";
//根据旅游天数获取旅游定制的列表
const getTravelByDayUrl = baseUrl + "customization/getTravelByDay";
//城市详情
const getCityDetailsUrl = baseUrl + "common/getCityDetails";
//定制城市关键字搜索
const getCityByTitleUrl = baseUrl + "customization/getCityByTitle";
//城市详情
const getCityUrl = baseUrl + "customization/getCity";
//获取热门目的地
const getHotCityUrl = baseUrl + "common/getHotCity";
//酒店列表
const getHotelByCityUrl = baseUrl + "common/getHotelByCity";
//获取酒店房间列表
const getHotelRoomUrl = baseUrl + "common/getHotelRoom";
//酒店房间详情
const getHotelRoomDetailsUrl = baseUrl + "common/getHotelRoomDetails";
//根据城市及搜索条件获取汽车接口
const getCarByCityUrl = baseUrl + "common/getCarByCity";
//包车租车查询车辆列表
const getCarByRentUrl = baseUrl + "common/getCarByRent";
//定制生成订单
const saveTravelOrderUrl = baseUrl + "customization/saveTravelOrder";
//定制获取景点
const getScenicByTitleUrl = baseUrl + "customization/getScenicByTitle";
//定制获取景点详情
const getScenicUrl = baseUrl + "customization/getScenic";
//定制模板详情
const getTravelDetailsUrl = baseUrl + "customization/getTravelDetails";
//获取导游信息
const getGuideByCityUrl = baseUrl + "common/getGuideByCity";
//获取出发港口
const getStartCityUrl = baseUrl + "cruise/getStartCity";
//获取邮轮航线
const getCourseUrl = baseUrl + "cruise/getCourse";
//获取邮轮公司
const getLinerCompanyUrl = baseUrl + "cruise/getLinerCompany";
//获取邮轮搜索
const cruiseSearchUrl = baseUrl + "cruise/cruiseSearch";
//邮轮路线搜索
const cruiseScreenUrl = baseUrl + "cruise/cruiseScreen";
//邮轮详情
const linerlineDetailsUrl = baseUrl + "cruise/linerlineDetails";
//邮轮行程列表
const tripListUrl = baseUrl + "cruise/tripList";
//邮轮日期价格
const getLinePriceDetailsUrl = baseUrl + "cruise/getLinePriceDetails";
//获取邮轮房间
const linerRoomListUrl = baseUrl + "cruise/linerRoomList";
//邮轮确定订单
const saveLineOrderUrl = baseUrl + "cruise/saveLineOrder";
//导游筛选列表
const guideScreenUrl = baseUrl + "guide/guideScreen";
//导游详情
const guideDetailsUrl = baseUrl + "guide/guideDetails";
//导游推荐路线
const guideRouteUrl = baseUrl + "guide/guideRoute";
//导游日期详情
const getGuideDateDetailsUrl = baseUrl + "guide/getGuideDateDetails";
//导游路线日期详情
const getGuideRouteDateDetailsUrl = baseUrl + "guide/getGuideRouteDateDetails";
//导游确定订单
const saveGuideOrderUrl = baseUrl + "guide/saveGuideOrder";
//短程接送车辆搜索
const selectShortCarUrl = baseUrl + "car/selectShortCar";
//短程接送生成订单
const saveShortCarOrderUrl = baseUrl + "car/saveShortCarOrder";
//接送机车辆搜索
const selectAirportCarUrl = baseUrl + "car/selectAirportCar";
//接送机生成订单
const saveAirportCarOrderUrl = baseUrl + "car/saveAirportCarOrder";
//获取车辆业务类型接口
const selectCarServiceUrl = baseUrl + "car/selectCarService";
//获取附近城市
const getNearbyCityUrl = baseUrl + "common/getNearbyCity";
//获取城市景点
const getCitySpotUrl = baseUrl + "common/getCitySpot";
//获取网站页面
const getModuleHtmlListUrl = baseUrl + "module/getModuleHtmlList";
//获取可添加模块
const getModuleNameListUrl = baseUrl + "module/getModuleNameList";
//获取关联模块
const getModuleHtmlNameListUrl = baseUrl + "module/getModuleHtmlNameList";
//获取车辆列表
const getCarListUrl = baseUrl + "module/getCarList";
//获取评论列表
const getComCommentListUrl = baseUrl + "module/getComCommentList";
//获取城市列表
const getComCityListUrl = baseUrl + "module/getComCityList";
//获取景点列表
const getScenicSpotListUrl = baseUrl + "module/getScenicSpotList";
//获取游轮列表
const getlinertLineListUrl = baseUrl + "module/getLinertLineList";
//获取订单列表
const getOrderSysListUrl = baseUrl + "module/getOrderSysList";
//获取定制列表
const getTravelCustomizationListUrl = baseUrl + "module/getTravelCustomizationList";
//获取攻略列表
const getCityStrategyListUrl = baseUrl + "module/getCityStrategyList";
//获取导游列表
const getGuideListUrl = baseUrl + "module/getGuideList";
//获取导游路线列表
const getGuideRouteListUrl = baseUrl + "module/getGuideRouteList";
//获取常规路线列表
const getRoute1ListUrl = baseUrl + "module/getRoute1List";
//获取当地参团列表
const getRoute2ListUrl = baseUrl + "module/getRoute2List";
//获取网站文章列表
const getComArticle1ListUrl = baseUrl + "module/getComArticle1List";
//获取资讯列表
const getComArticle2ListUrl = baseUrl + "module/getComArticle2List";
//获取租车供应商列表
const getSysUserListUrl = baseUrl + "module/getSysUserList";
//获取景点门票列表
const getScenicSpotTicketListUrl = baseUrl + "module/getScenicSpotTicketList";
//保存模板内容
const addModuleContentUrl = baseUrl + "module/addModuleContent";   
//模块排序
const updateSortUrl = baseUrl + "module/updateSort";   
//模块详情
const getModuleContentByIdUrl = baseUrl + "module/getModuleContentById";   
//获取模块数据
const getModuleDataInfoUrl = baseUrl + "module/getModuleDataInfo";   
//删除模块
const deleteModuleUrl = baseUrl + "module/deleteModule";   
//登录
const loginUrl = baseUrl + "forlogin/login";
//注册
const registerUrl = baseUrl + "forlogin/register";
//验证账号是否注册
const checkRegisterUrl = baseUrl + "forlogin/checkRegister";
//修改密码
const updatePasswordUrl = baseUrl + "forlogin/updatePassword";
//获取导航栏
const getComNavigationUrl = baseUrl + "common/getComNavigation";


//获取我的订单
const myOrderUrl = baseUrl + "member/myOrder";
//取消订单
const cancelOrderUrl = baseUrl + "member/cancelOrder";
//支付接口
const payOrderUrl = baseUrl + "common/payOrder";
//商家注册接口
const BusinessRegisterUrl = baseUrl + "forlogin/BusinessRegister";
