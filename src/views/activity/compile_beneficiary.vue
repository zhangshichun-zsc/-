<!--编辑招募报名项-受益方（会员）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="compole">
      <p class="compole-head">编辑招募报名项</p>
      <div class="compole-content">
        <ul>
          <li>
            <span>招募类型</span>
            <div>
              <Select v-model="oneRole.roleName" style="width:200px">
                <Option
                  v-for="(item,index) in signTypeList"
                  :value="item.name"
                  :key="index"
                  @click.native="getType(item)"
                >{{ item.name }}</Option>
              </Select>
              <Select v-model="oneRole.positionName" style="width:200px">
                <Option
                  v-for="(item,index) in signPostList"
                  :value="item.name"
                  :key="index"
                  @click.native="getPost(item)"
                >{{ item.name }}</Option>
              </Select>
            </div>
          </li>
          <li>
            <span>岗位职责</span>
            <Input
              type="textarea"
              v-model="oneRole.positionComments"
              placeholder="请输入..."
              style="width: 600px"
            ></Input>
          </li>
          <li>
            <span>模式</span>
            <Checkbox-group v-model="oneRole.zmType">
              <Checkbox label="1">先到先得</Checkbox>
              <Checkbox label="2">预约型</Checkbox>
            </Checkbox-group>
          </li>
          <li v-if="oneRole.zmType==1">
            <ul>
              <li>
                <span>票价</span>
                <div class="tables">
                  <table>
                    <tr>
                      <th>票价</th>
                      <th>VIP价</th>
                      <th>数量</th>
                      <th>可预约数量</th>
                      <th>可获得积分</th>
                    </tr>
                    <tr>
                      <td>
                        <Input v-model="oneRole.amount" placeholder="请输入..." style="width: 90px"></Input>
                      </td>
                      <td>
                        <Input v-model="oneRole.vipAmount" placeholder="请输入..." style="width: 90px"></Input>
                      </td>
                      <td>
                        <Input v-model="oneRole.recruitNum" placeholder="请输入..." style="width: 90px"></Input>
                      </td>
                      <td>
                        <Input v-model="oneRole.apptNum" placeholder="请输入..." style="width: 90px"></Input>
                      </td>
                      <td>
                        <Input v-model="oneRole.score" placeholder="请输入..." style="width: 90px"></Input>
                      </td>
                    </tr>
                  </table>
                  <div class="audit">
                    <span class="audit-span">是否审核</span>
                    <i-switch v-model="oneRole.isHaveSubsidy" @on-change="change" :true-value='1' :false-value='2' />
                    <span>报名后需要我审核</span>
                  </div>
                </div>
              </li>
              <li>
                <span>退款设置</span>
                <div class="refund">
                  <p>
                    支持退款
                    <i-switch v-model="oneRole.refund.refundRule" @on-change="refund" :false-value='3' :true-value='1 || 2' />
                  </p>
                  <div class="refund-div" v-if="oneRole.refund.refundRule==1 || oneRole.refund.refundRule==2">
                    <RadioGroup v-model="oneRole.refund.refundRule" vertical @on-change='getRefund'>
                      <Radio label="1" :true-value='1'>活动结束前均可退款</Radio>
                      <Radio label="2" :true-value='2'>
                        活动开始前
                        <Input
                          v-model="oneRole.refund.refundDays"
                          placeholder="Enter something..."
                          style="width: 80px"
                        />天可退款
                      </Radio>
                    </RadioGroup>
                  </div>
                </div>
              </li>
              <li>
                <span>是否发放补助</span>
                <div class="li-subsidy">
                  <RadioGroup v-model="oneRole.isHaveSubsidy">
                    <Radio label="1">是</Radio>
                    <Radio label="2">否</Radio>
                  </RadioGroup>
                  <div class="li-subsidys" v-if="oneRole.isHaveSubsidy==1">
                    <p>
                      <span>补助类型：</span>
                      <RadioGroup v-model="oneRole.subsidyType">
                        <Radio label="1">现金</Radio>
                        <Radio label="2">物质</Radio>
                      </RadioGroup>
                    </p>
                    <p v-if='oneRole.subsidyType==1'>
                      <Input placeholder="请输入补助金额" v-model="oneRole.subsidyCash" type="number"></Input>
                    </p>
                    <p v-if='oneRole.subsidyType==2'>
                      <span>物资类型：</span>
                      <Select v-model="oneRole.resourcesName" style="width:100px">
                        <Option
                          v-for="item in batchItemList.resources"
                          :value="item.name"
                          :key="item.name"
                          @click.native='getResources(item)'
                        >{{ item.name }}</Option>
                      </Select>
                      <Input
                        v-model="oneRole.resourcesRemark"
                        placeholder="备注"
                        style="width: 100px"
                      />
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <span>限制设置</span>
                <div class="impose">
                  <table v-for="(item,index) in oneRole.signRuleList" :key='index'>
                      <tr v-if="item.ruleId==21 || item.ruleId==3">
                        <td>年龄限制</td>
                        <td>
                          <Input
                            v-model="value"
                            placeholder="Enter something..."
                            style="width: 70px"
                          />
                          <b>——</b>
                          <Input
                            v-model="value"
                            placeholder="Enter something..."
                            style="width: 70px"
                          />
                        </td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==6">
                        <td>所属家长小组限制</td>
                        <td>
                          <Select v-model="item.ruleName" style="width:200px">
                            <Option
                              v-for="(item,i) in  signLimitsList[0].data"
                              :value="item.name"
                              :key="i"
                              @click.native="getLimitValue1(item,i)"
                            >{{ item.name }}</Option>
                          </Select>
                        </td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==7">
                        <td>障碍类型</td>
                        <td>
                          <Select v-model="item.ruleName" style="width:200px">
                            <Option
                              v-for="(item,i) in  signLimitsList[1].data"
                              :value="item.name"
                              :key="i"
                              @click.native="getLimitValue1(item,i)"
                            >{{ item.name }}</Option>
                          </Select>
                        </td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==8">
                        <td>本月生日</td>
                        <td></td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==9">
                        <td>限VIP</td>
                        <td></td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==22 || item.ruleId==4">
                        <td>居住地区限制</td>
                        <td>
                          <selects @change='getAddr'></selects>
                        </td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==2">
                        <td>志愿特长</td>
                        <td>
                          <Select v-model="item.ruleName" style="width:200px">
                            <Option
                              v-for="(item,i) in  signLimitsList[0].data"
                              :value="item.name"
                              :key="i"
                              @click.native="getLimitValue1(item,i)"
                            >{{ item.name }}</Option>
                          </Select>
                        </td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==5">
                        <td>所属社团限制</td>
                        <td>
                          <Select v-model="item.ruleName" style="width:200px">
                            <Option
                              v-for="(item,i) in  signLimitsList[0].data"
                              :value="item.name"
                              :key="i"
                              @click.native="getLimitValue1(item,i)"
                            >{{ item.name }}</Option>
                          </Select>
                        </td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                  </table>
                  <!-- <div class="impose-text">
                    <a>+新增限制条件</a>
                  </div> -->
                  <div class="impose-div">
                    <span>常用限制项</span>
                    <div v-for="item in signLimitsList">
                      <Button @click.native="getLimits(item)">{{item.name}}</Button>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span>报名时间</span>
                <Row>
                  <Col span="8">
                    <Date-picker
                      type="datetimerange" 
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择日期"
                      style="width: 300px"
                      @on-change="getDate"
                    ></Date-picker>
                  </Col>
                </Row>
              </li>
              <li>
                <span>取消时间</span>
                <Row>
                  <Col span="8">
                    <Date-picker
                      type="datetimerange" 
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择日期"
                      style="width: 300px"
                      @on-change="getDatea"
                    ></Date-picker>
                  </Col>
                </Row>
              </li>
              <li>
                <span>集合时间</span>
                <Row>
                  <Col span="12">
                    <Date-picker
                      type="date" 
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择日期"
                      style="width: 300px"
                      @on-change="getDates"
                    ></Date-picker>
                  </Col>
                </Row>
              </li>
              <li>
                <span>集合地址</span>
                <iframe id="mapPage" width="100%" height="500px" frameborder=0 src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=CEIBZ-KTJR3-XOB37-Y5LZ6-ZGMLH-CSF75&referer=myapp">
                </iframe>
              </li>
              <li>
                <span>优先限制</span>
                <div class="impose">
                  <table>
                    <thead>
                      <th>优先级别</th>
                      <th>优先项</th>
                      <th>操作</th>
                    </thead>
                    <tbody v-for="(item,index) in oneRole.choiceRuleList">
                      <tr>
                        <td>{{index+1}}.{{item.firstName}}</td>
                        <td>
                          <Button @click.native="sortFirst(index)">上移</Button>
                        </td>
                        <td>
                          <Button @click.native="deleteFirst(index)">删除</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- <div class="impose-text">
                    <a>+新增优先条件</a>
                  </div> -->
                  <div class="impose-div">
                    <span>优先规则项</span>
                    <Button v-for="item in firstItemList" @click.native="getFirst(item)">{{item.name}}</Button>
                  </div>
                </div>
              </li>
              <li class="other">
                <span>是否自动筛选替补人员</span>
                <RadioGroup v-model="oneRole.isAutoChoose">
                  <Radio label="0" :true-value='0'>是</Radio>
                  <Radio label="1" :true-value='1'>否</Radio>
                </RadioGroup>
              </li>
              <!-- <li class="other">
                <span>是否发放志愿证书</span>
                <RadioGroup v-model="oneRole.isAutoChoose">
                  <Radio label="0" :true-value='0'>是</Radio>
                  <Radio label="1" :true-value='1'>否</Radio>
                </RadioGroup>
              </li> -->
              <li>
                <span>报名项设置</span>
                <div class="impose">
                  <div v-for="(item,index) in oneRole.itemList" :key="index">
                    <div class="ls-item" v-if='!item.isNew'>
                      <div>{{item.itemName}}</div>
                      <Checkbox v-model="item.isMust" :true-value='1'>必填</Checkbox>
                      <Button @click.native="deleteItem(index)">删除</Button>
                    </div>
                    <div class="ls-item flex-between" v-else-if=" item.type === 1 ">
                      <i-input placeholder="请输入单文本标题" v-model="item.context" :disabled="isDisb" />
                      <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                      <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                    </div>
                    <div class="ls-item flex-between" v-else-if=" item.type === 6 ">
                      <i-input placeholder="请输入多行文本标题" v-model="item.context" :disabled="isDisb" />
                      <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                      <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                    </div>
                    <div class="ls-item" v-else-if="item.type === 3 ">
                      <div class="flex-between">
                        <i-input placeholder="请输入单选标题" v-model="item.context" :disabled="isDisb" />
                        <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                        <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                      </div>
                      <div class="item flex-between" v-for="(val,i) in item.answer" :key="i">
                        <i-input :placeholder="`输入选项${i+1}`" v-model="val.answer" :disabled="isDisb" />
                        <span @click="deleteItems(index,i)" v-if="!isDisb">x</span>
                      </div>
                      <div class="item-add" @click="addItemIput(index)" v-if="!isDisb">+</div>
                    </div>
                    <div class="ls-item" v-else>
                      <div class="flex-between">
                        <i-input placeholder="请输入多选标题" v-model="item.context" :disabled="isDisb" />
                        <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                        <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                      </div>
                      <div class="item flex-between" v-for="(val,i) in item.answer" :key="i">
                        <input :placeholder="`输入选项${i+1}`" v-model="val.answer" :disabled="isDisb" />
                        <span @click="deleteItems(index,i)" v-if="!isDisb">x</span>
                      </div>
                      <div class="item-add" @click="addItemIput(index)" v-if="!isDisb">+</div>
                    </div>
                  </div>
                  <div class="apply">
                    <!-- <div class="adds">
                      <a>新增报名项</a>
                    </div> -->
                    <div class="apply-btn">
                      <p class="apply-btn-p">
                        <span>常用报名项</span>
                        <Button v-for="item in signItemList" @click.native="getSign(item)">{{item.name}}</Button>
                        
                      </p>
                      <p class="apply-btn-p">
                        <span>自定义报名项</span>
                        <Button v-for="item in signList" @click.native="addSign(item)">{{item.itemName}}</Button>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span>群二维码</span>
                <div class="start-wap">
                  <div class="upload" v-if='oneRole.qrCodeShow == null'>
                      <div class="file" @click="()=>{ this.$refs.files.click()}">
                        <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" style="display:none" >
                        <Icon type="md-cloud-upload" :size='36' color="#2d8cf0"/>
                      </div>
                  </div>
                  <img class="imgs" v-else :src="oneRole.qrCodeShow"/>
                  <Icon src="" alt="" v-if='oneRole.qrCodeShow == null' class="cancel" @click="cancelImg()"/>
                </div>
              </li>
            </ul>
          </li>
          <li v-if="oneRole.zmType==2">
            <ul>
              <li>
                <span>票价</span>
                <div class="tables">
                  <table>
                    <tr>
                      <th>票价</th>
                      <th>VIP价</th>
                      <th>数量</th>
                      <th>可预约数量</th>
                      <th>可获得积分</th>
                    </tr>
                    <tr>
                      <td>
                        <Input v-model="oneRole.amount" placeholder="请输入..." style="width: 90px"></Input>
                      </td>
                      <td>
                        <Input v-model="oneRole.vipAmount" placeholder="请输入..." style="width: 90px"></Input>
                      </td>
                      <td>
                        <Input v-model="oneRole.recruitNum" placeholder="请输入..." style="width: 90px"></Input>
                      </td>
                      <td>
                        <Input v-model="oneRole.apptNum" placeholder="请输入..." style="width: 90px"></Input>
                      </td>
                      <td>
                        <Input v-model="oneRole.score" placeholder="请输入..." style="width: 90px"></Input>
                      </td>
                    </tr>
                  </table>
                  <div class="audit">
                    <span class="audit-span">是否审核</span>
                    <i-switch v-model="oneRole.isHaveSubsidy" @on-change="change" :true-value='1' :false-value='2' />
                    <span>报名后需要我审核</span>
                  </div>
                </div>
              </li>
              <li>
                <span>退款设置</span>
                <div class="refund">
                  <p>
                    支持退款
                    <i-switch v-model="oneRole.refund.refundRule" @on-change="refund" :false-value='3' :true-value='1 || 2' />
                  </p>
                  <div class="refund-div" v-if="oneRole.refund.refundRule==1 || oneRole.refund.refundRule==2">
                    <RadioGroup v-model="oneRole.refund.refundRule" vertical @on-change='getRefund'>
                      <Radio label="1" :true-value='1'>活动结束前均可退款</Radio>
                      <Radio label="2" :true-value='2'>
                        活动开始前
                        <Input
                          v-model="oneRole.refund.refundDays"
                          placeholder="Enter something..."
                          style="width: 80px"
                        />天可退款
                      </Radio>
                    </RadioGroup>
                  </div>
                </div>
              </li>
              <li>
                <span>是否发放补助</span>
                <div class="li-subsidy">
                  <RadioGroup v-model="oneRole.isHaveSubsidy">
                    <Radio label="1">是</Radio>
                    <Radio label="2">否</Radio>
                  </RadioGroup>
                  <div class="li-subsidys" v-if="oneRole.isHaveSubsidy==1">
                    <p>
                      <span>补助类型：</span>
                      <RadioGroup v-model="oneRole.subsidyType">
                        <Radio label="1">现金</Radio>
                        <Radio label="2">物质</Radio>
                      </RadioGroup>
                    </p>
                    <p v-if='oneRole.subsidyType==1'>
                      <Input placeholder="请输入补助金额" v-model="oneRole.subsidyCash" type="number"></Input>
                    </p>
                    <p v-if='oneRole.subsidyType==2'>
                      <span>物资类型：</span>
                      <Select v-model="oneRole.resourcesName" style="width:100px">
                        <Option
                          v-for="item in batchItemList.resources"
                          :value="item.name"
                          :key="item.name"
                          @click.native='getResources(item)'
                        >{{ item.name }}</Option>
                      </Select>
                      <Input
                        v-model="oneRole.resourcesRemark"
                        placeholder="备注"
                        style="width: 100px"
                      />
                    </p>
                  </div>
                </div>
              </li>
              <li>
                <span>限制设置</span>
                <div class="impose">
                  <table v-for="(item,index) in oneRole.signRuleList">
                      <tr v-if="item.ruleId==21 || item.ruleId==3">
                        <td>年龄限制</td>
                        <td>
                          <Input
                            v-model="value"
                            placeholder="Enter something..."
                            style="width: 70px"
                          />
                          <b>——</b>
                          <Input
                            v-model="value"
                            placeholder="Enter something..."
                            style="width: 70px"
                          />
                        </td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==6">
                        <td>所属家长小组限制</td>
                        <td>
                          <Select v-model="item.ruleName" style="width:200px">
                            <Option
                              v-for="(item,i) in  signLimitsList[0].data"
                              :value="item.name"
                              :key="i"
                              @click.native="getLimitValue1(item,i)"
                            >{{ item.name }}</Option>
                          </Select>
                        </td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==7">
                        <td>障碍类型</td>
                        <td>
                          <Select v-model="item.ruleName" style="width:200px">
                            <Option
                              v-for="(item,i) in  signLimitsList[1].data"
                              :value="item.name"
                              :key="i"
                              @click.native="getLimitValue1(item,i)"
                            >{{ item.name }}</Option>
                          </Select>
                        </td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==8">
                        <td>本月生日</td>
                        <td></td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==9">
                        <td>限VIP</td>
                        <td></td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==22 || item.ruleId==4">
                        <td>居住地区限制</td>
                        <td></td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==2">
                        <td>志愿特长</td>
                        <td>
                          <Select v-model="item.ruleName" style="width:200px">
                            <Option
                              v-for="(item,i) in  signLimitsList[0].data"
                              :value="item.name"
                              :key="i"
                              @click.native="getLimitValue1(item,i)"
                            >{{ item.name }}</Option>
                          </Select>
                        </td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                      <tr v-if="item.ruleId==5">
                        <td>所属社团限制</td>
                        <td>
                          <Select v-model="item.ruleName" style="width:200px">
                            <Option
                              v-for="(item,i) in  signLimitsList[0].data"
                              :value="item.name"
                              :key="i"
                              @click.native="getLimitValue1(item,i)"
                            >{{ item.name }}</Option>
                          </Select>
                        </td>
                        <td>
                          <Button @click.native="deleteLimits(index)">删除</Button>
                        </td>
                      </tr>
                  </table>
                  <!-- <div class="impose-text">
                    <a>+新增限制条件</a>
                  </div> -->
                  <div class="impose-div">
                    <span>常用限制项</span>
                    <div v-for="item in signLimitsList">
                      <Button @click.native="getLimits(item)">{{item.name}}</Button>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span>报名时间</span>
                <Row>
                  <Col span="8">
                    <Date-picker
                      type="datetimerange" 
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择日期"
                      style="width: 300px"
                      @on-change="getDate"
                    ></Date-picker>
                  </Col>
                </Row>
              </li>
              <li>
                <span>取消时间</span>
                <Row>
                  <Col span="8">
                    <Date-picker
                      type="datetimerange" 
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择日期"
                      style="width: 300px"
                      @on-change="getDatea"
                    ></Date-picker>
                  </Col>
                </Row>
              </li>
              <li>
                <span>集合时间</span>
                <Row>
                  <Col span="12">
                    <Date-picker
                      type="date" 
                      format="yyyy-MM-dd HH:mm"
                      placement="bottom-end"
                      placeholder="选择日期"
                      style="width: 300px"
                      @on-change="getDates"
                    ></Date-picker>
                  </Col>
                </Row>
              </li>
              <li>
                <span>集合地址</span>
                <iframe id="mapPage" width="100%" height="500px" frameborder=0 src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=CEIBZ-KTJR3-XOB37-Y5LZ6-ZGMLH-CSF75&referer=myapp">
                </iframe>
              </li>
              <li>
                <span>优先限制</span>
                <div class="impose">
                  <table>
                    <thead>
                      <th>优先级别</th>
                      <th>优先项</th>
                      <th>操作</th>
                    </thead>
                    <tbody v-for="(item,index) in oneRole.choiceRuleList">
                      <tr>
                        <td>{{index+1}}.{{item.firstName}}</td>
                        <td>
                          <Button @click.native="sortFirst(index)">上移</Button>
                        </td>
                        <td>
                          <Button @click.native="deleteFirst(index)">删除</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- <div class="impose-text">
                    <a>+新增优先条件</a>
                  </div> -->
                  <div class="impose-div">
                    <span>优先规则项</span>
                    <Button v-for="item in firstItemList" @click.native="getFirst(item)">{{item.name}}</Button>
                  </div>
                </div>
              </li>
              <li class="other">
                <span>是否自动筛选替补人员</span>
                <RadioGroup v-model="oneRole.isAutoChoose">
                  <Radio label="0" :true-value='0'>是</Radio>
                  <Radio label="1" :true-value='1'>否</Radio>
                </RadioGroup>
              </li>
              <!-- <li class="other">
                <span>是否发放志愿证书</span>
                <RadioGroup v-model="oneRole.isAutoChoose">
                  <Radio label="0" :true-value='0'>是</Radio>
                  <Radio label="1" :true-value='1'>否</Radio>
                </RadioGroup>
              </li> -->
              <li>
                <span>报名项设置</span>
                <div class="impose">
                  <div v-for="(item,index) in oneRole.itemList" :key="index">
                    <div class="ls-item" v-if='!item.isNew'>
                      <div>{{item.itemName}}</div>
                      <Checkbox v-model="item.isMust" :true-value='1'>必填</Checkbox>
                      <Button @click.native="deleteItem(index)">删除</Button>
                    </div>
                    <div class="ls-item flex-between" v-else-if=" item.type === 1 ">
                      <i-input placeholder="请输入单文本标题" v-model="item.context" :disabled="isDisb" />
                      <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                      <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                    </div>
                    <div class="ls-item flex-between" v-else-if=" item.type === 6 ">
                      <i-input placeholder="请输入多行文本标题" v-model="item.context" :disabled="isDisb" />
                      <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                      <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                    </div>
                    <div class="ls-item" v-else-if="item.type === 3 ">
                      <div class="flex-between">
                        <i-input placeholder="请输入单选标题" v-model="item.context" :disabled="isDisb" />
                        <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                        <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                      </div>
                      <div class="item flex-between" v-for="(val,i) in item.answer" :key="i">
                        <i-input :placeholder="`输入选项${i+1}`" v-model="val.answer" :disabled="isDisb" />
                        <span @click="deleteItems(index,i)" v-if="!isDisb">x</span>
                      </div>
                      <div class="item-add" @click="addItemIput(index)" v-if="!isDisb">+</div>
                    </div>
                    <div class="ls-item" v-else>
                      <div class="flex-between">
                        <i-input placeholder="请输入多选标题" v-model="item.context" :disabled="isDisb" />
                        <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                        <span @click="deleteItem(index)" v-if="!isDisb">删除</span>
                      </div>
                      <div class="item flex-between" v-for="(val,i) in item.answer" :key="i">
                        <input :placeholder="`输入选项${i+1}`" v-model="val.answer" :disabled="isDisb" />
                        <span @click="deleteItems(index,i)" v-if="!isDisb">x</span>
                      </div>
                      <div class="item-add" @click="addItemIput(index)" v-if="!isDisb">+</div>
                    </div>
                  </div>
                  <div class="apply">
                    <!-- <div class="adds">
                      <a>新增报名项</a>
                    </div> -->
                    <div class="apply-btn">
                      <p class="apply-btn-p">
                        <span>常用报名项</span>
                        <Button v-for="item in signItemList" @click.native="getSign(item)">{{item.name}}</Button>
                        
                      </p>
                      <p class="apply-btn-p">
                        <span>自定义报名项</span>
                        <Button v-for="item in signList" @click.native="addSign(item)">{{item.itemName}}</Button>
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <span>群二维码</span>
                <div class="start-wap">
                  <div class="upload" v-if='oneRole.qrCodeShow == null'>
                      <div class="file" @click="()=>{ this.$refs.files.click()}">
                        <input type="file"  accept=".jpg,.JPG,.gif,.GIF,.png,.PNG,.bmp,.BMP" ref="files" @change="uploadFile()" style="display:none" >
                        <Icon type="md-cloud-upload" :size='36' color="#2d8cf0"/>
                      </div>
                  </div>
                  <img class="imgs" v-else :src="oneRole.qrCodeShow"/>
                  <Icon src="" alt="" v-if='oneRole.qrCodeShow == null' class="cancel" @click="cancelImg()"/>
                </div>
              </li>
            </ul>
          </li>

          <li>
            <span>培训内容</span>
            <i-switch v-model="oneRole.isTrain" :true-value='1' :false-value='2' @on-change="change" />
            <Checkbox v-model="oneRole.isTrainMust" :true-value='1'>是否必填</Checkbox>
          </li>
          <!-- <li v-if="oneRole.isTrain==1">
            <span>
              <Button>选择模块</Button>
            </span>
            <Input v-model="value" placeholder="4" style="width: 200px" />
          </li> -->
          <!-- <li v-if="oneRole.isTrain==1">
            <span>培训标题</span>
            <Input v-model="value" placeholder="4" style="width: 200px" />
          </li>
          <li v-if="oneRole.isTrain==1">
            <span>培训图片</span>
            <div class="photo">
              <img />
            </div>
          </li>
          <li v-if="oneRole.isTrain==1">
            <span>培训视频</span>
            <div class="video">
              <img />
            </div>
          </li> -->
          <li class="rich-text" v-if="oneRole.isTrain==1">
            <span>培训详情</span>
            <div v-if="oneRole.isTrain === 1">
              <wangeditor :labels="oneRole.trainComments" id="ed1" @change="changeEditorTrain"></wangeditor>
            </div>
          </li>
          <li>
            <p>
              <span class="active-span">反馈内容</span>
              <i-switch v-model="oneRole.isFeedback" :true-value="1" :false-value="2" />
            </p>
            <div v-if="oneRole.isFeedback === 1">
              <div v-for="(item,index) in oneRole.fdList" :key="index">
                <div class="ls-item" v-if=" index ==0 ">
                  <div>反馈简介</div>
                  <Input
                    placeholder="请输入反馈内容"
                    class="txt"
                    v-model="item.context"
                    type="textarea"
                    :disabled="isDisb"
                  />
                </div>
                <div class="ls-item flex-between" v-else-if=" item.type === 1 ">
                  <i-input placeholder="请输入单文本标题" v-model="item.context" :disabled="isDisb" />
                  <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                  <span @click="deleItem(index)" v-if="!isDisb">删除</span>
                </div>
                <div class="ls-item flex-between" v-else-if=" item.type === 6 ">
                  <i-input placeholder="请输入多行文本标题" v-model="item.context" :disabled="isDisb" />
                  <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                  <span @click="deleItem(index)" v-if="!isDisb">删除</span>
                </div>
                <div class="ls-item" v-else-if="item.type === 3 ">
                  <div class="flex-between">
                    <i-input placeholder="请输入单选标题" v-model="item.context" :disabled="isDisb" />
                    <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                    <span @click="deleItem(index)" v-if="!isDisb">删除</span>
                  </div>
                  <div class="item flex-between" v-for="(val,i) in item.answer" :key="i">
                    <i-input :placeholder="`输入选项${i+1}`" v-model="val.answer" :disabled="isDisb" />
                    <span @click="deleItem(index,i)" v-if="!isDisb">x</span>
                  </div>
                  <div class="item-add" @click="addSignIput(index)" v-if="!isDisb">+</div>
                </div>
                <div class="ls-item" v-else>
                  <div class="flex-between">
                    <i-input placeholder="请输入多选标题" v-model="item.context" :disabled="isDisb" />
                    <Checkbox v-model="item.isMust" :true-value='1'>是否必填</Checkbox>
                    <span @click="deleItem(index)" v-if="!isDisb">删除</span>
                  </div>
                  <div class="item flex-between" v-for="(val,i) in item.answer" :key="i">
                    <input :placeholder="`输入选项${i+1}`" v-model="val.answer" :disabled="isDisb" />
                    <span @click="deleItem(index,i)" v-if="!isDisb">x</span>
                  </div>
                  <div class="item-add" @click="addSignIput(index)" v-if="!isDisb">+</div>
                </div>
              </div>
              <div class="add">
                <p>新增反馈项</p>
                <div class="flex-between">
                  <div
                    v-for="(item,index) in feedList"
                    :key="index"
                    class="add-item"
                    @click="addItem(item)"
                  >{{ item.name }}</div>
                </div>
              </div>
            </div>
          </li>
          <!-- <li v-if="oneRole.isFeedback === 1">
            <span>
              <Button>选择模块</Button>
            </span>
            <Input v-model="value" placeholder="4" style="width: 200px" />
          </li>
          <li v-if="oneRole.isFeedback === 1">
            <span>反馈标题</span>
            <Input v-model="value" placeholder="4" style="width: 200px" />
          </li> -->
        </ul>
      </div>
      <div class="btns-foot">
        <Button @click.native="cancel">取消</Button>
        <Button class="active" @click.native="save">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
