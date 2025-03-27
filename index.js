document.getElementById('weather_id_button').onclick = closeWeather;
document.getElementById('calendar_id_button').onclick = closeCalendar;

function closeWeather() {
    //const block = document.getElementById('weather_block_div'); // замените на ваш id блока
    //block.style.display = (block.style.display === 'none' || block.style.display === '') ? 'inline-block' : 'none';

    const button = document.getElementById('weather_id_button');
    const block = document.getElementById('weather_block_div');
    button.addEventListener('click', function () {
        block.style.display = (block.style.display === 'none' || block.style.display === '') ? 'inline-block' : 'none';
    });
};

function closeCalendar() {
    //const block = document.getElementById('calendar_block_div');
    //block.style.display = (block.style.display === 'none' || block.style.display === '') ? 'inline-block' : 'none';

    const button = document.getElementById('calendar_id_button');
    const block = document.getElementById('calendar_block_div');
    button.addEventListener('click', function () {
        block.style.display = (block.style.display === 'none' || block.style.display === '') ? 'inline-block' : 'none';
    });
}; 