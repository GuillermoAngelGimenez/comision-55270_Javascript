const apellidoNombreProfe = document.querySelector("#inputApellidoNombreProfe");
const materia = document.querySelector("#inputMateria");
const curso = document.querySelector("#inputCurso");

const formProfesor = document.querySelector("#formProfesor");
const btnAgregarprofe = document.querySelector("#btnAgregarprofe");
const contenedorProfe = document.querySelector("#contenedorProfe");

const apeNomEstudiante = document.querySelector(
  "#inputApellidoNombreEstudiante"
);
const nota1 = document.querySelector("#inputNota1");
const nota2 = document.querySelector("#inputNota2");
const nota3 = document.querySelector("#inputNota3");

const formEstudiantes = document.querySelector("#formEstudiantes");
const contenedorEstudiantes = document.querySelector("#contenedorEstudiantes");
const tablaEstudiantes = document.querySelector("#tablaEstudiantes");

const btnAgregarestudiante = document.querySelector("#btnAgregarestudiante");

const botonCancelar = document.createElement("button");
botonCancelar.innerHTML = "Cancelar Edición";
botonCancelar.classList.add("btn", "btn-warning", "deshabilitarBotonCancelar");
document.body.appendChild(botonCancelar);

let nuevoEstudiante;
let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
let profesorSeleccionado =
  JSON.parse(localStorage.getItem("profesorSeleccionado")) || {};

let estudianteAModificar;
let idEstudiante;
let banderaProfe = false;
let banderaModificar = false;
let profesores;

//ordenamiento de estudiantes
const ordenEstudiantes = document.querySelector("#ordenEstudiantes");

//buscador
const btnBuscar = document.querySelector("#btnBuscar");
const buscador = document.querySelector("#buscador");
const btnCancelarBuscar = document.querySelector("#btnCancelarBuscar");

const DateTime = luxon.DateTime;
let fecha = document.querySelector("#fecha");
let hFecha = document.createElement("h4");
hFecha.innerHTML = DateTime.now().toLocaleString(DateTime.DATE_SHORT);
fecha.appendChild(hFecha);

const tiempoDeInactividadConfigurado = 600000; //tiempo programado
let inactividad; //tiempo de inactividad real

// Función para reiniciar/activar el temporizador de inactividad
function resetearTiempoInactividad() {
  clearTimeout(inactividad);
  inactividad = setTimeout(() => {
    console.log("El usuario está inactivo.");

    Swal.fire({
      icon: "info",
      title: "Inactividad",
      html: "En unos segundos se cerra la ventana por inactividad",
      color: "white",
      background: "rgb(33,37,41)",
      background:
        "linear-gradient(297deg, rgba(133,126,126,1) 9%, rgba(25,23,24,1) 63%)",
      timer: 5000,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        window.close();
        console.log("Se cerró la ventana");
      }
    });
  }, tiempoDeInactividadConfigurado);
}

document.addEventListener("mousemove", resetearTiempoInactividad);
document.addEventListener("keydown", resetearTiempoInactividad);
document.addEventListener("mousedown", resetearTiempoInactividad);
document.addEventListener("onchange", resetearTiempoInactividad);
document.addEventListener("input", resetearTiempoInactividad);
resetearTiempoInactividad();

const listadoProfesores = () => {
  fetch("./db/profesores.json")
    .then((resp) => resp.json())
    .then((data) => {
      let nroProfesor = 1;
      profesores = [...data];

      //ordenar profesores de forma alfabetica
      profesores.sort(function (x, y) {
        if (x.apellidoNombre < y.apellidoNombre) {
          return -1;
        }
        if (x.apellidoNombre > y.apellidoNombre) {
          return 1;
        }
        return 0;
      });

      profesores.forEach((profesor) => {
        let option = document.createElement("option");
        option.innerHTML = `${profesor.apellidoNombre}`;
        apellidoNombreProfe.appendChild(option);
        nroProfesor++;
      });

      materia.value = data[0].materia;
      curso.value = data[0].curso;
    });
};

formProfesor.onsubmit = (event) => {
  event.preventDefault();

  if (banderaProfe) {
    btnAgregarprofe.innerHTML = "Agregar Profe";
    apellidoNombreProfe.disabled = false;
    banderaProfe = false;
    contenedorProfe.innerHTML = "";
  } else {
    btnAgregarprofe.innerHTML = "Modificar Profe";
    banderaProfe = true;
    apellidoNombreProfe.disabled = true;

    profesorSeleccionado = {
      apellidoNombre: apellidoNombreProfe.value,
      materia: materia.value,
      curso: curso.value
    };

    localStorage.setItem(
      "profesorSeleccionado",
      JSON.stringify(profesorSeleccionado)
    );

    mostrarProfesor();
  }
};

apellidoNombreProfe.onchange = () => {
  let pos = apellidoNombreProfe.selectedIndex;

  materia.value = profesores[pos].materia;
  curso.value = profesores[pos].curso;
};

