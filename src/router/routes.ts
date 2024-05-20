// 存放所有权限通用路由表

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
      },
      {
        path: '/salary',
        component: () => import('@/views/salary/index.vue'),
      },
      {
        path: '/selfAttendance',
        component: () => import('@/views/selfAttendance/index.vue'),
      },
    ],
  },
]

// 存放需要根据权限动态加载的路由表
export const asyncRouterMap = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: '/employee',
        component: () => import('@/views/employee/index.vue'),
        meta: { role: ['Manager', 'Minister'] },
      },
      {
        path: '/finance',
        component: () => import('@/views/finance/index.vue'),
        meta: { role: ['Manager', 'Finance'] },
      },
      {
        path: '/attendance',
        component: () => import('@/views/attendance/index.vue'),
        meta: { role: ['Manager', 'Attendance'] },
      },
      {
        path: '/operation',
        component: () => import('@/views/operation/index.vue'),
        meta: { role: ['Manager', 'Operation'] },
      },
      {
        path: '/authority',
        component: () => import('@/views/authority/index.vue'),
        meta: { role: ['Manager'] },
      },
    ],
  },
]
