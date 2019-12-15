/**
 * api接口统一管理
 */
import { get, post, posts, postdel } from './http'



//登陆
export const login = p => get('/backstage/backstageLojin', p) // 登陆

// /backstage/out
export const loginout = p => get('/backstage/out', p) // 登出


export const homepage = p => get('/sysMenu/findAllMenuByRoloe', p) // 主页



//首页
export const Homeactivity = p => get('/home/activity-count', p) // 首页-活动计数

export const Homeactpend = p => get('/home/undeal-transaction', p) //首页--待处理事务

export const Homeactwhole = p => get('/home/overview', p) // 首页--活动总览

export const Setup = p => posts('/user-list/update-account', p) // 首页--用户设置



// 内容模块
export const AddressList = p => get('/information-manage/get-information-page', p) // 质询列表

export const AddressType = p => get('/information-manage/get-information-type-list', p) // 质询类型

export const AddressDel = p => get('/information-manage/batch-opr-information', p) // 删除资讯

export const AddressDetails = p => get('/information-manage/get-information-detail', p) // 获取资讯详情

export const inquirytype = p => posts('/information-manage/getInformationList', p) // 资讯分类管理

export const inquirybatch = p => posts('/information-manage/informationIsShow', p) // 资讯分类启用

export const inquirydel = p => posts('/information-manage/deleteInformation', p) // 资讯分类管理删除

export const inquiryedit = p => posts('/information-manage/updateInformation', p) // 资讯分类管理编辑

export const inquiryadd = p => posts('/information-manage/addNewInformation', p) // 资讯分类管理添加

export const inquiryRelext = p => get('/information-manage/get-show-location-list', p) // 发布资讯-展示

export const inquiryReltype = p => get('/information-manage/getInforList', p) // 发布资讯-类型

export const inquiryRel = p => posts('/information-manage/createInformation', p) // 发布资讯


// 推荐模块

export const AdvertisingList = p => get('/adv-content/get-adcontent-location-list', p) // 广告管理--获取广告位值列表

export const AdvertisingDetails = p => get('/adv-content/get-adv-content', p) // 广告管理--获取广告详情

export const AdvertisingBatch = p => post('/adv-content/batch-opr-adv-content', p) // 广告管理--批量操作广告

export const AdvertisingPage = p => get('/adv-content/adv-content-page', p) // 广告管理--获取广告分页

export const AddAdvertising = p => posts('/adv-content/add-ad-content', p) //广告管理--添加广告

export const AdvertisingRoof = p => posts('/adv-content/changFirst', p) // 广告管理--广告置顶


export const Popularitylist = p => posts('/activity-manage/top/list', p)  //人气推荐

export const PopularityChoice = p => posts('/activity-manage/choose-act/list', p)  //人气推荐选择活动

export const Popoperation = p => posts('/activity-manage/top/choose', p)  //人气推荐选择活动操作

export const PopRoof = p => posts('/activity-manage/sort/change', p)  //人气推荐操作

export const Popdelete = p => posts('/activity-manage/top/delete', p)  //人气推荐删除


//官方活动
export const activeManager = p => get('/activity-manage/get-activity-page', p) //活动管理

export const activeAddManager = p => get('/activity-manage/get-activity-join-page', p) //活动管理--活动参与列表-用户活动参与列表分页

export const activecancel = p => posts('/activity-manage/work/act/cancel', p) //活动管理-活动取消

export const activeclose = p => posts('/activity-manage/work/act/close', p) //活动管理-活动关闭

export const activeset = p => posts('/activity-manage/has/act/mould/set', p) //活动管理-设置模板

export const activedown = p => posts('/activity-manage/work/act/down', p) //活动管理-活动下架

export const activesum = p => posts('/activity-manage/work/act/sum', p) //活动总结-活动总结



export const pendingBatchList = p => get('/activity-undeal/get-activity-batch-list', p) //获取活动批次列表

