<template>
    <nav class="text-center col-lg-12 col-md-12 col-sm-12">
        <ul class="pagination ez-navigation" v-show="show">
            <li @click.stop="pageChange(-1)">
                <a class="page-next" aria-label="Next" style="margin-right: 10px;">
                    <span aria-hidden="true">上一页 &gt;</span>
                </a>
            </li>
            <li v-show="pageNo>5" @click.stop="jumpPage(1)"><a href="#">1</a></li>
            <li v-show="efont"><a>...</a></li>
            <li v-for="(num,index) in indexs" :key="index" :class="{active:pageNo==num}" @click.stop="jumpPage(num)"><a>{{num}}</a></li>
            <li v-show="ebehind"><a>...</a></li>
            <li v-show="pageNo<pages-4" @click.stop="jumpPage(pages)"><a>{{pages}}</a></li>
            <li @click.stop="pageChange(1)">
                <a class="page-next" aria-label="Next" style="margin-left: 10px;">
                    <span aria-hidden="true">下一页 &gt;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
export default {
    name: "ezPage",
    props: {
        //总页数
        pages:{
            type: Number,
            default: 1
        },
        params:{
            type: Object,
        }
    },
    data() {
        return {
            pageNo: 1,
        }
    },
    computed: {
        show: function () {
            return this.pages && this.pages != 1
        },
        pstart: function () {
            return this.pageNo <= 1;
        },
        pend: function () {
            return this.pageNo >= this.pages;
        },
        efont: function () {
            if (this.pages <= 7) return false;
            return this.pageNo > 5
        },
        ebehind: function () {
            if (this.pages <= 7) return false;
            let nowAy = this.indexs;
            return nowAy[nowAy.length - 1] != this.pages;
        },
        indexs: function () {

            let left = 1,
                right = this.pages,
                ar = [];
            if (this.pages >= 7) {
                if (this.pageNo > 5 && this.pageNo < this.pages - 4) {
                    left = Number(this.pageNo) - 3;
                    right = Number(this.pageNo) + 3;
                } else {
                    if (this.pageNo <= 5) {
                        left = 1;
                        right = 7;
                    } else {
                        right = this.pages;

                        left = this.pages - 6;
                    }
                }
            }
            while (left <= right) {
                ar.push(left);
                left++;
            }
            return ar;
        },
    },
    methods: {
        //点击上一页 下一页
        pageChange: function (index) {
            index += this.pageNo;
            if (index < 1 || index > this.pages) {
                return;
            }
            this.pageNo = index;
            this.getData();
        },
        //选择页数
        jumpPage: function (id) {
            if (id == this.pageNo) {
                return;
            }
            this.pageNo = id;
            this.getData();
        },
        //重新获取数量
        getData(){
             this.$emit('page-change',this.pageNo,this.params) 
        },
    },
}
</script>

