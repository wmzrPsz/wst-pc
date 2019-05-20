<template>
    <div>
        <div class="modal fade ez-player-modal" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close video-close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="myModalLabel">汽车视频</h4>
                    </div>
                    <div class="modal-body">
                        <video :src="url" controls="controls" autoplay="autoplay" class='ez-video' style="width:100%;max-height:465px;"></video>
                    </div>
                    <!-- <div class="modal-footer">
          <button type="button" class="btn btn-default video-close" data-dismiss="modal">Close</button>
        </div> -->
                </div>
            </div>
        </div>        
    </div>
</template>
<script>
export default {
    name: "ezVideo",
    props: {
        show:{
            type: Boolean,
            default: false,
        },
        url:{
            type: String,
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        //显示视频
         showVideo(){
             $("#myModal").modal('show');
         }
    },
}
</script>
