const billInput = document.querySelector("#bill");
const customTipInput = document.querySelector("#custom-tip");
const numberPeopleInput = document.querySelector("#number-people");
const form = document.querySelector("form");
const buttons = document.querySelectorAll(".btn-tip");
const tipAmount = document.querySelector(".tip-amount");
const tipTotal = document.querySelector(".tip-total");
const resetBtn = document.querySelector(".reset");
const error0 = document.querySelector(".tip-input div");
let bill, tip, numberPeople;
let validReset = false;

billInput.addEventListener("input", function () {
  limitNumber(this, 6);

  this.value = this.value.replace(/[^0-9.]/g, "");

  if ((this.value.match(/\./g) || []).length > 1) {
    this.value = this.value.substring(0, this.value.lastIndexOf("."));
  }

  bill = Number(billInput.value);
  setResult();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

document.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("tip-5")) {
    tip = 0.05;
    customTipInput.value = "";
    for (let i of buttons) {
      i.id = "";
    }

    target.id = "btn-active";
  }

  if (target.classList.contains("tip-10")) {
    tip = 0.1;
    customTipInput.value = "";

    for (let i of buttons) {
      i.id = "";
    }

    target.id = "btn-active";
  }

  if (target.classList.contains("tip-15")) {
    tip = 0.15;
    customTipInput.value = "";

    for (let i of buttons) {
      i.id = "";
    }

    target.id = "btn-active";
  }

  if (target.classList.contains("tip-25")) {
    tip = 0.25;
    customTipInput.value = "";

    for (let i of buttons) {
      i.id = "";
    }

    target.id = "btn-active";
  }

  if (target.classList.contains("tip-50")) {
    tip = 0.5;
    customTipInput.value = "";

    for (let i of buttons) {
      i.id = "";
    }

    target.id = "btn-active";
  }

  setResult();
});

customTipInput.addEventListener("input", function () {
  limitNumber(this, 2);

  for (let i of buttons) {
    i.id = "";
  }

  this.value = this.value.replace(/[^0-9]+$/, "");

  tip = Number(customTipInput.value / 100);
  setResult();
});

numberPeopleInput.addEventListener("input", function () {
  limitNumber(this, 2);
  
  this.value = this.value.replace(/[^0-9]+$/, "");
  
  numberPeople = Number(numberPeopleInput.value);
  if (numberPeople !== 0) {
    numberPeopleInput.style.border = "3px solid var(--primary)";
    setResult();
    const span = document.querySelector(".error");
    span.remove();
  } else {
    setError();
  }
});

function limitNumber(element, maxDigit) {
  if (element.value.length > maxDigit) {
    element.value = element.value.slice(0, maxDigit);
  }
}

function setResult() {
  if (bill && tip && numberPeople) {
    const amount = (bill * tip) / numberPeople;
    const total = (bill + bill * tip) / numberPeople;
    tipAmount.innerText = `$${amount.toFixed(2)}`;
    tipTotal.innerText = `$${total.toFixed(2)}`;

    resetBtn.id = "reset-btn";
    validReset = true;
  }
}

function setError() {
  if (numberPeopleInput.value !== "") {
    const span = document.createElement("span");
    span.classList.add("error");
    span.innerText = "Can't be zero";
    error0.appendChild(span);
    numberPeopleInput.style.border = "3px solid red";
  }
}

resetBtn.addEventListener("click", () => {
  if (validReset) {
    bill = 0;
    tip = 0;
    numberPeople = 0;
    tipAmount.innerText = "$0.00";
    tipTotal.innerText = "$0.00";
    billInput.value = "";
    for (let i of buttons) {
      i.id = "";
    }
    customTipInput.value = "";
    numberPeopleInput.value = "";
    resetBtn.id = "";
  }

  validReset = false;
});
