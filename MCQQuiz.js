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

const MCQquestions = [
    "lower_bound(3) on {1,3,5,7,9}.<br>What is the result?",
    "?_bound(66) on {30, 53, 65, 66, 70} is 66",
    "upper_bound(5) on {1,2,3,4,5} results in:",
    "What is the index of the result? upper_bound(5) on {1,2,5,5,5,6}?<br>Remember that the index starts from zero, so index of 1 is 0, index of 3 is 1, etc.",
    "upper_bound finds the last least element higher than the target.<br>True or False?",
    "cout << upper_bound(v.begin, v.end, 5);<br>Is this correct?",
    "What is the dereference operator?",
    "Will this work properly - logicwise not syntax?<br>upper_bound({1,2,2,1,3})"
]

question.innerHTML = MCQquestions[progress];

const MCQanswers = [
    2,
    1,
    4,
    2,
    2,
    2,
    3,
    2
]

const choices = [
    [1,3,5,"v.end"],
    ["lower", "upper", "hide", "hide"],
    [1,3,5,"v.end"],
    [0,2,3,5],
    ["true", "false", "hide", "hide"],
    ["true", "false", "hide", "hide"],
    ["&", "$", "*", "~"],
    ["Yes", "No", "It depends", "hide"]
]

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
function choose(x){
    stylingchoice = x;
    if (x==MCQanswers[progress]){
        MCQscore++;
        buttons[x-1].classList.add('correct');
    } else{
        buttons[stylingchoice-1].classList.add('incorrect');
    }
    buttons[MCQanswers[progress]-1].classList.add('correct');
    next.style.display = "block";
}

let finished = false;        
function nextQ(){
    next.style.display = "none";
    buttons[stylingchoice-1].classList.remove('correct');
    buttons[MCQanswers[progress]-1].classList.remove('correct');
    buttons[stylingchoice-1].classList.remove('incorrect');

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

