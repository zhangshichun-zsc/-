import AREAlIST from './area.js'
/**
 * 通过地址获取ID
 */
export const getAdressId = (provinces, cities, districts) => {
  let adr = []
  for (let key in AREAlIST) {
    for (let item of AREAlIST[key]) {
      let id = Object.keys(item)[0]
      let name = item[id]
      if (key === 'provinces' && name === provinces) {
        adr.push(id) 
        break
      }
      if (key === 'cities' && name === cities) {
        adr.push(id) 
        break
      }
      if (key === 'districts' && name === districts) {
        adr.push(id) 
        break
      }
    }
  }
  return adr
}
/**
 * 通过ID获取地址
 */
export const getAreaAdress = (provinces, cities, districts) => {
  let adr = []
  for (let key in AREAlIST) {
    for (let item of AREAlIST[key]) {
      if (key === 'provinces' && item[provinces]) {
        adr.push(item[provinces])
        break
      }
      if (key === 'cities' && item[cities]) {
        adr.push(item[cities])
        break
      }
      if (key === 'districts' && item[districts]) {
        adr.push(item[districts])
        break
      }
    }
  }
  return adr
}