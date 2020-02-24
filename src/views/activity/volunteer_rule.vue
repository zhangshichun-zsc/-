<!--活动规则池(志愿者)-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="select">     
        <span>志愿者</span>
      <div style="float:right">
            <Button class="table-btn">
              显示条数
              <Icon type="md-arrow-dropdown" />
            </Button>
            <Button class="table-btn" style="margin:10px">
              排序方式
              <Icon type="md-arrow-dropdown" />
            </Button>
          </div>
    </div>
    <div class="content">
      <div class="integral-table">
        <div class="table-header">
          <div>
            <Tabs type="card">
              <TabPane label="限制规则"><Table border :columns="columns" :data="data" width="600px"></Table></TabPane>
              <TabPane label="优先规则"><Table border :columns="columns1" :data="data1" width="600px"></Table></TabPane>
            </Tabs>
          </div>
        </div>
         <div class="pages">
           <Page :total="100" show-elevator show-total size="small" />
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
        head: "活动规则池(志愿者)"
      },
      animal: "member",
       columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '限制名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '限制条件',
          key: 'condition',
          align: 'center'
        },
        {
          title: '新增时间',
          key: 'phone',
          align: 'center'
        },
        {
          title: '修改时间',
          key: 'nickname',
          align: 'center'
        },
        {
          title: '操作人',
          key: 'classify',
          align: 'center'
        },

        {
          title: '操作',
          key: 'state',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('i-switch')
            ])
          }
        }
      ],
       columns1: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '优先条件',
          key: 'name',
          align: 'center'
        },
        {
          title: '新增时间',
          key: 'phone',
          align: 'center'
        },
        {
          title: '修改时间',
          key: 'nickname',
          align: 'center'
        },
        {
          title: '操作人',
          key: 'classify',
          align: 'center'
        },

        {
          title: '操作',
          key: 'state',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('i-switch')
            ])
          }
        }
      ],
      data: [
        {
          name: '年龄',
          condition:'1—99',
          phone: '18000000000',
          nickname: 'John Brown',
          classify: '受益方'

        },
        {
          name: '障碍类型',
          condition:'脑瘫、自闭症',
          phone: '18000000000',
          nickname: 'John Brown',
          classify: '受益方'
        }
      ],
      data1: [
        {
          name: 'VIP优先',
          phone: '18000000000',
          nickname: 'John Brown',
          classify: '受益方'

        },
        {
          name: '月捐优先',
          phone: '18000000000',
          nickname: 'John Brown',
          classify: '受益方'
        }
      ]

    };
  },

  components: {  },

  computed: {},

  created() {},

  methods: {
  }
};
</script>
<style lang="scss" scoped>
.select {
  height: 50px;
  background: #ffffff;
  line-height: 50px;
  padding-left: 30px;
  border: #e4e4e4 1px solid;
}

.content{
  .integral-table{
    height: 50px;
     border: #e4e4e4 1px solid;
     margin-top: 10px;
    .table-btn{
      margin: 0 5px;
    }
  }
}
.pages {
  text-align: center;
}

</style>
