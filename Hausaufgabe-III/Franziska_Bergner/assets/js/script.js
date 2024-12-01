// 1. Speichern der Google Sheets-ID
const sheetID = "1zuX0M1kgYamvY1KNkxqj1azSYxrREwUD";

// 2. Erstellen der Basis-URL
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

// 3. Definieren des spezifischen Sheets
const sheetName = "ZeitplanGagen";

// 4. Erstellen einer SQL-ähnlichen Abfrage
const query = encodeURIComponent("Select *");

// 5. Zusammensetzen der vollständigen URL
const url = `${base}&sheet=${sheetName}&tq=${query}`;

// 6. Vorbereiten von Array zur Datenspeicherung
let data = [];

// 7. Abrufen der Daten mit fetch
fetch(url)
  .then((res) => res.text())
  .then((rep) => {
    try {
      // 10. JSON-Daten extrahieren und parsen
      const jsData = JSON.parse(rep.substr(47).slice(0, -2));

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

        // Überprüfen, ob der Wert in der 8. Spalte (index 7) "M" ist und durch das männliche Symbol ersetzt werden muss
        if (row.diversität === "M") {
          row.diversität = "♂"; // Hier wird das "M" durch das männliche Symbol ersetzt
        }

		if (row.diversität === "W") {
			row.diversität = "♀"; // Hier wird das "W" durch das weibliche Symbol ersetzt
		  }

		  if (row.diversität === "Mixed") {
			row.diversität = "♀♂"; // Hier wird das "W und M" durch das weibliche und männliche Symbol ersetzt
		  }
	



        data.push(row);
      }

      // 13. Weiterverarbeitung mit getData
      appendValues(mergeColumns([0, 6, 7]));

    } catch (error) {
      console.error("Error parsing data:", error);
    }
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

// Helper-Funktion, die mehrere Columns in einen Array schreibt, übergeben wird ein Array mit columns z.B. [1, 2, 3]
function mergeColumns(columns = []) {
  var res = new Array();
  for (i = 0; i < columns.length; i++) {
    res.push([].concat.apply([], getColumn(columns[i])));
  }
  return res;
}

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
  var res = data.map(function(value, index) {
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
        elem.classList.add("cell" + (j + 1));
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

