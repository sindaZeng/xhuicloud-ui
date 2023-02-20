<template>
  <el-container>
    <!-- 左侧操作栏 -->
    <el-aside class="aside">
      <div class="aside-body">
        <div class="aside-title">
          <span><img :src="account?.url" alt="" /></span>
          {{ account?.name }}
        </div>
        <div class="center-img" :style="selectedStyle(0)" @click="chooseItem(newsItems?.[0], 0)">
          <div class="thumbUrl_bd">
            <img v-if="newsItems?.[0]?.thumbUrl" :src="newsItems?.[0]?.thumbUrl" alt="" />
          </div>
          <strong class="card_appmsg vertical">{{ newsItems?.[0].title ? newsItems?.[0].title : '标题' }}</strong>
          <!-- 只剩下1个显示 -->
          <div v-if="selected == 0 && newsItems?.length! != 1" class="cart_icon">
            <div class="icon_container">
              <div class="down icon" @click="down(0)"></div>
            </div>
            <div class="icon_container">
              <div class="delete icon" @click="deleteItem(0)"></div>
            </div>
          </div>
        </div>
        <div
          v-for="(item, index) in newsItems?.slice(1)"
          :key="index"
          :style="selectedStyle(index + 1)"
          class="card_container"
          @click="chooseItem(item, index + 1)"
        >
          <div class="card_appmsg_inner">
            <div class="appmsg_title vertical">
              <strong>{{ item.title ? item.title : '标题' }}</strong>
            </div>
            <div class="card_appmsg_bd"><img v-if="item.thumbUrl" :src="item.thumbUrl" alt="" /></div>
          </div>
          <div v-if="selected == index + 1" class="cart_icon">
            <div class="icon_container">
              <div class="up icon" @click="up(index + 1)"></div>
            </div>
            <div v-if="index + 1 != 7" class="icon_container">
              <div class="down icon" @click="down(index + 1)"></div>
            </div>
            <div class="icon_container">
              <div class="delete icon" @click="deleteItem(index + 1)"></div>
            </div>
          </div>
        </div>
        <!-- 结合微信公众号后台限制 -->
        <div v-if="newsItems?.length! < 8" class="add-message" @click="add">
          <xh-svg icon="add"></xh-svg><span> 新建消息</span>
        </div>
      </div>
    </el-aside>
    <!-- 右侧富文本编辑 -->
    <el-main class="main">
      <!-- 编辑 -->
      <Eidtor ref="eidtorRef" :index="selected" @save-draft="saveDraft" @to-publish-draft="toPublishDraft"></Eidtor>
    </el-main>
  </el-container>
