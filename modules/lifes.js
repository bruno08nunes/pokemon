export const createLifes = (lifesQuantity) => {
    lifesQuantity ??= localStorage.getItem("lifes");
    const lifes = document.querySelector(".hearts");
    lifes.innerHTML = "";
    for (let pos = 0; pos < lifesQuantity; pos++) {
        lifes.innerHTML += `<img src="assets/heart.png" alt="">`
    }
}

export const removeLife = () => {
    const lifes = document.querySelector(".hearts");
    lifes.lastElementChild.remove();
}

export const countLifes = () => {
    const lifes = document.querySelector(".hearts");
    return lifes.childElementCount;
}