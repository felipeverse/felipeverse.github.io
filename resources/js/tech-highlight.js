// Tecnologias que serão usadas para preencher o campo
const technologies = ["PHP (Laravel)", "MySQL", "MongoDB", "Docker", "AWS services"];
let currentTechIndex = 0;

// Elementos onde os efeitos serão aplicados
const techTextElement = document.getElementById('tech-highlight');
const cursorElement = document.getElementById('cursor');

// Constantes para contralar o tempo dos efeitos
const TYPE_SPEED = 50;
const ERASE_SPEED = 100;
const TYPE_DELAY = 1000;
const ERASE_DELAY = 500;    

function wait(ms, callback) {
    setTimeout(callback, ms);
}

function typeTechnology() {
    const currentTech = technologies[currentTechIndex];
    let i = 0;
    
    function typeNextCharacter() {
        const text = currentTech.slice(0, i);
        techTextElement.textContent = text;
    
        if (i < currentTech.length) {
            wait(TYPE_SPEED, function() {
                i++;
                typeNextCharacter();
            });
        } else {
            wait(TYPE_DELAY, eraseTechnology);
        }
    }

    typeNextCharacter();
}

function eraseTechnology() {
    const text = techTextElement.textContent;
    let i = text.length;

    function eraseNextCharacter() {
        const erasedText = text.slice(0, i);
        techTextElement.textContent = erasedText;

        if (i > 0) {
            i--;
            wait(ERASE_SPEED, eraseNextCharacter);
        } else {
            wait(ERASE_DELAY, function () {
                currentTechIndex = (currentTechIndex + 1) % technologies.length;
                typeTechnology();
            });
        }
    }

    eraseNextCharacter();
}

typeTechnology();