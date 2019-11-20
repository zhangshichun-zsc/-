<!-- 用户字段 -->
<template>
  <div class="field">
    <div class="wap">
      <div class="wap-left">
        <ul>
          <li>分类</li>
          <li>受益方</li>
          <li>志愿者</li>
          <li>捐赠方</li>
          <li>传播</li>
          <li>政府</li>
          <li>企业</li>
          <li>同行放</li>
          <li>融合中国成员单位</li>
        </ul>
      </div>
      <div class="wap-right">
        <div class="right-header flex-center-between">
          <div class="header-swit">
            <span @click="showArea(0)">列表页展示字段</span>
            <span @click="showArea(1)">固定字段</span>
            <span @click="showArea(2)">自定义字段</span>
          </div>
          <Select size='large' class="sele">
            <Option value="1">1</Option>
            <Option value="1">1</Option>
          </Select>
        </div>
        <div class="right-bod">
          <div v-if='i === 0'>
            <p>拖拽调整列显示顺序</p>
            <div class="drap flex-center-start">
              <Button type="dashed" class="but">姓名</Button>
              <Button type="dashed" class="but">手机号</Button>
              <Button type="dashed" class="but">组织名称</Button>
              <Button type="dashed" class="but">参与活动次数</Button>
              <Button type="dashed" class="but">积分</Button>
            </div>
            <p>备选字段</p>
            <div class="bord">
              <CheckboxGroup v-model="disabledGroup" class="bord-check">
                <Checkbox label="姓名" class="check"></Checkbox>
                <Checkbox label="手机号" class="check"></Checkbox>
                <Checkbox label="出生日期" class="check"></Checkbox>
              </CheckboxGroup>
            </div>
          </div>
          <div v-else-if="i === 1">
            <p>系统预设的字段信息</p>
            <div class="bord">
              <CheckboxGroup v-model="disabledGroup" class="bord-check">
                <Checkbox label="姓名" class="check"></Checkbox>
                <Checkbox label="手机号" class="check"></Checkbox>
                <Checkbox label="出生日期" class="check"></Checkbox>
              </CheckboxGroup>
            </div>
          </div>
          <div v-else>
            <p>系统预设的字段信息</p>
            <div class="tab">
               <div class="tab-table">
                 <Table border :columns="columns" :data="data"></Table>
               </div>
               <div class="tab-write">
                  <div class="flex-center-between">
                    <span>字段标题</span>
                    <Input size="large" placeholder="用户ID/账号" class="inpt"/>
                  </div>
                  <div class="flex-center-between">
                    <span>类型</span>
                    <Select size='large' class="inpt">
                      <Option value="1">1</Option>
                      <Option value="1">1</Option>
                    </Select>
                  </div>
                  <div class="flex-center-between">
                    <span>字段标题</span>
                    <Input size="large" placeholder="用户昵称"  class="inpt"/>
                  </div>
                  <Button type='primary' size='large'>保存</Button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      i: 0,
      columns: [
        {
          title: '字段标题',
          key: 'title'
        },
        {
          title: '提示',
          key: 'prompt'
        },
        {
          title: '类型',
          key: 'type'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: '<Icon type="ios-create" />'
                },
                on: {
                  click: () => {
                    this.$router.push({ name: 'integral_detail' })
                  }
                }
              }),
              h('Icon', {
                props: {
                  type: 'ios-trash'
                },
                on: {
                  click: () => {
                    this.$Message.info('你点击了第' + params.index + '列')
                  }
                }
              })
            ])
          }
        }
      ],
      data: [
        {
          title: '企业规模',
          prompt: '企业规模',
          type: '单行文本'
        }
      ]
    }
  },

  components: {},

  computed: {},

  created () {},

  methods: {
    showArea (i) {
      this.i = i
    }
  }
}

</script>
<style lang="scss">
.wap{
  background: #fff;
  padding: 20px 100px;
  display: flex;
}
.wap .wap-left{
  flex:1;
  border-top: 1px solid #eee;
  margin-right: 70px;
}
.wap .wap-left li{
  height: 50px;
  line-height: 50px;
  border: 1px solid #eee;
  border-top: none;
  text-align: center;
}
.wap .wap-right{
  flex:5;
}
.wap .wap-right .right-header{
  padding: 20px 0;
}
.wap .wap-right .right-header .sele{
  width: 200px;
}
.wap .wap-right .right-header .header-swit span{
  margin-right: 20px;
  cursor: pointer;
}
.wap .wap-right .right-bod{
  border: 1px solid #eee;
  padding: 20px;
}
.wap .right-bod .drap{
  padding: 20px;
}
.wap .right-bod .drap .but{
  margin-right: 30px;
}
.wap .right-bod .bord{
  border: 1px solid #eee;
  padding: 20px;
  margin-top: 20px;
  height: 300px;
}
.wap .right-bod .bord .check{
  margin-right: 50px;
}
.tab{
  display: flex;
  margin-top: 20px;
}
.tab .tab-table{
  flex:1.5
}
.tab .tab-write{
  box-sizing: border-box;
  margin-left: 50px;
  flex: 1;
  border: 1px solid #eee;
  padding: 20px;
}
.tab .tab-write .flex-center-between{
  margin-bottom: 15px;
}
.tab .tab-write .inpt{
  width: 300px;
}
</style>
