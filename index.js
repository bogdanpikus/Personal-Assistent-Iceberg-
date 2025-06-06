const weather_block = document.getElementById('weather_block_div');
document.getElementById('weather_id_button').addEventListener('click', function () {
    weather_block.style.display = (weather_block.style.display === 'none' || weather_block.style.display === '') ? 'inline-block' : 'none';
});

const time_block = document.getElementById('time_block_div');
document.getElementById('time_id_button').addEventListener('click', function () {
    time_block.style.display = (time_block.style.display === 'none' || time_block.style.display === '') ? 'inline-block' : 'none';
});

const date_block = document.getElementById('date_block_div');
document.getElementById('date_id_button').addEventListener('click', function () {
    date_block.style.display = (date_block.style.display === 'none' || date_block.style.display === '') ? 'inline-block' : 'none';
});

const h1_block = document.getElementById('contener_h1_statistics');
document.getElementById('close_conteiner_h1').addEventListener('click', () => {
    h1_block.style.display = 'none';
});