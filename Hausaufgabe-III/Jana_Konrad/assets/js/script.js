// 1. Speichern der Google Sheets-ID
const sheetID = "1zuX0M1kgYamvY1KNkxqj1azSYxrREwUD";

// 2. Erstellen der Basis-URL
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

// 3. Definieren des spezifischen Sheets
const sheetName = "Wetter";

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

// 16. Funktionsbeginn und Überprüfung auf verfügbare Daten
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
							if (index === 2) {
								const grad = parseFloat(value);
								if (grad >= 0 && grad <= 25) {
									return `<div class="kühl">.</div>`;
								} else if (grad > 25 && grad <= 27) {
									return `<div class="mittel">.</div>`;
								} else if (grad > 27 && grad <= 28) {
									return `<div class="warm">.</div>`;
								} else if (grad > 28 && grad <= 30) {
									return `<div class="mittelwarm">.</div>`;
								} else if (grad > 30 && grad <= 31) {
									return `<div class="heiß">.</div>`;
								} else if (grad > 34) {
									return `<div class="extrem">.</div>`;
								}
							}

							// 21. Windgeschwindigkeit in Emojis übersetzen (Spalte 4)
							if (index === 5) {
								const windSpeed = parseFloat(value);
								if (windSpeed >= 0 && windSpeed <= 3) {
									return `<div class="wind">calm</div>`;
								} else if (windSpeed > 3 && windSpeed <= 7) {
									return `<div class="wind">light air</div>`;
								} else if (windSpeed > 7 && windSpeed <= 12) {
									return `<div class="wind">light breeze</div>`;
								} else if (windSpeed > 12 && windSpeed <= 17) {
									return `<div class="wind">gentle breeze</div>`;
								} else if (windSpeed > 17) {
									return `<div class="wind">fresh breeze</div>`;
								}
							}

							// 22. Windrichtung in Emojis umwandeln (Spalte 5)
							if (index === 6) {
								switch (value) {
									case "N":
										return `<div class="cell">⛅️</div>`;
									case "O":
										return `<div class="cell">☀️</div>`;
									case "S":
										return `<div class="cell">🌥️</div>`;
									case "W":
										return `<div class="cell">✨</div>`;
									case "SO":
										return `<div class="cell">🫧</div>`;
									case "SW":
										return `<div class="cell">🫧</div>`;
									case "NW":
										return `<div class="cell">💧</div>`;
									case "NO":
										return `<div class="cell">☀️</div>`;
									default:
										return `<div class="cell">${value}</div>`;
								}
							}
						})
						.join("") +
					`</div>`
				);
			})
			.join("");

		// 24. Ausgabe der Daten in HTML-Struktur
		outputElement.innerHTML = `<div class="grid">${rows}</div>`;

		// // 25. Zufallsanimation – Jede Zelle (cell) wird animiert
		// const cells = document.querySelectorAll(".cell");
		// cells.forEach((cell) => {
		// 	const delay = Math.random() * 3 + "s";
		// 	const duration = Math.random() * 2 + 1 + "s";

		// 	cell.style.animationDelay = delay;
		// 	cell.style.animationDuration = duration;
		// });
		//26. Fehlerbehandlung
	} else {
		console.error("Keine Daten verfügbar.");
	}
}

var arrow = document.getElementById("up");

move(arrow, 0, window.innerWidth - 50, 10);

function move(elem, from, to, inc) {
	console.log("Moving from " + from + " to " + to);

	var left = from;

	function frame() {
		left = left + inc;
		elem.style.left = left + "px";
		if (left >= to) {
			clearInterval(id);
		}
	}

	var id = setInterval(frame, 1000 / 60);
}

//------------------------------------
//MOVE
//__________________________
// UP
//___________________________

var arrow1 = document.getElementById("up");

move1(arrow1, window.innerHeight - 50, 0, -5); // start at the bottom, move upwards

function move1(elem, from, to, inc) {
	console.log("Moving from " + from + " to " + to);

	var top = from;

	function frame() {
		top += inc;

		if (top <= to) {
			// Reset position to start from the bottom again
			top = from;
		}

		elem.style.top = top + "px";
	}

	setInterval(frame, 1000 / 20); // Run at 60 frames per second
}
// //__________________________
// // DOWN
// //___________________________

var arrow2 = document.getElementById("down");

move2(arrow2, 0, window.innerHeight - 50, 5); // start at the top, move downwards

function move2(elem, from, to, inc) {
	console.log("Moving from " + from + " to " + to);

	var top = from;

	function frame() {
		top += inc;

		if (top >= to) {
			// Reset position to start from the top again
			top = from;
		}

		elem.style.top = top + "px";
	}

	setInterval(frame, 1000 / 20); // Run at 60 frames per second
}
// //__________________________
// // LEFT green
// //___________________________

var arrow3 = document.getElementById("left");

// Start from the end and move to the beginning in reverse
move3(arrow3, window.innerWidth - 50, 0, -10); // Use a negative increment to move left

function move3(elem, from, to, inc) {
	console.log("Moving from " + from + " to " + to);

	var left = from;

	function frame() {
		left += inc;

		// Reset position when it reaches the start
		if (left <= to) {
			left = from; // Reset to the starting position (end in this case)
		}

		elem.style.left = left + "px";
	}

	setInterval(frame, 1000 / 20); // Run at 20 frames per second
}

// //__________________________
// // RIGHT red
// //___________________________

var arrow4 = document.getElementById("right");

move4(arrow4, 0, window.innerWidth - 50, 10);

function move4(elem, from, to, inc) {
	console.log("Moving from " + from + " to " + to);

	var left = from;

	function frame() {
		left += inc;

		// Reset position when it reaches the end
		if (left >= to) {
			left = from; // Reset to starting position
		}

		elem.style.left = left + "px";
	}

	setInterval(frame, 1000 / 20); // Run at 60 frames per second
}
//-------------------------------------------------
