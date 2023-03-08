const carrito= document.getElementById("carrito");
const template = document.getElementById("template");
const botones = document.querySelectorAll(".card .btn");
const fragment = document.createDocumentFragment();


const carritoObjeto = {};

const agregarCarrito = (e) =>{
    //console.log(e.target.dataset.fruta); con e.target traigo la informacion del boton

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta, //está medio al pedo el id acá xq es lo mismo
        cantidad: 1
    }

    if (carritoObjeto.hasOwnProperty(producto.titulo)){ //dice que si existe esa propiedad, que es "frutilla" o "banana" o "manzana", va a pasar esto:
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1; //busco el producto y le sumo uno a la cantidad
    }

    carritoObjeto[producto.titulo] = producto; //entre los corchetes busco la propiedad (las frutas) y al carritoObjeto le hago push los productos (su titulo, id y cantidad)

    pintarCarrito(producto); //ejecuto la funcion de abajo que es para recorrer el objeto
};

const pintarCarrito = (producto) => {

    carrito.textContent = ""; //para que siempre que aprete un boton empiece a leer vacío y no se repita el producto sino que cambie solo la cantidad

    Object.values(carritoObjeto).forEach(item => {//recorro el objeto y pinto el titulo y la cantidad
        const clone = template.content.firstElementChild.cloneNode(true); //clono el template para poder usarlo
        clone.querySelector(".lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;

        fragment.appendChild(clone) //agrego el clone al fragment para que no haya reflow
    });

    carrito.appendChild(fragment); //y agrego el fragment al carrito finalmente
}

botones.forEach((btn) => btn.addEventListener("click", agregarCarrito));

