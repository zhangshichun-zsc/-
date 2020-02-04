<template>
  <Form class="approval-form-3" ref="form" :model="form" :rules="rules" :label-width="80">
    <Row :gutter="16" class="mt-16">
      <Col span="12">
        <div class="card">
          <FormItem label="项目">{{originData.base.categoryName}}</FormItem>
          <FormItem label="活动预算" prop="budget">
            <InputNumber v-model="form.budget" placeholder="请输入活动预算金额" />
          </FormItem>
          <FormItem label="有效期限" prop="startT">
            <XDatePicker type="datetimerange"
              :value="[form.startT, form.endT]"
              format="yyyy-MM-dd HH:mm"
              :options="dateRangeOptions" placeholder="请选择活动有效时间区间"
              @on-change="onDateRangeChange" />
          </FormItem>
        </div>
        <div class="card mt-16 card2">
          <FormItem label="立项名称" prop="batchName">
            <Input v-model="form.batchName" placeholder="请输入立项名称" />
          </FormItem>
          <FormItem label="立项目的" prop="batchObjective">
            <Input v-model="form.batchObjective" placeholder="请输入活动目的" />
          </FormItem>
          <FormItem label="小组归属">{{originData.base.orgName}}</FormItem>
          <FormItem label="招募类型">{{originData.base.recruitType === '1' ? '整体招募' : '批次招募'}}</FormItem>
          <FormItem label="主题图片" prop="batchPic">
            <UploadImg :max="1"
              v-model="form.batchPic"
              :full-url.sync="form.batchPicShow"
              placeholder="请上传主题图片"
              :display-width="320"
              :crop-width="750" :crop-height="320" />
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
      <div class="accept-rule">
        <Radio v-model="accept" />
        <span>我同意</span>
        <span class="rule-link" @click="() => ruleVisible = true">《活动发布规则》</span>
      </div>
      <div class="flex-center-center">
        <Button shape="circle" class="action-btn"
          :loading="loading"
          @click="saveDraft">存为草稿</Button>
        <Button shape="circle" class="action-btn" @click="previous">上一步</Button>
        <Button type="primary" shape="circle" class="action-btn"
          :disabled="!accept"
          :loading="loading"
          @click="submit">提交审核</Button>
      </div>
    </div>
    <Modal v-model="ruleVisible" title="活动发布须知" width="800">
      <pre style="padding:0 12px;white-space: pre-wrap;">
这样的活动更容易被推荐：

主题明确、内容清晰、形式健康，有较大受众基础；

主办方信息齐全，包括名称、头像、简介；

活动标题简洁有效，活动海报设计精美，且与主题相匹配；

活动举办时间、地点明确，票种设置清晰；

活动详情亮点突出，层次鲜明，且排版图文并茂、干净整齐；

活动详情中不添加其它外链及公众号二维码；

活动详情中不添加大量营销型、煽动型文案；

活动报名、费用支付通过互动吧完成，无其它报名、支付方式；

设有会员价的活动能获得优先推荐。



这样的内容活动中不能出现，否则将被屏蔽或删除：

活动内容中禁止有诱导用户集赞、转发、分享朋友圈并关联奖励/奖项等形式的内容及文字；

活动内容中禁止涉及有引导购房、引导炒股、引导重金属等期货交易、引导炒币的内容，禁止涉及有ICO发行的内容；

活动内容中禁止有带有政治、色情、赌博、黑户、维权上访、捐款等或其他容易引起误解或歧义的内容及文字；

活动内容中禁止使用互动吧站外报名方式（包括但不限于引导外链报名、微信报名、公众号报名等）；

活动内容中禁止留有任何外部联系方式或者网站链接，包括但不限于手机号、微信、QQ、外网链接、二维码等；

活动内容中禁止有反对宪法所确定的基本原则的、危害国家安全，涉及国家领导人名字肖像等损害国家荣誉和利益、宣扬邪教和封建迷信等内容及文字；

活动内容中禁止有违反广告法等绝对化的语言文字或用语， 如最高、最大、最佳、顶级、极品、第一品牌、绝无仅有、顶尖、万能、第一、最高、唯一、国家级等；

活动内容属于无意义活动。
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
