module.exports = digit => {
  let originArray = '1234567890'.split('')
  let originDigit = digit || 4
  let finalArray = []
  for(let i = 0; i < originDigit; i++){
      finalArray.push(originArray[Math.floor(Math.random() * originArray.length)])
  }
  return finalArray.join('')
}
