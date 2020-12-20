 const config = {
  host:'',
  havePermisiison:'false',
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
    //   label:'模板菜单',
    //   type:'group',
    //   list:[
    //     {
    //       key:'templatedemo',
    //       label:'模板列表'
    //     },
    //   ]
    // },

    {
      key:'templateblock',  
      type:'row',
      label:'模板列表',
      level:[0,1],
      code:'TEMPLATE'
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
    templateblock:{
      name: '名字',
      count: "数量",
      status: '状态',
    },
  }
}
export default config;