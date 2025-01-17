// Erstellt eine neue Timeline die in der Variable lt gespeichert ist
let tl = gsap.timeline({
	scrollTrigger: {
		// Neues scrollTrigger Objekt das von der Klasse "container"
		// getriggert wird, ganz am oberen Bilschirmrand startet und responsive da endet
		// wo die letzte Slide sein Ende hat
		trigger: ".container",
		start: "top top",
		end: () => "+=" + document.querySelector(".container").offsetHeight * 4,
		scrub: 1, // Verlangsamt die Animationen jeweils um 1 Sekunde
		pin: true, //  Die Elemente rasten alle nach der Animation an ihrer Position ein und scrollen mit
		//markers: true
	},
});

tl.from(".b", {
	// Das Element mit der Klasse "b" wird auf der x-Achse 100% nach links (minus) verschoben,
	// von dort aus wird es es dann mit einem "ease in" eingescrollt usw. ...
	xPercent: -100,
	ease: "ease in",
})
	.from(".c", {
		yPercent: 100,
		ease: "ease in",
	})
	.from(".d", {
		xPercent: 100,
		ease: "ease in",
	})
	.from(".e", {
		yPercent: -100,
		ease: "ease in",
	})
	.from(".f", {
		yPercent: 100,
		ease: "ease in",
	});
