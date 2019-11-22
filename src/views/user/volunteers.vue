<!-- 志愿者（共用） -->
<template>
  <div class="volun">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" /><span>筛选查询</span></div>
        <div class="flex-center-end">
          <div class="integral-center">
            <Icon type="ios-arrow-down" /><span>收起筛选</span></div>
          <Button @click='getInfo'>查询结果</Button>
          <Button @click='getSenior'>高级检索</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>姓名/手机号/昵称:</span>
          <Input size="large" v-model="paramsObj.info" placeholder="姓名/手机号/昵称" class="inpt" />
        </div>
        <div class="flex-center-start">
          <span>志愿者团队:</span>
          <Input size="large" v-model="paramsObj.orgName" placeholder="团队名称" class="inpt" />
        </div>
        <div class="flex-center-start">
          <!-- <span>服务时长:</span>
          <TimePicker type="time" placeholder="请选择时间时间" class="inpt" size='large'></TimePicker> -->

          <span>提交日期</span>
          <DatePicker type="date" placeholder="请选择开始时间" v-model="startAt" style="width: 200px"></DatePicker>
          <DatePicker type="date" placeholder="请选择结束时间" v-model="endAt" style="width: 200px"></DatePicker>

        </div>
        <div class="flex-center-start">
          <span>标签:</span>
          <Input v-model="paramsObj.labelName" size="large" placeholder="标签" class="inpt" />
        </div>
      </div>
    </div>

    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Icon type="md-reorder" size='25' />
          <span>数据列表</span>
        </div>
        <div>
          <!--群发短信-->
          <Modal v-model="modal1" title="群发短信" @on-ok="ok" @on-cancel="cancel" :mask-closable="false">
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate1" :label-width="120">
              <FormItem label="发送对象：" prop="tag">
                <p>
                  <span>共</span>
                  <span class="red">20</span>
                  <span>个用户</span>
                </p>
              </FormItem>
              <FormItem label="短信内容：" prop="Message">
                <Input v-model="formValidate1.Message" type="textarea" :autosize="{minRows: 5,maxRows: 8}"></Input>
                <p style="font-size: 12px;">内容上限不能超过<span class="red">500</span>字，当前已输入<span class="red">3</span>字，将作为<span class="red">1</span>条发送</p>
              </FormItem>
              <FormItem label="发送统计：" prop="tag">
                <p>
                  <span>发送条数：</span>
                  <span style="color: red;">20</span>
                  <span>条</span>
                </p>
              </FormItem>
            </Form>
          </Modal>
          <Dropdown trigger="click">
            <Button @click="modal1 = true" disabled>
              群发短信
              <Icon type="md-arrow-dropdown"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>选中用户</DropdownItem>
              <DropdownItem>全部用户</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <!--群发站内信-->
          <Modal v-model="modal2" title="群发站内信" @on-ok="onStation" @on-cancel="onStation" :mask-closable="false">
            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="120">
              <FormItem label="发送对象：" prop="tag">
                <p>
                  <span>共</span>
                  <span class="red">{{this.ALLLIST.length}}</span>
                  <span>个用户</span>
                </p>
              </FormItem>
              <FormItem label="标题" prop="title">
                <Input v-model="formValidate2.title"></Input>
              </FormItem>
              <FormItem label="内容：" prop="content">
                <Input v-model="formValidate2.msg" type="textarea" :autosize="{minRows: 5,maxRows: 8}"></Input>
                <p style="font-size: 12px;">站内信标题不能超过20个字，内容不能超过100个字。</p>
              </FormItem>
            </Form>
          </Modal>
          <Dropdown @on-click='isALL'>
            <Button @click="ismodal2">
              群发站内信
              <Icon type="md-arrow-dropdown"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="ON" ref="ON" :selected="Sele2.ON">选中用户</DropdownItem>
              <DropdownItem name="ALL" :selected="Sele2.ALL"> 全部用户</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <!--微信推送-->
          <Modal width="250" v-model="modal3" footer-hide>
            <ButtonGroup vertical>
              <Button @click="modal3_1 = true">APP推送(链接)</Button>
              <Modal v-model="modal3_1" title="APP推送(链接)" @on-ok="ok" @on-cancel="cancel">
                <Form ref="formValidate3" :model="formValidate3" :rules="ruleValidate3" :label-width="120">
                  <FormItem label="推送类型：" prop="PushType">
                    <CheckboxGroup v-model="formValidate3.PushType1">
                      <Checkbox label="options1">
                        <span>链接</span>
                      </Checkbox>
                      <Checkbox label="options2">
                        <span>资讯</span>
                      </Checkbox>
                      <Checkbox label="options3">
                        <span>活动</span>
                      </Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                  <FormItem label="推送链接" prop="PushLink">
                    <Input v-model="formValidate3.PushLink"></Input>
                  </FormItem>
                  <FormItem label="推送标题" prop="PushLink">
                    <Input v-model="formValidate3.PushTitle"></Input>
                  </FormItem>
                  <FormItem label="推送内容" prop="PushContent">
                    <Input v-model="formValidate3.PushContent"></Input>
                    <p style="font-size: 12px">推送标题不能超过14个字，内容不能超过20个字。</p>
                  </FormItem>
                </Form>
              </Modal>
              <Button @click="modal3_2 = true">APP推送(专题)</Button>
              <Modal v-model="modal3_2" title="APP推送(专题)" @on-ok="ok" @on-cancel="cancel">
                <Form ref="formValidate" :model="formValidate3" :rules="ruleValidate3" :label-width="120">
                  <FormItem label="推送类型：" prop="PushType">
                    <CheckboxGroup v-model="formValidate3.PushType2">
                      <Checkbox label="options1">
                        <span>链接</span>
                      </Checkbox>
                      <Checkbox label="options2">
                        <span>资讯</span>
                      </Checkbox>
                      <Checkbox label="options3">
                        <span>活动</span>
                      </Checkbox>
                      <Checkbox label="options4">
                        <span>商品</span>
                      </Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                  <FormItem label="选择资讯" prop="SelectInformation">
                    <Button type="success" @click="modal3_2_1 = true">选择资讯</Button>
                    <Modal v-model="modal3_2_1" title="选择资讯" footer-hide>
                      <Input search enter-button placeholder="名称搜索" style="width: auto" />
                      <Table :columns="columns1" :data="data1"></Table>
                      <Page :total="100" />
                    </Modal>
                  </FormItem>
                  <FormItem label="推送标题" prop="PushLink">
                    <Input v-model="formValidate3.PushTitle"></Input>
                  </FormItem>
                  <FormItem label="推送内容" prop="PushContent">
                    <Input v-model="formValidate3.PushContent"></Input>
                    <p style="font-size: 12px">推送标题不能超过14个字，内容不能超过20个字。</p>
                  </FormItem>
                </Form>
              </Modal>
              <Button @click="modal3_3 = true">APP推送(活动)</Button>
              <Modal v-model="modal3_3" title="APP推送(活动)" @on-ok="ok" @on-cancel="cancel">
                <Form ref="formValidate" :model="formValidate3" :rules="ruleValidate3" :label-width="120">
                  <FormItem label="推送类型：" prop="PushType">
                    <CheckboxGroup v-model="formValidate3.PushType3">
                      <Checkbox label="options1">
                        <span>链接</span>
                      </Checkbox>
                      <Checkbox label="options2">
                        <span>资讯</span>
                      </Checkbox>
                      <Checkbox label="options3">
                        <span>活动</span>
                      </Checkbox>
                      <Checkbox label="options4">
                        <span>商品</span>
                      </Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                  <FormItem label="选择活动" prop="ChoiceActivity">
                    <Button type="success" @click="modal3_3_1 = true">选择活动</Button>
                    <Modal v-model="modal3_3_1" title="选择活动" footer-hide>
                      <Input search enter-button placeholder="名称搜索" style="width: auto" />
                      <Table :columns="columns2" :data="data2"></Table>
                      <Page :total="100" />
                    </Modal>
                  </FormItem>
                  <FormItem label="推送标题" prop="PushLink">
                    <Input v-model="formValidate3.PushTitle"></Input>
                  </FormItem>
                  <FormItem label="推送内容" prop="PushContent">
                    <Input v-model="formValidate3.PushContent"></Input>
                    <p style="font-size: 12px">推送标题不能超过14个字，内容不能超过20个字。</p>
                  </FormItem>
                </Form>
              </Modal>
              <Button @click="modal3_4 = true">APP推送(商品)</Button>
              <Modal v-model="modal3_4" title="APP推送(商品)" @on-ok="ok" @on-cancel="cancel">
                <Form ref="formValidate" :model="formValidate3" :rules="ruleValidate3" :label-width="120">
                  <FormItem label="推送类型：" prop="PushType">
                    <CheckboxGroup v-model="formValidate3.PushType4">
                      <Checkbox label="options1">
                        <span>链接</span>
                      </Checkbox>
                      <Checkbox label="options2">
                        <span>资讯</span>
                      </Checkbox>
                      <Checkbox label="options3">
                        <span>活动</span>
                      </Checkbox>
                      <Checkbox label="options4">
                        <span>商品</span>
                      </Checkbox>
                    </CheckboxGroup>
                  </FormItem>
                  <FormItem label="选择商品" prop="ChooseGoods">
                    <Button type="success" @click="modal3_4_1 = true">选择商品</Button>
                    <Modal v-model="modal3_4_1" title="选择商品" footer-hide>
                      <Input search enter-button placeholder="名称搜索" style="width: auto" />
                      <Table :columns="columns3" :data="data3"></Table>
                      <Page :total="100" />
                    </Modal>
                  </FormItem>
                  <FormItem label="推送标题" prop="PushLink">
                    <Input v-model="formValidate3.PushTitle"></Input>
                  </FormItem>
                  <FormItem label="推送内容" prop="PushContent">
                    <Input v-model="formValidate3.PushContent"></Input>
                    <p style="font-size: 12px">推送标题不能超过14个字，内容不能超过20个字。</p>
                  </FormItem>
                </Form>
              </Modal>
            </ButtonGroup>
          </Modal>
          <Dropdown trigger="click">
            <Button @click="modal3 = true" disabled>
              微信推送
              <Icon type="md-arrow-dropdown"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>选中用户</DropdownItem>
              <DropdownItem>全部用户</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <!--设置标签-->
          <Modal v-model="modal5" title="设置标签" @on-ok="onSetLabel">
            <CheckboxGroup v-model="labelcheckout">
              <Checkbox v-for="item in labelList_c" :label="item.labelId">{{item.labelName}}</Checkbox>
            </CheckboxGroup>
          </Modal>

          <Button @click="onLabel">
            设置标签
          </Button>

          <!--导出数据-->
          <Dropdown>
            <Button @click="onExport">
              导出数据
            </Button>

          </Dropdown>
          <Select v-model="size" style="width:120px" placeholder="显示条数" class="space">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" class="space" style="width: 120px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div>

          <!-- TODO 自定义表头数据  <Icon type="ios-cog-outline" size='30' class="table-btn" @click="()=>{ this.isShow = true }" /> -->
          <Modal v-model="isShow" title="自定义展示字段">
            <div class="model">
              <div>目前显示字段顺序</div>
              <div class="model-port">拖拽调整列显示顺序</div>
              <div class="drap">
                <Button size="small" type="dashed">姓名</Button>
                <Button size="small" type="dashed">手机号</Button>
                <Button size="small" type="dashed">组织名称</Button>
                <Button size="small" type="dashed">参与活动次数</Button>
                <Button size="small" type="dashed">积分</Button>
              </div>
              <div class="model-msg">
                <div class="msg-tit">备选字段</div>
                <div class="msg-items">
                  <div class="items-tit">基本信息</div>
                  <CheckboxGroup v-model="basicInformation" class="check">
                    <Checkbox label="options1">姓名</Checkbox>
                    <Checkbox label="options2">手机号</Checkbox>
                    <Checkbox label="options3">出生日期</Checkbox>
                    <Checkbox label="options4">性别</Checkbox>
                    <Checkbox label="options5">创建时间</Checkbox>
                    <Checkbox label="options6">证件类型</Checkbox>
                    <Checkbox label="options7">证件号码</Checkbox>
                    <Checkbox label="options8">积分</Checkbox>
                    <Checkbox label="options9">昵称</Checkbox>
                  </CheckboxGroup>
                </div>
                <div class="msg-items">
                  <div class="items-tit">组织信息</div>
                  <CheckboxGroup v-model="OrganizeInformation" class="check">
                    <Checkbox label="options1">组织名称</Checkbox>
                  </CheckboxGroup>
                </div>
                <div class="msg-items">
                  <div class="items-tit">汇总信息</div>
                  <CheckboxGroup v-model="SummaryInformation" class="check">
                    <Checkbox label="options1">参与活动次数</Checkbox>
                    <Checkbox label="options2">活动时长</Checkbox>
                    <Checkbox label="options3">反馈提交数</Checkbox>
                    <Checkbox label="options4">活动立项数</Checkbox>
                  </CheckboxGroup>
                </div>
                <div class="msg-items">
                  <div class="items-tit">其他信息</div>
                  <CheckboxGroup v-model="OtherInformation" class="check">
                    <Checkbox label="options1">QQ</Checkbox>
                    <Checkbox label="options2">描述</Checkbox>
                    <Checkbox label="options3">备用手机</Checkbox>
                    <Checkbox label="options4">微信</Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
              <div class="foot">
                <Icon type="ios-cog-outline" size='25' class="table-btn" @click="() => { this.$router.push({name: 'user_field'}) }" />
                <a @click="jump1()">自定义扩展字段</a>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <Table border ref="volunteerSel" :columns="columns" :data="data" @on-selection-change="handleSelectionChange"></Table>
      <div class="pages">
        <div class="batch">
          <Checkbox v-model="ALLINFO">全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px" v-model="batchState">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px" @click='batchOperation'>确定</Button>
        </div>
        <Page :total="totalSize" @on-change='onPage' show-elevator show-total size='small' />
      </div>
    </div>

    <Modal title="二维码" v-model="modal4" style='text-align: center;' :closable='false'>
      <div class='bg'>
        <img :src="QRCode" alt="二维码">
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="modalCancel">取消</Button>
        <Button type="primary" size="large" @click="modalCancel">确定</Button>
      </div>

    </Modal>
    <Modal title="高级检索" v-model="modalSenior" :closable='false'>
      <Form ref="formCustom" :model="paramsSeniorObj">
        <Row>
          <Col span="12">
          <FormItem label="" class='formitem'>
            <p>用户账号：</p>
            <Input type="text" style="width:200px" v-model="paramsSeniorObj.account"></Input>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="">
            <p>用户昵称：</p>
            <Input type="text" style="width:200px" v-model="paramsSeniorObj.nickname"></Input>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="" class='formitem'>
            <p>会员等级</p>
            <Select style="width:200px" v-model="paramsSeniorObj.levelId">
              <Option v-for="item in vipGrade" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="">
            <p>用户标签：</p>
            <Select style="width:200px" v-model="paramsSeniorObj.labelId">
              <Option v-for="item in labelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="12">
          <FormItem label="" class='formitem'>
            <p>注册时间/时间段</p>
            <Col span="12">
            <DatePicker type="date" placeholder="请选择开始时间" v-model="registrationStartTimeStamp" style="width: 200px;"></DatePicker>
            </Col>
          </FormItem>
          </Col>
          <Col span="12">
          <FormItem label="" class='formitem'>
            <p style='font-size: 0;'>000</p>
            <DatePicker type="date" placeholder="请选择结束时间" v-model="registrationEndTimeStamp" style="width: 200px"></DatePicker>
          </FormItem>
          </Col>
        </Row>

      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="hidd">取消</Button>
        <Button type="primary" size="large" @click="setSenior">确定</Button>
      </div>

    </Modal>

  </div>
