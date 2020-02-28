<template>
  <Form
    class="approval-form-1"
    ref="form"
    :model="form"
    :rules="rules"
    :label-width="88"
  >
    <Row :gutter="16" class="mt-16">
      <Col span="12">
        <div class="card">
          <FormItem label="选择项目" prop="categoryId">
            <Select :disabled='isEdit' v-model="form.categoryId" placeholder="请选择项目">
              <Option
                v-for="category in baseData.categorys"
                :value="category.categoryId"
                :key="category.name"
                @click.native="onSelectCategory(category)"
                >{{ category.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="活动预算" prop="budget">
            <InputNumber 
              ref="budget"
              :disabled='isEdit'
              :value="form.budget"
              placeholder="请输入活动预算金额"
              @on-change="isNumber" />
          </FormItem>
          <FormItem label="项目周期" prop="startT">
            <XDatePicker
              :disabled='isEdit'
              type="datetimerange"
              :value="[form.startT, form.endT]"
              format="yyyy-MM-dd HH:mm"
              placeholder="请选择活动有效时间区间"
              @on-change="onDateRangeChange"
            />
          </FormItem>
        </div>
        <div class="card mt-16">
          <FormItem label="立项名称" prop="batchName">
            <Input :disabled='isEdit' v-model="form.batchName" placeholder="请输入立项名称" />
          </FormItem>
          <FormItem label="立项目的" prop="batchObjective">
            <Input :disabled='isEdit' v-model="form.batchObjective" placeholder="请输入活动目的" />
          </FormItem>
          <FormItem label="主题图片" prop="batchPic">
            <UploadImg
              :disabled='isEdit'
              :max="1"
              v-model="form.batchPic"
              :full-url.sync="form.batchPicShow"
              placeholder="请上传主题图片"
              :display-width="160" 
              :crop-width="256"
              :crop-height="256"
            />
          </FormItem>
          <FormItem label="小组归属" prop="orgId">
            <Select :disabled='isEdit' v-model="form.orgId" placeholder="请选择小组归属">
              <Option
                v-for="org in baseData.org1s"
                :value="org.orgId"
                :key="org.orgId"
                @click.native="onSelectOrg(org)"
                >{{ org.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem label="招募类型" prop="recruitType">
            <RadioGroup v-model="form.recruitType">
              <Radio :disabled='isEdit' label="1">整体招募</Radio>
              <Radio :disabled='isEdit' class="ml-16" label="2">批次招募</Radio>
            </RadioGroup>
          </FormItem>
        </div>
      </Col>
      <Col span="12">
        <div class="card">
          <div class="list-wrapper">
            <div class="list-header">合作方</div>
            <div style="height: 246px;overflow:auto">
              <table class="list-table">
                <tr v-for="(item, index) in form.partnerList" :key="index">
                  <td>{{ item.partName }}</td>
                  <td class="actions" width="120">
                    <div class="flex-center-start">
                      <a href @click.prevent="showPartner(item, index)">详情</a>
                      <Icon
                        type="md-remove-circle"
                        class="ml-16"
                        v-if="!isEdit"
                        @click.native="removePartner(index)"
                      />
                    </div>
                  </td>
                </tr>
                <tr class="create" v-if="isEdit && form.partnerList.length==0 "> 
                  <td colspan="2">
                    <CreatePane text="暂无合作方" />
                  </td>
                </tr>
                <tr class="create">
                  <td colspan="2">
                    <CreatePane v-if="!isEdit" text="+新增合作方" @click="addPartner" />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div v-if="baseData.org" class="card mt-16">
          <p class="propaganda-title" v-html="baseData.org.propagandaTitle"></p>
          <p class="propaganda-text" v-html="baseData.org.propagandaText"></p>
        </div>
      </Col>
    </Row>
    <div class="mt-16 card flex-center-center">
      <Button
        shape="circle"
        class="action-btn"
        :loading="loading"
        @click="saveDraft"
        >存为草稿</Button
      >
      <Button type="primary" shape="circle" class="action-btn" @click="next"
        >下一步</Button
      >
    </div>
    <Modal
      class="part-dialog"
      v-model="dialogVisible"
      title="设置活动合作方"
      width="640px"
    >
      <Form
        ref="dialogForm"
        :model="dialogForm"
        :rules="dialogRules"
        :label-width="80"
      >
        <FormItem label="合作方" prop="partName">
          <Input v-model="dialogForm.partName" placeholder="请输入合作方名称" />
        </FormItem>
        <FormItem label="介绍" prop="description">
          <Input
            type="textarea"
            v-model="dialogForm.description"
            placeholder="请输入合作方介绍"
          />
        </FormItem>
        <FormItem v-if="dialogVisible" label="图片">
          <UploadImg
            :max="1"
            v-model="dialogForm.partPic"
            :full-url.sync="dialogForm.partPicShow"
            placeholder="可上传合作方图片（可选）"
            :display-width="320"
            :crop-width="750"
            :crop-height="320"
          />
        </FormItem>
        <FormItem label="协议">
          <div
            v-for="(license, index) in dialogForm.agrees"
            :key="index"
            class="flex-center-center license-item"
          >
            <div class="content">
              <FormItem
                label="协议名称"
                :prop="'agrees.' + index + '.agreeName'"
                :rules="{ required: true, message: '协议名称不能未空' }"
              >
                <Input
                  v-model="license.agreeName"
                  placeholder="请输入协议名称"
                />
              </FormItem>
              <FormItem
                label="协议类型"
                :prop="'agrees.' + index + '.agreeTypeName'"
                :rules="{ required: true, message: '协议类型必选' }"
              >
                <Select
                  v-model="license.agreeTypeName"
                  placeholder="请选择协议类型"
                >
                  <Option
                    v-for="item in licenseTypes"
                    :value="item.dicId +''"
                    :key="item.value"
                    @click="onSelectAgreeType(license, item)"
                    >{{ item.name }}</Option
                  >
                </Select>
              </FormItem>
              <Row :gutter="20">
                <Col span="24">
                  <FormItem
                    label="甲方"
                    :prop="'agrees.' + index + '.partA'"
                    :rules="{ required: true, message: '甲方不能未空' }"
                  >
                    <Input
                      v-model="license.partA"
                      placeholder="请输入甲方名称"
                    />
                  </FormItem>
                </Col>
                <Col span="24">
                  <FormItem
                    label="乙方"
                    :prop="'agrees.' + index + '.partB'"
                    :rules="{ required: true, message: '乙方不能未空' }"
                  >
                    <Input
                      v-model="license.partB"
                      placeholder="请输入乙方名称"
                    />
                  </FormItem>
                </Col>
              </Row>
              <FormItem label="附件">
                <FileUploader
                  :single="false"
                  :default-list="dialogDefaultFileList[index]"
                  @uploaded="arg => onAttachmentUploaded(license, arg)"
                  @remove="arg => onRemoveAttachment(license, arg)"
                />
              </FormItem>
            </div>
            <Button type="error" @click="removeLicense(index)">删除</Button>
          </div>
          <CreatePane text="+新增协议" v-if='dialogForm.agrees.length<3' @click="addLicense" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" size="large" @click="modalCancel">取消</Button>
        <Button type="primary" size="large" @click="savePartner">确定</Button>
      </div>
    </Modal>
  </Form>
</template>

<script>
import { mapState } from "vuex";
import { projectItem, partner } from "@/request/api";
import cloneDeep from "lodash.clonedeep";
import CreatePane from "./CreatePane";

const today = new Date();

export default {
  props: {
    originData: Object,
    loading: Boolean
  },
  components: {
    CreatePane
  },
  data() {
    return {
      // 前置数据
      baseData: {},
      batchId: "",
      form: {
        // 后台
        channel: "3",
        categoryId: "",
        categoryName: "",
        budget: null,
        startT: "",
        endT: "",
        batchName: "",
        batchObjective: "",
        batchPic: "",
        batchPicShow: "",
        orgId: "",
        orgName: "",
        orgType: "",
        recruitType: "",
        partnerList: []
      },
      rules: {
        categoryId: { required: true, message: "项目名称不能为空" },
        budget: { required: true, message: "活动预算不能为空"},
        startT: { required: true, message: "活动有效时间区间不能为空" },
        batchName: { required: true, message: "立项名称不能为空" },
        batchObjective: { required: true, message: "活动目的不能为空" },
        batchPic: { required: true, message: "主题图片不能为空" },
        orgId: { required: true, message: "小组归属不能为空" },
        recruitType: { required: true, message: "招募类型必选" }
      },
      projects: [],
      dateRangeOptions: {
        disabledDate(v) {
          return v < today;
        }
      },
      // 小组归属列表
      orgs: [],
      // 弹框
      dialogVisible: false,
      dialogForm: {
        partName: "",
        description: "",
        partPic: "",
        partPicShow: "",
        agrees: []
      },
      // 当前编辑的索引
      dialogEditIndex: -1,
      dialogRules: {
        partName: { required: true, message: "合作方名称不能为空" },
        description: { required: true, message: "合作方介绍不能为空" }
      },
      // 协议类型列表
      licenseTypes: [],
      // orgId是否回滚过
      orgIdReverted: false,
      // 招募类型是否回滚过
      recruitTypeReverted: false,
      // 是否从立项管理详情过来的  true, 是 false 不是 禁用 提交按钮，第一第三步，新增第二部 保存按钮
      isEdit: this.$route.query.isEdit?true:false

    };
  },
  computed: {
    ...mapState(["userId"]),
    dialogDefaultFileList() {
      return (this.dialogForm.agress || []).map(license => {
        return (license.agFile || []).map(file => {
          return {
            name: file.name,
            url: file.path
          };
        });
      });
    }
  },
  watch: {
    originData: {
      immediate: true,
      handler(v) {
        if (v) {
          Object.assign(this.form, v);
        }
      }
    },
    "form.orgId"(newVal, oldVal) {
      if (this.orgIdReverted) {
        this.orgIdReverted = false;
        return;
      }
      if (newVal && oldVal) {
        this.$Modal.confirm({
          title: "提示",
          content:
            "修改归属小组会清空活动分类和模板，其他内容不变，是否确定修改?",
          onOk: () => {
            this.$emit("change-org");
          },
          onCancel: () => {
            this.form.orgId = oldVal;
            this.form.orgName = this.baseData.org1s.find(
              org => org.orgId === oldVal
            ).name;
            // 防止死循环
            this.orgIdReverted = true;
          }
        });
      }
    },
    "form.recruitType"(newVal, oldVal) {
      //  编辑状态下，有活动批次，也会 提示 修改活动批次
        if ( oldVal &&newVal === "1") {
          this.$emit("change-recruit-type");
        }
    }
  },
  methods: {
    onDateRangeChange(v) {
      this.form.startT = v[0];
      this.form.endT = v[1];
    },
    onSelectCategory(category) {
      this.form.categoryId = category.categoryId;
      this.form.categoryName = category.name;
    },
    onSelectOrg(org) {
      this.form.orgName = org.name;
      this.form.orgType = org.orgType;
    },
    onSelectAgreeType(license, type) {
      license.agreeType = type.dicId;
    },
    // 上传附件
    onAttachmentUploaded(license, { path, name }) {
      license.agFile.push({ path, name });
    },
    // 移除附件
    onRemoveAttachment(license, index) {
      license.agFile.splice(index, 1);
    },
    // 添加合作方
    addPartner() {
      this.$refs.dialogForm.resetFields();
      this.dialogEditIndex = -1;
      Object.assign(this.dialogForm, {
        partName: "",
        description: "",
        partPic: "",
        agrees: []
      });
      this.dialogVisible = true;
    },
    // 显示合作方详情
    showPartner(part, index) {
      const clone = cloneDeep(part);
      this.addPartner();
      this.dialogEditIndex = index;
      Object.assign(this.dialogForm, clone);
    },
    // 删除合作方
    removePartner(index) {
      this.form.partnerList.splice(index, 1);
    },
    // 添加协议
    async addLicense() {
      const valid = await this.$refs.dialogForm.validate();
      if (valid) {
        this.dialogForm.agrees.push({
          agreeName: "",
          agreeTypeName: "",
          partA: "",
          partB: "",
          agFile: []
        });
      }
    },
    // 删除协议
    removeLicense(index) {
      this.dialogForm.agrees.splice(index, 1);
    },
    async savePartner() {
      const valid = await this.$refs.dialogForm.validate();
      if (valid) {
        this.dialogVisible = false;
        const clone = cloneDeep(this.dialogForm);
        if (~this.dialogEditIndex) {
          this.form.partnerList.splice(this.dialogEditIndex, 1, clone);
        } else {
          this.form.partnerList.push(clone);
        }
      }
    },
    isNumber(e) {
      if (!this.util.isNumber(e)) {
          this.$Message.error('请输入大于0的整数')
          this.form.budget = ''
          this.$refs.budget.currentValue = ''
        } else{
         this.form.budget = e
        }
    },
    // 弹框
    modalCancel() {
      this.dialogVisible = false;
    },
    saveDraft() {
      this.$emit("draft", this.form);
    },
    async next() {
      const valid = await this.$refs.form.validate();
      if (valid) {
        this.$emit("next", this.form);
      }
    }
  },
  mounted() {
    // 前置数据
    projectItem({ userId: this.userId }).then(res => {
      this.baseData = res.data;
      console.log(res.data)
    });
    // 协议类型
    partner().then(res => {
      this.licenseTypes = res.data;
    });
  }
};
</script>

<style lang="scss">
.approval-form-1 {
  .propaganda-title {
    margin-bottom: 8px;
    font-weight: bold;
    font-size: 16px;
  }
  .propaganda-text {
    font-size: 14px;
    color: #999;
    img {
      max-height: 120px;
    }
  }
}
.part-dialog {
  .ivu-form-item-label {
    width: 88px !important;
  }
  .ivu-form-item {
    .ivu-form-item {
      margin-bottom: 24px;
    }
    .ivu-form-item-content {
      margin-left: 88px !important;
    }
  }
  .license-item {
    padding: 8px 0;
    border: 1px dashed #ccc;
    & + .license-item {
      border-top: none;
    }
    .content {
      flex: 1;
      padding-right: 16px;
      border-right: 1px dashed #ccc;
    }
    .ivu-btn {
      margin: 0 8px;
    }
  }
}
</style>
