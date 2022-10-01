//Grab a couple of things
const section = document.querySelector("section");
const playerLivesCount = document.querySelector("span");
let playerLives = 6;

//Link text
playerLivesCount.textContent = playerLives;

//Generate the Date (image cards 16)
const getData = () =>   [
    { imgSrc: "./images/strawberry.jpg", name: "strawberry"},
    { imgSrc: "./images/strawberry.jpg", name: "strawberry"},
    { imgSrc: "./images/banana.jpg", name: "banana"},
    { imgSrc: "./images/banana.jpg", name: "banana"},
    { imgSrc: "./images/kiwi.jpg", name: "kiwi"},
    { imgSrc: "./images/kiwi.jpg", name: "kiwi"},
    { imgSrc: "./images/pineapple.jpg", name: "pineapple"},
    { imgSrc: "./images/pineapple.jpg", name: "pineapple"},
    { imgSrc: "./images/apricots.jpg", name: "apricots"},
    { imgSrc: "./images/apricots.jpg", name: "apricots"},
    { imgSrc: "./images/datefruit.jpg", name: "datefruit"},
    { imgSrc: "./images/datefruit.jpg", name: "datefruit"},
    { imgSrc: "./images/peaches.jpg", name: "peaches"},
    { imgSrc: "./images/peaches.jpg", name: "peaches"},
    { imgSrc: "./images/tangerines.jpg", name: "tangerines"},
    { imgSrc: "./images/tangerines.jpg", name: "tangerines"},
];

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

//Card Generartor Function
const cardGenerator = () => {
    const cardData = randomize();

//Generate the HTML

 cardData.forEach((item, index) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    //Attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);
//Attach the cards to the section
section.appendChild(card);
card.appendChild(face);
card.appendChild(back);

card.addEventListener("click", (e) => {
    card.classList.toggle("toggleCard");
    checkCards(e);
        });
    });
};
//Check cards
const checkCards = (e) => {
const clickedCard = e.target;
clickedCard.classList.add("flipped");
const flippedCards = document.querySelectorAll(".flipped");
const toggleCard = document.querySelectorAll(".toggleCard");
console.log(flippedCards);

//Logic
if  (flippedCards.length === 2) {
    if (
    flippedCards[0].getAttribute("name") === 
    flippedCards[1].getAttribute("name")
    ) {
    console.log("match");
    flippedCards.forEach(card => {
       card.classList.remove("flipped");
       card.style.pointerEvents = "none";
    });
} else {
        console.log("wrong");
        flippedCards.forEach((card) => {
            card.classList.remove("flipped");
            setTimeout(() => card.classList.remove("toggleCard"), 1000);
            });
            playerLives--;
            playerLivesCount.textContent = playerLives;
            if (playerLives === 0) {
                restart("Ohh Try Again!");
            }
        }
    }
    //Run a check to see if we won the game
    if(toggleCard.length === 16) {
        restart("You Won, you did it!");
    }
};

//Restart
const restart = (text) => {
let cardData = randomize();
let faces = document.querySelectorAll(".face");
let cards = document.querySelectorAll(".card");
section.style.pointerEvents = "none";
cardData.forEach((item, index) => {
    cards[index].classList.remove(".toggleCard");
    //Randomize
setTimeout(() => {
    cards[index].style.pointerEvents = "all";
    faces[index].src = item.imgSrc;
    cards[index].setAttribute("name", item.name);
    section.style.pointerEvents = "all";
}, 1000);
});
playerLives = 6;
playerLivesCount.textContent = playerLives;
setTimeout(() => window.alert(text), 100);
};
cardGenerator();