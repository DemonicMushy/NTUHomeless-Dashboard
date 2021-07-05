var XLSX = require("xlsx");
var fs = require("fs");

var dataStructure = require("./dataStructure");

/* equivalent to `var wb = XLSX.readFile("sheetjs.xlsx");` */
var buf = fs.readFileSync("Hashed.xlsx");
var wb = XLSX.read(buf, { type: "buffer" });

var first_sheet_name = wb.SheetNames[0];
var worksheet = wb.Sheets[first_sheet_name];

// console.log(worksheet)
// console.log(worksheet["!ref"].slice(4));

var rows = parseInt(worksheet["!ref"].slice(4));
console.log(rows);

var total = { approved: {}, not_approved: {} };

dataStructure.forEach((element) => {
  total.approved[element.question] = {};
  total.not_approved[element.question] = {};
  total.num_approved = 0;
  total.num_not_approved = 0;
  element.options.forEach((element2) => {
    total.approved[element.question][`${element2}`] = 0;
    total.not_approved[element.question][`${element2}`] = 0;
  });
});

for (var i = 1; i <= rows; i++) {
  var flag = true;
  dataStructure.forEach((element) => {
    var letter = element.id;
    var cell = `${letter}${i}`;
    // console.log(worksheet[cell])

    switch (worksheet[`J${i}`]["w"]) {
      case "Allocated": {
        if (flag) {
          total.num_approved += 1;
          flag = false;
        }
        element.options.forEach((element2) => {
          if (worksheet[cell] && element2 === worksheet[cell]["w"]) {
            total.approved[element.question][element2] += 1;
          }
        });
        break;
      }
      case "Allocated (Processing)": {
        if (flag) {
          total.num_approved += 1;
          flag = false;
        }
        element.options.forEach((element2) => {
          if (worksheet[cell] && element2 === worksheet[cell]["w"]) {
            total.approved[element.question][element2] += 1;
          }
        });
        break;
      }
      case "Not Allocated": {
        if (flag) {
          total.num_not_approved += 1;
          flag = false;
        }
        element.options.forEach((element2) => {
          if (worksheet[cell] && element2 === worksheet[cell]["w"]) {
            total.not_approved[element.question][element2] += 1;
          }
        });
        break;
      }
      case "Not Allocated (Received Wait-list email)": {
        if (flag) {
          total.num_not_approved += 1;
          flag = false;
        }
        element.options.forEach((element2) => {
          if (worksheet[cell] && element2 === worksheet[cell]["w"]) {
            total.not_approved[element.question][element2] += 1;
          }
        });
        break;
      }
      case "Recipient of OCH email on 2nd Jul 2021 1530H": {
        if (flag) {
          total.num_not_approved += 1;
          flag = false;
        }
        element.options.forEach((element2) => {
          if (worksheet[cell] && element2 === worksheet[cell]["w"]) {
            total.not_approved[element.question][element2] += 1;
          }
        });
        break;
      }
      case "Recipient of OCH email on 2nd Jul 2021 1630H": {
        if (flag) {
          total.num_not_approved += 1;
          flag = false;
        }
        element.options.forEach((element2) => {
          if (worksheet[cell] && element2 === worksheet[cell]["w"]) {
            total.not_approved[element.question][element2] += 1;
          }
        });
        break;
      }
      default: {
      }
    }
  });
}

console.log(total);

module.exports = total;
