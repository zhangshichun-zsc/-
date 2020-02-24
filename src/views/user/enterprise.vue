<!-- 企业 -->
<template>
  <div class="gover">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div><Icon type="ios-search-outline"/><span>筛选查询</span></div>
        <div class="flex-center-end">
          <div class="integral-rig"><Icon type="ios-arrow-down"/><span>收起筛选</span></div>
          <Button class="integral-rig">查询结果</Button>
          <Button class="integral-rig">高级检索</Button>
        </div>
      </div>
      <div class="flex-center-start integral-body">
        <div class="flex-center-start">
          <span>姓名/手机号/昵称:</span>
          <Input size="large" placeholder="姓名/手机号/昵称" class="inpt"/>
        </div>
        <div class="flex-center-start">
          <span>企业名称:</span>
          <Input size="large" placeholder="企业名称"  class="inpt"/>
        </div>
        <div class="flex-center-start">
          <span>注册时间:</span>
          <TimePicker type="time" placeholder="注册时间" class="inpt" size='large'></TimePicker>
        </div>
        <div class="flex-center-start">
          <span>标签:</span>
          <Input size="large" placeholder="标签"  class="inpt"/>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div>
          <Icon type="md-reorder" size='25'/>
          <span>数据列表</span>
        </div>
        <div>
          <!--群发短信-->
          <Modal
            v-model="modal1"
            title="群发短信"
            @on-ok="ok"
            @on-cancel="cancel">
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
          <Dropdown>
            <Button @click="modal1 = true">
              群发短信
              <Icon type="md-arrow-dropdown"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>选中用户</DropdownItem>
              <DropdownItem>全部用户</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <!--群发站内信-->
          <Modal
            v-model="modal2"
            title="群发站内信"
            @on-ok="ok"
            @on-cancel="cancel">
            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="120">
              <FormItem label="发送对象：" prop="tag">
                <p>
                  <span>共</span>
                  <span class="red">20</span>
                  <span>个用户</span>
                </p>
              </FormItem>
              <FormItem label="标题" prop="title">
                <Input v-model="formValidate2.title"></Input>
              </FormItem>
              <FormItem label="内容：" prop="content">
                <Input v-model="formValidate2.content" type="textarea" :autosize="{minRows: 5,maxRows: 8}"></Input>
                <p style="font-size: 12px;">站内信标题不能超过20个字，内容不能超过100个字。</p>
              </FormItem>
            </Form>
          </Modal>
          <Dropdown>
            <Button @click="modal2 = true">
              群发站内信
              <Icon type="md-arrow-dropdown"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>选中用户</DropdownItem>
              <DropdownItem>全部用户</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <!--微信推送-->
          <Modal  width="250"
                  v-model="modal3"
                  footer-hide>
            <ButtonGroup vertical>
              <Button @click="modal3_1 = true">APP推送(链接)</Button>
              <Modal
                v-model="modal3_1"
                title="APP推送(链接)"
                @on-ok="ok"
                @on-cancel="cancel">
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
              <Modal
                v-model="modal3_2"
                title="APP推送(专题)"
                @on-ok="ok"
                @on-cancel="cancel">
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
                    <Modal
                      v-model="modal3_2_1"
                      title="选择资讯"
                      footer-hide>
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
              <Modal
                v-model="modal3_3"
                title="APP推送(活动)"
                @on-ok="ok"
                @on-cancel="cancel">
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
                    <Modal
                      v-model="modal3_3_1"
                      title="选择活动"
                      footer-hide>
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
              <Modal
                v-model="modal3_4"
                title="APP推送(商品)"
                @on-ok="ok"
                @on-cancel="cancel">
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
                    <Modal
                      v-model="modal3_4_1"
                      title="选择商品"
                      footer-hide>
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
          <Dropdown>
            <Button @click="modal3 = true">
              微信推送
              <Icon type="md-arrow-dropdown"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>选中用户</DropdownItem>
              <DropdownItem>全部用户</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <!--设置标签-->
          <Modal
            v-model="modal4"
            title="设置标签"
            @on-ok="ok"
            @on-cancel="cancel">
            <Checkbox v-for="(item1,index) in label1" :name="item1" :key="index">{{item1}}</Checkbox>
          </Modal>
          <Dropdown>
            <Button @click="modal4 = true">
              设置标签
              <Icon type="md-arrow-dropdown"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>选中用户</DropdownItem>
              <DropdownItem>全部用户</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <!--导出数据-->
          <Dropdown>
            <Button>
              导出数据
              <Icon type="md-arrow-dropdown"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>选中用户</DropdownItem>
              <DropdownItem>全部用户</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div>
          <Button>显示条数<Icon type="md-arrow-dropdown" /></Button>
          <Button>排序方式<Icon type="md-arrow-dropdown" /></Button>
          <Icon type="ios-cog-outline" size='30' class="table-btn" @click="()=>{ this.isShow = true }"/>
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
                <Icon type="ios-cog-outline" size='25' class="table-btn" @click="() => { this.$router.push({name: 'user_field'}) }"/>
                <a @click="jump1()">自定义扩展字段</a>
              </div>
            </div>
          </Modal>
        </div>
      </div>
      <Table border :columns="columns" :data="data"></Table>
      <div class="pages">
         <div class="batch">
          <Checkbox>全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px">确定</Button>
        </div>
        <Page :current='page' :total="100" show-elevator show-total size='small'/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navigation1: {
          head: "企业(会员)",
          flush: "刷新",
          returns: "返回"
        },
        modal1: false,//群发短信
        formValidate1: {
          Message: '',
        },
        ruleValidate1: {
          tag: [
            { required: true, trigger: 'blur' }
          ],
          Message: [
            { required: true,message: '短信内容不能为空', trigger: 'blur' }
          ],
        },
         batchList:[
          {value: 'recommended',label: '设为推荐'},
          {value: 'cancel',label: '取消推荐'},
          {value: 'hidden',label: '设为隐藏'},
          {value: 'According',label: '设为显示'},
          {value: 'delete',label: '删除'}
        ],
        modal2: false,//群发站内信
        formValidate2: {
          title: '',
          content: '',
        },
        ruleValidate2: {
          tag: [
            { required: true, trigger: 'blur' }
          ],
          title: [
            { required: true,message: '标题不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true,message: '内容不能为空', trigger: 'blur' }
          ],
        },
        modal3: false,//微信推送
        modal3_1: false,//APP推送(链接)
        modal3_2: false,//APP推送(专题)
        modal3_2_1: false,//选择资讯
        modal3_3: false,//APP推送(活动)
        modal3_3_1: false,//选择活动
        modal3_4: false,//APP推送(商品)
        modal3_4_1: false,//选择商品
        formValidate3: {
          PushType1: ['options1'],//APP推送(链接)推送类型
          PushType2: ['options2','options4'],//APP推送(专题)推送类型
          PushType3: ['options3','options4'],//APP推送(活动)推送类型
          PushType4: ['options4'],//APP推送(商品)推送类型
          PushLink: '',//推送链接
          PushTitle: '',//推送标题
          PushContent: '',//推送内容
        },
        ruleValidate3: {
          PushType: [
            { required: true,message: '推送类型不能为空', trigger: 'blur' }
          ],
          PushLink: [
            { required: true,message: '推送链接不能为空', trigger: 'blur' }
          ],
          PushTitle: [
            { required: true,message: '推送标题不能为空', trigger: 'blur' }
          ],
          PushContent: [
            { required: true,message: '推送内容不能为空', trigger: 'blur' }
          ],
          SelectInformation: [
            { required: true, message: '选择资讯不能为空',trigger: 'blur' }
          ],
          ChoiceActivity: [
            { required: true, message: '选择活动不能为空',trigger: 'blur' }
          ],
          ChooseGoods: [
            { required: true, message: '选择商品不能为空',trigger: 'blur' }
          ],
        },
        data1:[

        ],//资讯
        columns1:[
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
                h('span', {
                  style: {
                    color: '#41C5AA'
                  },
                  on: {
                    click: () => {
                      this.$Message.info('你点击了第' + params.index + '列')
                    }
                  }
                }, '选择')
              ])
            }
          }
        ],
        data2:[

        ],//活动
        columns2:[
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
                h('span', {
                  style: {
                    color: '#41C5AA'
                  },
                  on: {
                    click: () => {
                      this.$Message.info('你点击了第' + params.index + '列')
                    }
                  }
                }, '选择')
              ])
            }
          }
        ],
        data3:[

        ],//商品
        columns3:[
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
                h('span', {
                  style: {
                    color: '#41C5AA'
                  },
                  on: {
                    click: () => {
                      this.$Message.info('你点击了第' + params.index + '列')
                    }
                  }
                }, '选择')
              ])
            }
          }
        ],
        modal4: false,//设置标签
        label1:['用户标签名称','用户标签名称','用户标签名称','用户标签名称','用户标签名称','用户标签名称','用户标签名称',],
        isShow: false,
        basicInformation: ['options1','options2','options8',],
        OrganizeInformation: ['options1'],
        SummaryInformation: ['options1'],
        OtherInformation: ['options2','options4',],
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '手机号',
            key: 'phone'
          },
          {
            title: '用户昵称',
            key: 'nickname'
          },
          {
            title: '分类',
            key: 'classify'
          },
          {
            title: '标签',
            key: 'label'
          },
          {
            title: '参与活动数',
            key: 'activity'
          },
          {
            title: '积分',
            key: 'integral'
          },
          {
            title: '账户启用状态',
            key: 'state',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('i-switch')
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
                h('span', {
                  clssName: 'action',
                  style: {
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$router.push({name:'user_details_hy'})
                    }
                  }
                }, '查看'),
                h('span', {
                  style: {
                    marginRight: '5px',
                    marginLeft: '5px',
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$Message.info('你点击了第' + params.index + '列')
                    }
                  }
                }, '二维码'),
                h('span', {
                  style: {
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$Message.info('你点击了第' + params.index + '列')
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data: [
        ]
      }
    },

    components: {},

    computed: {},

    created () {},

    methods: {
      ok () {
        this.$Message.info('Clicked ok');
      },
      cancel () {
        this.$Message.info('Clicked cancel');
      },
      jump1(){
        this.$router.push({ name: 'UserFields_hy' })
      },
    }
  }

</script>
<style lang="scss">
  .integral-header {
    border: 1px solid #eee;
  }
  .integral-header .integral-top{
    padding: 15px 20px;
    background: rgb(228, 228, 228);
    border-bottom: 1px solid #eee;
  }
  .integral-header .integral-rig{
    margin-left: 20px;
  }
  .integral-header .integral-body{
    padding: 20px;
    background: #fff;
  }
  .integral-header .integral-body .flex-center-start .inpt{
    width: 150px;
    margin-left: 15px;
  }
  .integral-header .integral-body .flex-center-start{
    margin-right: 20px;
  }
  .integral-table{
    margin-top: 30px;
  }
  .table-header{
    padding: 10px 20px;
    background: rgb(228, 228, 228);
    border:1px solid #eee;
  }
  .table-header .table-btn{
    margin-left: 15px;
  }
  .integral-table .pages{
    padding: 5px 20px;
    margin-top: 50px;
    background: #fff;
  }
   .pages{
    display: flex;
    justify-content: space-between;
    margin: 10px auto;
  }
</style>
