<!-- 短信消息(会员) -->
<template>
  <div class="integral">
    <tophead :navigation1="navigation1" :top="top" @query="query"></tophead>
    <div class="integral-table">
      <div class="table-header flex-center-between">
        <div class="flex-center-start">
          <Icon type="md-list" />
          <span>数据列表</span>
        </div>
        <div class="flex-center-end">
          <Button size="small" class="table-btn" @click="modal1=true">发送短信</Button>
          <Button size="small" class="table-btn" @click="screen">群发消息</Button>
          <Select size="small" class="inpt" placeholder="显示条数"></Select>
          <Select size="small" class="inpt" placeholder="排序方式"></Select>
        </div>
        <Modal v-model="modal1" title="群发短信">
          <Form :model="formItem" :label-width="80">
            <FormItem label="发送对象">
              <Input v-model="formItem.input" placeholder="请输入用户手机号码"></Input>
            </FormItem>
            <FormItem label="短信内容">
              <Input
                v-model="formItem.textarea"
                type="textarea"
                :autosize="{minRows: 4,maxRows: 4}"
                placeholder="请输入内容..."
              ></Input>
            </FormItem>
          </Form>
        </Modal>
      </div>

      <div style="padding: 0.5rem 0;">
        <div style="border: #E4E4E4 1px solid;  ">
          <div
            class="flex-center-between"
            style="padding: 0.2rem 0.5rem;border-bottom: #e4e4e4 1px solid"
          >
            <div class="text1">
              <Checkbox></Checkbox>
              <p>
                <span>发布人员：</span>
                <span>admin</span>
              </p>
              <p>
                <span>发送时间：</span>
                <span>2019-08-02 15:47:44</span>
              </p>
              <p>
                <span>接收对象：</span>
                <span>200人</span>
              </p>
            </div>
            <a style="color: #008E40;">删除</a>
          </div>
          <div class="text2">
            <p>尊敬的@，您的VIP会籍即将于@到期，请您及时续费！</p>
          </div>
        </div>
      </div>

      <div class="pages flex-center-between">
        <div class="batch">
          <Checkbox>全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px">确定</Button>
        </div>
        <Page :total="100" show-elevator show-total size="small" />
      </div>
    </div>
  </div>
</template>

<script>
import tophead from "@/components/tophead";
export default {
  data() {
    return {
      formItem: {
        input: "",
        select: "",
        radio: "male",
        checkbox: [],
        switch: true,
        date: "",
        time: "",
        slider: [20, 50],
        textarea: ""
      },
      modal1: false,
      navigation1: {
        head: "短信消息(会员)"
      },
      columns: [
        {
          title: "发布人员",
          key: "publisher",

          render: (h, params) => {
            return h("div", "admin");
          }
        },
        {
          title: "发布时间",
          key: "publishtime",

          render: (h, params) => {
            return h("div", "2019-08-02");
          }
        },
        {
          title: "接收对象",
          key: "object",

          render: (h, params) => {
            return h("div", "200人");
          }
        },
        {
          title: "操作",
          key: "delete",

          render: (h, params) => {
            return h("a", "删除");
          }
        },
        {
          title: "消息提示",
          key: "tip",

          render: (h, params) => {
            return h("div", "你的会员已到期，请充值");
          }
        }
      ],
      top: [
        { name: "关键词", type: "input", value: "" },
        { name: "发布时间", type: "date", value: "" }
      ],

      data: [],
      batchList: [
        {
          value: "Delete",
          label: "删除"
        }
      ]
    };
  },
  components: { tophead },

  computed: {},

  created() {},

  methods: {
    query(e) {
      console.log(e);
    },
    screen() {
      this.$router.push({ name: "vp_screen" });
    }
  }
};
</script>
<style lang="scss">
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
}
.integral-header .integral-body .flex-center-start .inpt {
  width: 200px;
  margin-left: 15px;
}
.integral-header .integral-body .flex-center-start {
  margin-right: 20px;
}
.integral-table {
  margin-top: 30px;
}
.table-header {
  padding: 5px 20px;
  background: rgb(228, 228, 228);
  border: 1px solid #eee;
}
.table-header .table-btn {
  margin-right: 15px;
}
.integral-table .pages {
  padding: 5px 20px;
  margin-top: 50px;
  background: #fff;
}
.pages {
  text-align: center;
}
.ipt {
  margin-left: 10px;
}
.sdate {
  margin-left: 15px;
}
.text1,
.text2 {
  font-size: 12px;
}
.text1 {
  display: flex;
}
.text1 p {
  margin: 0 0.2rem;
}
.text1 p span:nth-child(2) {
  color: #9ea7b4;
}
.text2 {
  padding: 0.5rem 1rem;
  height: 5rem;
}
</style>
