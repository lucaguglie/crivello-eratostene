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

  table.rows[0].cells[0].id = 'first'

  // Se il max non è un multiplo di 10 aggiungo l'ultima riga
  if (max % 10 != 0) table.appendChild(row)

  return table
}

function StampaPrimi(array, max) {
  let primi = []
  for (let i = 2; i < max; i++) {
    if (array[i]) primi.push(i)
  }
  return primi
}

function Pulisci() {
  // Pulisci tabella
  document.getElementById('tabella-crivello').textContent = ''
  // Pulisci div
  document.getElementById('primi').innerHTML = ''
}

function Calcola() {
  console.clear()
  Pulisci()
  if (document.getElementById('max').value == '') return false

  let max = parseInt(document.getElementById('max').value)

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
      let color = getRandomColor()
      for (let j = i * i; j < max; j += i) {
        if (mode == 'true')
          // Coloro il multiplo del numero primo
          tds[j - 1].setAttribute('bgColor', color)
        // Dato che è multiplo non è primo quindi lo metto a false
        array[j] = false
      }
    }
  }

  // Modalità testuale
  if (mode == 'false')
    document.getElementById('primi').innerHTML = StampaPrimi(array, max).join(
      ', '
    )
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
