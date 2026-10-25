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


input = document.getElementById("answer");
question = document.getElementById("question-text");
btn = document.getElementById("btn");
next = document.getElementById("Next");
result = document.getElementById("result");
feedbck = document.getElementById("feedback");

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        event.preventDefault();
        if (next.style.display == "none") {
            btn.click();
        } else {
            next.click();
        }
    }
});

let qNo = 0;
let score = 0;
const questions = [
    "How many variables will you need to initialise?",
    "Enter the code for initialising the r variable.",
    "What is the highest value possible when initialising ans",
    "Which type of loop do use?",
    "What is the condition we use in the while loop?",
    "What is the time complexity of binary search?",
    "Is writing the whole code necessary, in real life usage?"

];

const placeholders = [
    "Enter the number and press enter",
    "int r = 'Your answer here', the array name is arr",
    "Enter the number",
    "For / While / Do while / None",
    "Just enter the condition",
    "Enter the complexity",
    "Yes / No"

];

const feedback = [
    "We usually use 6 variables, the array, right element, left element, median, answer, and target.",
    "Since indexing in most languages (including C++), uses zero to size - 1, r = arr.size() - 1",
    "Binary search is performed with non negative numbers, therefore ans should be initialised outside the range, to make sure we can differentiate between not finding a result and finding one. The biggest negative number is obviously -1",
    "We use while variables, because they keep running until we are finished with our iterations.",
    "We use l <= r, because that is what should always happen, but when the condition becomes false (r < l), then the loop stops",
    "Since binary search eliminates half the array each step, it's complexity is O(log(N))",
    "Not really. Realistically, we just use the builtin functions, but learning how they work is still essential."
];

const answers = [
    "6",
    "arr.size()-1;",
    "-1",
    "while",
    "l<=r",
    "o(log(n))",
    "no"
];

next.style.display = "none";

function answer(){
    result.style.display = "block";
    if (input.value.replaceAll(" ", "").toLowerCase() == answers[qNo]){
        result.textContent = "Correct";
        score++;
    } else{
        result.textContent = "Wrong";
    };
    feedbck.textContent = feedback[qNo];
    feedbck.style.display = "block";
    next.style.display = "block";
};

function incrementQ(){
    next.style.display = "none";
    result.style.display = "none";
    feedbck.style.display = "none";
    console.log(score / questions.length);
    if (qNo < questions.length-1){
        qNo++;
        question.textContent = questions[qNo];
        input.placeholder = placeholders[qNo];
        input.value = "";
    } else{
        input.style.display = "none";
        question.style.display = "none";
        result.style.display = "block";
        result.textContent = `You scored ${score} out of ${questions.length}`;
        feedbck.style.display = "block";
        let percent = score / questions.length * 100;
        if (percent == 0){feedbck.textContent = "Oh cmon, you gotta be kidding me. Go read the page again. PROPERLY!";}
        else if (percent < 30) {feedbck.textContent = "Either this website is garbage, or you are pulling my leg. I need to understand though.";}
        else if (percent < 50) {feedbck.textContent = "You were THIS close from passing";}
        else if (percent < 75) {feedbck.textContent = "Well, at least you passed";}
        else if (percent < 100) {feedbck.textContent = "Seems like somebody was focusing";}
        else if (percent == 100) {feedbck.textContent = "OMG, you're a nerd! You aced it. Winner Winner Chicken Dinner!!";}
            
    }
}