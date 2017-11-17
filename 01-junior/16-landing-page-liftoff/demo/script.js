const btns = [...document.getElementsByTagName('button')]
const box1 = document.getElementById('box-1')

btns.forEach(btn => btn.addEventListener('click', (evt) => {
  evt.preventDefault()
  const mood = evt.target.dataset.mood
  box1.classList.add('sad')
}))
