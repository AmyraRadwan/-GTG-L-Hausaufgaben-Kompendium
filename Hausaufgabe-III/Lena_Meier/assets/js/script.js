// 1. Speichern der Google Sheets-ID
const sheetID = "1zuX0M1kgYamvY1KNkxqj1azSYxrREwUD";

// 2. Erstellen der Basis-URL
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

// 3. Definieren des spezifischen Sheets
const sheetName = "SongtextSchnipsel";

// 4. Erstellen einer SQL-ähnlichen Abfrage
const query = encodeURIComponent("Select *");

// 5. Zusammensetzen der vollständigen URL
const url = `${base}&sheet=${sheetName}&tq=${query}`;

// 6. Vorbereiten von Array zur Datenspeicherung
let data = [];

// 7. Abrufen der Daten mit fetch
fetch(url)
	// 8. Antwort in Text umwandeln
	.then((res) => res.text())

	// 9. Weiterverarbeitung der Antwort
	.then((rep) => {
		try {
			// 10. JSON-Daten extrahieren und parsen
			const jsData = JSON.parse(rep.substr(47).slice(0, -2));

			//console.log(jsData);

			// 11. Spaltennamen sammeln
			const colz = [];
			jsData.table.cols.forEach((heading) => {
				if (heading.label) {
					colz.push(heading.label.toLowerCase().replace(/\s/g, ""));
				}
			});

			// 12. Zeilen verarbeiten und in das data-Array laden
			for (let i = 1; i < jsData.table.rows.length; i++) {
				const main = jsData.table.rows[i];
				const row = {};

				colz.forEach((ele, ind) => {
					row[ele] = main.c[ind] != null ? main.c[ind].v : "";
				});

				data.push(row);
			}

			// 13. Weiterverarbeitung mit getData

			//appendValues(getCell(0, 0));

			//appendValues(getRows(0, 1));

			appendValues(getColumns(0, 1));
			getData();

			// 14. Fehlerbehandlung für JSON-Parsing
		} catch (error) {
			console.error("Error parsing data:", error);
		}
	})
	// 15. Fehlerbehandlung für den Abruf der Daten
	.catch((error) => {
		console.error("Fetch error:", error);
	});

// Helper-Funktion, die eine bestimmte Zeile getted (row = Zeilennummer)
function getRow(row) {
	return [Object.values(data[row])];
}

// Helper-Funktion, die bestimmte Zeilen getted (rowStart = Zeilennummer Start, sonst 0; rowEnd = Zeilennummer Ende, sonst alle Zeilen)
function getRows(rowStart = 0, rowEnd = data.length) {
	var res = [];
	for (i = rowStart; i < rowEnd; i++) {
		res.push([].concat.apply([], getRow(i)));
	}
	console.log(res);
	return res;
}

function getColumn(column) {
	var res = data.map(function (value, index) {
		return Object.values(value)[column];
	});
	return [res];
}

// Helper-Funktion, die bestimmte Spalten getted (columnStart = Spaltennummer Start, sonst 0; columnEnd = Sapltennummer Ende, sonst alle Spalten)
function getColumns(columnStart = 0, columnEnd = Object.values(data[0]).length) {
	var res = new Array();
	for (i = columnStart; i < columnEnd; i++) {
		res.push([].concat.apply([], getColumn(i)));
	}
	console.log(res);
	return res;
}

// Helper-Funktion, die eine bestimmte Zelle getted (row = Zeile, column = Spalte)
function getCell(row, column) {
	return [[getRow(row)[0][column]]];
}

