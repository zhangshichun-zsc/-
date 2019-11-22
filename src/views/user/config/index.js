import { UserList, setBatch, setsend, getLabel, SetUserLabel, getLevel, userExprot, Userdetail } from "@/request/api";

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
    return setBatch(parame)
}

Public.Setsend = function (parame) {
    return setsend(parame)
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



//  导出

//  查看

//  删除

// 会费

export default Public;

