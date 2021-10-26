const numberBtns = document.querySelectorAll("[data-num]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const allDeleteBtn = document.querySelector("[data-all-delete]");
const prevOperandTxtEl = document.querySelector("[data-previous-operand]");
const currOperandTxtEl = document.querySelector("[data-current-operand]");

class Calculator {
  constructor(prevOperandTxtEl, currOperandTxtEl) {
    this.prevOperandTxtEl = prevOperandTxtEl;
    this.currOperandTxtEl = currOperandTxtEl;
    this.wasCalculated = false;
    this.allDelete();
  }

  allDelete() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand
      .toString()
      .slice(0, this.currentOperand.length - 1);
  }

  appendNum(num) {
    if (this.wasCalculated === true) {
      this.currentOperand = "";
      this.wasCalculated = false;
    }
    if (num === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + num.toString();
  }

  determineOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.calculate();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  calculate() {
    let computation;
    this.wasCalculated = true;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;

      case "-":
        computation = prev - curr;
        break;

      case "/":
        computation = prev / curr;
        break;

      case "*":
        computation = prev * curr;
        break;

      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.currOperandTxtEl.innerText = this.currentOperand;
  }
}

const calculator = new Calculator(prevOperandTxtEl, currOperandTxtEl);

numberBtns.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNum(button.innerText);
    calculator.updateDisplay();
  });
});

operationBtns.forEach((operation) => {
  operation.addEventListener("click", () => {
    calculator.determineOperation(operation.value);
    // calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

allDeleteBtn.addEventListener("click", () => {
  calculator.allDelete();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
