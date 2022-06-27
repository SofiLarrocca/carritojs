let tbody = document.getElementById ('tbody')

class Pedido { 
    constructor (id, nombre, email, telefono, carritoPedido) { 
        this.id = id
        this.nombre = nombre
        this.email = email
        this.telefono = telefono
        this.carritoPedido = carritoPedido
    }
}

function mostrarPedido () { 
    let usuario = JSON.parse(localStorage.getItem ('nombreComprador'))
    let email = JSON.parse(localStorage.getItem ('emailComprador'))
    let telefono = JSON.parse(localStorage.getItem ('telComprador'))
    let carritoUsuario = JSON.parse(localStorage.getItem ('compra'))
    
    let pedido = new Pedido (1, usuario, email, telefono, carritoUsuario)

    completarTabla (pedido)
    console.log (pedido)
}


function completarTabla (pedido) {

    let fila = document.createElement ('tr')
    
    fila.innerHTML = `
    <th>${pedido.id}</th>
    <td>${pedido.nombre}</td>
    <td>${pedido.email}</td>
    <td>${pedido.telefono}</td>`

    tbody.append(fila)
}
