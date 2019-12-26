<template>
  <div style="background:white;padding-bottom:20px">
    <Navigation :labels="navigation"></Navigation>
    <div class='box box_'>
      <div class='item-left'>{{this.$route.query.head == 'parent'?"家长小组": "志愿者团队"}}名称</div>
      <div class='item-right'>{{list.orgName}}</div>
    </div>
    <div class='box box_'>
      <div class='item-left'>{{this.$route.query.head == 'parent'?"家长小组":'志愿者团队' }}负责人</div>
      <div class='item-right'>{{list.ownerUserName}}</div>
    </div>
    <div class='box box_'>
      <div class='item-left'>联系方式</div>
      <div class='item-right'>{{list.ownerUserPhone}}</div>
    </div>
    <div class='box box_' v-if="this.$route.query.head !== 'parent'">
      <div class='item-left'>志愿群体</div>
      <div class='item-right'>{{list.userTypeName}}</div>
    </div>
    <div class='box box_' v-if="this.$route.query.head !== 'parent'">
      <div class='item-left'>服务意向</div>
      <div class='item-right'>{{list.servicePointName}}</div>
    </div>
    <div class='box box_'>
      <div class='item-left'>城市</div>
      <div class='item-right'>{{city}}</div>
    </div>
    <div class='box box_' v-if="this.$route.query.head !== 'parent'">
      <div class='item-left'>成立时间</div>
      <div class='item-right'>{{list.businessDays}}
      </div>
    </div>
    <div class='box box_' v-if="this.$route.query.head !== 'parent'">
      <div class='item-left'>邀请码</div>
      <div class='item-right'>{{list.invitedCode||"暂无"}}
      </div>
    </div>

    <div class='box'>
      <div class='item-left'>{{ this.$route.query.head === 'parent'?'介绍': '志愿者团队介绍'}}</div>
      <div class='item-right textarea info-text'>{{list.description}}</div>
    </div>

    <div class='box '>
      <div class='item-left' style='line-height: 40px;'>图片</div>
      <img class='item-img' v-if="list.orgPicPath" :src="list.orgPicPath" alt="组织图片">
      <div v-else class="no-img">暂无图片</div>
    </div>


  </div>
</template>


<script>
import { orgSetStatus, orgGetInfo, queryVolunteerOrgDetail } from '../../request/api'
export default {
  data() {
    return {
      list: [],
      city: '',
      navigation: {},
      value: '',
      modal8: false,
      isModel: false,
      btnFlag: false
    }
  },

  props: [],
  created() {
    this.navigation = {
      head: this.$route.query.head === 'parent' ? '家长小组详情（会员）' : '志愿者团队详情（共用）'
    }
    this.getInfo()
    this.city = localStorage.getItem('city')
  },
  methods: {
    // 获取详情
    getInfo() {
      if (this.$route.query.head === 'parent') {
        orgGetInfo({
          orgId: this.$route.query.orgId
        }).then(res => {
          if (res.code == 200) {
            this.list = res.data
            this.btnFlag = res.data.flag
          }
          console.log(res)
        })
      } else {
        queryVolunteerOrgDetail({
          orgId: this.$route.query.orgId
        }).then(res => {
          if (res.code == 200) {
            this.list = res.data.data
            this.btnFlag = res.data.flag
          }
        })

        // alert('获取志愿者团队详情')
      }
    },
    // 通过
    batchAdopt() {
      if (this.$route.query.head === 'parent') {
        orgSetStatus({
          ids: this.$route.query.auditId,
          status: 2
        }).then(res => {
          if (res.code == 200) {
            this.$Message.info('通过成功')
            this.btnFlag = false
          } else {
            this.$Message.error({
              background: true,
              content: '审批失败,请联系管理员'
            })
          }
        })
      } else {
        alert('同意加入志愿者团队')
      }
    },
    batchRefuse() {
      // 显示模态框
      this.modal8 = true
    },
    modalCancel() {
      // 取消按钮
      this.close()
    },

    // 确定按钮
    modalOk() {
      if (this.value) {
        if (this.$route.query.head === 'parent') {
          orgSetStatus({
            ids: this.$route.query.auditId,
            status: 3,
            refReason: this.value
          }).then(res => {
            if (res.code == 200) {
              this.$Message.info('拒绝成功')
              this.btnFlag = false
            } else {
              this.$Message.error({
                background: true,
                content: '拒绝失败,请联系管理员'
              })
            }
            this.close()
          })
        } else {
          alert('拒绝志愿者团队')
        }
      } else {
        this.isModel = true
      }
    },

    close() {
      this.value = ''
      this.modal8 = false
      this.isModel = false
    }
  }
}
</script>
}


</script> 

<style lang="scss" scoped>
.box_ {
  align-items: center;
}
.box {
  padding-top: 10px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 16px;
}
.item-left {
  font-size: 16px;
  width: 140px;
  margin-right: 10px;
}

.item-right {
  font-size: 16px;
  width: 400px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #ccc;
  padding: 0 5px;
}
.item-img {
  width: 400px;
  height: 400px;
  background-size: contain;
  vertical-align: middle;
}
.no-img {
  width: 400px;
  text-align: left;
  line-height: 60px;
}
.textarea {
  height: 100px;
}
.btn {
  width: 250px;
  height: 40px;
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.refuse {
  width: 60px;
  height: 40px;
  border: 1px solid #ccc;
  line-height: 40px;
  background-color: red;
}

.adopt {
  width: 60px;
  height: 40px;
  border: 1px solid #ccc;
  line-height: 40px;
  background-color: #ccc;
}
.rejbtn {
  width: 100%;
  height: 8vh;
  padding: 0 1vw;
}
.tips {
  text-align: center;
  color: red;
}
.info-text {
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
}
</style>