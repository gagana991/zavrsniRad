const searchURL = 'https://www.googleapis.com/books/v1/volumes?q=';

var book = document.getElementById('searchBook');
book.addEventListener('keypress', callApi);

function callApi(event) {
    if (event.key === "Enter") {
        resetText();
        let xttp = new XMLHttpRequest();
        let urlTitle = searchURL + book.value;
        xttp.addEventListener('load', reqListener);
        xttp.open('GET', urlTitle, true);
        xttp.send();
        //console.log(urlTitle);
    }
}

function reqListener() {
    let newJson = JSON.parse(this.responseText);
    //console.log(newJson);
    let container = document.getElementById('resContainer');
    let result = document.createElement('div');

    result.setAttribute('id', 'divResult');
    result.setAttribute('class', 'result');
    container.appendChild(result);

    if (newJson.totalItems > 0) {
        for (let i = 0; i < newJson.items.length; i++) {
            let titleBook = document.createElement('a');
            titleBook.innerHTML = '<li>' + newJson.items[i].volumeInfo.title + '</li><br>';
            result.appendChild(titleBook);
        }
    }
    else {
        let h2 = document.createElement('h2');
        h2.setAttribute('id', 'no-existe1');
        h2.setAttribute('class', 'no-existe');
        h2.textContent = "Ova knjiga ne postoji";
        result.appendChild(h2);
    }
}

function resetText() {
    let container = document.getElementById('resContainer');
    container.textContent = "";
}