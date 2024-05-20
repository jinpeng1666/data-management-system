//用户信息数据
function createUserList() {
  return [
    // 总经理
    {
      userId: 1,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'Manager',
      password: '111111',
      desc: '总经理',
      roles: ['Manager'],
      token: 'GeneralManager Token',
    },
    // 财务部部长
    {
      userId: 2,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'FinanceMinister',
      password: '222222',
      desc: '财务部部长',
      roles: ['Minister', 'Finance'],
      token: 'MinisterOfFinance Token',
    },
    // 考勤部部长
    {
      userId: 3,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'AttendanceMinister',
      password: '222222',
      desc: '考勤部部长',
      roles: ['Minister', 'Attendance'],
      token: 'MinisterOfAttendance Token',
    },
    // 运营部部长
    {
      userId: 4,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'OperationMinister',
      password: '222222',
      desc: '财务部部长',
      roles: ['Minister', 'Operation'],
      token: 'MinisterOfOperation Token',
    },
    // 财务部员工1
    {
      userId: 5,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'FinanceEmployee1',
      password: '333333',
      desc: '财务部员工1',
      roles: ['Employee', 'Finance'],
      token: 'EmployeeOfFinance1 Token',
    },
    // 财务部员工2
    {
      userId: 6,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'FinanceEmployee2',
      password: '333333',
      desc: '财务部员工1',
      roles: ['Employee', 'Finance'],
      token: 'EmployeeOfFinance2 Token',
    },
    // 考勤部员工1
    {
      userId: 7,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'AttendanceEmployee1',
      password: '333333',
      desc: '考勤部员工1',
      roles: ['Employee', 'Attendance'],
      token: 'EmployeeOfAttendance1 Token',
    },
    // 考勤部员工2
    {
      userId: 8,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'AttendanceEmployee2',
      password: '333333',
      desc: '考勤部员工2',
      roles: ['Employee', 'Attendance'],
      token: 'EmployeeOfAttendance2 Token',
    },
    // 运营部员工1
    {
      userId: 9,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'OperationEmployee1',
      password: '333333',
      desc: '运营部员工1',
      roles: ['Employee', 'Operation'],
      token: 'EmployeeOfOperation1 Token',
    },
    // 运营部员工2
    {
      userId: 10,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'OperationEmployee2',
      password: '333333',
      desc: '运营部员工2',
      roles: ['Employee', 'Operation'],
      token: 'EmployeeOfOperation2 Token',
    },
  ]
}

export default [
  // 用户登录接口
  {
    url: '/api/user/login', //请求地址
    method: 'post', //请求方式
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      )
      //没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, data: { message: '账号或者密码不正确' } }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return { code: 200, data: { token } }
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token
      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token)
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: { message: '获取用户信息失败' } }
      }
      //如果有返回成功信息
      return { code: 200, data: { checkUser } }
    },
  },
]