//mostrar datos de profesor
const mostrarProfesor = () => {
  if (Object.keys(profesorSeleccionado).length == 0) {
    console.log("No hay profesor seleccionado");
    return;
  } else {
    if (banderaProfe == false) {
      btnAgregarprofe.innerHTML = "Modificar Profe";
      banderaProfe = true;
      apellidoNombreProfe.disabled = true;
    }
  }

  contenedorProfe.innerHTML = "";

  let divp = document.createElement("div");

  divp.classList.add("formatoProfe");
  divp.innerHTML = `<p><strong>Profesor/a: </strong> ${profesorSeleccionado.apellidoNombre}</p>
    <p><strong>Materia: </strong> ${profesorSeleccionado.materia}</p>
    <p><strong>Curso: </strong> ${profesorSeleccionado.curso}</p>
    <hr>`;

  contenedorProfe.append(divp);
};

listadoProfesores();
mostrarProfesor();

//calcular promedio para estudiante
calcularPromedio = (nota1, nota2, nota3) => {
  let not1, not2, not3;
  not1 = parseFloat(nota1);
  not2 = parseFloat(nota2);
  not3 = parseFloat(nota3);
  let prom = ((not1 + not2 + not3) / 3).toFixed(2);
  return prom;
};

function notificacionEstudianteAgregado(nombreEstudiante) {
  Toastify({
    text: `Se agregó a "${nombreEstudiante}"`,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "rgb(33,37,41)",
      background:
        "linear-gradient(297deg, rgba(133,126,126,1) 9%, rgba(25,23,24,1) 63%)",
      color: "white"
    },
    onClick: function () {} // Callback after click
  }).showToast();
}

//agregar nuevo estudiante al localstorage
formEstudiantes.onsubmit = (event) => {
  event.preventDefault();

  if (banderaModificar) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false,
      background: "rgb(33,37,41)",
      background:
        "linear-gradient(297deg, rgba(133,126,126,1) 9%, rgba(25,23,24,1) 63%)",
      color: "white",
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false
    });

    swalWithBootstrapButtons
      .fire({
        title: `Está seguro que desea modificar al estudiante "${estudianteAModificar[0].apeNomEstu}"?`,
        icon: "warning",
        iconColor: "red",
        showCancelButton: true,
        confirmButtonText: "Si, deseo modificarlo!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      })
      .then((result) => {
        if (result.isConfirmed) {
          //---------------
          let promedio = calcularPromedio(
            nota1.value,
            nota2.value,
            nota3.value
          );
          estudiantes.forEach((estudiante) => {
            if (estudiante.id == idEstudiante) {
              estudiante.apeNomEstu = apeNomEstudiante.value;
              estudiante.n1 = nota1.value;
              estudiante.n2 = nota2.value;
              estudiante.n3 = nota3.value;
              estudiante.prom = promedio;
            }
          });

          swalWithBootstrapButtons.fire(
            "Modificado!",
            "El estudiante fue modificado correctamente.",
            "success"
          );

          localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

          botonCancelar.onclick();
          if (ordenEstudiantes.value == 2 || ordenEstudiantes.value == 1) {
            ordenEstudiantes.onchange();
            return;
          }
          listarEstudiantes(estudiantes);
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelada",
            "La acción de modificación fue cancelada",
            "error"
          );

          botonCancelar.onclick();
        }
      });
  } else {
    let promedio;
    promedio = calcularPromedio(nota1.value, nota2.value, nota3.value);

    nuevoEstudiante = {
      apeNomEstu: apeNomEstudiante.value,
      n1: nota1.value,
      n2: nota2.value,
      n3: nota3.value,
      prom: promedio,
      id: Date.now().toString(36)
    };

    estudiantes = [...estudiantes, nuevoEstudiante];

    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

    // llamada a función para la notificacion de estudiante agregado
    notificacionEstudianteAgregado(apeNomEstudiante.value);
    formEstudiantes.reset();

    if (ordenEstudiantes.value == 2 || ordenEstudiantes.value == 1) {
      ordenEstudiantes.onchange();
      return;
    }

    listarEstudiantes(estudiantes);
  }

  banderaModificar = false;
};

//borrar estudiante
const eliminarEstudiante = (id) => {
  const estudianteBorrar = estudiantes.filter(
    (estudiante) => estudiante.id === id
  );

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false,
    background: "rgb(33,37,41)",
    background:
      "linear-gradient(297deg, rgba(133,126,126,1) 9%, rgba(25,23,24,1) 63%)",
    color: "white",
    timerProgressBar: 3000,
    timer: 4000
  });

  swalWithBootstrapButtons
    .fire({
      title: `Está seguro que desea eliminar al estudiante "${estudianteBorrar[0].apeNomEstudiante}"?`,
      icon: "warning",
      iconColor: "red",
      showCancelButton: true,
      confirmButtonText: "Si, eliminarlo!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    })
    .then((result) => {
      if (result.isConfirmed) {
        estudiantes = estudiantes.filter((estudiante) => estudiante.id !== id);
        localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
        listarEstudiantes(estudiantes);

        swalWithBootstrapButtons.fire(
          "Borrado!",
          "El estudiante fue quitado del listado.",
          "success"
        );
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          "Cancelada",
          "La acción de eliminación fue cancelada",
          "error"
        );
      }
    });
};

