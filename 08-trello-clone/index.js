const newItem = document.querySelector('.js-add-item');
newItem.addEventListener('click', () => {
    let itemValue = document.querySelector('.item-value').value;
    if (itemValue) {
        addItem(itemValue);
    }
    document.querySelector('.item-value').value = '';
})

function addItem(itemValue) {
    let item = document.createElement('li');
    item.classList.add('item');

    item.setAttribute("draggable", "true");
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);

    let itemContent = document.createElement('div');
    itemContent.classList.add('item-content');
    itemContent.textContent = itemValue;

    let deleteItem = document.createElement('div');
    deleteItem.classList.add('deleteItem');
    deleteItem.textContent = "x";
    deleteItem.addEventListener('click', removeItem);


    localStorage.setItem(item, itemContent);
    item.appendChild(itemContent);
    item.appendChild(deleteItem);

    let items = document.getElementById('items-added');
    items.insertBefore(item, items.childNodes[0]);
}

const removeItem = (event) => {
    let items = event.target.parentNode.parentNode;
    let item = event.target.parentNode;
    items.removeChild(item);
}


const dragStart = (event) => {
    event.target.className += ' hold';
    item = event.target;
}

const dragEnd = (event) => {
    event.target.className = 'item';
}


const dragEnter = (event) => {
    event.preventDefault();
}

const dragOver = (event) => {
    event.preventDefault();
}


const dragDrop = (event) => {
    event.target.append(item);
}

const jsCanDrop = document.querySelectorAll('.js-can-drop');


jsCanDrop.forEach(e => {
    e.addEventListener('dragenter', dragEnter)
    e.addEventListener('dragover', dragOver)
    e.addEventListener('drop', dragDrop)
});












