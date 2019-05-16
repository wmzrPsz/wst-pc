<template>
    <div>
       
        <ezHeader></ezHeader>
        <ezContainer></ezContainer>

        <ezFooter></ezFooter>
        <ezAside></ezAside>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
import ezModule from "components/home/ezModule"
import { mapState } from 'vuex'
export default {
    name: "gameIndex",
    data() {
        return {
            
        }
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
        ezModule
    },
}
</script>
