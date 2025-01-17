	/* Neue Parallax.js-Instanz erstellen und das Element mit 
der id="scene" als Parallax Container angeben. */
var scene = document.getElementById("scene");
var parallaxInstance = new Parallax(scene);

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
		xPercent: -100,
		ease: "ease in",
	})
	.from(".g", {
		yPercent: 100,
		ease: "ease in",
	});



// Starte eine neue GSAP Animation für das Element mit der Klasse .aa
gsap.to(".a2", {
	scrollTrigger: {
		trigger: ".a2", // Der Trigger ist das Element das die Animation auslöst
		start: "0 50%", // Gibt die Scroll-Position an bei der die Animation anfängt (1. Wert: abhängig von Elementposition auf der Seite / 2. Wert: abhängig von Bildschirmhöhe)
		end: "10px 10%", // Gibt die Scroll-Position an bei der die Animation aufhört
		scrub: true, // Die Animation wird von der Scroll-Bar gesteuert
		pin: false, // Das Element rastet beim Start der Animation ein (fixed) und scrollt mit
		markers: false, // Zeigen die Scroll-Start und -End Positionen visuell an
	},
	x: 200, // Das Element wird 300px auf der y-Achse nach rechts verschoben
	rotation: 360, // Rotiert einmal um 180 Grad
});

gsap.to(".b2", {
	scrollTrigger: {
		trigger: ".b2", // Der Trigger ist das Element das die Animation auslöst
		start: "0 50%", // Gibt die Scroll-Position an bei der die Animation anfängt (1. Wert: abhängig von Elementposition auf der Seite / 2. Wert: abhängig von Bildschirmhöhe)
		end: "10px 10%", // Gibt die Scroll-Position an bei der die Animation aufhört
		scrub: true, // Die Animation wird von der Scroll-Bar gesteuert
		pin: false, // Das Element rastet beim Start der Animation ein (fixed) und scrollt mit
		markers: false, // Zeigen die Scroll-Start und -End Positionen visuell an
	},
	x: 400, // Das Element wird 300px auf der y-Achse nach rechts verschoben
	rotation: 360, // Rotiert einmal um 180 Grad
});

gsap.to(".c2", {
	scrollTrigger: {
		trigger: ".c2", // Der Trigger ist das Element das die Animation auslöst
		start: "0 50%", // Gibt die Scroll-Position an bei der die Animation anfängt (1. Wert: abhängig von Elementposition auf der Seite / 2. Wert: abhängig von Bildschirmhöhe)
		end: "10px 10%", // Gibt die Scroll-Position an bei der die Animation aufhört
		scrub: true, // Die Animation wird von der Scroll-Bar gesteuert
		pin: false, // Das Element rastet beim Start der Animation ein (fixed) und scrollt mit
		markers: false, // Zeigen die Scroll-Start und -End Positionen visuell an
	},
	x: 600, // Das Element wird 300px auf der y-Achse nach rechts verschoben
	rotation: 360, // Rotiert einmal um 180 Grad
});
