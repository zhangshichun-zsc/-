<!--活动规则文本-->
<template>
  <div>
    <Navigation :labels="navigation1"></Navigation>
    <div class="text">
      <p>活动发布须知</p>
      <ul>
        <li>这样的活动更容易被推荐：</li>
        <li>主题明确、内容清晰、形式健康，有较大受众基础；</li>
        <li>主办方信息齐全，包括名称、头像、简介；</li>
        <li>活动标题简洁有效，活动海报设计精美，且与主题相匹配；</li>
        <li>活动举办时间、地点明确，票种设置清晰；</li>
        <li>活动详情亮点突出，层次鲜明，且排版图文并茂、干净整齐；</li>
        <li>活动详情中不添加其它外链及公众号二维码；</li>
        <li>活动详情中不添加大量营销型、煽动型文案；</li>
        <li>活动报名、费用支付通过互动吧完成，无其它报名、支付方式；</li>
        <li>设有会员价的活动能获得优先推荐。</li>
        <li class="list">这样的内容活动中不能出现，否则将被屏蔽或删除：</li>
        <li>活动内容中禁止有诱导用户集赞、转发、分享朋友圈并关联奖励/奖项等形式的内容及文字；</li>
        <li>活动内容中禁止涉及有引导购房、引导炒股、引导重金属等期货交易、引导炒币的内容，禁止涉及有ICO发行的内容；</li>
        <li>活动内容中禁止有带有政治、色情、赌博、黑户、维权上访、捐款等或其他容易引起误解或歧义的内容及文字；</li>
        <li>活动内容中禁止使用互动吧站外报名方式（包括但不限于引导外链报名、微信报名、公众号报名等）；</li>
        <li>活动内容中禁止留有任何外部联系方式或者网站链接，包括但不限于手机号、微信、QQ、外网链接、二维码等；</li>
        <li>
          活动内容中禁止有反对宪法所确定的基本原则的、危害国家安全，涉及国家领导人名字肖像等损害国家荣誉和利益、宣扬邪教
          和封建迷信等内容及文字；
        </li>
        <li>
          活动内容中禁止有违反广告法等绝对化的语言文字或用语，如最高、最大、最佳、顶级、极品、第一品牌、绝无仅有、顶尖、
          万能、第一、最高、唯一、国家级等；
        </li>
        <li>活动内容属于无意义活动。</li>
      </ul>
      <p><Button>确认</Button></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navigation1: {
        head: "志愿者活动发布(志愿者)"
      }
    };
  }
};
</script>
<style lang="scss" scoped>
.text{
  p{
    text-align: center;
    margin: 40px 0;
    button{
      width: 140px;
      height: 40px;
      border: 1px solid black;
      margin-top: 40px;
    }
  }
  ul{
    li{
      padding-left: 80px;
      width: 900px;
      font-size: 14px;
      line-height: 18px;
    }
    .list{
      margin-top: 40px;
    }
  }
}
</style>
