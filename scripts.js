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
            add(x, y);
        case "-":
            subtract(x, y);
        case "*":
            multiply(x, y);
        case "/":
            divide(x, y);
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
display.textContent = "124";
row.appendChild(display);

// Adding the buttons
for (buttons of buttonList) {
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    container.appendChild(row);

    for (buttonItem of buttons) {
        const button = document.createElement("button");
        button.textContent = buttonItem;
        
        row.appendChild(button);
    }
}