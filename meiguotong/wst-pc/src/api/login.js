
import ajax from '../utils/fetch';;
//要代理的路径
const proxy_path = "/api";
//登录
export const login = (param = {}) => ajax( proxy_path +'/forlogin/login', param);
//注册
export const register = (param = {}) => ajax( proxy_path +'/forlogin/register', param);
//发送验证码
export const sendSms = (param = {}) => ajax( proxy_path +'/forlogin/sendSms', param);
//绑定邮箱
export const checkEmail = (param = {}) => ajax( proxy_path +'/forlogin/checkEmail', param);
//验证账号是否注册
export const checkRegister = (param = {}) => ajax( proxy_path +'/forlogin/checkRegister', param);
//修改密码
export const updatePassword = (param = {}) => ajax( proxy_path +'/forlogin/updatePassword', param);