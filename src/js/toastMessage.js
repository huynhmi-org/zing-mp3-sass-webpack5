export default function createToastMessage(position, delay) {
    const div = document.createElement('div');
    div.className = 'toast-message';
        
    for (let key in position) {
        div.style.key = position[key];
    }

    let timeout;

    function toastMessage(message) {
        clearTimeout(timeout);
        div.innerHTML = `
        <span class="toast-message__text">${message}</span>
        <button class="toast-message-btn">
        <i class="toast-message-btn__icon fa-solid fa-xmark"></i>
        </button>
        `;
        
        document.body.appendChild(div);
        div.style.animation = `toastMessageFadeOut linear 400ms, toastMessageFadeIn linear 400ms ${delay}ms forwards`;


        timeout = setTimeout(function() {
            div.remove();
        }, delay + 400);
    }

    return toastMessage;
}