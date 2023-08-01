let estudiantes = [];

// Definimos una clase estudiante
class Estudiante {
  constructor(nombre, apellido, notas, promedio) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.notas = notas;
    this.promedio = promedio;
  }

  setNombre(nombre) {
    let viejoNombre = this.nombre;
    this.nombre = nombre.toUpperCase();
    alert(
      `El nombre del estudiante a sido cambiado con éxito de ${viejoNombre} a ${this.nombre}`
    );
  }

  setApellido(apellido) {
    let viejoApellido = this.apellido;
    this.apellido = apellido.toUpperCase();
    alert(
      `El apellido del estudiante a sido cambiado con éxito de ${viejoApellido} a ${this.apellido}`
    );
  }

  setNotasPromedio(nombre, apellido) {
    let notas = solicitarNotas(apellido, nombre);

    let promedio = calcularPromedio(notas);

    this.notas = notas;
    this.promedio = promedio;

    alert(
      `Se modificaron las notas para el estudiante ${this.apellido}, ${this.nombre} y se calculo nuevamente el promedio (${this.promedio}).`
    );
  }
}

const agregarEstudiante = () => {
  alert(
    "A continuación te solicitamos que ingreses los distintos datos del estudiante.."
  );

  let estudiante_nombre = prompt(
    "Ingrese el nombre del estudiante"
  ).toUpperCase();
  let estudiante_apellido = prompt(
    "Ingrese el apellido del estudiante"
  ).toUpperCase();

  if (estudiante_nombre == "" && estudiante_apellido == "") {
    alert("No ingreso la info requerida para el estudiante.");
  } else {
    let notas = solicitarNotas(estudiante_apellido, estudiante_nombre);

    let promedio = calcularPromedio(notas);

    let estudiante = new Estudiante(
      estudiante_nombre,
      estudiante_apellido,
      notas,
      promedio
    );

    estudiantes.push(estudiante);

    alert("Se cargo el estudiante con éxito!!!");
  }
};

// para carga de estudiantes y notas
const solicitarNotas = (estudiante_apellido, estudiante_nombre) => {
  let nroIntento = 0;
  let nroNota;
  let nota;
  let notas = [];

  let cant_notas = parseInt(
    prompt("Indique la cantidad de notas que desea ingresar")
  );

  if (cant_notas == "" || isNaN(cant_notas)) {
    alert(
      "No indico la cantidad de notas a cargar para el nuevo estudiante. \nSe le asignara por defecto la cantidad de notas a 3."
    );
    cant_notas = 3;
  }

  for (nroNota = 1; nroNota <= cant_notas; nroNota++) {
    nota = parseFloat(
      prompt(
        "Ingrese la nota " +
          nroNota +
          " del estudiante " +
          estudiante_apellido +
          " " +
          estudiante_nombre +
          ":"
      )
    );

    if (nota > 0 && nota <= 10) {
      notas.push(nota);
    } else {
      nroIntento = 1;
      while (nroIntento < 3) {
        nota = parseFloat(
          prompt(
            "¡¡¡Ingresó un valor de nota incorrecto!!! \n" +
              "Ingrese la nota " +
              nroNota +
              " del estudiante " +
              estudiante_apellido +
              " " +
              estudiante_nombre +
              ":"
          )
        );

        if (nota > 0 && nota <= 10) {
          notas.push(nota);
          break;
        } else {
          nroIntento++;
        }
      }
    }

    if (nroIntento == 3) {
      alert(
        "Alcanzó el límite de intentos de ingreso para esta nota para el estudiante actual. \n" +
          "Por defecto se le asignara el valor de 0 a la nota. \n" +
          "Lo invitamos a que posteriormente asigne la nota correspondiente desde la opción 2 del menú principal."
      );
      notas.push(0);
    }
  }

  if (nroNota == cant_notas + 1) {
    return notas;
  } else {
    return menuEstudiante;
  }
};

// para el calculo de promedio de notas de un estudiante
const calcularPromedio = (notas) => {
  let promedio = 0;

  for (let i = 0; i < notas.length; i++) {
    promedio += notas[i];
  }

  promedio = (promedio / notas.length).toFixed(2);

  return promedio;
};

const modificarEstudiante = () => {
  if (estudiantes.length === 0) {
    alert("No se cargaron estudiantes para el docente. ");
    return;
  }

  const estudianteABuscar = estudianteExiste();

  if (!estudianteABuscar) return;

  let opcion_editar = parseInt(
    prompt(
      "Indique que desea modificar del estudiante:  \n1- Editar Nombre. \n2- Editar Apellido. \n3- Modificar Notas."
    )
  );

  switch (opcion_editar) {
    case 1:
      let nombre = prompt(
        "El nombre actual del estudiante es " +
          estudianteABuscar.nombre +
          ".\nIngrese el el nuevo nombre del estudiante: "
      );
      estudianteABuscar.setNombre(nombre);
      break;
    case 2:
      let apellido = prompt(
        "El apellido actual del estudiante es " +
          estudianteABuscar.apellido +
          ".\nIngrese el el nuevo apellido del estudiante: "
      );
      estudianteABuscar.setApellido(apellido);
      break;
    case 3:
      estudianteABuscar.setNotasPromedio(
        estudianteABuscar.nombre,
        estudianteABuscar.apellido
      );
      break;
    default:
      alert("Ingrese una opción que no es válida");
  }
};

