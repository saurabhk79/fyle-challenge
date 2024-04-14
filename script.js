// for activating the popover
const popoverTriggerList = document.querySelectorAll(
  '[data-bs-toggle="popover"]'
);
const popoverList = [...popoverTriggerList].map(
  (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
);

document.addEventListener("DOMContentLoaded", function() {
    const grossIncome = document.getElementById("gross-income");
    const extraIncome = document.getElementById("extra-income");
    const ageGroup = document.getElementById("age-group"); // Corrected ID
    const deduction = document.getElementById("deduction");
    const submit = document.getElementById("submit");
  
    submit.addEventListener("submit", function(e) {
      e.preventDefault();
  
      document.getElementById("total-income").textContent = getTotalTax() * 100000;
    });
  
    function getTotalTax() {
      let deductionOnAge = 0;
  
      switch(ageGroup.value){
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
              deductionOnAge = 0;
      }
  
      if (parseFloat(grossIncome) <= 8) deductionOnAge = 1;

      const gross = parseFloat(grossIncome.value) || 0;
      const extras = parseFloat(extraIncome.value) || 0;
      const ded =  parseFloat(deduction.value) || 0

      console.log(gross, extras, ded)
  
      return (deductionOnAge * (gross + extras - ded));
    }
  });
  