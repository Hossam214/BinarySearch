// AI Disclaimer: There were a few variable typos, and small logical errors that I corrected with AI, but the code was written by me.

next = document.getElementById("next");
question = document.getElementById("question");
done = document.getElementById("Done");
feedbck = document.getElementById("feedback");

const buttonsText = [
    document.getElementById("Choice1"),
    document.getElementById("Choice2"),
    document.getElementById("Choice3"),
    document.getElementById("Choice4")
]

const buttons = [
    document.getElementById("buttonChoice1"),
    document.getElementById("buttonChoice2"),
    document.getElementById("buttonChoice3"),
    document.getElementById("buttonChoice4")
]

next.style.display = "none";

let progress = 0;
let MCQscore = 0;

let MCQquestions = [];
let length = document.getElementsByClassName("JSquestionsarray").length;
for (let i = 0; i < length; i++){
    MCQquestions.push(document.getElementsByClassName("JSquestionsarray")[i].textContent);
}


question.innerHTML = MCQquestions[progress];

let MCQanswers = [];
for (let i = 0; i < length; i++){
    MCQanswers.push(document.getElementsByClassName("JSanswersarray")[i].textContent);
}

let choices = [];
for (let i = 0; i < length; i++){
    choices.push(document.getElementsByClassName("JSchoicesarray")[i].textContent.split(","));
}

// AI detected a syntax error here. Just for the honesty.
buttonsText.forEach((button, i) => {
    button.innerHTML = choices[0][i];
});


// Somehow my stupid brain wrote this whole thing and wrote keypress instead of keydown :( Used AI here to find that. I am so bad at JS
document.body.addEventListener("keydown", function(event){

    // I had this part written in a different wording, but discluded .target. AI told me to add it when I noticed some bugs happening when the user presses with their mouse, and THEN their enter key.
    if (event.key == "Enter") {
        if (event.target === next && next.style.display == "block") {
            event.preventDefault();
            nextQ();
        } else if (buttons.includes(event.target)) {
            event.preventDefault();
        }
        return;
    }

    if (next.style.display == "none" && !buttons[0].hidden) {
        if (event.key == "1") {choose(1);}
        else if (event.key == "2") {choose(2);}
        else if (event.key == "3") {choose(3);}
        else if (event.key == "4") {choose(4);}
    }
});


let stylingchoice = 0;
let choiceMade = false;
function choose(x){
    stylingchoice = x;
    if (x==MCQanswers[progress]){
        if (!choiceMade) {MCQscore++;}
        buttons[x-1].classList.add('correct');
    } else{
        buttons[stylingchoice-1].classList.add('incorrect');
    }
    buttons[MCQanswers[progress]-1].classList.add('correct');
    next.style.display = "block";
    next.focus();
    choiceMade = true;
}

let finished = false;        
function nextQ(){
    choiceMade = false;
    next.style.display = "none";

    buttons.forEach((button) => {
        button.classList.remove('incorrect');
        button.classList.remove('correct');
    });

    if (progress < MCQquestions.length - 1) {
        progress++;
        question.innerHTML = MCQquestions[progress];
        buttonsText.forEach((button, i) => {
            if (choices[progress][i] == "hide") {
                button.hidden = true;
                buttons[i].hidden = true;
            } else {
                button.innerHTML = choices[progress][i];
                button.hidden = false;
                buttons[i].hidden = false;
            }
        });
    }
    else{
        question.textContent = "";
        done.textContent = `You got ${MCQscore} out of ${MCQquestions.length}`;
        let percent = MCQscore / MCQquestions.length * 100;
        if (percent == 0){feedbck.textContent = "Oh cmon, you gotta be kidding me. Go read the page again. PROPERLY!";}
        else if (percent < 30) {feedbck.textContent = "Either this website is garbage, or you are pulling my leg. I need to understand though.";}
        else if (percent < 50) {feedbck.textContent = "You were THIS close from passing";}
        else if (percent < 75) {feedbck.textContent = "Well, at least you passed";}
        else if (percent < 100) {feedbck.textContent = "Seems like somebody was focusing";}
        else if (percent == 100) {feedbck.textContent = "OMG, you're a nerd! You aced it. Winner Winner Chicken Dinner!!";}
        finished = true;
    }
    
    if (finished){
        buttons.forEach((button) => {
            button.hidden = true;
        });
        buttonsText.forEach((button) => {
            button.hidden = true;
        });
    }
}

