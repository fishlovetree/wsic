import axios from '@/axios'

//后台登录
export const Login = (params) => {
  return axios({     
      url: '/sys/admin/login',
      method: 'POST',
      params
  })
}
// 后台登出
export const Logout = (params) => {
  return axios({     
      url: '/sys/admin/logout',
      method: 'POST',
      params
  })
}
// 检验原密码
export const checkPassword = (params) => {
  return axios({     
      url: '/sys/user/checkPassword',
      method: 'POST',
      params
  })
}
//  首页总数（电力、水务）
export const getDeviceCount = (params) => {
  return axios({     
      url: '/bus/concentrator/getDeviceCount',
      method: 'GET',
      params
  })
}
// // 设备管理类-获取设备总数（消防）
// export const getDeviceCount = (params) => {
//   return axios({     
//       url: '/bus/equipment/getDeviceCount',
//       method: 'GET',
//       params
//   })
// }
// 日志管理类-获取分页列表 
export const getError = (params) => {
  return axios({     
      url: '/sys/errorLog/getLogPage',
      method: 'GET',
      params
  })
}
// 日志管理类-获取分页列表 
export const getLogPage = (params) => {
  return axios({     
      url: '/sys/sysLog/getLogPage',
      method: 'GET',
      params
  })
}
//  组织机构-获取树状结构列表
export const getOrganization = (params) => {
  return axios({     
      url: '/sys/organization/getList',
      method: 'GET',
      params
  })
}
//  组织机构-获取树状结构列表
export const getOrganizationTree = (params) => {
  return axios({     
      url: '/sys/organization/getOrganizationTree',
      method: 'GET',
      params
  })
}
//  组织机构-添加组织机构
export const createOrg= (params) => {
  return axios({     
    url: '/sys/organization/create',
    method: 'POST',
    params
  })
}
//  组织机构-删除组织机构
export const deleteOrg= (params) => {
  return axios({     
    url: '/sys/organization/delete',
    method: 'POST',
    params
  })
}
//  组织机构-修改组织机构
export const updateOrg= (params) => {
  return axios({     
    url: '/sys/organization/update',
    method: 'POST',
    params
  })
}
// 菜单管理-获取菜单列表
export const getMenuList = (params) => {
  return axios({     
      url: '/sys/menu/getMenuList',
      method: 'GET',
      params
  })
}
// 菜单管理-添加菜单
export const createMenu = (params) => {
  return axios({     
      url: '/sys/menu/create',
      method: 'POST',
      params
  })
}
// 菜单管理-编辑菜单
export const changeMenu = (params) => {
  return axios({     
      url: '/sys/menu/update',
      method: 'POST',
      params
  })
}
// 菜单管理-删除菜单
export const delMenu = (params) => {
  return axios({     
      url: '/sys/menu/delete',
      method: 'POST',
      params
  })
}
// 菜单管理-获取菜单树形结构
export const getMenuTree = (params) => {
  return axios({     
      url: '/sys/menu/getMenuTree',
      method: 'GET',
      params
  })
}
// 角色管理--获取列表
export const getRoleList = (params) => {
  return axios({     
      url: '/sys/role/getRoleList',
      method: 'GET',
      params
  })
}
// 角色管理--分页获取列表
export const getRolePage = (params) => {
  return axios({     
      url: '/sys/role/getRolePage',
      method: 'GET',
      params
  })
}
// 角色管理--设置角色菜单
export const getRoleMenu = (params) => {
  return axios({     
      url: '/sys/role/updateRoleMenu',
      method: 'POST',
      params
  })
}
// 角色管理--添加角色
export const getCreated = (params) => {
  return axios({     
      url: '/sys/role/create',
      method: 'POST',
      params
  })
}
// 角色管理--修改角色
export const updateRole = (params) => {
  return axios({     
      url: '/sys/role/update',
      method: 'POST',
      params
  })
}
// 角色管理--修改角色
export const deleteRole = (params) => {
  return axios({     
      url: '/sys/role/delete',
      method: 'POST',
      params
  })
}
// 账号管理-根据条件获取账号列表（搜索）
export const getUserList = (params) => {
  return axios({     
      url: '/sys/user/getUserList',
      method: 'GET',
      params
  })
}
// 账号管理-根据账号名获取账号信息
export const getUserByName = (params) => {
  return axios({     
      url: '/sys/user/getUserByName',
      method: 'GET',
      params
  })
}
// 账号管理-分页获取账号
export const getUserPage = (params) => {
  return axios({     
      url: '/sys/user/getUserPage',
      method: 'GET',
      params
  })
}
// 账号管理-获取账号角色列表
export const getUserRole = (params) => {
  return axios({     
      url: '/sys/user/getUserRole',
      method: 'GET',
      params
  })
}
// 账号管理-添加账号
export const getCreate = (params) => {
  return axios({     
      url: '/sys/user/create',
      method: 'POST',
      params
  })
}
// 账号管理-删除账号
export const getDelete = (params) => {
  return axios({     
      url: '/sys/user/delete',
      method: 'POST',
      params
  })
}
// 账号管理-修改账号(编辑)
export const getUpdate = (params) => {
  return axios({     
      url: '/sys/user/update',
      method: 'POST',
      params
  })
}
// 账号管理-修改密码
export const getUpdatePwd = (params) => {
  return axios({     
      url: '/sys/user/updatePassword',
      method: 'POST',
      params
  })
}
// 账号管理-设置账号角色
export const getUpdateRole = (params) => {
  return axios({     
      url: '/sys/user/updateUserRole',
      method: 'POST',
      params
  })
}
// 常量管理-获取常量列表
export const getConstantList = (params) => {
  return axios({     
      url: '/sys/constant/getConstantList',
      method: 'GET',
      params
  })
}
// 常量管理-获取常量子项列表
export const getDetailList = (params) => {
  return axios({     
      url: '/sys/constant/getDetailList',
      method: 'GET',
      params
  })
}
// 常量管理-添加常量
export const getaddConstant = (params) => {
  return axios({     
      url: '/sys/constant/addConstant',
      method: 'POST',
      params
  })
}
// 常量管理-添加常量子项
export const getaddConstantDetail = (params) => {
  return axios({     
      url: '/sys/constant/addConstantDetail',
      method: 'POST',
      params
  })
}
// 常量管理-删除常量
export const getdelConstant = (params) => {
  return axios({     
      url: '/sys/constant/deleteConstant',
      method: 'POST',
      params
  })
}

