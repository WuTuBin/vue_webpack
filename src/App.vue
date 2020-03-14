<template>
    <div>
        <el-button @click="doIt">埋点</el-button>
    </div>
</template>
<script>
export default {
    methods: {
        doIt() {
            fetch('/user').then(res=>res.json()).then(data=>console.log(data))
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
