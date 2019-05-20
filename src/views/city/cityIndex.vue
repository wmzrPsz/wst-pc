<<template>
    <div>
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>
        <div class="container-fluid bg-scenic ez-search ez-place-search">
            <form class="ez-search-form ez-scenic-search">
                <div class="input-group input-group-lg ez-search-box">
                    <input type="text" class="form-control ez-search-input" placeholder="请输入城市目的地名称" aria-describedby="basic-search"
                        v-model.trim="searchContent" >
                    <a class="input-group-addon" id="basic-search">
                        <i class="iconfont icon-search" @click="search()"></i>
                    </a>
                </div>

                <div class="text-center top-search">热搜：
                    <a>纽约</a>
                    <a>洛杉矶</a>
                    <a>华盛顿</a>
                    <a>三亚</a>
                    <a>泰国</a>
                    <a>普吉岛</a>
                    <a>新加坡</a>
                </div>

            <div class="search-result-content">
                <ul class="scenic-result">
                    <li v-for="(list, index) in cityList" :key="index">
                        <!-- <h4 class="title">{{list.cityName}}</h4> -->
                        <router-link :to="{path:'cityInfo/'+list.cityid }" tag="h4">{{list.cityName}}</router-link>
                        <!-- <h5 class="text-gray">城市：上海</h5> -->
                    </li>
                </ul>
                <ez-page :pages="pages" @page-change="pageChange"></ez-page>
            </div>

            </form>
        </div>
        <div class="container ez-container text-darkgray">
            <ezModule html-name="目的地" html-seal="内容模块"></ezModule>
        </div>
        <ezFooter></ezFooter>
        <ezAside></ezAside>
    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader";
import ezContainer from "components/home/ezContainer";
import ezModule from "components/home/ezModule";
import ezFooter from "components/home/ezFooter";
import ezAside from "components/home/ezAside";
import ezPage from "components/common/ezPage";
import { selectCity } from 'getData'
export default {
  name: "home",
  data() {
    return {
        searchContent: "",  //搜索内容
        pages:1,  //总页数
        cityList: [], //搜索城市内容
    };
  },
  created() {

  },
  components: {
    ezHeader,
    ezContainer,
    ezModule,
    ezFooter,
    ezAside,
    ezPage,
  },
  methods: {
      //点击搜索
      search(){
          this.pages = Math.random()*10>>0;
          if(this.isEmpty (this.searchContent)){
              this.infoMsg("请输入搜索内容")
              return;
          }
          this.pageChange()
          $(".ez-scenic-search .citylist-content").slideUp(100);
          $(".ez-scenic-search .search-result-content").slideDown(200);
        //   $(".ez-scenic-search .search-result-content").slideToggle(200);
      },
      async pageChange(pageNo = 1){
          let data = await selectCity({
              searchContent: this.searchContent,
              pageNo: pageNo
          })
          console.log(data)
          if(data){
              this.cityList = data.list
              this.pages = data.totalPage
          }
      }
  }
};
</script>