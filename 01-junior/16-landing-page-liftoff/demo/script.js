const btns = [...document.getElementsByTagName('button')]
const box = document.getElementById('box')

const FINE = 'fine'
const SAD = 'sad'

btns.forEach(btn => btn.addEventListener('click', (evt) => {
  evt.preventDefault()
  const mood = evt.target.dataset.mood
  console.log(mood)

  switch (mood) {
    case SAD:
      box.classList.remove(FINE)
      box.classList.add(SAD)
      break
    case FINE:
      box.classList.remove(SAD)
      box.classList.add(FINE)
      break
  }
}))
