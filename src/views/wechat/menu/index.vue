<template>
  <el-row :span="24">
    <el-col :xs="24" :sm="24" :md="5">
      <select-wechat-vue @after-select="getMenus"></select-wechat-vue>
    </el-col>
    <el-col :xs="24" :sm="24" :md="19">
      <xh-card :body-style="bodyStyle">
        <el-row :span="24">
          <el-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
            <div class="preview_area">
              <div class="mobile_wechat_preview">
                <div class="mobile_wechat_preview_title">{{}}</div>
                <div class="mobile_wechat_preview_bd">
                  <ul class="bd_list">
                    <li
                      v-for="(item, index) in weChatMpMenus"
                      :key="index"
                      class="menu_item"
                      :style="selectedStyle(index)"
                      @click="editMenu(index, undefined)"
                    >
                      <el-dropdown
                        class="menu_addBt"
                        trigger="contextmenu"
                        placement="top-start"
                        :hide-on-click="false"
                      >
                        <a href="javascript:void(0);" draggable="false">
                          <i class="menu_icon_dot"></i>
                          <span class="menu_tips_add">{{ item.name }}</span>
                        </a>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item
                              v-for="(subItem, subIndex) in item.subButtonList"
                              :key="subIndex"
                              @click="editMenu(index, subIndex)"
                            >
                              {{ subItem.name }}
                            </el-dropdown-item>
                            <el-dropdown-item @click="addsubButtonList(item)">
                              {{ $t('WeChatMenu.addsubButton') }}
                            </el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                    </li>
                    <li v-if="weChatMpMenus.length < 3" class="menu_item" @click="addAct">
                      <a href="javascript:void(0);" class="menu_addBt" draggable="false">
                        <i class="menu_icon_add"></i>
                        <span class="menu_tips_add">
                          {{ $t('WeChatMenu.addButton') }}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :md="17" :lg="17" :xl="17">
            <el-tabs>
              <el-tab-pane :label="$t('WeChatMenu.defaultMenus')">
                <edit-form
                  v-if="weChatMpMenu != null"
                  :model-value="weChatMpMenu"
                  @delete-menu="deleteMenu"
                  @delete-current-menu="deleteCurrentMenu"
                  @create-menu="createMenu"
                ></edit-form>
                <el-empty v-else :image-size="200" :description="$t('WeChatMenu.empty')" />
              </el-tab-pane>
              <el-tab-pane :label="$t('WeChatMenu.customMenus')">
                <el-empty :image-size="200" :description="$t('WeChatMenu.empty')" />
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </xh-card>
    </el-col>
  </el-row>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue'
  import selectWechatVue from '../components/selectWechat.vue'
  import { ElMessage } from 'element-plus'
  import editForm from './editForm.vue'
  import { createAndReleaseMpMenu, getReleaseMpMenu } from '@/api/wechat/menu'
  import { isNullOrUnDef } from '@/utils/is'
  import { global } from '@/i18n'

  const bodyStyle = { height: '85vh' }

  /** 0:底部菜单 1:子菜单 **/
  const menuType = ref<number>(0)
  /** 当前选择的底部菜单下标 **/
  const selected = ref<number>(0)
  const wechatMpAppId = ref<string>('')
  const wechatMpAppName = ref<string>('')

  /** 底部菜单列表 **/
  const weChatMpMenus = ref<WeChatMpMenu[]>([])
  /** 当前选中的底部菜单 **/
  const weChatMpMenu = ref<WeChatMpMenu>()

  /**
   * 被选中的底部菜单边框
   * @param index
   */
  const selectedStyle = (index: number) => {
    if (selected.value === index) {
      return 'border: 1px solid #07c160;'
    }
    return ''
  }

  const getMenus = (wechatSummary: WeChatSummary) => {
    wechatMpAppId.value = wechatSummary.appId
    wechatMpAppName.value = wechatSummary.name
    getReleaseMpMenu(wechatMpAppId.value).then((res) => {
      if (!isNullOrUnDef(res)) {
        weChatMpMenus.value = JSON.parse(res).buttons
      }
      if (weChatMpMenu.value === undefined && weChatMpMenus.value.length > 0) {
        weChatMpMenu.value = weChatMpMenus.value[0]
      }
    })
  }

  const editMenu = (index: number, subIndex?: number) => {
    menuType.value = 0
    selected.value = index
    if (subIndex === undefined) {
      weChatMpMenu.value = weChatMpMenus.value[index]
    } else {
      weChatMpMenu.value = weChatMpMenus.value[index].subButtonList[subIndex]
    }
  }
  /**
   * 添加底部菜单
   */
  const addAct = () => {
    if (weChatMpMenus.value.length >= 3) {
      return
    }
    const menu: WeChatMpMenu = {
      name: global.t('WeChatMenu.menuName'),
      type: 'click',
      key: new Date().getTime() + '',
      subButtonList: []
    }
    // 作为当前回显菜单
    weChatMpMenu.value = menu
    // 当前回显菜单下标
    selected.value = weChatMpMenus.value.length
    weChatMpMenus.value.push(menu)
  }

  /**
   * 添加底部菜单的子菜单
   */
  const addsubButtonList = (item: WeChatMpMenu) => {
    if (item.subButtonList.length >= 5) {
      ElMessage.error(global.t('WeChatMenu.submenuMoreThan5'))
      return
    }
    item.type = undefined
    item.subButtonList.push({
      name: global.t('WeChatMenu.submenuName'),
      key: new Date().getTime() + '',
      type: 'click',
      subButtonList: []
    })
  }

  /**
   * 计算底部菜单宽度
   */
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

  /**
   * 删除当前菜单
   * @param menu
   */
  const deleteCurrentMenu = (menu: WeChatMpMenu) => {
    weChatMpMenus.value = weChatMpMenus.value.filter((item) => {
      item.subButtonList = item.subButtonList.filter((subItem) => subItem.key != menu.key)
      return item.key != menu.key
    })
  }

  /**
   * 删除菜单
   * @param menu
   */
  const deleteMenu = (menu: WeChatMpMenu) => {
    weChatMpMenus.value = weChatMpMenus.value.filter((item) => {
      item.subButtonList = item.subButtonList.filter((subItem) => subItem.key != menu.key)
      return item.key != menu.key
    })
  }
  /**
   * 创建菜单
   */
  const createMenu = () => {
    createAndReleaseMpMenu(wechatMpAppId.value, { buttons: weChatMpMenus.value })
  }
</script>
<style lang="scss">
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
