const countries = {
    'UTC': 'Tempo Universal (UTC)',
    'America/Sao_Paulo': 'São Paulo, Brasil',
    'America/Belem': 'Belém, Brasil',
    'America/Fortaleza': 'Fortaleza, Brasil',
    'America/Recife': 'Recife, Brasil',
    'America/Bahia': 'Salvador, Brasil',
    'America/Campo_Grande': 'Campo Grande, Brasil',
    'America/Cuiaba': 'Cuiabá, Brasil',
    'America/Porto_Velho': 'Porto Velho, Brasil',
    'America/Manaus': 'Manaus, Brasil',
    'America/Rio_Branco': 'Rio Branco, Brasil',
    'America/Argentina/Buenos_Aires': 'Buenos Aires, Argentina',
    'America/Santiago': 'Santiago, Chile',
    'America/Lima': 'Lima, Peru',
    'America/Bogota': 'Bogotá, Colômbia',
    'America/Caracas': 'Caracas, Venezuela',
    'America/Mexico_City': 'Cidade do México, México',
    'America/New_York': 'Nova York, EUA',
    'America/Los_Angeles': 'Los Angeles, EUA',
    'America/Chicago': 'Chicago, EUA',
    'America/Denver': 'Denver, EUA',
    'America/Phoenix': 'Phoenix, EUA',
    'America/Vancouver': 'Vancouver, Canadá',
    'America/Toronto': 'Toronto, Canadá',
    'America/Halifax': 'Halifax, Canadá',
    'Europe/London': 'Londres, Reino Unido',
    'Europe/Dublin': 'Dublin, Irlanda',
    'Europe/Paris': 'Paris, França',
    'Europe/Berlin': 'Berlim, Alemanha',
    'Europe/Madrid': 'Madri, Espanha',
    'Europe/Rome': 'Roma, Itália',
    'Europe/Moscow': 'Moscou, Rússia',
    'Europe/Lisbon': 'Lisboa, Portugal',
    'Europe/Amsterdam': 'Amsterdã, Holanda',
    'Europe/Zurich': 'Zurique, Suíça',
    'Europe/Prague': 'Praga, República Tcheca',
    'Europe/Istanbul': 'Istambul, Turquia',
    'Europe/Athens': 'Atenas, Grécia',
    'Africa/Johannesburg': 'Joanesburgo, África do Sul',
    'Africa/Cairo': 'Cairo, Egito',
    'Africa/Lagos': 'Lagos, Nigéria',
    'Asia/Tokyo': 'Tóquio, Japão',
    'Asia/Shanghai': 'Xangai, China',
    'Asia/Hong_Kong': 'Hong Kong, China',
    'Asia/Singapore': 'Singapura',
    'Asia/Bangkok': 'Bangkok, Tailândia',
    'Asia/Dubai': 'Dubai, Emirados Árabes',
    'Asia/Kolkata': 'Mumbai, Índia',
    'Asia/Seoul': 'Seul, Coreia do Sul',
    'Asia/Jakarta': 'Jacarta, Indonésia',
    'Asia/Kuala_Lumpur': 'Kuala Lumpur, Malásia',
    'Asia/Manila': 'Manila, Filipinas',
    'Australia/Sydney': 'Sydney, Austrália',
    'Australia/Melbourne': 'Melbourne, Austrália',
    'Australia/Perth': 'Perth, Austrália',
    'Pacific/Auckland': 'Auckland, Nova Zelândia',
    'Pacific/Honolulu': 'Honolulu, Havaí',
    'Pacific/Fiji': 'Fiji',
    'Pacific/Tahiti': 'Taiti, Polinésia Francesa',
    'Pacific/Guam': 'Guam',
    'Pacific/Port_Moresby': 'Port Moresby, Papua-Nova Guiné'
};

function populateSelect() {
    const select = document.getElementById('city-select');
    select.innerHTML = '';
    let userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let found = false;
    for (const [zone, city] of Object.entries(countries)) {
        const option = document.createElement('option');
        option.value = zone;
        option.textContent = city;
        if (zone === userTimeZone) {
            option.selected = true;
            found = true;
        }
        select.appendChild(option);
    }
    // Se não encontrar o fuso do usuário, mantém o primeiro como padrão
    if (!found) select.selectedIndex = 0;
}

function updateSingleClock() {
    const select = document.getElementById('city-select');
    const zone = select.value;
    const city = countries[zone];
    const { time, date } = getTimeAndDateByZone(zone);
    const clockElement = document.getElementById('single-clock');
    clockElement.innerHTML = `
        <h2>${city}</h2>
        <div class="time">${time}</div>
        <div class="date">${date}</div>
    `;
}

function getTimeAndDateByZone(zone) {
    const now = new Date();
    const timeOptions = { 
        timeZone: zone, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    };
    const dateOptions = { 
        timeZone: zone, 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    };
    const time = new Intl.DateTimeFormat('pt-BR', timeOptions).format(now);
    const date = new Intl.DateTimeFormat('pt-BR', dateOptions).format(now);
    return { time, date };
}

document.addEventListener('DOMContentLoaded', () => {
    populateSelect();
    updateSingleClock();
    document.getElementById('city-select').addEventListener('change', updateSingleClock);
    setInterval(updateSingleClock, 1000);
});