// 常量管理-删除常量子项
export const getdelConstantDetail = (params) => {
  return axios({     
      url: '/sys/constant/deleteConstantDetail',
      method: 'POST',
      params
  })
}
// 常量管理-修改常量
export const getupdConstant = (params) => {
  return axios({     
      url: '/sys/constant/updateConstant',
      method: 'POST',
      params
  })
}
// 常量管理-修改常量子项
export const getupdateConstantDetail = (params) => {
  return axios({     
      url: '/sys/constant/updateConstantDetail',
      method: 'POST',
      params
  })
}

// 集中器管理列表
export const getConcentrator = (params) => {
  return axios({     
      url: '/bus/concentrator/getConcentrator',
      method: 'GET',
      params
  })
}
// 集中器导出
export const getExportExcel = (params) => {
  return axios({     
    url: '/bus/concentrator/exportExcel',
    method: 'GET',
    params,
    async:true,
    responseType: 'blob'
  })
}
// 集中器导入
export const getImportExcel = (params) => {
  console.log('params',params)
  return axios({     
      url: '/bus/concentrator/importExcel',
      method: 'POST',
      params,
  })
}
// 添加集中器
export const getaddConcentrator = (params) => {
  return axios({     
      url: '/bus/concentrator/addConcentrator',
      method: 'POST',
      params
  })
}
// 修改集中器
export const getupdateConcentrator = (params) => {
  return axios({     
      url: '/bus/concentrator/updateConcentrator',
      method: 'PUT',
      params
  })
}
// 删除集中器
export const getdeleteConcentrator = (params) => {
  return axios({     
      url: '/bus/concentrator/deleteConcentrator',
      method: 'DELETE',
      params
  })
}
// 电表管理列表
export const getMeter = (params) => {
  return axios({     
      url: '/bus/meter/getMeter',
      method: 'GET',
      params
  })
}
// 电表导出
export const getMeterExportExcel = (params) => {
  return axios({     
      url: '/bus/meter/exportExcel',
      method: 'GET',
      params,
      async:true,
      responseType: 'blob'
  })
}
// 电表导入
export const getMeterImportExcel = (params) => {
  return axios({     
      url: '/bus/meter/importExcel',
      method: 'GET',
      params
  })
}
// 添加电表
export const getaddMeter = (params) => {
  return axios({     
      url: '/bus/meter/addMeter',
      method: 'POST',
      params
  })
}
// 修改电表
export const getupdateMeter = (params) => {
  return axios({     
      url: '/bus/meter/updateMeter',
      method: 'PUT',
      params
  })
}
// 删除电表
export const getdeleteMeter = (params) => {
  return axios({     
      url: '/bus/meter/deleteMeter',
      method: 'DELETE',
      params
  })
}
// Api列表
export const getApi = (params) => {
  return axios({     
      url: '/bus/userApi/getApi',
      method: 'GET',
      params
  })
}
// 添加Api
export const getaddApi = (params) => {
  return axios({     
      url: '/bus/userApi/addApi',
      method: 'POST',
      params
  })
}
// 修改Api
export const getupdateApi = (params) => {
  return axios({     
      url: '/bus/userApi/updateApi',
      method: 'PUT',
      params
  })
}
// 删除Api
export const getdeleteApi = (params) => {
  return axios({     
      url: '/bus/userApi/deleteApi',
      method: 'DELETE',
      params
  })
}
// 设备管理类-获取设备列表
export const getEquipment = (params) => {
  return axios({     
      url: '/bus/equipment/getEquipment',
      method: 'GET',
      params
  })
}
// 设备管理类-添加设备
export const getaddEquipment = (params) => {
  return axios({     
      url: '/bus/equipment/addEquipment',
      method: 'POST',
      params
  })
}
// 设备管理类-删除设备
export const getdeleteEquipment = (params) => {
  return axios({     
      url: '/bus/equipment/deleteEquipment',
      method: 'DELETE',
      params
  })
}
// 设备管理类-修改设备
export const getupdateEquipment = (params) => {
  return axios({     
      url: '/bus/equipment/updateEquipment',
      method: 'PUT',
      params
  })
}
// 设备管理类-导出设备
export const getEquipmentExcel = (params) => {
  return axios({     
      url: '/bus/equipment/exportExcel',
      method: 'POST',
      params,
      async:true,
      responseType: 'blob'
  })
}
// 设备管理类-导入设备
export const getEquipmentImport = (params) => {
  return axios({     
      url: '/bus/equipment/importExcel',
      method: 'POST',
      params
  })
}

