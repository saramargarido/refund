// seleciona os elentos do formulário
const amount = document.getElementById("amount")

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