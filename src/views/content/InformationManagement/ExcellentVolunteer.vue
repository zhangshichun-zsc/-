<!--优秀志愿者-->
<template>
  <div class="main">
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <div class="con-left">
        <div class="left-con">
          <p>
            <span>标题：</span>
            <span>优秀志愿者</span>
          </p>
          <p>
            <span>分类：</span>
            <span>支持性就业</span>
          </p>
          <p>
            <span>日期：</span>
            <span>2019-06-15 14:35:51</span>
          </p>
        </div>
      </div>
      <div class="con-right">
        <div class="right-con">
          <div class="paper">
            <div class="paper-con">
              <div style="margin:2rem auto;width: 20rem;height: 10rem;background-color: #1abc9c;"></div>
              <p>
                我叫王二，现任北京白鸽志愿者协会负责人，积极参与学生服务工作，策划组织并积极参与新生迎新工作、新生军训开营仪式、开学典礼、迎新晚会、毕业典礼、毕业晚会、农林水类毕业生就业市场等校级活动，认真做好各项利于同学们更好地适应、体验大学校园文化生活的服务工作。除此之外，积极参与支教活动，结合支教学校的教学目标，调动学生学习的积极性，指导和关怀学生的学习生活，为义务教育建设奉献自己的一份力量。
              </p>
              <p>
                我参加大大小小活动56次，累计志愿时长达160小时志愿服务是一种奉献社会、服务他人的方式，通过参与校内校外的志愿服务活动，服务他人的同时也能够不断充实自己，端正心态和做事态度，坚定地把每一次志愿服务当做自身的义务和宝贵的经历，也非常感谢每一次的志愿服务带来的喜悦和惊喜。
              </p>
            </div>
          </div>
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
        head: '优秀志愿者'
      }
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
