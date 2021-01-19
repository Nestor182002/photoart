// barra de navegacion lateral-----------------------
let items = document.getElementsByClassName('navbars')
let data = document.getElementsByClassName('menu')
let activeone = true;
let activetwo = true;
let activetres = true;
items[0].addEventListener('click', (e) => {

	if (activeone) {
		data[0].style.display = 'flex';
		data[0].style.flexDirection = 'column';
		data[0].style.padding = '10px 0px 10px 0px';
		activeone = false;
	} else {
		data[0].style.display = 'none';
		activeone = true;
	}
	e.preventDefault()
})

items[1].addEventListener('click', () => {

	if (activetwo) {
		data[1].style.display = 'flex';
		data[1].style.flexDirection = 'column';
		data[1].style.padding = '10px 0px 10px 0px';
		activetwo = false;
	} else {
		data[1].style.display = 'none';
		activetwo = true
	}

})

items[2].addEventListener('click', () => {

	if (activetres) {
		data[2].style.display = 'flex';
		data[2].style.flexDirection = 'column';
		data[2].style.padding = '10px 0px 10px 0px';
		activetres = false;
	} else {
		data[2].style.display = 'none';
		activetres = true
	}

})
// // barra de navegacion lateral final-----------------------

// barra de navegacion lateral desplazar-----------------------

let aside = document.getElementById('aside');
let trues = true;
let closes = document.getElementById('cerrar');
let bars = document.getElementById("hamburguer");

bars.addEventListener('click', () => {
	if (trues) {
		aside.style.left = '0%';
		aside.style.transition = '2s';
		bars.style.display = 'none';
		trues = false;
	}
})
closes.addEventListener('click', () => {
	if (trues == false) {
		aside.style.left = '-100%';
		aside.style.transition = '1s';
		bars.style.display = 'flex';
		trues = true;
	}
})


// barra de navegacion lateral desplazar final-----------------------



// pagination start
let paginaActual = 1;
let totalPage = 0;
// apii start-----------------
let buscador = document.getElementById('buscar');
let div = document.getElementById("pintarCards")
let divCreated = document.createElement('div')
divCreated.style.width = '100%';
divCreated.style.display = 'flex';
divCreated.style.flexWrap = 'wrap';
divCreated.style.alignItems = 'center';
divCreated.style.justifyContent = 'center';


// api y el valor del input
let api = async () => {

	let imgForPage = 20;

	let datas = document.getElementById("info").value;

	let API_KEY = '19717756-17a395258c87eb9434f0f28b7';
	let URL = `https://pixabay.com/api/?key=${API_KEY}&q=${datas}&per_page=${imgForPage}&page=${paginaActual}`;
	let peticion = await fetch(URL)
	let resultado = await peticion.json();
	dataimg(resultado)
	console.log(paginaActual)
}

// img y pintar cards
let dataimg = async (resultado) => {
	let imagenes = resultado.hits;
	for (var i = 0; i < imagenes.length; i++) {

		divCreated.innerHTML += `
		<div id="card" class="card">
			<img src="${imagenes[i].largeImageURL}" alt="">
			<div class="sombra">
				<button><i class="far fa-thumbs-up"></i>${imagenes[i].likes}</button>
				<a href="info.html?name="${imagenes[i].id}">Ver mas</a>
			</div>
			
		</div>
		`

	}
	div.appendChild(divCreated);
}

// atras y adelante----
function flechas() {
	let atras = document.getElementById('atras')
	let siguiente = document.getElementById('siguiente')
	let contador = 1;
	siguiente.addEventListener('click', () => {
		paginaActual++;
		div.removeChild(divCreated)
		divCreated.innerHTML = '';
		api();
	})

	atras.addEventListener('click', () => {
		if (paginaActual > 1) {
			paginaActual--;
			div.removeChild(divCreated)
			divCreated.innerHTML = '';
			api();
		}
	})

}


// eventos
buscador.addEventListener('click', () => {
	div.removeChild(divCreated)
	divCreated.innerHTML = '';
	api();	
})
window.addEventListener('load', () => {
	div.innerHTML = '';
	api()
})
flechas()