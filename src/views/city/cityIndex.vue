<<template>
    <div>
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>
        <citySearchBar></citySearchBar>
        <div class="container ez-container text-darkgray">
            <ezModule html-name="首页" html-seal="内容模块"></ezModule>
        </div>
        <ezFooter></ezFooter>
        <ezAside></ezAside>
    </div>
</template>
<script>
    import ezHeader from "components/home/ezHeader"
    import ezContainer from "components/home/ezContainer"
    import citySearchBar from "components/city/citySearchBar"
    import ezModule from "components/home/ezModule"
    import ezFooter from "components/home/ezFooter"
    import ezAside from "components/home/ezAside"
    import { mapState } from "vuex"
    export default {
    name: "home",
    data() {
    return {

}
},
    computed: {
    ...mapState([ "comProtocol", ]),
},
    created () {
    console.log("----------------------------------------------------------------")
},
    
    components: {
    ezHeader,
    ezContainer,
    citySearchBar,
    ezModule,
    ezFooter,
    ezAside
}
}
</script>