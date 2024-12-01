console.log("Hello World");

document.addEventListener("DOMContentLoaded", function () {
	// 1. Wählt alle <textPath>-Elemente im Dokument aus und speichert sie in der Variable `textPaths`
	const textPaths = document.querySelectorAll("textPath");

	// 2. Wählt das erste <path>-Element im Dokument aus und speichert es in der Variable `path`
	const path = document.querySelector("path");

	// 3. Ermittelt die gesamte Länge des <path>-Pfades und speichert diesen Wert in `pathLength`
	const pathLength = path.getTotalLength();

	// 4. Initialisiert die `offset`-Variable, die die aktuelle Position der Schrift entlang des Pfades steuert
	let offset = 0;

	// 5. Fügt einen Event-Listener für das Scroll-Event hinzu
	window.addEventListener("scroll", function () {
		// 6. Erhöht den Offset-Wert, um eine Bewegung der Schrift zu simulieren,
		// basierend auf der vertikalen Scroll-Position (window.scrollY)
		offset += window.scrollY * 0.3;

		// 7. Geht durch jedes <textPath>-Element, um dessen individuelle Position entlang des Pfades zu aktualisieren
		textPaths.forEach(function (textPath) {
			// 8. Holt den Wert des `data-offset`-Attributs für das aktuelle <textPath>-Element
			const dataOffset = parseInt(textPath.getAttribute("data-offset"));

			// 9. Berechnet den neuen `startOffset`-Wert basierend auf dem Gesamtoffset und dem individuellen `data-offset`
			// Der `% pathLength` Teil sorgt dafür, dass der Offset-Wert innerhalb der Länge des Pfades bleibt
			const newOffset = (offset + dataOffset) % pathLength;

			// 10. Setzt das Attribut `startOffset` des aktuellen <textPath>-Elements auf den berechneten `newOffset`
			// Dadurch wird die Position des Textes entlang des Pfades aktualisiert
			textPath.setAttribute("startOffset", newOffset);
		});

		// 11. Setzt die Scroll-Position auf (0, 0) zurück, um eine endlose Bewegung zu ermöglichen,
		// da `offset` immer weiter erhöht wird, ohne dass die Scroll-Position des Fensters sich ändert
		window.scrollTo(0, 0);
	});
});