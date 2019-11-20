/**
 * 服务器地址
 */
export const SERVICE_URL = {
  API_URL: [
    'https://rhzgtest.co-inclusion.org/rhzg-app-server', // 测试服务器 0
    'http://192.168.1.116:8083/rhzg-app-server', // 李盛 1
    'http://192.168.1.67:8088/rhzg-app-server' // 张向阳 2
  ],
  API_INDEX: 2
}

/**
 * 接口域名的管理
 */
const base = {
  sq: 'http://192.168.1.75:8083/rhzg-web/org/get-org-type-List',
  bd: 'http://xxxxx22222.com/api'
}

export default base;
