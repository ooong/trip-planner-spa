const parent = [document.getElementById('parent')]
const children = [...parent[0].children]
const nodes = {parent, children}
const forms = [...document.getElementsByClassName('forms')]

// n :: String -> Number
const n = px => +px.split('').slice(0, -2).join('')

// calc :: String -> Number -> String
const calc = (px, m) => `${n(px) + m}px`

// isBoxProp :: String -> Bool
const isBoxProp = name => name.split(' ').length === 2

// calculateBoxProp :: Node -> [String, String] -> Void
const calculateBoxProp = (node, [prop, op]) => {
  const _value = node.style[prop]
  op === '+'
    ? node.style[prop] = calc(_value, 10)
    : node.style[prop] = calc(_value, -10)
}

// calculateBoxProp :: Node -> String -> String -> Void
const setStyle = (node, name, value) => {
  isBoxProp(name)
    ? calculateBoxProp(node, name.split(' '))
    : node.style[name] = value
}

// main :: Void
const main = () => forms.forEach(form => {
  form.addEventListener('click', (evt) => {
    const target = evt.target
    const {tagName} = target
    if (tagName !== 'INPUT' && tagName !== 'BUTTON') return
    if (tagName === 'BUTTON') evt.preventDefault()
    nodes[form.dataset.target].map(node => {
      const {name, value} = target
      setStyle(node, name, value)
    })
  })
})

main()
