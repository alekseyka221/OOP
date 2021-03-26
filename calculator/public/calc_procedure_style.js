/**
 * получаем Node элементы из html
 * @param {string} element - строка названия элементов
 *
 */
function getNodeElements(element) {
    return document.querySelectorAll(element);
}
/**
 * получаем Node элемент из html
 * @param {string} element - строка названия элемента
 *
 */
function getNodeElement(element) {
    return document.querySelector(element);
}
/**
 * функция выводит на экран число которое пользователь набирает
 *
 */
function setNumber() {
    if (resultNum) {
        curNum = this.getAttribute("data-num");
        resultNum = "";
    }
    else {
        curNum += this.getAttribute("data-num");
    }
    viewer.innerHTML = curNum;
}
/**
 * функция очищает экран после нажатия на кнопку с оператором
 *
 */
function moveNum() {
    oldNum = curNum;
    curNum = "";
    operator = this.getAttribute("data-ops");
    equals.setAttribute("data-result", "");
}
/**
 * функция выводящая на экран результат арифметической операции

 */
function display() {
    var oldN = parseFloat(oldNum), curN = parseFloat(curNum);
    var res = 0;
    switch (operator) {
        case "plus":
            res = oldN + curN;
            break;
        case "minus":
            res = oldN - curN;
            break;
        case "multiply":
            res = oldN * curN;
            break;
        case "divided":
            res = oldN / curN;
            break;
        default:
            res = curN;
    }
    if (!isFinite(res)) {
        resultNum = "Упс)))";
    }
    else {
        resultNum = res;
    }
    viewer.innerHTML = resultNum;
    equals.setAttribute("data-result", resultNum);
    oldNum = '';
    curNum = resultNum;
}
/**
 * функция очищающая дисплей

 */
function clear() {
    oldNum = '';
    curNum = '';
    viewer.innerHTML = '0';
    equals.setAttribute("data-result", resultNum);
}
var viewer = getNodeElement("#viewer");
var equals = getNodeElement("#equals");
var nums = getNodeElements(".num");
var ops = getNodeElements(".ops");
var curNum = "";
var oldNum = "";
var resultNum = "";
var operator = "";
for (var i = 0; i < nums.length; i++) {
    nums[i].addEventListener("click", setNumber);
}
for (var i = 0; i < ops.length; i++) {
    ops[i].addEventListener("click", moveNum);
}
equals.addEventListener("click", display);
getNodeElement('#clear').addEventListener("click", clear);
