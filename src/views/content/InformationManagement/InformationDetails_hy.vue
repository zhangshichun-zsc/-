<!--资讯详情(会员)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-left">
        <div>
          <img :src='list.coverImgPath' style="height:100px;width:100px"/>
        </div>
        <div class="left-con">
          <p>
            <span>标题：</span>
            <span style="color: #1ABC9C;">{{list.title}}</span>
          </p>
          <p>
            <span>分类：</span>
            <span>{{list.informationTypeText}}</span>
          </p>
          <p>
            <span>日期：</span>
            <span>{{list.releaseTimestamp}}</span>
          </p>
        </div>
      </div>
      <div class="con-right">
        <div class="right-con">
          <div class="paper">
            <div class="paper-top flex-start">
              <p>
                <Icon type="ios-heart" size="30" />
                <span>收藏 {{list.collectionNum}}</span>
              </p>
              <p>
                <Icon type="ios-eye" size="30" />
                <span>阅读 {{list.readNum}}</span>
              </p>
            </div>
            <Divider />
            <div class="paper-con">
              <p>{{list.content}}</p>
            </div>
          </div>
          <!-- <div class="paper">
            <div class="paper-top flex-start">
              <p>
                <Icon type="ios-undo" size="30" />
                <span>评论</span>
              </p>
            </div>
            <Divider />
            <div class="paper-con">
              <Form
                style="margin: 0 auto;"
                ref="InpDate"
                :model="InpDate"
                :rules="ruleValidate"
                :label-width="120"
              >
                <FormItem label="用户名:" prop="Name">
                  <Input style="width: 10rem" v-model="InpDate.Name"></Input>
                </FormItem>
                <FormItem label="回复内容:" prop="ReplyContent">
                  <Input
                    style="width: 15rem"
                    v-model="InpDate.ReplyContent"
                    type="textarea"
                    :autosize="{minRows: 8,maxRows: 5}"
                    placeholder="请输入内容"
                  ></Input>
                </FormItem>
                <FormItem>
                  <Button type="success" @click="succes()">提交</Button>
                  <p style="font-size: 12px;">注意：管理员回复内容会在前台显示</p>
                </FormItem>
              </Form>
            </div>
          </div> -->
          <!-- <div class="paper">
            <div class="paper-top flex-start">
              <p>
                <Icon type="ios-chatbubbles" size="30" />
                <span>全部评论 {{list.commentNUm}}</span>
              </p>
            </div>
            <Divider />

              <Divider />
            </div>
          </div> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AddressDetails } from "../../../request/api";
import Button from "iview/src/components/button/button";
export default {
  components: { Button },
  data() {
    return {
      navigation1: {
        head: "资讯详情(会员)"
      },
      InpDate: {
        Name: "",
        ReplyContent: ""
      },
      ruleValidate: {
        ReplyContent: [
          { required: true, message: "内容不能为空", trigger: "blur" }
        ]
      },
      informationId: null,
      list:[]
    };
  },
  methods: {
    succes() {
      console.log(this.$route.query.informationId);
      this.getAddressDetails();
    },

    //详情数据
    getAddressDetails() {
      this.informationId = this.$route.query.informationId
      console.log(this.$route.query.informationId);
      AddressDetails({
        informationId: this.informationId
      }).then(res => {
        console.log(res);
        if(res.code==200){

          this.list = res.data
          this.list.releaseTimestamp=this.util.formatDate(res.data.releaseTimestamp)
        }
      });
    }
  },
  created() {
    this.getAddressDetails();
  },

};
</script>
<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}
.main,
.content {
  border: 1px solid #e4e4e4;
}
.content {
  margin: 1rem auto;
  width: 50rem;
  display: flex;
}
.content p {
  font-size: 14px;
  line-height: 28px;
  color: #999999;
}
.con-left {
  width: 15rem;
}
.left-con {
  margin-top: 5rem;
  padding: 2rem;
}
.con-right {
  width: 35rem;
  border-left: 1px solid #e4e4e4;
}
.right-con {
  padding: 1rem 2rem;
}
.paper-top p {
  margin-right: 1rem;
}
.paper-top span {
  margin-left: 0.5rem;
}
.paper-con {
  padding-bottom: 2rem;
}
.reply {
  display: flex;
}
.comments span {
  margin: 0.2rem;
}
.pages {
  display: flex;
  justify-content: center;
  margin: 10px auto;
}
</style>
