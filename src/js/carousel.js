export default function carousel(carouselWrap) {
    let index = 0;
    let percentItem,maxIndex,totalItemRendering, carousel;
    
    let btnNext = carouselWrap.querySelector('.carousel-btn--right');
    let btnPre = carouselWrap.querySelector('.carousel-btn--left');

    let isNext, isPre;

    function getChange() {
        carousel = carouselWrap.querySelector('.carousel');
        const widthCarousel= carousel.clientWidth;
        const items = carousel.querySelectorAll('.carousel-item');
        const widthItem = items[0].clientWidth;
        
        totalItemRendering = (widthCarousel / widthItem).toFixed(0)*1;
        percentItem = 100 / totalItemRendering;
        maxIndex = items.length - totalItemRendering;
    }

    function updateBtn() {
        if (btnNext) {
            isNext = index === maxIndex ? false : true;
            isNext ? btnNext.classList.remove('carousel-btn--disabled') : btnNext.classList.add('carousel-btn--disabled') ;
        }

        if (btnPre) {
            isPre = index === 0 ? false: true;
            isPre ? btnPre.classList.remove('carousel-btn--disabled') : btnPre.classList.add('carousel-btn--disabled');
        } 
    }
    
    updateBtn();

    return {
        handleCarouselNext() {
            getChange();
            const offset = maxIndex - index;
            const increase = offset < totalItemRendering ? offset : totalItemRendering;
            
            index = index >= maxIndex ? 0 : index + increase;
            carousel.querySelector('.carousel-list').style.transform = `translateX(${index * percentItem * -1}%)`;
            updateBtn();
        },

        handleCarouselPre() {
            getChange();
            const decrease = index < totalItemRendering ? index : totalItemRendering;
            
            index = index > 0 ? index - decrease : 0;
            carousel.querySelector('.carousel-list').style.transform = `translateX(${index * percentItem * -1}%)`;
            updateBtn();
        },

        handleBtnEvent() {
            btnNext.onclick = () => {
                isNext && this.handleCarouselNext();
            };

            btnPre.onclick = () => {
                isPre && this.handleCarouselPre();
            };
        }
        
    }
}