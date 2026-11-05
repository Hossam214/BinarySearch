function signup(){
    nameinput = document.getElementById("nameinput");
    localStorage.setItem('username', nameinput.value);

    const username = localStorage.getItem('username');
    console.log(username);
    location.href = 'index.html';
}

// Maybe I'll put more code here. I'm not sure what to add now. We'll see later.