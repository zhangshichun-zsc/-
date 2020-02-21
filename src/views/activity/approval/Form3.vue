<template>
  <Form class="approval-form-3" ref="form" :model="form" :rules="rules" :label-width="80">
    <Row :gutter="16" class="mt-16">
      <Col span="12">
        <div class="card">
          <FormItem label="项目">{{originData.base.categoryName}}</FormItem>
          <FormItem label="活动预算" prop="budget">
            <InputNumber :disabled='isEdit' v-model="form.budget" placeholder="请输入活动预算金额" />
          </FormItem>
          <FormItem label="项目周期" prop="startT">
            <XDatePicker
              :disabled='isEdit'
              type="datetimerange"
              :value="[form.startT, form.endT]"
              format="yyyy-MM-dd HH:mm"
              placeholder="请选择活动有效时间区间"
              @on-change="onDateRangeChange" />
          </FormItem>
        </div>
        <div class="card mt-16 card2">
          <FormItem label="立项名称" prop="batchName">
            <Input :disabled='isEdit' v-model="form.batchName" placeholder="请输入立项名称" />
          </FormItem>
          <FormItem label="立项目的" prop="batchObjective">
            <Input :disabled='isEdit' v-model="form.batchObjective" placeholder="请输入活动目的" />
          </FormItem>
          <FormItem label="小组归属">{{originData.base.orgName}}</FormItem>
          <FormItem label="招募类型">{{originData.base.recruitType === '1' ? '整体招募' : '批次招募'}}</FormItem>
          <FormItem label="主题图片" prop="batchPic">
            <UploadImg :max="1"
              :disabled='isEdit'
              v-model="form.batchPic"
              :full-url.sync="form.batchPicShow"
              placeholder="请上传主题图片"
             :display-width="160" 
              :crop-width="256"
              :crop-height="256"/>
          </FormItem>
        </div>
      </Col>
      <Col span="12">
        <div class="card">
          <div class="card-title">活动立项批次</div>
          <div class="batches">
            <div v-for="(batch, index) in originData.batches" :key="index" class="batch-item">
              <img v-preview :src="batch.actCoverShowPic" alt="">
              <div class="batch-info">
                <div class="batch-name" @click="editBatch(index)">{{batch.actName}}</div>
                <div>
                  <div>地点：{{batch.actAddress}}<span v-if="batch.addressSup">&nbsp;{{batch.addressSup}}</span></div>
                  <div>活动日期：{{batch.startT}} 至 {{batch.endT}}</div>
                  <div>招募：{{getConfCount(batch.userConfList)}}人</div>
                  <!-- <div>免费</div> -->
                </div>
              </div>
            </div>
            <CreatePane text="+新增批次" @click="addBatch" />
          </div>
        </div>
      </Col>
    </Row>
    <div class="mt-16 card">
      <div class="accept-rule" v-if="!isEdit">
        <Checkbox  v-model="accept" />
        <span>我同意</span>
        <span class="rule-link" @click="() => ruleVisible = true">《活动发布规则》</span>
      </div>
      <div class="flex-center-center">
        <Button shape="circle" class="action-btn"
          :loading="loading"
          @click="saveDraft">存为草稿</Button>
           <Button 
          v-if="isEdit"
          type="primary" 
          shape="circle" 
          class="action-btn"
          @click="$router.push({
            name:'project_approval'
          });"
          >保存活动</Button>
        <Button v-if="!isEdit" shape="circle" class="action-btn" @click="previous">上一步</Button>
        <Button 
          v-if="!isEdit"
          type="primary" 
          shape="circle" 
          class="action-btn"
          :disabled="!accept"
          :loading="loading"
          @click="submit">提交审核</Button>
      </div>
    </div>
    <Modal v-model="ruleVisible" title="活动发布须知" width="800">
      <h1 style="font-size: 18px;text-align: center;">融爱融乐之家活动发布规则</h1>
      <pre style="padding:0 12px;white-space: pre-wrap;font-size: 14px" >
欢迎您使用“融爱融乐之家”系统（以下简称“本系统”）及服务！ 

活动发布规则（以下简称“规则”）系家长小组或其他在本系统成功注册的用户就本系统活动发布规则的说明。

本规则为《用户服务协议》的组成部分，与《用户服务协议》具有同等的法律效力。
 
除非您已阅读并接受本规则及融爱融乐的相关协议、规则等所有条款，否则您无权使用活动信息发布功能。您使用活动信息发布功能，即视为您已阅读并同意上述协议、规则等的约束。

1.	本说明下的活动发布规则主要指融爱融乐的工作人员或者家长小组在本系统发布融合活动所应遵守的内容和条款。

2.	家长小组是由心智障碍家庭家长自发组成的互助小组。小组旨在通过培养核心家长，发挥家长的组织领导和社会倡导力，成为行动者，以此改善社区及社会对心智障碍人士的认知。

3.	您必须是成功在本系统成功注册的家长小组或其他系统授予发布活动权限的用户。您需要按活动立项页面的引导填写信息，包括但不限于立项名称、立项目的、小组归属、招募类型、活动申请预算、有效期限，阅读并同意《活动发布规则》且完成全部立项程序，经本系统审核通过后方能发布信息。

4.	审核的时间通常为5个工作日。但本系统有权根据特殊情况对审核时间进行调整。

