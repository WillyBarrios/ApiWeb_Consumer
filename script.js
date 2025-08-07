const API_URL = 'https://games-details.p.rapidapi.com/search?sugg=overwatch';
const API_HEADERS = {
    "x-rapidapi-host": "games-details.p.rapidapi.com",
    "x-rapidapi-key": "d097b328e2mshfea2dec0fd47b6fp1a423bjsne2e3fab1d353"
};

let allGames = [];

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const cardsContainer = document.getElementById('cards-container');
    const searchInput = document.getElementById('searchInput');

    fetch(API_URL, { headers: API_HEADERS })
        .then(response => response.json())
        .then(data => {
            loader.style.display = 'none';
            allGames = Array.isArray(data.data?.search) ? data.data.search : [];
            renderCards(allGames);
        })
        .catch(error => {
            loader.innerHTML = `<p class="text-danger">Error al cargar los datos: ${error}</p>`;
        });

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filteredGames = allGames.filter(game =>
                (game.title || '').toLowerCase().includes(searchTerm)
            );
            renderCards(filteredGames);
        });
    }

    function renderCards(items) {
        cardsContainer.innerHTML = ""; // Limpia antes de renderizar
        if (!items.length) {
            cardsContainer.innerHTML = '<p class="text-center text-muted">No se encontraron juegos.</p>';
            return;
        }
        const row = document.createElement('div');
        row.className = 'row g-4 justify-content-center';

        items.forEach(item => {
            const col = document.createElement('div');
            col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch';

            col.innerHTML = `
        <div class="card card-custom w-100">
          <img src="${item.image || './public/img/placeholder.jpg'}" class="card-img-top" alt="${item.title}">
          <div class="card-body">
            <h5 class="card-title">${item.name || 'Sin título'}</h5>
            <p class="card-text">${item.price ? item.price.slice(0, 80) + '…' : 'Sin precio.'}</p>
            <p class="card-text"><small class="text-muted">ID: ${item.id || 'N/D'}</small></p>
          </div>
        </div>
      `;
            row.appendChild(col);
        });
        cardsContainer.appendChild(row);
    };

    function fetchGamesByQuery(query) {
        const url = `https://games-details.p.rapidapi.com/search?sugg=${encodeURIComponent(query)}`;
        fetch(url, { headers: API_HEADERS })
            .then(response => response.json())
            .then(data => {
                allGames = Array.isArray(data.data?.search) ? data.data.search : [];
                renderCards(allGames);
            })
            .catch(error => {
                cardsContainer.innerHTML = `<p class="text-danger">Error al cargar los datos: ${error}</p>`;
            });
    };
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm.length > 2) { // para no buscar con pocas letras
            fetchGamesByQuery(searchTerm);
        } else {
            // Si el campo está vacío, podrías mostrar los juegos populares o limpiar
            cardsContainer.innerHTML = '';
        }
    });
});

// Mostrar fecha dinámica en el footer con formato DD/MM/YYYY
document.addEventListener('DOMContentLoaded', () => {
  const dateSpan = document.getElementById('dynamic-date');
  if (dateSpan) {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth()+1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    dateSpan.textContent = formattedDate;
  }
});