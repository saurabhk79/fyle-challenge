// for activating the popover
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

document.addEventListener("DOMContentLoaded", function () {
  const grossIncome = document.getElementById("gross-income");
  const extraIncome = document.getElementById("extra-income");
  const ageGroup = document.getElementById("age-group");
  const deduction = document.getElementById("deduction");
  const submit = document.getElementById("submit");

  let showOK = true;

  grossIncome.addEventListener("input", function (event) {
    if (!/^\d+$/.test(event.target.value))
      grossIncome.classList.add("is-invalid");
    else grossIncome.classList.remove("is-invalid");
  });

  extraIncome.addEventListener("input", function (event) {
    if (!/^\d+$/.test(event.target.value))
      extraIncome.classList.add("is-invalid");
    else extraIncome.classList.remove("is-invalid");
  });

  deduction.addEventListener("input", function (event) {
    if (!/^\d+$/.test(event.target.value))
      deduction.classList.add("is-invalid");
    else deduction.classList.remove("is-invalid");
  });

  submit.addEventListener("submit", function (e) {
    e.preventDefault();

    if (showOK) {
      document.getElementById("modalBtn").textContent = "Submit";
      document
        .getElementById("modalBtn")
        .setAttribute("data-bs-toggle", "modal");
      showOK = false;
      return;
    }

    document.getElementById("total-income").textContent =
      getTotalTax() * 100000;
  });

  function getTotalTax() {
    let deductionOnAge = 0;

    switch (ageGroup.value) {
      case "A":
        deductionOnAge = 0.3;
        break;
      case "B":
        deductionOnAge = 0.4;
        break;
      case "C":
        deductionOnAge = 0.1;
        break;
      default:
        deductionOnAge = 1;
    }

    if (parseFloat(grossIncome.value) <= 8) deductionOnAge = 1;

    const gross = parseFloat(grossIncome.value) || 0;
    const extras = parseFloat(extraIncome.value) || 0;
    const ded = parseFloat(deduction.value) || 0;

    return deductionOnAge * (gross + extras - ded);
  }
});
