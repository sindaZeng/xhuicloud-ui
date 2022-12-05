<template>
  <Editor id="myedit" v-model="modelValue" :init="init" tag-name="div" :disabled="disabled" @onClick="onClick" />
</template>

<script setup lang="ts">
  //引入tinymce编辑器
  import Editor from '@tinymce/tinymce-vue'

  //引入方式引入node_modules里的tinymce相关文件文件
  import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入则不显示编辑器
  import 'tinymce/themes/silver' //编辑器主题，不引入则报错
  import 'tinymce/icons/default' //引入编辑器图标icon，不引入则不显示对应图标

  // 引入编辑器插件
  import 'tinymce/plugins/advlist' //高级列表
  import 'tinymce/plugins/anchor' //锚点
  import 'tinymce/plugins/autolink' //自动链接
  import 'tinymce/plugins/autoresize' //编辑器高度自适应,注：plugins里引入此插件时，Init里设置的height将失效
  import 'tinymce/plugins/autosave' //自动存稿
  import 'tinymce/plugins/charmap' //特殊字符
  import 'tinymce/plugins/code' //编辑源码
  import 'tinymce/plugins/codesample' //代码示例
  import 'tinymce/plugins/directionality' //文字方向
  import 'tinymce/plugins/emoticons' //表情
  import 'tinymce/plugins/fullpage' //文档属性
  import 'tinymce/plugins/fullscreen' //全屏
  import 'tinymce/plugins/help' //帮助
  import 'tinymce/plugins/hr' //水平分割线
  import 'tinymce/plugins/image' //插入编辑图片
  import 'tinymce/plugins/importcss' //引入css
  import 'tinymce/plugins/insertdatetime' //插入日期时间
  import 'tinymce/plugins/link' //超链接
  import 'tinymce/plugins/lists' //列表插件
  import 'tinymce/plugins/media' //插入编辑媒体
  import 'tinymce/plugins/nonbreaking' //插入不间断空格
  import 'tinymce/plugins/pagebreak' //插入分页符
  import 'tinymce/plugins/paste' //粘贴插件
  import 'tinymce/plugins/preview' //预览
  import 'tinymce/plugins/print' //打印
  import 'tinymce/plugins/quickbars' //快速工具栏
  import 'tinymce/plugins/save' //保存
  import 'tinymce/plugins/searchreplace' //查找替换
  import 'tinymce/plugins/tabfocus' //切入切出，按tab键切出编辑器，切入页面其他输入框中
  import 'tinymce/plugins/table' //表格
  import 'tinymce/plugins/template' //内容模板
  import 'tinymce/plugins/textcolor' //文字颜色
  import 'tinymce/plugins/textpattern' //快速排版
  import 'tinymce/plugins/toc' //目录生成器
  import 'tinymce/plugins/visualblocks' //显示元素范围
  import 'tinymce/plugins/visualchars' //显示不可见字符
  import 'tinymce/plugins/wordcount' //字数统计
  import { computed, defineProps, PropType, ref } from 'vue'
  import { useVModel } from '@vueuse/core'
  import useStore from '@/store'

  const props = defineProps({
    modelValue: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    imagesUpload: {
      type: Function as PropType<(blobInfo: any) => string>,
      default: (blobInfo: any) => 'data:image/jpeg;base64,' + blobInfo.base64()
    },
    plugins: {
      type: [String, Array],
      default:
        'print preview searchreplace autolink directionality visualblocks autoresize visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave '
    },
    toolbar: {
      type: [String, Array],
      default:
        'fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
                styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
                table image media charmap emoticons hr pagebreak insertdatetime print preview | code selectall | indent2em lineheight formatpainter axupimgs'
    },
    height: {
      type: Number,
      default: 500
    }
  })
  const emit = defineEmits(['update:modelValue', 'onClick'])
  const { app } = useStore()
  const langPath = computed(() => {
    if (app.getLang === 'en') {
      return '/tinymce/langs/en.js'
    }
    return '/tinymce/langs/zh-Hans.js'
  })
  const lang = computed(() => {
    if (app.getLang === 'en') {
      return 'en'
    }
    return 'zh-Hans'
  })

  const modelValue = useVModel(props, 'modelValue', emit)

  const init = ref({
    language_url: langPath, //引入语言包文件
    language: lang, //语言类型
    // tp_i18n: true,
    skin_url: '/tinymce/skins/ui/oxide', //皮肤：浅色
    // skin_url: '/tinymce/skins/ui/oxide-dark', //皮肤：暗色
    content_css: '/tinymce/skins/content/default/content.css ',
    plugins: props.plugins, //插件配置
    // toolbar: props.toolbar, //工具栏配置，设为false则隐藏
    toolbar_mode: 'sliding',
    skeletonScreen: true, // 开启骨架屏
    menubar: 'file edit insert view format table tools', //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”
    menu: {
      // file: { title: '文件', items: 'newdocument' }
      // edit: { title: '编辑', items: 'undo redo | cut copy paste pastetext | selectall' },
      // insert: { title: '插入', items: 'link image  |  hr' },
      // view: { title: '查看', items: 'visualaid' }
      // format: {
      //   title: '格式',
      //   items:
      //     'bold italic underline strikethrough superscript subscript | formats | removeformat',
      // },
      // table: { title: '表格', items: 'inserttable tableprops deletetable | cell row column' },
      // tools: { title: '工具', items: 'spellchecker code' },
    },
    fontsize_formats: '12px 14px 16px 18px 20px 22px 24px 28px 32px 36px 48px 56px 72px', //字体大小
    font_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',

    height: props.height,
    width: '100%',
    autoresize_min_height: 400,
    autoresize_max_height: 800,
    placeholder: '在这里输入文字',
    paste_data_images: true,
    image_advtab: true,
    allow_script_urls: true,
    object_resizing: false,

    branding: false, //tiny技术支持信息是否显示
    resize: false, //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
    statusbar: false, //最下方的元素路径和字数统计那一栏是否显示
    elementpath: false, //元素路径是否显示

    content_style: 'img {max-width:100%;}', //直接自定义可编辑区域的css样式

    // 此处为图片上传处理函数，这个默认用了base64的图片形式上传图片，
    images_upload_handler: async (blobInfo: any, success: any) => {
      const image = await props.imagesUpload(blobInfo)
      console.log(blobInfo)

      console.log(image)
      success(image)
    },
    imagetools_fetch_image: function (img: any) {
      return new tinymce.util.Promise(function () {
        console.log(img)
        // Fetch the image and return a blob containing the image content
        // resolve(new Blob(...));
      })
    }
  })

  // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
  // 需要什么事件可以自己增加
  function onClick(e: any) {
    emit('onClick', e, tinymce)
  }
</script>

<style>
  .wxw-img {
    vertical-align: bottom;
  }

  img {
    *zoom: 1;
    max-width: 100%;
    *max-width: 96%;
    height: auto !important;
  }
</style>
