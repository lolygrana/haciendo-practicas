const carrito= document.getElementById("carrito");
const template = document.getElementById("template");
const footer = document.getElementById("footer");
const templateFooter = document.getElementById("templateFooter");
const fragment = document.createDocumentFragment();

let carritoObjeto = [];

//delegación de eventos
document.addEventListener("click", (e)=>{
        //console.log(e.target.matches(".card .btn-outline-primary"));
        if(e.target.matches(".card .btn-outline-primary")){
            //console.log("ejecutar agregar al carrito");
            agregarCarrito(e)
        }
      //  console.log(e.target.matches(".list-group-item .btn-success"))

        if(e.target.matches("#carrito .list-group-item .btn-success")){
            btnAumentar(e);
        }
        if(e.target.matches("#carrito .list-group-item .btn-danger")){
            btnDisminuir(e);
        }
    })



const agregarCarrito = (e) =>{
    //console.log(e.target.dataset.fruta); con e.target traigo la informacion del boton

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta, //está medio al pedo el id acá xq es lo mismo
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio)
    };

    //console.log(producto)
    
    const indice = carritoObjeto.findIndex(
        (item) => item.id === producto.id
    )

    // console.log(indice);

    if (indice === -1){
        carritoObjeto.push(producto)
    } else{
            carritoObjeto[indice].cantidad ++
            // carritoObjeto[indice].precio = carritoObjeto[indice].cantidad * producto.precio
            }

    console.log(carritoObjeto);

    pintarCarrito()
};

const pintarCarrito = () => {

    carrito.textContent = ""; //para que siempre que aprete un boton empiece a leer vacío y no se repita el producto sino que cambie solo la cantidad

    carritoObjeto.forEach((item) => {
        const clone = template.content.cloneNode(true); //clono el template para poder usarlo
        clone.querySelector(".text-white .lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;
        clone.querySelector("div .lead span").textContent = 
        item.precio * item.cantidad;

        clone.querySelector(".btn-danger").dataset.id = item.id;
        clone.querySelector(".btn-success").dataset.id = item.id;

        fragment.appendChild(clone) //agrego el clone al fragment para que no haya reflow
    });

    carrito.appendChild(fragment); //y agrego el fragment al carrito finalmente
    pintarFooter()
}

const pintarFooter = ()=>{
    console.log("pintar footer");
    footer.textContent = "";

    const total = carritoObjeto.reduce(
        (acc, current)=> acc + current.cantidad * current.precio, 
        0 //para que lo devuela como un numero
    );
    
    const clone = templateFooter.content.cloneNode(true);//clonar el template del html 
    clone.querySelector("span").textContent = total; //seleccioné el span que está dentro de templateFooter y le dije que el contenido del span sea el "total" que declaré arriba
    //los templates en html no se renderizan, por eso hacemos una clonación de su contenido para modificarlo e indicarle cuando y donde mostrarlo
    footer.appendChild(clone);// no se necesita fragment xq no es un ciclo

}

const btnAumentar = (e) =>{
    console.log("me diste click ", e.target.dataset.id);
    carritoObjeto= carritoObjeto.map(item =>{
        if (item.id === e.target.dataset.id){
            item.cantidad ++
        }
        return item
    })
    pintarCarrito()
}

const btnDisminuir = (e)=>{
    console.log("me diste click ", e.target.dataset.id);

    carritoObjeto = carritoObjeto.filter(item =>{ //no entendí lo del filter para eliminar los elementos
        if(item.id === e.target.dataset.id){
            if(item.cantidad > 0){
                item.cantidad --
                if (item.cantidad === 0) return
                return item
            }
        } else { return item}
    })
    pintarCarrito()
}