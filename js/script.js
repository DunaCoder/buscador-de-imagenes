const formulario = document.querySelector('#formulario')
const resultados = document.querySelector('#resultados')
// const contenedorError = document.querySelector('#contenedorError')

let ubicacion = window.pageYOffset




window.addEventListener('scroll', function(){
    let despalzamientoMenu = window.pageYOffset

    console.log(window.pageYOffset)

    if(ubicacion >= despalzamientoMenu){
        this.document.getElementsByTagName('form')[0].style.top='0px'
    }else{
        document.getElementsByTagName('form')[0].style.top='-1000px'
    }

    ubicacion = despalzamientoMenu
})


window.onload = () =>{
    formulario.addEventListener( 'submit', validar)
}

function validar(e){
    e.preventDefault()
    const terminoBusqueda = document.querySelector('#termino').value

    

    if (terminoBusqueda === ''){
        alert('por favor agregue un termino ')
        return
    }

    buscarImagenes(terminoBusqueda)
}


// consultando api 

function buscarImagenes(termino){

    const key = '15066118-a42b7368d12af091c11f09f76'

    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=200`

    fetch(url)
    .then(respuesta => respuesta.json())
    .then(resultados => {
        mostratImagenes(resultados.hits)
    })
}

function mostratImagenes(imagenes){
    console.log(imagenes)

    // eliminar los resultados previos
    while(resultados.firstChild){
        resultados.removeChild(resultados.firstChild)
    }

    // construir HTML

    imagenes.forEach(imagen => {

        // aqui se extraen los datos de la api que se van a mostrar
        const{previewURL, views, user, largeImageURL} = imagen

        // aqui se crea el html
        resultados.innerHTML += `

        <div>
        <img src="${previewURL}"/>
        <p class="autor"> ${user}</p>
        <p> ${views} <span>Vistas</span></p>
        <a  href="${largeImageURL}" target="_blank"
        rel="noopener" "noreferrer"> Ver imagen</a>
        </div>
        `
    });

}