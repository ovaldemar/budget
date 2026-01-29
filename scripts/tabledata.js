// export let tableData;

// let tableData = [];
// document.getElementById("fileInput").addEventListener("change", function (e) {
//   const file = e.target.files[0];
//   if(!file) return;

//   const reader = new FileReader();

//   reader.onload = function (event) {
//     const data = new Uint8Array(event.target.result);
//     const workbook = XLSX.read(data, { type: "array" });

//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     tableData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//     console.log("RAW tableData", tableData);

//     fillFamilySelect();
//   };

//   reader.readAsArrayBuffer(file);
// });