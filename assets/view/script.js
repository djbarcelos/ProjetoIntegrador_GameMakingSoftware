const cards = document.querySelectorAll('.memory-card');

let hasFlipperCard = false;
let lockBoard = false;
let firstCard, secondCad = null;
let pairCounter = 0;

function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlipperCard) { // Primeira Carta
        hasFlipperCard = true;
        firstCard = this;
    } else { // Segunda Carta
        hasFlipperCard = false;
        secondCad = this;

        if (firstCard.dataset.framework === secondCad.dataset.framework) { // Cartas Iguais
            firstCard.removeEventListener('click', flipCard);
            secondCad.removeEventListener('click', flipCard);
            pairCounter++;

            if (pairCounter === 6) {
                setTimeout(() => {
                    document.location.reload(true);
                }, 2000);
            }
        } else { // Cartas Diferentes

            lockBoard = true;

            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCad.classList.remove('flip');
                lockBoard = false;
                firstCard = null;
                secondCad = null;
            }, 1000)
        }
    }
}

(function shuffleCards() {
    cards.forEach(element => {
        let random = Math.floor(Math.random() * 12);
        element.style.order = random;
    });
})();

cards.forEach(element => element.addEventListener('click', flipCard));