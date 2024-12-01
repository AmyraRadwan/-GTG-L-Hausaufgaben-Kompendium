// 1. Speichern der Google Sheets-ID
const sheetID = "1AoXX912GIAVdgE5ty27RQB8U35rgkwdkBaF7Hi0bTEE";

// 2. Erstellen der Basis-URL
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;

// 3. Definieren des spezifischen Sheets
const sheetName = "2024";

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
              // 21. Bildschirmzeit in Emojis übersetzen (Spalte 4)
              if (index === 1) {
                const Bildschirmzeit = parseFloat(value);
                if (Bildschirmzeit >= 0 && Bildschirmzeit <= 2) {
                  return `<div class="cell">🟢</div>`;
                } else if (Bildschirmzeit > 2 && Bildschirmzeit <= 4) {
                  return `<div class="cell">🟡</div>`;
                } else if (Bildschirmzeit > 4 && Bildschirmzeit <= 8) {
                  return `<div class="cell">🔴</div>`;
                } else if (Bildschirmzeit > 8) {
                  return `<div class="sos">🆘</div>`;
                }
              }
              if (index === 2) {
                return;
              }

              // Mitteilungen in Emojis übersetzen
              if (index === 3) {
                const Mitteilungen = parseFloat(value);
                if (Mitteilungen >= 0 && Mitteilungen <= 50) {
                  return `<div class="cell">💌</div>`;
                } else if (Mitteilungen > 50 && Mitteilungen <= 75) {
                  return `<div class="cell">💌 💌</div>`;
                } else if (Mitteilungen > 75 && Mitteilungen <= 100) {
                  return `<div class="cell">💌 💌 💌</div>`;
                } else if (Mitteilungen > 100) {
                  return `<div class="cell">💌 💌 💌 💌</div>`;
                }
              }

              // Schritte in Emojis übersetzen
              if (index === 4) {
                const Schritte = parseFloat(value);
                if (Schritte >= 0 && Schritte <= 100) {
                  return `<div class="cell">👠</div>`;
                } else if (Schritte > 100 && Schritte <= 1000) {
                  return `<div class="cell">👠 👠</div>`;
                } else if (Schritte > 1000 && Schritte <= 3000) {
                  return `<div class="cell">👠 👠 👠</div>`;
                } else if (Schritte > 3000 && Schritte <= 5000) {
                  return `<div class="cell">👠 👠 👠 👠</div>`;
                } else if (Schritte > 5000 && Schritte <= 10000) {
                  return `<div class="cell">👠 👠 👠 👠</div>`;
                } else if (Schritte > 10000) {
                  //return `<div class="cell">👠 👠 👠 👠 👠</div>`;
                  return `<div class="cell"><img src="/assets/img/clear.webp" alt="Blaaaaa" /></div>`;
                }
              }
              if (index === 5) {
                return;
              }
              if (index === 6) {
                return;
              }

              return `<div class="cell">${value}</div>`;
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

    const bsz = document.querySelectorAll(".sos");
    bsz.forEach((sos) => {
      const delay = Math.random() * 3 + "s";
      const duration = Math.random() * 2 + 1 + "s";

      sos.style.animationDelay = delay;
      sos.style.animationDuration = duration;
    });

    //26. Fehlerbehandlung
  } else {
    console.error("Keine Daten verfügbar.");
  }
}
