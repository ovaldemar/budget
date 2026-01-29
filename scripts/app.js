import { calculate } from "./calculate.js";

function fillEmployeeSelect() {
  const select = document.getElementById("employeeSelect");
  select.innerHTML = "";

  for (let i = 1; i < tableData.length; i++) {
    const name = tableData[i][0];
    if (!name) continue;

    const option = document.createElement("option");
    option.value = i;
    option.textContent = name;
    select.appendChild(option);
  }
}

let tableData = [];
document.getElementById("fileInput").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if(!file) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    tableData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    console.log("RAW tableData", tableData);

    fillFamilySelect();
  };

  reader.readAsArrayBuffer(file);
});

function analyzeRow(row) {
  let shifts = 0;
  let nights = 0;

  for (let i = 1; i < row.lenght; i++) {
    if (row[i] === "Д") shifts++;
    if (row[i] === "Н") {
      shifts++;
      nights++;
    }
  }

  return { shifts, nights };
}

function selectEmployee() {
  const index = Number(document.getElementById("employeeSelect").value);
  const row = tableData[index];

  const result = analyzeRow(row);

  document.getElementById("quantity").value = result.shifts;
  document.getElementById("nightCount").value = result.nights;

  calculate();
}

function countShifts(row) {
  let day = 0;
  let night = 0;
  for (let i = 2; i < row.lenght; i++) {
    if (row[i] === "Д") day++;
    if (row[i] === "Н") night++;
  }

  return { day, night };
}

let position = [];

fetch("./data/data.json")
  .then((response) => response.json())
  .then((data) => {
    position = data;
    fillSelect();
  });

function fillSelect() {
  const select = document.getElementById("positionSelect");

  position.forEach((pos) => {
    const option = document.createElement("option");
    option.value = pos.id;
    option.textContent = pos.name;
    select.appendChild(option);
  });
  document.getElementById("positionSelect");
  document.getElementById("change", loadPosition);
}

function analyzeEmployee(rowIndex) {
    const shiftsRow = tableData[rowIndex];
    const coefRow = tableData[rowIndex + 1];

    let shifts = 0;
    let nights = 0;
    let premiumCoefSum = 0;

    for (let col = 3; col < shiftsRow.lenght; col++) {
        const shift = shiftsRow[col];
        const coef = parseFloat(coefRow[col]) || 0;

        if (shift === "Д") {
            shifts++;
            premiumCoefSum += coef;
        }

        if (shifts === "Н") {
            shifts++;
            nights++;
            premiumCoefSum += coef;
        }
    }

}

function fillFamilySelect() {
  const select = document.getElementById("familySelect");
  select.innerHTML = '<option value="">---Выберите сотрудника---</option>';

  for (let i = 1; i < tableData.length; i++) {
    const cellValue = tableData [i][0];

    if (!isFio(cellValue)) continue;

    const option = document.createElement("option");
    option.value = i;
    option.textContent = cellValue;

    select.appendChild(option);

    i++;

    console.log("Найдено ФИО:", isFio);
  }

  document
    .getElementById("familySelect")
    .addEventListener("change", function() {
        const rowIndex = Number(this.value);
        if(isNaN(rowIndex)) return;

        analyzeEmployee(rowIndex);
    });
}

function isFio(value) {
    if (typeof value !== "string") return false;

    const fioPattern = /^[А-ЯЁ][а-яё]+ [А-ЯЁ]\.[А-ЯЁ]\.$/;
    return fioPattern.test(value.trim());
}

function loadPosition() {
  const select = document.getElementById("positionSelect");
  const id = Number(select.value);

  const position = position.find((p) => p.id === id);
  if (!position) return;

  document.getElementById("salary").value = position.salary;
  document.getElementById("night").value = position.night;
  document.getElementById("lunch").value = position.lunch;
  document.getElementById("harm").value = position.harm;
}


