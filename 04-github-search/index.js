const jsButtonMode = document.querySelector('.js-btn-mode');
const container = document.querySelector('.container');
const followers = document.querySelector('.followers')
const moonSun = document.querySelector('.js-moon-sun');
const jsInput = document.querySelector('.js-input')
const devfinder = document.querySelector('.devfinder');
const main = document.querySelector('main');
const jsUserInfo = document.querySelector('.js-user-info');
const jsAbout = document.querySelector('.js-about');
const jsLocation = document.querySelector('.js-location');
const jsBtnSearch = document.querySelector('.js-btn-search');
const avatar = document.querySelector('.avatar');
const jsName = document.querySelector('.js-name p');
const jsUser = document.querySelector('.js-user span');
const jsDate = document.querySelector('.js-date p');
const jsAboutP = document.querySelector('.js-about p');
const repos = document.querySelector('.js-repos');
const jsFollowers = document.querySelector('.js-followers');
const jsFollowing = document.querySelector('.js-following');
const contactLocationFirst = document.querySelector('.contact-location.first span');
const contactLocationSecond = document.querySelector('.contact-location.second span');
const contactLocationThird = document.querySelector('.contact-location.third span');
const contactLocationFourth = document.querySelector('.contact-location.fourth span');
const contactLocationimgs = document.querySelector('.contact-location i');
const jsNoResults = document.querySelector('.js-no-results');
const body = document.querySelector('body');
const contactLocation = document.querySelectorAll('.contact-location');

const darkElement = [body, container, followers, jsInput, devfinder, main, jsUserInfo, jsAbout, jsLocation, contactLocationimgs];

const toggleDark = (el) => {
    el.forEach(element => {
        element.classList.toggle('dark');
    })
}

jsButtonMode.addEventListener('click', function () {
    toggleDark(darkElement);
    
    if(jsButtonMode.textContent === 'Dark'){
        jsButtonMode.textContent = 'LIGHT';
        moonSun.src = './assets/icon-moon.svg';
    } else {
        jsButtonMode.textContent = 'Dark';
        moonSun.src = './assets/icon-sun.svg';
    }
})

const displayError = () => {
    jsNoResults.textContent = 'No results';
}

const getInfo = (username) => {
    fetch(`https://api.github.com/users/${username}`)
    .then(response => {
        return response.json();
    })  
    .then(data => {
        if (data.login) {
            displayUser(data);
            createTwitterAnchor(data.twitter_username);
            createBlogAnchor(data.blog);
            createCompanyAnchor(data.html_url);
        } else {
            displayError();
        }
    })
}

document.addEventListener('onload', getInfo('octocat'));

jsBtnSearch.addEventListener('click', () => {
    getInfo(jsInput.value);
})

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

const displayUser= (obj) => {
    avatar.src = obj.avatar_url;
    jsName.textContent =  obj.name || obj.login;
    jsUser.textContent = '@' + obj.login || 'No login';
    let date = new Date(obj.created_at);
    let fullDate = `Joined ${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}` 
    jsDate.textContent = fullDate;
    jsAboutP.textContent = obj.bio || 'This profile has no bio'; 
    jsAboutP.style.opacity = '75%';
    repos.textContent = obj.public_repos;
    jsFollowers.textContent = obj.followers;
    jsFollowing.textContent = obj.following;
    contactLocationFirst.textContent = obj.location || 'Not Available';
    contactLocationSecond.textContent = obj.blog || 'Not Available';
    contactLocationThird.textContent = obj.twitter_username || 'Not Available';
    contactLocationFourth.textContent = obj.company || 'Not Available';
    
    contactLocation.forEach( el => {
        if(el.textContent === 'Not Available') {
        el.style.opacity = '50%';
        }
        else {
        el.style.opacity = '100%';
        }
    }) 
}

const createTwitterAnchor = (twitter_username) => {
    if(contactLocationThird.textContent !== 'Not Available') {
        contactLocationThird.textContent = '';
        let a = document.createElement('a');
        a.textContent = twitter_username;
        a.setAttribute('href', `https://www.twitter.com/${twitter_username}`);
        a.setAttribute('target', '_blank');
        a.style.textDecoration = 'none'
        a.style.color = 'inherit';
        contactLocationThird.appendChild(a);
    }

}

const createBlogAnchor = (blog) => {
    if(contactLocationSecond.textContent !== 'Not Available') {
        contactLocationSecond.textContent = '';
        let a = document.createElement('a');
        a.textContent = blog;
        a.setAttribute('href', `https://${blog}`);
        a.setAttribute('target', '_blank');
        a.style.textDecoration = 'none'
        a.style.color = 'inherit';
        contactLocationSecond.appendChild(a);
    }
}

const createCompanyAnchor = (company) => {
    if(contactLocationFourth.textContent !== 'Not Available') {
        contactLocationFourth.textContent = '';
        let a = document.createElement('a');
        a.textContent = 'github';
        a.setAttribute('href', `${company}`);
        a.setAttribute('target', '_blank');
        a.style.textDecoration = 'none'
        a.style.color = 'inherit';
        contactLocationFourth.appendChild(a);
    }   
}

jsInput.addEventListener("keyup", function(e) {
    if(e.key === 'Enter') {
    getInfo(jsInput.value);
    }
    clearMessage();
  })

const clearMessage = () => {
    jsNoResults.textContent = '';
}

body.addEventListener('click', clearMessage);