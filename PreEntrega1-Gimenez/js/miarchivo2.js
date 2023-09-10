let nombre = prompt("Hola!!! Me decís tu nombre?");

if (nombre == "") {
  alert("No ingreso su nombre por lo cual no se puede iniciar. Saludos!");
} else {
  let opcion;
  opcion = prompt(
    nombre.toUpperCase() +
      " seleccioná la opción según lo que deseas conocer: \n\b 1- Tu edad y Signo. \n\b 2- Tu IMC (indice de masa corporal). \n\b ***  Cualquier otro valor para opción cierra la app  ***"
  );

  while (opcion == 1 || opcion == 2) {
    if (opcion == 1) {
      let fi = new Date();
      // let fechaActual = new Date();
      // fechaActual = fi.getDate() + "-" + fi.getMonth() + "-" + fi.getFullYear();
      let fechaActual = fi.getTime();

      let diaNac = prompt(
        "Ingrese el día(número) correspondiente a tu fecha de nacimiento."
      );
      let mesNac = prompt(
        "Ingrese el mes(número)  correspondiente a tu fecha de nacimiento."
      );
      let anoNac = prompt(
        "Ingrese el año(número de 4 digitos) correspondiente a tu fecha de nacimiento."
      );

      function calcularEdad() {
        const nacimiento = new Date();
        nacimiento.setFullYear(anoNac, mesNac - 1, diaNac);
        let fechaNacimiento = nacimiento.getTime();
        return parseInt(
          (fechaActual - fechaNacimiento) / (1000 * 60 * 60 * 24 * 365)
        );
      }

      function detSigno() {
        switch (parseInt(mesNac)) {
          case 1:
            if (diaNac < 20) {
              return "Capricornio";
            } else {
              return "Acuario";
            }
            break;
          case 2:
            if (diaNac < 19) {
              return "Acuario";
            } else {
              return "Piscis";
            }
            break;
          case 3:
            if (diaNac < 21) {
              return "Piscis";
            } else {
              return "Aries";
            }
            break;
          case 4:
            if (diaNac < 20) {
              return "Aries";
            } else {
              return "Tauro";
            }
            break;
          case 5:
            if (diaNac < 21) {
              return "Tauro";
            } else {
              return "Géminis";
            }
            break;
          case 6:
            if (diaNac < 21) {
              return "Géminis";
            } else {
              return "Cáncer";
            }
            break;
          case 7:
            if (diaNac < 23) {
              return "Cáncer";
            } else {
              return "Leo";
            }
            break;
          case 8:
            if (diaNac < 23) {
              return "Leo";
            } else {
              return "Virgo";
            }
            break;
          case 9:
            if (diaNac < 23) {
              return "Virgo";
            } else {
              return "Libra";
            }
            break;
          case 10:
            if (diaNac < 23) {
              return "Libra";
            } else {
              return "Escorpio";
            }
            break;
          case 11:
            if (diaNac < 22) {
              return "Escorpio";
            } else {
              return "Sagitario";
            }
            break;
          case 12:
            if (diaNac < 22) {
              return "Sagitario";
            } else {
              return "Capricornio";
            }
            break;
          default:
            return "------";
            break;
        }
      }

      let diff = calcularEdad();
      let signo = detSigno();
      alert(
        "\t" +
          nombre.toUpperCase() +
          " tu edad es " +
          diff +
          " años y tu signo es " +
          signo +
          "."
      );
    }

    if (opcion == 2) {
      let peso = parseInt(prompt("Ingrese su peso en kilogramos..."));
      let altura = parseInt(prompt("Ingrese su altura en centimetros..."));

      function calculaIMC() {
        return parseFloat((peso * 10000) / (altura * altura));
      }

      const imc = calculaIMC().toFixed(1);

      alert("\t" + nombre.toUpperCase() + " tu IMC es " + imc + ".");
    }

    opcion = prompt(
      nombre.toUpperCase() +
        " selecciona la opción según lo que deseas conocer: \n\b 1- Tu edad y Signo. \n\b 2- Tu IMC (indice de masa corporal). \n\b ***  Cualquier otra valor cierra la app  ***"
    );
  }

  if (opcion != 1 && opcion != 2) {
    alert(nombre.toUpperCase() + " esperamos vuelvas pronto!!!");
  }
}
