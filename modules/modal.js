export const closeModal = () => {
    const modal = document.querySelector(".modal");
    const backdrop = document.querySelector(".backdrop");
    modal.classList.add("closed");
    backdrop.classList.add("closed");
}

export const openModal = () => {
    const modal = document.querySelector(".modal");
    const backdrop = document.querySelector(".backdrop");
    modal.classList.remove("closed");
    backdrop.classList.remove("closed");
}