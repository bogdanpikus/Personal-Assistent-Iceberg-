
fetch(`https://api.timezonedb.com/v2.1/list-time-zone?key=33HI2NV7AI8H&format=json`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status}`);
        }
        return response.json();
    })
    .catch(error => {
        console.log('ERROR:', error)
    })

    .then(data => {
    //    let ContryName = data.zones[332].zoneName;

      //  let end = Date.now();
      // let now = new Date(end);
      //  let nowDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      //  let textDay = nowDay[now.getDay()];

        setInterval(() => {
            let ContryName = data.zones[332].zoneName;

            let end = Date.now();
            let now = new Date(end);
            let nowDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            let textDay = nowDay[now.getDay()];
            let localtime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
            let nowDate = `${textDay} ${localtime}`;
            return document.getElementById("time_block_div").innerHTML = `<p>${ContryName}</p>
            <p>${nowDate}</p>`;
        }, 1000);

    //    let localtime = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`; 
    //    let nowDate = `${textDay} ${localtime}`;

       // let time_block = document.getElementById("time_block_div");
       // time_block.innerHTML = `
       // <p>${ContryName}</p>
       // <p>${setInt}</p>
       // `;
       // time_block.style.display = "block";

        console.log(data);
    }); 