5.	您特此保证，您发布的任何信息，不存在以下任何一种违反法律法规规定的情形：
1)	反对宪法所确定的基本原则；
2)	危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一；
3)	损害国家荣誉和利益；
4)	煽动民族仇恨、民族歧视、破坏民族团结；
5)	破坏国家宗教政策，宣扬邪教和封建迷信；
6)	散布谣言，扰乱社会秩序，破坏社会稳定；
7)	宣扬淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪；
8)	煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；
9)	诽谤他人，泄露他人隐私，侵害他人合法权益；
10)	含有法律、行政法规、政策禁止的其他内容的信息。

6.	您特此保证，您发布的任何信息，不存在以下任一不友善的行为：
1)	捏造、散布虚假事实，损害他人名誉；
2)	以不友好的方式激怒他人，意图使对方对自己的言论作出回应，蓄意制造事端；
3)	贬低他人的能力、行为、生理或身份特征，让对方难堪；
4)	以不文明的语言对他人进行负面评价；
5)	针对他人的民族、种族、宗教、性取向、性别、年龄、地域、生理特征等身份或者归类的攻击；
6)	许诺以不良的后果来迫使他人服从自己的意志。

7.	您特此保证，您发布的任何信息，不存在以下任一侵犯第三方权益的情形：
1)	任何侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；
2)	任何涉及他人隐私、个人信息或资料的内容；
3)	任何混淆行为，擅自使用包括但不限于社会组织名称（包括简称等）、企业名称（包括简称、字号等）、姓名（保留笔名、艺名、译名等）、域名主体部分、网站名称、网页等引人误认为是他人单位与他人存在特定联系的内容。

8.	您在发布信息时还应遵守以下条款：
1)	保证不发布与本平台志愿服务目的无关之信息；
2)	保证所发布的全部信息均为真实、有效的，没有任何虚假信息；
3)	保证不违反任何与您发布的信息相关的、与任何第三方（包括但不限于与投资者）之间的约定或承诺；
4)	保证不违反您所在机构或公司的规章制度。

9.	您理解并同意，本系统仅为网络服务提供者，为您提供的是信息分享、传播及获取的平台，您必须为自己注册账户下的一切行为负责，包括您所发布的任何内容、活动及由此产生的任何后果。

10.	您理解并同意，若您出现任何违反本规则及《用户服务协议》的行为的，本系统有权自行删除您发布的全部信息，无需另行事先通知，并有权采取冻结账户，要求您赔偿损失等措施。

11.	本系统有权随时根据法律、法规的变化以及融爱融乐经营策略的调整等修改本规则。修改后的规则将会通过适当的方式将进行公示。如您在本规则后修订后仍继续使用本系统的，则视为您接收本规则的修订。

      </pre>
    </Modal>
  </Form>
</template>

<script>
import CreatePane from './CreatePane'

const today = new Date()

export default {
  components: {
    CreatePane
  },
  props: {
    originData: Object,
    loading: Boolean
  },
  data() {
    return {
      accept: false,
      ruleVisible: false,
      form: {
        budget: null,
        startT: null,
        endT: null,
        batchName: '',
        batchObjective: '',
        batchPic: '',
        batchPicShow: ''
      },
      rules: {
        budget: { required: true, message: '活动预算不能为空' },
        startT: { required: true, message: '活动有效时间区间不能为空' },
        atchName: { required: true, message: '立项名称不能为空' },
        batchObjective: { required: true, message: '活动目的不能为空' },
        batchPic: { required: true, message: '主题图片不能为空' },
      },
      dateRangeOptions: {
        disabledDate (v) {
          return v < today
        }
      },
      // 是否从立项管理详情过来的  true, 是 false 不是 禁用 提交按钮，第一第三步，新增第二部 保存按钮
      isEdit: this.$route.query.isEdit?true:false

   }
  },
  watch: {
    'originData.base': {
      deep: true,
      handler (v) {
        if (v) {
          Object.keys(this.form).forEach(key => {
            this.form[key] = v[key]
          })
        }
      }
    }
  },
  methods: {
    onDateRangeChange(v) {
      this.form.startT = v[0]
      this.form.endT = v[1]
    },
    getConfCount(confList) {
      return confList.reduce((sum, conf) => sum + conf.recruitNum, 0)
    },
    editBatch(index) {
      this.$emit('edit-batch', index)
    },
    addBatch() {
      this.$emit('add-batch')
    },
    saveDraft() {
      this.$emit('draft', this.form)
    },
    previous() {
      this.$emit('previous', this.form)
    },
    async submit() {
      const valid = await this.$refs.form.validate()
      if (valid) {
        this.$emit('submit', this.form)
      }
    }
  }
}
</script>

<style lang="scss">
.approval-form-3 {
  .ivu-form-item-label {
    padding-right: 20px;
  }
  .card2 {
    .ivu-form-item-content {
      width: auto;
    }
  }
  .card-title {
    margin-bottom: 12px;
  }
  .batch-item {
    display: flex;
    align-items: center;
    padding: 16px;
    border: 1px dashed #ccc;
    border-radius: 4px;
    & + .batch-item {
      margin-top: 16px;
    }
    > img {
      width: 160px;
      height: 160px;
    }
    .batch-info {
      flex: 1;
      margin-left: 32px;
      color: #999;
    }
    .batch-name {
      font-size: 18px;
      margin-bottom: 12px;
      color: #666;
      cursor: pointer;
      &:hover {
        color: #000;
      }
    }
  }
  .accept-rule {
    margin-bottom: 20px;
    text-align: center;
    .rule-link {
      color: #FF565A;
      cursor: pointer;
    }
  }
  .activity-img {
    max-width: 100%;
  }
}
</style>
