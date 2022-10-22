
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

    tipAmountDiv.innerHTML = `<p><span class="currency">$</span>${tipAmount}</p>`
    totalDiv.innerHTML = `<p><span class="currency">$</span>${totalAmount}</p>`
  }

  /* errors */

  const billInputParent = billInput.parentElement
  const billError = billInputParent.querySelector('.error')

  if (!bill) {
    billInput.classList.add('on-error')

    if (bill === 0) {
      billError.textContent = 'Can\'t be zero'
    } else {
      billError.textContent = 'Enter number'
    }
  } else {
    billInput.classList.remove('on-error')
    billError.textContent = ''
  }

  const peopleInputParent = peopleInput.parentElement
  const peopleError = peopleInputParent.querySelector('.error')

  if (!people) {
    peopleInput.classList.add('on-error')

    if (people === 0) {
      peopleError.textContent = 'Can\'t be zero'
    } else {
      peopleError.textContent = 'Enter number'
    }
  } else {
    peopleInput.classList.remove('on-error')
    peopleError.textContent = ''
  }
})

tipCalculator.addEventListener('reset', _ => {
  const errors = tipCalculator.querySelectorAll('.error')

  errors.forEach(error => {
    const parent = error.parentElement
    const input = parent.querySelector('input')

    input.classList.remove('on-error')
    error.textContent = ''
    tipAmountDiv.textContent = '$0.00'
    totalDiv.textContent = '$0.00'
    reset.classList.remove('active')
  })
})
