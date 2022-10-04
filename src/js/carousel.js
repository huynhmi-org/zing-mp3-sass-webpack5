export default function carousel(carousel, changeAmount, nextBtn, preBtn) {
    let index = 0;
    const carouselItems = carousel.querySelectorAll('.carousel-item').length;

    let offset = carouselItems  % changeAmount;
    const width = 100 / changeAmount;
    const maxIndex = carouselItems - changeAmount;

    function handleBtn() {
        if (nextBtn && preBtn) {
            if (index <= 0) {
                preBtn.classList.add('carousel-btn--disabled');
                nextBtn.classList.remove('carousel-btn--disabled');
            } else if (index >= carouselItems - changeAmount) {
                nextBtn.classList.add('carousel-btn--disabled');
                preBtn.classList.remove('carousel-btn--disabled');
            } else {
                preBtn.classList.remove('carousel-btn--disabled');
                nextBtn.classList.remove('carousel-btn--disabled');
            }
        }
    }

    return {
        handleCarouselNext() {
            let increase = changeAmount;

            if (offset != 0) {
                increase = maxIndex - index >= changeAmount ? changeAmount : offset;
            }

            index === maxIndex ? (index = 0, increase = changeAmount) : index = index + increase;
            carousel.style.transform = `translateX(${index * width * -1}%)`;
            handleBtn();
        },

        handleCarouselPre() {
            let decrease = changeAmount;
            if (offset  != 0) {
                decrease = index >= changeAmount ? changeAmount : offset;
            }
            index > 0 ? index -= decrease : (index = 0, decrease = changeAmount);
            carousel.style.transform = `translateX(${index * width * -1}%)`;
            handleBtn();
        }
        
    }
}