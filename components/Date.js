let endDate = Date.now();
let nowDate = new Date(endDate);
let options = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
};

let date = nowDate.toLocaleString("uk-UA", options);

document.getElementById("dateBlock").innerHTML =
    `<p>${date}</p>`;

let season = nowDate.getMonth(); // 3
let Img_SeasonChange = document.getElementById('date_block_div');
//если мес€ц от 0 до 3 => ебашим задний фон такой, если от 4 до 7 - такой и тд
// скорее всего оптимизирую с помощью массива либо задействую switch
let urlImage = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu2d5yiu73B4N7qqOCGM9Sfh2vGEl8VOWeSw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu2d5yiu73B4N7qqOCGM9Sfh2vGEl8VOWeSw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu2d5yiu73B4N7qqOCGM9Sfh2vGEl8VOWeSw&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs5y_xClyj0Rc0jtOc-jjGYck7WnvxsQi24Q&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs5y_xClyj0Rc0jtOc-jjGYck7WnvxsQi24Q&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXEhaKhTBArzNOeNrRHuVM0GBgpQrHhcsla0pOPX9fE3VLcKz6KsTQJGrynRmGhWzTsI&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXEhaKhTBArzNOeNrRHuVM0GBgpQrHhcsla0pOPX9fE3VLcKz6KsTQJGrynRmGhWzTsI&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXEhaKhTBArzNOeNrRHuVM0GBgpQrHhcsla0pOPX9fE3VLcKz6KsTQJGrynRmGhWzTsI&usqp=CAU',
    'https://i0.wp.com/dotsandbrackets.com/wp-content/uploads/2023/09/autumn.jpg?resize=1400%2C800&ssl=1',
    'https://i0.wp.com/dotsandbrackets.com/wp-content/uploads/2023/09/autumn.jpg?resize=1400%2C800&ssl=1',
    'https://i0.wp.com/dotsandbrackets.com/wp-content/uploads/2023/09/autumn.jpg?resize=1400%2C800&ssl=1',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu2d5yiu73B4N7qqOCGM9Sfh2vGEl8VOWeSw&s'];
function ChangeImageDate(season) {
 //   if ((season >= 0 && season <= 2) || season == 11) {
 //       Img_SeasonChange.style.background = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu2d5yiu73B4N7qqOCGM9Sfh2vGEl8VOWeSw&s) center';
 //   } else if (season > 2 && season <= 4) {
 //       Img_SeasonChange.style.background = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs5y_xClyj0Rc0jtOc-jjGYck7WnvxsQi24Q&s) center';
 //   } else if (season > 4 && season <= 7){
 //       Img_SeasonChange.style.background = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMXEhaKhTBArzNOeNrRHuVM0GBgpQrHhcsla0pOPX9fE3VLcKz6KsTQJGrynRmGhWzTsI&usqp=CAU) center';
 //   } else if (season > 7 && season <= 10) {
 //       Img_SeasonChange.style.background = 'url(https://i0.wp.com/dotsandbrackets.com/wp-content/uploads/2023/09/autumn.jpg?resize=1400%2C800&ssl=1) center';
 //  }
    Img_SeasonChange.style.background = `url(${urlImage[season]}) center`;
};
ChangeImageDate(season);

console.log(season);