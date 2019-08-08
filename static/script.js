let info =
  'CRIVELLO DI ERATOSTENE\nInserire il numero massimo entro il quale cercare i numeri primi (da 2 al numero precedente a quello inserito) e scegliere una modalità di visualizzazione.\nNella modalità grafica si possono cambiare i colori premendo "Enter". Le celle bianche sono i numeri primi.\nLa modalità testuale riesce a calcolare oltre a un miliardo come cifra massima a differenza di quella grafica che dovendo renderizzare molte celle si ferma ad una cifra nettamente inferiore.\nSe preme "Ok" verrà impostato un cookie in modo tale che questo avviso non appaia più quando si refresha la pagina.'
let modeChanged = false
let oldMax = 0
let primi = []

InitPopup()

function ChangeMode() {
  modeChanged = true
  Calcola()
}

function CreaTabella(max) {
  let table = document.createElement('table')
  table.id = 'tabella-crivello'

  let div = document.getElementById('div-tabella')
  // Tabella vuota
  div.replaceChild(table, div.firstChild)

  let row = document.createElement('tr')

  // Creo tabella
  for (var i = 1; i <= max; i++) {
    // Creo colonna
    let col = document.createElement('td')
    col.appendChild(document.createTextNode(i))
    setAttributes(col, {
      value: i,
      width: '50px',
      height: '50px'
    })

    // Aggiungo la colonna
    row.appendChild(col)

    // Faccio la tabella con righe da 10 colonne
    if (i % 10 == 0) {
      // Aggiungo la riga completa
      table.appendChild(row)
      // Creo la riga successiva
      row = document.createElement('tr')
    }
  }

  // Se il max non è un multiplo di 10 aggiungo l'ultima riga
  if (max % 10 != 0) table.appendChild(row)

  table.rows[0].cells[0].id = 'first'

  return table
}

function Primi(array, max) {
  let primi = []
  for (let i = 2; i < max; i++) {
    if (array[i]) primi.push(i)
  }
  return primi
}

function Pulisci() {
  console.clear()
  // Pulisci tabella
  document.getElementById('tabella-crivello').textContent = ''
  // Pulisci div
  document.getElementById('primi').innerHTML = ''
}

function Calcola() {
  let max = document.getElementById('max').value
  
  if (max == '') {
    oldMax = 0
    Pulisci()
    return false
  } else if (isNaN(max) || (!isNaN(max) && parseInt(max) < 1)) {
    oldMax = 0
    alert('I caratteri e i numeri minori di 1 non sono ammessi')
    return false
  }

  max = parseInt(max)

  if (oldMax == max && modeChanged == false && event.key == 'Enter') {
    Colors(primi)
    return false
  } else if (oldMax == max && modeChanged == false && event.key != 'Enter')
    return false

  Pulisci()

  let array = new Array(max).fill(true),
    upperLimit = Math.sqrt(max + 1)

  let select = document.getElementById('modalita')
  let mode = select.options[select.selectedIndex].value

  // Modalità grafica
  let table, tds
  if (mode == 'true') {
    table = CreaTabella(max)
    tds = document.getElementsByTagName('td')
  }

  // Trovo i numeri primi partendo da 2, 3, 5...
  for (let i = 2; i <= upperLimit; i++) {
    if (array[i]) {
      // È un numero primo
      for (let j = i * i; j <= max; j += i) {
        if (mode == 'true')
          // Assegno la classe con il numero primo per colorare la cella in seguito
          tds[j - 1].setAttribute('class', i)
        // Dato che è multiplo non è primo quindi lo metto a false
        array[j] = false
      }
    }
  }

  // Modalità testuale
  if (mode == 'false')
    document.getElementById('primi').innerHTML = Primi(array, max).join(', ')
  else Colors((primi = Primi(array, max)))

  oldMax = max
  modeChanged = false
}

function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key])
  }
}

function getRandomColor() {
  let letters = 'BCDEF'.split('')
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * letters.length)]
  }
  return color
}

function Colors(primi) {
  primi.forEach(primo => {
    let color = getRandomColor()
    let tds = document.getElementsByClassName(primo)
    for (let i = 0; i < tds.length; i++) {
      tds[i].setAttribute('bgColor', color)
    }
  })
}

function SetCookie(name, value) {
  let expiration = new Date()
  let now = new Date()
  expiration.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000) // un anno
  document.cookie =
    name +
    '=' +
    escape(value) +
    '; expires=' +
    expiration.toGMTString() +
    '; path=/'
}

function CheckCookie(name) {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=')
    if (start != -1) {
      start = start + name.length + 1
      let end = document.cookie.indexOf(';', start)
      if (end == -1) end = document.cookie.length
      return true
    } else {
      return false
    }
  }
  return false
}

function DeleteCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;'
}

function InitPopup() {
  if (!CheckCookie('pop')) if (confirm(info)) SetCookie('pop', 0)
}
