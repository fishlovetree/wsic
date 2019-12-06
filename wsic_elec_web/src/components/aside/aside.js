module.exports = [
  {
    name:'客户管理',
    id:'1',
    sub:[
      {
        name:'客户档案',
        componentName:'CustomerFile'
      }
    ]
  },
  {
    name:'档案管理',
    id:'2',
    sub:[
      {
        name:'电表档案',
        componentName:'MeterFile'
      },
      { 
        name:'集中器档案',
        componentName:'ConcentratorFile'
      },
      { 
        name:'采集器档案',
        componentName:'CollectorFile'
      },
      { 
        name:'档案抄设',
        componentName:'FileCopying'
      },
      { 
        name:'集中器参数设置',
        componentName:'ConcentratorParameterSetting'
      },
      { 
        name:'集中器运行状态',
        componentName:'ConcentratorOperationStatus'
      },
      { 
        name:'集中器工况',
        componentName:'ConcentratorCondition'
      }
    ]
  },
  {
    name:'控制中心',
    id:'3',
    sub:[
      {
        name:'电表-透表抄表',
        componentName:'Meter'
      },
      { 
        name:'数据召测',
        componentName:'DataCallTest'
      },
      { 
        name:'远程拉合闸',
        componentName:'RemoteControl'
      }
    ]
  },
  {
    name:'报表中心',
    id:'4',
    sub:[
      {
        name:'日数据报表',
        componentName:'DailyReport'
      },
      { 
        name:'月数据报表',
        componentName:'MonthlyReport'
      },
      { 
        name:'采集成功率',
        componentName:'AcquisitionSuccessRate'
      },
      { 
        name:'实时数据',
        componentName:'RealtimeData'
      }
    ]
  },
  {
    name:'系统管理',
    id:'5',
    sub:[
      {
        name:'菜单管理',
        componentName:'MenuManagement'
      },
      { 
        name:'角色管理',
        componentName:'RoleManagement'
      },
      { 
        name:'账号管理',
        componentName:'AccountManagement'
      },
      { 
        name:'组织机构',
        componentName:'Organization'
      },
      { 
        name:'操作日志',
        componentName:'OperationLog'
      },
      { 
        name:'错误日志',
        componentName:'ErrorLog'
      },
      { 
        name:'数据字典',
        componentName:'DataDictionary'
      }
    ]
  }
]