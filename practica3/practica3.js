const container = document.querySelector(".container");

container.addEventListener("click", e =>{
//formas de acceder a los elementos:
    if(e.target.id === "padre"){
        console.log("diste click al padre")
    }; //acceder al elemento a traves del id

    if(e.target.matches(".border-secondary")){
        console.log ("diste click al hijo"); 
    } // matches busca entre todos los elementos seleccionables dentro del padre, entonces en este caso accedemos al elemento x su clase distintiva 
    
    
    //console.log(e.target.dataset.div) //dataset te devuelve el "data" que pusiste en el html (en este caso pusimos un div"

    if(e.target.dataset.div === "divNieto"){
        console.log("diste click al nieto")
    }
})
// si no quieres usar un contenedor o elemento padre puedes directamente usar todo el document