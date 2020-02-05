<!--志愿者活动发布（志愿者）-->
<template>
  <div>
    <adress :value='adr' @change='getMap'/>
    <Navigation :labels="navigation1"></Navigation>
    <div class="content">
      <p class="content-head">
        <span>问卷调查内容</span>
      </p>
    </div>

  </div>
</template>

<script>
import { addSurvey } from '@/request/api'
import { getAdressId, filterNull } from '@/libs/utils'
import adress from '_c/map'
import { upload } from '@/request/http'
import draggable from 'vuedraggable'

import '@/libs/survey.scss'
export default {
  components: { adress, draggable },
  data () {
    return {
      navigation1: {
        head: '新建问卷调查(会员)'
      }
    }
  },

  mounted () {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
  .content {
    .content-head {
      height: 50px;
      background: #e4e4e4;
      line-height: 50px;
      span {
        margin: 0 10px;
      }
      button {
        border: 1px solid black;
        margin-left: 10px;
      }
    }
  }

</style>
