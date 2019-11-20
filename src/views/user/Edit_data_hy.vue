<!--编辑资料(会员)-->
<template>
    <div>
      <Navigation :labels="navigation1"></Navigation>
      <div class="main">
        <ButtonGroup>
          <Button @click="userDetaile()">用户详情</Button>
          <Button type="success">编辑资料</Button>
          <Button @click="Log()">登录日志</Button>
        </ButtonGroup>
        <div class="constant bk">
          <div class="constant-title">
            <p>编辑资料</p>
          </div>
          <div class="con flex-center-start">
            <div style="margin-right: 0.5rem;">
              <Avatar icon="ios-person" size="large" />
              <span>洋洋</span>
            </div>
            <div>
              <div class="details">
                <p>
                  <span>分类：</span>
                  <span>志愿者</span>
                  <span>受益方</span>
                  <Icon type="ios-create" size='30'/>
                </p>
              </div>
              <div class="details">
                <p>
                  <span>标签：</span>
                  <span>运动达人</span>
                  <span>爱心大使</span>
                  <Icon type="ios-create" size='30'/>
                </p>
              </div>
            </div>

          </div>
        </div>
        <div class="constant masonry" style="padding: 0.5rem;">
          <div class="con-box bk item">
            <div class="constant-title flex-center-between">
              <span>
                基本信息
              </span>
              <span>
                显示/隐藏空值
              </span>
            </div>
            <Form :model="formInline1" :label-width="120" style="padding: 0.5rem">
              <FormItem label="手机号">
                <Input type="text" placeholder="点击输入" v-model="formInline1.photo" style="width: 200px"></Input>
              </FormItem>
              <FormItem label="出生日期">
                <DatePicker type="date" placeholder="点击输入" style="width: 200px"></DatePicker>
              </FormItem>
              <FormItem label="性别">
                <Select v-model="formInline1.gender" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="身份证">
                <Input type="text" placeholder="点击输入" v-model="formInline1.IdCard"></Input>
              </FormItem>
              <FormItem label="邮箱">
                <Input type="text" v-model="formInline1.email" placeholder="点击输入"></Input>
              </FormItem>
              <FormItem label="创建时间">
                <Input type="text" placeholder="点击输入" v-model="formInline1.CreationTime"></Input>
              </FormItem>
            </Form>
          </div>
          <div class="con-box bk item">
            <div class="constant-title flex-center-between">
              <span>
                志愿者信息
              </span>
              <span>
                显示/隐藏空值
              </span>
            </div>
            <Form :model="formInline2" :label-width="120" style="padding: 0.5rem">
              <FormItem label="专业特长">
                <Select v-model="formInline2.ProfessionalCompetence" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="可服务时间">
                <Select v-model="formInline2.ServiceableTime" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList3" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="爱好">
                <Select v-model="formInline2.hobby" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="教育程度">
                <Select v-model="formInline2.DegreeEducation" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList5" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="服务意向">
                <Select v-model="formInline2.ServiceIntention" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList6" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <div  style="text-align: center;">
                <Icon type="ios-arrow-down"/>
              </div>
            </Form>
          </div>
          <div class="con-box bk item">
            <div class="constant-title flex-center-between">
              <span>
                受益方信息
              </span>
              <span>
                显示/隐藏空值
              </span>
            </div>
            <Form :model="formInline3" :label-width="120" style="padding: 0.5rem">
              <FormItem label="VIP到期时间">
                <Select v-model="formInline3.VIPExpiryDate" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList7" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="障碍类型">
                <Select v-model="formInline3.BarrierType" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList8" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="残疾证号">
                <Select v-model="formInline3.DisabilityNumber" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList9" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="家庭账号成员">
                <Select v-model="formInline3.FamilyAccountMember" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList10" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="衣服尺码">
                <Select v-model="formInline3.DressSize" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList11" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <div  style="text-align: center;">
                <Icon type="ios-arrow-down"/>
              </div>
            </Form>
          </div>
          <div class="con-box bk item">
            <div class="constant-title flex-center-between">
              <span>
                组织信息
              </span>
              <span>
                显示/隐藏空值
              </span>
            </div>
            <Form :model="formInline4" :label-width="120" style="padding: 0.5rem">
              <FormItem label="组织名称">
                <Select v-model="formInline4.OrganizationName" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList12" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="组织类型">
                <Select v-model="formInline4.TissueTypes" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList13" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="所在部门">
                <Select v-model="formInline4.department" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList14" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="单位职务">
                <Select v-model="formInline4.UnitPosition" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList15" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Form>
          </div>
          <div class="con-box bk item">
            <div class="constant-title flex-center-between">
              <span>捐赠方信息</span>
              <span>显示/隐藏空值</span>
            </div>
            <Form :model="formInline5" :label-width="120" style="padding: 0.5rem">
              <FormItem label="捐赠类型">
                <Select v-model="formInline5.DonorType" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList16" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="周期">
                <Select v-model="formInline5.cycle" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList17" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="额度">
                <Select v-model="formInline5.lines" style="width:200px"  placeholder="点击输入">
                  <Option v-for="item in cityList18" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <div  style="text-align: center;">
                <Icon type="ios-arrow-down"/>
              </div>
            </Form>
          </div>
          <div class="con-box bk item">
            <div class="constant-title flex-center-between">
              <span>备注</span>
              <span>显示/隐藏空值</span>
            </div>
            <div style="padding: 0.2rem">
              <Input v-model="formInline6.DonorType" placeholder="添加新备注">
                <span slot="prepend">+</span>
              </Input>
            </div>

          </div>
          <div class="con-box bk item">
            <div class="constant-title flex-center-between">
              <span>文件</span>
              <span>显示/隐藏空值</span>
            </div>
            <div style="margin: 0.2rem auto;display: flex;justify-content: center;">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button>添加附件</Button>
              </Upload>
            </div>

          </div>

        </div>
      </div>

    </div>
