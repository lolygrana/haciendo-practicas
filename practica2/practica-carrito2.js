//convertí el objeto (carritoObjeto) en un array, por lo tanto cambió todo el procedimiento, así es mas corto

const carrito= document.getElementById("carrito");
const template = document.getElementById("template");
const botones = document.querySelectorAll(".card .btn");
const fragment = document.createDocumentFragment();


const carritoObjeto = [];

const agregarCarrito = (e) =>{
    //console.log(e.target.dataset.fruta); con e.target traigo la informacion del boton

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta, //está medio al pedo el id acá xq es lo mismo
        cantidad: 1
    };
    
    const indice = carritoObjeto.findIndex(
        (item) => item.id === producto.id
    )

    console.log(indice);

    if (indice === -1){
        carritoObjeto.push(producto)
    } else{
        carritoObjeto[indice].cantidad ++
    }

    console.log(carritoObjeto);

    pintarCarrito(carritoObjeto)
};

const pintarCarrito = (array) => {

    carrito.textContent = ""; //para que siempre que aprete un boton empiece a leer vacío y no se repita el producto sino que cambie solo la cantidad

    array.forEach(item => {
        const clone = template.content.firstElementChild.cloneNode(true); //clono el template para poder usarlo
        clone.querySelector(".lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;

        fragment.appendChild(clone) //agrego el clone al fragment para que no haya reflow
    });

    carrito.appendChild(fragment); //y agrego el fragment al carrito finalmente
}

botones.forEach((btn) => btn.addEventListener("click", agregarCarrito));