// Helper-Funktion, die einen Array von values an ein Objekt (default = "output") anhängt. Dabei werden die Objekte zeilenweise an eine wrapperClass (default = "wrapper") angehängt.
function appendValues(values = [], appendToObj = "output", wrapperClass = "wrapper") {
	const outputElement = document.getElementById(appendToObj);
	var dimensions = [values.length, values[0].length];
	if (dimensions[0] > 1) {
		for (i = 0; i < dimensions[1]; i++) {
			var wrapper = document.createElement("div");
			wrapper.classList.add(wrapperClass);
			for (j = 0; j < dimensions[0]; j++) {
				var elem = document.createElement("div");
				elem.classList.add(j + 1);
				elem.innerText = values[j][i];
				wrapper.appendChild(elem);
			}
			outputElement.appendChild(wrapper);
		}
	} else {
		for (i = 0; i < dimensions[1]; i++) {
			var wrapper = document.createElement("div");
			wrapper.classList.add(wrapperClass);
			var elem = document.createElement("div");
			elem.classList.add(1);
			elem.innerText = values[0][i];
			wrapper.appendChild(elem);
			outputElement.appendChild(wrapper);
		}
	}
}
function getData() {
	if (data.length > 0) {
		// 17. HTML-Element für die Ausgabe finden
		const outputElement = document.getElementById("output");

		// 18. Erstellen von HTML-Elementen für jede Datenzeile
		const rows = data
			.map((row) => {
				// 19. Erstellen von Zellen für jede Spalte
				return (
					`<div class="row">` +
					Object.values(row)
						.map((value, index) => {
							// 20. Uhrzeit in Emojis umwandeln (Spalte 2)
							if (index === 1) {
								const hour = parseInt(value.split(":")[0], 10);
								switch (hour) {
									case 0:
										return `<div class="cell">🕛</div>`;
									case 1:
										return `<div class="cell">🕐</div>`;
									case 2:
										return `<div class="cell">🕑</div>`;
									case 3:
										return `<div class="cell">🕒</div>`;
									case 4:
										return `<div class="cell">🕓</div>`;
									case 5:
										return `<div class="cell">🕔</div>`;
									case 6:
										return `<div class="cell">🕕</div>`;
									case 7:
										return `<div class="cell">🕖</div>`;
									case 8:
										return `<div class="cell">🕗</div>`;
									case 9:
										return `<div class="cell">🕘</div>`;
									case 10:
										return `<div class="cell">🕙</div>`;
									case 11:
										return `<div class="cell">🕚</div>`;
									case 12:
										return `<div class="cell">🕛</div>`;
									case 13:
										return `<div class="cell">🕐</div>`;
									case 14:
										return `<div class="cell">🕑</div>`;
									case 15:
										return `<div class="cell">🕒</div>`;
									case 16:
										return `<div class="cell">🕓</div>`;
									case 17:
										return `<div class="cell">🕔</div>`;
									case 18:
										return `<div class="cell">🕕</div>`;
									case 19:
										return `<div class="cell">🕖</div>`;
									case 20:
										return `<div class="cell">🕗</div>`;
									case 21:
										return `<div class="cell">🕘</div>`;
									case 22:
										return `<div class="cell">🕙</div>`;
									case 23:
										return `<div class="cell">🕚</div>`;
									default:
										return `<div class="cell">${value}</div>`;
								}
							}

							// 21. Windgeschwindigkeit in Emojis übersetzen (Spalte 4)
							if (index === 5) {
								const windSpeed = parseFloat(value);
								if (windSpeed >= 0 && windSpeed <= 3) {
									return `<div class="cell">🍃</div>`;
								} else if (windSpeed > 3 && windSpeed <= 7) {
									return `<div class="cell">🌬️</div>`;
								} else if (windSpeed > 7 && windSpeed <= 12) {
									return `<div class="cell">💨</div>`;
								} else if (windSpeed > 12 && windSpeed <= 17) {
									return `<div class="cell">🌀</div>`;
								} else if (windSpeed > 17) {
									return `<div class="cell">🌪️</div>`;
								}
							}

							// 22. Windrichtung in Emojis umwandeln (Spalte 5)
							if (index === 6) {
								switch (value) {
									case "N":
										return `<div class="cell">⬆️</div>`;
									case "O":
										return `<div class="cell">➡️</div>`;
									case "S":
										return `<div class="cell">⬇️</div>`;
									case "W":
										return `<div class="cell">⬅️</div>`;
									case "SO":
										return `<div class="cell">↘️</div>`;
									case "SW":
										return `<div class="cell">↙️</div>`;
									case "NW":
										return `<div class="cell">↖️</div>`;
									case "NO":
										return `<div class="cell">↗️</div>`;
									default:
										return `<div class="cell">${value}</div>`;
								}
							}

							// 23. Wolkendecke mit GIF’s anzeigen
							if (value === "Arlo Guthrie") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/ArloGuthrie.jpg" alt="Mostly Cloudy" /></div>`;
							} else if (value === "Bert Sommer") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Bert Sommer.jpg" alt="Partly Cloudy" /></div>`;
							} else if (value === "Blood, Sweat & Tears") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/BloodSweatTears-1967.jpg.webp" alt="Overcast" /></div>`;
							} else if (value === "Canned Heat") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Canned Heat.jpeg" alt="Thunderstorm with Rain" /></div>`;
							} else if (value === "Showers of Rain") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/rain.webp" alt="Showers of Rain" /></div>`;
							} else if (value === "Jefferson Airplane") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Jefferson_Airplane.jpg" alt="Partly cloudy, mostly cloudy" /></div>`;
							} else if (value === "Mostly clear") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/mostly-clear.webp" alt="Mostly Clear" /></div>`;
							} else if (value === "Santana") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Santana.jpg" alt="Fog" /></div>`;
							} else if (value === "Joe Cocker & The Grease Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Joe-Cocker and The Grease Band .webp" alt="Drizzle with Fog" /></div>`;
							} else if (value === "Melanie Safka") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Melanie-Safka.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Paul Butterfield Blues Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Paul_Butterfield_Blues_Band.jpg" alt="Clear" /></div>`;
							} else if (value === "Richie Havens") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Richie_Havens.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Creedence Clearwater Revival") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Creedence Clearwater Revival.webp" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Country Joe & The Fish") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/countryjoeandthefish2.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Crosby, Stills, Nash & Young") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/janis-joplin.webp" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Janis Joplin") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/janis-joplin.webp" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Country Joe Mc Donald") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Country Joe Mc Donald.webp" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Jimi Hendrix") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Jimi Hendix.jpg" /></div>`;
							} else if (value === "Joan Baez Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Joan Baez Band.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "John B. Sebastian") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/John_Sebastian.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Keef Hartley Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Keef_Hartley_band.jpeg" /></div>`;
							} else if (value === "Mountain") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Mountain.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Johnny Winter") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/johnny winter.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Quill") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Quill.jpg" /></div>`;
							} else if (value === "Sha Na Na") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/sha na na.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Sly & The Family Stone") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/sly and the family stone.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Sweetwater") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Sweetwater.jpg" /></div>`;
							} else if (value === "Sha Na Na") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/sha na na.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "Ten Years After") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Ten Years After.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "The Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/The Band.jpg" /></div>`;
							} else if (value === "The Grateful Dead") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/The Incredible String Band.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "The Incredible String Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/The Incredible String Band.jpg" alt="Showers of Light Rain" /></div>`;
							} else if (value === "The Who") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/The Who.jpg.webp" /></div>`;
							} else if (value === "Tim Hardin") {
								return `<div class="image"><img src="/Hausaufgabe-III/Lena_Meier/assets/img/Tim Hardin.jpg" /></div>`;
							}
							return `<div class="image">${value}</div>`;
						})

						.join("") +
					`</div>`
				);
			})
			.join("");

		// 24. Ausgabe der Daten in HTML-Struktur
		outputElement.innerHTML = `<div class="grid">${rows}</div>`;

		// 25. Zufallsanimation – Jede Zelle (cell) wird animiert
		const cells = document.querySelectorAll(".cell");
		cells.forEach((cell) => {
			const delay = Math.random() * 3 + "s";
			const duration = Math.random() * 2 + 1 + "s";

			cell.style.animationDelay = delay;
			cell.style.animationDuration = duration;
		});
		const image = document.querySelectorAll(".cell");
		cells.forEach((image) => {
			const delay = Math.random() * 3 + "s";
			const duration = Math.random() * 2 + 1 + "s";

			cell.style.animationDelay = delay;
			cell.style.animationDuration = duration;
		});
		//26. Fehlerbehandlung
	} else {
		console.error("Keine Daten verfügbar.");
	}
}
