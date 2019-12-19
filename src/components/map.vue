<!-- 地图 -->
<template>
   <Modal v-model="models" width="360" title='选中地址' :closable='false'>
       <div>
          <iframe id="mapPage" width="100%" height="500px" frameborder=0
            src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=CEIBZ-KTJR3-XOB37-Y5LZ6-ZGMLH-CSF75&referer=myapp">
          </iframe>
       </div>
      <div slot="footer">
        <Button type="error" size="large"   @click="ok()">确定</Button>
        <Button type="error" size="large"  @click="cancel()">删除</Button>
      </div>
  </Modal>
</template>

<script>
import { getAdressId } from '@/libs/utils'
export default {
  name:'adress',
  data () {
    return {
      args:null,
      models: this.value
    }
  },
  watch: {
    value(val){
      console.log(val)
      this.models = val
    }
  },
  props:{
    value:{
      type:Boolean,
      default:false
    }
  },

  components: {},

  computed: {},

  created () {
    this.map()
  },

  methods: {
    map(){
      window.addEventListener('message', (event)=> {
        var loc = event.data;
        if (loc && loc.module == 'locationPicker') {
        let geocoder = new qq.maps.Geocoder({
            complete:(result)=>{
              let obj = result.detail.addressComponents
              let arr = getAdressId(obj.province,obj.city,obj.district)
              let args = {}
              args.provinceId = arr[0]
              args.cityId = arr[1]
              args.districtId = arr[2]
              args.address = loc.poiaddress
              args.xx = loc.latlng.lat 
              args.yy = loc.latlng.lng
              args.province = obj.province
              args.city = obj.city
              args.district = obj.district
              this.args = args
            }
        })
        let coord=new qq.maps.LatLng(loc.latlng.lat,loc.latlng.lng)
        geocoder.getAddress(coord)
        }
    }, false)
    },
    ok(){
      if(this.args == null){
         this.$Message.warning('没有点击地址')
         return
      }
      
      this.$emit('change',this.args)
      this.cancel()
    },
    cancel(){
      this.models = false
      this.$emit('input',this.models)
    }
  }
}

</script>
<style lang="scss">
</style>
