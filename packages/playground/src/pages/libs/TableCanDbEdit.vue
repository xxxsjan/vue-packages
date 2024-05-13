<script setup lang="ts">
import { ref, createApp, reactive, VueElement } from "vue";
import type { App } from "vue";
import InputTableCell from "./InputTableCell.vue";
defineProps<{ msg: string }>();
let editInputApp: App;
type State = {
  index: number | null;
  key: string | null;
  value: string;
};
// type TableData = Record<'date' | 'name' | 'address', string>[]
type TableData = {
  date: string;
  name: string;
  address: string;
}[];
const state: State = {
  index: -1,
  value: "",
  key: "",
};

const tableData: TableData = reactive([
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]);
function setData({ index, key, value }: State) {
  index = index ?? state.index;
  key = key || state.key;

  state.index = index;
  state.key = key;
  state.value = value;

  console.log(state);
  if (key !== null && typeof index === "number" && index > -1) {
    tableData[index][key] = value;
  }
}
const setValue = function (value: string) {
  console.log(value);
  setData({ index: null, key: null, value });
  editInputApp && editInputApp.unmount();
};

function cellDblClick(row: any, column: any, cell: any, e: any) {
  const index = row.index;
  const key = column.property;
  const value = row[key];

  const target = e.target;
  const oFrag = document.createDocumentFragment();

  editInputApp = createApp(InputTableCell, {
    value: value,
    setValue,
  });
  if (editInputApp) {
    editInputApp.mount(oFrag);
    target.appendChild(oFrag);
    target.querySelector(".edit-input").select();
  }
  setData({ index, key, value });
}
type CellClassNameFn = (data: {
  row: any;
  rowIndex: number;
  column: import("element-plus/es/components/table/src/table-column/defaults").TableColumnCtx<any>;
  columnIndex: number;
}) => String;

const cellClassName: CellClassNameFn = function ({
  row,
  column,
  rowIndex,
  columnIndex,
}) {
  row.index = rowIndex; // 自定义指定一个索引，下方能够用到
  return "";
};
</script>

<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    @cell-dblclick="cellDblClick"
    :cell-class-name="cellClassName"
  >
    <el-table-column prop="date" label="Date" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="name" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="address" label="address">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.address }}</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped></style>
