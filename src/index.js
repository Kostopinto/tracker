import _ from "lodash";
import "./style.scss";

const date = document.getElementById("date");
const totalSum = document.getElementById("total-sum");
const income = document.getElementById("income");
const expenses = document.getElementById("expenses");
const btnAddIncome = document.getElementById("btn-income");
const btnAddExpenses = document.getElementById("btn-expenses");
const incomeList = document.getElementById("main-income");
const expensesList = document.getElementById("main-expenses");
const description = document.getElementById("description");
const form = document.getElementById("form");
const cost = document.getElementById("value");
const incomeData = [];
const expensesData = [];

btnAddIncome.addEventListener("click", () => {
  addToList(incomeList, incomeData, income);
});

btnAddExpenses.addEventListener("click", () => {
  addToList(expensesList, expensesData, expenses);
});

incomeList.addEventListener("click", ({ target }) => {
  deleteItem(target, incomeList, incomeData, income);
});

expensesList.addEventListener("click", ({ target }) => {
  deleteItem(target, expensesList, expensesData, expenses);
});

function deleteItem(target, ul, list, lastNode) {
  if (target.classList.contains("delete")) {
    const index = +target.getAttribute("data-index");
    list.splice(index, 1);
    render(ul, list, lastNode);
  }
}
function addToList(ul, list, lastNode) {
  if (!description.value || !cost.value) return;
  list.push({
    desc: description.value,
    cost: +cost.value
  });
  form.reset();
  render(ul, list, lastNode);
}

function render(ul, list, lastNode) {
  const DOMList = list.map((el, i) => {
    return `<li>
    <div>${el.desc}</div>
    <div>${el.cost}</div>
    <button class="delete" data-index="${i}">X</button>
    </li>`;
  });
  renderTotal();
  renderLast(list[list.length - 1], lastNode);
  ul.innerHTML = DOMList.join("");
}
function renderLast(last, lastNode) {
  lastNode.innerHTML = last.cost;
}

function renderTotal() {
  const incomeSum = incomeData.reduce((sum, { cost }) => sum + cost, 0);
  const expensesSum = expensesData.reduce((sum, { cost }) => sum + cost, 0);
  const delta = incomeSum - expensesSum;
  totalSum.style.color = delta >= 0 ? "green" : "red";
  totalSum.innerHTML = delta;
}
renderTotal();
