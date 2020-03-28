const get = (obj, ...selectors) => {
  return selectors.map(s => {
    let res = obj
    if (s.includes('[')) {
      s = s.replace(/\[/g, '.').replace(/\]/g, '')
    }
    const keys = s.split('.')
    keys.forEach(key => {
      try {
        res = res[key]
      } catch (error) {
        return undefined
      }
    })
    return res
  })
}

const obj = {
  zcy: { shareFront: { mates: 'mafei' } },
  alibaba: ['antd', { group: 'xxx' }]
}

console.log(
  get(obj, 'zcy.shareFront.mates', 'xxx.aaa', 'alibaba[1].group', 'xxx.aaa')
) // ['mafei','xxx']
