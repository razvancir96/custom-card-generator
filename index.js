const editDimensionsTitle = document.querySelector('.edit-dimensions-title');
const editColorsTitile = document.querySelector('.edit-colors-title');
const editContentTitle = document.querySelector('.edit-content-title');

// Intially we had 3 repetitive pieces of code, so we made this function.
function handleSectionTitleClick(titleDomElement, sectionName) {
    titleDomElement.addEventListener('click', function() {
        const editSectionContent = document.querySelector(`.edit-${sectionName}-content`);
        editSectionContent.classList.toggle('active');
        const innerIcons = document.querySelectorAll(`.edit-${sectionName}-title .material-icons`);
        innerIcons.forEach(icon => {
            icon.classList.toggle('active');
        })
    })
}

handleSectionTitleClick(editDimensionsTitle, 'dimensions');
handleSectionTitleClick(editColorsTitile, 'colors');
handleSectionTitleClick(editContentTitle, 'content');

const card = document.querySelector('.card');
const widthInput = document.querySelector('#edit-width');
const heightInput = document.querySelector('#edit-height');

function addDimensionsDefaultValues() {
    const cardWidth = card.offsetWidth;
    widthInput.value = cardWidth;
    const cardHeight = card.offsetHeight;
    heightInput.value = cardHeight;
}

// Give the browser time to calculate height
setTimeout(() => {
    addDimensionsDefaultValues()
}, 100);

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function rgbStringToHex(rgbString) {
    const rgbNumbers = rgbString.substring(4, rgbString.length - 1).split(', ');
    const red = Number(rgbNumbers[0]);
    const green = Number(rgbNumbers[1]);
    const blue = Number(rgbNumbers[2]);
    const shadowHex = rgbToHex(red, green, blue);

    return shadowHex;
}

const textInput = document.querySelector('#edit-text-color');
const backgroundInput = document.querySelector('#edit-background-color');
const shadowInput = document.querySelector('#edit-shadow-color');

function addColorDefaultValues() {
    const textColorRgb = getComputedStyle(card).getPropertyValue('color');
    const textColorHex = rgbStringToHex(textColorRgb);
    const backgroundColorRgb = getComputedStyle(card).getPropertyValue('background-color');
    const backgroundColorHex = rgbStringToHex(backgroundColorRgb);
    const shadow = getComputedStyle(card).getPropertyValue('box-shadow');
    const shadowRgb = shadow.split(') ')[0] + ')';
    const shadowHex = rgbStringToHex(shadowRgb);

    textInput.value = textColorHex;
    backgroundInput.value = backgroundColorHex;
    shadowInput.value = shadowHex;
}

addColorDefaultValues()

const image = document.querySelector('.card img');
const imageWrapper = document.querySelector('.card .image-wrapper');
const title = document.querySelector('.card .title');
const description = document.querySelector('.card .description');
const imageInput = document.querySelector('#edit-image');
const titleInput = document.querySelector('#edit-title');
const descriptionInput = document.querySelector('#edit-description');

function addContentDefaultValues() {
    imageInput.value = image.src;
    titleInput.value = title.textContent;
    const descriptionConent = document.createTextNode(description.textContent);
    descriptionInput.appendChild(descriptionConent);
}

addContentDefaultValues();

const heightCheckbox = document.querySelector('#edit-height-checkbox');
const titleCheckbox = document.querySelector('#edit-title-checkbox');
const descriptionCheckbox = document.querySelector('#edit-description-checkbox');
const imageCheckbox = document.querySelector('#edit-image-checkbox');

const widthWarning = document.querySelector('.width-warning');
const heightWarning = document.querySelector('.height-warning');

function checkboxToggle(checkboxElement, inputName, doModifyCard, cardModifiedElement) {
    checkboxElement.addEventListener('input', function (event) {
        const input = document.querySelector(`#edit-${inputName}`);
        if (input.disabled) {
            input.disabled = false;
        } else {
            input.disabled = true;
        }

        if (doModifyCard) {
            if (event.target.checked) {
                cardModifiedElement.style.display = 'block';
            } else {
                cardModifiedElement.style.display = 'none';
            }
        // special case for height
        } else {
            if (!event.target.checked) {
                card.style.height = 'auto';
                heightInput.value = card.offsetHeight;
                heightWarning.style.display = 'none';
            }
        }
    })
}

checkboxToggle(heightCheckbox, 'height');
checkboxToggle(titleCheckbox, 'title', true, title);
checkboxToggle(descriptionCheckbox, 'description', true, description);
checkboxToggle(imageCheckbox, 'image', true, imageWrapper);

function validateWidth(inputValue) {
    if (inputValue === '') {
        widthWarning.style.display = 'none';
        return 0;
    };

    if (Number(inputValue) > 1200) {
        widthWarning.style.display = 'flex';
        widthInput.value = '1200';
        return '1200';
    } else {
        widthWarning.style.display = 'none';
        return inputValue
    }
}

function validateHeight(inputValue) {
    if (inputValue === '') {
        heightWarning.style.display = 'none';
        return 0;
    }

    if (Number(inputValue) > window.innerHeight) {
        heightWarning.style.display = 'flex';
        heightInput.value = window.innerHeight;
        return String(window.innerHeight);
    } else {
        heightWarning.style.display = 'none';
        return inputValue;
    }
}

let widthDebounceTimeoutId;
let heightDebounceTimeoutId;

function modifyCardStyle(inputField, modifiedProperty) {
    inputField.addEventListener('input', function(event) {
        let inputValue = event.target.value;
        if (modifiedProperty === 'width' || modifiedProperty === 'height') {
            if (modifiedProperty === 'width') {
                inputValue = validateWidth(inputValue);
            } else {
                inputValue = validateHeight(inputValue);
            }
            inputValue = inputValue + 'px';
        } else if (modifiedProperty === 'boxShadow') {
            const shadow = getComputedStyle(card).getPropertyValue('box-shadow');
            const boxShadowWithoutColor = shadow.split(') ')[1];
            inputValue = inputValue + ' ' + boxShadowWithoutColor;
        }

        if (modifiedProperty === 'width') {
            clearTimeout(widthDebounceTimeoutId);

            widthDebounceTimeoutId = setTimeout(() => {
                card.style[modifiedProperty] = inputValue;
            }, 1000);
        } else if (modifiedProperty === 'height') {
            clearTimeout(heightDebounceTimeoutId);

            heightDebounceTimeoutId = setTimeout(() => {
                card.style[modifiedProperty] = inputValue;
            }, 1000);
        } else {
            card.style[modifiedProperty] = inputValue;
        }
    });
}

modifyCardStyle(widthInput, 'width');
modifyCardStyle(heightInput, 'height');
modifyCardStyle(textInput, 'color');
modifyCardStyle(backgroundInput, 'backgroundColor');
modifyCardStyle(shadowInput, 'boxShadow');

function modifyCardContent(inputField, cardElement) {
    inputField.addEventListener('input', function(event) {
        let inputValue = event.target.value;
        if (cardElement.src !== undefined) {
            cardElement.src = inputValue;
        } else {
            cardElement.textContent = inputValue;
        }
    })
}

modifyCardContent(imageInput, image);
modifyCardContent(titleInput, title);
modifyCardContent(descriptionInput, description);