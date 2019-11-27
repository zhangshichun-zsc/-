<!-- 省市区 -->
<template>
  <div>
    <Select v-model="val[0]" style="width:200px" @on-change='changeProve(0,$event)' :label-in-value='true'>
      <Option
        v-for="(item,i) in area"
        :value="i"
        :key="i"
      >{{ item.name }}</Option>
    </Select>
    <Select v-model="val[1]" style="width:200px" @on-change='changeProve(1,$event)' :label-in-value='true'>
      <Option
        v-for="(item,i) in area[val[0]].citys"
        :value="i"
        :key="i"
      >{{ item.name }}</Option>
    </Select>
    <Select v-model="val[2]" style="width:200px" @on-change='changeProve(2,$event)' :label-in-value='true'>
      <Option
        v-for="(item,i) in area[val[0]].citys[val[1]].areas"
        :value="i"
        :key="i"
      >{{ item }}</Option>
    </Select>
  </div>
</template>

<script>
/**
 * 参数 arr [] 三个参数 省市区id
 * 
 * 事件 change 
 */
import { CITYSDATA } from '@/libs/sele'
import { getAdressId,getAreaAdress } from '@/libs/utils'
export default {
  name:'adress',
  data () {
    return {
      area:CITYSDATA,
      val:[0,0,0],
      name:['北京市','北京市','东城区'],
      ids:[1,1,1],
    }
  },
  props:{
    /**
     * 省市区id 三个参数
     */
    arr:{
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {},

  computed: {},

  created () {
    this.showArea()
  },

  methods: {
    changeProve(i,e){
      let id = 1
      if(i == 0){
        id = getAdressId(e.label,'','')[0]
      }else if(i == 1){
        id = getAdressId('',e.label,'')[0]
      }else{
        id = getAdressId('','',e.label)[0]
      }
      this.$set(this.ids,i,id)
      this.$emit('change',this.ids)
    },
    showArea(){
      let arr = this.arr
      this.ids = arr
      if(arr.length==0)return
      let name = getAreaAdress(arr[0],arr[1],arr[2])
      let list = this.area
      let len = list.length
      for(let i=0;i<len;i++){
        if(list[i].name == name[0]){ 
          this.$set(this.val,0,i)
          let citys = list[0].citys
          for(let m=0,l=citys.length;m<l;m++){
            if(citys[m].name == name[1]){
              this.$set(this.val,1,m)
              let ars = citys[m].areas
              for(let n=0,le=ars.length;n<le;n++){
                if(ars[n] == name[2]){
                  this.$set(this.val,2,n)
                  return
                }
              }
            }
          }
        }
      }
    }
  }
}

</script>
<style lang="scss">
</style>