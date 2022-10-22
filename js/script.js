/* ==========
  VARIABLES
========== */

const tipCalculator = document.querySelector('.tip-calculator')
const tipAmountDiv = tipCalculator.querySelector('#tip-result')
const totalDiv = tipCalculator.querySelector('#total-result')
const reset = tipCalculator.querySelector('.btn[type="reset"]')

/* ==========
  FUNCTIONS
========== */
/**
 * Gets the selected tip value
 * @param {String} selector1 selector for element with tip value that can be selected
 * @param {String} selector2 selector for element with tip value that can be selected
 * @returns the number representig selected tip percentage, if no selection was made, zero is the value
 */
const getTip = (selector1, selector2) => {
  if (!document.querySelector(selector1) && !document.querySelector(selector2).value) return 0
  if (document.querySelector(selector2).value) return parseFloat(document.querySelector(selector2).value)
  return document.querySelector(selector1).value
}

/**
 * Calculates how much tip each person is to pay
 * @param {Number} bill total amount from which tip percentage is to be calculated
 * @param {Number} tip amount of tip selected
 * @param {Number} people number of people over which tip is split
 * @returns value of tip to be paid by each person
 */
const calculateTip = (bill, tip, people) => {
  return parseFloat(Math.round((bill * (tip / 100) / people) + 'e2') + 'e-2')
}

/**
 * Calculates total amount to be paid by each person
 * @param {Number} bill total amount to pay
 * @param {Number} people number of people over which payment is split
 * @param {Number} tipResult tip to be paid by each person
 * @returns value of total amount for each person to pay
 */
const calculateTotal = (bill, people, tipResult) => {
  return parseFloat(Math.round((bill / people + tipResult) + 'e2') +
  'e-2')
}

/**
 * Displays error if field value is invalid
 * @param {HTMLElement} field input filed of which value is to be checked
 */
const displayError = (field) => {
  const fieldValue = parseFloat(field.value)
  const parent = field.parentElement
  const error = parent.querySelector('.error')
  if (!fieldValue) {
    parent.classList.add('on-error')

    if (fieldValue === 0) {
      error.textContent = 'Can\'t be zero'
    } else {
      error.textContent = 'Enter number'
    }
  } else {
    parent.classList.remove('on-error')
    error.textContent = ''
  }
}

/* ==========
  EXECUTION
========== */

tipCalculator.addEventListener('input', e => {
  const billInput = tipCalculator.querySelector('#bill')
  const peopleInput = tipCalculator.querySelector('#people')
  const bill = parseFloat(tipCalculator.querySelector('#bill').value)
  const people = parseFloat(tipCalculator.querySelector('#people').value)

  if (e.target.closest('#custom-tip')) {
    const tips = Array.from(tipCalculator.querySelectorAll('.tip-btn'))
    tips.forEach(tip => {
      tip.checked = false
    })
  } else if (e.target.closest('.tip-btn')) {
    tipCalculator.querySelector('#custom-tip').value = ''
  }

  const tip = getTip('.tip-btn:checked', '#custom-tip')
  reset.classList.add('active')
  displayError(billInput)
  displayError(peopleInput)

  if (bill && people) {
    const tipAmount = calculateTip(bill, tip, people)
    const totalAmount = calculateTotal(bill, people, tipAmount)

    tipAmountDiv.innerHTML = `<p><span class="currency">$</span>${tipAmount}</p>`
    totalDiv.innerHTML = `<p><span class="currency">$</span>${totalAmount}</p>`
  }
})

tipCalculator.addEventListener('reset', _ => {
  const errors = tipCalculator.querySelectorAll('.error')

  errors.forEach(error => {
    const parent = error.parentElement
    const input = parent.querySelector('input')

    input.classList.remove('on-error')
    error.textContent = ''
    tipAmountDiv.innerHTML = '<p><span class="currency">$</span>0.00</p>'
    totalDiv.innerHTML = '<p><span class="currency">$</span>0.00</p>'
    reset.classList.remove('active')
  })
})