export const pendingSignList = p => get('/activity-undeal/get-signup-status-list', p) //获取报名状态列表

export const pendingTransfer = p => get('/activity-undeal/get-transfer-status-List', p) //获取获取转移状态列表

export const pendingEnrollList = p => get('/activity-undeal/get-signup-page', p) //活动待处理 获取报名列表

export const pendingTransferList = p => get('/activity-undeal/get-transfer-user-page', p) //活动待处理 获取转移用户列表

export const pendingUnclaimedList = p => get('/activity-undeal/get-unreceive-resource-page', p) //活动待处理 获取待领取物资列表

export const pendingSubsidyList = p => get('/activity-undeal/get-unreceive-subsidy-page', p) //活动待处理获取补助发放列表

export const pendingUncDel = p => post('/activity-undeal/del-activity-resource', p) //活动待处理--删除活动物资

export const pendingUncModify = p => post('/activity-undeal/modify-activity-resource', p) //活动待处理--修改活动物资信息

export const pendingUncOperation = p => post('/activity-undeal/batch-upate-signup-status', p) //活动待处理--批量操作用户报名状态

export const pendingSubsidy = p => post('/activity-undeal/grant-subsidy', p) //活动待处理--发放补助

export const pendingApp = p => post('/activity-review/batch-review', p) //活动立项审批--批量审批

export const approvalpage = p => get('/activity-review/get-activity-page', p) //活动立项审批--活动立项审批分页

export const approvaldet = p => get('/activity-review/get-activity-batch-detail', p) //活动立项审批--查看活动立项详情


export const Activerule = p => post('/activity-manage/batch-opr-activity-rule', p) //活动规则池--批量操作活动规则

export const Activerulepage = p => get('/activity-manage/get-activity-rule-page', p) //活动规则池--获取活动规则分页



// 基础资料

// 家长职业类型管理（会员）
// 志愿者特长管理（共用）
// 志愿者活动分类管理（志愿者）
// 官方活动分类管理
// 障碍类型
export const Basicsearch = p => posts('/volunteer-manager/queryUserBasicData', p)  //查询
export const Basicbatch = p => postdel('/volunteer-manager/updateUserBasicData', p)  //操作


export const Agreementpage = p => get('/agreement-manage/get-agreement-page', p) //协议管理--协议分页

export const Agreementdel = p => post('/agreement-manage/del-agreement', p) //删除协议

export const Agreementadd = p => posts('/agreement-manage/updateAgreeMent', p) //添加协议

// export const Agreementadd = p => posts('/agreement-manage/add-agreement', p) //添加协议

export const AgreementList = p => get('/agreement-manage/get-agreement-type-list', p) //获取协议类型列表

export const AgreementNewList = p => get('/agreement-manage/get-act-category-list', p) //获取项目列表

export const Agreementdet = p => get('/agreement-manage/get-agreement-detail', p) //-获取协议详情

export const Agreementmodify = p => posts('/agreement-manage/update-agreement', p) //-修改协议 请求头

export const projectmanpage = p => get('/base-material/get-act-category-page', p) //基础资料--获取项目分页

export const Activitybudpage = p => get('/base-material/get-act-category-budge-page', p) //基础资料--活动预算分页

export const Agreementclasslist = p => get('/agreement-manage/agree/type/list', p) //协议管理协议分类

export const Agreementclassadd = p => posts('/agreement-manage/agree/type/set', p) //协议管理协议添加

export const Agreementclassstats = p => posts('/agreement-manage/agree/type/del', p) //协议管理协议状态

export const projectsetlist = p => posts('/volunteer-manager/queryCoActCategoryList', p) //项目管理-分页

export const projectsetadd = p => posts('/volunteer-manager/updateCoActCategory', p) //项目管理-新增

export const budgetlist = p => get('/volunteer-manager/queryOrgListForCoActCategory', p) //项目管理-预算来源

