<template>
  <PageHeaderWrapper class="p-approval" title="新增活动立项">
    <template #titleSuffix><Button  :disabled="true" class="ml-16" type="default" style="width:120px" @click="toVolunteer">设置常用报名项</Button></template>
    <div class="card">
      <Steps class="steps" :current="currentStep">
        <Step title="基本项"></Step>
        <Step title="详情维护"></Step>
        <Step title="立项确认"></Step>
      </Steps>
    </div>
    <Form1 v-show="currentStep === 0" ref="form1" :origin-data="form.base" @change-org="onChangeOrg" @change-recruit-type="onRecruitTypeChange" @draft="saveDraft" @next="next" />
    <Form2 ref="form2" v-show="currentStep === 1" :base-info="form.base" :origin-data="form.batches" @draft="saveDraft"  @next="next" @previous="previous" @submit="form => addSubmit(false, form)" />
    <Form3 v-show="currentStep === 2" :origin-data="form" :loading="loading" @add-batch="addBatch" @edit-batch="editBatch" @draft="saveDraft" @previous="previous" @submit="form => submit(false, form)" />
  </PageHeaderWrapper>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import { projectApproval, draftsDetail, projectEdit } from '@/request/api'
export default {
  components: {
    Form1: () => import('./Form1'),
    Form2: () => import('./Form2'),
    Form3: () => import('./Form3')
  },
  data() {
    return {
      currentStep: 0,
      loading: false,
      form: {
        base: {},
        batches: []
      }
    }
  },
  methods: {
    // 当从草稿箱 和 复制过来的
    editapproval() {
      if (this.$route.query.batchId) {
        if (this.$route.query.copy !== 1) {
          this.batchId = this.$route.query.batchId
        }
        this.getDraftsDetail(this.$route.query.batchId)
        if(this.$route.query.currentStep){
          this.currentStep = ~~this.$route.query.currentStep
        }
      }
    },
    getDraftsDetail(e) {
      draftsDetail({
        batchId: e,
        isTime: this.batchId ? 2 : null
      }).then(res => {
        let data = res.data

        // 处理三个步骤的数据， 以及多模块的数据结构
        let from1 = {
          channel: '3',
          categoryId: data.categoryId,
          categoryName: data.categoryName,
          budget: parseFloat(data.budget) ,
          startT: data.startT,
          endT: data.endT,
          batchName: data.batchName,
          batchObjective: data.batchObjective,
          batchPic: data.batchPic,
          batchPicShow: data.batchPicShow,
          orgId: data.orgId,
          orgName: data.orgName,
          orgType: data.orgType,
          recruitType: data.recruitType,
          partnerList: [...data.partnerList]
        }
        let from2 = {
          actInfoList: [...data.actInfoList]
        }
        this.form.base = {...from1}
        this.form.batches = [...data.actInfoList]
      })
    },
    toVolunteer() {
      this.$router.push({ name: 'volunteer_apply' })
    },
    onChangeOrg() {
      // 清空活动分类
      this.form.batches.forEach(batch => {
        batch.actTypeId = ''
        batch.mouldActId = ''
      })
      this.$refs.form2.form.actTypeId = ''
      this.$refs.form2.form.mouldActId = ''
    },
    onRecruitTypeChange() {
      if (this.form.batches.length > 1) {
        this.$Modal.confirm({
          title: '提示',
          content: '修改后之前的活动内容将被清空，是否确认修改招募类型?',
          onOk: () => {
            this.form.batches = []
            this.$refs.form2.batches = []
            this.$refs.form2.clearForm()
          },
          onCancel: () => {
            // 回滚招募类型
            this.$refs.form1.form.recruitType = '2'
          }
        })
      }
    },
    addBatch() {
      this.currentStep = 1
      this.$nextTick(() => {
        this.$refs.form2.addBatch(true)
      })
    },
    editBatch(index) {
      this.currentStep = 1
      this.$nextTick(() => {
        this.$refs.form2.editBatch(index)
      })
    },
    scrollToTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
    next(form) {
      if (this.currentStep === 0) {
        this.form.base = form
      } else if (this.currentStep === 1) {
        this.form.batches = form
      }
      this.currentStep++
      this.$nextTick(() => {
        this.scrollToTop()
      })
    },
    previous(form) {
      if (this.currentStep === 2) {
        Object.assign(this.form.base, form)
      } else if (this.currentStep === 1) {
        this.form.batches = form
      }
      this.currentStep--
      this.$nextTick(() => {
        this.scrollToTop()
      })
    },
    saveDraft(form) {
      if (!this.currentStep) {
        this.form.base = form
      } else if(this.currentStep ==2){
        //第三步的 保存草稿
        Object.assign(this.form.base, form)
      }else {
        this.form.batches = form
      }
      if (this.form.base.batchName && this.form.base.orgId) {
   
        this.submit(true)
      } else {
        this.$Message.error('立项名称和小组归属必须提供')
      }
    },
    async submit(isDraft = false, form) {
      // 第3步修改的
      if (form) {
        Object.assign(this.form.base, form)
      }

      // 从立项管理详情过来的
      if(this.$route.query.isEdit && this.form.batches.length >1){
        let actInfoList = this.form.batches
        actInfoList.forEach(item=>{
          item.activityId = ''
          item.batchId = ''
        })
        this.form.batches = actInfoList
      }
      let batchId  = this.$route.query.batchId 
      const body = {
        userId: this.$store.state.userId,
        is_draft: isDraft ? 1 : 2,
        ...this.form.base,
        actInfoList: this.form.batches,
        batchId
      }
      // 第3步修改的
      const clone = cloneDeep(body)
      this.loading = true
      const res = await projectApproval(clone)
      this.loading = false
      if (res.code == 200) {
        this.$Message.success(res.msg)
        this.$router.push({ name: 'project_approval' })
      } else {
        this.$Message.error(res.msg)
      }
    },
    async addSubmit(isDraft = false, obj){
  
      // 新增的时候 去掉 activityId  
      let { form, batches} = obj
      const body = {
        ...form,
        type: form.activityId?2:1
        // 有值是修改， 没值是新增
      }
      // 保存当前的 批次到 自己身上
       this.form.batches = batches
      
      // 第3步修改的
      const clone = cloneDeep(body)
      this.loading = true
      const res = await projectEdit(clone)
      this.loading = false
      if (res.code == 200) {
        this.$Message.success(res.msg)
        this.currentStep = 2
      } else {
        this.$Message.error(res.msg)
      }
    }
  },
  mounted() {
    this.editapproval()
  }
}
</script>