</template>

<script>
import Public from './config/index'
import { UserList } from '@/request/api'
export default {
  data() {
    return {
      navigation1: {
        head: '志愿者(共用)'
      },
      modal1: false, //群发短信
      formValidate1: {
        Message: ''
      },
      ruleValidate1: {
        tag: [{ required: true, trigger: 'blur' }],
        Message: [{ required: true, message: '短信内容不能为空', trigger: 'blur' }]
      },
      modal2: false, //群发站内信
      letters: '',
      Sele2: {
        ON: false,
        ALL: false
      },
      formValidate2: {
        // 群发 站内信
        msg: '',
        title: ''
      },
      ruleValidate2: {
        tag: [{ required: true, trigger: 'blur' }],
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
      modal3: false, //微信推送
      modal3_1: false, //APP推送(链接)
      modal3_2: false, //APP推送(专题)
      modal3_2_1: false, //选择资讯
      modal3_3: false, //APP推送(活动)
      modal3_3_1: false, //选择活动
      modal3_4: false, //APP推送(商品)
      modal3_4_1: false, //选择商品
      modal4: false, //二维码
      modalSenior: false, // 高级检索
      formValidate3: {
        PushType1: ['options1'], //APP推送(链接)推送类型
        PushType2: ['options2', 'options4'], //APP推送(专题)推送类型
        PushType3: ['options3', 'options4'], //APP推送(活动)推送类型
        PushType4: ['options4'], //APP推送(商品)推送类型
        PushLink: '', //推送链接
        PushTitle: '', //推送标题
        PushContent: '' //推送内容
      },
      ruleValidate3: {
        PushType: [{ required: true, message: '推送类型不能为空', trigger: 'blur' }],
        PushLink: [{ required: true, message: '推送链接不能为空', trigger: 'blur' }],
        PushTitle: [{ required: true, message: '推送标题不能为空', trigger: 'blur' }],
        PushContent: [{ required: true, message: '推送内容不能为空', trigger: 'blur' }],
        SelectInformation: [{ required: true, message: '选择资讯不能为空', trigger: 'blur' }],
        ChoiceActivity: [{ required: true, message: '选择活动不能为空', trigger: 'blur' }],
        ChooseGoods: [{ required: true, message: '选择商品不能为空', trigger: 'blur' }]
      },
      data1: [], //资讯
      columns1: [
        {
          title: '资讯名称',
          key: 'InformationName',
          align: 'center'
        },
        {
          title: '所属分类',
          key: 'category',
          align: 'center'
        },
        {
          title: '添加时间',
          key: 'AddTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: '#41C5AA'
                  },
                  on: {
                    click: () => {
                      this.$Message.info('你点击了第' + params.index + '列')
                    }
                  }
                },
                '选择'
              )
            ])
          }
        }
      ],
      data2: [], //活动
      columns2: [
        {
          title: '活动名称',
          key: 'EventName',
          align: 'center'
        },
        {
          title: '开始时间',
          key: 'StartTime',
          align: 'center'
        },
        {
          title: '结束时间',
          key: 'EndTime',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: '#41C5AA'
                  },
                  on: {
                    click: () => {
                      this.$Message.info('你点击了第' + params.index + '列')
                    }
                  }
                },
                '选择'
              )
            ])
          }
        }
      ],
      data3: [], //商品
      columns3: [
        {
          title: '商品名称',
          key: 'NameCommodity',
          align: 'center'
        },
        {
          title: '类型',
          key: 'type',
          align: 'center'
        },
        {
          title: '兑换量',
          key: 'ChangeAmount',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  style: {
                    color: '#41C5AA'
                  },
                  on: {
                    click: () => {
                      this.$Message.info('你点击了第' + params.index + '列')
                    }
                  }
                },
                '选择'
              )
            ])
          }
        }
      ],
      modal5: false, //设置标签
      labelcheckout: [],
      labelList_c: [],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'userId'
        },
        {
          title: '姓名',
          key: 'userName'
        },
        {
          title: '手机号',
          key: 'tel'
        },
        {
          title: '用户昵称',
          key: 'nickname'
        },
        {
          title: '分类',
          key: 'roles'
        },
        {
          title: '标签',
          key: 'labels'
        },
        {
          title: '参与活动数',
          key: 'joinActivityNum'
        },
        {
          title: '积分',
          key: 'score'
        },
        {
          title: '账户启用状态',
          key: 'state',
          align: 'userEnable',
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                props: {
                  value: params.row.userEnable == 1 ? true : false
                },
                on: {
                  input: e => {
                    this.setUserEnable(params.row.userId, e)
                  }
                }
              })
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  clssName: 'action',
                  style: {
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'user_details_hy',
                        query: {
                          userId: params.row.userId
                        }
                      })
                    }
                  }
                },
                '查看'
              ),
              h(
                'span',
                {
                  style: {
                    marginRight: '5px',
                    marginLeft: '5px',
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.showQrcode(params)
                    }
                  }
                },
                '二维码'
              )
            ])
          }
        }
      ],
      batchList: [{ value: '0', label: '禁用账号' }, { value: '1', label: '启用账号' }],
      batchState: '',
      data: [],
      totalSize: 0,
      isShow: false,
      basicInformation: ['options1', 'options2', 'options8'],
      OrganizeInformation: ['options1'],
      SummaryInformation: ['options1'],
      OtherInformation: ['options2', 'options4'],
      sorting: [{ value: 'asc', label: '正序' }, { value: 'desc', label: '倒序' }],
      Article: [{ value: 10, label: 10 }, { value: 15, label: 15 }, { value: 20, label: 20 }],
      vipGrade: [{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }], // 会员等级
      labelList: [{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }], // 标签
      page: 1, // 页码
      size: 10, // 条数
      sort: 'asc', // 排序
      startAt: '',
      endAt: '',
      registrationStartTimeStamp: '',
      registrationEndTimeStamp: '',
      paramsObj: {
        info: '',
        orgName: '',
        labelName: ''
      },
      paramsSeniorObj: {
        account: '',
        nickname: '',
        levelId: '',
        labelId: ''
      },
      QRCode: '',
      ALLINFO: false, // 是否全选
      ALLLIST: [], // 选中的人员
      isSenior: false // 是否选择了高级检索
    }
  },

  components: {},

  computed: {},

  created() {
    this.init()
  },

  watch: {
    size(newVlaue, oldValue) {
      if (newVlaue === oldValue) return
      this.getUsetList(this.paramsObj)
    },
    page(newVlaue, oldValue) {
      if (newVlaue === oldValue) return
      this.getUsetList(this.paramsObj)
    },
    ALLINFO(newVlaue, oldValue) {
      //  全选 and 全不选
      if (newVlaue === true) {
        this.$refs.volunteerSel.selectAll(true)
        let arr = this.data.map(item => {
          return item.userId
        })
        this.ALLLIST = arr
      } else {
        this.$refs.volunteerSel.selectAll(false)
        this.ALLLIST = []
      }
    }
  },

  methods: {
    // 初始化
    init() {
      this.getUsetList()
      this.getLabels()
      this.getLevel()
    },
    //  获取用户列表
    getUsetList(paramsObj, flag) {
      let time = {}
      if (flag) {
        time = {
          registrationStartTimeStamp: this.registrationStartTimeStamp
            ? this.registrationStartTimeStamp.getTime()
            : '',
          registrationEndTimeStamp: this.registrationEndTimeStamp
            ? this.registrationEndTimeStamp.getTime()
            : ''
        }
      } else {
        time = {
          durationStart: this.startAt ? this.startAt.getTime() : '',
          durationEnd: this.endAt ? this.endAt.getTime() : ''
        }
      }

      let obj = this.util.remove({
        sysType: '2',
        page: this.page,
        size: this.size,
        ...time,
        ...paramsObj
      })
      Public.getUserList(obj).then(res => {
        console.log(res)

        if (res.code === 200) {
          this.data = res.data.list
          this.totalSize = res.data.totalSize
          this.isSenior = flag
        } else {
        }
      })
    },
    // 用户状态 变更
    setUserEnable(params, type) {
      Public.setBatch({
        sysType: '2',
        userIds: params.toString(),
        oprType: type ? '1' : '0'
      }).then(res => {
        if (res.code === 200) {
          type ? this.$Message.info('启用成功') : this.$Message.info('禁用成功')
        } else {
          // TODO 操作失败之后， 状态不变更
          this.$Message.error({
            background: true,
            content: '状态变更失败，请联系管理员查看'
          })
          this.getUsetList(this.paramsObj)
        }
      })
    },
    // 导出用户数据
    exportFn(params) {
      let exportUrl = {}
      if (this.isSenior) {
        exportUrl = this.util.remove({ size: this.totalSize, ...this.paramsSeniorObj })
      } else {
        exportUrl = this.util.remove({ ...this.paramsObj })
      }
      this.util.userExprot({ sysType: 2, page: 0, ...exportUrl })
    },
    // 获取标签
    getLabels(params) {
      Public.getLabel({
        sysType: '2',
        ...params
      }).then(res => {
        //  获取具体的用户详情
        if (params) {
          this.labelList_c = res.data.labelList
          this.labelcheckout = res.data.userLabel.map(item => {
            return item.labelId
          })
        } else {
          let arr = res.data.labelList
          this.labelList = arr.map(item => {
            return { value: item.labelId, label: item.labelName }
          })
        }
      })
    },
    // 获取会员等级
    getLevel() {
      Public.GetLevel({
        sysType: 2
      }).then(res => {
        this.vipGrade = res.data.map(item => {
          return {
            value: item.levelId,
            label: item.levelName
          }
        })
      })
    },
    // 站内信
    setsend(params) {
      Public.Setsend({
        sysId: '2',
        ...params
      }).then(res => {
        if (res.code === 200) {
          this.$Message.info('站内信发送成功~')
        } else {
          this.$Message.error({
            background: true,
            content: '发送失败，请联系负责人'
          })

          console.log(res.msg)
        }
      })
    },
    //  查询按钮
    getInfo() {
      this.getUsetList(this.paramsObj)
    },
    //  高级检索 模态框
    getSenior() {
      this.modalSenior = true
    },
    // 关闭 高级检索
    hidd() {
      this.modalSenior = false
    },
    // 高级检索按钮
    setSenior() {
      this.getUsetList(this.paramsSeniorObj, true)
      this.modalSenior = false
    },
    // 显示二维码
    showQrcode(imgSrc) {
      this.QRCode = imgSrc.row.qrCodePath
      this.modal4 = true
    },
    // 关闭 二维码
    modalCancel() {
      this.QRCode = ''
      this.modal4 = false
    },
    // 显示站内信模态框
    ismodal2() {
      if (this.letters) {
        this.modal2 = true
      } else {
        this.$Message.error({
          background: true,
          content: '请选择全部用户or选中用户'
        })
      }
    },
    // 点击页码
    onPage(page) {
      this.page = page
    },
    // 选中 内容
    handleSelectionChange(val) {
      if (val.length === this.data.length) {
        this.ALLINFO = true
      } else {
        this.ALLINFO = false
      }
      let arr = val.map(item => {
        return item.userId
      })
      this.ALLLIST = arr
    },
    // 批量修改状态
    batchOperation() {
      if (this.batchState) {
        this.setUserEnable(this.ALLLIST, this.batchState == 1 ? true : false, () => {
          this.getUsetList(this.paramsObj)
        })
      } else {
        this.$Message.error({
          background: true,
          content: '请选择批量操作的类型'
        })
      }
    },
    // 发送站内信
    onStation() {
      let ids = this.ALLLIST.toString()
      this.setsend({ ids, ...this.formValidate2 })
    },
    // 选中站内信菜单
    isALL(name) {
      this.Sele2 = {
        ON: false,
        ALL: false
      }
      this.Sele2[name] = true
      this.letters = name
    },
    // 设置标签按钮
    onLabel() {
      if (this.ALLLIST.length === 1) {
        this.getLabels({ userId: this.ALLLIST.toString() })
        this.modal5 = true
      } else if (this.ALLLIST.length > 1) {
        this.$Message.error({
          background: true,
          content: '只能选择列表中的一项'
        })
      } else {
        this.$Message.error({
          background: true,
          content: '请选择列表中的一项'
        })
      }
    },
    // 设置标签 确定按钮
    onSetLabel() {
      Public.SetUserLabel({
        userId: this.ALLLIST.toString(),
        labelIds: this.labelcheckout.toString(),
        sysType: '2'
      }).then(res => {
        if (res.code === 200) {
          this.$Message.info('设置标签成功')
          this.getUsetList(this.paramsObj)
        } else {
          this.$Message.error({
            background: true,
            content: '设置标签失败，请稍后再试'
          })
          console.log(res.msg)
        }
      })
    },
    // 导出按钮
    onExport() {
      this.exportFn()
    },

    ok() {
      this.$Message.info('Clicked ok')
    },
    cancel() {
      this.$Message.info('Clicked cancel')
    },
    jump1() {
      this.$router.push({ name: 'UserFields_hy' })
    }
  }
}
</script>

<style lang="scss" scoped >
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-center {
  margin: 0 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #fff;
  font-size: 14px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 160px;
  margin-left: 10px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 10px;
}
.integral-table {
  margin-top: 30px;
}
.table-header {
  padding: 10px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-left: 15px;
}
.integral-table .pages {
  padding: 5px 20px;
  margin-top: 50px;
  background: #fff;
}
.drap button {
  margin-right: 0.2rem;
}
.red {
  color: red;
}
.check .ivu-checkbox-wrapper {
  width: 5rem;
}
.pages {
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
}
.bg {
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
.bg img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.ivu-form-item {
  margin-bottom: 0;
}
.formitem {
  display: inline-block;
}
</style>
