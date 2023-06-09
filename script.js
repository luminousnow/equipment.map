// Функція для завантаження Google Sheets API
function loadGoogleSheetsAPI(callback) {
  var script = document.createElement("script");
  script.src = "https://apis.google.com/js/api.js";
  script.onload = callback;
  document.body.appendChild(script);
}

// Функція для ініціалізації Google Sheets API
function initGoogleSheetsAPI(callback) {
  gapi.load("client", function () {
    gapi.client
      .init({
        apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        discoveryDocs: [
          "https://sheets.googleapis.com/$discovery/rest?version=v4",
        ],
      })
      .then(callback);
  });
}

// Функція для отримання даних з Google Sheets
function getGoogleSheetsData(callback) {
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      range: "Sheet1!A2:D", // Змініть "Sheet1" на назву вашого аркуша, якщо це необхідно
    })
    .then(function (response) {
      var data = response.result.values;
      callback(data);
    });
}

// Функція для створення мапи та додавання маркерів
function createMap(data) {
  var map = L.map("map").setView([48.3794, 31.1656], 6); // Координати центру мапи (можете змінити на будь-які) та зум (6)

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // Прохід по даних з таблиці та додавання маркерів
  for (var i = 0; i < data.length; i++) {
    var city = data[i][0];
    var name = data[i][1];
    var latitude = parseFloat(data[i][2]);
    var longitude = parseFloat(data[i][3]);

    var marker = L.marker([latitude, longitude]).addTo(map);

    marker.bindPopup(city + " - " + name);
  }
}

// Завантажуємо Google Sheets API та ініціалізуємо його
loadGoogleSheetsAPI(function () {
  initGoogleSheetsAPI(function () {
    // Отримуємо дані з Google Sheets та створюємо мапу
    getGoogleSheetsData(function (data) {
      createMap(data);
    });
  });
});
