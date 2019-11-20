<!--用户详情(会员)-->
<template>
    <div>
      <Navigation :labels="navigation1"></Navigation>
      <div class="main">
        <ButtonGroup>
          <Button type="success">用户详情</Button>
          <Button @click="Editor()">编辑资料</Button>
          <Button @click="Log()">登录日志</Button>
        </ButtonGroup>
        <div class="content-top flex-center-start">
          <div class="bk">
            <div class="portrait">
              <Avatar icon="ios-person" size="large" />
              <p>18000000000</p>
              <p>
                <span>黄金会员</span>
                <Icon type="ios-cog-outline" size='30' @click="jump()"/>
              </p>
            </div>
            <div class="details">
              <p>
                <span>分类：</span>
                <span>志愿者</span>
                <span>受益方</span>
              </p>
            </div>
            <div class="details">
              <p>
                <span>标签：</span>
                <span>运动达人</span>
                <span>爱心大使</span>
              </p>
            </div>
          </div>
          <table>
            <tr>
              <th>姓名</th>
              <td>王二</td>
              <th>身份证号</th>
              <td></td>
            </tr>
            <tr>
              <th>昵称</th>
              <td>小小二</td>
              <th>邮箱</th>
              <td></td>
            </tr>
            <tr>
              <th>性别</th>
              <td>男</td>
              <th>活动关注型</th>
              <td>快乐活动营、家长赋能</td>
            </tr>
            <tr>
              <th>生日</th>
              <td></td>
              <th>注册时间</th>
              <td>2017-07-24 17:25:38</td>
            </tr>
            <tr>
              <th>城市</th>
              <td></td>
              <th>vip到期时间</th>
              <td>2019-07-24 00:00:00</td>
            </tr>
          </table>
        </div>
        <div class="content bk">
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" />
              <span>统计信息</span>
            </div>
            <Table border :columns="columns1" :data="data1"></Table>
          </div>
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" />
              <span>组织信息</span>
            </div>
            <Table border :columns="columns2" :data="data2"></Table>
          </div>
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" />
              <span>收货地址</span>
            </div>
            <Table border :columns="columns3" :data="data3"></Table>
          </div>
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" />
              <span>活动记录</span>
            </div>
            <Table border :columns="columns4" :data="data4"></Table>
          </div>
          <div class="content-item">
            <div class="item-title">
              <Icon type="md-bookmark" />
              <span>赞助记录</span>
            </div>
            <Table border :columns="columns5" :data="data5"></Table>
          </div>

        </div>
      </div>

    </div>
</template>

