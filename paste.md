#Codigo funcional sin busqueda 

##JavaScript
```bash
const API_URL = 'https://games-details.p.rapidapi.com/search?sugg=fifa';
const API_HEADERS = {
  "x-rapidapi-host": "games-details.p.rapidapi.com",
  "x-rapidapi-key": "d097b328e2mshfea2dec0fd47b6fp1a423bjsne2e3fab1d353"
};
document.addEventListener('DOMContentLoaded', () => {
  const content = document.getElementById('content');
  const loader = document.getElementById('loader');

  fetch(API_URL, { headers: API_HEADERS })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta completa:', data); // Ver toda la respuesta
    loader.style.display = 'none';
    const games = Array.isArray(data.data?.search) ? data.data.search.slice(0, 5) : [];
    console.log('Juegos encontrados:', games); // Ver los juegos individuales
    renderCards(games);
  })
  .catch(error => {
    loader.innerHTML = `<p class="text-danger">Error al cargar los datos: ${error}</p>`;
  });

  function renderCards(items) {
    const row = document.createElement('div');
    row.className = 'row g-4 justify-content-center';

    if (!items.length) {
      row.innerHTML = '<p class="text-center text-muted">No se encontraron juegos.</p>';
    }

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
    content.appendChild(row);
  }
});

```
##HTML
```bash
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Galería API Demo</title>
    <link rel="stylesheet" href="./public/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <header class="bg-primary text-white text-center py-4 shadow-sm">
        <h1>Galeria de Juegos</h1>
        <p class="lead">Consumo dinámico de API con Bootstrap 5</p>
    </header>
    <main class="container my-5" id="content">

        <!-- Aquí se insertarán las tarjetas dinámicamente -->
        <div id="loader" class="text-center my-5">
            <div class="spinner-border text-primary" role="status"></div>
            <p>Cargando datos...</p>
        </div>
    </main>
    <footer class="bg-dark text-white text-center py-3 mt-auto">
        <small>Desarrollado por WillyBarrios &copy; 2025-08-06</small>
    </footer>
    <script src="./public/js/bootstrap.bundle.min.js"></script>
    <script src="script.js"></script>
</body>

</html>
```
##CSS

```bash
body {
  background: #f8f9fa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main.container {
  flex: 1 1 0;
}

.card-custom {
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  background: #fff;
}

.card-custom:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 8px 24px rgba(33, 37, 41, 0.15);
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0d6efd;
}

.card-text {
  color: #495057;
}

footer {
  letter-spacing: 1px;
}

@media (max-width: 576px) {
  .card-title {
    font-size: 1rem;
  }
}
```