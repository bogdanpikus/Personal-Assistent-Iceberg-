const weather_block = document.getElementById('weather_block_div');

document.getElementById('weather_id_button').addEventListener('click', function () {
    weather_block.style.display = (weather_block.style.display === 'none' || weather_block.style.display === '') ? 'inline-block' : 'none';
});

const calendar_block = document.getElementById('calendar_block_div');
document.getElementById('calendar_id_button').addEventListener('click', function () {
    calendar_block.style.display = (calendar_block.style.display === 'none' || calendar_block.style.display === '') ? 'inline-block' : 'none';
});