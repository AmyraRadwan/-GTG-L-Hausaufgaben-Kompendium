/* var audio = $("#kiki")[0];
$("#kiki1").mouseenter(function () {
  audio.play();
  audio.loop = true;
});
$("#kiki1").mouseleave(function () {
  audio.pause();
});
 */
var audioKiki = document.getElementById("kiki");
var kiki = document.querySelectorAll(".kiki");

kiki.forEach(function (kiki) {
	kiki.addEventListener("mouseenter", function () {
		audioKiki.play();
		audioKiki.loop = true;
	});

	kiki.addEventListener("mouseleave", function () {
		audioKiki.pause();
	});
});

var audioBouba = document.getElementById("bouba");
var bouba = document.querySelectorAll(".bouba");

bouba.forEach(function (bouba) {
	bouba.addEventListener("mouseenter", function () {
		audioBouba.play();
		audioBouba.loop = true;
	});

	bouba.addEventListener("mouseleave", function () {
		audioBouba.pause();
	});
});

var audioKira = document.getElementById("kira");
var kira = document.querySelectorAll(".kira");

kira.forEach(function (kira) {
	kira.addEventListener("mouseenter", function () {
		audioKira.play();
		audioKira.loop = true;
	});

	kira.addEventListener("mouseleave", function () {
		audioKira.pause();
	});
});

var audioTsuru = document.getElementById("tsuru");
var tsuru = document.querySelectorAll(".tsuru");

tsuru.forEach(function (tsuru) {
	tsuru.addEventListener("mouseenter", function () {
		audioTsuru.play();
		audioTsuru.loop = true;
	});

	tsuru.addEventListener("mouseleave", function () {
		audioTsuru.pause();
	});
});

var audioGoro = document.getElementById("goro");
var goro = document.querySelectorAll(".goro");

goro.forEach(function (goro) {
	goro.addEventListener("mouseenter", function () {
		audioGoro.play();
		audioGoro.loop = true;
	});

	goro.addEventListener("mouseleave", function () {
		audioGoro.pause();
	});
});
