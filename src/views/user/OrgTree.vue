<template>
  <el-input
    v-model="filterText"
    style="width: 240px; margin-bottom: 10px"
    placeholder="部门搜索"
  />
  <el-tree
    ref="treeRef"
    node-key="id"
    style="max-width: 600px"
    lazy
    :data="treeData"
    :load="loadNode"
    :props="defaultProps"
    :expand-on-click-node="false"
    :filter-node-method="filterNode"
    @node-click="handleNodeClick"
  >
    <template #default="{ node, data }">
      <span class="dept">
        <el-icon><User /></el-icon>
        <div class="deptName">
          {{ node.label }}
        </div>
      </span>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import orgApi from "../../api/org";
import { ref, watch, onMounted } from "vue";
import { ElTree } from "element-plus";
import { getCurrentInstance } from "vue";
import { User } from "@element-plus/icons-vue";
import type Node from 'element-plus/es/components/tree/src/model/node'

interface Tree {
  id: string;
  name: string;
  children?: Tree[];
  leaf?: boolean;
}

let treeData = ref([]);
const filterText = ref("");
const treeRef = ref<InstanceType<typeof ElTree>>();
const instance = getCurrentInstance();

const handleNodeClick = (data: Tree) => {
  // mitt自定义事件,id传给兄弟组件UserTable
  instance?.proxy?.$Bus.emit("handleNodeClick", data.id);
};

watch(filterText, (val) => {
  // console.log(val);
  treeRef.value!.filter(val);
});

const filterNode = (value: string, data: Tree) => {
  // console.log(value, data);
  if (!value) return true;
  return data.name.includes(value);
};

const defaultProps = {
  children: "children",
  label: "name",
  isLeaf: 'leaf',
};

const loadNode = (node: Node, resolve: (data: Tree[]) => void) => {
  if (node.level === 0) {
    return resolve([{ id: '1', name: 'region' }])
  }
  if (node.level > 1) return resolve([])

  setTimeout(() => {
    const data: Tree[] = [
      {
        id: '1',
        name: 'leaf',
        leaf: true,
      },
      {
        id: '2',
        name: 'zone',
      },
    ]
    resolve(data)
  }, 500)
}

// 请求接口
function getOrgApi() {
  orgApi.query("1").then((res) => {
    treeData.value = res as any;
    // console.log(treeData, "123");
  });
}

onMounted(() => {
  getOrgApi();
});
</script>

<style lang="scss" scoped>
.dept {
  display: flex;
  align-items: center;
  .deptName {
    margin-left: 5px;
  }
}
</style>
