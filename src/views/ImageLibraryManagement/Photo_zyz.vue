<!--相册列表(志愿者)-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con">
        <div class="title bk-szy flex-center-start">
          <p>
            <Icon type="ios-apps" />
            <span>数据列表</span>
          </p>
          <div class="but flex-center-end">
            <Button size="small" @click="modal1 = true">上传图片</Button>
            <Select size='small' class="inpt" placeholder="显示条数"></Select>
            <Select size='small' class="inpt" placeholder="排序方式"></Select>
            <Modal v-model="modal1" title="上传图片">
              <Form :model="formItem" :label-width="80">
                <FormItem label="选择相册">
                  <Select style="width:200px" placeholder="请选择上传相册">
                  </Select>
                </FormItem>
                <FormItem label="选择图片">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">选择上传文件</Button>
                  </Upload>
                </FormItem>
              </Form>
            </Modal>
          </div>
        </div>
        <!--        上传相册-->
        <Modal v-model="modal1" title="上传图片" @on-ok="ok" @on-cancel="cancel">
          <Form ref="AddDate" :model="AddDate" :label-width="150">
            <FormItem label="选择相册:">
              <Select style="width: 10rem" v-model="AddDate.ChooseAlbum" placeholder="请选择上传相册">
                <Option v-for="item in ChooseAlbum" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
            <FormItem label="选择图片:">
              <Upload action="//jsonplaceholder.typicode.com/posts/">
                <Button icon="ios-cloud-upload-outline">选择上传文件</Button>
              </Upload>
              <p class="font">按住ctrl可同时批量选择多张图片上传</p>
            </FormItem>
          </Form>
        </Modal>
        <!--        转移相册-->
        <Modal v-model="modal2" title="上传图片" @on-ok="ok" @on-cancel="cancel">
          <Form ref="AddDate" :model="AddDate" :label-width="150">
            <FormItem label="选择相册:">
              <Select style="width: 10rem" v-model="AddDate.ChooseAlbum" placeholder="请选择转移相册">
                <Option v-for="item in ChooseAlbum" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Form>
        </Modal>
        <Row class="bk">
          <Col span="4">
          <div class="album">
            <div class="photo">
              <Icon style="margin: 2rem auto;" type="md-image" />
              <p style="margin-bottom: 10px">
                <span>1000*1000px (100kb)</span>
              </p>
            </div>
            <div class="album-options">
              <Checkbox></Checkbox>
              <a @click="modal2 = true">转移相册</a><a>删除图片</a>
            </div>
          </div>
          </Col>
          <Col span="4">
          <div class="album">
            <div class="photo">
              <Icon style="width: 70px;height: 70px; margin: 20px auto;" type="md-image" />
              <p style="margin-bottom: 10px">
                <span>1000*1000px (100kb)</span>
              </p>
            </div>
            <div class="album-options">
              <Checkbox v-model="single"></Checkbox>
              <a>转移相册</a><a>删除图片</a>
            </div>
          </div>
          </Col>
          <Col span="4">
          <div class="album">
            <div class="photo">
              <Icon style="width: 70px;height: 70px; margin: 20px auto;" type="md-image" />
              <p style="margin-bottom: 10px">
                <span>1000*1000px (100kb)</span>
              </p>
            </div>
            <div class="album-options">
              <Checkbox v-model="single"></Checkbox>
              <a>转移相册</a><a>删除图片</a>
            </div>
          </div>
          </Col>
          <Col span="4">
          <div class="album">
            <div class="photo">
              <Icon style="width: 70px;height: 70px; margin: 20px auto;" type="md-image" />
              <p style="margin-bottom: 10px">
                <span>1000*1000px (100kb)</span>
              </p>
            </div>
            <div class="album-options">
              <Checkbox v-model="single"></Checkbox>
              <a>转移相册</a><a>删除图片</a>
            </div>
          </div>
          </Col>
          <Col span="4">
          <div class="album">
            <div class="photo">
              <Icon style="width: 70px;height: 70px; margin: 20px auto;" type="md-image" />
              <p style="margin-bottom: 10px">
                <span>1000*1000px (100kb)</span>
              </p>
            </div>
            <div class="album-options">
              <Checkbox v-model="single"></Checkbox>
              <a>转移相册</a><a>删除图片</a>
            </div>
          </div>
          </Col>
          <Col span="4">
          <div class="album">
            <div class="photo">
              <Icon style="width: 70px;height: 70px; margin: 20px auto;" type="md-image" />
              <p style="margin-bottom: 10px">
                <span>1000*1000px (100kb)</span>
              </p>
            </div>
            <div class="album-options">
              <Checkbox v-model="single"></Checkbox>
              <a>转移相册</a><a>删除图片</a>
            </div>
          </div>
          </Col>
        </Row>
      </div>
      <div class="pages flex-center-between">
        <div class="batch">
          <Checkbox>全选</Checkbox>
          <Select placeholder="批量操作" style="width: 150px">
            <Option v-for="item in batchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button style="margin-left: 10px">确定</Button>
        </div>
        <Page :total="100" show-elevator show-total size='small' />
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      formItem: {},
      modal1: false,
      navigation1: {
        head: '相册列表(志愿者)'
      },
      modal1: false,
      modal2: false,
      AddDate: {
        ChooseAlbum: ''
      },
      ChooseAlbum: [
        {
          value: 'options1',
          label: '相册一'
        }
      ],
      batchList: [
        {
          value: 'Transfer',
          label: '转移相册'
        },
        {
          value: 'Delete',
          label: '删除图片'
        }
      ]
    }
  },
  methods: {
    ok() {
      this.$Message.info('添加成功')
    },
    cancel() {
      this.$Message.info('已取消')
    }
  }
}
</script>
<style lang="scss" scoped>
html,
body {
  margin: auto;
}
.main {
  background-color: #ffffff;
}

.bk {
  border: 1px solid #e4e4e4;
}
.content {
  margin: 10px;
}
.bk-szy {
  border-left: 1px solid #e4e4e4;
  border-right: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
}
.title {
  background-color: #f3f3f3;
  justify-content: space-between;
  padding: 5px 20px;
}
.Pack,
.but button,
.but select {
  margin-right: 5px;
}
.pages {
  padding: 0.5rem 1rem;
}
.album {
  margin: 1rem auto;
  width: 7rem;
  border: 1px solid #e4e4e4;
}
.photo {
  height: 6rem;
  text-align: center;
  font-size: 10px;
  color: #cccccc;
}
.album-options {
  padding: 0.2rem;
  font-size: 12px;
  border-top: 1px solid #e4e4e4;
}
.album-options a:nth-child(2) {
  margin-right: 0.2rem;
}
.font {
  color: #9ea7b4;
}
</style>
