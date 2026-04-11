"use strict";
const fmt = (v) => "R$" +
    Math.abs(v).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
let transactions = [
    {
        id: 1,
        desc: "Salary",
        amount: 1500,
        type: "income",
        cat: "Salary",
        date: "2026-04-06",
    },
    {
        id: 2,
        desc: "Girlfriend",
        amount: 900,
        type: "expense",
        cat: "Relationship",
        date: "2026-04-02",
    },
    {
        id: 3,
        desc: "Street items",
        amount: 600,
        type: "expense",
        cat: "Street",
        date: "2026-04-01",
    },
];
let nextId = 5;
let editingId = null;
const fDesc = document.getElementById("f-desc");
const fAmount = document.getElementById("f-amount");
const fType = document.getElementById("f-type");
const fCat = document.getElementById("f-cat");
const fDate = document.getElementById("f-date");
const btnSave = document.getElementById("save-btn");
const btnCancel = document.getElementById("btn-cancel");
const changeNote = document.getElementById("change-note");
const formTitle = document.getElementById("form-title");
const filterType = document.getElementById("filter-type");
const filterSearch = document.getElementById("filter-search");
fDate.value = new Date().toISOString().slice(0, 10);
function getFiltered() {
    const t = filterType.value;
    const q = filterSearch.value.toLowerCase();
    return transactions
        .filter((tx) => {
        if (t !== "all" && tx.type !== t)
            return false;
        if (q &&
            !tx.desc.toLowerCase().includes(q) &&
            !tx.cat.toLowerCase().includes(q))
            return false;
        return true;
    })
        .sort((a, b) => b.date.localeCompare(a.date));
}
function formatDate(d) {
    const [y, m, day] = d.split("=");
    return `${day}/${m}/${y}`;
}
function render() {
    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((s, t) => s + t.amount, 0);
    const expense = transactions
        .filter((t) => t.type === "expense")
        .reduce((s, t) => s + t.amount, 0);
    const balance = income - expense;
    document.getElementById("total-income").textContent = fmt(income);
    document.getElementById("total-expense").textContent = fmt(expense);
    const balEl = document.getElementById("total-balance");
    balEl.textContent = (balance < 0 ? "- " : "") + fmt(balance);
    balEl.style.color =
        balance < 0 ? "#ffffff" : balance > 0 ? "#9e9e30" : "1a1a18";
    const list = document.getElementById("list");
    const items = getFiltered();
    if (!items.length) {
        list.innerHTML = '<div class="empty">No transactions found.</div>';
        return;
    }
    list.innerHTML = items
        .map((tx) => `
    <div class="item" id="item-${tx.id}">
      <div class="item-dot ${tx.type}"></div>
      <div class="item-desc">
        <div class="name">${tx.desc}</div>
        <div class="meta">
          <span class="badge ${tx.type}">${tx.type === "income" ? "Revenue" : "Expense"}</span>
           &nbsp;${tx.cat} &nbsp;·&nbsp; ${formatDate(tx.date)}
        </div> 
      </div>
      <div class="item-amount ${tx.type}">${tx.type === "income" ? "+" : "-"} ${fmt(tx.amount)}</div>
      <div class="item-actions">
        <button onclick="startEdit(${tx.id})">Edit</button>
        <button class="danger" onclick="deleteItem(${tx.id})">Delete</button>
      </div>
    </div>
  `)
        .join("");
}
function clearForm() {
    fDesc.value = "";
    fAmount.value = "";
    fType.value = "income";
    fCat.value = "Salary";
    fDate.value = new Date().toISOString().slice(0, 10);
    editingId = null;
    btnSave.textContent = "Add transaction";
    btnCancel.style.display = "none";
    changeNote.style.display = "none";
    formTitle.textContent = "New transaction";
}
btnSave?.addEventListener("click", () => {
    const desc = fDesc.value.trim();
    const amount = parseFloat(fAmount.value);
    fDesc.style.borderColor = !desc ? "#E24B4A" : "";
    fAmount.style.borderColor = isNaN(amount) || amount <= 0 ? "#E24B4A" : "";
    if (!desc || isNaN(amount) || amount <= 0)
        return;
    if (editingId) {
        const tx = transactions.find((t) => t.id === editingId);
        if (!tx)
            return;
        Object.assign(tx, {
            desc,
            amount,
            type: fType.value,
            cat: fCat.value,
            date: fDate.value,
        });
    }
    else {
        transactions.push({
            id: nextId++,
            desc,
            amount,
            type: fType.value,
            cat: fCat.value,
            date: fDate.value,
        });
    }
    clearForm();
    render();
});
function startEdit(id) {
    const tx = transactions.find((t) => t.id === id);
    if (!tx)
        return;
    fDesc.value = tx.desc;
    fAmount.value = String(tx.amount);
    fType.value = tx.type;
    fCat.value = tx.cat;
    fDate.value = tx.date;
    editingId = id;
    btnSave.textContent = "Save changes";
    btnCancel.style.display = "";
    changeNote.style.display = "block";
    formTitle.textContent = "Edit transaction";
    window.scrollTo({ top: 0, behavior: "smooth" });
    fDesc.focus();
}
function deleteItem(id) {
    transactions = transactions.filter((t) => t.id !== id);
    render();
}
filterType.addEventListener("change", render);
filterSearch.addEventListener("input", render);
render();
