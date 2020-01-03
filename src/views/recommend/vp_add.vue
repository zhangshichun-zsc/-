<!-- 添加广告(会员) -->
<template>
  <div class="integral">
    <div class="integral-header">
      <Navigation :labels="navigation1"></Navigation>
      <div class="flex-center-between integral-top">
        <div>
          <Icon type="ios-search-outline" />
          <span>添加广告</span>
        </div>
      </div>
    </div>
    <div class="integral-table">
      <Form
        ref="formValidate"
        :model="formValidate"
        :rules="ruleValidate"
        :label-width="100"
      >
        <FormItem label="广告名称" prop="title">
          <Input
            v-model="formValidate.title"
            placeholder="广告名称"
            style="width:300px"
          />
          <span style="color: #9EA7B4;font-size: 12px;margin-left: 0.5rem;"
            >广告名称只是作为辨别多个广告条目之用，并不显示在广告中</span
          >
        </FormItem>
        <FormItem label="广告位置" prop="location">
          <Select v-model="formValidate.location" style="width:300px">
            <Option
              :value="item.dicCode"
              v-for="(item, index) in citys"
              :key="index"
              >{{ item.dataValue }}</Option
            >
          </Select>
        </FormItem>

        <FormItem label="开始时间" prop="startAt">
          <FormItem prop="startAt">
            <DatePicker
              icon="ios-clock-outline"
              type="date"
              placeholder="请选择时间"
              v-model="formValidate.startAt"
            ></DatePicker>
          </FormItem>
        </FormItem>
        <FormItem label="结束时间" prop="endAt">
          <FormItem prop="endAt">
            <DatePicker
              icon="ios-clock-outline"
              type="date"
              placeholder="请选择时间"
              v-model="formValidate.endAt"
            ></DatePicker>
          </FormItem>
        </FormItem>
        <FormItem label="上线/下线" prop="status">
          <RadioGroup v-model="formValidate.status">
            <Radio label="1">上线</Radio>
            <Radio label="0">下线</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="广告图片" prop="picUrl">
          <UploadImg
            :picMap="picMap"
            :max="1"
            v-model="formValidate.picUrl"
            :display-width="240"
            :crop-width="750"
            :crop-height="320"
          ></UploadImg>
        </FormItem>
        <FormItem label="是否跳转外部链接" prop="linkType">
          <RadioGroup v-model="formValidate.linkType">
            <Radio label="1">是</Radio>
            <Radio label="0">否</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          label="广告链接"
          prop="linkUrl"
          v-if="formValidate.linkType == 1"
        >
          <Input v-model="formValidate.linkUrl" />
        </FormItem>
        <FormItem
          label="广告内容"
          prop="comments"
          v-if="formValidate.linkType == 0"
        >
          <wangeditor
            :labels="formValidate.comments"
            id="ed1"
            @change="changeEditorTrain"
          ></wangeditor>
        </FormItem>
        <FormItem label="广告备注">
          <Input
            v-model="formValidate.remark"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            placeholder="请输入内容···"
          />
        </FormItem>
        <FormItem>
          <Button type="error" @click="handleSubmit('formValidate')"
            >提交</Button
          >
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../request/datatime";
import { upload } from "../../request/http";
import {
  AddAdvertising,
  AdvertisingList,
  AdvertisingDetails,
  orgimgdel
} from "../../request/api";
export default {
  data() {
    return {
      navigation1: {
        head: "添加广告"
      },
      citys: [],
      data1: "",
      data2: "",
      content: "",

      formValidate: {
        title: "",
        location: "",
        status: "0",
        startAt: "",
        endAt: "",
        remark: "",
        linkUrl: "",
        picUrl: [],

        linkType: "1",
        comments: ""
      },
      ruleValidate: {
        title: [
          { required: true, message: "广告名称不能为空", trigger: "blur" }
        ],
        picUrl: [
          {
            required: true,
            message: "图片不能为空",
            trigger: "blur",
            type: "array"
          }
        ],
        location: [
          {
            required: true,
            message: "广告位置不能为空",
            trigger: "change",
            type: "number"
          }
        ],
        status: [
          { required: true, message: "请选择其中一个", trigger: "change" }
        ],
        linkType: [
          { required: true, message: "请选择其中一个", trigger: "change" }
        ],
        startAt: [
          {
            required: true,
            type: "date",
            message: "开始日期不能为空",
            trigger: "change"
          }
        ],
        endAt: [
          {
            required: true,
            type: "date",
            message: "结束日期不能为空",
            trigger: "change"
          }
        ]
      },
      data: [],
      sysid: 1,
      picMap: {}
    };
  },
  mounted() {
    this.getAdvertisingList();
    console.log(this.$route.query.contentId);
    if (this.$route.query.contentId) {
      this.getAdvertisingDetails();
    }
  },

  components: {},

  computed: {},

  created() {},

  methods: {
    //列表
    getAdvertisingList() {
      AdvertisingList({
        sysType: 1
      }).then(res => {
        if (res.code == 200) {
          this.citys = res.data;
        }
        console.log(res);
      });
    },
    //添加广告
    getadd() {
      this.data1 = this.formValidate.startAt.getTime();
      this.data2 = this.formValidate.endAt.getTime();

      let obj = {
        sysId: this.sysid,
        title: this.formValidate.title,
        startAt: this.data1,
        endAt: this.data2,
        status: this.formValidate.status,
        picUrl: this.formValidate.picUrl.toString(),
        linkUrl: this.formValidate.linkUrl,
        remark: this.formValidate.remark,
        contentId: this.$route.query.contentId,
        location: this.formValidate.location,
        linkType: this.formValidate.linkType,
        comments: this.formValidate.comments
      };

      AddAdvertising(obj)
        .then(res => {
          if (res.code == 200) {
            this.$Message.success("提交成功!");
            this.$router.push({ name: "vp_adlist" });
          }
          console.log(res);
        })
        .catch(res => {
          console.log(res);
        });
    },

    //广告详情
    getAdvertisingDetails() {
      AdvertisingDetails({
        contentId: this.$route.query.contentId
      }).then(res => {
        let list = res.data;
        let formValidate = {
          title: list.title,
          location: Number(list.location),
          status: list.status,
          startAt: list.startAt,
          endAt: list.endAt,
          picUrl: [list.picUrl],
          linkUrl: list.linkUrl,
          remark: list.remark,
          linkType: list.linkType,
          comments: list.comments
        };

        this.picMap = { [list.picUrl]: list.picUrlShow };
        this.formValidate = formValidate;
        // (this.formValidate.title = list.title),
        //   (this.formValidate.location = Number(list.location)),
        //   (this.formValidate.startAt = list.startAt);
        // this.formValidate.endAt = list.endAt;
        // (this.formValidate.status = list.status),
        //   (this.formValidate.picUrl = list.picUrl),
        //   (this.formValidate.linkUrl = list.linkUrl),
        //   (this.formValidate.remark = list.remark);
        // this.formValidate.linkType = list.linkType;
        // this.formValidate.comments = list.comments;
        // this.formValidate.imgUrl = list.picUrlShow;
      });
    },

    //广告内容
    changeEditorTrain(e) {
      this.formValidate.comments = e;
    },

    handleSubmit(name) {
      if (this.formValidate.startAt < this.formValidate.endAt) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.getadd();
          } else {
            this.$Message.error("必填项未填！");
          }
        });
      } else {
        this.$Message.info("日期结束时间不正确");
      }
    },

    history() {
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
  background: #ffffff;
  border-bottom: 1px solid #eee;
}

.integral-table {
  background: #ffffff;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.table-header {
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.first-pic {
  width: 300px;
  height: 200px;
  text-align: center;
  line-height: 200px;
  border: 1px dashed #ff565a;
  position: relative;
}
.cancel {
  position: absolute;
  top: 0;
  right: -30px;
}
</style>
