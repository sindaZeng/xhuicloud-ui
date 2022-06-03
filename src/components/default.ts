import type { Plugin } from 'vue'

import { XhBreadcrumb } from './XhBreadcrumb'
import { XhCard } from './XhCard'
import { XhCharts } from './XhCharts'
import { XhDraggable } from './XhDraggable'
import { XhForm } from './XhForm'
import { XhHamburger } from './XhHamburger'
import { XhIconView } from './XhIconView'
import { XhLangSelect } from './XhLangSelect'
import { XhMessage } from './XhMessage'
import { XhScreenfull } from './XhScreenfull'
import { XhSettingSelect } from './XhSettingSelect'
import { XhSvg } from './XhSvg'
import { XhTagView } from './XhTagView'
import { XhThemeSelect } from './XhThemeSelect'

export default [
  XhBreadcrumb,
  XhCard,
  XhCharts,
  XhDraggable,
  XhForm,
  XhHamburger,
  XhIconView,
  XhLangSelect,
  XhMessage,
  XhScreenfull,
  XhSettingSelect,
  XhSvg,
  XhTagView,
  XhThemeSelect
] as Plugin[]