//modificar estudiante
const modificarEstudiante = (idbuscar) => {
  estudianteAModificar = estudiantes.filter(
    (estudiante) => estudiante.id == idbuscar
  );

  idEstudiante = idbuscar;
  apeNomEstudiante.value = estudianteAModificar[0].apeNomEstu;
  nota1.value = estudianteAModificar[0].n1;
  nota2.value = estudianteAModificar[0].n2;
  nota3.value = estudianteAModificar[0].n3;

  btnAgregarestudiante.innerHTML = "Modificar Estudiante";
  banderaModificar = true;

  //deshabilitamos los botones modificar y eliminar
  let deshabilitarModificar = document.getElementsByClassName("botonModificar");
  let deshabilitarEliminar = document.getElementsByClassName("botonEliminar");

  for (const bt of deshabilitarModificar) {
    bt.disabled = true;
  }

  for (const bt of deshabilitarEliminar) {
    bt.disabled = true;
  }

  botonCancelar.classList.remove("deshabilitarBotonCancelar");
  botonCancelar.classList.add("habilitarBotonCancelar");
  apeNomEstudiante.focus();
};

botonCancelar.onclick = () => {
  botonCancelar.classList.remove("habilitarBotonCancelar");
  botonCancelar.classList.add("deshabilitarBotonCancelar");
  btnAgregarestudiante.innerHTML = "Agregar Estudiante";
  formEstudiantes.reset();

  //deshabilitamos los botones modificar y eliminar
  let habilitarModificar = document.getElementsByClassName("botonModificar");
  let habilitarEliminar = document.getElementsByClassName("botonEliminar");

  for (const bt of habilitarModificar) {
    bt.disabled = false;
    bt.classList.add("btn", "btn-info", "botonModificar");
  }

  for (const bt of habilitarEliminar) {
    bt.disabled = false;
    bt.classList.add("btn", "btn-danger", "botonEliminar");
  }
};

//listar estudiantes
const listarEstudiantes = (estudiantes) => {
  if (estudiantes.length > 0) {
    ordenEstudiantes.disabled = false;
    btnBuscar.disabled = false;
    buscador.disabled = false;
    btnCancelarBuscar.disabled = false;
  }

  tablaEstudiantes.innerHTML = " ";
  let nroEstudiante = 0;

  estudiantes.forEach((estudiante) => {
    nroEstudiante++;
    let tr = document.createElement("tr");

    let th = document.createElement("th");
    let td1 = document.createElement("td");
    td1.classList.add("colNombreApellido");
    let td2 = document.createElement("td");
    let td3 = document.createElement("td");
    let td4 = document.createElement("td");
    let td5 = document.createElement("td");

    const { apeNomEstu, n1, n2, n3, prom, id } = estudiante;

    th.innerHTML = `${nroEstudiante}`;
    td1.innerHTML = `${apeNomEstu}`;
    td2.innerHTML = `${n1} - ${n2} - ${n3}`;
    td3.innerHTML = `${prom}`;

    //agregar el botón Modificar
    let btnModificar = document.createElement("button");
    btnModificar.classList.add("btn", "btn-info", "botonModificar");
    btnModificar.innerHTML = "Modificar";

    //agregar el botón Eliminar
    let btnEliminar = document.createElement("button");
    btnEliminar.classList.add("btn", "btn-danger", "botonEliminar");
    btnEliminar.innerHTML = "Eliminar";

    td4.appendChild(btnModificar);
    td4.appendChild(btnEliminar);

    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);

    tablaEstudiantes.appendChild(tr);

    btnEliminar.onclick = () => eliminarEstudiante(id);

    btnModificar.onclick = () => modificarEstudiante(id);
  });
};

listarEstudiantes(estudiantes);

ordenEstudiantes.onchange = () => {
  if (ordenEstudiantes.value == 2) {
    estudiantes.sort((x, y) => y.prom - x.prom);
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
    listarEstudiantes(estudiantes);
  } else if (ordenEstudiantes.value == 1) {
    estudiantes.sort((x, y) => x.apeNomEstu.localeCompare(y.apeNomEstu));
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
    listarEstudiantes(estudiantes);
  }
};

btnBuscar.onclick = () => {
  if (buscador.value.length < 3) {
    console.log("no se puede realizar la búsqueda con menos de 3 caracteres");
    listarEstudiantes(estudiantes);
  } else {
    let stringABuscar = buscador.value;
    let encontrado;
    let estudiantesCoincidentes = [];

    estudiantes.forEach((estudiante) => {
      const { apeNomEstu, n1, n2, n3, prom, id } = estudiante;

      encontrado = apeNomEstu.includes(stringABuscar) ? true : false;
      if (encontrado) {
        estudiantesCoincidentes = [...estudiantesCoincidentes, estudiante];
      }
    });
    listarEstudiantes(estudiantesCoincidentes);
  }
};

btnCancelarBuscar.onclick = () => {
  buscador.value = "";
  listarEstudiantes(estudiantes);
};
