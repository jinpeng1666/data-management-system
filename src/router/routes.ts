// 存放所有权限通用路由表

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { isHidden: true },
    name: 'login',
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: { isHidden: true },
    name: 'layout',
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: { isHidden: false, title: '首页' },
      },
      {
        path: '/salary',
        component: () => import('@/views/salary/index.vue'),
        meta: { isHidden: false, title: '薪资' },
      },
      {
        path: '/selfAttendance',
        component: () => import('@/views/selfAttendance/index.vue'),
        meta: { isHidden: false, title: '出勤情况' },
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
        meta: { role: ['Manager', 'Minister'], isHidden: false, title: '员工' },
      },
      {
        path: '/finance',
        component: () => import('@/views/finance/index.vue'),
        meta: { role: ['Manager', 'Finance'], isHidden: false, title: '财务' },
      },
      {
        path: '/attendance',
        component: () => import('@/views/attendance/index.vue'),
        meta: {
          role: ['Manager', 'Attendance'],
          isHidden: false,
          title: '考勤',
        },
      },
      {
        path: '/operation',
        component: () => import('@/views/operation/index.vue'),
        meta: {
          role: ['Manager', 'Operation'],
          isHidden: false,
          title: '运营',
        },
      },
      {
        path: '/authority',
        component: () => import('@/views/authority/index.vue'),
        meta: { role: ['Manager'], isHidden: false, title: '权限' },
      },
    ],
  },
]
