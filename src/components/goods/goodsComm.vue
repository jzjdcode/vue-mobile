<template>
    <div class="main">
        <!-- 商品评论 -->
        <comment :id="id"></comment>
    </div>
</template>
<script>
    import comment from '../subcomponent/comment.vue'
export default {
    data() {
        return {
            id: this.$route.params.id
        }
    },
    components: {
        comment
    }
}
</script>
<style lang="less" >
    .main {
        padding: 0 10px;
    }
</style>
