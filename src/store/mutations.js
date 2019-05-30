
import router from "../router/index";

const mutations = {
      //改变state的值
      STATE_CHANGE(state, opt){
          Object.keys({...state}).forEach(k1 => {
            Object.keys({...opt}).forEach(k2 => {
                if(k1 == k2){
                  state[k1] = opt[k2]
                }
            })
          })
          console.log(state)
          console.log(opt)
      },
      //弹窗类型改变
      loginFlagChange(state, loginFlag) {
        state.loginFlag = loginFlag
      },
      //设置选择城市
      setHotCityListIndex: (state, index)=> {
        state.hotCityList.forEach((list,key) => {
          list.flag = list.cityid == index ? true : false;
        });
      },
      //设置选择导航栏
      setComNavigationIndex: (state, index)=> {
        state.comNavigationList.forEach((list,key) => {
          list.flag = list.id == index ? true : false;
        });
      },
}

export default mutations