const estudianteExiste = () => {
  let apellidoEstudiante = prompt("Ingrese el apellido del estudiante");
  let nombreEstudiante = prompt("Ingrese el nombre del estudiante");

  let posicion = estudiantes.findIndex(
    (estudiante) =>
      estudiante.apellido === apellidoEstudiante.toUpperCase() &&
      estudiante.nombre === nombreEstudiante.toUpperCase()
  );

  if (posicion === -1) {
    return alert(
      `El Estudiante ${nombreEstudiante}, ${apellidoEstudiante} no existe.`
    );
  } else {
    return estudiantes[posicion];
  }
};

const borrarEstudiante = () => {
  if (estudiantes.length === 0) {
    alert("No se cargaron estudiantes para el docente.");
    return;
  }

  const estudianteABuscar = estudianteExiste();

  if (!estudianteABuscar) return;

  const confirmacion = confirm(
    `¿Desea eliminar el estudiante ${estudianteABuscar.apellido}, ${estudianteABuscar.nombre} y toda su información adjunta?`
  );

  if (confirmacion) {
    estudiantes = estudiantes.filter(
      (estudiante) =>
        estudiante.apellido !== estudianteABuscar.apellido.toUpperCase() &&
        estudiante.nombre !== estudianteABuscar.nombre.toUpperCase()
    );
    alert(
      `El estudiante ${estudianteABuscar.apellido}, ${estudianteABuscar.nombre} se borró con éxito!`
    );
  } else {
    alert(
      `Se cancelo el borrado del estudiante ${estudianteABuscar.apellido}, ${estudianteABuscar.nombre}`
    );
  }
};

const mostrarEstudiantes = (
  docente_nombre,
  docente_apellido,
  docente_materia,
  docente_curso,
  estudiantes
) => {
  if (estudiantes.length > 0) {
    // Ordenamos los estudiantes alfabéticamente por el apellido
    estudiantes.sort((a, b) => {
      if (a.apellido > b.apellido) {
        return 1;
      } else if (a.apellido < b.apellido) {
        return -1;
      } else {
        return 0;
      }
    });

    let cadenaEstudiantes = "";
    let cadenaNotas;
    for (let estudiante of estudiantes) {
      cadenaNotas = "Notas: ";
      for (let nota of estudiante.notas) {
        cadenaNotas += nota + " ";
      }

      cadenaEstudiantes +=
        estudiante.apellido +
        ", " +
        estudiante.nombre +
        "  -  " +
        cadenaNotas +
        "  -  " +
        "Prom.: " +
        estudiante.promedio +
        ".\n";
    }

    alert(
      "Profesor/a " +
        docente_nombre +
        " " +
        docente_apellido +
        " te mostramos a continuación los distintos estudiantes del curso " +
        docente_curso +
        " para la materia " +
        docente_materia +
        ": \n" +
        cadenaEstudiantes
    );
  } else {
    alert("No se cargaron estudiantes para el docente.");
  }
};

//Comienzo del Simulador
alert(
  "Bienvenido al Simulador Interactivo de Calculo de Promedio de Estudiantes....."
);

let opcion_docente = false;

do {
  let docente_apellido = prompt(
    "Ingrese el apellido del docente: "
  ).toUpperCase();
  let docente_nombre = prompt("Ingrese el nombre del docente: ").toUpperCase();
  let docente_materia = prompt(
    "Ingrese la materia dictada por el docente: "
  ).toUpperCase();
  let docente_curso = prompt("Ingrese el curso: ").toUpperCase();

  if (
    docente_apellido == "" ||
    docente_nombre == "" ||
    docente_materia == "" ||
    docente_curso == ""
  ) {
    alert("No se ingresaron algunos de los datos requeridos para el docente.");
  } else {
    alert("Se ingresaron correctamente los datos del docente!!!");
    menuEstudiante(
      docente_nombre,
      docente_apellido,
      docente_materia,
      docente_curso
    );
    opcion_docente = true;
  }
} while (opcion_docente == false);

function menuEstudiante(
  docente_nombre,
  docente_apellido,
  docente_materia,
  docente_curso
) {
  let opcion_estudiante;
  while (opcion_estudiante != 5) {
    opcion_estudiante = parseFloat(
      prompt(
        `Profesor/a ${docente_nombre} ${docente_apellido} seleccione la opción que desee: \n` +
          "\t 1- Agregar nuevo Estudiante. \n" +
          "\t 2- Modificar Estudiante. \n" +
          "\t 3- Eliminar Estudiante. \n" +
          "\t 4- Mostrar Estudiantes. \n" +
          "\t 5- Salir del simulador. \n"
      )
    );

    console.log(opcion_estudiante);

    switch (opcion_estudiante) {
      case 1:
        agregarEstudiante();
        break;

      case 2:
        modificarEstudiante();
        break;

      case 3:
        borrarEstudiante();
        break;

      case 4:
        mostrarEstudiantes(
          docente_nombre,
          docente_apellido,
          docente_materia,
          docente_curso,
          estudiantes
        );
        break;

      case 5:
        alert(
          `Hasta cualquier momento profesor/a ${docente_nombre} ${docente_apellido}.`
        );
        break;

      default:
        alert("No ingreso ninguna opción válida");
        break;
    }
  }
}