<style lang="scss">
.p-approval {
  .card {
    padding-bottom: 22px;
  }
  .steps {
    .ivu-steps-item {
      display: inline-flex;
      align-items: center;
    }
    .ivu-steps-main {
      margin-top: 0;
    }
    .ivu-steps-title {
      margin-bottom: 0;
    }
  }
  .ivu-form-item {
    &.width-auto {
      .ivu-form-item-content {
        width: auto;
      }
    }
  }
  // 表单长度
  .ivu-form-item-content {
    width: 320px;
    > * {
      width: 100%;
    }
  }
  .action-btn {
    width: 120px;
    & + .action-btn {
      margin-left: 20px;
    }
  }
  .list-wrapper {
    .list-header {
      font-weight: bold;
      font-size: 16px;
    }
    .list-table {
      margin-top: 12px;
      width: 100%;
      border: none;
      tr:not(.create) {
        border-bottom: 1px solid #eee;
      }
      tr.create {
        td {
          padding: 0;
        }
      }
      td {
        padding: 8px 16px;
        &.actions {
          .ivu-icon {
            font-size: 20px;
            color: #ff565a;
            cursor: pointer;
          }
        }
      }
    }
  }
  .card-title {
    font-weight: bold;
    font-size: 16px;
    &.required {
      &::after {
        content: '*';
        display: inline;
        margin-left: 4px;
        color: #ff565a;
      }
    }
  }
}
</style>
