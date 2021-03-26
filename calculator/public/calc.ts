function getNodeElements(element: string): NodeListOf<Element>
{
	return document.querySelectorAll(element);
}


function getNodeElement(element: string): Element
{
	return document.querySelector(element);
}

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

function moveNum(): void
{
	oldNum = curNum;
	curNum = "";
	operator = this.getAttribute("data-ops");
	equals.setAttribute("data-result", "");
}

function display()
{
	const oldN : number = parseFloat(oldNum),
		curN : number = parseFloat(curNum);
	let res : number = 0;
	switch (operator)
	{
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
	else{
		resultNum = res as unknown as string;
	}
	viewer.innerHTML = resultNum;
	equals.setAttribute("data-result", resultNum);
	oldNum = '';
	curNum = resultNum;
}

function clear()
{
	oldNum ='';
	curNum = '';
	viewer.innerHTML = '0';
	equals.setAttribute("data-result", resultNum);
}

let viewer: Element = getNodeElement("#viewer"), // Calculator screen where result is displayed
	equals: Element = getNodeElement("#equals"), // Equal button
	nums: NodeListOf<Element> = getNodeElements(".num"), // List of numbers
	ops: NodeListOf<Element> = getNodeElements(".ops"), // List of operators
	curNum: string = "", // Current number
	oldNum: string = "", // First number
	resultNum: string, // Result
	operator: string; // Batman

for (let i = 0; i < nums.length; i++)
{
	nums[i].addEventListener("click", setNumber);
}
for (let i = 0; i < ops.length; i++) {
	ops[i].addEventListener("click", moveNum)
}
equals.addEventListener("click", display);

getNodeElement('#clear').addEventListener("click", clear);
