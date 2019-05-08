<template>
    <div>
        
        <ez-header></ez-header>
        <ez-container></ez-container>

        <ez-footer></ez-footer>
        <ez-aside></ez-aside>

    </div>
</template>
<script>
import ezHeader from "components/home/ezHeader"
import ezContainer from "components/home/ezContainer"
import ezFooter from "components/home/ezFooter"
import ezAside from "components/home/ezAside"
export default {
    name: "tourInfo",
    data() {
        return {
            
        }
    },
    components: {
        ezHeader,
        ezContainer,
        ezFooter,
        ezAside,
    },
}
</script>
