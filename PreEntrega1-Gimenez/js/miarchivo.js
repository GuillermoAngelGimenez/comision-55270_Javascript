let estudiante;
let nroEstudiante = 0;
let estudianteActual;
let estudiantes = [];

//para el ingreso del primer estudiante.
function solicitarEstudiante() {
  estudiante = prompt(
    "A continuación te solicitamos ingreses el nombre del Estudiante nro." +
      nroEstudiante +
      "\n" +
      "*** Recuerde que cada estudiante debe tener 3 notas para calcular su promedio y que el ingreso de una nota que no sea entre " +
      "1 y 10 en forma reiterada produce la salida del simulador. ***\n" +
      "*** Podes utilizar <Esc> o <Enter> para salir del simulador. ***\n"
  );

  if (estudiante == "") {
    alert("No ingreso ningún estudiante.");
  } else {
    estudiante = estudiante.toUpperCase();
  }
}

//ingreso de notas y validacion de las mismas.
function solicitarNotas() {
  let prom = 0;
  let nroIntento = 0;
  let nroNota;
  for (nroNota = 1; nroNota < 4; nroNota++) {
    nota = parseFloat(
      prompt(
        "Ingrese la nota " +
          nroNota +
          " del estudiante " +
          estudiante.toUpperCase() +
          ":"
      )
    );

    if (nota > 0 && nota <= 10) {
      prom = prom + nota;
    } else {
      nroIntento = 1;
      while (nroIntento < 3) {
        nota = parseFloat(
          prompt(
            "¡¡¡Ingresó un valor de nota incorrecto!!! \n" +
              "Ingrese la nota " +
              nroNota +
              " del estudiante " +
              estudiante.toUpperCase() +
              " (reintento " +
              nroIntento +
              ") :"
          )
        );

        if (nota > 0 && nota <= 10) {
          prom = prom + nota;
          break;
        } else {
          nroIntento++;
        }
      }
    }

    if (nroIntento == 3) {
      alert(
        "Alcanzó el límite de intentos de ingreso de nota para el estudiante actual."
      );
      mostrarEstudiantes();
      exit;
    }
  }

  if (nroNota == 4) {
    calcularPromedio(prom);
  }

  return;
}

// para el calculo de promedio.
function calcularPromedio(prom) {
  prom = prom / 3;
  let promedioEstudiante = prom.toFixed(2);
  agregarEstudiante(promedioEstudiante);
}

// para el agregado de estudiante al arreglo.
function agregarEstudiante(promedioEstudiante) {
  estudianteActual =
    nroEstudiante + " - " + estudiante + " -> " + promedioEstudiante;

  estudiantes.push(estudianteActual);

  nroEstudiante++;

  estudiante = prompt(
    "Ingresa el nombre del Estudiante nro." +
      nroEstudiante +
      "\n" +
      "*** Recuerde que cada estudiante debe tener 3 notas para calcular su promedio y que el ingreso de una nota que no sea entre " +
      "1 y 10  en forma reiterada produce la salida del simulador. ***\n" +
      '*** Ingresá la palabra "ESC" en cualquier momento para salir del simulador. ***\n'
  );

  promedio = 0;
  estudiante = estudiante.toUpperCase();
}

// para la visualizacion del reporte de estudiantes con sus promedios.
function mostrarEstudiantes() {
  if (estudiantes.length > 0) {
    alert(
      docente.toUpperCase() +
        " te mostramos a continuación los distintos estudiantes ingresados y sus promedios: \n" +
        estudiantes.join("\n")
    );
  } else {
    alert(docente.toUpperCase() + " no existen estudiantes a mostrar.");
  }
}

const docente = prompt(
  "Bienvenido al Simulador Interactivo de calculo de promedio de estudiantes. \n" +
    "¿Me decís tu nombre?"
);

if (docente == "") {
  alert(
    "No ingreso su nombre por lo cual no se puede iniciar. Te esperamos pronto!"
  );
} else {
  nroEstudiante++;

  solicitarEstudiante();

  while (estudiante != "") {
    let nroIntento;
    let nota;

    solicitarNotas();
  }

  mostrarEstudiantes();
}
