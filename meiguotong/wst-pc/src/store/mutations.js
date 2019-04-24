const mutations = {
      //登录
      addLogin: (state,data)=> {
        [state.loginUid, state.loginKey, state.loginTime, state.loginType] = [data.uid, data.key, data.time, 2];
        console.log(state.loginUid,state.loginKey,state.loginTime);
      },
      //退出登录
      removeLogin: state=> {
        console.log("退出登录");
        [state.loginUid, state.loginKey, state.loginTime, state.loginType] = ['', '', '', 1];
        console.log(state.loginUid,state.loginKey,state.loginTime);
      },
      //语言改变
      languageChange: (state, languageid)=> {
        state.languageid = languageid;
        console.log(state);
      },
      //货币改变
      currencyChange: (state, currencyid, currencySign)=> {
        state.currencyid = currencyid;
        state.currencySign = currencySign;
        console.log(state);
      },
      //设置网站基本参数
      setComProtocol: (state, comProtocol)=> {
        state.comProtocol = comProtocol;
      },
      //弹窗类型改变
      loginFlagChange(state, loginFlag) {
        state.loginFlag = loginFlag
      },
      //语言list改变
      languageListChange: (state,  languageList)=> {
        state.languageList = languageList
      },
      //货币集合改变
      currencyListChange: (state, currencyList)=> {
        state.currencyList = currencyList;
      },
      //设置会员信息
      setMember: (state, member)=> {
        state.member = member;
      },
      //设置热门城市
      sethotCityList: (state, hotCityList)=> {
        state.hotCityList = hotCityList;
      },
      //设置导航栏
      setComNavigationList: (state, comNavigationList)=> {
        state.comNavigationList = comNavigationList;
      },
      //设置选择城市
      setHotCityListIndex: (state, index)=> {
        state.hotCityList.forEach((list,key) => {
            if(key == index){
              list.flag = true;
            }else{
              list.flag = false;
            }
        });
      },
      //设置导航栏
      setComNavigationIndex: (state, index)=> {
        state.comNavigationList.forEach((list,key) => {
            if(key == index){
              list.flag = true;
            }else{
              list.flag = false;
            }
        });
      },
}

export default mutations