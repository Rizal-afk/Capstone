/* eslint-disable eqeqeq */
/* eslint-disable no-undef */
const inputReview = document.getElementById('input-review')
const suggestion = document.getElementById('suggestion-text')

const TAB_KEYCODE = 9

let suggestedWord = ''
let insertText = false

async function fetchData (input) {
  try {
    const data = { predict: input }
    const response = await axios
      .post('https://type-suggestion.herokuapp.com/predict', data, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
    let exam = await response.data.prediction
    console.log(exam)
    exam = exam.slice(input.length + 1)
    return exam
  } catch (error) {
    console.error(error)
  }
}

async function renderData (inputValue) {
  suggestedWord = await fetchData(inputValue)
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
  if (suggestedWord != undefined) {
    suggestion.innerHTML = inputValue + await renderData(inputValue)
    console.log(suggestion.innerHTML)
  }

  if (inputValue.length == 0) {
    suggestion.innerHTML = ''
  }

  if (inputReview.value.length == 0) {
    insertText = false
  }
})

inputReview.addEventListener('keydown', e => {
  if (suggestedWord != undefined && suggestedWord != '') {
    if (e.keyCode == TAB_KEYCODE) {
      e.preventDefault()
      inputReview.value = e.target.value + suggestedWord
      suggestion.innerHTML = ''
    }
  }
})
