import 'dayjs/locale/zh-tw'
import dayjs from 'dayjs'

dayjs.locale('zh-tw')

export const sleep = t => new Promise(resolve => { setTimeout(resolve, t) })

export const dateFormat = (t, format) => dayjs(t).format(format)

export const enumMapToOptionArray = (enumMap) => {
  return Object.values(enumMap)
    .filter(v => isNaN(Number(v)))
    .map((text: string) => {
      return {
        text,
        value: enumMap[text],
      }
    })
}
