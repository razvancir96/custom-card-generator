function addDimensionsDefaultValues() {
    let cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const LSWidth = getLSItem().width;
    const LSHeight = getLSItem().height;

    if (LSWidth) {
        widthInput.value = LSWidth;
        card.style.width = LSWidth;
    } else {
        widthInput.value = cardWidth;
        modifyLSItem('width', cardWidth);
    }
    if (LSHeight) {
        heightInput.value = LSHeight;
        card.style.height = LSHeight;
    } else {
        heightInput.value = cardHeight;
        modifyLSItem('height', cardHeight);
    }
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

function addColorDefaultValues() {
    const textColorRgb = getComputedStyle(card).getPropertyValue('color');
    const textColorHex = rgbStringToHex(textColorRgb);
    const backgroundColorRgb = getComputedStyle(card).getPropertyValue('background-color');
    const backgroundColorHex = rgbStringToHex(backgroundColorRgb);
    const shadow = getComputedStyle(card).getPropertyValue('box-shadow');
    const shadowRgb = shadow.split(') ')[0] + ')';
    const shadowHex = rgbStringToHex(shadowRgb);
    const LSText = getLSItem().color;
    const LSBackground = getLSItem().backgroundColor;
    const LSShadow = getLSItem().boxShadow;

    if (LSText) {
        textInput.value = LSText;
        card.style.color = LSText;
    } else {
        textInput.value = textColorHex;
        modifyLSItem('color', textColorHex);
    }
    if (LSBackground) {
        backgroundInput.value = LSBackground;
        card.style.backgroundColor = LSBackground;
    } else {
        backgroundInput.value = backgroundColorHex;
        modifyLSItem('backgroundColor', backgroundColorHex);
    }
    if (LSShadow) {
        shadowInput.value = rgbStringToHex(LSShadow.split(') ')[0] + ')');
        card.style.boxShadow = LSShadow;
    } else {
        shadowInput.value = shadowHex;
        modifyLSItem('boxShadow', shadow);
    }
}

addColorDefaultValues()

function addContentDefaultValues() {
    const LSImage = getLSItem().image;
    const LSTitle = getLSItem().title;
    const LSDescription = getLSItem().description;

    if (LSImage) {
        imageInput.value = LSImage;
        image.src = LSImage;
    } else {
        imageInput.value = image.src;
        modifyLSItem('image', image.src);
    }

    if (LSTitle) {
        titleInput.value = LSTitle;
        title.textContent = LSTitle;
    } else {
        titleInput.value = title.textContent;
        modifyLSItem('title', title.textContent);
    }
    
    if (LSDescription) {
        const descriptionConent = document.createTextNode(LSDescription);
        descriptionInput.appendChild(descriptionConent);
        description.textContent = LSDescription;
    } else {
        const descriptionConent = document.createTextNode(description.textContent);
        descriptionInput.appendChild(descriptionConent);
        modifyLSItem('description', description.textContent);
    }
}

addContentDefaultValues();

// Just for height checkbox, you can also implement for the other 3
function addCheckboxDefaultValues() {
    const heightCheckboxLS = getLSItem().heightCheckbox;
    if (heightCheckboxLS) {
        // Pay attention to Boolean conversion!
        heightCheckbox.checked = heightCheckboxLS === 'true' ? true : false;
        heightInput.disabled = heightCheckboxLS === 'true' ? false : true;
        if (heightCheckboxLS === 'false') {
            card.style.height = 'auto'
        }
    }
}

addCheckboxDefaultValues()