// * ABIENTE DI SVILUPPO VUE
const {createApp} = Vue;

createApp({
    data() {
        return {
            images : [
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
            ],
            
            activeImageIndex : 0,
            autoPlay : null,
            intervalPresence : false,
        }
    },



    methods: {
        decreaseIndex(arrLength){
            this.activeImageIndex = (this.activeImageIndex <= 0) ? arrLength-1 : this.activeImageIndex - 1;
        },

        increaseIndex(arrLength){
            this.activeImageIndex = (this.activeImageIndex >= arrLength-1) ? 0 : this.activeImageIndex+1;
        },

        changeSlide(currentIndex){
            this.activeImageIndex = currentIndex;
        },

        activeInterval(){
            if(this.intervalPresence === false){
                this.autoPlay = setInterval((this.increaseIndex),3000,this.images.length);
            }

            this.intervalPresence = true;
            console.log(this.intervalPresence)
        },

        stopInterval(){
            if(this.intervalPresence === true){
                clearInterval(this.autoPlay);
            }

            this.intervalPresence = false;
            console.log(this.intervalPresence)
        }
    },


    
    created(){
        this.activeInterval(),

        alert('Le immagini del carosello andranno avanti ogni 3s circa automaticamente a meno che tu non tenga il puntatore all\'interno dello slyder');
    }
}).mount('#root')