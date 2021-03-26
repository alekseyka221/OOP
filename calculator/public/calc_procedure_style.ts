/**
 * получаем Node элементы из html
 * @param {string} element - строка названия элементов
 *
 */
function getNodeElements(element: string): NodeListOf<Element>
{
	return document.querySelectorAll(element);
}

/**
 * получаем Node элемент из html
 * @param {string} element - строка названия элемента
 *
 */
function getNodeElement(element: string): Element
{
	return document.querySelector(element);
}

/**
 * функция выводит на экран число которое пользователь набирает
 *
 */
function setNumber(): void
{
	if (resultNum)
	{
		curNum = this.getAttribute("data-num");
		resultNum = ""
	} else
	{
		curNum += this.getAttribute("data-num");
	}
	viewer.innerHTML = curNum;
}

/**
 * функция очищает экран после нажатия на кнопку с оператором
 *
 */
function moveNum(): void
{
	oldNum = curNum;
	curNum = "";
	operator = this.getAttribute("data-ops");
	equals.setAttribute("data-result", "");
}

/**
 * функция выводящая на экран результат арифметической операции

 */
function display()
{
	const oldN: number = parseFloat(oldNum),
		curN: number = parseFloat(curNum);
	let res: number;
	switch (operator)
	{
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
	if (!isFinite(res))
	{
		resultNum = "Упс)))";
	} else
	{
		resultNum = res as unknown as string;
	}
	viewer.innerHTML = resultNum;
	equals.setAttribute("data-result", resultNum);
	oldNum = '';
	curNum = resultNum;
}

/**
 * функция очищающая дисплей

 */
function clear()
{
	oldNum = '';
	curNum = '';
	viewer.innerHTML = '0';
	equals.setAttribute("data-result", resultNum);
}

/*
 * инициализируем переменные
 */
let viewer: Element = getNodeElement("#viewer");
let	equals: Element = getNodeElement("#equals");
let	nums: NodeListOf<Element> = getNodeElements(".num");
let	ops: NodeListOf<Element> = getNodeElements(".ops");
let	curNum: string = "";
let	oldNum: string = "";
let	resultNum: string = "";
let	operator: string = "";

/*
* вешаем листнеры
 */
for (let i : number = 0; i < nums.length; i++)
{
	nums[i].addEventListener("click", setNumber);
}
for (let i : number = 0; i < ops.length; i++)
{
	ops[i].addEventListener("click", moveNum)
}
equals.addEventListener("click", display);

getNodeElement('#clear').addEventListener("click", clear);
