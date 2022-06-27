//Variables carrito
let contadorCarrito = document.getElementById('contador-cart')
let cartIcon = document.getElementById ('bi-cart')
let contenedorCarrito = document.getElementById ('container-cart') /*donde se van a cargar los productos seleccionados*/

let carrito = []


let contenedorProductos = document.getElementById('container-productos')
// Mostrar productos en HTML
function mostrarProductosHTML () { 
    productos.forEach ((producto) => { 
        // Creamos la card para cada producto
        let card = document.createElement ('div')
        card.className = 'card'
        // Completamos la card con descripcion del producto
        let img = document.createElement ('img')
        img.src = producto.img
        img.className = 'img-card'
        let marcaCard = document.createElement ('h3')
        marcaCard.innerText = producto.marca
        let variedadCard = document.createElement ('h4')
        variedadCard.innerText = producto.variedad
        let precioCard = document.createElement ('h3')
        precioCard.innerText = '$ ' + producto.precio

        btnCard = document.createElement('button')
        btnCard.innerText = 'Agregar al carrito'
        btnCard.className = 'btn'

        contenedorProductos.append(card)
        card.append(img, marcaCard, variedadCard, precioCard, btnCard)


        // Evento click "añadir al carrito"
        btnCard.addEventListener('click', ()=> { 
            contenedorCarrito.innerHTML = '' 
            agregarCarrito(producto)

          
            //AGREGAR ALERT RESPONSIVE !!
            // alert(`Se agregó ${e.marca} ${e.variedad} al carrito`)
    })
})}
mostrarProductosHTML ()


// Evento click en Icono Carrito cuando todavía no hay productos seleccionados
cartIcon.addEventListener ('click', () => { 
    contenedorCarrito.classList.toggle ('block')
    if(carrito.length == 0) { 
     // Si el carrito esta vacío aparece el siguiente mensaje:
     contenedorCarrito.innerHTML = ''
     const div = document.createElement('div')
     div.style.display = 'flex'
     div.style.alignItems = 'center'
     div.innerHTML = `
     <p>El carrito está vacío</p>
     <a href=#footer class='btn btn--left'>Comprar</a>` 
 
     contenedorCarrito.append(div)
 } else { 
    // finalizarCompra () /*Si el carrito tiene productos, podrás finalizar la compra*/
 }
 })


// Manipular Carrito de Compras
function agregarCarrito (producto) {
    // Agregar producto al carrito:
    // Priero verificar si el producto está agregado o no. Si no está: lo agrega, si ya fue agregado: le suma a la cantidad
    let existe = carrito.some((idProd)=>idProd.id === producto.id)

    if (existe) { 
        const prodDuplicado = carrito.map((idProd) => { 
            if (idProd.id === producto.id) { 
                cantidad = producto.cantidad++

                let suma = carrito.reduce((acc , prod)=> acc + prod.cantidad , 0)
                contadorCarrito.innerHTML = `<p> ${suma}</p>`
            }})
    } else { 
        const item = productos.find (e => e.id === producto.id)
        carrito.push(item)
        let suma = carrito.reduce((acc , prod)=> acc + prod.cantidad , 0)
        contadorCarrito.innerHTML = `<p> ${suma}</p>`
    }
    actualizarCarrito()
}


// Eliminar producto seleccionado del carrito
function eliminarProducto (prodCarrito) { 
    const item = carrito.find (e=> e.id === prodCarrito.id)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    
    // Igualo la cantidad a 0
    prodCarrito.cantidad = 0
    // Actualizo contador
    let suma = carrito.reduce((acc , prod)=> acc + prod.cantidad , 0)
    contadorCarrito.innerHTML = `<p> ${suma}</p>`
    // Vuelvo a cargar la cantidad en 1 para volver a empezar a contar
    prodCarrito.cantidad = 1
    actualizarCarrito ()
}


