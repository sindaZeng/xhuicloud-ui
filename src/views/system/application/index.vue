<template>
  <Crud
    v-model:page="page"
    :enable-operations="true"
    :permission="permission"
    :table-column="tableColumn"
    :onload="onload"
    :data="sysRouteConfDatas"
    @toDelRow="toDelRow"
    @toSaveRow="toSaveRow"
  >
    <!-- 行操作插槽 注:必须Operation结尾 -->
    <template #tableOperation="{ data }">
      <el-button v-if="checkPermission('sys_editor_route', false)" size="small" @click="setSysRouteConfData(data)">
        <el-icon class="el-icon--left"><Edit /></el-icon>
        {{ $t('button.edit') }}
      </el-button>
    </template>
  </Crud>
  <el-dialog v-model="dialogVisible" :title="$t('button.edit')" width="50%">
    <el-form ref="ruleFormRef" :model="sysRouteConfData" label-width="120px" class="demo-ruleForm" status-icon>
      <el-form-item :label="$t('applicationVue.Id')" prop="id">
        <el-input v-model="sysRouteConfData.id" disabled />
      </el-form-item>
      <el-form-item :label="$t('applicationVue.RouteName')" prop="routeName">
        <el-input v-model="sysRouteConfData.routeName" />
      </el-form-item>
      <el-form-item :label="$t('applicationVue.RouteId')" prop="routeId">
        <el-input v-model="sysRouteConfData.routeId" />
      </el-form-item>
      <el-form-item :label="$t('applicationVue.Uri')" prop="uri">
        <el-input v-model="sysRouteConfData.uri" />
      </el-form-item>
      <el-alert
        :title="$t('status.warn')"
        type="warning"
        :description="$t('applicationVue.Description')"
        show-icon
        :closable="false"
      />
      <el-collapse accordion>
        <el-collapse-item name="1">
          <template #title>
            {{ $t('applicationVue.Predicate') }}
            <el-icon class="header-icon">
              <info-filled />
            </el-icon>
          </template>
          <el-table
            :data="predicateDatas"
            style="width: 100%"
            :span-method="(obj: SpanMethodProps) => objectSpanMethod(obj, 'predicate')"
            @cell-dblclick="cellDblclick"
          >
            <el-table-column prop="name" label="name" width="180">
              <template #default="scope">
                <el-input
                  v-if="scope.row.nameEdit"
                  v-model="scope.row.name"
                  :placeholder="$t('placeholder.enter')"
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
                  :placeholder="$t('placeholder.enter')"
                  @blur="alterData(scope.row, scope.column)"
                  @keyup.enter="alterData(scope.row, scope.column)"
                ></el-input>
                <span v-else>{{ scope.row.value }}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" fix="right">
              <template #header>
                <el-button size="small" @click="addCommonVo('predicate')">
                  {{ $t('button.create') }}
                </el-button>
              </template>
              <template #default="{ row }">
                <el-button size="small" type="danger" @click="deleteCommonVo(row, 'predicate')">
                  {{ $t('button.del') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            {{ $t('applicationVue.Filter') }}
            <el-icon class="header-icon">
              <info-filled />
            </el-icon>
          </template>
          <el-table
            :data="filterDatas"
            style="width: 100%"
            :span-method="(obj: SpanMethodProps) => objectSpanMethod(obj, 'filter')"
            @cell-dblclick="cellDblclick"
          >
            <el-table-column prop="name" label="name" width="180">
              <template #default="scope">
                <el-input
                  v-if="scope.row.nameEdit"
                  v-model="scope.row.name"
                  :placeholder="$t('placeholder.enter')"
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
                  :placeholder="$t('placeholder.enter')"
                  @blur="alterData(scope.row, scope.column)"
                  @keyup.enter="alterData(scope.row, scope.column)"
                ></el-input>
                <span v-else>{{ scope.row.value }}</span>
              </template>
            </el-table-column>
            <el-table-column align="right" fix="right">
              <template #header>
                <el-button size="small" @click="addCommonVo('filter')">
                  {{ $t('button.create') }}
                </el-button>
              </template>
              <template #default="{ row }">
                <el-button size="small" type="danger" @click="deleteCommonVo(row, 'filter')">
                  {{ $t('button.del') }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('button.cancel') }}</el-button>
        <el-button type="primary" @click="toUpdateRow">{{ $t('button.confirm') }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="tsx" setup>
  import {
    createRouteConf,
    deleteRouteConf,
    getPredicatesAndFiltersById,
    routeConfsPage,
    updateRouteConf
  } from '@/api/upms/routeConf'
  import { Pagination } from '@/components/XhTable/pagination'
  import { isNullOrUnDef } from '@/utils/is'
  import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
  import { computed, ref, unref } from 'vue'
  import { tableColumn } from '.'
  import { checkPermission } from '@/utils'
  import { ElMessageBox } from 'element-plus'

  const permission = computed(() => {
    return {
      addBtn: checkPermission('sys_add_route', false),
      delBtn: checkPermission('sys_delete_route', false)
    }
  })

  const dialogVisible = ref(false)
  const page = ref<Pagination>({ current: 1, size: 10 })
  const sysRouteConfDatas = ref<SysRouteConf[]>()
  const predicateDatas = ref<CommonVo[]>()
  const filterDatas = ref<CommonVo[]>()
  const sysRouteConfData = ref<any>()

  const setSysRouteConfData = async (data: SysRouteConf) => {
    sysRouteConfData.value = data
    const predicatesAndFilters = await getPredicatesAndFiltersById(data.id)
    predicateDatas.value = predicatesAndFilters.predicateVos
    filterDatas.value = predicatesAndFilters.filterVos
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

  const getSpanArr = (filterOrPredicate: string) => {
    let predicateDatasTemp = unref(predicateDatas)
    if (filterOrPredicate === 'filter') {
      predicateDatasTemp = unref(filterDatas)
    }
    if (!isNullOrUnDef(predicateDatasTemp)) {
      const spanOneArr: any = []
      let concatOne = 0
      predicateDatasTemp.forEach((item, index) => {
        if (index === 0) {
          spanOneArr.push(1)
        } else {
          if (item.name === predicateDatasTemp![index - 1].name) {
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
    updateRouteConf({ ...sysRouteConfData.value, predicateVos: predicateDatas.value }).then(() => {
      predicateDatas.value = []
      filterDatas.value = []
      dialogVisible.value = false
      onload()
    })
  }

  const toSaveRow = (formModel: SysRouteConf) => {
    createRouteConf(formModel).then(() => {
      onload()
    })
  }

  const toDelRow = (formModel: SysRouteConf) => {
    ElMessageBox.confirm(`Are you confirm to delete ${formModel.routeName} ?`).then(() => {
      return deleteRouteConf(formModel.id).then(() => {
        onload()
      })
    })
  }

  const deleteCommonVo = (row: CommonVo, filterOrPredicate: string) => {
    if (filterOrPredicate === 'predicate') {
      predicateDatas.value = predicateDatas.value?.filter((item) => {
        return item.name + item.value != row.name + row.value
      })
    }
    if (filterOrPredicate === 'filter') {
      filterDatas.value = filterDatas.value?.filter((item) => {
        return item.name + item.value != row.name + row.value
      })
    }
  }

  const addCommonVo = (filterOrPredicate: string) => {
    if (filterOrPredicate === 'predicate') {
      predicateDatas.value?.push({ nameEdit: true, valueEdit: true } as CommonVo)
    }
    if (filterOrPredicate === 'filter') {
      filterDatas.value?.push({ nameEdit: true, valueEdit: true } as CommonVo)
    }
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

  const objectSpanMethod = ({ rowIndex, columnIndex }: SpanMethodProps, filterOrPredicate: string) => {
    if (columnIndex === 0) {
      const _row = getSpanArr(filterOrPredicate)?.one[rowIndex]
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
  .header-icon {
    margin-left: 5px;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>
