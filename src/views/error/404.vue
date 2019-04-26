<template>
    <div id = "error">
        <div class="container-fluid bg-gary">
            <div class="container ez-container ez-content-404">
                <div class="ez-icon-404"></div>
            </div>
        </div>
    </div>
</template>
<script>
import {infoMsg} from '@/utils/popup'
import {login} from 'getData'

export default {
    name:"error",
    data () {
        return {
            
        }
    },
    created () {
        console.log( this.$message)
        this.infoMsg("警告哦，这是一条警告消息")
    }
    
}
</script>
