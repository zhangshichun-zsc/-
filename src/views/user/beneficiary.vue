<!-- 受益方 -->
<template>
  <div class='bene'>
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="integral-body">
        <div class="flex-center-start" style="margin-bottom: 0.5rem">
          <div class="flex-center-start">
            <span>姓名/手机号/昵称:</span>
            <Input size="large" v-model="paramsObj.info" placeholder="姓名/手机号/昵称" class="inpt" />
          </div>
          <div class="flex-center-start">
            <span>家长小组:</span>
            <Input size="large" v-model="paramsObj.orgName" placeholder="家长小组" class="inpt" />
          </div>

          <div class="flex-center-start">
            <span>标签:</span>
            <Input v-model="paramsObj.labelName" size="large" disabled placeholder="标签" class="inpt" />
          </div>
          <div class="flex-center-start">
            <span>会员类型:</span>
            <Select v-model="paramsObj.memberType" size='large' class="inpt">
              <Option value="0">普通会员</Option>
              <Option value="1">VIP</Option>
            </Select>
          </div>

          <div class="flex-center-start" style='flex: auto;
                      display: flex;
                      justify-content: flex-end;'>
            <a href="javascript:;" class='btn' @click="getInfo">查询</a>
            <!-- <a href="javascript:;" class='btn' @click='getSenior'>高级检索</a> -->
          </div>

        </div>
        <div class="flex-center-start">
          <div class="flex-center-start">
            <span>注册时间段:&nbsp;&nbsp;</span>
            <DatePicker style="width: 180px" type="date" placeholder="请选择开始时间" v-model="startAt"></DatePicker>
            <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
            <DatePicker <DatePicker style="width: 180px" type="date" placeholder="请选择结束时间" v-model="endAt"></DatePicker>
          </div>
          <div class="flex-center-start">
            <span>VIP缴费时间:&nbsp;&nbsp;</span>
            <DatePicker style="width: 180px" type="date" placeholder="请选择开始时间" v-model="memberPayStartTimestamp"></DatePicker>
            <span>&nbsp;&nbsp;~&nbsp;&nbsp;</span>
            <DatePicker <DatePicker style="width: 180px" type="date" placeholder="请选择结束时间" v-model="memberPayEndTimestamp"></DatePicker>
          </div>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class='table_item'>
          <Icon type="md-reorder" size='25' />
          <span>数据列表</span>
        </div>
        <div class='table_item'>
          <!--群发短信-->
          <Modal v-model="modal1" title="群发短信" @on-ok="ok" @on-cancel="cancel">
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
                <p >
                  <span>发送条数：</span>
                  <span style="color: red;">20</span>
                  <span>条</span>
                </p>
              </FormItem>
            </Form>
          </Modal>
          <Dropdown>
            <Button style="margin-left:10px;" class="btns" disabled @click="modal1 = true">
              群发短信
            </Button>
            <!-- <DropdownMenu slot="list">
              <DropdownItem>选中用户</DropdownItem>
              <DropdownItem>全部用户</DropdownItem>
            </DropdownMenu> -->
          </Dropdown>
          <!--群发站内信-->
          <Modal v-model="modal2" title="群发站内信" class='QRcodemodal'    :mask-closable="false">
            <Form ref="formValidate2" :model="formValidate2" :rules="ruleValidate2" :label-width="120">
              <FormItem label="发送对象：" prop="tag">
                <p class="pitchOn">
                  <span>共</span>
                  <span class="red">{{this.ALLLIST.length}}</span>
                  <span>个用户</span>
                </p>
              </FormItem>
              <FormItem label="标题" prop="title">
                <Input v-model="formValidate2.title"></Input>
              </FormItem>
              <FormItem label="内容：" prop="msg">
                <Input v-model="formValidate2.msg" type="textarea" :autosize="{minRows: 5,maxRows: 8}"></Input>
                <p style="font-size: 12px;">站内信标题不能超过20个字，内容不能超过100个字。</p>
              </FormItem>
            </Form>

            <div slot="footer">
              <Button
                type="error"
                style="font-size:14px"
                size="large"
                @click="onStation"
                >确定</Button
              >
            </div>
          </Modal>
          <!-- <Dropdown @on-click='isALL'> -->
            <Button style="margin-left:10px;" class="btns"  @click="ismodal2">
              群发站内信
             
            </Button>
            <!-- <DropdownMenu slot="list">
              <DropdownItem name="ON" ref="ON" :selected="Sele2.ON">选中用户</DropdownItem>
              <DropdownItem name="ALL" :selected="Sele2.ALL"> 全部用户</DropdownItem>
            </DropdownMenu>
          </Dropdown> -->
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
          <Dropdown>
            <Button style="margin-left:10px;" class="btns"   disabled @click="modal3 = true">
              微信推送
              <Icon type="md-arrow-dropdown"></Icon>
            </Button>
            <!-- <DropdownMenu slot="list">
              <DropdownItem>选中用户</DropdownItem>
              <DropdownItem>全部用户</DropdownItem>
            </DropdownMenu> -->
          </Dropdown>

          <Modal v-model="modallable" title="设置标签" @on-ok="onSetLabel">
            <CheckboxGroup v-model="labelcheckout">
              <Checkbox v-for="item in labelList_c" :key='item.labelId' :label="item.labelId">{{item.labelName}}</Checkbox>
            </CheckboxGroup>
          </Modal>
          <Button style="margin-left:10px;" class="btns"   disabled @click="onLabel">
            设置标签
          </Button>

          <!-- <Dropdown> -->
          <!-- <Button @click="modallable = true">
              设置标签
              <Icon type="md-arrow-dropdown"></Icon>
            </Button> -->
          <!-- <DropdownMenu slot="list">
              <DropdownItem>选中用户</DropdownItem>
              <DropdownItem>全部用户</DropdownItem>
            </DropdownMenu> -->
          <!-- </Dropdown> -->
          <!--导出数据-->
          <Dropdown>
            <Button style="margin-left:10px;" class="btns"   @click="onExport">
              导出数据
            </Button>
          </Dropdown>
        </div>
        <div>
          <!--修改vip时间-->
          <Modal v-model="modal5" title="修改vip时间">
            <Form ref="formVip" :model="formVip" :rules="formVip" :label-width="180">
              <FormItem label="调整到期时间：" prop="AdjustedExpirationTime">
                <RadioGroup v-model="formVip.IncreaseDecrease" vertical>
                  <Radio label="0">
                    <span>增加月</span>
                  </Radio>
                  <Radio label="1">
                    <span>减少月</span>
                  </Radio>
                </RadioGroup>
              </FormItem>
              <FormItem label="">
                <div class="flex-center-start">
                  <InputNumber v-model="formVip.adjustValue" style='width: 200px' :min='1' :max="99" placeholder="请输入大于0的整数"></InputNumber>
                  <!-- <Input v-model.number="formVip.adjustValue"> -->
                  <span slot="append">月</span>
                  </Input>
                </div>
              </FormItem>
              <FormItem label="备注信息：">
                <Input v-model="formVip.remark" type="textarea" :autosize="{minRows: 5,maxRows: 8}"></Input>
              </FormItem>

            </Form>

            <div slot="footer">
              <Button type="text" size="large" @click="cancelModel5">取消</Button>
              <Button type="error" size="large" @click="toExamine">提交审核</Button>
            </div>
          </Modal>

          <Dropdown @on-click='isALL2'>
            <Button style="margin-left:10px;"  class="btns"  @click="isModal5">
              修改vip时间
            </Button>
            <!-- <DropdownMenu slot="list" v-model="letters_modal5">
              <DropdownItem name="ON" ref="ON" :selected="Sele.ON">选中用户</DropdownItem>
              <DropdownItem name="ALL" :selected="Sele.ALL"> 全部用户</DropdownItem>
            </DropdownMenu> -->
          </Dropdown>
          <!--审核vip时间-->
          <Dropdown>
            <Button style="margin-left:10px;" class="btns"   @click="jump3()">
              审核vip时间
            </Button>
          </Dropdown>
          <Button style="margin-left:10px;"  class="integral-rig btns" @click="setup">会费设置</Button>
        </div>
        <div>
          <Select v-model="size" style="width:120px; margin-left:10px;" placeholder="显示条数" class="space">
            <Option v-for="item in Article" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Select placeholder="排序方式" class="space" style="width: 120px;  margin-left:10px;" v-model="sort">
            <Option v-for="item in sorting" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <!-- <Icon type="ios-cog-outline" size='30' class="table-btn" @click="()=>{ this.isShow = true }" /> -->
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
          <!-- <Checkbox @click="setALL">全选</Checkbox> -->
          <Checkbox @click="setALL" v-model="ALLINFO">全选</Checkbox>
          <Select placeholder="批量操作" placement="top" style="width: 150px" v-model="batchState">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <a href="javascript:;" class='btn' @click='batchOperation'>确定</a>
          <!-- <Button style="margin-left: 10px" @click='batchOperation'></Button> -->
        </div>
        <Page :total="totalSize" show-elevator show-total size='small' @on-change='setPage' />
      </div>
    </div>
    <Modal title="二维码" v-model="modal4" class='QRcodemodal' style='text-align: center;' >
      <div class='bg'>
        <img :src="QRCode" alt="二维码">
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="modalCancel">取消</Button>
        <Button type="error" size="large" @click="modalCancel">确定</Button>
      </div>
    </Modal>

    <Modal title="高级检索" v-model="modalSenior" class='QRcodemodal'>
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
            <p>注册时间/时间段：</p>
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
        <Row>
          <Col span="12">
          <FormItem label="">
            <p>用户标签：</p>
            <Select disabled style="width:200px" v-model="paramsSeniorObj.labelId">
              <Option v-for="item in labelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
          </Col>

        </Row>

      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="hidd">重置</Button>
        <Button type="error" size="large" @click="setSenior">开始检索</Button>
      </div>

    </Modal>
  </div>
