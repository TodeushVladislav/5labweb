//Поміняйте місцями контент блоків «3» та «6»
let buttonExchange = false;

const block3 = document.querySelector('.third.section');
const block6 = document.querySelector('.sixth.section');


function exchangeBlocks3and6() {
	buttonExchange = !buttonExchange;
	if (block3 && block6 && buttonExchange) {
        block6.style.gridArea = "third"; 
        block3.style.gridArea = "sixth";
    }
	if (block3 && block6 && !buttonExchange){
		block6.style.gridArea = "sixth"; 
        block3.style.gridArea = "third";
	}
}




//Напишіть функцію, яка обчислює площу паралелограма, беручи необхідні значення із відповідних змінних у скрипті, і виводить отриманий результат в кінці контенту в блоці «5».
	let side_1 = 5;
	const textSide = document.querySelector('.text__side');
	textSide.textContent = side_1;
	let H = 9;
	const textHeight = document.querySelector('.text__height');
	textHeight.textContent = H;
	let square = 0;
	const textSquare = document.querySelector('.text__square');

	function calculateSquare(){
		square = side_1 * H;
		textSquare.textContent = square;
	}


/*
Напишіть скрипт, який знаходить максимальну
цифру у заданому натуральному числі, беручи
необхідне значення із відповідної форми в блоці
«5», а отриманий результат виводить за допомогою
діалогового вікна і зберігає в cookies, причому:
а) при оновленні веб-сторінки в броузері користувачу за допомогою
діалогового вікна виводиться інформація, збережена в cookies, із
інформуванням, що після натискання кнопки «ОК» відбудеться видалення
даних із cookies, і не виводиться згадана вище форма;
б) при натисканні кнопки «ОК» відповідні cookies видаляються, і виводиться
наступне діалогове вікно із повідомленням, що cookies видалено, а натискання
кнопки «ОК» перезавантажує веб-сторінку з початковим станом із наявною
формою для введення даних.

*/
const maxDigitForm = document.querySelector('.text__maxDigit');
let maxDigit = 0;
function findMaxDigit() {
	const inputElement = document.getElementById('digitInput');
	const num = inputElement.value;
	if (!/^\d+$/.test(num)) {
		alert("Будь ласка, введіть натуральне число!");
		return; }
	const digits = num.split("").map(Number);
	const maxDigit = Math.max(...digits);
	maxDigitForm.textContent = maxDigit;
	alert("Максимальна цифра: " + maxDigit);
	setCookie("maxDigit", maxDigit, 7);
}

function setCookie(name, value, days = 7) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();

    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
    console.log("Куки встановлені:", document.cookie);
}

const formBlock = document.querySelector('.form');


function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let c of cookies) {
        const [key, val] = c.split("=");
        if (key === name)
            return decodeURIComponent(val);
    }
    return null;
}
function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
}
window.addEventListener('load', function () {
	const cookieName = "maxDigit";
	const savedData = getCookie(cookieName);

	if (savedData) {
		if (formBlock) formBlock.style.display = "none";
		alert(`Інформація з cookies: Максимальна цифра ${savedData}.\nНатисніть "ОК", щоб видалити дані.`);
		deleteCookie(cookieName);
		alert("Cookies видалено. Натисніть ОК, щоб перезавантажити сторінку.");
		location.reload();
	}
});


	/* Напишіть скрипт, який при настанні події mouseout задає вирівнювання по
правому краю вмісту блоків «2», «4», «5» при встановленні користувачем
відповідних радіокнопок у формі і зберігає відповідні значення в localStorage
броузера так, щоб при наступному відкриванні сторінки властивості
вирівнювання по правому краю вмісту блоків «2», «4», «5» встановлювались із
збережених значень в localStorage.
*/



const blocks = [
    document.querySelector('.second.section'),
    document.querySelector('.fourth.section'),
    document.querySelector('.fifth.section')
];

const form = document.querySelector('.radiobuttons');
const storageKey = 'blocksAlign';

window.addEventListener("load", function () {
    const savedAlign = localStorage.getItem(storageKey);
	//localStorage.clear();
	//localStorage.setItem(storageKey, savedAlign);

    if (savedAlign) {
        applyAlign(savedAlign);
        const radio = form.querySelector(`input[value="${savedAlign}"]`);
        if (radio) {radio.checked = true;}
    }
	document.querySelectorAll(".section").forEach((block, index) => {
        localStorage.removeItem(`list_data_${index}`); 
    });
});

form.addEventListener("mouseout", function () {
    const selected = form.querySelector('input[name="blockAlign"]:checked');
    if (selected) {
        const alignValue = selected.value;
        applyAlign(alignValue);
        localStorage.setItem(storageKey, alignValue);
    }
});

function applyAlign(alignValue) {
    blocks.forEach(block => {
        block.style.textAlign = alignValue;
    });
}



/*5. Напишіть скрипт створення нумерованого списку:
а) необхідні елементи форми появляються у відповідних номерних блоках (1..7)
внаслідок події select на довільному контенті блоку;
б) кількість пунктів нумерованого списку необмежена;
в) поруч розміщується кнопка, внаслідок натискання на яку внесені дані
нумерованого списку зберігаються в localStorage броузера (структуровано на
ваш розсуд), а сам список додається в кінці наявного вмісту відповідного
номерного блока;
г) перезавантаження веб-сторінки призводить до видалення нового вмісту із
localStorage броузера

 */


function createForm(block) {
	if (block.querySelector("form__select")) return;

	const form = document.createElement("form__select");
	form.innerHTML = `
        <input type="text" placeholder="Введіть пункт списку" class="listInput">
        <button type="button" class="addItem">Додати пункт</button>
        <button type="button" class="saveList">Зберегти список</button>
    `;

	const listContainer = document.createElement("ol"); // контейнер для списку
	form.appendChild(listContainer);

	form.querySelector(".addItem").addEventListener("click", () => {
		const input = form.querySelector(".listInput");
		if (input.value.trim() !== "") {
			const li = document.createElement("li");
			li.textContent = input.value.trim();
			listContainer.appendChild(li);
			input.value = "";
		}
	});

	form.querySelector(".saveList").addEventListener("click", () => {
		const items = [...listContainer.querySelectorAll("li")].map(li => li.textContent);
		if (items.length > 0) {
			localStorage.setItem(block.id, JSON.stringify(items));

			const finalList = document.createElement("ol");
			items.forEach(text => {
				const li = document.createElement("li");
				li.textContent = text;
				finalList.appendChild(li);
			});
			block.appendChild(finalList);

			form.remove();
		}
	});

	block.appendChild(form);
}

document.querySelectorAll(".section").forEach(block => {
	block.addEventListener("click", () => {
		createForm(block);
	});
});



