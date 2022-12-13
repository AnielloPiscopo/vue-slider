/*----------------------------------------------------------------------
DICHIARAZIONI E INIZIALIZZAZIONI GENERALI*/

// * INIZIALIZZAZIONI

// ? ARRAY E OGGETTI DI PARTENZA
const images = [
   {
      image: 'img/01.webp',
      title: 'Marvel\'s Spiderman Miles Morale',
      text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
   },

   {
      image: 'img/02.webp',
      title: 'Ratchet & Clank: Rift Apart',
      text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
   },

   {
      image: 'img/03.webp',
      title: 'Fortnite',
      text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
   },

   {
      image: 'img/04.webp',
      title: 'Stray',
      text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city',
   },

   {
      image: 'img/05.webp',
      title: "Marvel's Avengers",
      text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
   }
];


// ? PRELIEVO DAL DOM INIZIALE
const title = document.querySelector('header h1');
const btnsContainer = document.querySelector('main .buttons');
const btnPreviousElement = document.querySelector('main .button.previous');
const btnNextElement = document.querySelector('main .button.next');
const carouselImageElement = document.querySelector('main .carousel-image');
const carouselThumbnailsContainer = document.querySelector('main .carousel-thumbnails-container');


// ? VARIABILI
let current = 0;
let intervalPresence = true;





/*----------------------------------------------------------------------
CODICE PRINCIPALE*/

// * CODICE LINEARE

// ? CREATI GLI ELEMENTI DEL CAROSELLO IN POSITIONE STATICA E INIIZIALE
images.forEach((img , index) => {
   // * Creazione degli elementi HTML
   const carouselItem = getAnElementWithClasses('div','my_carousel-item');
   const carouselThumbnail = getAnElementWithClasses('div','carousel-thumbnails active');


   // * Condizione iniziale
   if(index === 0){
      carouselItem.classList.add('active');
      carouselThumbnail.classList.remove('active');
   }


   // * Riempimento del contenuto
   carouselItem.innerHTML = `
      <img src='${img['image']}' alt="${img.title}'s game image" title="${img.title}'s game image"></img>
      <h3 class='fw-bold'>${img['title']}</h3>
      <span>${img['text']}</span>
   `;

   carouselThumbnail.innerHTML = `
      <img src='${img['image']}' alt="${img.title}'s game image" title="${img.title}'s game image"></img>
   `;

   // * Inserimento nel DOM
   carouselImageElement.append(carouselItem);
   carouselThumbnailsContainer.append(carouselThumbnail);
})


// ? CREAZIONE DEGLI ARRAY LEGATI AGLI CAROUSEL ITEM E THUMBNAILS PRESENTI NEL DOM CREATI
const carouselItems = document.querySelectorAll('.my_carousel-item');
const carouselThumbnails = document.querySelectorAll('.carousel-thumbnails');



// * EVENTI E TIMING FUNCTIONS

// ? CLICK AL BOTTONE PER TORNARE INDIETRO DI UN ELEMENTO DEL CAROSELLO
btnPreviousElement.addEventListener('click',()=>{
   current = decreaseCurrentCarouselItem(carouselItems,current ,carouselThumbnails);
})


// ? CLICK AL BOTTONE PER ANDARE AVANTI DI UN ELEMENTO DEL CAROSELLO
btnNextElement.addEventListener('click',()=>{
   current = increaseCurrentCarouselItem(carouselItems,current,carouselThumbnails);
})


// ? CLICK AI SINGOLI THUNGNAILS PER SELEZIONARE L'ITEM PRINCIPALE DEL CAROSELLO
carouselThumbnails.forEach((carouselThumbnail,index)=>{
   carouselThumbnail.addEventListener('click', ()=>{
      eliminateCurrentCarouselItem(carouselItems,current,carouselThumbnails);

      current = index;

      addCurrentCarouselItem(carouselItems,current,carouselThumbnails);
   })
})


// ? ANDARE AVANTI DI UN ELEMENTO DEL CAROSELLO NEL TEMPO COSTANTEMENTE
let myInterval = setInterval(()=>{
   current = increaseCurrentCarouselItem(carouselItems , current , carouselThumbnails);
},3000)


// ? ROTTURA DELL'INTERVALLO CREATO TRAMITE CLICK SUL TITOLO
title.addEventListener('click',()=>{
   clearInterval(myInterval);
   

   if(intervalPresence) alert('Intervallo bloccato!');
   

   intervalPresence = false;

   title.title = "L'intervallo è stato già interotto";
})








/*----------------------------------------------------------------------
FUNZIONI*/
// * FUNZIONE PER CREARE UN ELEMENTO HTML CON UNA O PIU' CLASSI
function getAnElementWithClasses(element , elementClasses){
   let htmlElement = document.createElement(element);

   htmlElement.className = elementClasses;

   return htmlElement;
}



// * FUNZIONE PER ANDARE AVANTI DI UN ELEMENTO DI UN CAROSELLO
function increaseCurrentCarouselItem(items , currentIndex , thumbnails){
   eliminateCurrentCarouselItem(items,currentIndex,thumbnails);

   currentIndex = (currentIndex >= items.length-1) ? 0 :  currentIndex+1;

   addCurrentCarouselItem(items,currentIndex,thumbnails);

   return currentIndex;
}



// * FUNZIONE PER ANDARE INDIETRO DI UN ELEMENTO DI UN CAROSELLO
function decreaseCurrentCarouselItem(items , currentIndex , thumbnails){
   eliminateCurrentCarouselItem(items,currentIndex,thumbnails);

   currentIndex = (currentIndex <= 0) ? items.length-1 : currentIndex-1;

   addCurrentCarouselItem(items,currentIndex,thumbnails);

   return currentIndex;
}



// * FUNZIONE PER RIMUOVERE IL VECCHIO ELEMENTO DEL CAROSELLO DALLA CASELLA PRINCIPALE
function eliminateCurrentCarouselItem(items,currentIndex , thumbnails){
   items[currentIndex].classList.remove('active');
   thumbnails[currentIndex].classList.add('active');
}



// * FUNZIONE PER AGGIUNGERE IL NUOVO ELEMENTO DEL CAROSELLO NELLA CASELLA PRINCIPALE
function addCurrentCarouselItem(items,currentIndex , thumbnails){
   items[currentIndex].classList.add('active');
   thumbnails[currentIndex].classList.remove('active');
}