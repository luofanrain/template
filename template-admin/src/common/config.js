 const config = {
  host:'/',  
  axiosType:{
    zip:'application/zip',
    xlsx:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  },
  tips:{
    errCode:{
      400:'参数错误',
      403:'权限受限，请联系管理员',
      404:'请求链接不存在,请联系管理员',
      405:'请求方式不正确,应为POST/GET',
      500:'服务器错误,请联系管理员',
      default:'无效的请求,状态码($),请联系管理员',
      other:'未知错误，请联系管理排查'
    }
  },
  banner:[
    // {
    //   label:'项目管理',
    //   type:'group',
    //   list:[
    //     {
    //       key:'templatedemo',
    //       label:'入组上限'
    //     },
    //   ]
    // },

    {
      key:'permissions',  
      type:'row',
      label:'日报列表',
      level:[0,1],
      code:'DAILYLIST'
    }

  ],
  table:{
    page:1,
    pagesize:20,
    label:{
      create:'新增',
      modify:'修改',
      export:'导出',
      import:'导入',
      delete:'删除',
      audit:'审核',
      detail:'详情',
      preview:'预览'
    },
    permissions:{
      name: '姓名',
      province: "省份",
      city: "城市",
      hospital: "医院",
      telephone: "联系电话",
      email: "邮箱",
      field: "领域",
      department: "科室",
      create_time: "创建时间",
    }
  }
}
export default config;