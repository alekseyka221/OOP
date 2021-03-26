function getNodeElements(element) {
    return document.querySelectorAll(element);
}
function getNodeElement(element) {
    return document.querySelector(element);
}
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
function moveNum() {
    oldNum = curNum;
    curNum = "";
    operator = this.getAttribute("data-ops");
    equals.setAttribute("data-result", "");
}
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
        case "times":
            res = oldN * curN;
            break;
        case "divided by":
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
function clear() {
    oldNum = '';
    curNum = '';
    viewer.innerHTML = '0';
    equals.setAttribute("data-result", resultNum);
}
var viewer = getNodeElement("#viewer"), // Calculator screen where result is displayed
equals = getNodeElement("#equals"), // Equal button
nums = getNodeElements(".num"), // List of numbers
ops = getNodeElements(".ops"), // List of operators
curNum = "", // Current number
oldNum = "", // First number
resultNum, // Result
operator; // Batman
for (var i = 0; i < nums.length; i++) {
    nums[i].addEventListener("click", setNumber);
}
for (var i = 0; i < ops.length; i++) {
    ops[i].addEventListener("click", moveNum);
}
equals.addEventListener("click", display);
getNodeElement('#clear').addEventListener("click", clear);
// getNodeElement('#reset').addEventListener("click", ()=>
// {
// 	window.location = window.location;
// })
