let endDate = Date.now();
let nowDate = new Date(endDate);
let options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
};

let date = nowDate.toLocaleString("uk-UA", options);

document.getElementById("date_block_div").innerHTML =
    `<p>${date}</p>`;

console.log(nowDate.toLocaleString());