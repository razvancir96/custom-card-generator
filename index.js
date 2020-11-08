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
                modifyLSItem('heightCheckbox', 'false');
                modifyLSItem('height', card.offsetHeight);
            } else {
                modifyLSItem('heightCheckbox', 'true');
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
                modifyLSItem(modifiedProperty, parseInt(inputValue));
            }, 1000);
        } else if (modifiedProperty === 'height') {
            clearTimeout(heightDebounceTimeoutId);

            heightDebounceTimeoutId = setTimeout(() => {
                card.style[modifiedProperty] = inputValue;
                modifyLSItem(modifiedProperty, parseInt(inputValue));
            }, 1000);
        } else {
            card.style[modifiedProperty] = inputValue;
            if ( modifiedProperty === 'boxShadow') {
                const shadow = getComputedStyle(card).getPropertyValue('box-shadow');
                modifyLSItem(modifiedProperty, shadow);
            } else {
                modifyLSItem(modifiedProperty, inputValue);
            }
        }
    });
}

modifyCardStyle(widthInput, 'width');
modifyCardStyle(heightInput, 'height');
modifyCardStyle(textInput, 'color');
modifyCardStyle(backgroundInput, 'backgroundColor');
modifyCardStyle(shadowInput, 'boxShadow');

function modifyCardContent(inputField, cardElement, LSProperty) {
    inputField.addEventListener('input', function(event) {
        let inputValue = event.target.value;
        if (cardElement.src !== undefined) {
            cardElement.src = inputValue;
        } else {
            cardElement.textContent = inputValue;
        }
        modifyLSItem(LSProperty, inputValue);
    })
}

modifyCardContent(imageInput, image, 'image');
modifyCardContent(titleInput, title, 'title');
modifyCardContent(descriptionInput, description, 'description');