</template>

<script>
import Public from './config/index'

export default {
  data() {
    return {
      navigation1: {
        head: '受益方(会员)'
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
      formValidate2: {
        title: '',
        msg: ''
      },
      ruleValidate2: {
        title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
        msg: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      },
      modal3: false, //微信推送
      modal3_1: false, //APP推送(链接)
      modal3_2: false, //APP推送(专题)
      modal3_2_1: false, //选择资讯
      modal3_3: false, //APP推送(活动)
      modal3_3_1: false, //选择活动
      modal3_4: false, //APP推送(商品)
      modal3_4_1: false, //选择商品
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
      modal5: false, //修改vip时间
      modallable: false, //设置标签
      formVip: {
        IncreaseDecrease: '0', // 0:增加，1 减少
        remark: '', // 备注
        adjustValue: 1 //调整值
      },
      ruleValidate4: {
        AdjustedExpirationTime: [{ required: true, message: '调整到期时间', trigger: 'blur' }]
      },
      label1: [],
      isShow: false,
      basicInformation: ['options1', 'options2', 'options8'],
      OrganizeInformation: ['options1'],
      SummaryInformation: ['options1'],
      OtherInformation: ['options2', 'options4'],
      columns: [
        {
          type: 'selection',
          width: 50,
          align: 'center'
        },
        {
          title: '姓名',
          key: 'userName',
          align: 'center',
          width: 180
        },
        {
          title: '手机号',
          key: 'tel',
          align: 'center',
          width: 140
        },
        {
          title: '用户昵称',
          key: 'nickname',
          align: 'center',
          width: 180
        },
        {
          title: '分类',
          key: 'roles',
          align: 'center',
          width: 120
        },
        {
          title: '类型',
          key: 'vipFlag',
          align: 'center',
          width: 120
        },
        {
          title: 'vip缴费时间',
          key: 'resentPayTimestamp',
          align: 'center',
          width: 160
        },
        {
          title: 'vip到期时间',
          key: 'vipLastTimestamp',
          align: 'center',
          width: 180
        },
        {
          title: '标签',
          key: 'labels',
          align: 'center',
          width: 180
        },
        {
          title: '参与活动数',
          key: 'joinActivityNum',
          align: 'center',
          width: 120
        },
        {
          title: '积分',
          key: 'score',
          align: 'center',
          width: 100
        },
        {
          title: '账户启用状态',
          key: 'userEnable',
          align: 'center',
          minWidth: 140,
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
          width: 160,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  clssName: 'action',
                  style: {
                    color: '#FF565A'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: 'user_details_hy',
                        query: {
                          userId: params.row.userId
                        }
                      })
                      // this.$router.push({ name: 'user_details_hy' })
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
                    color: '#FF565A'
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
      sorting: [
        { value: 'create_at asc', label: '正序' },
        { value: 'create_at desc', label: '倒序' }
      ],
      Article: [{ value: 10, label: 10 }, { value: 15, label: 15 }, { value: 20, label: 20 }],
      batchList: [{ value: '0', label: '禁用账号' }, { value: '1', label: '启用账号' }],
      Sele2: {
        ON: false,
        ALL: false
      },
      Sele: {
        ON: false,
        ALL: false
      },
      letters_modal5: '',
      labelList: [],
      vipGrade: [],
      searchMode: true,
      modalSenior: false,
      labelList_c: [],
      labelcheckout: [],
      modal4: false,
      QRCode: '',
      ALLINFO: false,
      isSenior: false,
      data: [],
      sort: 'create_at desc',
      page: 1,
      size: 10,
      totalSize: 0,
      batchState: '',
      registrationStartTimeStamp: '',
      registrationEndTimeStamp: '',
      memberPayStartTimestamp: '',
      memberPayEndTimestamp: '',
      startAt: '',
      endAt: '',
      paramsObj: {
        info: '',
        orgName: '',
        labelName: '',
        memberType: ''
      },
      paramsSeniorObj: {
        account: '',
        nickname: '',
        levelId: '',
        labelId: ''
      },
      userId: '1',
      ALLLIST: [],
      stationFormFlag: true
    }
  },
  watch: {
    sort(newVlaue) {
      this.ALLINFO = false
      this.getUsetList(this.paramsObj)
    },
    size(newVlaue, oldValue) {
      this.ALLINFO = false
      if (newVlaue === oldValue) return
      this.getUsetList(this.paramsObj)
    },
    page(newVlaue, oldValue) {
      this.ALLINFO = false
      if (newVlaue === oldValue) return
      this.getUsetList(this.paramsObj)
    },
    ALLINFO(newVlaue, oldValue) {
      //  全选 and 全不选
      console.log(newVlaue);
      
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
  created() {
    // this.userId = localStorage.getItem('userId' | '')
    this.getUsetList(this.paramsObj)
    this.getLabels()
  },
  methods: {
    // 获取列表数据
    getUsetList(paramsObj, flag) {
      let time = {}
      if (flag) {
        let registration = this.sameday({
          star: this.formatTime(this.registrationStartTimeStamp),
          end: this.formatTime(this.registrationEndTimeStamp)
        })
        time = {
          registrationStartTimeStamp: registration.star,
          registrationEndTimeStamp: registration.end
        }
      } else {
        let memberPay = this.sameday({
          star: this.formatTime(this.memberPayStartTimestamp),
          end: this.formatTime(this.memberPayEndTimestamp)
        })
        let dueation = this.sameday({
          star: this.formatTime(this.startAt),
          end: this.formatTime(this.endAt)
        })
        time = {
          memberPayStartTimestamp: memberPay.star,
          memberPayEndTimestamp: memberPay.end,
          durationStart: dueation.star,
          durationEnd: dueation.end
        }
      }
      let obj = this.util.remove({
        sysType: '1',
        page: this.page,
        size: this.size,
        ...time,
        ...paramsObj
      })

      Public.getUserList(obj).then(res => {
        if (res.code === 200) {
          this.data = res.data.list
          this.totalSize = res.data.totalSize
        } else {
        }
      })
    },

    // 获取标签
    getLabels(params) {
      Public.getLabel({
        sysType: '1',
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
          arr.unshift({ labelId: '', labelName: '全部' })
          this.labelList = arr.map(item => {
            return { value: item.labelId, label: item.labelName }
          })
        }
      })
    },
    // 查询按钮
    getInfo() {
      this.page = 1
      this.getUsetList(this.paramsObj)
    },
    // 修改Vip时间
    optTime() {
      let adjustValue = null
      if (this.formVip.IncreaseDecrease == 1) {
        adjustValue = -this.formVip.adjustValue
      } else {
        adjustValue = this.formVip.adjustValue
      }

      let obj = this.util.remove({
        userIds: this.ALLLIST.toString(),
        userId: this.userId,
        adjustValue: adjustValue,
        remark: this.formVip.remark
      })

      Public.optTime({ ...obj }).then(res => {
        if (res.code === 200) {
          this.$Message.info('修改vip时间成功')
          this.formVip= {
            IncreaseDecrease: '0', 
            remark: '', 
            adjustValue: 1 
          }
        } else {
          this.$Message.error({
            background: true,
            content: res.msg
          })
        }
        this.modal5 = false
      })
    },
    // 站内信
    setsend(params) {
      Public.Setsend({
        sysId: '1',
        ...params
      }).then(res => {
        if (res.code === 200) {
           this.modal2 = false
          this.formValidate2 = {
            msg:'',
            title:''
          }
          this.$Message.info('站内信发送成功~')
        } else {
          this.modal2 = false
          let str = res.msg
          this.$Message.error({
            background: true,
            content: str
          });
        }
        setTimeout(()=> {
          this.stationFormFlag = true
        },500)
       
      })
    },
    // 用户状态的变更
    setUserEnable(params, type) {
      Public.setBatch({
        sysType: '1',
        userIds: params.toString(),
        oprType: type ? '1' : '0'
      }).then(res => {
        if (res.code === 200) {
          type ? this.$Message.info('启用成功') : this.$Message.info('禁用成功')
          if (this.batchState) {
            this.getUsetList(this.paramsObj)
            this.batchState = ''
          }
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
    // 显示站内信模态框
    ismodal2() {
    if (this.ALLLIST.length > 0) {
        this.modal2 = true;
      } else {
        this.$Message.error({
          background: true,
          content: "请选择要修改的人员"
        });
      }
      // if (this.letters) {
      //   if (this.letters === 'ON') {
      //     if (this.ALLLIST.length > 0) {
      //       this.modal2 = true
      //     } else {
      //       this.$Message.error({
      //         background: true,
      //         content: '请选择要修改的人员'
      //       })
      //     }
      //   } else {
      //     this.ALLINFO = true
          
      //     this.modal2 = true
      //   }
      // } else {
      //   this.$Message.error({
      //     background: true,
      //     content: '请选择全部用户or选中用户'
      //   })
      // }
    },

    //  修改vip 时间弹窗
    isModal5() {
         if (this.ALLLIST.length > 0) {
            this.modal5 = true
          } else {           
            this.$Message.error({
              background: true,
              content: '请选择一条记录'
            })
          }
  

  

      //   if (this.letters_modal5 === 'ON') {
      //     if (this.ALLLIST.length > 0) {
      //       this.modal5 = true
      //     } else {           
      //       this.$Message.error({
      //         background: true,
      //         content: '请选择一条记录'
      //       })
      //     }
      //   } else {
      //     this.ALLINFO = true
      //     this.modal5 = true
      //   }
      // } else {
      //   // this.$Message.error({
      //   //   background: true,
      //   //   content: '请选择全部用户or选中用户'
      //   // })
      // }
    },
    ismodal3() {
      if (this.letters) {
        this.modal2 = true
      } else {
        this.$Message.error({
          background: true,
          content: '请选择全部用户or选中用户'
        })
      }
    },
    // 显示二维码
    showQrcode(imgSrc) {
      this.QRCode = imgSrc.row.qrCodePath
      this.modal4 = true
    },
    // 关闭 二维码
    modalCancel() {
      this.modal4 = false
      setTimeout(()=>{
        this.QRCode = "";
      },500)
    },
    // 设置标签按钮
    onLabel() {
      if (this.ALLLIST.length === 1) {
        this.getLabels({ userId: this.ALLLIST.toString() })
        this.modallable = true
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
        sysType: '1'
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
    // 选中内容
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
    // 选中站内信菜单
    isALL(name) {
      this.Sele2 = {
        ON: false,
        ALL: false
      }
      this.Sele2[name] = true
      this.letters = name
    },
    isALL2(name) {
      this.Sele = {
        ON: false,
        ALL: false
      }
      this.Sele[name] = true
      this.letters_modal5 = name
    },
    // 发送站内信
    onStation() {

        if(!this.stationFormFlag) return
       this.$refs.formValidate2.validate(valid => {
        if (valid) {
          this.stationFormFlag = false;
           let ids = this.ALLLIST.toString()
            this.setsend({ ids, ...this.formValidate2 })
        } else {          
          this.$Message.error("必填项未填!");
        }
      });

  
     
    },
    // 导出用户数据
    exportFn(params) {
      let exportUrl = {}
      if (this.isSenior) {
        exportUrl = this.util.remove({ size: this.totalSize, ...this.paramsSeniorObj })
      } else {
        exportUrl = this.util.remove({ size: this.totalSize, ...this.paramsObj })
      }
      console.log({ sysType: '1', page: 0, ...exportUrl })

      this.util.userExprot('/user-list/user-export', { sysType: '1', page: 0, ...exportUrl })
    },
    // 导出按钮
    onExport() {
      this.exportFn()
    },
    //显示模态框
    getSenior() {
      this.modalSenior = true
    },
    // 关闭 高级检索
    hidd() {
      this.paramsSeniorObj = {
        account: '',
        nickname: '',
        labelId: ''
      }
      this.registrationStartTimeStamp = ''
      this.registrationEndTimeStamp = ''
      // this.modalSenior = false
    },
    // 高级检索按钮
    setSenior() {
      this.page = 1
      this.getUsetList(this.paramsSeniorObj, true)
      this.modalSenior = false
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
    formatTime(time) {
      if (!time) return ''
      return time.getTime()
    },
    sameday(timeObj) {
      let { star, end } = timeObj
      if (!star || !end) return { star: star, end: end }
      if (star === end) {
        let time1 = this.util.formatDate_time(star)
        let time2 = this.util.formatDate_time(end).split(' ')[0] + ' 23:59:59'
        return {
          star: new Date(time1).getTime(),
          end: new Date(time2).getTime()
        }
      } else {
        let time1 = this.util.formatDate_time(star)
        let time2 = this.util.formatDate_time(end).split(' ')[0] + ' 23:59:59'
        return {
          star: new Date(time1).getTime(),
          end: new Date(time2).getTime()
        }
      }
    },

    setALL() {
      console.log(123)
      console.log(this.ALLINFO)
    },
    // 选中页码
    setPage(res) {
      this.page = res
    },
    toExamine() {
      this.optTime()
    },
    cancelModel5() {
      console.log('关闭模态框')
      this.modal5 = false
    },
    ok() {
      this.$Message.info('Clicked ok')
    },
    cancel() {},
    jump1() {
      this.$router.push({ name: 'UserFields_hy' })
    },
    jump3() {
      this.$router.push({ name: 'vp_time' })
    },
    setup() {
      this.$router.push({ name: 'vp_price' })
    }
  }
}
</script>
<style lang="scss" scoped>
.integral-header {
  border: 1px solid #eee;
}
.integral-header .integral-top {
  padding: 15px 20px;
  background: rgb(228, 228, 228);
  border-bottom: 1px solid #eee;
}
.integral-header .integral-rig {
  margin-left: 20px;
}
.integral-header .integral-body {
  padding: 20px;
  background: #FFFFFF;
  box-shadow: 0 3px 4px 0 rgba(188,188,188,0.21);
  border-radius: 12px;
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 180px;
  margin-left: 10px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 10px;
}
.flex-center-start {
  span {
    font-size: 16px;
  }
}
.integral-table {
  margin-top: 30px;
  padding: 0 5px;
  background: #ffffff;
  box-shadow: 0 3px 4px 0 rgba(188, 188, 188, 0.21);
  border-radius: 12px;
}
.table-header {
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.integral-table .pages {
  padding: 20px 20px;
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
  width: 10rem;
  height: 10rem;
  margin: 0 auto;
  vertical-align: middle;
}
.btn {
  display: inline-block;
  width: 110px;
  height: 32px;
  line-height: 32px;
  background: #ff565a;
  border-radius: 15px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  margin: 0 15px;
}
.pitchOn {
  font-size: 16px;
}
.btns{
  font-size: 15px;
}
</style>
