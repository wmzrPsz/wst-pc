import { 
    getLanguage, 
    getProtocol, 
    getCurrency, 
    myInfor, 
    getHotCity, 
    getComNavigation,
} from 'getData';
import router from "../router/index";

const actions = {
    //登录
    addLogin({dispatch, commit}, obj) {
        commit("STATE_CHANGE", {
            loginFlag: 0,
            loginUid: obj.uid,
            loginKey: obj.uid,
            loginTime: obj.uid,
            loginType: 2,
        })
        dispatch('buy/getCarNum', {}, {root: true}) 
        let path = obj.route.query.redirect
        router.push({path: path == '/' || path == undefined ? '/home' : path});
    },
    //退出登录
    removeLogin({commit, dispatch},route) {
        commit("STATE_CHANGE", {
            loginUid: "",
            loginKey: "",
            loginTime: "",
            loginType: 1,
        })
        dispatch('buy/getCarNum', {}, {root: true}) 
        //判断是否需要登录  如果需要登录重新跳回首页
        if(route.meta.requireAuth){
            router.push("/")
        }
    },
    //首次加载页面
    craeteInit({dispatch, commit}) {
        commit("STATE_CHANGE",{
            loginFlag: 0
        })
        dispatch("myInfor")
        dispatch("getProtocol")
        dispatch("getLanguage")
        dispatch("getCurrency")
        dispatch("getHotCity")
        dispatch("getComNavigation")
        dispatch('buy/getCarNum', {}, {root: true}) 
        
    },
    //获取会员信息
    myInfor({commit, state}){
        if (state.loginType == 2) {
            myInfor().then( res => {
                commit("STATE_CHANGE",{
                    member: res
                })
            })
        }
    },
    //获取网站基本参数
    getProtocol({commit}) {
        getProtocol().then( res => {
            commit("STATE_CHANGE",{
                comProtocol: res
            })
        })
    },
    //获取语言
    getLanguage({commit}) {
        getLanguage().then( res => {
            commit("STATE_CHANGE",{
                languageList: res
            })
        })
    },
    //获取货币
    getCurrency({commit}) {
        getCurrency().then( res => {
            commit("STATE_CHANGE",{
                currencyList: res
            })
        })
    },
    //获取热门城市
    getHotCity({commit}){
        getHotCity().then( res => {
            for (const list of res) {
                Vue.set(list, "flag", false);
            }
            commit("STATE_CHANGE",{
                hotCityList: res
            })
        })
    },
    //获取导航栏
    getComNavigation({commit}){
        getComNavigation().then( res => {
            for (const list of res) {
                Vue.set(list, "flag", false);
            }
            commit("STATE_CHANGE",{
                comNavigationList: res
            })
        })
    },
}

export default actions