export const Costlist = p => posts('/dues/queryMemberVipManagement', p) //会费管理-预算来源

export const Costadd = p => posts('/dues/updateCoDueData', p) //会费管理-新增

export const Costdels = p => get('/dues/queryDuesDetail', p) //项目管理-详情



//智障类型
export const Retardedtype = p => posts('/base-material/dic/list', p)  //智障类型

export const Retardedadd = p => posts('/base-material/dic/add', p)  //智障类型新增修改

export const Retardeddel = p => posts('/base-material/dic/delete', p)  //智障类型删除,状态修改


//积分
export const integralmodify = p => posts('/score/add-score-history', p) //-修改积分数值

export const integralHistory = p => get('/score/get-scoreHis-page', p) //-积分明细-积分历史记录分页

export const integralDet = p => get('/score/get-score-detail', p) //-积分明细-用户积分基础信息

export const integralExa = p => get('/score/get-score-audit-page', p) //-积分审核分页

export const integralpage = p => get('/score/get-score-page', p) //-积分分页

export const integralrule = p => get('/score/get-score-rule-list', p) //-积分管理--获取积分规则列表

export const OffSubmission = p => posts('/score/rule/set', p) //-积分管理--提交

export const integralnum = p => get('/score/queryScoreRuleByTypeFlag', p) //-查询积分数值

export const integralset = p => posts('/score/updateScoreRule', p) //-设置积分数值


export const Integralaudit = p => post('/score/score-audit', p) //-积分管理--审核积分

export const Offactivities = p => get('/base-material/get-member-act-type-page', p) //-获取官方活动分页

export const modifystate = p => post('/common/update-dic-status', p) //-公共模块--修改模块状态

export const Offactivitedel = p => post('/common/del-dic', p) //-：公共模块--删除字典信息

export const Offactivitemod = p => posts('/common/modify-act-type', p) //-公共模块--修改字典信息

export const Offactiviteadd = p => posts('/common/add-act-type', p) //-公共模块--添加字典信息
//

// 财务
export const Cost = p => get('/dues/dues-page', p) //-会费分页

export const Costdel = p => get('/dues/get-dues-detail', p) //-会费详情

export const Costmodify = p => posts('/dues/update-dues', p) //-修改会费

export const CostAdd = p => posts('/dues/add-dues', p) //-添加会费

export const Costbatch = p => post('/dues/batch-opr-dues', p) //-批量操作会费

//运营
export const InvitationList = p => get('/invite-friends/get-invite-friends-page', p) //-邀请好友分页

export const InvitationDetailed = p => get('/invite-friends/get-invite-info', p) //-获取邀请人信息

export const BiInvitationList = p => get('/invite-friends/get-invited-friends-page', p) //-获取被邀请人分页


//短信消息
export const messageShort = p => posts('/smMsg/getMsgList', p) //-短信消息

export const messageremind = p => posts('/smMsg/getMsgMoudleList', p) //-消息提醒

export const messagerestats = p => posts('/smMsg/msgMouldIsOk', p) //-消息提醒--修改状态

export const WeChatmessage = p => posts('/smMsg/getWxMoulId', p) //-微信提醒

export const WeChatmessageSee = p => get('/smMsg/getSsmDetail', p) //-微信提醒-查看

export const WeChatmessagestats = p => posts('/smMsg/ssmIsOk', p) //-微信提醒-修改状态



// export const Costbatch = p => post('/invite-friends/get-invite-friends-page', p)  //-邀请好友分页


//内容

export const Labelpage = p => get('/label/get-label-page', p) //-标签管理--标签分页

export const Labeldel = p => post('/label/batch-del-label', p) //-标签管理--删除标签

export const Labeladd = p => posts('/label/add-label', p) //-标签管理--添加新标签

export const Labelmodify = p => posts('/label/update-label', p) //-修改标签

export const Labeldetails = p => get('/label/get-label-detail', p) //-标签详情

