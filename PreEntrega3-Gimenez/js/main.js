const apellidoNombreProfe = document.querySelector("#inputApellidoNombreProfe")
const materia = document.querySelector("#inputMateria")
const curso = document.querySelector("#inputCurso")

const formProfesor = document.querySelector("#formProfesor")
const btnAgregarprofe = document.querySelector("#btnAgregarprofe")
const contenedorProfe = document.querySelector("#contenedorProfe")


const apeNomEstudiante = document.querySelector("#inputApellidoNombreEstudiante")
const nota1 = document.querySelector("#inputNota1")
const nota2 = document.querySelector("#inputNota2")
const nota3 = document.querySelector("#inputNota3")

const formEstudiantes = document.querySelector("#formEstudiantes")
const contenedorEstudiantes = document.querySelector("#contenedorEstudiantes")
const btnAgregarestudiante = document.querySelector("#btnAgregarestudiante")


let nuevoEstudiante;
let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
let estudianteAModificar;
let idEstudiante;
let banderaProfe = false;
let banderaEstu = false;
let contador = 0;

formProfesor.onsubmit = (event) => {
    event.preventDefault();

    if(apellidoNombreProfe.value===""){
        return;
    }

    if(banderaProfe){
        contenedorProfe.innerHTML = " ";
    }else{
        btnAgregarprofe.innerHTML = "Modificar Profe";
        banderaProfe= true;
    }

    listarProfesor();
};

//listar datos de profesor
listarProfesor = () => {
    let divp = document.createElement("div");
    divp.classList.add("formatoProfe");
    divp.innerHTML = `<p><strong>Profesor/a: </strong> ${apellidoNombreProfe.value}</p>
    <p><strong>Materia: </strong> ${materia.value}</p>
    <p><strong>Curso: </strong> ${curso.value}</p>
    <hr>`;
    contenedorProfe.append(divp);
}

//calcular promedio para estudiante
calcularPromedio = (nota1, nota2, nota3) => {
    let not1, not2, not3;
    not1 = parseFloat(nota1);
    not2 = parseFloat(nota2);
    not3 = parseFloat(nota3);
    let prom = ((not1+not2+not3)/3).toFixed(2);
    if(isNaN(prom) || prom === undefined) {
        prom = "No se puede calcular";
    }
    return prom;
}


const agregarNuevoEstudiante = (input) => {
    const {name, value} = input;
    nuevoEstudiante = {
        ...nuevoEstudiante,
        [name]: value
    }
};

apeNomEstudiante.oninput = ()=>{
    agregarNuevoEstudiante(apeNomEstudiante);
}

nota1.oninput = ()=>{
    agregarNuevoEstudiante(nota1);
}

nota2.oninput = ()=>{
    agregarNuevoEstudiante(nota2);
}

nota3.oninput = ()=>{
    agregarNuevoEstudiante(nota3);
}


//agregar nuevo estudiante al localstorage
formEstudiantes.onsubmit = (event) => {
    event.preventDefault();

    if(apeNomEstudiante.value===""){
        return;
    }

    if(banderaEstu){
        estudiantes.forEach((estudiante)=>{
            if(estudiante.id==idEstudiante){
                estudiante.apellidoNombreEstudiante = apeNomEstudiante.value;
                estudiante.nota1 = nota1.value;
                estudiante.nota2 = nota2.value;
                estudiante.nota3 = nota3.value;
                banderaEstu = false;
                btnAgregarestudiante.innerHTML = "Agregar Estudiante";
                contenedorEstudiantes.innerHTML = " ";
                
            }
        });
    }else{
        nuevoEstudiante = {
            ...nuevoEstudiante,
            id: Date.now().toString(36)
        }
    
        estudiantes = [...estudiantes, nuevoEstudiante];

    }

    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
    listarEstudiantes();
    formEstudiantes.reset();

}

//borrar estudiante
const eliminarEstudiante = (id)=>{
    if(banderaEstu) return;
    estudiantes = estudiantes.filter((estudiante) => estudiante.id !== id); 
    localStorage.setItem("estudiantes", JSON.stringify("estudiantes"));
    listarEstudiantes();
    
}

//modificar estudiante
const modificarEstudiante = (idbuscar)=>{
    estudianteAModificar = estudiantes.filter((estudiante) => estudiante.id == idbuscar)
    
    apeNomEstudiante.value = estudianteAModificar[0].apellidoNombreEstudiante === undefined ? "---" : estudianteAModificar[0].apellidoNombreEstudiante;
    nota1.value = estudianteAModificar[0].nota1 ===undefined? " " : estudianteAModificar[0].nota1;
    nota2.value = estudianteAModificar[0].nota2 ===undefined? " " : estudianteAModificar[0].nota2;
    nota3.value = estudianteAModificar[0].nota3 ===undefined? " " : estudianteAModificar[0].nota3;

    idEstudiante = idbuscar;

    btnAgregarestudiante.innerHTML = "Modificar Estudiante";
    banderaEstu = true;


}

//listar estudiantes
listarEstudiantes = () => {
    contenedorEstudiantes.innerHTML = " ";

    let promedio, n1, n2, n3;
    estudiantes.forEach((estudiante)=>{

        let registro = document.createElement("div");
        registro.classList.add("formatoRegistro", "mt-2", "border", "border-3", "p-2", "shadow", "shadow-md");
        const {apellidoNombreEstudiante, nota1, nota2, nota3, id} = estudiante;
        n1 = nota1===undefined? "---" : nota1;
        n2 = nota2===undefined? "---" : nota2;
        n3 = nota3===undefined? "---" : nota3;
        promedio = calcularPromedio(n1, n2, n3);
        registro.innerHTML = `<p>Nombre y Apellido: ${apellidoNombreEstudiante}.</p>
        <p>Notas: ${n1}, ${n2}, ${n3}.</p>
        <p>Promedio: ${promedio}.</p>
        `;

        contenedorEstudiantes.appendChild(registro);
        n1 = 0;
        n2 = 0;
        n3 = 0;

        let div = document.createElement("div");   
        div.classList.add("botoneraEstudiante")    

        //agregar el botón eliminar
        let btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger", "botonEliminar");
        btnEliminar.innerHTML = "Eliminar";
        div.appendChild(btnEliminar);

        //agregar el botón modificar
        let btnModificar = document.createElement("button");
        btnModificar.classList.add("btn", "btn-info", "botonModificar");
        btnModificar.innerHTML = "Modificar";
        div.appendChild(btnModificar);

        registro.appendChild(div);

        btnEliminar.onclick = () => eliminarEstudiante(id);

        btnModificar.onclick = () => modificarEstudiante(id);
        

    }
    );

}





