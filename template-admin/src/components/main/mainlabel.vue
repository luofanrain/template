<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column prop="date" label="序号">
      </el-table-column>
      <el-table-column prop="name" label="文章">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="置顶"
        width="60">
        <template slot-scope="scope">
          <el-switch
            v-model="tableData[scope.$index].isShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change='placement(scope)'
            >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </template>

  <script>
    export default {
      name:'mainlabel',
      data() {
        return {
          isPlacement:true,
          tableData: [{
            date: '1',
            name: '王小虎王小虎王小虎王小虎',
            isShow:false
          }, {
            date: '2',
            name: '王小虎',
            isShow:true
          }, {
            date: '3',
            name: '王小虎',
            isShow:false
          }, {
            date: '4',
            name: '王小虎',
            isShow:false
          }]
        }
      },
      methods:{
        placement(data){
          console.log('值改变了',data.$index)
        }
      }
    }
  </script>