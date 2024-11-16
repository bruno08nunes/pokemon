// Imports
import { closeModal, openModal } from "./modules/modal.js";
import { countLifes, createLifes, removeLife } from "./modules/lifes.js";
import { capitalize } from "./modules/string.js";
import { generateNumber } from "./modules/generateNumber.js";

// Elements
const buttonCancel = document.querySelector(".button-cancel");
const img = document.querySelector(".pokemon");
const input = document.querySelector("#pokemonName");
const button = document.querySelector(".button-game");

const currentPoint = document.querySelector(".current");
const recordElement = document.querySelector(".record");
const record = localStorage.getItem("record");

// Variables
let isYouWinner = false;
let isGameOver = false;
let pokemonName;

// Functions
const giveUp = () => {
    if (img.classList.contains("reveal")) {
        img.src = "";
        img.classList.remove("reveal");
        start();
        return;
    }
    removeLife();
    if (countLifes() === 0) {
        isGameOver = true;
        alert("GAME OVER");
    }
    turnReplayable();
    input.value = pokemonName;
}

const reset = () => {
    if (isGameOver) {
        currentPoint.textContent = 0;
        createLifes();
        isGameOver = false;
    }
    button.style.display = "inline";
    buttonCancel.textContent = "Desistir";
    input.value = "";
    recordElement.textContent = localStorage.getItem("record") ?? 0;
    isYouWinner = false;
}

const turnReplayable = () => {
    img.classList.add("reveal");
    buttonCancel.textContent = "Jogar Novamente";
    button.style.display = "none";
}

const win = () => {
    isYouWinner = true;
    turnReplayable();
    currentPoint.textContent++;
    if (Number(currentPoint.textContent) > Number(record)) {
        localStorage.setItem("record", currentPoint.textContent);
    }
};

const lose = () => {
    removeLife();
    if (countLifes() === 0) {
        turnReplayable();
        input.value = pokemonName;
        isGameOver = true;
        alert("GAME OVER");
    }
};

const start = async () => {
    reset();
    const gens = JSON.parse(localStorage.getItem("gens"));
    const num = generateNumber(gens);
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + num);
    const results = await res.json();
    pokemonName = capitalize(results.name);
    
    img.src = results.sprites.other.dream_world.front_default ?? results.sprites.other["official-artwork"]?.front_default ?? results.sprites.front_default;
    
    button.onclick = () => {
        if (input.value.toLowerCase() === pokemonName.toLowerCase()) {
            win();
            return;
        }
        lose();
    };
};

// Events and Start

buttonCancel.addEventListener("click", giveUp);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        (isYouWinner || isGameOver) ? buttonCancel.click() : button.click();
    }
})


const backdrop = document.querySelector(".backdrop");
backdrop.addEventListener("click", closeModal);

const buttonModal = document.querySelector(".button-modal");
buttonModal.addEventListener("click", openModal)

const gensElements = document.querySelectorAll(".configs input");
gensElements.forEach(input => input.addEventListener("change", (e) => {
    const gens = JSON.parse(localStorage.getItem("gens"));
    const currentGen = e.target.id.charAt(e.target.id.length - 1) - 1;
    if (e.target.checked) {
        gens.push(currentGen);
        localStorage.setItem("gens", JSON.stringify(gens));
        return;
    }
    const currentGens = gens.filter((gen) => gen !== currentGen);
    localStorage.setItem("gens", JSON.stringify(currentGens));
}))

const gens = JSON.parse(localStorage.getItem("gens"));
if (gens === null) {
    localStorage.setItem("gens", "[0]")
} else {
    gens.forEach((gen) => {
        gensElements[gen].checked = true;
    })
}

const lifes = localStorage.getItem("lifes");
if (lifes === null) {
    localStorage.setItem("lifes", 3);
}
const inputLife = document.querySelector("#lifes-quantity");
inputLife.value = localStorage.getItem("lifes")
inputLife.addEventListener("change", (e) => {
    localStorage.setItem("lifes", e.target.value)
})

start();
createLifes();