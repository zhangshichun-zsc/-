<!-- 添加广告(志愿者) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>添加广告</span>
        </div>
        <div>
          <Button size="small">
            <Icon type="md-refresh" size="10" />
            刷新
          </Button>
          <Button  @click="history" size="small">
            <Icon type="ios-arrow-back" size='10'  />
            返回
          </Button>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" >
        <FormItem label="广告名称" prop="name" >
          <Input v-model="formValidate.name" placeholder="广告名称" style="width:300px"></Input>
          <span style="color: #9EA7B4;font-size: 12px;margin-left: 0.5rem;">广告名称只是作为辨别多个广告条目之用，并不显示在广告中</span>
        </FormItem>
        <FormItem label="广告位置" prop="position">
          <Input icon="ios-clock-outline" v-model="formValidate.position" placeholder="首页轮播"style="width:300px" ></Input>
        </FormItem>
        <FormItem label="开始时间" prop="StartTime">
          <FormItem prop="date1">
            <DatePicker icon="ios-clock-outline" type="date" placeholder="请选择时间" v-model="formValidate.date1"></DatePicker>
          </FormItem>
        </FormItem>
        <FormItem label="结束时间" prop="EndTime">
          <FormItem prop="date2">
            <DatePicker icon="ios-clock-outline" type="date" placeholder="请选择时间" v-model="formValidate.date2"></DatePicker>
          </FormItem>
        </FormItem>
        <FormItem label="上线/下线" prop="interest">
          <RadioGroup v-model="formValidate.interest">
            <Radio label="上线">上线</Radio>
            <Radio label="下线">下线</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="广告图片" prop="AdvertisingImages" >
          <Upload action="//jsonplaceholder.typicode.com/posts/">
            <Button icon="ios-cloud-upload-outline">选择上传图片</Button>
            <span style="color: #9EA7B4;font-size: 12px;margin-left: 0.5rem;">只能上传jpg/png格式文件，文件不能超过50kb</span>
          </Upload>
        </FormItem>
        <FormItem label="广告链接" prop="link">
          <Input v-model="formValidate.link"></Input>
        </FormItem>
        <FormItem label="广告备注" prop="desc">
          <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="请输入内容···"></Input>
        </FormItem>
        <FormItem>
          <Button type="success" @click="handleSubmit('formValidate')">提交</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        navigation1: {
          head: "添加广告(志愿者)",
        },
        formValidate: {
          name: '',
          position: '',
          interest: '',
          date1: '',
          date2: '',
          desc: '',
          link:''

        },
        ruleValidate: {
          name: [
            { required: true, message: '广告名称不能为空', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '广告链接不能为空', trigger: 'blur' }
          ],
          position: [
            { required: true, message: '广告位置不能为空', trigger: 'blur' },
          ],
          StartTime: [
            { required: true, trigger: 'blur' },
          ],
          EndTime: [
            { required: true, trigger: 'blur' },
          ],
          interest: [
            { required: true, message: '请选择其中一个', trigger: 'change'},
          ],
          AdvertisingImages: [
            { required: true, trigger: 'blur' },
          ],
          date1: [
            { required: true, type: 'date', message: '开始日期不能为空', trigger: 'change' }
          ],
          date2: [
            { required: true, type: 'date', message: '结束日期不能为空', trigger: 'change' }
          ]
        },
        data: [
        ]
      };
    },

    components: {},

    computed: {},

    created() {},

    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('提交失败！');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      },
      history(){
        this.$router.go(-1);
      }
    }
  };
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

  .integral-table {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .table-header {
    padding: 5px 20px;
    background: rgb(228, 228, 228);
    border: 1px solid #eee;
  }

</style>
