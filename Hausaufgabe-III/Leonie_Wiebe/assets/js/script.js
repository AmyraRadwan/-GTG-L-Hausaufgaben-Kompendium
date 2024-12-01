// 1. Speichern der Google Sheets-ID
const sheetID = "1CiU8dVXT5Vx17mQAT7Kk_k8BAaBr4wonbGpVRfjs4fM";

// 2. Erstellen der Basis-URL
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

// 3. Definieren des spezifischen Sheets
const sheetName = "Stundenlohn";

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

			// appendValues(getCell(0, 6));

			// appendValues(getRows(0, 7));

			appendValues(mergeColumns([0, 1, 4]));

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

// Helper-Funktion, die mehrere Columns in einen Array schreibt, übergeben wird ein Array mit columns z.B. [1, 2, 3]
function mergeColumns(columns = []) {
	var res = new Array();
	for (i = 0; i < columns.length; i++) {
		res.push([].concat.apply([], getColumn(columns[i])));
	}
	return res;
}

// Helper-Funktion, die mehrere Rows in einen Array schreibt, übergeben wird ein Array mit rows z.B. [1, 2, 3]
function mergeRows(rows = []) {
	var res = new Array();
	for (i = 0; i < rows.length; i++) {
		res.push([].concat.apply([], getRows(rows[i])));
	}
	return res;
}

// Helper-Funktion, die einen Array von values an ein Objekt (default = "output") anhängt. Dabei werden die Objekte zeilenweise an eine wrapperClass (default = "wrapper") angehängt.
function appendValues(values = [], appendToObj = "output", wrapperClass = "wrapper") {
	const outputElement = document.getElementById(appendToObj);
	const dimensions = [values.length, values[0].length];

	if (dimensions[0] > 1) {
		for (let i = 0; i < dimensions[1]; i++) {
			const wrapper = document.createElement("div");
			wrapper.classList.add(wrapperClass);

			// Flexbox: Elemente in Spalten anordnen
			wrapper.style.display = "flex";
			wrapper.style.flexDirection = "column"; // Bilder in eigene Zeile
			wrapper.style.gap = "10px"; // Abstand zwischen Text und Bildern

			// Abstand nach links (2 cm)
			wrapper.style.marginLeft = "20px"; // 2 cm Abstand vom linken Rand
			// Zeilenabstand vergrößern
			wrapper.style.marginBottom = "20px"; // Abstand zwischen den Zeilen

			for (let j = 0; j < dimensions[0]; j++) {
				if (j === 1) {
					// Zahleninhalt
					const elem = document.createElement("div");
					elem.classList.add("c" + (j + 1));
					elem.style.fontSize = "16px"; // Einheitliche Schriftgröße für Zahlen
					elem.style.color = "red"; // Schriftfarbe auf Rot setzen
					elem.style.fontFamily = "monospace"; // Schriftart auf Arial setzen
					elem.innerText = values[j][i];
					// Abstand zur linken Seite für die Zahl
					elem.style.marginLeft = "60px"; // 2 cm Abstand vom linken Rand
					wrapper.appendChild(elem);
				} else if (j === 0) {
					// Namen größer darstellen
					const elem = document.createElement("div");
					elem.classList.add("c" + (j + 1));
					elem.style.fontSize = "24px"; // Größere Schriftgröße für Namen
					elem.style.color = "red"; // Schriftfarbe auf Rot setzen
					elem.style.fontFamily = "Arial, sans-serif"; // Schriftart auf Arial setzen
					elem.innerText = values[j][i];
					// Abstand zur linken Seite für den Namen
					elem.style.marginLeft = "60px"; // 2 cm Abstand vom linken Rand
					wrapper.appendChild(elem);
				} else if (j === 2) {
					// Bilder in eigene Zeile
					const imgRow = document.createElement("div");
					imgRow.style.display = "flex"; // Bilder horizontal ausrichten
					imgRow.style.justifyContent = "start"; // Bilder links ausrichten
					imgRow.style.gap = "5px"; // Abstand zwischen Bildern

					// Abstand zur linken Seite für die Bilder
					imgRow.style.marginLeft = "80px"; // 2 cm Abstand vom linken Rand

					// Zusätzlicher Abstand nach den Bildern
					imgRow.style.marginBottom = "30px"; // Abstand zur nächsten Zeile

					// Erstelle die Bilder und füge sie mit Animation hinzu
					for (let k = 0; k < Math.round(values[j][i]); k++) {
						const img = document.createElement("img");
						img.setAttribute("src", "/Hausaufgabe-III/Leonie_Wiebe/assets/img/Cashier.png");
						img.classList.add("cashier");
						img.style.width = "50px"; // Bildbreite
						img.style.height = "auto"; // Automatische Höhe
						img.style.opacity = "0"; // Anfangs unsichtbar
						img.style.transform = "translateX(-20px)"; // Startposition links

						// Füge das Bild hinzu, aber mit Verzögerung
						imgRow.appendChild(img);

						// Verzögerung und Animation hinzufügen
						setTimeout(() => {
							img.style.opacity = "1"; // Bild sichtbar machen
							img.style.transform = "translateX(0)"; // Bild nach rechts bewegen
						}, k * 300); // Verzögerung von 0.3 Sekunden für jedes Bild
					}

					wrapper.appendChild(imgRow); // Bilderzeile zum Wrapper hinzufügen
				}
			}

			outputElement.appendChild(wrapper);
		}
	} else {
		for (let i = 0; i < dimensions[1]; i++) {
			const wrapper = document.createElement("div");
			wrapper.classList.add(wrapperClass);
			wrapper.style.display = "flex";
			wrapper.style.flexDirection = "column"; // Elemente in Spalten anordnen
			wrapper.style.gap = "10px"; // Abstand zwischen Text und Bildern
			wrapper.style.marginBottom = "20px"; // Abstand zwischen den Zeilen

			// Abstand zur linken Seite für den Wrapper
			wrapper.style.marginLeft = "10px"; // 2 cm Abstand vom linken Rand

			const elem = document.createElement("div");
			elem.classList.add("c1");
			elem.innerText = values[0][i];
			elem.style.fontSize = "24px"; // Größere Schriftgröße für Namen
			elem.style.color = "red"; // Schriftfarbe auf Rot setzen
			elem.style.fontFamily = "Arial, sans-serif"; // Schriftart auf Arial setzen
			// Abstand zur linken Seite für den Namen
			elem.style.marginLeft = "10px"; // 2 cm Abstand vom linken Rand
			wrapper.appendChild(elem);

			outputElement.appendChild(wrapper);
		}
	}
}
