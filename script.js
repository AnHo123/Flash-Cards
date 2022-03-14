const cards = [
    {
        "id": 1,
        "name": "Apple",
        "wordType": "noun",
        "pronounciation": "ˈapəl",
        "imgLink": "./img/apple.jpg"
    },
    {
        "id": 2,
        "name": "Banana",
        "wordType": "noun",
        "pronounciation": "bəˈnanə",
        "imgLink": "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmFuYW5hc3xlbnwwfHwwfHw%3D&w=1000&q=80"
        
    },
    {
        "id": 3,
        "name": "Orange",
        "wordType": "noun",
        "pronounciation": "ˈôrənj",
        "imgLink": "https://img.freepik.com/free-photo/orange-from-garden_1150-9680.jpg?size=626&ext=jpg&ga=GA1.2.1550166946.1639440000"
    }
  ]

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const listCards = $("#container");
let createBtn = $("#create");
let imgFileInput = $('input[id="img-file"]');
let  imgLinkInput = $('input[id="img"]');

function start() {

    renderCards();

    handleCreateCard();

    checkImgInput();

};

start();

// fuctions
function renderCards() {
    const htmls = cards.map(card => {
        return `
            <div class="card container-item card-item-${card.id}">
                <img src="${card.imgLink}" alt="" id="img">
                <div class="card-body">
                    <div class="card-title">${card.name}</div>
                        <div class="card-text">
                            <div class="card-wordtype">(
                                <span class="card-wordtype-text">${card.wordType}</span>
                                )</div>
                            <div class="card-pronounciation">/
                            <span class="card-pronounciation-text">${card.pronounciation}</span>
                            /</div>
                        </div>
                        <div class="card-tools">
                            <div class="card-tools-item" onClick="handleDeleteCard(${card.id})">
                                <i class="fa-solid fa-trash"></i>
                            </div>
                            <div class="card-tools-item" id="edit-btn" onClick="handleEditCard(${card.id})">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
        `
    })
    listCards.insertAdjacentHTML("beforeend", htmls.join(''));
};

function getFormData() {
        let name = $('input[id="name"]').value,
        wordType = $('input[id="type"]').value,
        pronounciation = $('input[id="pronounciation"]').value,
        imgLink = imgLinkInput.value;
        
        if (!imgLink) {
            imgLink = URL.createObjectURL(imgFileInput.files[0]); 
        }

        let formData = {
            id: cards.length + 1,
            name,
            wordType,
            pronounciation,
            imgLink
        } 
    return formData
}

function resetInput() {
    let formInputs = [...$$('.form-control')];

    imgFileInput.value = '';
    imgFileInput.removeAttribute('disabled'); // tag span form-message

    formInputs.forEach(input => {
        input.value = '';
        input.classList.remove('invalid');
        input.removeAttribute('disabled');
        input.nextElementSibling.classList.remove('invalid'); // tag span form-message
        input.nextElementSibling.textContent = '';
    })
    
}

function checkImgInput() {
    imgLinkInput.onchange = () => {
        if (imgLinkInput.value.trim())  
            imgFileInput.setAttribute("disabled", true)
        else imgFileInput.removeAttribute("disabled")
    }

    imgFileInput.onchange = () => {
        if  (imgFileInput.value)
            imgLinkInput.setAttribute("disabled", true)
        else imgLinkInput.removeAttribute("disabled")
    }
}

function checkForm() {
    let formInputs = [...$$('.form-control')];

    if (imgFileInput.files[0]) {
        formInputs = formInputs.filter((input) => input.id !== "img")
    }
    
    let isValid = formInputs.every(input => input.value);
    return isValid
}

function checkInputValue() {
    let formInputs = [...$$('.form-control')];
    
    formInputs.forEach((input) => {
        // check value input
        if (!input.value) {
            input.classList.add('invalid')
            input.nextElementSibling.classList.add('invalid')
            input.nextElementSibling.textContent = `Please enter your ${input.id} card.`
        }
        else {
            input.classList.remove('invalid')
            input.nextElementSibling.classList.remove('invalid')
            input.nextElementSibling.textContent = ''
        }
        // check img file input
        if (imgFileInput.files[0]) {
            formInputs.forEach((input) => {
                if( input.id === "img") {
                    input.classList.remove('invalid')
                    input.nextElementSibling.classList.remove('invalid')
                }
            })  
        } 
    })
}

function handleCreateCard() {    
    createBtn.onclick = () => {
        let isValid = checkForm();

        if (isValid) {
            let formData = getFormData();
            cards.push(formData);
            //render new card
            const htmls = `
                    <div class="card container-item card-item-${formData.id}">
                        <img src="${formData.imgLink}" alt="" id="img">
                        <div class="card-body">
                            <div class="card-title">${formData.name}</div>
                                <div class="card-text">
                                    <div class="card-wordtype">(
                                        <span class="card-wordtype-text">${formData.wordType}</span>
                                        )</div>
                                    <div class="card-pronounciation">/
                                    <span class="card-pronounciation-text">${formData.pronounciation}</span>
                                    /</div>
                                </div>
                                <div class="card-tools">
                                    <div class="card-tools-item" onClick="handleDeleteCard(${formData.id})">
                                        <i class="fa-solid fa-trash"></i>
                                    </div>
                                    <div class="card-tools-item" id="edit-btn" onClick="handleEditCard(${formData.id})">
                                        <i class="fa-solid fa-pen-to-square"></i>
                                    </div>
                                </div>
                            </div>
                        </div>   
                    </div>
                `
            listCards.insertAdjacentHTML("beforeend", htmls);
            resetInput();
        } else checkInputValue();
    };
};

function handleEditCard(id) {
    let cardItemTitle = $(`.card-item-${id} .card-title`),
        cardItemType = $(`.card-item-${id} .card-wordtype-text`),
        cardItemPronoun = $(`.card-item-${id} .card-pronounciation-text`),
        cardItemImg = $(`.card-item-${id} img`);

    $('input[id="name"]').value = cardItemTitle.textContent;
    $('input[id="type"]').value = cardItemType.textContent;
    $('input[id="pronounciation"]').value = cardItemPronoun.textContent;
    imgLinkInput.value = cardItemImg.src;
    imgFileInput.setAttribute('disabled', true);
    
    createBtn.id = 'update';
    let updateBtn = $('#update');
    updateBtn.textContent = 'Update';

    updateBtn.onclick = function () {
        let isValid = checkForm();

        if (isValid) {
            let formData = getFormData();
            cards.splice(id - 1 , 1, formData);
            
            cardItemTitle.textContent = formData.name;
            cardItemType.textContent = formData.wordType;
            cardItemPronoun.textContent = formData.pronounciation;
            cardItemImg.src = formData.imgLink;

            updateBtn.id = 'create';
            createBtn.textContent = 'Create';

        resetInput();
        handleCreateCard();
        } else checkInputValue();
    }
}

function handleDeleteCard(id) {
    const cardItem = $('.card-item-' + id);
    let text = "Do you want to remove this card?";
    if (cardItem) {
        if (confirm(text) === true)
            cardItem.remove()
            cards.splice(id - 1, 1) 
    };
}





