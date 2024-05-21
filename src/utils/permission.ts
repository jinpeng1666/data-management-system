// 校验用户是否具有访问这个路由的权限
// roles：用户身份
// route：路由
export function hasPermission(roles: any, route: any) {
  if (route.meta && route.meta.role) {
    return roles.some((role: any) => route.meta.role.indexOf(role) >= 0)
  } else {
    return true
  }
}
