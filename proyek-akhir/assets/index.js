let menu = document.querySelector('.hamburger')
let navbar = document.querySelector('.navbar')

menu.onclick = () => {
    navbar.classList.toggle('open-menu')
    menu.classList.toggle('move')
}