<script setup lang="ts">
import userApi from "../../api/user";
import { reactive, ref, onMounted } from "vue";
import { type FormInstance } from "element-plus";
// import { type PaginationProps } from "@pureadmin/table";
import { ElTable } from "element-plus";
import { debounce } from "lodash";
import { getCurrentInstance } from "vue";
import { User } from "@element-plus/icons-vue";

const form = reactive({
  name: "",
  id: "",
});

interface User {
  id: string;
  name: string;
}
let loading = ref(true);

const formRef = ref<FormInstance>();
const multipleSelection = ref<User[]>([]);
const instance = getCurrentInstance();

// const pagination = reactive<PaginationProps>({
//   total: 0,
//   pageSize: 10,
//   currentPage: 1,
//   background: true,
// });

let tableData = ref([]);

// function handleUpdate(row) {
//   console.log(row);
// }

// function handleDelete(row) {
//   console.log(row);
// }

// function handleCurrentChange(val: number) {
//   console.log(`current page: ${val}`);
// }

// function handleSizeChange(val: number) {
//   console.log(`${val} items per page`);
// }

// function handleSelectionChange(val) {
//   console.log("handleSelectionChange", val);
// }

// 勾选id
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

// 搜索
async function onSearch() {
  loading.value = true;
  const res = await userApi.query({});
  tableData.value = res as any;
  loading.value = false;
}

// 重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  onSearch();
};

// 防抖0.5秒，向后端发送请求。
const handleInput = debounce(() => {
  onSearch();
}, 500);

onMounted(() => {
  onSearch();
  // mitt触发handleNodeClick，刷新表格，查询出对应的用户
  instance?.proxy?.$Bus.on("handleNodeClick", () => {
    onSearch();
  });
});
</script>

<template>
  <div>
    <el-form ref="formRef" :inline="true" :model="form" style="width: 100%">
      <el-form-item label="姓名：" prop="name">
        <el-input
          v-model="form.name"
          style="width: 200px"
          placeholder="请输入姓名"
          clearable
          @input="handleInput"
        />
      </el-form-item>
      <!-- <el-form-item label="手机号码：" prop="mobile">
        <el-input
          v-model="form.mobile"
          placeholder="请输入手机号码"
          clearable
        />
      </el-form-item> -->
      <!-- <el-form-item label="状态：" prop="status" style="width: 150px">
        <el-select v-model="form.status" placeholder="请选择" clearable>
          <el-option label="已开启" value="1" />
          <el-option label="已关闭" value="0" />
        </el-select>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="onSearch">
          搜索
        </el-button>
        <el-button @click="resetForm(formRef)"> 重置 </el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        property="id"
        label="id"
        sortable
        show-overflow-tooltip
      />
      <el-table-column property="name" label="姓名" width="120">
        <template #default="{ row }">
          <div style="display: flex; align-items: center">
            <el-icon><User /></el-icon>
            <span style="margin-left: 10px">{{ row.name }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="less" scoped></style>
