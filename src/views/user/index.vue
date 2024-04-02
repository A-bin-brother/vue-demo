<script setup lang="ts">
import OrgTree from "./OrgTree.vue";
import UserTable from "./UserTable.vue";
</script>

<template>
  <div class="main">
    <div>
        <!-- OrgAPI 提供一层所以没有实现懒加载 -->
      <OrgTree />
    </div>
    <div class="ml-10">
      <UserTable />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  display: flex;
  
  .ml-10 {
    margin-left: 20px;
  }
}
</style>