export const Reportpage = p => get('/report-manage/get-report-page', p) //-举报管理--获取举报分页

export const ReportDel = p => get('/report-manage/get-report-detail', p) //-举报管理--获取举报详情

export const Reportdelete = p => post('/report-manage/del-report', p) //举报管理--删除举报

export const ReportList = p => get('/report-manage/get-report-reason-list', p) //获取举报原因列表

export const Reporttext = p => get('/report-manage/getReportList', p) //举报管理--删除举报

//用户


export const Userpage = p => get('/user-list/get-user-page', p) //-用户列表--获取用户分页

export const Userbatch = p => post('/user-list/batch-opr-user', p) //-用户列表--批量操作用户

export const Userhistory = p => get('/user-list/get-login-his-page', p) //-用户列表--获取登录历史

export const Userfilter = p => get('/user-filter/get-user-filter-page', p) //-用户筛选--用户筛选分页

export const Userdetail = p => get('/user-list/user-detail-info', p) //-用户列表--获取用户详情

export const getLabel = p => get('/user-list/get-label', p) // 获取所有标签

export const Setsend = p => posts('/user-list/send-inner-msg', p) // 站内信接口

export const SetUserLabel = p => posts('/user-list/batch-opr-label', p) // 设置用户标签

export const getLevel = p => get('/user-list/get-level-info', p) // 获取用户等级

export const getVipPage = p => get('/user-list/get-vip-page', p) //获取 vip审核 列表

export const vipApproval = p => posts('/user-list/batch-opt-vip', p) //vip  审批 or 拒绝

export const getVipUserInfo = p => get('/user-list/get-user-info', p) //会员获取编辑资料

export const setUpdate = p => posts('/user-list/update-user-info', p) //会员设置编辑资料

export const optTime = p => posts('/user-list/opt-vip-time', p) //修改vip道到期时间


export const userListMsg = p => posts('/user-list/user/inner/msg', p) //用户列表 站内下信


export const userEnable = p => posts('/user-list/account/enable/update', p) // 用户列表的启用and禁用





//  用户列表
export const UserList = p => get('/user-list/get-user-page', p) //-用户列表--获取用户详情






//活动
export const Activitypage = p => posts('/activity-feedback/get-activity-feelback-page', p) //-活动反馈管理--获取活动反馈分页

export const Activityuserpage = p => posts('/activity-feedback/getFeedbackList', p) //-活动反馈管理--获取活动反馈用户分页

export const Activitydetail = p => get('/activity-feedback/activity-feedback-list', p) //-活动反馈管理--获取反馈详情

export const Activitybatch = p => post('/activity-feedback/batch-opr-act-feedback', p) //-活动反馈管理--批量操作反馈

export const Activitysummary = p => get('/activity-overview/get-act-overview-statistics', p) //-活动概述--统计活动概述信息

//公共模块

export const Commonpage = p => get('/common/get-dic-page', p) //-公共模块--字典分页

export const queryUserDetail = p => get('/volunteer-manager/queryUserDetail', p) //-当前账号的 头像和信息

export const Commonadd = p => post('/common/add-dic-info', p) //-公共模块--添加字典信息

export const Commonmodify = p => post('/common/modify-dic-info', p) //-公共模块--修改字典信息

export const Commonmodifystatus = p => post('/common/update-dic-status', p) //-公共模块--修改模块状态

export const Commondelete = p => post('/common/del-dic', p) //-公共模块--删除字典信息

//等级管理
export const Gradepage = p => get('/level/get-level-list', p) //-等级管理--获取等级列表

export const Grademodifydefault = p => post('/level/update-level-default', p) //-等级管理--修改默认等级

export const Grademodify = p => post('/level/update-level-default', p) //-等级管理--修改等级

export const Gradeadd = p => post('/level/add-level', p) //-等级管理--添加等级

//组织
// 家长小组
export const orgpage = p => posts('/org/get-org-Page', p) //组织管理--组织分页

