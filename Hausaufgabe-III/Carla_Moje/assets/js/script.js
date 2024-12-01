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
							// 23. Wolkendecke mit GIF’s anzeigen
							if (value === "Arlo Guthrie") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/ArloGuthrie.jpg" alt="Arlo Guthrie" /></div>`;
							} else if (value === "Bert Sommer") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/BertSommer.jpg" alt="Bert Sommer" /></div>`;
							} else if (value === "Blood, Sweat & Tears") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/BloodSweatTears-1967.jpg.webp" alt="Bllod, Sweat & Tears" /></div>`;
							} else if (value === "Canned Heat") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/CannedHeat.jpeg" alt="Canned" /></div>`;
							} else if (value === "Country Joe & The Fish") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/countryjoeandthefish2.jpg" alt="Country Joe & The Fish" /></div>`;
							} else if (value === "Country Joe Mc Donald") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/CountryJoeMcDonald.webp" alt="Country Joe Mc Donald" /></div>`;
							} else if (value === "Creedence Clearwater Revival") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/CreedenceClearwaterRevival.webp" alt="Creedence Clearwater Revival" /></div>`;
							} else if (value === "Crosby, Still, Nash & Young") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/Crosby_Stills_Nash_and_Young_1970.JPG" alt="Crosby, Stills, Nash & Young" /></div>`;
							} else if (value === "Janis Joplin") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/janis-joplin.webp" alt="Janis Joplin" /></div>`;
							} else if (value === "Jefferson Airplane") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/Jefferson_Airplane.jpg" alt="Jefferson Airplane" /></div>`;
							} else if (value === "Jimi Hendrix") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/JimiHendix.jpg" alt="Jimi Hendrix" /></div>`;
							} else if (value === "Joan Baez Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/JoanBaezBand.jpg" alt="Joan Baez Band" /></div>`;
							} else if (value === "Joe Cocker & The Grease Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/JoeCockerAndTheGreaseBand.webp" alt="Joe Cocker & The Grease Band" /></div>`;
							} else if (value === "John B. Sebastian") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/John_Sebastian.jpg" alt="John B. Sebastian" /></div>`;
							} else if (value === "Johnny Winter") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/johnnywinter.jpg" alt="Johnny Winter" /></div>`;
							} else if (value === "Keef Hartley Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/Keef_Hartley_band.jpeg" alt="Keef Hartley Band" /></div>`;
							} else if (value === "Melanie Safka") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/Melanie-Safka.jpg" alt="Melanie Safka" /></div>`;
							} else if (value === "Mountain") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/Mountain.jpg" alt="Mountain" /></div>`;
							} else if (value === "Paul Butterfield Blues Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/Paul_Butterfield_Blues_Band.jpg" alt="Paul Butterfield Blues Band" /></div>`;
							} else if (value === "Quill") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/Quill.jpg" alt="Quill" /></div>`;
							} else if (value === "Richie Havens") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/Richie_Havens.jpg" alt="Richie Havens" /></div>`;
							} else if (value === "Santana") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/Santana.jpg" alt="Santana" /></div>`;
							} else if (value === "Sha Na Na") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/shanana.jpg" alt="Sha Na Na" /></div>`;
							} else if (value === "Sly & The Family Stone") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/slyandthefamilystone.jpg" alt="Sly & The Family Stone" /></div>`;
							} else if (value === "Sweetwater") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/Sweetwater.jpg" alt="Sweetwater" /></div>`;
							} else if (value === "Ten Years After") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/TenYearsAfter.jpg" alt="Ten Years After" /></div>`;
							} else if (value === "The Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/TheBand.jpg" alt="The Band" /></div>`;
							} else if (value === "The Grateful Dead") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/the-grateful-dead-164111.jpg" alt="The Grateful Dead" /></div>`;
							} else if (value === "The Incredible String Band") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/TheIncredibleStringBand.jpg" alt="The Incredible String Band" /></div>`;
							} else if (value === "The Who") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/TheWho.jpg.webp" alt="The Who" /></div>`;
							} else if (value === "Tim Hardin") {
								return `<div class="image"><img src="/Hausaufgabe-III/Carla_Moje/assets/img/TimHardin.jpg" alt="Tim Hardin" /></div>`;
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

		const image = document.querySelectorAll(".image");
		image.forEach((image) => {
			const delay = Math.random() * 3 + "s";
			const duration = Math.random() * 2 + 1 + "s";

			image.style.animationDelay = delay;
			image.style.animationDuration = duration;
		});
		//26. Fehlerbehandlung
	} else {
		console.error("Keine Daten verfügbar.");
	}
}

/*
// Helper-Funktion, die eine bestimmte Zeile getted (row = Zeilennummer)
function getRow(row) {
	return [Object.values(data[row])];
}

// Helper-Funktion, die bestimmte Zeilen getted (rowStart = Zeilennummer Start, sonst 0; rowEnd = Zeilennummer Ende, sonst alle Zeilen)
function getRows(rowStart = 0, rowEnd = data.length) {
	var res = []
	for (i = rowStart; i < rowEnd; i++) {
		res.push([].concat.apply([], getRow(i)));
	}
	console.log(res);
	return res;
}

function getColumn(column) {
	var res = data.map(function(value,index) { return Object.values(value)[column]; });
	return [res];
}

// Helper-Funktion, die bestimmte Spalten getted (columnStart = Spaltennummer Start, sonst 0; columnEnd = Sapltennummer Ende, sonst alle Spalten)
function getColumns(columnStart = 0, columnEnd = Object.values(data[0]).length) {
	var res = new Array();
	for (i = columnStart; i < columnEnd; i++) {
		res.push([].concat.apply([],getColumn(i)));
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
	for(i = 0; i < columns.length; i++){
		res.push([].concat.apply([], getColumn(columns[i])));	
	}
	return res;
}

// Helper-Funktion, die mehrere Rows in einen Array schreibt, übergeben wird ein Array mit rows z.B. [1, 2, 3]
function mergeRows(rows = []) {
	var res = new Array();
	for(i = 0; i < rows.length; i++){
		res.push([].concat.apply([], getRows(rows[i])));	
	}
	return res;
}

// Helper-Funktion, die einen Array von values an ein Objekt (default = "output") anhängt. Dabei werden die Objekte zeilenweise an eine wrapperClass (default = "wrapper") angehängt.
function appendValues(values = [], appendToObj = "output", wrapperClass = "wrapper") {
	const outputElement = document.getElementById(appendToObj);
	var dimensions = [ values.length, values[0].length ];
	if(dimensions[0] > 1) {
		for(i = 0; i < dimensions[1]; i++) {
			var wrapper = document.createElement("div");
			wrapper.classList.add(wrapperClass);
			for(j = 0; j < dimensions[0]; j++) {
				var elem = document.createElement("div");
				elem.classList.add(j+1);
				elem.innerText = values[j][i];
				wrapper.appendChild(elem);	
			}
			outputElement.appendChild(wrapper);
		}
	} else {
		for(i = 0; i < dimensions[1]; i++) {
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
*/