</template>

<script>
    export default {
      data () {
        return {
          navigation1: {
            head: "编辑资料(会员)"
          },
          formInline1:{
            photo:'13111111111',
            DateBirth:'',
            gender:'',
            IdCard:'',
            email:'',
            CreationTime:'2019-05-20   15:00',
          },
          cityList1:[
            {value: 'option1',label: '男'},
            {value: 'option2',label: '女'}
          ],
          formInline2:{
            ProfessionalCompetence:'',
            ServiceableTime:'',
            hobby:'',
            DegreeEducation:'',
            ServiceIntention:'',
          },
          cityList2:[
            {value: 'option1',label: '1'},
          ],
          cityList3:[
            {value: 'option1',label: '工作日'},
          ],
          cityList4:[
            {value: 'option1',label: '1'},
          ],
          cityList5:[
            {value: 'option1',label: '1'},
          ],
          cityList6:[
            {value: 'option1',label: '1'},
          ],
          formInline3:{
            VIPExpiryDate:'',
            BarrierType:'',
            DisabilityNumber:'',
            FamilyAccountMember:'',
            DressSize:''
          },
          cityList7:[
            {value: 'option1',label: '1'},
          ],
          cityList8:[
            {value: 'option1',label: '1'},
          ],
          cityList9:[
            {value: 'option1',label: '1'},
          ],
          cityList10:[
            {value: 'option1',label: '1'},
          ],
          cityList11:[
            {value: 'option1',label: '1'},
          ],
          formInline4:{
            OrganizationName:'',
            TissueTypes:'',
            department:'',
            UnitPosition:'',
          },
          cityList12:[
            {value: 'option1',label: '拜耳中国'},
            {value: 'option2',label: '白鸽志愿团队'},
            {value: 'option3',label: '丰台家长小组'},
          ],
          cityList13:[
            {value: 'option1',label: '1'},
          ],
          cityList14:[
            {value: 'option1',label: '1'},
          ],
          cityList15:[
            {value: 'option1',label: '1'},
          ],
          formInline5:{
            DonorType:'',
            cycle:'',
            lines:'',
          },
          cityList16:[
            {value: 'option1',label: '月捐'},
            {value: 'option2',label: '次捐'},
          ],
          cityList17:[
            {value: 'option1',label: '1'},
          ],
          cityList18:[
            {value: 'option1',label: '1'},
          ],
          formInline6:{
            note:'',
          },
        }
      },
      methods: {
        userDetaile(){
          this.$router.push({ name: 'user_details_hy' })
        },
        Log(){
          this.$router.push({ name: 'Login_hy' })
        },
      }
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
  .constant-title{
    padding: 0.5rem;
    background-color: #F3F3F3;
    border-bottom: 1px solid #e4e4e4;
  }
  .con{
    padding: 0.2rem 0.5rem;
  }
  .details{
    font-size: 16px;
    padding: 0.3rem;
    span:nth-child(1n+2){
      border-radius: 50%;
      border: 1px solid;
      padding: 0 0.5rem;
      margin: 0 0.1rem;
    }
  }
  .con-box{
    width: 15rem;
  }
  .ivu-form-item{
    margin: 0.2rem 0.5rem;
  }
  .masonry {
    -moz-column-count:3;
    -webkit-column-count:3;
    column-count:3;
    -moz-column-gap: 2em;
    -webkit-column-gap: 2em;
    column-gap: 2em;
    margin:2em auto;
   }
  .item {
    margin-bottom: 2em;
    -moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;
  }
</style>