</template>
<script lang="ts" setup>
  import { createDraft, editDraft, getContent, singleToMultipleDraft } from '@/api/wechat/draft'
  import { isNullOrUnDef } from '@/utils/is'
  import { ElMessageBox, ElNotification } from 'element-plus'
  import { cloneDeep } from 'lodash'
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import Eidtor from './editor.vue'
  import { useRouter } from 'vue-router'
  import { publish } from '@/api/wechat/publish'
  import { getByAppId } from '@/api/wechat/account'

  const router = useRouter()

  type EidtorInstance = InstanceType<typeof Eidtor>
  const eidtorRef = ref<EidtorInstance>()

  const route = useRoute()
  const newsItems = ref<NewsItem[]>()
  const account = ref<AccountVo>()
  const selected = ref<number>()
  const appId = ref<string>()
  const mediaId = ref<string>()
  const quantity = ref<number>(1)

  const defaultFormData: NewsItem = {
    title: '',
    author: '',
    digest: '',
    content: '',
    contentSourceUrl: '',
    thumbMediaId: '',
    showCoverPic: 0,
    needOpenComment: 0,
    onlyFansCanComment: 0,
    url: '',
    thumbUrl: ''
  }

  const formData = ref<NewsItem>()

  /**
   * 去编辑草稿
   * @param news 编辑的草稿
   * @param mediaId
   */
  const toEditDraft = async (news: NewsItem) => {
    if (!eidtorRef.value) return
    // 替换
    news.content = news.content.replaceAll('data-src', 'src')
    formData.value = news
    eidtorRef.value.init({
      appid: appId.value,
      contextMediaId: mediaId.value,
      formData: formData.value
    } as EditorProps)
  }

  /**
   * 选中项
   * @param info
   * @param index
   */
  const chooseItem = async (info: NewsItem | undefined, index: number) => {
    selected.value = index
    formData.value = info
    if (info) {
      await toEditDraft(info)
    }
  }

  /**
   * 添加一条图文消息草稿
   */
  const add = () => {
    if (!newsItems.value) {
      newsItems.value = []
    }
    newsItems.value.push(cloneDeep(defaultFormData))
    chooseItem(newsItems.value[newsItems.value.length - 1], newsItems.value.length - 1)
  }

  /**
   * 初始数据
   */
  const init = async () => {
    mediaId.value = route.query.mediaId as string
    appId.value = route.query.appId as string
    if (!isNullOrUnDef(mediaId.value) && !isNullOrUnDef(appId.value)) {
      const accountVo = await getByAppId(appId.value)
      account.value = accountVo

      const content = await getContent(appId.value, mediaId.value)
      newsItems.value = content.newsItem
      // 默认选中第一个
      chooseItem(newsItems.value[0], 0)
    } else {
      add()
    }
    quantity.value = newsItems.value?.length!
  }

  onMounted(() => {
    init()
  })

  /**
   * 动态被选中样式
   * @param index
   */
  const selectedStyle = (index: number) => {
    if (selected.value === index) {
      return 'border: 1px solid #07c160;'
    }
    return ''
  }

  /**
   * 下移
   * @param index
   */
  const down = async (index: number) => {
    let arr = newsItems.value!
    arr.splice(index, 1, ...arr.splice(index + 1, 1, arr[index]))
  }

  /**
   * 上移
   * @param index
   */
  const up = (index: number) => {
    let arr = newsItems.value!
    arr.splice(index - 1, 1, ...arr.splice(index, 1, arr[index - 1]))
  }

  /**
   * 删除元素
   * @param index
   */
  const deleteItem = (index: number) => {
    let arr = newsItems.value!
    if (index === 0) {
      arr.splice(index, 1)
    } else {
      arr.splice(index, index)
    }
  }

  /**
   * 编辑保存事件
   */
  const saveDraft = () => {
    const create = () => {
      createDraft(appId.value!, newsItems.value!).then((mediaId) => {
        router.push({
          path: '/drafts/message',
          query: { mediaId, appId: appId.value }
        })
      })
    }
    if (appId.value && newsItems.value) {
      if (mediaId.value) {
        if (quantity.value < newsItems.value.length) {
          /** 如果图文数量大于原本的数量，表示新增了。则需要删除此图文后重新添加,否则会报错40114,微信公众号暂未解决 **/
          singleToMultipleDraft(appId.value, mediaId.value, newsItems.value).then((mediaId) => {
            router.push({
              path: '/drafts/message',
              query: { mediaId, appId: appId.value }
            })
          })
        } else {
          editDraft(appId.value, mediaId.value, newsItems.value).then(() => {
            ElNotification({
              message: '修改成功',
              type: 'success'
            })
          })
        }
      } else {
        create()
      }
    }
  }

  const toPublishDraft = () => {
    ElMessageBox.confirm('确认发布吗?').then(() => {
      return publish(appId.value!, mediaId.value!).then(() => {
        ElNotification({
          message: '发布成功',
          type: 'success'
        })
      })
    })
  }
