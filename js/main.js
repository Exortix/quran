quran = []

function displaySurah() {
    document.title = quran[Number(document.getElementById('select').value)-1].name;
    document.getElementById('main').innerHTML = ``;
    document.getElementById('main').innerHTML += 
    `<div class="card">
    <div class="card-body"><h5 class="card-title">${quran[Number(document.getElementById('select').value)-1].name}</h5></div>
    </div>`;
    quran[Number(document.getElementById('select').value)-1].ayahs.forEach(e => {
        document.getElementById('main').innerHTML += 
        `<div class="card">
            <div class="card-body"><p class="card-text">${e.text}</p></div>
        </div>`;
    });
}

if (localStorage.getItem('quran') == true) {
    quran = JSON.parse(localStorage.getItem('quran')).data.surahs;
    quran.forEach(e => {
        document.getElementById('select').innerHTML += `<option value = '${e.number}'>${e.name}</option>`;
    });
    displaySurah();
}


$.ajax({
    method:'GET',
    url:'https://api.alquran.cloud/v1/quran/quran-uthmani',
    success:function (response) {
        quran = response.data.surahs;
        quran.forEach(e => {
            document.getElementById('select').innerHTML += `<option value = '${e.number}'>${e.name}</option>`;
        });
        localStorage.setItem('quran', JSON.stringify(response));
        displaySurah();
    },
    error:function (error) {
        quran = JSON.parse(localStorage.getItem('quran')).data.surahs;
        quran.forEach(e => {
            document.getElementById('select').innerHTML += `<option value = '${e.number}'>${e.name}</option>`;
        });
        displaySurah();
    }
});

$( "#select" ).change(function() {
    displaySurah();
});
