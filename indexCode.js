// Was just about to write innerHTML, then my cybersecurity background kicked in.
// I did some basic checks to make sure my website is not XSS vulnerable, but I need to be more careful later, with this user input
// I know XSS can't do anything meaningful yet, but I despise the idea of having a flawed website
// Anyway, I know the line is kinda ugly, but I like oneliners so I'll keep it. (✿◡‿◡)

document.getElementById("nameGreeting").innerText = localStorage.getItem('username');