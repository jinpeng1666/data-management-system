export const getTime = () => {
  let message = ''
  const hours = new Date().getHours()

  if (hours <= 4) {
    message = '凌晨'
  } else if (hours <= 9) {
    message = '早上'
  } else if (hours <= 11) {
    message = '上午'
  } else if (hours <= 13) {
    message = '中午'
  } else if (hours <= 19) {
    message = '下午'
  } else {
    message = '晚上'
  }

  return message
}
