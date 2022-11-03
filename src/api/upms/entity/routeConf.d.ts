interface SysRouteConf {
  id: number
  routeName: string
  routeId: string
  predicates: string
  filters: string
  uri: string
  sort: number
  createTime: string
  createId?: number
  updateTime: string
  updateId?: number
  isDel: number
}
interface Predicate {
  args: Args
  name: string
}

interface Args {
  [key: string]: string
}

interface PredicateAndFilterVo {
  predicateVos: CommonVo[]
  filterVos: CommonVo[]
}

interface CommonVo {
  value: string
  name: string
  nameEdit?: boolean
  valueEdit?: boolean
}
