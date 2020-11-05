let searchForm = document.getElementById("search_form");
let resultsList = document.getElementById("results_list");

search_form.addEventListener("submit", (e) => {
    e.preventDefault();
    resultsList.innerHTML = "";
    displaySearchResults(search_input.value);
});
function displaySearchResults(x) {
    let url = `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${x}&limit=10`;
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let resultsArray = data.pages;
            resultsOnPage(resultsArray);
        })
        .catch(function () {
            alert("An error occurred, try again");
        });
}
function resultsOnPage(array) {
    array.forEach((item) => {
        if (!item.description) {
            item.description = "No description";
        }
        let itemUrl = encodeURI(`https://en.wikipedia.org/wiki/${item.title}`);
        var div = document.createElement("div");
        div.innerHTML = `<img src="https:${item.thumbnail.url}"/><h2>${item.title}</h2><p>${item.description}`;

        resultsList.appendChild(div);
    });
}
