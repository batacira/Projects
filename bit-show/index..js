let array = [];
let data = [];
const inpSearch = document.querySelector('.input');
const inp = document.querySelector('#inp');
const body = document.querySelector('body');

const listWrapper = document.querySelector('#list-wrapper')
let ul = document.createElement('ul');
ul.classList.add('lista');

inp.addEventListener('keyup', function (event) {
    ul.innerHTML = '';
    let evTargetValue = event.target.value;
    data = array.filter(el => el.name.toLowerCase().includes(evTargetValue.toLowerCase()));

    data.forEach(function (el) {
        ul.style.display = 'block';
        let li = document.createElement('li');
        li.textContent = el.name;
        li.addEventListener('click', function () {
            inp.value = el.name;
            ul.style.display = 'none';
            if (inp.value.toLowerCase() === el.name.toLowerCase()) {
                route(el.id);
            }
        })
        li.classList.add('list-element');;
        ul.appendChild(li);
    })
    listWrapper.appendChild(ul);
})

function route(id) {
    window.location = '/second.html?id=' + id;

}

const shows = document.querySelector('#shows');

const request = new XMLHttpRequest;

request.open('GET', 'http://api.tvmaze.com/shows');

request.onload = function () {
    if (request.status >= 200 || request.status < 400) {
        const response = JSON.parse(request.responseText);
        const top50 = response.sort(function (a, b) {
            return b.rating.average - a.rating.average;
        }).slice(0, 50);

        top50.forEach(function (element) {
            array.push(element);
        })

        top50.forEach(function (element) {
            let mainDiv = document.createElement("div");
            mainDiv.addEventListener("click", function (event) {
                route(element.id);
            })
            mainDiv.classList = "tv-div";
            let img = document.createElement("img");
            img.setAttribute("src", element.image.medium);
            let title = document.createElement("h2");
            title.textContent = element.name;
            shows.append(mainDiv);
            mainDiv.append(img);
            mainDiv.append(title);
        })

        inp.addEventListener("keyup", function (event) {
            top50.forEach(function (element) {
                if (event.keyCode === 13) {
                    if (inp.value.toLowerCase() === element.name.toLowerCase()) {
                        route(element.id);
                    }
                }
            })
        })

        body.addEventListener('click', function () {
            ul.innerHTML = '';
            ul.style.display = 'none';
        })
    }
};

request.send();







































