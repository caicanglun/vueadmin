import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/userManage/Table.vue'
import Form from './views/userManage/Form.vue'
import user from './views/userManage/user.vue'
import bullein from './views/articleManage/bullein.vue'
import addBullein from './views/articleManage/addBullein.vue'
import handle from './views/messageManage/handle.vue'
import unHandle from './views/messageManage/unHandle.vue'
import userList from './views/userManage/userList.vue'
import echarts from './views/charts/echarts.vue'
import chongzhi from './views/userManage/chongzhi.vue'
import tibi from './views/userManage/tibi.vue'
import team from './views/userManage/team.vue'
import kuangjiList from './views/userManage/kuangjiList.vue'
import setting from './views/setting/system.vue'
import setting2 from './views/setting/system-2.vue'
import setting3 from './views/setting/system-3.vue'

import finance from './views/userManage/finance.vue'
import zengsong from './views/userManage/zengsong.vue'

import stockPrice from './views/stockManage/price.vue'
import priceCount from './views/stockManage/priceCount.vue'
import freezonDay from './views/stockManage/freezonDay.vue'
import chaifen from './views/stockManage/chaifen.vue'
import purcharse from './views/stockManage/purcharse.vue'
import sellQueue from './views/stockManage/sellQueue.vue'
import buyTopLine from './views/stockManage/buyTopLine.vue'
import sellTopLine from './views/stockManage/sellTopLine.vue'
import createBulletin from './views/bulletin/createBulletin.vue'
import bulleinList from './views/bulletin/bulleinList.vue'
import orderList  from './views/USDFMarket/orderList.vue'
import buyList from './views/USDFMarket/buyList.vue'
import sellList from './views/USDFMarket/sellList.vue'
import setCreditTime from './views/USDFMarket/setCreditTime.vue'
import setMaxCreditLevel from './views/USDFMarket/setMaxCreditLevel.vue'
import setMaxMin from './views/USDFMarket/setMaxMin.vue'
import setSellRate from './views/USDFMarket/setSellRate.vue'
import setUnitPrice from './views/USDFMarket/setUnitPrice.vue'
import setRecharge from './views/setRecharge/setRecharge.vue'




let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    // { path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '会员管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '全站统计' },
            { path: '/userList', component: userList, name: '所有会员' },
            { path: '/chongzhi', component: chongzhi, name: '充值管理' },
   //          { path: '/tibi', component: tibi, name: '提币管理' },
			// { path: '/team', component: team, name: '会员关系图' },
			// { path: '/kuangjiList', component: kuangjiList , name: '矿机列表' },
			{ path: '/finance', component: finance, name: '资金明细' },
			{ path: '/zengsong', component: zengsong, name: '金额赠送' }
			]
    },
    {
        path: '/',
        component: Home,
        name: '熵值管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/stockPrice', component: stockPrice, name: '单价设置管理' },
            { path: '/priceCount', component: priceCount, name: '涨价股票数设置'},
            { path: '/freezonDay', component: freezonDay, name: '新进冻结天数设置'},
            { path: '/chaifen', component: chaifen, name: '拆分配送'},
            { path: '/purcharse', component: purcharse, name: '认购列表'},
            { path: '/sellQueue', component: sellQueue, name: '抛售列表'},
            { path: '/buyTopLine', component: buyTopLine, name: '日交易购买封顶'},
            { path: '/sellTopLine', component: sellTopLine, name: '日交易出售封顶'}
        ]
    },
	{
	       path: '/',
	       component: Home,
	       name: '公告管理',
	       iconCls: 'fa fa-address-card',
	       // leaf: true,//只有一个节点
	       children: [
	           { path: '/createBulletin', component: createBulletin, name: '创建公告' },
	           { path: '/bulleinList', component: bulleinList, name: '公告列表' }
	           
	       ]
	   },
	   {
	          path: '/',
	          component: Home,
	          name: 'USDF交易管理',
	          iconCls: 'fa fa-address-card',
	          // leaf: true,//只有一个节点
	          children: [
	              { path: '/orderList', component: orderList, name: '订单列表' },
	              { path: '/buyList', component: buyList, name: '买单列表' },
	              { path: '/sellList', component: sellList, name: '卖单列表' },
	              { path: '/setCreditTime', component: setCreditTime, name: '设置打款间隔时间' },
	              { path: '/setMaxCreditLevel', component: setMaxCreditLevel, name: '设置最大信用等级' },
	              { path: '/setSellRate', component: setSellRate, name: '设置挂卖手续费' },
	              { path: '/setMaxMin', component: setMaxMin, name: '设置挂单交易额度' },
	              { path: '/setUnitPrice', component: setUnitPrice, name: '设置U单价' }
	              
	          ]
	      },
		{
			path: '/',
			component: Home,
			name: '留言管理',
			iconCls: 'fa fa-address-card',
			// leaf: true,//只有一个节点
			children: [
				{ path: '/unHandle', component: unHandle, name: '未处理留言' },
				{ path: '/handle', component: handle, name: '已处理留言' },
			]
		},
		{
			path: '/',
			component: Home,
			name: '充值地址管理',
			iconCls: 'fa fa-address-card',
			// leaf: true,//只有一个节点
			children: [
				{ path: '/setRecharge', component: setRecharge, name: '充值地址设置' },
				
			]
		},
	// {
	//     path: '/',
	//     component: Home,
	//     name: '系统参数',
	//     iconCls: 'fa fa-id-card-o',
	    
	//     children: [
	//         { path: '/setting', component: setting, name: '参数设置' },
	// 		{ path: '/setting2', component: setting2, name: '参数设置二' },
	// 		{ path: '/setting3', component: setting3, name: '参数设置三' }
	        
	//     ]
	// },
	// {
	//     path: '/',
	//     component: Home,
	//     name: '激活出局用户',
	//     iconCls: 'fa fa-id-card-o',
	//     children: [
	//         { path: '/activeUser', component: activeUser, name: '激活出局用户' },
	        
	//     ]
	// },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;