<script>
import {Userdetail} from '../../request/api'
    export default {
      data () {
        return {
          navigation1: {
            head: "用户详情(会员)"
          },
          columns1: [
            {
              title: '立项数量',
              key: 'establishNum'
            },
            {
              title: '活动报名数量',
              key: 'signUpNum'
            },
            {
              title: '积分',
              key: 'score'
            },
            {
              title: '收藏类型',
              key: 'CollectionTypes'
            },
            {
              title: '活动评价',
              key: 'activityEvaluateNum'
            },
            {
              title: '活动反馈',
              key: 'activityFeedbackNum'
            },
            {
              title: '邀请好友',
              key: 'inviteNum'
            },
            {
              title: '活动时长（小时）',
              key: 'ActivityTime',
            }
          ],
          data1: [
            {  
              CollectionTypes: 10,
              ActivityTime: 100
            }
          ],
          // page: 1,
          // size: 10,
          userId:1,
          sysType:1,
          columns2: [
            {
              title: '组织名称',
              key: 'OrganizationName'
            },
            {
              title: '省份',
              key: 'provinces'
            },
            {
              title: '地址',
              key: 'address'
            },
            {
              title: '单位职务',
              key: 'UnitPosition'
            },
          ],
          data2: [
            {
              OrganizationName: '北师大白鸽志愿者团队',
              provinces: '北京',
              address: '北京',
              UnitPosition: '管理员',
            }
          ],
          columns3: [
            {
              title: '姓名',
              key: 'name'
            },
            {
              title: '手机号码',
              key: 'photo'
            },
            {
              title: '详细地址',
              key: 'DetailedAddress'
            },
            {
              title: '邮政编码',
              key: 'ZipCode'
            },
            {
              title: '默认地址',
              key: 'defaultAddress'
            },
          ],
          data3: [
            {
              name: '王二',
              photo: '180****1877',
              DetailedAddress: '江苏省南京市光华东街',
              ZipCode: '518000',
              operation:''
            },
            {
              name: '王大',
              photo: '180****1111',
              DetailedAddress: '江苏省南京市鼓楼区',
              ZipCode: '518000',
              operation:''
            }
          ],
          columns4: [
            {
              title: '活动名称',
              key: 'ActivityName'
            },
            {
              title: '活动时间',
              key: 'ActivityTime'
            },
            {
              title: '用户账号',
              key: 'UserAccount'
            },
            {
              title: '参与类型',
              key: 'ParticipateType'
            },
            {
              title: '活动类型',
              key: 'ActivityType'
            },
            {
              title: '状态',
              key: 'state'
            },
            {
              title: '操作',
              key: 'operation'
            },
          ],
          data4: [
            {
              ActivityName: '5.12 徒步在夏日 游园活动',
              ActivityTime: '2019-05-12 10:00:00',
              UserAccount: '18000000000',
              ParticipateType: '受益方',
              ActivityType: '快乐活动营',
              state: '已参与',
            },
            {
              ActivityName: '2.12 喜迎元宵 爱暖敬老院',
              ActivityTime: '2019-02-12 8:00:00',
              UserAccount: '18000000000',
              ParticipateType: '志愿者',
              ActivityType: '敬老',
              state: '已参与',
            }
          ],
          columns5: [
            {
              title: '赞助时间',
              key: 'SponsoredTime'
            },
            {
              title: '用户账号',
              key: 'UserAccount'
            },
            {
              title: '赞助类型',
              key: 'SponsorshipType'
            },
            {
              title: '额度',
              key: 'lines'
            },
            {
              title: '周期',
              key: 'cycle'
            },
            {
              title: '总金额',
              key: 'TotalAmount',
              Color:'#1ABD9D'
            },
            {
              title: '记录人',
              key: 'recorder',
              Color:'#1ABD9D'
            },
          ],
          data5: [
            {
              SponsoredTime: '2019-05-12 10:00:00',
              UserAccount: '18000000000',
              SponsorshipType: '月捐',
              lines: '20.0',
              cycle: '6个月',
              TotalAmount: '6个月',
              recorder: '**工作人员',
            },
            {
              SponsoredTime: '2019-02-12 8:00:00',
              UserAccount: '18000000000',
              SponsorshipType: '次捐',
              lines: '100.0',
              cycle: '',
              TotalAmount: '100.0',
              recorder: '**工作人员',
            },
          ],
        }
      },
      methods: {
        Editor(){
          this.$router.push({ name: 'Edit_data_hy' })
        },
        Log(){
          this.$router.push({ name: 'Login_hy' })
        },
        jump(){
          this.$router.push({ name: 'Beneficiary_level_setting' })
        },
        //列表数据
        getUserdetail(){
          Userdetail({
            //  page: { page: this.page, size: this.size },
             sysType: this.sysType,
             userId:this.userId
          }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.data = res.data.list;
          this.page = res.data.pageNum;
          this.dataCount = res.data.totalSize;

         }
         });
        }
      },
      mounted() {
        this.getUserdetail()
      },
    }
</script>

<style lang="scss" scoped>
  .main{
    width: 50rem;
    margin: 0 auto;
  }
  .bk{
    border: 1px solid #e4e4e4;
  }
  .portrait{
    padding: 0.5rem;
    display: block;
    justify-content: center;
    text-align: center;
    align-items: center;
    p{
      font-size: 15px;
      span{
        border-radius: 15px;
        background-color: red;
        padding: 0 0.3rem;
        line-height: 30px;
        color: white;
      }
    }
  }
  .details{
    font-size: 16px;
    padding: 0.3rem;
    border-top: 1px solid #e4e4e4;
    span:nth-child(1n+2){
      border-radius: 50%;
      border: 1px solid;
      padding: 0 0.5rem;
      margin: 0 0.1rem;
    }
  }
  .content-top{
    table {
      border: 1px solid #e4e4e4;
      td,
      th {
        height: 32px;
        border: 1px solid #e4e4e4;
        text-align: center;
        line-height: 32px;
      }
      th {
        font-weight: 700;
        width: 100px;
      }
      td {
        width: 300px;
        background: #ffffff;
      }
      width: 800px;
    }
  }
  .content{
    margin: 1rem 0;
    padding: 0.5rem;
  }
  .content-item{
    margin: 0.5rem;
  }
  .item-title{
    padding: 0.5rem 0;
  }
</style>
