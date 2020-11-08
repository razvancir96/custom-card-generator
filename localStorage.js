const customCardValues = 'customCardValues'

function getLSItem() {
    const lsItem = localStorage.getItem(customCardValues);
    return JSON.parse(lsItem);
}

function setLSItem(value) {
    const stringifiedItem = JSON.stringify(value);
    localStorage.setItem(customCardValues, stringifiedItem);
}

function modifyLSItem(property, value) {
    const lsItem = getLSItem(customCardValues);
    lsItem[property] = value;
    setLSItem(lsItem);
}

if (!getLSItem()) {
    setLSItem({});
}