const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const slider = $('.slider');
const slideList = slider.querySelector('.slide-list');
const btnPre = slider.querySelector('.slide-btn--pre');
const btnNext = slider.querySelector('.slide-btn--next');
const dots = slider.querySelectorAll('.dot');

btnNext.onclick = handleNextSlider;
btnPre.onclick = handlePreSlider;


setInterval(handleNextSlider, 3000);

function handleNextSlider() {
    slideList.appendChild(slideList.firstElementChild);
    
    const slides = slideList.querySelectorAll('.slide-item');
    let count;
    
    const w = window.innerWidth;
    if (w > 1024) {
        const [first, second, third,...rest] = slides;
        rest.forEach(el => el.classList.add('hide-at-center'));
        first.classList.add('move-to-left');
        second.classList.add('move-to-left');
        third.classList.add('show-from-right');
        slideList.lastElementChild.classList.add('hide-from-left');

        count = 4;
        
    } else if ( w > 740 && w < 1023) {
        const [first, second,...rest] = slides;
        rest.forEach(el => el.classList.add('hide-at-center'));
        first.classList.add('move-to-left');
        second.classList.add('show-from-right');
        slideList.lastElementChild.classList.add('hide-from-left');

        count = 3;
    
    } else {
        [...slides].forEach(slide => {
            slide.classList.add('move-to-left');
            
        });
        count = slides.length;
    }

    let i = 0;
    [...slides].forEach(slide => {
        slide.addEventListener("animationend", () => {
            i++;
            if ( i === count) {
                [...slides].forEach(el => el.className = 'slide-item');
            }
        })
    })

}

function handlePreSlider() {
    slideList.insertBefore(slideList.lastElementChild, slideList.firstElementChild);
    const slides = slideList.querySelectorAll('.slide-item');
    let count;

    const w = window.innerWidth;
    if (w > 1024) {
        const [first, second, third,...rest] = slides;
        rest.forEach(el => el.classList.add('hide-at-center'));
        first.classList.add('move-to-left');
        second.classList.add('move-to-right');
        third.classList.add('move-to-right');
        const [four] = rest;
        four.classList.add('hide-from-right');

        count = 4;

    } 
    else if ( w > 740 && w < 1023) {
        const [first, second,...rest] = slides;
        rest.forEach(el => el.classList.add('hide-at-center'));
        first.classList.add('show-from-left');
        second.classList.add('move-to-right');
        const [third] = rest;
        third.classList.add('hide-from-right');
        
        count = 3;
    } else {
        [...slides].forEach(slide => {
            slide.classList.add('move-to-right');
        })

        count = slides.length;
    }

    let i = 0;
    [...slides].forEach(slide => {
        slide.addEventListener("animationend", () => {
            i++;
            if (i === count) {
                [...slides].forEach(slide => slide.className = 'slide-item');
            }
        })
    })

}


let i = 0;

function handleNextDot() {
    slider.querySelector('.dot.active').classList.remove('active');
    i = i === dots.length  - 1 ? 0 : i + 1;
    dots[i].classList.add('active');
}

function handlePreDot() {
    slider.querySelector('.dot.active').classList.remove('active');
    i = i === 0 ? dots.length - 1 : i - 1;
    dots[i].classList.add('active');
}