// Mostrar productos seleccionados en el carrito:
function actualizarCarrito () {
    carrito.forEach ((prodCarrito) => {
        const div = document.createElement('div')
        div.className = 'div-cart'

        // Creamos elementos a dibujar en div
        div.innerHTML = `
        <p>${prodCarrito.cantidad}</p>
        <img class='img-cart' src=${prodCarrito.img}>
        <h3>${prodCarrito.marca}</h3>
        <h4>${prodCarrito.variedad}</h4>
        <p class='text-right'><span>${prodCarrito.precio}</span></p>`
        contenedorCarrito.append(div)
        
        let botonEliminar = document.createElement ('i')
        botonEliminar.className= "bi bi-x-lg"
        botonEliminar.style.padding = '0 1rem'

        contenedorCarrito.append(div)
        div.append(botonEliminar)


        // Evento botón eliminar carrito
        botonEliminar.addEventListener ('click', () => { 
            contenedorCarrito.innerHTML = ''            
            eliminarProducto(prodCarrito)

        // Si el carrito esta vacío, desaparece el div del contenedor carrito. 
        if (carrito.length == 0) {
            contenedorCarrito.style.display = 'none'
        }
        })
    


        //Guardar info de compra en LocalStorage
        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    precioTotal ()
    finalizarCompra()
}

// Calcular precio total de la compra
function precioTotal () {
    const precioTotal = document.createElement('div')
    precioTotal.innerHTML = `
    <p>PRECIO TOTAL $ ${carrito.reduce((acc , precioProd)=> acc + precioProd.precio*precioProd.cantidad ,0)}</p>`
    // Estilos texto precio total
    precioTotal.style.fontWeight = 800
    precioTotal.style.marginTop = '2rem'
    precioTotal.style.textAlign = 'right'

    contenedorCarrito.append(precioTotal)


}


//FORMULARIO COMPRA
let btnFinalizar = document.getElementById ('btnFinalizar')
let formulario = document.getElementById('formulario')  
let cartFormulario = document.getElementById('cart-formulario')

function finalizarCompra () {
    // Una vez que se agregó productos al carrito aparece el Botón 'FINALIZAR COMPRA'
    if (carrito.length != 0) {
    btnFinalizar.style.display = 'block'
    } else { 
        btnFinalizar.style.display = 'none'
    }
}

btnFinalizar.addEventListener ("click", ()=> { 
    //Una vez que el usuario finalizó la compra, aparecerá formulario 
    formulario.classList.toggle ('block')

    // Buscamos info sobre productos comprados en LocalStorage
    let compra = JSON.parse (localStorage.getItem('carrito'))  
    
    let parrafo = document.createElement ('p')
    parrafo.innerText = 'TU CARRITO'
    
    cartFormulario.append(parrafo)
    
    // Muestra en formulario el carrito comprado
    compra.forEach ((e) => { 
        const detalleCart = document.createElement('div')

        detalleCart.innerHTML = `
        <p>${e.cantidad}</p>
        <img class='img-cart' src=${e.img}>
        <h3>${e.marca}</h3>
        <h4>${e.variedad}</h4>
        <p class='text-right'><span>${e.precio}</span></p>`

        cartFormulario.append(detalleCart)

        //Estilos detalleCart
        detalleCart.style.display = 'flex'
        detalleCart.style.alignItems = 'center'
    })
})


// Boton ENVIAR
let enviar = document.getElementById ('enviar')

enviar.addEventListener ('click', () => { 
    let comprador = document.getElementById ('nombre').value
    alert (`Gracias ${comprador} por tu compra! \n
    Enviaremos por correo electrónico pasos para realizar el pago`)

    guardarCompra()
})


//Guardamos la compra en LocalStorage
function guardarCompra () { 
    let nombreComprador = document.getElementById ('nombre').value
    let emailComprador = document.getElementById ('email').value
    let telComprador = document.getElementById ('telefono').value
    let carritoUsuario = JSON.parse(localStorage.getItem('carrito'))
    
    let nombre = localStorage.setItem('nombreComprador', JSON.stringify(nombreComprador))
    let email = localStorage.setItem('emailComprador', JSON.stringify(emailComprador))
    let telefono = localStorage.setItem ('telComprador', JSON.stringify(telComprador))
    let compra = localStorage.setItem ('compra', JSON.stringify(carritoUsuario))    
}




// Creamos nuevo objeto por cada pedido enviado
class Pedido { 
    constructor(idComprador, nombre, email, telefono, pedido) { 
        this.idComprador = idComprador,
        this.nombre = nombre,
        this.email = email,
        this.telefono = telefono,
        this.pedido = [pedido] 
    }
}

//Capturamos info guardada de la compra y la mostramos por consola
function pedidoEnviado () {
    let nombre = JSON.parse(localStorage.getItem('nombreComprador'))
    let email =  JSON.parse(localStorage.getItem('emailComprador'))
    let telefono = JSON.parse(localStorage.getItem('telComprador'))
    let compra = JSON.parse(localStorage.getItem('compra'))   
    
    pedido1 = new Pedido (1, nombre, email, telefono, compra)
    console.log (pedido1)
}

pedidoEnviado () 











