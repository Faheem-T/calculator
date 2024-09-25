function add(x, y) {
    return x + y;
}
function subtract(x, y) {
    return x - y;
}
function multiply(x, y) {
    return x * y;
}
function divide(x, y) {
    return x / y;
}

function operate(operator, x, y) {
    switch(operator) {
        case "+":
            return add(x, y);
        case "-":
            return subtract(x, y);
        case "*":
            return multiply(x, y);
        case "/":
            return divide(x, y);
    }
}

// Creating the buttons inside .container
const buttonList = [[1, 2, 3, "+"], [4, 5, 6, "-"], [7, 8, 9, "*"], [0, ".", "=", "/"], ["Clear"]];
const container = document.querySelector(".container");

// Adding the display
const row = document.createElement("div");
row.setAttribute("class", "row");
container.appendChild(row);
const display = document.createElement("label");
row.appendChild(display);


// global variables
let operator = null;
let storedNum = null;
let operatorPressed = false;

// Adding the buttons
for (buttons of buttonList) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    container.appendChild(row);

    for (buttonItem of buttons) {
        const button = document.createElement("button");
        button.textContent = buttonItem;
        if ("+-*/".includes(buttonItem)) {
            button.setAttribute("class", "btn operator");
            button.addEventListener("click", operatorFunction);
        } else if (!"Clear=".includes(buttonItem)) {
            button.setAttribute("class", "btn");
        } else {
            button.setAttribute("class", "special");
        }
        button.setAttribute("id", buttonItem);
        
        row.appendChild(button);
    }
}

function operatorFunction(event) {
    // Not doing calculation if the last button pressed was an operator
    if (!operatorPressed) {
        // if storedNum != null --> an operator was clicked before this operator click
        // then storedNumber = operate(operator, storedNumber, secondNumber)
        //
        // secondNumber will be the number that is currently displayed:
        // secondNumber = +display.textContent
        if (storedNum !== null) {
            storedNum = operate(operator, storedNum, +display.textContent);
            // removing excess digits after decimal
            storedNum = Math.floor(storedNum * 100000) / 100000;
            display.textContent = storedNum;
        } else {
            storedNum = +display.textContent;
        }
    }

    // Keeping the operator the same if "=" was pressed
    if (!(event.target.id === "=")) {
        operator = event.target.id;
    }
    operatorPressed = true;
}

// Logic to make the buttons text appear inside display
// (making use of event delegation here)
container.addEventListener("click", (event) => {
    const buttonValue = event.target.attributes.class.value;
    if (buttonValue == "btn") {
        // clearing the display if an operator was pressed before this click
        if (operatorPressed) {
            display.textContent = "";
            operatorPressed = false;
        }
        display.textContent += event.target.textContent;
    }
});


const equal = document.getElementById("=");
equal.addEventListener("click", (event) => {
    // ignoring the click if an operator was not clicked before this
    if (operator) {
        operatorFunction(event);
    }
});

const clear = document.querySelector("#Clear");
// resetting all globals on "clear" click
// also resetting display
clear.addEventListener("click", () => {
    operator = null;
    storedNum = null;
    operatorPressed = false;
    display.textContent = "";
})

