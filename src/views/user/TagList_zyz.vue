<!--标签列表(志愿者)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="basis">
      <div class="content">
        <div class="title bk-szy flex-center-between">
          <p>
            <Icon type="ios-list" />
            <span>数据列表</span>
          </p>
          <Button @click="modal1 = true">添加</Button>
        </div>
        <Modal width="850" v-model="modal1" title="添加标签类型" @on-ok="ok" @on-cancel="cancel">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="180">
            <FormItem label="标签名称：" prop="TagName">
              <Input v-model="formValidate.TagName" style="width: 300px;"></Input>
            </FormItem>
            <FormItem label="自动打标签条件：">
              <div class="flex-center-start">
                <p style="width: 100px;text-align: center;">用户分类</p>
                <Select v-model="UserClassification" style="width: 200px;">
                  <Option v-for="item in cityList1" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
              <div class="flex-center-start">
                <p style="width: 100px;text-align: center;">类型</p>
                <Select v-model="type1" style="width: 150px;margin-right:10px">
                  <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="type3" style="width: 100px;">
                  <Option v-for="item in cityList4" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Input type="text" style="width: 50px;margin-left:10px"></Input>
              </div>
              <div style="width:280px;height:24px;margin:10px 0 0 100px;border:1px solid #ccc;text-align: center;line-height:24px; border-style: dashed;cursor:pointer">添加条件</div>
              <div class="flex-start">
                <p style="width: 100px;text-align: center;">时间范围</p>
                <RadioGroup v-model="selection" style="display: inline-grid;">
                  <Radio label="options1">
                    <span>应用于所有历史记录</span>
                  </Radio>
                  <Radio label="options3">
                    <span>应用于所选时间段</span>
                    <Button size="small" style="margin:0 20px">开始时间</Button>
                    <Button size="small">结束时间</Button>
                  </Radio>
                </RadioGroup>
              </div>
            </FormItem>
          </Form>

        </Modal>
        <Table border :columns="columns" :data="data"></Table>
        <div class="pages bk-zxy flex-center-between">
          <div>
            <Checkbox>全选</Checkbox>
            <Select placeholder="批量操作" style="width: 150px">
              <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button class="space">确定</Button>
          </div>
          <Page :current='page' :total="100" show-elevator show-total size='small' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigation1: {
        head: '标签列表(志愿者)'
      },
      modal1: false,
      formValidate: {
        TagName: ''
      },
      ruleValidate: {
        TagName: [{ required: true, message: '标签名称不能为空', trigger: 'blur' }]
      },
      cityList1: [
        {
          value: 'options1',
          label: '受益方'
        },
        {
          value: 'options2',
          label: '志愿者'
        }
      ],
      cityList2: [
        {
          value: 'options1',
          label: '活动参与数'
        },
        {
          value: 'options2',
          label: '服务时长'
        }
      ],
      cityList4: [
        {
          value: 'options1',
          label: '大于'
        },
        {
          value: 'options2',
          label: '小于'
        }
      ],
      UserClassification: ['options1'],
      type1: ['options2'],
      type2: ['options1'],
      type3: ['options2'],
      selection: [''],
      data: [
        {
          TagList: '立项达人',
          number: '1000',
          LabelConditions: '累计参与活动：10'
        }
      ],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '标签名称',
          key: 'TagList',
          align: 'center'
        },
        {
          title: '人数',
          key: 'number',
          align: 'center'
        },
        {
          title: '自动打标签条件',
          key: 'LabelConditions',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'span',
                {
                  clssName: 'action',
                  style: {
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.modal1 = true
                    }
                  }
                },
                '编辑'
              ),
              h(
                'span',
                {
                  style: {
                    marginRight: '5px',
                    marginLeft: '5px',
                    color: 'green'
                  },
                  on: {
                    click: () => {
                      this.$Message.info('你点击了第' + params.index + '列')
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      batchList: [{ value: '1', label: '删除' }]
    }
  },
  methods: {
    ok() {
      this.$Message.info('Clicked ok')
    },
    cancel() {
      this.$Message.info('Clicked cancel')
    }
  }
}
</script>

<style scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}
.basis {
  margin: 0.5rem;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  padding: 0.2rem 0.5rem;
}
.bk-zxy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
}
.pages {
  padding: 0.2rem;
}
.space {
  margin: 0 0.2rem;
}
.flex-center-start {
  margin-bottom: 10px;
}
</style>
