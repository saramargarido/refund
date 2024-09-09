// seleciona os elentos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

// captura o evento de input para formatar o valor
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, '')

  // transforma o valor em centavos:
  value =  Number(value) / 100

  amount.value = formatCurrencyBRL(value)
}

// Formata o valor no padrão BRL
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  })

  return value
}

// captura o submit do form para obter os valores
form.onsubmit = (event) => {
  event.preventDefault()
  
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()
  }

  expenseAdd(newExpense)
}

//adiciona um ítem na lista
function expenseAdd(newExpense) {
  try {
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense
    
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.toUpperCase().replace("R$", "")}`

    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    expenseInfo.append(expenseName, expenseCategory)
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
    expenseList.append(expenseItem)

    formClear()

    updateTotals()
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesa")
    console.log(error)
  }
}

//atualiza os totais

function updateTotals() {
  try {
    const items = expenseList.children

    expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    let total = 0

    for(let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(',', '.')

      value = parseFloat(value)

      if(isNaN(value)) {
        return alert("Não foi possível calcular o total. O valor não parece ser um número")
      }

      total += Number(value)
    }

    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    expensesTotal.innerHTML = ""

    expensesTotal.append(symbolBRL, total)
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesa")
    console.log(error)
  }
}

// evento que captura o clique nos items da lista
expenseList.addEventListener("click", function(event) {
  if(event.target.classList.contains("remove-icon")) {
    const item = event.target.closest(".expense")
    item.remove()
  }

  updateTotals()
})

function formClear() {
  expense.value = ""
  category.value = ""
  amount.value = ""

  expense.focus()
}