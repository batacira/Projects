const iconHamburg = document.querySelector('.js-icon-hamburg');
const navMobileBlock = document.querySelector('.js-nav-mobile-block');
const navMobile = document.querySelector('.js-nav-mobile');
const modal = document.querySelector('.modal');
const iconHamburgImg = document.querySelector('.js-icon-hamburg-img');
const btnBackProject = document.querySelector('.btn-back-project button');
const btnModalClose = document.querySelector('.btn-modal-close');
const container = document.querySelector('.container');
const header = document.querySelector('header');
const selectRewardAll = document.querySelectorAll('.bbm div:nth-child(5)');
const hiddenPledge = document.querySelectorAll('.js-hidden-pledge');
const jsBorder = document.querySelectorAll('.js-border');
const pledgeWrapper = document.querySelector('.pledge25-wrapper')
const overlayModal = document.querySelector('.js-overlay');
const labels = document.querySelectorAll('.js-label');
const continueBtns = document.querySelectorAll('.js-continue');
const thanksBox = document.querySelector('.modal-thanks');
const gotItBtn = document.querySelector('.js-gotIt');
const allSum = document.querySelector('.js-backed');
const totalBackers = document.querySelector('.js-total-backers');
const progressBar = document.querySelector('.js-hr');
const choosePledge = document.querySelectorAll('.choosePledge');
const btnBookmarkImg = document.querySelector('.btn-bookmark-img button');
const btnBookmark = document.querySelector('.bookmark button');
const btnSvg = document.querySelector('.btn-svg');
const btnPath = document.querySelector('.btn-path');
const overlayNav = document.querySelector('.overlay-nav');

let valueToAdd = 0;

function formatValues(value) {
    let valueArr = value.split('');
    let commaFinder = valueArr.indexOf(',');

    valueArr.splice(commaFinder, 1);
    return parseInt(valueArr.join(''))
}

function commaFormator(input) {
    let splitedInput = input.split('');

    splitedInput.splice(-3, 0, ',')
    return splitedInput.join('');
}

function calculatePercentage(sum, total) {
    return (sum * 100) / total;
}

let toggleBtn;
let img = document.createElement('img');
iconHamburg.appendChild(img);
img.setAttribute('src', './images/icon-hamburger.svg');

const toggleNav = () => {
    navMobile.classList.toggle('js-nav-mobile-block');
    if (!toggleBtn) {
        toggleBtn = !toggleBtn;
        img.setAttribute('src', './images/icon-close-menu.svg');
        overlayNav.style.display = 'block';
    }
    else {
        toggleBtn = false;
        img.setAttribute('src', './images/icon-hamburger.svg');
        overlayNav.style.display = 'none';

    }
}

iconHamburg.addEventListener('click', toggleNav);


btnBackProject.addEventListener('click', () => {
    modal.classList.toggle('js-modal-hidden');
    overlayModal.style.display = 'block';
})

btnModalClose.addEventListener('click', function () {
    modal.classList.toggle('js-modal-hidden');
    overlayModal.style.display = 'none';
})

selectRewardAll.forEach(el => {
    el.addEventListener('click', function () {
        modal.classList.toggle('js-modal-hidden');
        window.scrollTo(0, 0);
    })
});

choosePledge.forEach((pledge, i) => {
    pledge.addEventListener('click', function (e) {
        const allPledges = document.querySelectorAll('.js-hidden-pledge');

        jsBorder.forEach(border => {
            border.style.borderColor = 'rgba(0, 0, 0, 0.15)';
        })

        allPledges.forEach(pledge => {
            pledge.style.display = 'none';
        })

        const currentPledge = e.target.closest('.js-border').querySelector('.js-hidden-pledge');
        currentPledge.style.display = 'block';
        e.target.closest('.js-border').style.borderColor = '#3CB3AB';
    })
})

const prices = [0, 25, 75];

continueBtns.forEach((btn, i) => {
    btn.addEventListener('click', function () {
        valueToAdd = 0;
        if (btn.previousElementSibling.value >= prices[i]) {
            thanksBox.style.display = 'block';
            modal.classList.remove('js-modal-hidden');
        } else {
            return;
        }

        valueToAdd = parseInt(btn.previousElementSibling.value);
    });
});

gotItBtn.addEventListener('click', function () {
    thanksBox.style.display = 'none';
    overlayModal.style.display = 'none';
    let sum = (formatValues(allSum.textContent)) + valueToAdd;
    allSum.textContent = commaFormator(sum.toString());
    totalBackers.textContent = commaFormator((formatValues(totalBackers.textContent) + 1).toString())
    progressBar.style.width = `${calculatePercentage(sum, 100000)}%`
});




selectRewardAll.forEach(button => {
    button.addEventListener('click', () => {
        overlayModal.style.display = 'block';
    })
})


btnBookmarkImg.addEventListener('click', () => {
    btnSvg.classList.toggle('active-button-circle');
    btnPath.classList.toggle('active-button-path');
    if (btnBookmark.textContent === 'Bookmarked') {
        btnBookmark.textContent = 'Bookmark';
    }
    else {
        btnBookmark.textContent = 'Bookmarked';
        btnBookmark.style.paddingLeft = '52px';
    }
})


btnBookmark.addEventListener('click', () => {
    btnSvg.classList.toggle('active-button-circle');
    btnPath.classList.toggle('active-button-path');
    if (btnBookmark.textContent === 'Bookmarked') {
        btnBookmark.textContent = 'Bookmark';
    }
    else {
        btnBookmark.textContent = 'Bookmarked';
        btnBookmark.style.paddingLeft = '52px';
    }
})

