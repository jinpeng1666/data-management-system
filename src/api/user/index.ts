// 统一管理用户相关的接口
import request from '@/utils/request'

// 登录接口方法
export const reqLogin = (data: any) => request.post('/user/login', data)

// 获取用户信息接口方法
export const reqUserInfo = () => request.get('/user/info')
