interface RoleDto {
  label: string
  value: number
}

interface SysRole {
  id: number
  roleCode: string
  roleName: string
  roleDesc: string
  createTime: string
  createId: number
  updateTime: string
  updateId: number
  isDel: number
  tenantId: number
}

interface RoleMenusDto {
  /**
   * 角色ID
   */
  roleId: number

  /**
   * 菜单ID
   */
  menuIds: number[]
}
