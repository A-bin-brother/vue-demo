<template>
  <!-- <div>{{ count }}</div> -->
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="成员管理" name="first">
      <index></index>
    </el-tab-pane>
    <el-tab-pane label="团队管理" name="second">团队管理</el-tab-pane>
    <el-tab-pane label="职位维护" name="third">职位维护</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";
import index from "./views/user/index.vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref("first");
// const count = ref(0);
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style lang="scss" scoped>
// .demo-tabs > .el-tabs__content {
//   padding: 32px;
//   color: #6b778c;
//   font-size: 32px;
//   font-weight: 600;
// }
</style>
