import {
    UserList, getLabel, Userbatch, Setsend, SetUserLabel, getLevel, userExprot, optTime, Userdetail, getVipPage, vipApproval, getVipUserInfo, setUpdate, orgcity, orgprovince,
    orgdistrict
} from "@/request/api";

const Public = {}


//  获取 列表信息
Public.getInfo = function () {
}

//  获取  用户信息 列表信息
Public.getUserList = function (parame) {
    return UserList(parame)
}
//  变更用户状态
Public.setBatch = function (parame) {
    return Userbatch(parame)
}

Public.Setsend = function (parame) {
    return Setsend(parame)
}

Public.getLabel = function (parame) {
    return getLabel(parame)
}

Public.SetUserLabel = function (parame) {
    return SetUserLabel(parame)
}


Public.GetLevel = function (parame) {
    return getLevel(parame)
}


Public.Userdetail = function (parame) {
    return Userdetail(parame)
}

Public.getVipPage = function (parame) {
    return getVipPage(parame)
}

Public.vipApproval = function (parame) {
    return vipApproval(parame)
}


Public.getVipUserInfo = function (parame) {
    return getVipUserInfo(parame)
}
Public.setUpdate = function (parame) {
    return setUpdate(parame)
}

Public.orgcity = function (parame) {
    return orgcity(parame)
}
Public.orgprovince = function (parame) {
    return orgprovince(parame)
}
Public.orgdistrict = function (parame) {
    return orgdistrict(parame)
}
Public.optTime = function (parame) {
    return optTime(parame)
}



//  导出

//  查看

//  删除

// 会费

export default Public;