export const orgpages = p => posts('/org/getHomeList', p) //组织管理-家长小组


export const orgSetStatus = p => posts('/org/updateAdminAudit', p) // 审批

export const orgSetGroup = p => posts('/org/updateHomeGroup', p) // 设置有效，and 无效

export const orgGetInfo = p => get('/org/getHomeDetail', p) // 具体家长小组详情

export const getIsConfig = p => get('/org/getIsConfig', p) // 判断当前用户下有没有审批权限

export const queryCoAuditConfig = p => get('/volunteer-manager/queryCoAuditConfig', p) // 判断当前用户下有没有审批权限

// 志愿者团队

export const queryVouluteerOrgList = p => posts('/volunteer-manager/queryVouluteerOrgList', p) //获取志愿者团队列表


export const auditCreateCoOrg = p => posts('/volunteer-manager/auditCreateCoOrg', p) //审批志愿者团队 同伙 and 拒绝

export const modifyOrgMsg = p => posts('/volunteer-manager/modifyOrgMsg', p) // 设置 无效/有效

export const queryVolunteerOrgDetail = p => get('/volunteer-manager/queryVolunteerOrgDetail', p) // 获取详情



//  审批
export const queryAuditList = p => posts('/volunteer-manager/queryAuditList', p) // 审批页面详情

export const orgbatch = p => posts('/org/delete', p) //组织管理--组织批量操作

export const orgimg = p => post('/pic/upload', p, "multipart/form-data") //组织管理-上传图片

export const orgimgdel = p => get('/pic/delete', p) //组织管理-删除图片






export const orgtype = p => get('/org/get-org-type-List', p) //组织管理--获取组织类型列表

export const orgdelete = p => post('/org/del-org-user', p) //删除组织用户

export const orgmember = p => get('/org/get-org-user-page', p) //组织成员分页

export const orgdetails = p => get('/org/get-org-detail', p) //-获取组织详情

export const orgdetestat = p => posts('/org/detail/statistics', p) //获取组织详情-统计信息

export const orgedit = p => posts('/org/detail/update/in', p) //-获取编辑组织资料

export const orgemod = p => posts('/org/detail/update', p) //-修改编辑组织资料

export const orgadd = p => posts('/org/add-org', p) //添加组织

export const orgcity = p => get('/common/province/list', p) //位置省

export const orgprovince = p => posts('/common/city/list', p) //位置市

export const orgdistrict = p => posts('/common/district/list', p) //位置市



// 权限
export const powerpage = p => get('/audit-manage/get-audit-conf-page', p) //审批管理--审批分页

export const poweradd = p => posts('/audit-manage/add-audit-process', p) //审批管理--添加审批流程

export const powermod = p => post('/audit-manage/modify-audit-status', p) //审批管理--修改审批状态

export const powertype = p => get('/audit-manage/get-audit-type-list', p) //审批管理--获取审批状态列表

export const powerPer = p => get('/audit-manage/get-audit-user-list', p) //审批管理--获取审核人员列表

export const powerApply = p => get('/audit-manage/get-apply-role-list', p) //审批管理--获取可申请角色列表


export const rolenumquery = p => posts('/sysRole/findRoleUser', p) //角色管理--多条件查询角色成员

export const rolequery = p => get('/sysRole/findAllRole', p) //角色管理--查询所有角色

export const rolenew = p => posts('/sysRole/addRole', p) //角色管理--新建角色

export const roleSetup = p => posts('/sysRole/addRoleMenuPermission', p) //角色管理--角色权限设置

export const roledel = p => post('/sysRole/delUserRole', p) //角色管理--删除

export const roleAddto = p => post('/sysRole/findOtherRoleUser', p) //角色管理--添加成员查询

export const roleAddtos = p => post('/sysRole/addRoleToUser', p) //角色管理--添加成员

export const roleedit = p => posts('/sysRole/edicRoleUser', p) //角色管理--编辑成员

