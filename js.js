console.log('Segunda entrega TF');



//Declaración de arrays ↓↓
const precios = [];

//----------------------------------------EVENTOS Y DOM----------------------------------------


//Referencia a los botones de cuadros y esculturas.
const c1 = document.getElementById('c1');
const c2 = document.getElementById('c2');
const c3 = document.getElementById('c3');
const c4 = document.getElementById('c4');
const reset = document.getElementById('reset');
const recuperar = document.getElementById('recuperar');
const subtotal = document.getElementById('subtotal');


//Declaración de variables 
let C1=0; 
let C2=0;
let C3=0;
let C4=0;


//Declaración de funciones ↓↓
function seleccion (counter, listado, order, price, image) {
    return function () { //Le devuelvo una funcion para que cada vez que se ejecute el click, se ejecute esa funcion. Sino se ejecutaria una sola vez. Esto es una funcion counter.
        counter = counter + 1;

        listado.innerHTML = null;
        let x = document.getElementById('x' + order);
        let xx = document.getElementById('xx' + order);
        const description = `Ha agregado ${x.innerText} ${xx.innerText} x ${counter} al carrito.`;
        

        Swal.fire({
            position: 'top-end',
            background: '#fff',
            title: `¡Añadido!`,
            text: description,
            imageUrl: image,
            imageWidth: 300,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })

        localStorage.setItem('cuadro' + order, description);
        let agregarCuadro = document.createElement('li');
        agregarCuadro.innerHTML = `${description}`;
        listado.append(agregarCuadro);    
        precios.push(price); 
    }  
}


function fnRecuperar(){
    const cuadro1 = localStorage.getItem('cuadro1');
    const cuadro2 = localStorage.getItem('cuadro2');
    const cuadro3 = localStorage.getItem('cuadro3');
    const cuadro4 = localStorage.getItem('cuadro4');
    //alert(`${cuadro1}\n${cuadro2}\n${cuadro3}\n${cuadro4}`)
    
    if ( cuadro1 != null){
        let agregarc1 = document.createElement('li');
        agregarc1.innerHTML = `${cuadro1}`;
        listado5.append(agregarc1); 
    }
    
    if ( cuadro2 != null){
        let agregarc2 = document.createElement('li');
        agregarc2.innerHTML = `${cuadro2}`;
        listado6.append(agregarc2); 
    }
    
    if ( cuadro3 != null){
        let agregarc3 = document.createElement('li');
        agregarc3.innerHTML = `${cuadro3}`;
        listado7.append(agregarc3); 
    }
    
    if ( cuadro4 != null){
    let agregarc4 = document.createElement('li');
    agregarc4.innerHTML = `${cuadro4}`;
    listado8.append(agregarc4); 
    }
}


function fnSubtotal () {
    let suma = 0;
    const total = (x) => suma = suma+x;
    precios.forEach(total); //Función de orden superior
    localStorage.setItem('suma',suma);
    Toastify({

        text: ` Subtotal : $${localStorage.getItem('suma')}`,
        
        duration: 3000
        
        }).showToast();
        localStorage.clear();  
}

function fnComprar (){

    
    Toastify({

        text: "¡Compra exitosa!",
        
        duration: 3000
        
        }).showToast();
        localStorage.clear();
}




//Eventos para cuadros 
c1.addEventListener('click',seleccion (C1, listado1, 1, 150000, 'https://i.pinimg.com/736x/77/82/21/778221a7b51e8ea9142e4a724f3edf87.jpg'));
c2.addEventListener('click',seleccion (C2, listado2, 2, 90000, 'https://www.decoora.com/wp-content/uploads/2021/03/cuadros-modernos.jpg.webp'));
c3.addEventListener('click',seleccion (C3, listado3, 3, 210000, 'https://2.bp.blogspot.com/-xfm8cp1pQlo/VYc51lKsNxI/AAAAAAADVUw/jaLG-NsnUaM/s1600/retratos-pintados-oleo-mujeres.jpg') );
c4.addEventListener('click',seleccion (C4, listado4, 4, 110000, 'https://www.artmajeur.com/medias/standard/h/e/hernana-alvarez/artwork/8897989_cuadros-modernos-abstractos-en-acrilico-2.jpg'));
reset.addEventListener('click', () => localStorage.clear());
recuperar.addEventListener('click', fnRecuperar);
subtotal.addEventListener('click', fnSubtotal);
comprar.addEventListener('click', fnComprar);


//--------------------------------------------- FETCH ↓↓ -------------------------------------------------------

const URL_USD_OFICIAL = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
let compra = [];


function cotizaciones (valor) {
    valor.forEach( x => { 
        if ( x.casa.nombre != 'Argentina' && x.casa.venta != 0){
            compra.push({nombre: x.casa.nombre, venta: x.casa.venta} ) //array de objetos.
        }
    });
}


fetch(URL_USD_OFICIAL)
.then( respuesta => { return respuesta.json()} )
.then( datos => {
    //console.log(datos);
    cotizaciones(datos); 
} )

//Evento para FETCH ↓↓

/*function fnUSD (){
    alert(compra.map(   ({nombre,venta}) => `${nombre}:  $${venta}`).join('\n')    )  //itero el array de compra
}*/


function fnUSD (){
    Toastify({

        text: compra.map(   ({nombre,venta}) => `${nombre}:  $${venta}`).join('\n'),
        
        duration: 7000
        
        }).showToast();

}

let usd = document.getElementById('usd');
usd.addEventListener('click', fnUSD )