<template>
  <XhCard>
    <el-container>
      <el-header height="230px">
        <strong>简介:</strong>
        <p style="margin-top: 10px">
          <a :href="setting.gitUiUrl" target="_blank">{{ name }}:</a>
          是一个基于
          <span style="color: blue">Vue3.0、Vite2、 Element-Plus 、TypeScript</span>
          的后台解决方案，目标是为中大型项目的敏捷开发，支持多语言国际化，提供众多现成的开箱即用的组件解决方案，技术场景的实现，
          基于众多的企业业务场景，沉淀与提炼出面向公共业务场景的可复用的技术应用能力。
        </p>
        <br />
        <span>
          <a :href="setting.gitServerUrl" target="_blank" style="color: red">XhuiCloud:</a>
          企业级技术中台微服务架构，公共业务服务能力开发平台。基于
          <span style="color: blue">
            Spring Authorization Server 、Spring Boot、Spring Cloud、Spring Cloud Alibaba、Nacos
          </span>
          开发的Saas系统。
          <ul style="margin-left: 20px">
            <li>
              <span class="bold">大道至简的功能特性:</span>
              完善且简易上手的权限管理，支持多语言国际化，强大的代码生成器(生成基本的Crud后端代码以及前端代码)。
            </li>
            <li>
              <span class="bold">成熟的企业级技术平台:</span>
              采用Java生态圈中主流的微服务技术栈，技术组件成熟，社区活跃，人员储备丰富，便于招募技术人员。
            </li>
            <li>
              <span class="bold">企业公共业务场景提炼:</span>
              通过基于平台的产品、开发项目的实施、以及过往经验，在CMS、固定资产管理、人力资源管理、项目管理、电商系统等业务领域获得了大量的落地经验。提炼出公共业务中台服务。
            </li>
            <li>
              <span class="bold">可复用的技术应用能力:</span>
              通过过往经验，整合了大量通用的技术应用组件/服务，开箱简单配置即可使用。
            </li>
          </ul>
        </span>
      </el-header>
      <el-main>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="项目信息" name="0">
            <el-table :show-header="false" :data="projectInfoTable" style="width: 100%" border>
              <el-table-column class="highlight" prop="name0" />
              <el-table-column prop="version0">
                <template #default="{ row }">
                  <div v-html="row.version0"></div>
                </template>
              </el-table-column>
              <el-table-column class="highlight" prop="name1" />
              <el-table-column prop="version1">
                <template #default="{ row }">
                  <div v-html="row.version1"></div>
                </template>
              </el-table-column>
              <el-table-column class="highlight" prop="name2" />
              <el-table-column prop="version2">
                <template #default="{ row }">
                  <div v-html="row.version2"></div>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="后端依赖" name="1" center>
            <el-table :show-header="false" :data="serverDependenciesTable" style="width: 100%" border>
              <el-table-column class="highlight" prop="name0" />
              <el-table-column prop="version0" />
              <el-table-column class="highlight" prop="name1" />
              <el-table-column prop="version1" />
              <el-table-column class="highlight" prop="name2" />
              <el-table-column prop="version2" />
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="前端生产环境依赖" name="2">
            <el-table :show-header="false" :data="dependenciesTable" style="width: 100%" border>
              <el-table-column class="highlight" prop="name0" />
              <el-table-column prop="version0" />
              <el-table-column class="highlight" prop="name1" />
              <el-table-column prop="version1" />
              <el-table-column class="highlight" prop="name2" />
              <el-table-column prop="version2" />
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="前端开发环境依赖" name="3">
            <el-table :show-header="false" :data="devDependenciesTable" style="width: 100%" border>
              <el-table-column class="highlight" prop="name0" />
              <el-table-column prop="version0" />
              <el-table-column class="highlight" prop="name1" />
              <el-table-column prop="version1" />
              <el-table-column class="highlight" prop="name2" />
              <el-table-column prop="version2" />
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>
  </XhCard>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import setting from '@/config/setting.config'
  import { cloneDeep } from 'lodash'
  const { pkg, buildTime } = APP_INFO
  const { dependencies, devDependencies, name, version } = pkg
  const activeName = ref('0')

  interface TableInterface {
    name0: string
    version0: string
    name1: string
    version1: string
    name2: string
    version2: string
  }

  const projectInfo = {
    后端版本: '2.0.3',
    后端构建分支: 'develop',
    接口文档地址: "<a href='http://api.xhuicloud.cn/doc.html#/home' target='_blank'>点击查看</a>",
    前端版本: version,
    前端构建分支: 'ts2.0.1',
    预览地址: "<a href='http://admin.xhuicloud.cn/#/login' target='_blank'>点击查看</a>",
    最近构建时间: buildTime,
    GitHub: `<a href='${setting.github}' target='_blank'>点击查看</a>`
  }
  const serverDependencies = {
    SpringBoot: '2.7.1',
    SpringCloud: '2021.0.4',
    SpringCloudAlibaba: '2021.0.4.0',
    SpringGateway: '3.1.4',
    'Spring Authorization Server': '0.3.1',
    Nacos: '2.0.3',
    Seata: '1.4.2',
    Sentinel: '1.8.5',
    'Xxl-job': '2.3.0',
    MybatisPlus: '3.5.2',
    'Dynamic-datasource': '3.5.1',
    ElasticJob: '2.1.5',
    redisson: '3.12.1',
    druid: '1.2.8',
    'weixin-java-mp': '4.2.9.B',
    knife4j: '2.0.9',
    swagger: '1.5.22'
  }
  const dependenciesTable = ref<TableInterface[]>([])
  const devDependenciesTable = ref<TableInterface[]>([])
  const serverDependenciesTable = ref<TableInterface[]>([])
  const projectInfoTable = ref<TableInterface[]>([])

  onMounted(() => {
    dependenciesTable.value = transitionTable(dependencies)
    devDependenciesTable.value = transitionTable(devDependencies)
    serverDependenciesTable.value = transitionTable(serverDependencies)
    projectInfoTable.value = transitionTable(projectInfo)
  })

  /**
   * 3个属性为一组的数据
   */
  const transitionTable = (list: Recordable<string>) => {
    let index = 0
    let current = 0
    let count = 3
    let listTable: TableInterface[] = []
    let dp: TableInterface = { name0: '', version0: '', name1: '', version1: '', name2: '', version2: '' }
    for (let k in list) {
      if (index == count) {
        index = 0
        dp = { name0: '', version0: '', name1: '', version1: '', name2: '', version2: '' }
      }
      dp[('name' + index) as keyof typeof dp] = k
      dp[('version' + index) as keyof typeof dp] = list[k]
      if (index == 2 || current === Object.keys(list).length - 1) {
        listTable.push(cloneDeep(dp))
      }
      index++
      current++
    }
    return listTable
  }
</script>
<style lang="scss" scoped>
  a {
    color: red;
  }
  .bold {
    font-weight: bold;
  }
  ::v-deep(.el-table_1_column_1) {
    background-color: #fafafa;
  }
  ::v-deep(.el-table_1_column_3) {
    background-color: #fafafa;
  }
  ::v-deep(.el-table_1_column_5) {
    background-color: #fafafa;
  }
</style>