//部门管理
export const departmentlist = p => get('/web/dept/findAllDept', p) //部门管理--部门列表

export const departmentsub = p => get('/web/dept/findLevelDept', p) //部门管理--查询下级部门

export const departmentStatu = p => get('/web/dept/changgeStatus', p) //部门管理--修改启用状态

export const departmentmember = p => posts('/web/dept/findDeptUser', p) //部门管理--查询部门成员

export const findDeptUserName = p => posts('/web/dept/findDeptUserName', p) // 查询过所有成员

export const departmentedit = p => posts('/web/dept/editDept', p) //部门管理--部门列表编辑

export const departmentadd = p => posts('/web/dept/addDept', p) //部门管理--部门列表添加

export const editDeptUser = p => posts('/web/dept/editDeptUser', p) //编辑成员信息、

export const departaddDeptUser = p => posts('/web/dept/addDeptUser', p) //部门管理--部门添加

export const findRoleMenu = p => get('/sysRole/findRoleMenu', p) //部门管理--部门添加

export const editfindDicName = p => get('/web/dept/editfindDicName', p) // 获取当前部门的 活动分类




export const departmentStatus = p => get('/web/dept/changgeDeptUserStatus', p) //部门管理-部门成员-修改启用状态

export const departmentSup = p => get('/web/dept/findUpDeptName', p) //部门管理--查询所有上级部门名称

export const departmentall = p => get('/web/dept/findAllDeptName', p) //部门管理--查询所有部门名称

export const departtype = p => get('/web/dept/findDicName', p) //部门管理--查询活动分类


// 成员管理

export const memberlist = p => posts('/web/dept/findDeptUserName', p) //成员管理--查询所有部门名称


//日志
export const Journallist = p => posts('web/log/findAll', p) //日志信息-列表

export const Journaldel = p => post('web/log/dellLog', p) //日志信息-删除日志信息










//权限设置
export const Permissionset = p => posts('/sysRole/findAllMenu', p) //功能权限设置--


export const getParentIdName = p => get('web/dept/findUpDeptNameOne', p) //获取 上级部门的名称





// 物质列表
export const materialstatus = p => posts('/member-resources/changeStatus', p) //物质状态

export const materialpage = p => posts('/member-resources/findAllPage', p) //物质列表

export const materialdels = p => postdel('/member-resources/delResources', p) //删除物资（会员）

export const materialup = p => posts('/member-resources/UpdateResources', p) //更新物资（会员）

export const materialadds = p => posts('/member-resources/AddResources', p) //添加物资（会员）

export const materialtype = p => get('/member-resources/findResourcesType', p) //查询物资类型（会员）

export const materialquery = p => posts('/member-resources/findResourcesPage', p) //查询物资（会员）

//物质类型
export const materialTypestatus = p => posts('/member-resources/changeTypeStatus', p) //更改物资类型状态  （会员）

export const materialtypequery = p => posts('/member-resources/findAllResourcesPage', p) //查询物资类型（会员）

export const materialadd = p => posts('/member-resources/AddResourcesType', p) //添加物资类型（会员）

export const materialaddnum = p => posts('/member-resources/findResourcesTypePage', p) //多条件查询物资类型分页（会员）

export const materialupd = p => posts('/member-resources/UpdateResourcesType', p) //更新物资类型（会员）

export const materialdel = p => postdel('/member-resources/delResourcesType', p) //物理删除物资类型（会员）


//立项前置信息查询
export const projectApproval = p => posts('activity-manage/apply/batch/add', p) //立项
export const chooseTempalte = p => posts("/activity-manage/apply/act-mould/list", p) //模板列表
export const templateMsg = p => posts("/activity-manage/apply/act/id", p) //模板信息
export const programApproval = p => posts("/activity-manage/batch/audit/do", p) //立项审批

export const projectItem = p => posts('/activity-manage/apply/base-data/before', p) //立项前置信息查询

