const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const slider = $('.slider');
const slideList = slider.querySelector('.slide-list');
const btnPre = slider.querySelector('.slide-btn--pre');
const btnNext = slider.querySelector('.slide-btn--next');
const dots = slider.querySelectorAll('.dot');

btnNext.onclick = handleNextSlider;
btnPre.onclick = handlePreSlider;


setInterval(handlePreSlider, 3000);

function handleNextSlider() {
    const slides = slideList.querySelectorAll('.slide-item');

    const w = window.innerWidth;
    // handle animation on pc and tablet
    if (w > 1024) {
        const [first, second, third,...rest] = slides;
        // move all rest's element to center
        rest.forEach(el => el.classList.add('hide-at-center'));
        first.classList.add('hide-from-left');
        second.classList.add('move-to-left');
        third.classList.add('move-to-left');
        
        const [four] = rest;
        four.classList.add('show-from-right');

        let i = 0;
        [...slides].forEach(slide => {
            slide.addEventListener("animationend", () => {
                i++;
                // when the animation is ended
                if (i === 4) {
                    // the element first will become the last element
                    slideList.appendChild(slideList.firstElementChild);
                    // remove all animation class
                    [...slides].forEach(slide => slide.className = 'slide-item');
                }
            })
        })
    // handle animation on mobile
    } else if ( w > 740 && w < 1023) {
        const [first, second,...rest] = slides;
        // move all rest's element to center
        rest.forEach(el => el.classList.add('hide-at-center'));
        first.classList.add('hide-from-left');
        second.classList.add('move-to-left');
        
        const [third] = rest;
        third.classList.add('show-from-right');

        let i = 0;
        [...slides].forEach(slide => {
            slide.addEventListener("animationend", () => {
                i++;
                // when the animation is ended
                if (i === 3) {
                    // the element first will become the last element
                    slideList.appendChild(slideList.firstElementChild);
                    // remove all animation class
                    [...slides].forEach(slide => slide.className = 'slide-item');
                }
            })
        })
    } 
    else {
        slideList.appendChild(slideList.firstElementChild);
        let count = 0;
        [...slides].forEach(slide => {
            slide.style.animation =  'move-to-left linear 200ms';

            slide.addEventListener("animationend", () => {
                count ++;

                if (count === 6) {
                    [...slides].forEach(slide => slide.style.animation = '');
                }
            })
        })


        handleNextDot();

        // slideList.appendChild(slideList.firstElementChild);

    }
    // 

}

function handlePreSlider() {
    const slides = slideList.querySelectorAll('.slide-item');
    const w = window.innerWidth;
    if (w > 1024) {
        const [first, second, third,...rest] = slides;
        // move all rest's element to center
        rest.forEach(el => el.classList.add('hide-at-center'));
        first.classList.add('move-to-right');
        second.classList.add('move-to-right');
        third.classList.add('hide-from-right');
        
        const last = slideList.lastElementChild;
        last.classList.add('show-from-left');

        let i = 0;
        [...slides].forEach(slide => {
            slide.addEventListener("animationend", () => {
                i++;
                // when the animation is ended
                if (i === 4) {
                    // the last element will become the first element
                    slideList.insertBefore(slideList.lastElementChild, slideList.firstElementChild);
                    // remove all animation class
                    [...slides].forEach(slide => slide.className = 'slide-item');
                }
            })
        })


    // handle animation on mobile
    } else if ( w > 740 && w < 1023) {
        const [first, second,...rest] = slides;
        // move all rest's element to center
        rest.forEach(el => el.classList.add('hide-at-center'));
        first.classList.add('move-to-right');
        second.classList.add('hide-from-right');
        
        const last = slideList.lastElementChild;
        last.classList.add('show-from-left');

        let i = 0;
        [...slides].forEach(slide => {
            slide.addEventListener("animationend", () => {
                i++;
                // when the animation is ended
                if (i === 3) {
                    // the element first will become the last element
                    slideList.insertBefore(last,slideList.firstElementChild);
                    // remove all animation class
                    [...slides].forEach(slide => slide.className = 'slide-item');
                }
            })
        })
    } else {
        slideList.insertBefore(slideList.lastElementChild,slideList.firstElementChild);
        let count = 0;
        [...slides].forEach(slide => {
            slide.style.animation =  'move-to-right linear 200ms';

            slide.addEventListener("animationend", () => {
                count ++;

                if (count === 6) {
                    [...slides].forEach(slide => slide.style.animation = '');
                }
            })
        })

        handlePreDot();
    }
    
}

slider.addEventListener("touchmove", function(e) {
    console.log(e);
})

let i = 0;
function handleNextDot() {
    slider.querySelector('.dot.active').classList.remove('active');
    i = i === dots.length ? 0 : i + 1;
    dots[i].classList.add('active');
}

function handlePreDot() {
    slider.querySelector('.dot.active').classList.remove('active');
    i = i === 0 ? dots.length - 1 : i - 1;
    dots[i].classList.add('active');
}
