
input = document.getElementById("answer");
question = document.getElementById("question-text");
btn = document.getElementById("btn");
next = document.getElementById("Next");
result = document.getElementById("result");
feedbck = document.getElementById("feedback");
nextstep = document.getElementById("nextstep");

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
    "We use while loops, because they keep running until we are finished with our iterations.",
    "We use l <= r, because that is what should always happen, but when the condition becomes false (r < l), then the loop stops",
    "Since binary search eliminates half the array each step, it's complexity is O(log(N))",
    "Not really. Realistically, we just use the builtin functions, but learning how they work is still essential."
];

const answers = [
    ["6"],
    ["arr.size()-1;", "arr.size()-1"],
    ["-1", "negativeone", "negative1"],
    ["while", "whileloop"],
    ["l<=r", "(l<=r)", "llessthanorequaltor", "r>=l", "(r>=l)", "rgreaterthanorequaltol"],
    ["o(log(n))", "ologn", "o(logn)", "olog(n)"],
    ["no"]
];

next.style.display = "none";

function answer(){
    result.style.display = "block";
    if (answers[qNo].includes(input.value.replaceAll(" ", "").toLowerCase())){
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
        
        nextstep.innerHTML = "<button><a href='lowerupperbound.html'>Go to builtin functions</a></button>  <button><a href='lowerupperbound.html'>Next Lesson</a></button>";
    }
}

// ------ QUIZ CODE ENDS HERE ------