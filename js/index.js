




/*button de chequeo de precio*/
function openbutton() {
    
    const botonOpen = document.getElementById("button1");
    botonOpen.addEventListener("click",function() {
        
        const h = document.getElementById("precio");
        h.style.display = "block";

    });

    const botonCerrar = document.getElementById("button2");
    botonCerrar.addEventListener("click",function() {
        
        const h = document.getElementById("precio");
        h.style.display = "none";
    });


}

