/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
const inputReview = document.getElementById('input-review')
const suggestion = document.getElementById('suggestion-text')

const TAB_KEYCODE = 9
const BACKSPACE_KEYCODE = 8
const UP_ARROW_KEYCODE = 38
const DOWN_ARROW_KEYCODE = 40
let currentWordIndex = 0

let suggestedWord = ''
let insertText = false
let wordPredict = ''
let suggestedArray = []

// mengirim data ke model
async function fetchData (wordPredict) {
  try {
    const data = { predict: wordPredict }
    const response = await axios
      .post('https://essential-oven-344608.as.r.appspot.com/predict', data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
    let predict = await response.data.prediction
    predict = JSON.parse(predict)
    return predict
  } catch (error) {
    console.error(error)
  }
}

// mengambil data hasil proses model
async function renderData (wordPredict) {
  suggestedWord = await fetchData(wordPredict)
  console.log(suggestedWord)
  return suggestedWord
}

inputReview.addEventListener('input', async (e) => {
  if (e.data != ' ') {
    insertText = true
  }
  if (insertText == false) {
    inputReview.value = ''
  }

  const inputValue = e.target.value
  // mencari pada index berapa .. berada
  wordPredict = inputValue.indexOf('..')
  wordPredict = inputValue.slice(wordPredict)
  // menghilangkan ..
  wordPredict = wordPredict.substring(2)
  // mengecek suggest terdapat . atau tidak
  if (wordPredict.indexOf('.') !== -1) {
    // mencari di index berapa . berada
    const akhirkalimat = word.indexOf('.')
    // mengambil 1 kalimat (sampai index . berada)
    wordPredict = wordPredict.slice(0, akhirkalimat)
  }
  // split string menjadi array substring
  const jumlah = wordPredict.split(' ')
  // mengecek suggestedWord not equal undefined dan kata dari array jumlah lebih dari 1
  if (suggestedWord != undefined && jumlah.length > 1) {
    suggestedArray = await (renderData(wordPredict))
    suggestion.innerHTML = e.target.value.substring(0, e.target.value.indexOf('..') + 2) + suggestedArray[0]
  }

  if (inputValue.length == 0) {
    suggestion.innerHTML = ''
  }

  if (inputReview.value.length == 0) {
    insertText = false
  }
})

inputReview.addEventListener('keydown', e => {
  if (e.keyCode == UP_ARROW_KEYCODE) {
    if (currentWordIndex == 0) return
    currentWordIndex--
    suggestion.innerHTML = e.target.value.substring(0, e.target.value.indexOf('..') + 2) + suggestedArray[currentWordIndex]
  }

  if (e.keyCode == DOWN_ARROW_KEYCODE && suggestedWord != undefined && suggestedWord != '') {
    if (currentWordIndex == suggestedWord.length - 1) return
    currentWordIndex++
    suggestion.innerHTML = e.target.value.substring(0, e.target.value.indexOf('..') + 2) + suggestedArray[currentWordIndex]
  }

  if (e.keyCode == BACKSPACE_KEYCODE) {
    currentWordIndex = 0
  }

  if (suggestedWord != undefined && suggestedWord != '') {
    if (e.keyCode == TAB_KEYCODE) {
      e.preventDefault()
      inputReview.value = e.target.value.substring(0, e.target.value.indexOf('..')) + suggestedArray[currentWordIndex]
      console.log(suggestedArray[currentWordIndex])
      suggestion.innerHTML = ''
      suggestedWord = ''
    }
  }
})