import { batchItem,signType, signPost,signLimits,signItems,firstList } from "../../request/api";
import selects from'_c/selsect'

export default {
  props:['oneRole'],
  data() {
    return {
      // oneRole: {
      //   fdList:[{ name: '反馈简介', type: 0}],
      //   refund:{},
      //   signRuleList:[],
      //   itemList:[],
      //   choiceRuleList:[]
      // },
      signTypeList: [],
      signPostList: [],
      navigation1: {
        head: "编辑招募报名项-受益方(会员)"
      },
      animal: "",
      cityList: [
        {
          value: "beijing",
          label: "北京市"
        },
        {
          value: "shanghai",
          label: "上海市"
        }
      ],
      model1: "",
      value: "",
      fruit: "先到先得",
      switch1: false,
      animal: "金斑蝶",
      subsidys: false,
      single: false,
      others: true,
      // 富文本editor
      editor1: {
        contents: ""
      },
      feedList:[
        { name: '单行文本', type: 1},
        { name: '多行文本', type: 6},
        { name: '单选问题', type: 3, answer: [{ answer: '' }, { answer: '' }, { answer: '' }]},
        { name: '多选问题', type: 4, answer: [{ answer: '' }, { answer: '' }, { answer: '' }]}
      ],
      isDisb:false,
      batchItemList:[],
      userId:1,
      signLimitsList:[],
      signList: [
        { itemName: '单行文本', type: 1, isNew:1},
        { itemName: '多行文本', type: 6, isNew: 1},
        { itemName: '单选问题', type: 3, answer: [{ answer: '' }, { answer: '' }, { answer: '' }], isNew: 1},
        { itemName: '多选问题', type: 4, answer: [{ answer: '' }, { answer: '' }, { answer: '' }], isNew: 1}
      ],
      signItemList:[],
      firstItemList:[]
    };
  },
  mounted() {
    // var editor1 = new E('.editorElem1');
    // var editor2 = new E('.editorElem2');
    // editor1.customConfig.onchange = (html) => {
    //   this.editorContent1 = html
    // };
    // editor2.customConfig.onchange = (html) => {
    //   this.editorContent2 = html
    // };
    // editor1.create()
    // editor2.create()
  },
  components: {selects},

  computed: {},

  created() {
    this.getSignType();
    this.getBatchItem();
  },

  methods: {
    //批次活动前置信息查询
    getBatchItem(){
      batchItem({
        userId:this.userId
      }).then(res => {
        console.log(res);
        this.batchItemList = res.data
      });
    },
    change(status) {
      this.$Message.info("开关状态：" + status);
    },
    refund(e){
      console.log(e)
    },
    //招募类型
    getSignType() {
      signType({}).then(res => {
        this.signTypeList = res.data.roles;
      });
    },
    //招募类型
    getType(val) {
      this.oneRole.roleName = val.name;
      this.oneRole.roleId = val.roleId;
      signPost({
        roleId: val.roleId,
        name: val.name
      }).then(res => {
        this.signPostList = res.data.voluJobs;
      });
      signLimits({
        userId:this.userId,
        roleId:val.roleId
      }).then(res=>{
        this.signLimitsList = res.data
      })
      signItems({
        roleId:val.roleId
      }).then(res=>{
        this.signItemList = res.data
      })
      firstList({
        roleId:val.roleId
      }).then(res=>{
        this.firstItemList = res.data
      })
    },
    //招募岗位
    getPost(val) {
      this.oneRole.positionName = val.name;
      this.oneRole.userPosition = val.roleId;
    },
    addItem(e){
      this.oneRole.fdList.push(e)
    },
    deleItem(e,ei){
      if(ei>=0){
        if(this.oneRole.fdList[e].answer.length>2){
          this.oneRole.fdList[e].answer.splice(ei,1)
        }else{
          this.$Message.warning("至少需要两个选项")
        }
      }else{
        this.oneRole.fdList.splice(e,1)
      }
    },
    addSignIput(e){
      if(this.oneRole.fdList[e].answer.length<6){
        this.oneRole.fdList[e].answer.push({answer:''})
      }else{
        this.$Message.warning("最多只可添加6个选项")
      }
    },
    getRefund(){
      console.log(this.oneRole.refund.refundRule)
    },
    getResources(e){
      this.oneRole.resourcesId = e.resourcesId
      this.oneRole.resourcesName = e.name
    },
    //获取日期
    getDate(e) {
      this.oneRole.enrollStarttime = e[0];
      this.oneRole.enrollStarttime = e[1];
    },
    //获取日期
    getDatea(e) {
      this.oneRole.outrollEndtime = e[0];
      this.oneRole.outrollEndtime = e[1];
    },
    //获取日期
    getDates(e) {
      this.oneRole.setTime = e
    },
    getLimits(e){
      console.log(e)
      this.oneRole.signRuleList.push({ruleId:e.ruleId})
    },
    deleteLimits(e){
      this.oneRole.signRuleList.splice(e,1)
    },
    getLimitValue1(e,ei){
      this.oneRole.signRuleList[ei].ruleValue = e.orgId
      this.oneRole.signRuleList[ei].ruleName = e.name
    },
    getSign(e){
      console.log(e)
      this.oneRole.itemList.push({
        itemId : e.itemId,
        itemName : e.name,
        type : e.typeFlag
      })
    },
    deleteItem(e){
      this.oneRole.itemList.splice(e,1)
    },
    deleteItems(e,ei){
      if(ei>=0){
        if(this.oneRole.itemList[e].answer.length>2){
          this.oneRole.itemList[e].answer.splice(ei,1)
        }else{
          this.$Message.warning("至少需要两个选项")
        }
      }else{
        this.oneRole.itemList.splice(e,1)
      }
    },
    addSign(e){
      this.oneRole.itemList.push(e)
    },
    addItemIput(e){
      if(this.oneRole.itemList[e].answer.length<6){
        this.oneRole.itemList[e].answer.push({answer:''})
      }else{
        this.$Message.warning("最多只可添加6个选项")
      }
    },
    getFirst(e){
      let m = {}
      let n = this.oneRole.choiceRuleList
      let isAdd = true
      if (n.length == 0) {
        m.ruleId = e.ruleId
        m.firstName = e.name
        n.push(m)
      } else {
        for (let i = 0; i < n.length; i++) {
          if (n[i].ruleId == e.ruleId) {
            isAdd = false
          }
        }
        if (isAdd) {
          m.ruleId = e.ruleId
          m.firstName = e.name
          n.push(m)
        } else {
          this.$Message.warning("已有该设置项，请勿重复添加")
        }
      }
      this.oneRole.choiceRuleList = n
    },
    deleteFirst(e){
      this.oneRole.choiceRuleList.splice(e,1)
    },
    sortFirst(e){
      let m = this.oneRole.choiceRuleList
      if(e==0){
        this.$Message.warning("已经置顶，请勿继续操作")
      }else{
        m[e-1] = m.splice(e,1,m[e-1])[0]
        this.oneRole.choiceRuleList = m
      }
    },
    cancel(){
      this.$emit("cancelEdit",false)
    },
    save(){
      console.log(this.oneRole)
      this.$emit("oneRole",this.oneRole)
    },
    changeEditorTrain(e){
      this.oneRole.trainComments = e
    },
    getAddr(e){
      console.log(e)
      for(let i in this.oneRole.signRuleList){
        if(i.ruleId==22 || i.ruleId==4){
          this.oneRole.signRuleList[i].ruleValue = e[0] + ',' + e[1] + ',' + e[2]
        }
      }
    },
    uploadFile() {
      let file = this.$refs.files.files[0]
      const dataForm = new FormData()
      dataForm.append('file', file)
      upload(dataForm).then(res => {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e) => {
          console.log(e)
          this.oneRole.qrCodeShow = e.target.result
          this.oneRole.qrCode = res.data
        }
      })
    },
    cancelImg(){
      orgimgdel({path:this.oneRole.qrCode}).then(res => {
        this.oneRole.qrCodeShow = null
        this.oneRole.qrCode = null
        this.$Message.success('删除成功')
      })
    },
  }
};
</script>
<style lang="scss" scoped>
.compole {
  .compole-head {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    border-bottom: #e4e4e4 1px solid;
  }
  .compole-content {
    padding: 10px 0;
    width: 900px;
    background: #ffffff;
    ul {
      padding-left: 50px;
      li {
        display: flex;
        margin: 20px 0;
        span {
          display: block;
          width: 140px;
          height: 40px;
          // line-height: 40px;
          font-size: 14px;
          // margin: 0 50px;
        }
        .ivu-switch-default {
          width: 45px;
          height: 23px;
          margin-right: 20px;
        }
        .tables {
          table {
            width: 620px;
            th {
              background: #f2f2f2;
              text-align: center;
              height: 45px;
              border-left: #e4e4e4 1px solid;
              line-height: 45px;
              width: 100px;
            }
            td {
              height: 70px;
              background: #ffffff;
              text-align: center;
              line-height: 70px;
            }
          }
        }
        .audit {
          display: flex;
          background: #e4e4e4;
          align-items: center;
          padding-left: 10px;
          span {
            line-height: 40px;
          }
          .audit-span {
            width: 80px;
          }
        }
        .refund {
          p {
            display: flex;
            align-items: flex-start;
          }

          span {
            margin: 0 10px;
            font-size: 14px;
          }
          .refund-div {
            margin-top: 10px;
            border: 1px solid #e4e4e4;
            width: 600px;
            height: 80px;
            padding: 7px;
          }
        }
        .li-subsidy {
          .li-subsidys {
            p {
              display: flex;
              align-items: center;
              span {
                line-height: 40px;
                width: 70px;
              }
            }
          }
        }

        .impose {
          border: #e4e4e4 1px solid;
          table {
            // border-bottom: 0;

            th {
              width: 200px;
              text-align: center;
              font-size: 14px;
              line-height: 40px;
              background: #e4e4e4;
              border: #e4e4e4 1px solid;
            }
            td {
              font-size: 14px;
              text-align: center;
              height: 50px;
              line-height: 50px;
            }
          }

          .ivu-radio-default {
            margin: 5px 10px;
          }
        }

        .impose-div {
          display: flex;
          background: #e4e4e4;
          align-items: center;
          justify-content: space-around;
          span {
            text-align: center;
            line-height: 40px;
          }
          button {
            margin: 0px 5px;
            width: 100px;
          }
          .takes {
            width: 120px;
          }
        }

        .impose-text {
          text-align: center;
          height: 40px;
          line-height: 40px;
          border: #e4e4e4 1px solid;
          a {
            color: #339933;
            font-size: 14px;
          }
        }

        .company {
          border-bottom: #e4e4e4 1px solid;
        }

        .imgess {
          height: 150px;
          width: 240px;
          background: #e4e4e4;
        }

        .apply-btn {
          height: 100px;
          background: #e4e4e4;
          .apply-btn-p {
            margin: 10px 0;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            span {
              line-height: 40px;
              text-align: center;
            }
            button {
              margin: 0 10px;
              height: 30px;
            }
          }
        }

        .adds {
          height: 40px;
          text-align: center;
          line-height: 40px;
          border-bottom: #e4e4e4 solid 1px;
          a {
            color: #339933;
          }
        }

        .video,
        .photo {
          height: 150px;
          width: 300px;
          background: #e4e4e4;
        }
      }

      .rich-text {
        display: flex;
        flex-direction: column;
        span {
          height: 30px;
        }
        .rich-texts {
          height: 240px;
          width: 600px;
          background: #e4e4e4;
          border: #e4e4e4 solid 1px;
        }
      }
    }
  }
  .btns-foot {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    button {
      margin: 0 10px;
      width: 140px;
    }
    .active {
      background: #339933;
      color: #ffffff;
    }
  }
}
.ivu-select-default {
  margin-right: 10px;
}
.other {
  span {
    margin-right: 20px;
  }
}
.start-wap{
    position: relative;
    height: 150px;
    width: 300px;
    .cancel{
      width: 30px;
      height: 30px;
      background: #000;
      position: absolute;
      top: 10px;
      right: 10px;
    }
    .upload .file{
      height: 150px;
      width: 300px;
      border: 1px dashed #dcdee2;
      text-align: center;
      padding: 20px 0;
    }
    .upload .file:hover{
      border: 1px dashed #2d8cf0;
    }
    .upload .file input{
      display: none;
    }
  }
</style>
