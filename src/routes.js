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
import finance from './views/userManage/finance.vue'
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
            { path: '/tibi', component: tibi, name: '提币管理' },
			{ path: '/team', component: team, name: '会员关系图' },
			{ path: '/kuangjiList', component: kuangjiList , name: '矿机列表' },
			{ path: '/finance', component: finance , name: '资金明细' },
			]
    },
    {
        path: '/',
        component: Home,
        name: '文章管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/bullein', component: bullein, name: '新闻公告' },
            { path: '/addBullein', component: addBullein, name: '添加内容' } 
        ]
    },
    {
        path: '/',
        component: Home,
        name: '留言管理',
        iconCls: 'fa fa-address-card',
        // leaf: true,//只有一个节点
        children: [
            { path: '/handle', component: handle, name: '未处理留言' },
            { path: '/unHandle', component: unHandle, name: '已处理留言' },
        ]
    },
	{
	    path: '/',
	    component: Home,
	    name: '系统参数',
	    iconCls: 'fa fa-id-card-o',
	    
	    children: [
	        { path: '/setting', component: setting, name: '参数设置' }
	        
	    ]
	},
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