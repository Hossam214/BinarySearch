// This scroll activation was done by AI, and so was the demo, but wasn't counted in coding time tho 
const sections = document.querySelectorAll(".explanation");

function setupSection(section) {
    const pin = section.querySelector(".explanation-pin");

    const paragraphs = [
        ...pin.querySelectorAll("p, pre, input")
    ];

    let released = false;

    
function releaseSection(contentHeight) {
    // Remember where this section starts before its height changes
    const sectionTop =
        window.scrollY + section.getBoundingClientRect().top;

    released = true;

    section.classList.add("released");
    section.style.height = "auto";

    paragraphs.forEach(paragraph => {
        paragraph.classList.add("revealed");
    });

    // Wait for the browser to recalculate the layout
    requestAnimationFrame(() => {
        const targetY = sectionTop + Math.max(
            0,
            contentHeight - window.innerHeight + 20
        );

        window.scrollTo(0, targetY);
    });
}

    function updateReveal() {
        if (released) return;

        const rect = section.getBoundingClientRect();

        const distance = section.offsetHeight - window.innerHeight;

        if (distance <= 0) return;

        const progress = Math.max(
            0,
            Math.min(1, -rect.top / distance)
        );

        const count = Math.min(
            paragraphs.length,
            Math.floor(progress * (paragraphs.length + 1))
        );

        // Reveal the current items
        paragraphs.forEach((paragraph, i) => {
            paragraph.classList.toggle(
                "revealed",
                i < count
            );
        });

        // Measure how much space the revealed content needs
        const styles = getComputedStyle(pin);

        const padding =
            parseFloat(styles.paddingTop) +
            parseFloat(styles.paddingBottom);

        let contentHeight = padding;

        for (let i = 0; i < count; i++) {
            const style = getComputedStyle(paragraphs[i]);

            contentHeight +=
                paragraphs[i].offsetHeight +
                parseFloat(style.marginTop) +
                parseFloat(style.marginBottom);
        }

        // If the revealed text fills the viewport,
        // release the section and allow normal scrolling.
        if (
            contentHeight > window.innerHeight ||
            count >= paragraphs.length
        ) {
            releaseSection(contentHeight);
        }
    }

    function setSectionHeight() {
        if (released) return;

        section.style.height =
            `${(paragraphs.length + 1) * 100}vh`;

        updateReveal();
    }

    setSectionHeight();

    window.addEventListener("scroll", updateReveal, {
        passive: true
    });

    window.addEventListener("resize", setSectionHeight);
}

sections.forEach(setupSection);




const demoArray = document.getElementById("demo-array");
const demoStep = document.getElementById("demo-step");
const demoProgress = document.getElementById("demo-progress");

const prevButton = document.getElementById("demo-prev");
const nextButton = document.getElementById("demo-next");
const resetButton = document.getElementById("demo-reset");

if (demoArray && demoStep && demoProgress) {
    const values = [1, 3, 5, 7, 9, 11, 13, 15];

    const steps = [
        {
            middle: 3,
            valid: [],
            removed: [],
            text: "Step 1: The middle value is 7. Since 7 > 6, the answer must be to its left."
        },
        {
            middle: 1,
            valid: [],
            removed: [3, 4, 5, 6, 7],
            text: "Step 2: Remove 7 and everything to its right. The new middle value is 3."
        },
        {
            middle: 2,
            valid: [1],
            removed: [3, 4, 5, 6, 7],
            text: "Step 3: Since 3 <= 6, save 3 as a possible answer and search to its right."
        },
        {
            middle: -1,
            valid: [1, 2],
            removed: [0, 3, 4, 5, 6, 7],
            text: "Step 4: The next middle value is 5. Since 5 <= 6, update the answer to 5."
        },
        {
            middle: -1,
            valid: [2],
            removed: [0, 1, 3, 4, 5, 6, 7],
            text: "Finished! No values remain to check. The largest number less than or equal to 6 is 5."
        }
    ];

    let currentStep = 0;

    values.forEach(value => {
        const tile = document.createElement("div");
        tile.className = "demo-number";
        tile.textContent = value;
        demoArray.appendChild(tile);
    });

    const tiles = [...demoArray.children];

    function renderStep() {
        const step = steps[currentStep];

        tiles.forEach((tile, index) => {
            tile.className = "demo-number";

            if (step.removed.includes(index)) {
                tile.classList.add("removed");
            }

            if (step.valid.includes(index)) {
                tile.classList.add("valid");
            }

            if (index === step.middle) {
                tile.classList.add("active");
            }
        });

        demoStep.textContent = step.text;
        demoProgress.textContent =
            `Step ${currentStep + 1} of ${steps.length}`;

        prevButton.disabled = currentStep === 0;
        nextButton.disabled = currentStep === steps.length - 1;

        nextButton.textContent =
            currentStep === steps.length - 1
                ? "Finished"
                : "Next step";
    }

    nextButton.addEventListener("click", () => {
        if (currentStep < steps.length - 1) {
            currentStep++;
            renderStep();
        }
    });

    prevButton.addEventListener("click", () => {
        if (currentStep > 0) {
            currentStep--;
            renderStep();
        }
    });

    resetButton.addEventListener("click", () => {
        currentStep = 0;
        renderStep();
    });

    renderStep();
}

// End of the AI code



// Now let's attempt a dark mode

// Small assistance from AI to learn about this querySelector. Every day a new thing!
const nighty = document.querySelector(".nighty");
nighty.innerHTML = '<div id="NightMode" onclick="darkControl()"><img id="sunmoonimage" src="Moon to Sun.png" alt="NightMode"></div>';


nightButton = document.getElementById("NightMode");
image = document.getElementById("sunmoonimage");
let body = document.body;
let dark = false;
let imageRefreshCount = 0;

function darkControl() {
    if (!dark){
        body.style.cssText = "--normal-font-color: #edf5ff; --normal-bg-color: rgb(25, 25, 25)";
        dark = true;
    } else{
        body.style.cssText = "--normal-font-color: rgb(25, 25, 25); --normal-bg-color: #edf5ff";
        dark=false;
    }

    // Originally used this: https://bobbyhadz.com/blog/javascript-refresh-image-with-new-one-at-same-url
    // But it didn't work so I used the following method instead, which was unfortunately made by AI.
    const imageUrl = new URL(
        dark ? "Sun to Moon.png" : "Moon to Sun.png",
        image.src
    );
    image.src = imageUrl.href;
}


// function myFunction() {
//     var popup = document.getElementById("myPopup");
//     popup.classList.toggle("show");
// }

// function getSelectionText() {
//     let text = "";
//     const activeEl = document.activeElement;
//     const activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;

//     if (
//         (activeElTagName == "textarea") || (activeElTagName == "input" &&
//         /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
//         (typeof activeEl.selectionStart == "number")
//     ) {
//         text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
//     } else if (window.getSelection) {
//         text = window.getSelection().toString();
//     }

//     return text;
// }

// document.onmouseup = document.onkeyup = document.onselectionchange = myFunction();

