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

function addDimensionsDefaultValues() {
    const card = document.querySelector('.card');
    const editWeightInput = document.querySelector('#edit-weight');
    const editHeightInput = document.querySelector('#edit-height');

    const cardWidth = card.offsetWidth;
    editWeightInput.value = cardWidth;
    const cardHeight = card.offsetHeight;
    editHeightInput.value = cardHeight;
}

addDimensionsDefaultValues()

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

function addColorDefaultValues() {
    const card = document.querySelector('.card');
    const textInput = document.querySelector('#edit-text-color');
    const backgroundInput = document.querySelector('#edit-background-color');
    const shadowInput = document.querySelector('#edit-shadow-color');

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

function addContentDefaultValues() {
    const image = document.querySelector('.card img');
    const title = document.querySelector('.card .title');
    const description = document.querySelector('.card .description');
    const imageInput = document.querySelector('#edit-image');
    const titleInput = document.querySelector('#edit-title');
    const descriptionTextarea = document.querySelector('#edit-description');

    imageInput.value = image.src;
    titleInput.value = title.textContent;
    const descriptionConent = document.createTextNode(description.textContent);
    descriptionTextarea.appendChild(descriptionConent);
}

addContentDefaultValues();