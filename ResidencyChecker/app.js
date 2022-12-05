let display = document.getElementById("result");
let text = document.getElementById("text-display");
let zipCodeField = document.getElementById("zipcode");
let PG_ZIP_CODES;
let PG_ZIP_ARRAY = [];

async function getZipCodes() {
  console.log("Gathering Zipcodes");
  const response = await fetch("./pg_zipcode.json");
  const zipCodes = await response.json();

  PG_ZIP_CODES = zipCodes.zipcode;

  for (prop in PG_ZIP_CODES) {
    PG_ZIP_ARRAY.push(PG_ZIP_CODES[prop]);
  }

  console.log(PG_ZIP_ARRAY);
}

getZipCodes();
function checkZip() {
  let zipCode = zipCodeField.value;

  let start = 0,
    end = PG_ZIP_ARRAY.length - 1;

  // Iterate while start not meets end
  while (start <= end) {
    // Find the mid index
    let mid = Math.floor((start + end) / 2);

    // If element is present at mid, return True
    if (PG_ZIP_ARRAY[mid].zipcode === zipCode) {
      text.innerHTML = `Client's zipcode is in ${PG_ZIP_ARRAY[mid].City}`;
      display.classList.add("res");
      display.classList.remove("non-res");
      return true;
    }

    // Else look in left or right half accordingly
    else if (PG_ZIP_ARRAY[mid].zipcode < zipCode) start = mid + 1;
    else end = mid - 1;
  }

    text.innerHTML = `Client is not a resident of Prince George's County`;
    display.classList.remove("res");
    display.classList.add("non-res");

  //   for (prop in PG_ZIP_ARRAY) {
  //     if (zipCode === PG_ZIP_ARRAY[prop].zipcode)
  //     {
  //       text.innerHTML = `Client's  is a resident of ${PG_ZIP_ARRAY[prop].City}`;
  //       display.classList.add("res");
  //       display.classList.remove("non-res");
  //     }
  //   }
}

function clearInput() {
  location.reload();
}
