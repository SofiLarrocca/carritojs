// PAGINA INICIO
let inicio = document.getElementById ('user')
let btnIngreso = document.getElementById ('btn-index')

// Evento click
inicio.addEventListener('keydown', () => { 
    let ingreso = document.getElementById('btn-index')
    ingreso.style.display = 'block'
})

btnIngreso.addEventListener ('click', ()=> { 
    let usuario = inicio.value
    alert (`Bienvenido ${usuario}`)
})

