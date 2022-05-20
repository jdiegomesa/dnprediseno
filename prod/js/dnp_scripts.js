let DNPsharepointContainer = document.getElementById('s4-workspace');
let DNPheader = document.getElementById('DNPheader');
let DNPnav = document.getElementById('DNPnav');
let DNPUp = document.getElementById('DNPUp');
let DNPheaderOffset = DNPheader.offsetHeight;

// Función para hacer scroll hasta un elemento
// Recibe como parámetro el id del elemento
function DNPscroll(el){
  let DNPelement_scroll = document.getElementById(el);
  let DNPscrollingObject = {
    top: (DNPelement_scroll.getBoundingClientRect().top - (window.innerHeight / 3)),
    left: 0,
    behavior: 'smooth'
  }
  if(DNPsharepointContainer){
    DNPsharepointContainer.scrollBy(DNPscrollingObject);
  } else{
    window.scrollBy(DNPscrollingObject);
  }
}

var DNPinterval = false;
// Funciones para avanzar, retroceder o reproducir sliders
// Parámetro el: id del slider
// Parámetro cl: clase de los slides
// Parámetro val: valida si el slider tiene puntos (dots) o no
// Parámetro num: número del slide sobre el que se realiza la acción
// Parámetro but: id del botón relacionado a la acción
// Parámetro time: tiempo para la ejecución de la acción 

function DNPnextSlide(el){
    //Calcula número de slides
    let numberOfSlides = document.getElementsByClassName(el + '-element').length;
    let container = document.getElementById(el);
    // Mide cuántos elementos se muestran 
    let maxPosition = Math.round((container.parentElement.offsetWidth / document.getElementsByClassName(el + '-element')[0].offsetWidth)) - 1;
    let position = parseInt(container.getAttribute('data-position'));
    let percentageToMove = position*(100/numberOfSlides);
    if(position >= (numberOfSlides - maxPosition)){
      position = 0;
      percentageToMove = 0;
    }
    container.setAttribute('data-position', (position + 1));
    container.style.transform = 'translateX(-' + percentageToMove + '%)';
    DNPactiveDot(el, (position + 1));
};

function DNPprevSlide(el){
  let numberOfSlides = document.getElementsByClassName(el + '-element').length;
  let container = document.getElementById(el);
  let maxPosition = Math.round((container.parentElement.offsetWidth / document.getElementsByClassName(el + '-element')[0].offsetWidth)) - 1;
  let position = parseInt(container.getAttribute('data-position'));
  let percentageToMove = (position - 2) *(100/numberOfSlides);
  if(position <= 1){
    position = (numberOfSlides - maxPosition) + 1;
    percentageToMove = ((numberOfSlides - maxPosition) - 1) *(100/numberOfSlides);
  }
  container.setAttribute('data-position', (position - 1));
  container.style.transform = 'translateX(-' + percentageToMove + '%)';
  DNPactiveDot(el, (position - 1));
};

function DNPgotoSlide(el, num){
  if(DNPinterval){
    clearInterval(DNPinterval);
    DNPinterval = false;
  }
  let numberOfSlides = document.getElementsByClassName(el + '-element').length;
  let container = document.getElementById(el);
  let position = num;
  let percentageToMove = (position - 1) *(100/numberOfSlides);
  container.setAttribute('data-position', position);
  container.style.transform = 'translateX(-' + percentageToMove + '%)';
  DNPactiveDot(el, num);
};

//Activa el punto del slider
function DNPactiveDot(el, num){
  let dots = document.getElementsByClassName(el + '-dot');
  if(dots.length > 0){
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }
    dots[num - 1].classList.add('active');
  }
}

//Activa o pausa la autoreproducción del slider
function DNPsliderPlay(el, cl, but, time){
  if(but){
    DNPopen(but);
  }
  if (!DNPinterval){
    DNPinterval = window.setInterval(function(){
      DNPnextSlide(el, cl);
    }, time);
    DNPnextSlide(el, cl)
  } else{
    clearInterval(DNPinterval);
    DNPinterval = false;
  }
}

// Función para abrir elementos
// Primer parámetro: id del elemento al que le agregará la clase 'opened'
// Segundo parámetro (opcional): clase de los elementos a los que les quitará la clase 'opened'
function DNPopen(el, cl){
  let element = document.getElementById(el);
  if(cl){
    let sameClass = document.getElementsByClassName(cl);
    for(i = 0; i < sameClass.length; i++){
      if(sameClass[i] != element){
        sameClass[i].classList.remove('opened');
      }
    }
  }
  element.classList.toggle('opened');
  document.activeElement.blur();
  DNPscroll(el);
}

//Pone la clase fixed al menú si la página está más abajo de él, o se la quita si está más arriba
// Valida si encuentra el div de Sharepoint 
function DNPvalidatePosition(el){
  if ( el  > DNPheaderOffset ){
    DNPnav.classList.add('fixed');
    if(DNPUp){
      DNPUp.classList.add('show');
    }
  } else {
    DNPnav.classList.remove('fixed');
    if(DNPUp){
      DNPUp.classList.remove('show');
    }
  }
}
if(DNPsharepointContainer){
  DNPsharepointContainer.onscroll = () => DNPvalidatePosition(DNPsharepointContainer.scrollTop);
} else {
  window.onscroll = () => DNPvalidatePosition(window.pageYOffset);
}

// Ordena de manera aleatoria los elementos del bloque Portales del Home 

let DNPlogos_container = document.querySelector('#DNPPortales');
let DNPlogos;

if(DNPlogos_container){
  DNPlogos = Array.prototype.slice.call(DNPlogos_container.getElementsByClassName('DNPPortales-element'));
}

function DNPshuffle_logos() {
  DNPlogos.forEach(function(element){
    DNPlogos_container.removeChild(element);
  })
  DNPshuffleArray(DNPlogos);
  DNPlogos.forEach(function(element){
    DNPlogos_container.appendChild(element);
  })
}

function DNPshuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

//Si detecta los elementos (se trata del Home) se ejecuta la función 
if (DNPlogos_container && DNPlogos.length > 1) {
  DNPshuffle_logos();
}