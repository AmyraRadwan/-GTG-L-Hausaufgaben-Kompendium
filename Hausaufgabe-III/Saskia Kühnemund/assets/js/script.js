// 1. Speichern der Google Sheets-ID
const sheetID = "1FKFDfRKQaBSchRH0qrVfKG02GFc9UAUF";

// 2. Erstellen der Basis-URL
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

// 3. Definieren des spezifischen Sheets
const sheetName = "ZeitplanGagen";

// 4. Erstellen einer SQL-ähnlichen Abfrage
const query = encodeURIComponent("Select *");

// 5. Zusammensetzen der vollständigen URL
const url = `${base}&sheet=${sheetName}&tq=${query}`;

// 6. Vorbereiten von Arrays zur Datenspeicherung
let data = [];
let colz = [];

// 7. Abrufen der Daten mit fetch
fetch(url)
	.then((res) => res.text())
	.then((rep) => {
		try {
			const jsData = JSON.parse(rep.substr(47).slice(0, -2));

			// Spaltennamen sammeln
			jsData.table.cols.forEach((heading) => {
				if (heading.label) {
					colz.push(heading.label.toLowerCase().replace(/\s/g, ""));
				}
			});

			// Zeilen verarbeiten und in das data-Array laden
			jsData.table.rows.forEach((main) => {
				const row = {};
				colz.forEach((ele, ind) => {
					row[ele] = main.c[ind] != null ? main.c[ind].v : "";
				});
				data.push(row);
			});

			// Weiterverarbeitung mit getData
			getData();
		} catch (error) {
			console.error("Error parsing data:", error);
		}
	})
	.catch((error) => {
		console.error("Fetch error:", error);
	});

// 16. Funktionsbeginn und Überprüfung auf verfügbare Daten
function getData() {
	if (data.length > 0) {
		// 17. HTML-Element für die Ausgabe finden
		const outputElement = document.getElementById("output");

		// 18. Erstellen von HTML-Spalten
		const columns = colz
			.map((colName, colIndex) => {
				// Spaltenname hinzufügen
				const columnContent =
					`<h3>${colName}</h3>` +
					data
						.map((row, rowIndex) => {
							const value = row[colName];
							let cellContent;

							// Angepasste Inhalte für spezielle Spalten
							if (colIndex === 4) {
								cellContent = parseFloat(value).toFixed(2);
							} else if (colIndex === 5 || colIndex === 6) {
								cellContent = Math.round(parseFloat(value));
							} else {
								cellContent = value;
							}
							if (colIndex === 6 || colIndex === 0) {
								const Stundenlohn = parseFloat(value);
								if (Stundenlohn >= 15000 && Stundenlohn <= 20000) {
									return `<div class="topverdiener">${value}</div>`;
								}
								if (Stundenlohn >= 10000 && Stundenlohn <= 15000) {
									return `<div class="cell"><img src="/Hausaufgabe-III/Saskia Kühnemund/assets/img/clear.webp" alt="Clear" /></div>`;
								}
							}

							if (colIndex === 1 || colIndex === 2 || colIndex === 3) {
								return;
							}

							return `<div class="cell c${colIndex + 1}">${cellContent}</div>`;
						})
						.join("");

				return `<div class="column c${colIndex + 1}">${columnContent}</div>`;
			})
			.join("");

		// 24. Ausgabe der Daten in HTML-Struktur
		outputElement.innerHTML = `<div class="grid">${columns}</div>`;

		// 25. Zufallsanimation für jede Zelle
		const cells = document.querySelectorAll(".cell");
		cells.forEach((cell) => {
			const delay = Math.random() * 3 + "s";
			const duration = Math.random() * 2 + 1 + "s";
			cell.style.animationDelay = delay;
			cell.style.animationDuration = duration;
		});

		const sdl = document.querySelectorAll(".topverdiener");
		sdl.forEach((topverdiener) => {
			const delay = Math.random() * 2 + "s";
			const duration = Math.random() * 2 + 1 + "s";
			topverdiener.style.animationDelay = delay;
			topverdiener.style.animationDuration = duration;
		});

		//26. Fehlerbehandlung
	} else {
		console.error("Keine Daten verfügbar.");
	}
}
