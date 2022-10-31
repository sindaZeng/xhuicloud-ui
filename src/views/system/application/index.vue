<template>
  <Crud
    v-model:page="page"
    :enable-operations="true"
    :permission="{ addBtn: true, delBtn: true }"
    :table-column="tableColumn"
    :onload="onload"
    :data="sysRouteConfDatas"
  >
    <!-- 行操作插槽 注:必须Operation结尾 -->
    <template #tableOperation="{ data }">
      <el-button size="small" @click="setSysRouteConfData(data)">
        <el-icon class="el-icon--left"><Edit /></el-icon>编辑
      </el-button>
    </template>
  </Crud>
  <el-dialog v-model="dialogVisible" title="编辑" width="50%">
    <el-form ref="ruleFormRef" :model="sysRouteConfData" label-width="120px" class="demo-ruleForm" status-icon>
      <el-form-item label="编号" prop="id">
        <el-input v-model="sysRouteConfData.id" disabled />
      </el-form-item>
      <el-form-item label="服务名称" prop="routeName">
        <el-input v-model="sysRouteConfData.routeName" />
      </el-form-item>
      <el-form-item label="服务编号" prop="routeId">
        <el-input v-model="sysRouteConfData.routeId" />
      </el-form-item>
      <el-form-item label="lb/轮询地址" prop="uri">
        <el-input v-model="sysRouteConfData.uri" />
      </el-form-item>
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template #title>
            Predicate
            <el-icon class="header-icon">
              <info-filled />
            </el-icon>
            <span style="color: red; margin-left: 20px"> 警告:非开发人员请勿随意修改,相同《name》将被合并!</span>
          </template>
          <el-table
            :data="predicateDatas"
            style="width: 100%"
            :span-method="objectSpanMethod"
            @cell-dblclick="cellDblclick"
          >
            <el-table-column prop="name" label="name" width="180">
              <template #default="scope">
                <el-input
                  v-if="scope.row.nameEdit"
                  v-model="scope.row.name"
                  placeholder="请输入"
                  @blur="alterData(scope.row, scope.column)"
                  @keyup.enter="alterData(scope.row, scope.column)"
                ></el-input>
                <span v-else>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="value" width="520">
              <template #default="scope">
                <el-input
                  v-if="scope.row.valueEdit"
                  v-model="scope.row.value"
                  placeholder="请输入"
                  @blur="alterData(scope.row, scope.column)"
                  @keyup.enter="alterData(scope.row, scope.column)"
                ></el-input>
                <span v-else>{{ scope.row.value }}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" fix="right">
              <template #header>
                <el-button size="small" @click="addPredicateVo">新增</el-button>
              </template>
              <template #default="{ row }">
                <el-button size="small" type="danger" @click="deletePredicateVo(row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="toUpdateRow"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="tsx" setup>
  import { getPredicatesById, routeConfsPage, updaterouteConf } from '@/api/upms/routeConf'
  import { Pagination } from '@/components/XhTable/pagination'
  import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
  import { ref, unref } from 'vue'
  import { tableColumn } from '.'
  const dialogVisible = ref(false)
  const page = ref<Pagination>({ current: 1, size: 10 })
  const sysRouteConfDatas = ref<SysRouteConf[]>()
  const predicateDatas = ref<PredicateVo[]>()

  const sysRouteConfData = ref<any>()
  const setSysRouteConfData = async (data: SysRouteConf) => {
    sysRouteConfData.value = data
    const predicateVo = await getPredicatesById(data.id)
    predicateDatas.value = predicateVo
    dialogVisible.value = true
  }

  /**
   * 获取列表
   */
  const onload = async (searchForm?: any) => {
    const response = await routeConfsPage({ ...page.value, ...searchForm })
    page.value.total = response.total
    sysRouteConfDatas.value = response.records
    return response.records
  }

  const getSpanArr = () => {
    const predicateDatasTemp = unref(predicateDatas)
    if (predicateDatasTemp) {
      const spanOneArr: any = []
      let concatOne = 0
      predicateDatasTemp.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
        } else {
          if (item.name === predicateDatasTemp[index - 1].name) {
            // 第一列需合并相同内容的判断条件
            spanOneArr[concatOne] += 1
            spanOneArr.push(0)
          } else {
            spanOneArr.push(1)
            concatOne = index
          }
        }
      })
      return { one: spanOneArr }
    }
  }

  const toUpdateRow = () => {
    updaterouteConf({ ...sysRouteConfData.value, predicateVos: predicateDatas.value }).then(() => {
      onload()
    })
  }

  const deletePredicateVo = (row: PredicateVo) => {
    predicateDatas.value = predicateDatas.value?.filter((item) => {
      return item.name + item.value != row.name + row.value
    })
  }

  const addPredicateVo = () => {
    predicateDatas.value?.push({ nameEdit: true, valueEdit: true } as PredicateVo)
  }
  interface User {
    id: string
    name: string
    amount1: string
    amount2: string
    amount3: number
  }

  interface SpanMethodProps {
    row: User
    column: TableColumnCtx<User>
    rowIndex: number
    columnIndex: number
  }

  const objectSpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps) => {
    if (columnIndex === 0) {
      const _row = getSpanArr()?.one[rowIndex]
      const _col = _row > 0 ? 1 : 0
      return {
        rowspan: _row,
        colspan: _col
      }
    }
  }
  const alterData = (row: any, column: any) => {
    row[column.property + 'Edit'] = false
    predicateDatas.value = predicateDatas.value?.sort((a, b) => a['name'].localeCompare(b['name']))
  }
  const cellDblclick = (row: any, column: any) => {
    row[column.property + 'Edit'] = true
  }
</script>
<style lang="scss" scoped>
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
