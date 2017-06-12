export default function bar(data) {
  let year = data.getFullYear()
  let month = data.getMonth()+1
  let day = data.getDate()
  let hours = data.getHours()
  let minutes = data.getMinutes()
  return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
}