export const partner = p => get('/activity-manage/apply/partner/agree-type/list', p) //立项合作方

export const batchItem = p => posts('/activity-manage/apply/act-data/before', p) //活动批次前置信息查询

export const leader = p => posts('/activity-manage/apply/act/worker/list', p) //现场负责人查询

export const signType = p => get('/activity-manage/apply/sign/before', p) //招募类型

export const signPost = p => posts('/activity-manage/apply/sign/jobs', p) //招募岗位

export const projectDetail = p => posts('/activity-manage/apply/act/id', p) //编辑活动详情

export const projectEdit = p => posts('/activity-manage/act/update/id', p) //编辑活动保存

export const mouldList = p => get('/activity-manage/act/mould/list', p) //活动模板列表
export const signLimits = p => posts('/activity-manage/apply/sign/limits', p) //限制设置
export const signItems = p => posts('/activity-manage/apply/item/list', p) //报名项设置
export const firstList = p => posts('/activity-manage/apply/sign/first', p) //优先设置
export const userDetail = p => posts('/activity-manage/act/user/detail', p) //人员明细
export const actManager = p => posts('/activity-manage/volu/act/list', p) //活动管理

export const getDetail = p => posts('/org/detail', p) //  获取 维护活动融融固定项 数据

export const setpropaganda = p => posts('/org/propaganda/update', p) //  设置 维护活动融融固定项 数据



export const getActiveType = p => get('/volunteer-manager/queryDicByTypeFlag', p) //查询类型 typeFlag
export const getActiveLimit = p => posts('/volunteer-manager/apply/sign/limits', p)// 活动限制项
export const getActiveSign = p => get('/volunteer-manager/queryActivityItem', p) //活动报名项
export const getOrgTeam = p => get('/org/queryOrgForCreateActivity', p)//查询归属团队
export const saveActive = p => posts('/volunteer-manager/saveVolunteerActivity', p)//保存
export const getOrgId = p => posts("/volunteer-manager/queryOrgUserByOrgId", p)//获取负责人
export const getGood = p => posts("/volunteer-manager/applySigenFirst", p)//优先
export const getSingList = p => posts("/volunteer-manager/queryCoItem", p)
export const addSignItem = p => posts("/volunteer-manager/modifyCoItem", p)
export const getfund = p => posts("/volunteer-manager/queryCoOrgList", p)
export const updateFun = p => posts("/volunteer-manager/updateCoOrgList", p)
export const updateCard = p => posts("/volunteer-manager/modifyCertificateInfo", p)
export const getCard = p => posts("/volunteer-manager/queryCertificateList", p)
export const getBooks = p => posts("/volunteer-manager/querySmCertMouldList", p)
export const getBooksDetails = p => get('/volunteer-manager/querySmCertMouldDetail', p)//证书详情
export const updateBooks = p => posts("/volunteer-manager/updateSmCertMould", p) //
export const getVolunteer = p => get("/volunteer-manager/queryOrgListForSmCertMould", p)//团队
export const getActiveTeb = p => get("/activity-feedback/mould/list", p)//活动反馈模板
export const setActiveTeb = p => posts("/activity-feedback/mould/set", p)//设置反馈
export const getActiveTypeItem = p => get("/activity-manage/act/type/list", p)
export const addActiveTypeItem = p => posts("/activity-feedback/mould/set", p)
export const getActiveFeedBack = p => posts("/activity-feedback/mould/detail", p)
export const delActiveFeedBack = p => posts("/activity-feedback/mould/del", p)
export const getTranList = p => get("/activity-feedback/train/mould/list", p)
export const addTranList = p => posts("/activity-feedback/train/mould/set", p)
export const getFeedDetail = p => get("/activity-feedback/getDetail", p)
export const getTypeFeed = p => get("/activity-feedback/getCategotyList", p)
export const getActiveRelse = p => get("/volunteer-manager/queryCoActivityDetailByActivityId", p)
