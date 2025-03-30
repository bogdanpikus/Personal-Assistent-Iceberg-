
fetch(`https://api.timezonedb.com/v2.1/list-time-zone?key=33HI2NV7AI8H&format=json&zone=Asia/Tokyo&fields=zoneName,gmtOffset`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.log('ERROR:',error)
    })

    .then(data => {
        let ContryName = data.zones.zoneName;
        let Time = data.zones.timestamp;

        let time_block = document.getElementById("time_block_div");
        time_block.innerHTML = `
        <p>${ContryName}</p>
        <p>${Time}</p>
        `;
        time_block.style.display = "block";

        console.log(ContryName);
        console.log(Time);
        console.log(data);
    }); 