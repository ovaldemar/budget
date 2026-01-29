export function calculate() {

    const salary = Number(document.getElementById("salary").value);

    const premium = salary;

    const nightPrice = Number(document.getElementById("nightPrice").value);

    const shifts = Number(document.getElementById("quantity").value);

    const nights = Number(night.value);
    
    const lunchPrice = Number(document.getElementById("lunch").value);

    const base = shifts * (salary + premium);

    const nightTotal = nights * 7 * nightPrice;

    const lunchTotal = shifts * lunchPrice;

    const harm = (salary * shifts) * 0.04;

    const cash = base + nightTotal + lunchTotal + harm;

    document,getElementById("result").textContent = "Итого: " + Math.round(cash);
}