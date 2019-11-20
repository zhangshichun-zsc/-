<!--用户字段设置（志愿者）-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="main">
      <div class="content">
        <ul class="list">
          <h1>分类</h1>
          <li>受益方</li>
          <li>志愿者</li>
          <li>捐赠方</li>
          <li>传播</li>
          <li>政府</li>
          <li>企业</li>
          <li>同行方</li>
          <li>融合中国成员单位</li>
        </ul>
        <Tabs>
          <TabPane label="列表页展示字段" name="name1">
            <div class="SetUp">
              <p>拖拽调整列显示顺序</p>
              <p class="Drag">
                <span>组织名</span>
                <span>地址</span>
                <span>负责人</span>
                <span>联系方式</span>
              </p>
              <p>备选字段</p>
              <div class="alternative">
                <CheckboxGroup v-model="choose">
                  <Checkbox label="choose1">图片</Checkbox>
                  <Checkbox label="choose2">说明</Checkbox>
                  <Checkbox label="choose3">创建人</Checkbox>
                  <Checkbox label="choose4">网址</Checkbox>
                  <Checkbox label="choose5">微信公众号</Checkbox>
                </CheckboxGroup>
              </div>
            </div>
          </TabPane>
          <TabPane label="自定义字段" name="name2">
            <div class="SetUp">
              <p>拖拽调整列显示顺序</p>
              <div style="display: flex;">
                <table>
                  <tr>
                    <td>字段标题</td>
                    <td>提示</td>
                    <td>类型</td>
                    <td>操作</td>
                  </tr>
                  <tr>
                    <td>企业规模</td>
                    <td>企业规模</td>
                    <td>单行文本</td>
                    <td>
                      <Icon type="ios-create-outline" />
                      <Icon type="ios-trash-outline" />
                    </td>
                  </tr>
                </table>
                <div style="border: 1px solid #9EA7B4;padding: 0.5rem;margin: 0 0.5rem;">
                  <Form :model="formItem" :label-width="100">
                    <FormItem label="字段标题">
                      <Input v-model="formItem.input" size="small"></Input>
                    </FormItem>
                    <FormItem label="类型">
                      <Select v-model="formItem.select" size="small">
                        <Option value="option1">单行文本</Option>
                        <Option value="option2">多行文本</Option>
                        <Option value="option3">单项选择</Option>
                        <Option value="option4">多项选择</Option>
                      </Select>
                    </FormItem>
                    <FormItem label="字段标题">
                      <Input v-model="formItem.input" size="small"></Input>
                    </FormItem>
                    <div style="display: flex;justify-content: center;">
                      <Button type="primary">保存</Button>
                    </div>
                  </Form>
                </div>
                <span style="border: 1px solid #9EA7B4;padding: 0.5rem;display: inline-table;font-size: 14px">选项最多添加5个</span>
              </div>
            </div>
          </TabPane>
        </Tabs>

        <div style="display: flex;">
          <Dropdown>
            <Button>
              用户字段设置
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem>组织字段设置</DropdownItem>
              <DropdownItem>用户字段设置</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        navigation1: {
          head: "用户字段设置（志愿者）"
        },
        choose:[],
        formItem:{
          select:'option2'
        }
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .main{
    width: 50rem;
    margin: auto;
  }
  .content{
    display: flex;
    margin: 1rem;
  }
  .list{
    margin-right: 1rem;
  }
  .list h1,
  .list li{
    border: 1px solid #9EA7B4;
    width: 10rem;
    padding: 0.3rem 1rem;
    text-align: center;
    font-size: 15px;
  }
  .SetUp{
    border: 1px solid #9EA7B4;
    padding: 0.2rem;
  }
  .SetUp p{
    margin-bottom: 0.5rem;
  }
  .Drag span{
    padding: 0.1rem 0.2rem;
    border: 1px dashed;
    margin-right: 0.5rem;
  }
  .alternative{
    border: 1px solid #9EA7B4;
    padding: 0.5rem;
  }
  .SetUp td{
    border: 1px solid #9EA7B4;
    width: 3rem;
    font-size: 10px;
    text-align: center;
    padding: 0.2rem;
  }
  .ivu-form-item{
    margin-bottom: 0;
  }
</style>
