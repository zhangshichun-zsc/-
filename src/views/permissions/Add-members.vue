<!--添加成员(共用)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title bk-szy">
          <p>
            <span>添加成员</span>
          </p>
        </div>
        <div class="add inter-table">
          <Form style="margin: 0 auto;" ref="AddDate" :model="AddDate" :rules="ruleValidate" :label-width="100">
            <FormItem label="成员名称:" prop="MemberName">
              <Input style="width: 10rem" v-model="AddDate.MemberName"></Input>
            </FormItem>
            <FormItem label="手机号:" prop="MobilePhone">
              <Input style="width: 10rem" v-model="AddDate.MobilePhone"></Input>
            </FormItem>
            <FormItem label="邮箱地址:" prop="mail">
              <Input style="width: 10rem" v-model="AddDate.mail"></Input>
            </FormItem>
            <FormItem label="所属部门:" prop="SubordinateDepartments">
              <Select style="width: 10rem" v-model="AddDate.SubordinateDepartments" placeholder="全部">
                <Option value="logistics">后勤部</Option>
                <Option value="logistics">财务部</Option>
                <Option value="logistics">行政部</Option>
                <Option value="logistics">项目部</Option>
              </Select>
              <a>查看部门详情</a>
              <p>选择所属部门后默认继承部门数据权限，可在成员列表中单独设置权限</p>
            </FormItem>
            <FormItem label="所属角色:" prop="SubordinateRole">
              <Select style="width: 10rem" v-model="AddDate.SubordinateRole" placeholder="全部">
                <Option value="logistics">角色1</Option>
                <Option value="logistics">角色2</Option>
                <Option value="logistics">角色3</Option>
              </Select>
              <a>查看角色详情</a>
              <p>选择所属部门后默认继承角色功能权限，可在成员列表中单独设置权限</p>
            </FormItem>
            <FormItem label="初始密码:" prop="password">
              <Input style="width: 10rem" v-model="AddDate.password"></Input>
            </FormItem>
            <FormItem label="备注信息:" prop="NoteInformation">
              <Input style="width: 20rem" v-model="AddDate.NoteInformation" type="textarea" :autosize="{minRows: 8,maxRows: 5}" placeholder="请输入内容"></Input>
            </FormItem>
            <FormItem>
              <Button type="success">提交</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        navigation1: {
          head: "添加成员(共用)"
        },
        AddDate:{
          MemberName:'',
          MobilePhone:'',
          mail:'',
          SubordinateDepartments:'',
          SubordinateRole:'',
          password:'',
          NoteInformation:''
        },
        ruleValidate:{
          MemberName:[
            { required: true, message: '成员名称不能为空', trigger: 'blur' }
          ],
          MobilePhone:[
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          mail: [
            { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
            { type: 'email', message: '邮箱地址格式不正确', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入初始密码', trigger: 'blur' }
          ]
        },

      }
    }
  }

</script>
<style lang="scss" scoped>
  html,body{
    margin: auto;
  }
  .main{
    background-color: #ffffff;
  }
  .main,
  .add{
    border: 1px solid #E4E4E4;
  }
  .content{
    margin: 10px;
  }
  .bk-szy{
    border-left: 1px solid #E4E4E4;
    border-right: 1px solid #E4E4E4;
    border-top: 1px solid #E4E4E4;
  }
  .title{
    background-color: #F3F3F3;
    justify-content: space-between;
    padding: 10px 20px;
  }
  .add{
    padding: 50px 0;
  }
  .add td{
    padding: 5px 10px;
  }
  .add a{
    margin-left: 20px;
    color: #666666;
  }
  .inter-table{
    display: flex;
    align-items: center;
  }
</style>