</script>
<style lang="scss" scoped>
  .el-container {
    background-color: #e9e9e9 !important;
  }

  .aside {
    width: 470px;
    height: 100vh;
    padding: 30px 30px 0;
    border-right-width: 0;
    overflow-y: hidden;
    .cart_icon {
      width: 60px;
      position: absolute;
      top: -19px;
      right: -76px;
      padding: 15px 7px;
      background-color: #fff;
      box-shadow: 0 1px 6px 0 #e4e8eb;
      border-radius: 25px;
      .icon_container {
        position: relative;
        width: 34px;
        height: 34px;
        left: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        .up {
          background: url('data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27%3E  %3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E    %3Cpath d=%27M0 0h24v24H0z%27/%3E    %3Cpath fill=%27%234A4A51%27 fill-rule=%27nonzero%27 d=%27M10.886 4.764v15.781c0 .121.098.219.219.219h1.09a.219.219 0 0 0 .219-.219V4.764h-1.528z%27/%3E    %3Cpath fill=%27%234A4A51%27 fill-rule=%27nonzero%27 d=%27M11.944 3.163l5.891 6.45a.5.5 0 0 1-.65.75L11.856 6.74a.5.5 0 0 0-.562 0l-5.329 3.623a.5.5 0 0 1-.65-.75l5.89-6.45a.5.5 0 0 1 .74 0z%27/%3E  %3C/g%3E%3C/svg%3E')
            no-repeat center center;
          background-size: contain;
        }
        .down {
          background: url('data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27%3E  %3Cg fill=%27none%27 fill-rule=%27evenodd%27 transform=%27matrix%281 0 0 -1 0 24%29%27%3E    %3Cpath d=%27M0 0h24v24H0z%27/%3E    %3Cpath fill=%27%234A4A51%27 fill-rule=%27nonzero%27 d=%27M10.886 4.764v15.781c0 .121.098.219.219.219h1.09a.219.219 0 0 0 .219-.219V4.764h-1.528z%27/%3E    %3Cpath fill=%27%234A4A51%27 fill-rule=%27nonzero%27 d=%27M11.944 3.163l5.891 6.45a.5.5 0 0 1-.65.75L11.856 6.74a.5.5 0 0 0-.562 0l-5.329 3.623a.5.5 0 0 1-.65-.75l5.89-6.45a.5.5 0 0 1 .74 0z%27/%3E  %3C/g%3E%3C/svg%3E')
            no-repeat center center;
          background-size: contain;
        }
        .delete {
          background: url('data:image/svg+xml;charset=utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724%27 height=%2724%27 viewBox=%270 0 24 24%27%3E  %3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E    %3Cpath d=%27M0 0h24v24H0z%27/%3E    %3Cg transform=%27translate%281 1%29%27%3E      %3Cpath d=%27M0 0h22v22H0z%27/%3E      %3Cpath fill=%27%234A4A51%27 fill-rule=%27nonzero%27 stroke=%27%234A4A51%27 stroke-width=%27.2%27 d=%27M6.21 5.867l.744 12.51c.023.387.344.69.732.69h6.628a.733.733 0 0 0 .732-.69l.745-12.51H6.209zm10.683 0l-.749 12.575a1.833 1.833 0 0 1-1.83 1.725H7.686c-.97 0-1.773-.756-1.83-1.725L5.107 5.867H3.208v-.642c0-.253.206-.458.459-.458h14.666c.253 0 .459.205.459.458v.642h-1.9zm-4.06-3.117c.253 0 .459.205.459.458v.642H8.708v-.642c0-.253.206-.458.459-.458h3.666zm-4.125 5.5h1.1l.459 8.25h-1.1l-.459-8.25zm3.484 0h1.1l-.459 8.25h-1.1l.459-8.25z%27/%3E    %3C/g%3E  %3C/g%3E%3C/svg%3E')
            no-repeat center center;
          background-size: contain;
        }
        .icon {
          width: 20px;
          height: 20px;
          padding: 0;
          border-width: 0;
          vertical-align: middle;
          font-size: 0;
          display: inline-block;
          cursor: pointer;
        }
      }
    }

    .aside-body {
      width: 320px;
      box-shadow: 0 0 8px 0 rgb(229 229 229 / 50%);
      background-color: #fff;
      border-radius: 5px 5px 0 0;
      .aside-title {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        span {
          width: 26px;
          height: 26px;
          margin-right: 20px;
          display: inline-block;
          img {
            height: 100%;
            width: 100%;
          }
        }
      }
      .center-img {
        position: relative;

        .thumbUrl_bd {
          background-color: #e3e4e5;
          height: 130px !important;
          width: 100% !important;
          img {
            height: 100% !important;
            width: 100% !important;
          }
        }

        .card_appmsg {
          color: #ffffff;
          position: absolute;
          bottom: 15%;
          left: 5%;
        }
      }
      .card_container {
        padding: 0 10px;
        position: relative;
        .card_appmsg_inner {
          display: flex;
          line-height: 62px;

          justify-content: space-between;
          align-items: center;
          .appmsg_title {
            width: calc(100% - 48px);
          }
          .card_appmsg_bd {
            width: 48px;
            height: 48px;
            background-color: #e3e4e5;
            img {
              width: 48px;
              height: 48px !important;
            }
          }
        }

        ::before {
          content: ' ';
          position: absolute;
          left: 8px;
          right: 78px;
          top: 0;
          height: 1px;
          background-color: #e4e8eb;
        }
      }
      .add-message {
        text-align: center;
        line-height: 60px;
        border-top: 1px solid #e4e8eb;
      }
    }

    .vertical {
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }
  }
</style>
