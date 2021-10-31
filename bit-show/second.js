const url = new URL(window.location.href);
let id = url.searchParams.get("id");

const divCast = document.querySelector('.cast');
const divSeasons = document.querySelector('.seasons');
const imageWrapper = document.querySelector('.image-wrapper');
const details = document.querySelector('#details');
const showTitle = document.querySelector('.show-title');

let arrayCast = [];
let arraySeasons = [];
const request = new XMLHttpRequest;

request.open('GET', `https://api.tvmaze.com/shows/${id}/cast`);

request.onload = function () {
    if (request.status >= 200 || request.status < 400) {

        const response = JSON.parse(request.responseText);
        arrayCast = response;
        let ul = document.createElement('ul');
        let h3 = document.createElement('h3');
        h3.textContent = 'Cast';
        divCast.appendChild(h3);
        divCast.appendChild(ul);
        arrayCast.forEach(function (element) {
            let li = document.createElement('li');
            ul.appendChild(li);
            li.textContent = element.person.name;
        })
    }

    request.open('GET', `https://api.tvmaze.com/shows/${id}/seasons`);

    request.onload = function () {
        if (request.status >= 200 || request.status < 400) {

            const response = JSON.parse(request.responseText);
            arraySeasons = response;
            let ul = document.createElement('ul');
            let h3 = document.createElement('h3');
            h3.textContent = `Seasons (${arraySeasons.length})`;
            divSeasons.appendChild(h3);
            divSeasons.appendChild(ul);
            arraySeasons.forEach(function (element) {
                let li = document.createElement('li');
                ul.appendChild(li);
                li.textContent = `${element.premiereDate} - ${element.endDate}`;
            })
        }
        request.open('GET', `https://api.tvmaze.com/shows/${id}`);

        request.onload = function () {
            if (request.status >= 200 || request.status < 400) {

                const response = JSON.parse(request.responseText);
                let h1 = document.createElement('h1');
                h1.textContent = response.name;
                showTitle.appendChild(h1);
                let img = document.createElement('img');
                img.setAttribute('src', response.image.original);
                imageWrapper.appendChild(img);
                details.innerHTML = response.summary;
            }
        }
        request.send();
    }
    request.send();
}
request.send();
