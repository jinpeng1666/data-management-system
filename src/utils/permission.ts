// 校验用户是否具有访问这个路由的权限
// roles：用户身份
// routes：传入动态路由表中二级路由对象
export function hasPermission(roles: any, routes: any) {
  return roles.some((role: any) => {
    return routes.meta.role.includes(role)
  })
}
