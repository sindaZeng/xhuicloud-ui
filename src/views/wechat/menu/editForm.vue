<template>
  <el-form label-width="100px" :model="modelValue" :rules="rules" style="max-width: 460px">
    <el-button class="deleteMenu" type="danger" @click="deleteCurrentMenu">
      {{ $t('WeChatMenu.deleteCurrentMenu') }}
    </el-button>
    <el-space fill>
      <el-alert type="info" show-icon :closable="false">
        <p>{{ $t('WeChatMenu.nameLength.alert1') }}</p>
      </el-alert>
      <el-form-item :label="$t('WeChatMenu.menuName')" prop="name">
        <el-input v-model="modelValue.name" />
      </el-form-item>
    </el-space>
    <el-form-item v-if="modelValue.subButtonList?.length === 0" :label="$t('WeChatMenu.menuType')">
      <el-radio-group v-model="modelValue.type">
        <el-radio label="click">
          {{ $t('WeChatMenu.SendMessage') }}
        </el-radio>
        <el-radio label="view">
          {{ $t('WeChatMenu.JumpWebPage') }}
        </el-radio>
        <el-radio label="miniprogram">
          {{ $t('WeChatMenu.JumpMiniProgram') }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
    <div v-if="modelValue.subButtonList?.length === 0" class="menu_content_container">
      <div v-if="modelValue.type === 'click'" class="menu_content msg">
        <el-tabs v-model="modelValue.resType" type="border-card" class="menu_content_msg">
          <el-tab-pane v-for="(item, index) in msgType" :key="index" :label="$t('WeChatMenu.' + item)" :name="item">
            <el-input
              v-if="item === 'text'"
              v-model="modelValue.resContent"
              :autosize="{ minRows: 8, maxRows: 10 }"
              type="textarea"
              :placeholder="$t('placeholder.enter')"
            />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-if="modelValue.type === 'view'" class="menu_content url">
        <el-alert
          class="menu_content_alert"
          type="info"
          :description="$t('WeChatMenu.viewAlert')"
          show-icon
          :closable="false"
        />
        <el-form-item :label="$t('WeChatMenu.url')">
          <el-input v-model="modelValue.url" class="menu_content_item" :placeholder="$t('placeholder.enter')" />
        </el-form-item>
      </div>
      <div v-if="modelValue.type === 'miniprogram'" class="menu_content miniapp">
        <el-alert class="menu_content_alert" type="info" show-icon :closable="false">
          <template #default>
            <p>{{ $t('WeChatMenu.miniprogram.alert1') }}</p>
            <p>{{ $t('WeChatMenu.miniprogram.alert2') }}</p>
            <p style="color: red">{{ $t('WeChatMenu.miniprogram.alert3') }}</p>
          </template>
        </el-alert>
        <el-form-item :label="$t('WeChatMenu.appid')">
          <el-input
            v-model="modelValue.appid"
            class="menu_content_item"
            :placeholder="$t('WeChatMenu.miniprogram.placeholder.appid')"
          />
        </el-form-item>
        <el-form-item :label="$t('WeChatMenu.miniprogram.pagepath')">
          <el-input
            v-model="modelValue.pagepath"
            class="menu_content_item"
            :placeholder="$t('WeChatMenu.miniprogram.placeholder.pagepath')"
          />
        </el-form-item>
        <el-form-item :label="$t('WeChatMenu.miniprogram.url')">
          <el-input
            v-model="modelValue.url"
            class="menu_content_item"
            :placeholder="$t('WeChatMenu.miniprogram.placeholder.url')"
          />
        </el-form-item>
      </div>
    </div>
    <el-form-item>
      <div class="menu_content_bt">
        <el-button type="danger" @click="deleteMenu">
          {{ $t('WeChatMenu.deleteMenu') }}
        </el-button>
        <el-button>
          {{ $t('WeChatMenu.saveMenu') }}
        </el-button>
        <el-button type="success" @click="createMenu">
          {{ $t('WeChatMenu.saveReleaseMenu') }}
        </el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
  import { useVModel } from '@vueuse/core'
  import { FormRules } from 'element-plus'
  import { PropType, ref, reactive } from 'vue'
  import { global } from '@/i18n'
  import { checkStringLengthOf8 } from '@/utils/rules'

  const msgType = ref<string[]>(['text', 'image', 'voice', 'video', 'news'])
  const props = defineProps({
    modelValue: { type: Object as PropType<WeChatMpMenu>, default: () => ({}) }
  })
  const rules = reactive<FormRules>({
    name: [
      {
        required: true,
        message: global.t('placeholder.enter') + global.t('WeChatMenu.menuName'),
        trigger: 'blur'
      },
      {
        validator: checkStringLengthOf8(),
        trigger: 'blur'
      }
    ]
  })

  const emit = defineEmits(['update:modelValue', 'deleteCurrentMenu', 'deleteMenu', 'createMenu'])

  const modelValue = useVModel(props, 'modelValue', emit)
  const deleteMenu = () => {
    emit('deleteMenu', modelValue.value)
  }
  const deleteCurrentMenu = () => {
    emit('deleteCurrentMenu', modelValue.value)
  }
  const createMenu = () => {
    emit('createMenu')
  }
</script>
<style lang="scss" scoped>
  .menu_content {
    width: 800px;
    border: 1px solid #e7e7eb;
    background-color: #fff;
  }

  .menu_content_alert {
    margin: 10px 5px 5px 25px;
    width: 70%;
  }
  .menu_content_item {
    width: 70%;
  }
  .menu_content_bt {
    margin-top: 30px;
  }
  .menu_content_msg {
    width: 90%;
    margin: 10px 30px 30px 25px;
  }

  .deleteMenu {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
