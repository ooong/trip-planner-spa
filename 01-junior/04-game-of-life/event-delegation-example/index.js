console.log('Welcome to Cody\'s Coffee Shop!')

const menu = document.getElementById('menu')

menu.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('selected')
  }
})

// const listEls = document.querySelectorAll('li')
// const listElsArr = [...listEls]
//
// listElsArr.forEach(function (li) {
//   li.addEventListener('click', function (event) {
//     this.classList.toggle('selected')
//   })
// })
