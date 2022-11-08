<template>
  <el-row :span="24">
    <el-col :xs="24" :sm="24" :md="5">
      <xh-card :body-style="bodyStyle">
        <el-select
          v-model="wechatMpId"
          filterable
          remote
          reserve-keyword
          :placeholder="$t('placeholder.wechatMpName')"
          :remote-method="onload"
          :loading="loading"
        >
          <el-option v-for="item in accountDatas" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-descriptions title="详情" :column="1" style="margin-top: 30px">
          <el-descriptions-item label="名称:">kooriookami</el-descriptions-item>
          <el-descriptions-item label="appid:">18100000000</el-descriptions-item>
        </el-descriptions>
        <el-descriptions title="七天数据分析" :column="1" style="margin-top: 30px">
          <el-descriptions-item label="新增的用户数量:">10</el-descriptions-item>
          <el-descriptions-item label="取关的用户数量:">1</el-descriptions-item>
          <el-descriptions-item label="净增的用户数量:">9</el-descriptions-item>
          <el-descriptions-item label="总合计用户数量:">100</el-descriptions-item>
        </el-descriptions>
      </xh-card>
    </el-col>
    <el-col :xs="24" :sm="24" :md="19">
      <xh-card :body-style="bodyStyle">
        <div class="preview_area">
          <div class="mobile_wechat_preview">
            <div class="mobile_wechat_preview_title">星辉云</div>
            <div class="mobile_wechat_preview_bd">
              <ul class="bd_list">
                <li v-for="(item, index) in weChatMpMenus" :key="index" class="menu_item">
                  <el-dropdown class="menu_addBt" trigger="click" placement="top-start" :hide-on-click="false">
                    <a href="javascript:void(0);" draggable="false">
                      <i class="menu_icon_dot"></i>
                      <span class="menu_tips_add">{{ item.name }}</span>
                    </a>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <template v-for="(subItem, subIndex) in item.subButtonList" :key="subIndex">
                          <el-dropdown-item> {{ subItem.name }} </el-dropdown-item>
                        </template>
                        <el-dropdown-item @click="addsubButtonList(item)"> 添加子菜单 </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </li>
                <li v-if="weChatMpMenus.length < 3" class="menu_item" @click="addAct">
                  <a href="javascript:void(0);" class="menu_addBt" draggable="false">
                    <i class="menu_icon_add"></i>
                    <span class="menu_tips_add">添加菜单</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </xh-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue'
  import { accountList } from '@/api/wechat/account'
  const bodyStyle = { height: '85vh' }

  const wechatMpId = ref<number>()
  const accountDatas = ref<Account[]>()
  const weChatMpMenus = ref<WeChatMpMenu[]>([])
  const loading = ref(false)

  const onload = async (name?: string) => {
    loading.value = true
    accountDatas.value = await accountList(name)
    loading.value = false
  }

  onload()

  const addAct = () => {
    if (weChatMpMenus.value.length >= 3) {
      return
    }
    const menu: WeChatMpMenu = {
      name: '测试1',
      type: 1,
      actList: [{ type: 2, value: '100000003' } as Act],
      subButtonList: [
        // { name: '子菜单1', type: 1, actList: [{ type: 2, value: '100000003' } as Act] },
        // { name: '子菜单2', type: 1, actList: [{ type: 2, value: '100000003' } as Act] }
      ]
    }
    weChatMpMenus.value.push(menu)
  }

  const addsubButtonList = (item: WeChatMpMenu) => {
    item.subButtonList.push({ name: '子菜单1', type: 1, actList: [{ type: 2, value: '100000003' } as Act] })
    console.log(item)
  }

  const menuSize = computed(() => {
    let size = '100%'
    if (unref(weChatMpMenus).length === 1) {
      size = '50%'
    }
    if (unref(weChatMpMenus).length === 2 || unref(weChatMpMenus).length === 3) {
      size = '33.33%'
    }
    return size
  })
</script>
<style lang="scss" scoped>
  .preview_area {
    display: inline-block;
    width: 350px;
    height: 715px;
    background: url(@/assets/png/iphone_mobile.png) no-repeat;
    background-size: contain !important;
    padding: 518px 25px 88px;
    position: relative;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .mobile_wechat_preview {
    text-align: center;
    bottom: 426px;
    position: relative;
    width: 298px;
    background-size: contain !important;
    height: 530px;
    background: transparent url(@/assets/png/wechat_mobile.png) no-repeat 0 0;
  }

  .mobile_wechat_preview_title {
    color: #fff;
    text-align: center;
    padding-top: 30px;
    font-size: 15px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    margin: 0 30px;
  }
  .bd_list {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 2px;
    border-top: 1px solid #e7e7eb;
    background: transparent url(@/assets/png/wechat_bt.png) no-repeat 0 0;
    background-position: 0 0;
    background-repeat: no-repeat;
    padding-left: 43px;
  }

  .menu_item {
    line-height: 50px;
    position: relative;
    float: left;
    width: v-bind(menuSize);
    overflow: hidden;
    *zoom: 1;
    *overflow: visible;
  }

  .menu_item a {
    display: block;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-wrap: normal;
    color: #616161;
    text-decoration: none;
  }

  .menu_addBt {
    display: block !important;
    // border: 1px solid #07c160;
    border-left: 1px solid #e7e7eb;
    color: #07c160;
    line-height: unset !important;
    font-size: unset !important;
  }

  .menu_icon_add {
    background: url(@/assets/png/bt.png) 0 -18px no-repeat;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    display: inline-block;
    margin-top: -2px;
  }
  .menu_icon_dot {
    background: url(@/assets/png/bt.png) 0 -36px no-repeat;
    width: 7px;
    height: 7px;
    vertical-align: middle;
    display: inline-block;
    margin-right: 2px;
    margin-top: -2px;
    *margin-top: 0;
  }
  .menu_tips_add {
    margin-left: 2px;
  }
</style>
