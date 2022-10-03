const input = $("#cadena");
const boton = $("#enviar");
const estados = ["A", "AB", "BC", "C", "D"];
const estadoInicial = 0;
const estadosAceptacion = [2, 3];
let estadoActual = estadoInicial;
function automata(cadena) {
	const flecha = " \\rightarrow ";
	let proceso = "$$A";
	estadoActual = estadoInicial;
	for (let i = 0; i < cadena.length; i++) {
		proceso += flecha;
		switch (estadoActual) {
			case 0:
				if (cadena[i] == "0") {
					estadoActual = 1;
				} else {
					estadoActual = 3;
				}
				break;
			case 1:
				if (cadena[i] == "0") {
					estadoActual = 1;
				} else {
					estadoActual = 2;
				}
				break;
			case 2:
				if (cadena[i] == "0") {
					estadoActual = 0;
				} else {
					estadoActual = 1;
				}
				break;
			case 3:
				if (cadena[i] == "0") {
					estadoActual = 4;
				} else {
					estadoActual = 1;
				}
				break;
			case 4:
				if (cadena[i] == "0") {
					estadoActual = 4;
				} else {
					estadoActual = 4;
				}
				break;
		}
		proceso += estados[estadoActual];
		if ((i + 1) % 9 == 0 && i != 0) {
			proceso += "$$ $$";
		}
	}
	proceso += "$$";
	MathJax.typesetPromise()
		.then(() => {
			$("#proceso").html(proceso);
			MathJax.typesetPromise();
		})
		.catch((err) => console.log(err.message));

	return estadosAceptacion.includes(estadoActual);
}

function iniciarAutomata() {
	const value = input.val();
	if (value.length > 0) {
        $("#cadenaFinal").text(input.val());
		if (automata(value)) {
            $("#resultado").text("Cadena aceptada");
            $("#resultado").css("color", "green");
		} else {
			$("#resultado").text("Cadena no aceptada");
            $("#resultado").css("color", "red");
		}
	}
}

boton.on("click", function () {
	iniciarAutomata();
});

input.on("keyup", function () {
	const value = $(this).val();
	const result = value.replace(/[^0-1]/g, "");
	$(this).val(result);
});
input.on("change", function () {
	const value = $(this).val();
	const result = value.replace(/[^0-1]/g, "");
	$(this).val(result);
});
input.on("keypress", function () {
	const value = $(this).val();
	const result = value.replace(/[^0-1]/g, "");
	$(this).val(result);
});
$("#form").on("submit", function (e) {
	e.preventDefault();
	iniciarAutomata();
});
$("#form").on("reset", function () {
    $("#proceso").html("");
    $("#resultado").text("");
    $("#cadenaFinal").text("");
});