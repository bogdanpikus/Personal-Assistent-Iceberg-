export function LocalTime() {
    let time = document.getElementById("time_block_div");
    let now = new Date();
    let hours = String(now.getHours()).padStart(2, '0');
    let minutes = String(now.getMinutes()).padStart(2, '0');
    let seconds = String(now.getSeconds()).padStart(2, '0');
    let localtime = `${hours}:${minutes}:${seconds}`;
    let nowDate = `${localtime}`;
    time.innerHTML = `<p class='nowDate'>${nowDate}</p>`;
    return { nowDate };
};
setInterval(() => { LocalTime(); }, 1000);