import Vue from 'vue'
import Router from 'vue-router'
import Main from '_c/main.vue'
import store from '../store/index'
// import Min from '_c/mintit'

Vue.use(Router)
const router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    alias: '/',
    meta: {},
    component: () => import('@/components/login.vue')
  },
  {
    path: '/home',
    name: 'home',

    meta: {
      title: '首页',
      icon: 'ios-home'
    },
    component: Main,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'index',
      meta: {
        title: '首页(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/home/index.vue')
    },
    {
      path: 'indexzyz',
      name: 'indexzyz',
      meta: {
        title: '首页(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/home/indexzyz.vue')
    },
    {
      path: 'less',
      name: 'less',
      meta: {
        title: '账户设置',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/home/less.vue')
    },
    {
      path: 'xt',
      name: 'xt',
      meta: {
        title: '系统信息',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/home/xt.vue')
    },
    {
      path: 'dlrz',
      name: 'dlrz',
      meta: {
        title: '登陆日志',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/home/dlrz.vue')
    }
    ]
  },
  {
    path: '/basic_data',
    name: 'basic_data',
    meta: {
      title: '基础资料',
      icon: 'ios-cog'
    },
    component: Main,
    children: [{
      path: 'integral',
      name: 'integral',
      meta: {
        title: '积分查询(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/integral.vue')
    },
    {
      path: 'vun_integral',
      name: 'vun_integral',
      meta: {
        title: '积分查询(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/vun_integral.vue')
    },
    {
      path: 'integral_parent',
      name: 'integral_parent',
      meta: {
        title: '家长职业类型管理（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/integral_parent.vue')
    },
    {
      path: 'EducationExperience',
      name: 'EducationExperience',
      meta: {
        title: '教育经历（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/EducationExperience.vue')
    },
    {
      path: 'InterestsHobbies',
      name: 'InterestsHobbies',
      meta: {
        title: '兴趣爱好（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/InterestsHobbies.vue')
    },
    {
      path: 'EmploymentSituation',
      name: 'EmploymentSituation',
      meta: {
        title: '就业情况（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/EmploymentSituation.vue')
    },
    {
      path: 'RehabilitationSupport',
      name: 'RehabilitationSupport',
      meta: {
        title: '康复支持（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/RehabilitationSupport.vue')
    },
    {
      path: 'SocialSecurity',
      name: 'SocialSecurity',
      meta: {
        title: '社会保障（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/SocialSecurity.vue')
    },
    {
      path: 'insurance',
      name: 'insurance',
      meta: {
        title: '保险（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/insurance.vue')
    },
    {
      path: 'FusionEducation',
      name: 'FusionEducation',
      meta: {
        title: '融合教育（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/FusionEducation.vue')
    },
    {
      path: 'VolunteerPosition_hy',
      name: 'VolunteerPosition_hy',
      meta: {
        title: '志愿者岗位（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/VolunteerPosition_hy.vue')
    },
    {
      path: 'VolunteerPosition_zyz',
      name: 'VolunteerPosition_zyz',
      meta: {
        title: '志愿者岗位（志愿者）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/VolunteerPosition_zyz.vue')
    },
    {
      path: 'vun_vp',
      name: 'vun_vp',
      meta: {
        title: '志愿者特长管理',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/vun_vp.vue')
    },
    {
      path: 'vp_vp',
      name: 'vp_vp',
      meta: {
        title: '会员特长管理',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/vp_vp.vue')
    },
    {
      path: 'vun_action',
      name: 'vun_action',
      meta: {
        title: '志愿者活动分类管理（公用）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/vun_action.vue')
    },
    {
      path: 'integral_medal',
      name: 'integral_medal',
      meta: {
        title: '勋章管理（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/integral_medal.vue')
    },
    {
      path: 'integral_cenfic',
      name: 'integral_cenfic',
      meta: {
        title: '证件管理（共用）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/integral_cenfic.vue')
    },
    {
      path: 'vun_cenfic',
      name: 'vun_cenfic',
      meta: {
        title: '证书管理（志愿者）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/vun_cenfic.vue')
    },
    {
      path: 'vp_cenfic',
      name: 'vp_cenfic',
      meta: {
        title: '证书管理（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/vp_cenfic.vue')
    },
    {
      path: 'vun_prend',
      name: 'vun_prend',
      meta: {},
      component: () =>
        import('@/views/basic_data/vun_prend.vue')
    },
    {
      path: 'cenfic_prend',
      name: 'cenfic_prend',
      meta: {},
      component: () =>
        import('@/views/basic_data/cenfic_prend.vue')
    },
    {
      path: 'vp_obstacle',
      name: 'vp_obstacle',
      meta: {
        title: '障碍管理（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/vp_obstacle.vue')
    },

    {
      path: 'offical_action',
      name: 'offical_action',
      meta: {
        title: '官方活动分类管理（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/offical_action.vue')
    },
    {
      path: 'integral_project',
      name: 'integral_project',
      meta: {
        title: '项目管理（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/integral_project.vue')
    },
    {
      path: 'project_list.vue',
      name: 'project_list.vue',
      meta: {
        title: '项目预算列表（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/project_list.vue')
    },
    {
      path: 'vp_price',
      name: 'vp_price',
      meta: {
        title: '会费管理（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/vp_price.vue')
    },
    {
      path: 'price_manage',
      name: 'price_manage',
      meta: {
        title: '基金管理（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/price_manage.vue')
    },

    //新建基金
    {
      path: 'addfund',
      name: 'addfund',

      component: () =>
        import('@/views/basic_data/addfund.vue')
    },
    {
      path: 'agreeclass',
      name: 'agreeclass',
      meta: {

      },
      component: () =>
        import('@/views/basic_data/agreeclass.vue')
    },
    {
      path: 'agreedetail',
      name: 'agreedetail',
      meta: {

      },
      component: () =>
        import('@/views/basic_data/agreedetail.vue')
    },
    {
      path: 'newagree',
      name: 'newagree',
      meta: {

      },
      component: () =>
        import('@/views/basic_data/newagree.vue')
    },
    {
      path: 'agreelist',
      name: 'agreelist',
      meta: {
        title: '协议管理(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/basic_data/agreelist.vue')
    },
    {
      path: 'integral_detail',
      name: 'integral_detail',
      meta: {},
      component: () =>
        import('@/views/basic_data/integral_detail.vue')
    },
    {
      path: 'vunintegral_detail',
      name: 'vunintegral_detail',
      meta: {},
      component: () =>
        import('@/views/basic_data/vunintegral_detail.vue')
    },
    {
      path: 'integral_audit',
      name: 'integral_audit',
      meta: {},
      component: () =>
        import('@/views/basic_data/integral_audit.vue')
    },
    {
      path: 'vunintegral_audit',
      name: 'vunintegral_audit',
      meta: {},
      component: () =>
        import('@/views/basic_data/vunintegral_audit.vue')
    },
    {
      path: 'integral_set',
      name: 'integral_set',
      meta: {},
      component: () =>
        import('@/views/basic_data/integral_set.vue')
    },
    {
      path: 'vunintegral_set',
      name: 'vunintegral_set',
      meta: {},
      component: () =>
        import('@/views/basic_data/vunintegral_set.vue')
    }
    ]
  },
  {
    path: '/supplies',
    name: 'supplies',
    meta: {
      title: '物资',
      icon: 'md-clipboard'
    },
    component: Main,
    children: [{
      path: 'SuppliesList',
      name: 'SuppliesList',
      meta: {
        title: '物资列表(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/supplies/SuppliesList.vue')
    },
    {
      path: 'SuppliesType',
      name: 'SuppliesType',
      meta: {},
      component: () =>
        import('@/views/supplies/SuppliesType.vue')
    }
    ]
  },
  {
    path: '/organization',
    name: 'organization',
    meta: {
      title: '组织',
      icon: 'ios-navigate'
    },
    component: Main,
    children: [{
      path: 'grouplisthy',
      name: 'grouplisthy',
      meta: {
        title: '组织列表(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/grouplisthy.vue')
    },
    {
      path: 'grouplist',
      name: 'grouplist',
      meta: {
        title: '组织列表(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/grouplist.vue')
    },
    {
      path: 'detailshy',
      name: 'detailshy',
      meta: {},
      component: () =>
        import('@/views/organization/detailshy.vue')
    },
    {
      path: 'details',
      name: 'details',
      meta: {},
      component: () =>
        import('@/views/organization/details.vue')
    },
    {
      path: 'newzuzihy',
      name: 'newzuzihy',
      meta: {},
      component: () =>
        import('@/views/organization/newzuzihy.vue')
    },
    {
      path: 'newzuzi',
      name: 'newzuzi',
      meta: {},
      component: () =>
        import('@/views/organization/newzuzi.vue')
    },
    {
      path: 'razg',
      name: 'razg',
      meta: {
        title: '融爱中国成员单位',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/razg.vue')
    },
    {
      path: 'publicInterests',
      name: 'publicInterests',
      meta: {
        title: '公益机构',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/publicInterests.vue')
    },
    {
      path: 'colleague',
      name: 'colleague',
      meta: {
        title: '同行',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/colleague.vue')
    },
    {
      path: 'government',
      name: 'government',
      meta: {
        title: '政府',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/government.vue')
    },
    {
      path: 'media',
      name: 'media',
      meta: {
        title: '媒体',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/media.vue')
    },
    {
      path: 'enterprise',
      name: 'enterprise',
      meta: {
        title: '企业',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/enterprise.vue')
    },
    {
      path: 'parentGroup',
      name: 'parentGroup',
      meta: {
        title: '家长小组',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/parentGroup.vue')
    },
    {
      path: 'editDetail',
      name: 'editDetail',
      meta: {
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/editDetail.vue')
    },
    // 团队审批
    {
      path: 'teamApproval',
      name: 'teamApproval',
      meta: {
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/teamApproval.vue')
    },
    {
      path: 'volunteerGroup',
      name: 'volunteerGroup',
      meta: {
        title: '志愿者团队',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/organization/volunteerGroup.vue')
    }
    ]
  },
  {
    path: '/recommend',
    name: 'recommend',
    meta: {
      title: '推荐',
      icon: 'ios-send'
    },
    component: Main,
    children: [{
      path: 'popularity',
      name: 'popularity',
      meta: {
        title: '人气推荐(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/recommend/popularity.vue')
    },
    {
      path: 'vunpopularity',
      name: 'vunpopularity',
      meta: {
        title: '人气推荐(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/recommend/vunpopularity.vue')
    },
    {
      path: 'vp_adlist',
      name: 'vp_adlist',
      meta: {
        title: '广告列表（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/recommend/vp_adlist.vue')
    },
    {
      path: 'vun_adlist',
      name: 'vun_adlist',
      meta: {
        title: '广告列表（志愿者）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/recommend/vun_adlist.vue')
    },
    {
      path: 'vp_add',
      name: 'vp_add',
      meta: {},
      component: () =>
        import('@/views/recommend/vp_add.vue')
    },
    {
      path: 'vun_add',
      name: 'vun_add',
      meta: {},
      component: () =>
        import('@/views/recommend/vun_add.vue')
    }
    ]
  },
  {
    path: '/fields',
    name: 'fields',
    meta: {},
    component: Main,
    children: [{
      path: 'OrganizationFields_hy',
      name: 'OrganizationFields_hy',
      meta: {},
      component: () =>
        import('@/views/fields/OrganizationFields_hy.vue')
    },
    {
      path: 'UserFields_hy',
      name: 'UserFields_hy',
      meta: {},
      component: () =>
        import('@/views/fields/UserFields_hy.vue')
    },
    {
      path: 'OrganizationFields_zyz',
      name: 'OrganizationFields_zyz',
      meta: {},
      component: () =>
        import('@/views/fields/OrganizationFields_zyz.vue')
    },
    {
      path: 'UserFields_zyz',
      name: 'UserFields_zyz',
      meta: {},
      component: () =>
        import('@/views/fields/UserFields_zyz.vue')
    }
    ]
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '用户',
      icon: 'ios-contact'
    },
    component: Main,
    children: [{
      path: 'all_member_hy',
      name: 'all_member_hy',
      meta: {
        title: '用户列表(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/user/all_member_hy.vue')
    },
    {
      path: 'TagList_hy',
      name: 'TagList_hy',
      meta: {},
      component: () =>
        import('@/views/user/TagList_hy.vue')
    },
    {
      path: 'all_member_zyz',
      name: 'all_member_zyz',
      meta: {
        title: '用户列表(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/user/all_member_zyz.vue')
    },
    {
      path: 'TagList_zyz',
      name: 'TagList_zyz',
      meta: {},
      component: () =>
        import('@/views/user/TagList_zyz.vue')
    },
    {
      path: 'user_details_hy',
      name: 'user_details_hy',
      meta: {},
      component: () =>
        import('@/views/user/user_details_hy.vue')
    },
    {
      path: 'Edit_data_hy',
      name: 'Edit_data_hy',
      meta: {},
      component: () =>
        import('@/views/user/Edit_data_hy.vue')
    },
    {
      path: 'Login_hy',
      name: 'Login_hy',
      meta: {},
      component: () =>
        import('@/views/user/Login_hy.vue')
    },
    {
      path: 'user_details_zyz',
      name: 'user_details_zyz',
      meta: {},
      component: () =>
        import('@/views/user/user_details_zyz.vue')
    },
    {
      path: 'Edit_data_zyz',
      name: 'Edit_data_zyz',
      meta: {},
      component: () =>
        import('@/views/user/Edit_data_zyz.vue')
    },
    {
      path: 'Login_zyz',
      name: 'Login_zyz',
      meta: {},
      component: () =>
        import('@/views/user/Login_zyz.vue')
    },
    {
      path: 'labelList',
      name: 'labelList',
      meta: {},
      component: () =>
        import('@/views/user/labelList.vue')
    },
    {
      path: 'levelSetting',
      name: 'levelSetting',
      meta: {},
      component: () =>
        import('@/views/user/levelSetting.vue')
    },
    {
      path: 'Level_set/Beneficiary_level_setting',
      name: 'Beneficiary_level_setting',
      meta: {},
      component: () =>
        import('@/views/user/Level_set/Beneficiary_level_setting.vue')
    },
    {
      path: 'Level_set/Add_benefit_type',
      name: 'Add_benefit_type',
      meta: {},
      component: () =>
        import('@/views/user/Level_set/Add_benefit_type.vue')
    },
    {
      path: 'Level_set/Volunteer_level_setting',
      name: 'Volunteer_level_setting',
      meta: {},
      component: () =>
        import('@/views/user/Level_set/Volunteer_level_setting.vue')
    },
    {
      path: 'Level_set/Add_volunteer_type',
      name: 'Add_volunteer_type',
      meta: {},
      component: () =>
        import('@/views/user/Level_set/Add_volunteer_type.vue')
    },
    {
      path: 'vp_time',
      name: 'vp_time',
      meta: {
        title: 'VIP时间审核（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/user/vp_time.vue')
    },
    {
      path: 'volunteers',
      name: 'volunteers',
      meta: {
        title: '志愿者(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/user/volunteers.vue')
    },
    {
      path: 'beneficiary',
      name: 'beneficiary',
      meta: {
        title: '受益方(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/user/beneficiary.vue')
    },
    {
      path: 'member_hy',
      name: 'member_hy',
      meta: {},
      component: () =>
        import('@/views/user/member_hy.vue')
    },
    {
      path: 'spread',
      name: 'spread',
      meta: {
        title: '传播(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/user/spread.vue')
    },
    {
      path: 'user_government',
      name: 'user_government',
      meta: {
        title: '政府(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/user/government.vue')
    },
    {
      path: 'user_enterprise',
      name: 'user_enterprise',
      meta: {
        title: '企业(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/user/enterprise.vue')
    },
    {
      path: 'user_peer',
      name: 'user_peer',
      meta: {
        title: '同行(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/user/user_peer.vue')
    },
    {
      path: 'sponsor',
      name: 'sponsor',
      meta: {
        title: '赞助方(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/user/sponsor.vue')
    },
    {
      path: 'members',
      name: 'members',
      meta: {
        title: '融合中国成员单位（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/user/members.vue')
    }
    ]
  },
  // 官方活动
  {
    path: '/activity',
    name: 'activity',
    meta: {
      title: '官方活动',
      icon: 'ios-browsers'
    },
    component: Main,
    children: [{
      path: 'feedDetail',
      name: 'feedDetail',
      meta: {},
      component: () =>
        import('@/views/activity/feedDetail.vue')
    }, {
      path: 'profile',
      name: 'profile',
      meta: {},
      component: () =>
        import('@/views/activity/profile.vue')
    },
    {
      path: 'editing',
      name: 'editing',
      meta: {},
      component: () =>
        import('@/views/activity/editing.vue')
    },
    {
      path: 'manager',
      name: 'manager',
      meta: {
        title: '活动管理',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity/manager.vue')
    },
    {
      path: 'invitation',
      name: 'invitation',
      meta: {},
      component: () =>
        import('@/views/activity/invitation.vue')
    },
    {
      path: 'list',
      name: 'list',
      meta: {
        title: '活动参与列表',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity/list.vue')
    },
    // 活动立项
    {
      path: 'approval',
      name: 'approval',
      meta: {
        title: '活动立项',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity/approval/approval.vue')
    },
    // 常用报名管理
    {
      path: 'registration',
      name: 'registration',
      meta: {},
      component: () =>
        import('@/views/activity/registration.vue')
    },
    // 编辑招募报名项-志愿者
    {
      path: 'compile_volunteer',
      name: 'compile_volunteer',
      meta: {},
      component: () =>
        import('@/views/activity/compile_volunteer')
    },
    // 编辑招募报名项-受益方（会员）
    {
      path: 'compile_beneficiary',
      name: 'compile_beneficiary',
      meta: {},
      component: () =>
        import('@/views/activity/compile_beneficiary')
    },
    {
      path: 'project_approval',
      name: 'project_approval',
      meta: {
        title: '活动立项管理',
      },
      component: () =>
        import('@/views/activity/project_approval.vue')
    },
    // 活动立项明细
    {
      path: 'approval_details',
      name: 'approval_details',
      meta: {},
      component: () =>
        import('@/views/activity/approval_details.vue')
    },
    {
      path: 'draft',
      name: 'draft',
      meta: {},
      component: () =>
        import('@/views/activity/draft.vue')
    },
    {
      path: 'volunteer_draft',
      name: 'volunteer_draft',
      meta: {},
      component: () =>
        import('@/views/activity/volunteer_draft.vue')
    },
    {
      path: 'pending',
      name: 'pending',
      meta: {},
      component: () =>
        import('@/views/activity/pending.vue')
    },
    {
      path: 'summarize',
      name: 'summarize',
      meta: {},
      component: () =>
        import('@/views/activity/summarize.vue')
    },
    {
      path: 'personnel_details',
      name: 'personnel_details',
      meta: {},
      component: () =>
        import('@/views/activity/personnel_details.vue')
    },
    {
      path: 'rule',
      name: 'rule',
      meta: {
        title: '活动规则池',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity/rule.vue')
    },
    {
      path: 'prend/prend',
      name: 'prend',
      meta: {},
      component: () =>
        import('@/views/activity/prend/prend.vue')
    },
    {
      path: 'prend/back',
      name: 'back',
      meta: {},
      component: () =>
        import('@/views/activity/prend/back.vue')
    },
    {
      path: 'prend/actrain',
      name: 'actrain',
      meta: {},
      component: () =>
        import('@/views/activity/prend/actrain.vue')
    },
    {
      path: 'prend/acdonation',
      name: 'acdonation',
      meta: {},
      component: () =>
        import('@/views/activity/prend/acdonation.vue')
    },
    {
      path: 'template',
      name: 'template',
      meta: {
        title: '维护活动模板',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity/MaintainTemplate/template.vue')
    },
    {
      path: 'MaintainTemplate/donation',
      name: 'donation',
      meta: {
        title: '维护捐赠模板',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity/MaintainTemplate/donation.vue')
    },
    {
      path: 'feedback',
      name: 'feedback',
      meta: {
        title: '维护反馈模板',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity/MaintainTemplate/feedback.vue')
    },
    {
      path: 'train',
      name: 'train',
      meta: {
        title: '维护培训模板',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity/MaintainTemplate/train.vue')
    },
    {
      path: 'maintaintemplate',
      name: 'maintaintemplate',
      meta: {
        title: '维护活动融融固定项',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity/MaintainTemplate/maintaintemplate.vue')
    },
    {
      path: 'rule_text',
      name: 'rule_text',
      meta: {

      },
      component: () =>
        import('@/views/activity/rule_text.vue')
    },
    {
      path: 'volunteer_apply',
      name: 'volunteer_apply',
      meta: {},
      component: () =>
        import('@/views/activity/volunteer_apply.vue')
    },
    {
      path: 'activity_share',
      name: 'activity_share',
      meta: {},
      component: () =>
        import('@/views/activity/activity_share.vue')
    }
    ]
  },
  {
    path: '/activity_vun',
    name: 'activity_vun',
    meta: {
      title: '非官方活动',
      icon: 'ios-browsers-outline'
    },
    component: Main,
    children: [{
      path: 'volunteer_activity',
      name: 'volunteer_activity',
      meta: {
        title: '活动管理',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity_vun/volunteer_activity.vue')
    },
    {
      path: 'volunteer_pending',
      name: 'volunteer_pending',
      meta: {},
      component: () =>
        import('@/views/activity_vun/volunteer_pending.vue')
    },
    {
      path: 'volunteer_general',
      name: 'volunteer_general',
      meta: {},
      component: () =>
        import('@/views/activity_vun/volunteer_general.vue')
    },
    {
      path: 'activity_share',
      name: 'activity_share',
      meta: {},
      component: () =>
        import('@/views/activity_vun/activity_share.vue')
    },
    {
      path: 'volunteer_issue',
      name: 'volunteer_issue',
      meta: {
        title: '活动发布',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity_vun/volunteer_issue.vue')
    },
    {
      path: 'volunteer_compile',
      name: 'volunteer_compile',
      meta: {},
      component: () =>
        import('@/views/activity_vun/volunteer_compile.vue')
    },
    {
      path: 'volunteer_rule',
      name: 'volunteer_rule',
      meta: {
        title: '活动规则池',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/activity_vun/volunteer_rule.vue')
    },
    {
      path: "volunteer-draft",
      name: 'volunteer-draft',
      component: () =>
        import('@/views/activity_vun/volunteer-draft.vue')
    }
    ]
  },
  {
    path: 'ImageLibraryManagement',
    name: 'ImageLibraryManagement',
    meta: {
      title: '图片库管理',
      icon: 'ios-navigate'
    },
    component: Main,
    children: [{
      path: '/image_hy',
      name: 'image_hy',
      meta: {
        title: '图片库管理(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/ImageLibraryManagement/image_hy.vue')
    },
    {
      path: '/image_zyz',
      name: 'image_zyz',
      meta: {
        title: '图片库管理(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/ImageLibraryManagement/image_zyz.vue')
    },
    {
      path: '/Photo_hy',
      name: 'Photo_hy',
      meta: {},
      component: () =>
        import('@/views/ImageLibraryManagement/Photo_hy.vue')
    },
    {
      path: '/Photo_zyz',
      name: 'Photo_zyz',
      meta: {},
      component: () =>
        import('@/views/ImageLibraryManagement/Photo_zyz.vue')
    },
    {
      path: '/NowPhoto_hy',
      name: 'NowPhoto_hy',
      meta: {},
      component: () =>
        import('@/views/ImageLibraryManagement/NowPhoto_hy.vue')
    },
    {
      path: '/NowPhoto_zyz',
      name: 'NowPhoto_zyz',
      meta: {},
      component: () =>
        import('@/views/ImageLibraryManagement/NowPhoto_zyz.vue')
    }
    ]
  },
  {
    path: '/operate',
    name: 'operate',
    alias: '/',
    meta: {
      title: '运营',
      icon: 'ios-egg'
    },
    component: Main,
    children: [{
      path: 'vp_screen',
      name: 'vp_screen',
      meta: {},
      component: () =>
        import('@/views/operate/vp_screen.vue')
    },
    {
      path: 'vun_screen',
      name: 'vun_screen',
      meta: {},
      component: () =>
        import('@/views/operate/vun_screen.vue')
    },
    {
      path: 'vp_message',
      name: 'vp_message',
      meta: {
        title: '短信消息（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/operate/vp_message.vue')
    },
    {
      path: 'vun_message',
      name: 'vun_message',
      meta: {
        title: '短信消息（志愿者）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/operate/vun_message.vue')
    },
    {
      path: 'vp_site',
      name: 'vp_site',
      meta: {
        title: '站内信消息（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/operate/vp_site.vue')
    },
    {
      path: 'vun_site',
      name: 'vun_site',
      meta: {
        title: '站内信消息（志愿者）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/operate/vun_site.vue')
    },
    // {
    //   path: 'vun_wechat',
    //   name: 'vun_wechat',
    //   meta: {
    //     title: '微信消息（志愿者）',
    //     icon: 'ios-navigate'
    //   },
    //   component: () =>
    //     import('@/views/operate/vun_wechat.vue')
    // },
    // {
    //   path: 'vp_wechat',
    //   name: 'vp_wechat',
    //   meta: {
    //     title: '微信消息（会员）',
    //     icon: 'ios-navigate'
    //   },
    //   component: () =>
    //     import('@/views/operate/vp_wechat.vue')
    // },
    {
      path: 'vp_invite',
      name: 'vp_invite',
      meta: {
        title: '邀请好友查询（会员）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/operate/vp_invite.vue')
    },
    {
      path: 'vun_invite',
      name: 'vun_invite',
      meta: {
        title: '邀请好友查询（志愿者）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/operate/vun_invite.vue')
    },
    {
      path: 'vp_detail',
      name: 'vp_detail',
      meta: {},
      component: () =>
        import('@/views/operate/vp_detail.vue')
    },
    {
      path: 'vun_detail',
      name: 'vun_detail',
      meta: {},
      component: () =>
        import('@/views/operate/vun_detail.vue')
    }
    ]
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    alias: '/',
    meta: {
      title: '订单',
      icon: 'md-list'
    },
    component: Main,
    children: [{
      path: 'order',
      name: 'order',
      meta: {
        title: '订单列表(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/orderlist/order.vue')
    },
    {
      path: 'order_pend',
      name: 'order_pend',
      meta: {

      },
      component: () =>
        import('@/views/orderlist/order_pend.vue')
    },
    {
      path: 'order_batch',
      name: 'order_batch',
      meta: {},
      component: () =>
        import('@/views/orderlist/order_batch.vue')
    },
    {
      path: 'order_ship',
      name: 'order_ship',
      meta: {},
      component: () =>
        import('@/views/orderlist/order_ship.vue')
    },
    {
      path: 'order_shiped',
      name: 'order_shiped',
      meta: {

      },
      component: () =>
        import('@/views/orderlist/order_shiped.vue')
    },
    {
      path: 'order_close',
      name: 'order_close',
      meta: {

      },
      component: () =>
        import('@/views/orderlist/order_close.vue')
    },
    {
      path: 'order_cancle',
      name: 'order_cancle',
      meta: {},
      component: () =>
        import('@/views/orderlist/order_cancle.vue')
    }
    ]
  },
  {
    path: '/content',
    name: 'content',
    alias: '/',
    meta: {
      title: '内容',
      icon: 'ios-list-box'
    },
    component: Main,
    children: [{
      path: 'vp_question',
      name: 'vp_question',
      meta: {
        title: '问卷调查(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/content/vp_question.vue')
    },
    {
      path: 'vun_question',
      name: 'vun_question',
      meta: {
        title: '问卷调查(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/content/vun_question.vue')
    },
    {
      path: 'vp_object',
      name: 'vp_object',
      meta: {},
      component: () =>
        import('@/views/content/vp_object.vue')
    },
    {
      path: 'vun_object',
      name: 'vun_object',
      meta: {},
      component: () =>
        import('@/views/content/vun_object.vue')
    },
    {
      path: 'vp_edquestion',
      name: 'vp_edquestion',
      meta: {},
      component: () =>
        import('@/views/content/vp_edquestion.vue')
    },
    {
      path: 'vun_edquestion',
      name: 'vun_edquestion',
      meta: {

      },
      component: () =>
        import('@/views/content/vun_edquestion.vue')
    },
    {
      path: 'vp_qdetail',
      name: 'vp_qdetail',
      meta: {},
      component: () =>
        import('@/views/content/vp_qdetail.vue')
    },
    {
      path: 'vun_qdetail',
      name: 'vun_qdetail',
      meta: {},
      component: () =>
        import('@/views/content/vun_qdetail.vue')
    },
    {
      path: 'vp_new',
      name: 'vp_new',
      meta: {},
      component: () =>
        import('@/views/content/vp_new.vue')
    },
    {
      path: 'vun_new',
      name: 'vun_new',
      meta: {},
      component: () =>
        import('@/views/content/vun_new.vue')
    },
    {
      path: 'InformationList_hy',
      name: 'InformationList_hy',
      meta: {
        title: '资讯管理(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/content/InformationManagement/InformationList_hy.vue')
    },
    {
      path: 'InformationList_zyz',
      name: 'InformationList_zyz',
      meta: {
        title: '资讯管理(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/content/InformationManagement/InformationList_zyz.vue')
    },
    {
      path: 'NewInformation_hy',
      name: 'NewInformation_hy',
      meta: {},
      component: () =>
        import('@/views/content/InformationManagement/NewInformation_hy.vue')
    },
    {
      path: 'NewInformation_zyz',
      name: 'NewInformation_zyz',
      meta: {},
      component: () =>
        import('@/views/content/InformationManagement/NewInformation_zyz.vue')
    },
    {
      path: 'InformationDetails_hy',
      name: 'InformationDetails_hy',
      meta: {},
      component: () =>
        import('@/views/content/InformationManagement/InformationDetails_hy.vue')
    },
    {
      path: 'InformationDetails_zyz',
      name: 'InformationDetails_zyz',
      meta: {},
      component: () =>
        import('@/views/content/InformationManagement/InformationDetails_zyz.vue')
    },
    {
      path: 'ExcellentVolunteer',
      name: 'ExcellentVolunteer',
      meta: {},
      component: () =>
        import('@/views/content/InformationManagement/ExcellentVolunteer.vue')
    },
    {
      path: 'InformationClassification_hy',
      name: 'InformationClassification_hy',
      meta: {},
      component: () =>
        import('@/views/content/InformationManagement/InformationClassification_hy.vue')
    },
    {
      path: 'InformationClassification_zyz',
      name: 'InformationClassification_zyz',
      meta: {},
      component: () =>
        import('@/views/content/InformationManagement/InformationClassification_zyz.vue')
    },
    {
      path: 'ReportList_hy',
      name: 'ReportList_hy',
      meta: {
        title: '举报列表(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/content/ReportManagement/ReportList_hy.vue')
    },
    {
      path: 'ReportList_zyz',
      name: 'ReportList_zyz',
      meta: {
        title: '举报列表(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/content/ReportManagement/ReportList_zyz.vue')
    },
    {
      path: 'ReportDetails-Not_hy',
      name: 'ReportDetails-Not_hy',
      meta: {},
      component: () =>
        import('@/views/content/ReportManagement/ReportDetails-Not_hy.vue')
    },
    {
      path: 'ReportDetails-Not_zyz',
      name: 'ReportDetails-Not_zyz',
      meta: {},
      component: () =>
        import('@/views/content/ReportManagement/ReportDetails-Not_zyz.vue')
    },
    {
      path: 'ReportDetails-Handled_hy',
      name: 'ReportDetails-Handled_hy',
      meta: {},
      component: () =>
        import('@/views/content/ReportManagement/ReportDetails-Handled_hy.vue')
    },
    {
      path: 'ReportDetails-Handled_zyz',
      name: 'ReportDetails-Handled_zyz',
      meta: {},
      component: () =>
        import('@/views/content/ReportManagement/ReportDetails-Handled_zyz.vue')
    },
    {
      path: 'FeedbackList_hy',
      name: 'FeedbackList_hy',
      meta: {
        title: '意见反馈列表(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/content/FeedbackManagement/FeedbackList_hy.vue')
    },
    {
      path: 'FeedbackList_zyz',
      name: 'FeedbackList_zyz',
      meta: {
        title: '意见反馈列表(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/content/FeedbackManagement/FeedbackList_zyz.vue')
    },
    {
      path: 'FeedbackManagement/FeedbackDetails-Note_hy',
      name: 'FeedbackDetails-Note_hy',
      meta: {},
      component: () =>
        import('@/views/content/FeedbackManagement/FeedbackDetails-Note_hy.vue')
    },
    {
      path: 'FeedbackManagement/FeedbackDetails-Note_zyz',
      name: 'FeedbackDetails-Note_zyz',
      meta: {},
      component: () =>
        import('@/views/content/FeedbackManagement/FeedbackDetails-Note_zyz.vue')
    },
    {
      path: 'FeedbackManagement/FeedbackDetails-Handled_hy',
      name: 'FeedbackDetails-Handled_hy',
      meta: {},
      component: () =>
        import('@/views/content/FeedbackManagement/FeedbackDetails-Handled_hy.vue')
    },
    {
      path: 'FeedbackManagement/FeedbackDetails-Handled_zyz',
      name: 'FeedbackDetails-Handled_zyz',
      meta: {},
      component: () =>
        import('@/views/content/FeedbackManagement/FeedbackDetails-Handled_zyz.vue')
    },
    {
      path: 'ActivityFeedbackList_hy',
      name: 'ActivityFeedbackList_hy',
      meta: {
        title: '活动反馈列表(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/content/ActivityFeedbackManagement/ActivityFeedbackList_hy.vue')
    },
    {
      path: 'ActivityFeedbackList_zyz',
      name: 'ActivityFeedbackList_zyz',
      meta: {
        title: '活动反馈列表(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/content/ActivityFeedbackManagement/ActivityFeedbackList_zyz.vue')
    },
    {
      path: 'ActivityFeedback',
      name: 'ActivityFeedback',
      meta: {},
      component: () =>
        import('@/views/content/ActivityFeedbackManagement/ActivityFeedback.vue')
    },
    {
      path: 'ActivityFeedbackDetails_hy',
      name: 'ActivityFeedbackDetails_hy',
      meta: {},
      component: () =>
        import('@/views/content/ActivityFeedbackManagement/ActivityFeedbackDetails_hy.vue')
    },
    {
      path: 'ActivityFeedbackDetails_zyz',
      name: 'ActivityFeedbackDetails_zyz',
      meta: {},
      component: () =>
        import('@/views/content/ActivityFeedbackManagement/ActivityFeedbackDetails_zyz.vue')
    }
    ]
  },
  {
    path: 'financial',
    name: 'financial',
    meta: {
      title: '财务',
      icon: 'logo-usd'
    },
    component: Main,
    children: [{
      path: 'ExpenseReports',
      name: 'ExpenseReports',
      meta: {
        title: '费用报表(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/financial/ExpenseReports.vue')
    }]
  },
  {
    path: '/setup',
    name: 'setup',
    alias: '/',
    meta: {
      title: '设置',
      icon: 'ios-build'
    },
    component: Main,
    children: [{
      path: 'platform',
      name: 'platform',
      meta: {
        title: '平台信息(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/platform.vue')
    },
    {
      path: 'vp_policy',
      name: 'vp_policy',
      meta: {
        title: '政策维护(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/vp_policy.vue')
    },
    {
      path: 'vun_policy',
      name: 'vun_policy',
      meta: {
        title: '政策维护(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/vun_policy.vue')
    },
    {
      path: 'vp_messages',
      name: 'vp_messages',
      meta: {
        title: '消息提醒(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/vp_messages.vue')
    },
    {
      path: 'vun_messages',
      name: 'vun_messages',
      meta: {
        title: '消息提醒(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/vun_messages.vue')
    },
    {
      path: 'mailVolunteer',
      name: 'mailVolunteer',
      meta: {
        title: '站内信消息提醒(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/mailVolunteer.vue')
    },
    {
      path: 'mailMember',
      name: 'mailMember',
      meta: {
        title: '站内信消息提醒(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/mailMember.vue')
    },
    {
      path: 'WeChatVolunteer',
      name: 'WeChatVolunteer',
      meta: {
        title: '微信消息提醒(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/WeChatVolunteer.vue')
    },
    {
      path: 'WeChatMember',
      name: 'WeChatMember',
      meta: {
        title: '微信消息提醒(志愿者)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/WeChatMember.vue')
    },
    {
      path: 'vp_editsite',
      name: 'vp_editsite',
      meta: {},
      component: () =>
        import('@/views/setup/vp_editsite.vue')
    },
    {
      path: 'vun_editsite',
      name: 'vun_editsite',
      meta: {},
      component: () =>
        import('@/views/setup/vun_editsite.vue')
    },
    {
      path: 'vp_editphone',
      name: 'vp_editphone',
      meta: {},
      component: () =>
        import('@/views/setup/vp_editphone.vue')
    },
    {
      path: 'vun_editphone',
      name: 'vun_editphone',
      meta: {},
      component: () =>
        import('@/views/setup/vun_editphone.vue')
    },
    {
      path: 'vp_editwechat',
      name: 'vp_editwechat',
      meta: {},
      component: () =>
        import('@/views/setup/vp_editwechat.vue')
    },
    {
      path: 'vun_editwechat',
      name: 'vun_editwechat',
      meta: {},
      component: () =>
        import('@/views/setup/vun_editwechat.vue')
    },
    {
      path: 'verification',
      name: 'verification',
      meta: {
        title: '验证码设置(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/verification.vue')
    },
    {
      path: 'logistics',
      name: 'logistics',
      meta: {
        title: '物流公司(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/logistics.vue')
    },
    {
      path: 'area',
      name: 'area',
      meta: {
        title: '区域设置(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/setup/area.vue')
    }
    ]
  },
  {
    path: '/shop',
    name: 'shop',
    alias: '/',
    meta: {
      title: '商品',
      icon: 'ios-briefcase'
    },
    component: Main,
    children: [{
      path: 'shopout',
      name: 'shopout',
      meta: {
        title: '商品库存（共用）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/shop/shopout.vue')
    },
    {
      path: 'shoplist',
      name: 'shoplist',
      meta: {
        title: '商品列表(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/shop/shoplist.vue')
    },
    {
      path: 'shopjournal',
      name: 'shopjournal',
      meta: {},
      component: () =>
        import('@/views/shop/shopjournal.vue')
    },
    {
      path: 'addshop',
      name: 'addshop',
      meta: {},
      component: () =>
        import('@/views/shop/addshop.vue')
    },
    {
      path: 'modifyprice',
      name: 'modifyprice',
      meta: {
        title: '商品批量修改（共用）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/shop/modifyprice.vue')
    },
    {
      path: 'automatic',
      name: 'automatic',
      meta: {},
      component: () =>
        import('@/views/shop/automatic.vue')
    },
    {
      path: 'shopclass',
      name: 'shopclass',
      meta: {
        title: '商品分类（共用）',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/shop/shopclass.vue')
    },
    {
      path: 'addcategory',
      name: 'addcategory',
      meta: {},
      component: () =>
        import('@/views/shop/addcategory.vue')
    }
    ]
  },
  {
    path: '/statistical',
    name: 'statistical',
    meta: {
      title: '统计',
      icon: 'ios-stats'
    },
    component: Main,
    children: [{
      path: 'Project-statistics',
      name: 'Project-statistics',
      meta: {
        title: '项目活动统计(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/statistical/Project-statistics.vue')
    },
    {
      path: 'Parent-activity',
      name: 'Parent-activity',
      meta: {
        title: '家长小组活动统计(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/statistical/Parent-activity.vue')
    },
    {
      path: 'Benefit-child',
      name: 'Benefit-child',
      meta: {
        title: '受益孩子统计(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/statistical/Benefit-child.vue')
    },
    {
      path: '/Benefit-parents',
      name: 'Benefit-parents',
      meta: {
        title: '受益家长统计(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/statistical/Benefit-parents.vue')
    },
    {
      path: 'Activities-spread',
      name: 'Activities-spread',
      meta: {
        title: '活动传播统计(会员)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/statistical/Activities-spread.vue')
    },
    {
      path: 'Volunteer-team',
      name: 'Volunteer-team',
      meta: {
        title: '志愿者服务统计(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/statistical/Volunteer-team.vue')
    }
    ]
  }, {
    path: '/permissions',
    name: 'permissions',
    meta: {
      title: '权限',
      icon: 'ios-lock'
    },
    component: Main,
    children: [{
      path: 'departmentMGT',
      name: 'departmentMGT',
      meta: {
        title: '部门管理(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/permissions/departmentMGT.vue')
    },
    {
      path: 'membersMGT',
      name: 'membersMGT',
      meta: {
        title: '成员管理(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/permissions/membersMGT.vue')
    },
    {
      path: 'role',
      name: 'role',
      meta: {
        title: '角色管理(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/permissions/role.vue')
    },
    {
      path: 'examinationMGT',
      name: 'examinationMGT',
      meta: {
        title: '审批管理(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/permissions/examinationMGT.vue')
    },
    {
      path: 'operationLogMGT',
      name: 'operationLogMGT',
      meta: {
        title: '操作日志(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/permissions/operationLogMGT.vue')
    },
    {
      path: 'Add-members',
      name: 'Add-members',
      meta: {
        // title: '添加成员(共用',
      },
      component: () =>
        import('@/views/permissions/Add-members.vue')
    },
    {
      path: 'Permissions-SetUp',
      name: 'Permissions-SetUp',
      meta: {
        // title: '权限设置(共用)',
      },
      component: () =>
        import('@/views/permissions/Permissions-SetUp.vue')
    },
    {
      path: 'Add-approval',
      name: 'Add-approval',
      meta: {
        // title: '设置审批流程(共用)',
      },
      component: () =>
        import('@/views/permissions/Add-approval.vue')
    },
    {
      path: 'function',
      name: 'function',
      meta: {
        // title: '功能权限设置(共用)',
      },
      component: () =>
        import('@/views/permissions/function.vue')
    },
    {
      path: 'DatabaseManagement',
      name: 'DatabaseManagement',
      meta: {
        title: '数据库管理(共用)',
        icon: 'ios-navigate'
      },
      component: () =>
        import('@/views/permissions/DatabaseManagement.vue')
    }
    ]
  }
  ]
})




export default router
