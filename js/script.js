/* globals getComputedStyle */

const tipCalculator = document.querySelector('.tip-calculator')
const tipAmountDiv = tipCalculator.querySelector('#tip-result')
const totalDiv = tipCalculator.querySelector('#total-result')
const reset = tipCalculator.querySelector('.btn[type="reset"]')

tipCalculator.addEventListener('input', e => {
  const billInput = tipCalculator.querySelector('#bill')
  const peopleInput = tipCalculator.querySelector('#people')
  const bill = parseFloat(tipCalculator.querySelector('#bill').value)

  reset.classList.add('active')

  if (e.target.matches('#custom-tip')) {
    const tips = Array.from(tipCalculator.querySelectorAll('.tip-btn'))
    tips.forEach(tip => {
      tip.checked = false
    })
  } else if (e.target.matches('.tip-btn')) {
    tipCalculator.querySelector('#custom-tip').value = ''
  }

  let tip
  if (!tipCalculator.querySelector('.tip-btn:checked') && !tipCalculator.querySelector('#custom-tip').value) {
    tip = 0
  } else if (tipCalculator.querySelector('#custom-tip').value) {
    tip = parseFloat(tipCalculator.querySelector('#custom-tip').value)
  } else {
    tip = tipCalculator.querySelector('.tip-btn:checked').value
  }
  const people = parseFloat(tipCalculator.querySelector('#people').value)

  if (bill && people) {
    const tipAmount = parseFloat(Math.round((bill * (tip / 100) / people) + 'e2') + 'e-2')
    const totalAmount = parseFloat(Math.round((bill / people + tipAmount) + 'e2') +
  'e-2')

    tipAmountDiv.textContent = tipAmount
    totalDiv.textContent = totalAmount
  }

  /* errors */

  const billInputParent = billInput.parentElement
  const billError = billInputParent.querySelector('.error')
  const billErrorColor = getComputedStyle(billError).color

  if (!bill) {
    billInput.style.outline = `0.125rem solid ${billErrorColor}`

    if (bill === 0) {
      billError.textContent = 'Can\'t be zero'
    } else {
      billError.textContent = 'Enter value'
    }
  } else {
    billInput.style.outline = 'none'
    billError.textContent = ''
  }

  const peopleInputParent = peopleInput.parentElement
  const peopleError = peopleInputParent.querySelector('.error')
  const peopleErrorColor = getComputedStyle(peopleError).color

  if (!people) {
    peopleInput.style.outline = `0.125rem solid ${peopleErrorColor}`

    if (people === 0) {
      peopleError.textContent = 'Can\'t be zero'
    } else {
      peopleError.textContent = 'Enter value'
    }
  } else {
    peopleInput.style.outline = 'none'
    peopleError.textContent = ''
  }
})

tipCalculator.addEventListener('reset', _ => {
  const errors = tipCalculator.querySelectorAll('.error')

  errors.forEach(error => {
    const parent = error.parentElement
    const input = parent.querySelector('input')

    input.style.outline = 'none'
    error.textContent = ''
  })
})
