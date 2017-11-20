(() => {

  const [header] = document.getElementsByTagName('header')
  const sections = [...document.getElementsByTagName('section')]
  const carouselImages = [...document.getElementsByClassName('carousel-image')]

  document.addEventListener('scroll', (evt) => {
    const {scrollY} = window
    if (scrollY > 65) {
      header.classList.add('active')
    } else {
      header.classList.remove('active')
    }

    const rects = sections.map(section => section.getBoundingClientRect())
    sections.forEach((section, idx) => {
      const {top} = rects[idx]
      if (top <= 0) {
        section.classList.add('active')
      } else {
        section.classList.remove('active')
      }
    })

    carouselImages.forEach(image => {
      image.style.transform = `translateY(${window.scrollY / 3}px)`
    })
  })

  const updateCarousel = (index) => {
    const image = carouselImages[index]
    image.classList.remove('hidden')

    window.setTimeout(() => {
      image.classList.add('hidden')
      updateCarousel((index + 1) % carouselImages.length)
    }, 5000)
  }

  updateCarousel(0)

})()

