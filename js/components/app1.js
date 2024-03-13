class gestorFiltro extends HTMLElement {
    constructor() {
        super();
        this.render();
    }
    render(){
        this.innerHTML = /* html*/ `
            <form id="taskform1"class="container-tasks">
            <h2 class="titulo22">¿Qué tipo de App necesitas?</h2>
                <div class="containertasks">
                    <div class="containerInfo">
                        <div class="dates3">
                            <img src="images/answer-2-1.png">
                            <h3 class="titulo2">Aplicación Android</h3>
                        </div>
                        <div class="containerInfo">
                        <div class="dates4">
                            <img src="images/answer-2-2.png">
                            <h3 class="titulo2">Aplicación iOs</h3>
                        </div>
                        <div class="containerInfo">
                        <div class="dates5">
                            <img src="images/answer-2-3.png">
                            <h3 class="titulo2">Aplicación Windows Phone</h3>
                        </div>
                        <div class="dates6">
                            <img src="images/answer-2-4.png">
                            <h3 class="titulo2">Aplicación Android + iOs</h3>
                        </div>
                    </div>
                    <br>
                </div>
            </form>`;
            /* addEventListener() Registra un evento a un objeto en específico.*/
            /*El DOMContentLoadedevento se activa cuando el documento HTML se ha analizado por completo y todos los scripts diferidos*/ 
            document.addEventListener("DOMContentLoaded", function() {
                let formContainer1 = document.getElementById("taskform1");
                formContainer1.style.display = "none"; // Oculta el formulario inicialmente
            
                /* preventDefault Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.*/
                document.getElementById("btnIr1").addEventListener("click", function(event) {
                    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
                    formContainer1.style.display = "block"; // Muestra el formulario al hacer clic en el enlace
            });
        });    
  }
}

customElements.define('gestor-filtro', gestorFiltro);

const taskform = document.querySelector('#taskform1')

const getData = () => {
    const datos = new FormData(taskform1);
    const datosProcesados = Object.fromEntries(datos.entries());

    // Añadir los valores de los elementos select
    datosProcesados.IdMarca = taskform.querySelector('#marca').value;
    datosProcesados.IdCategoria = taskform.querySelector('#categoria').value;

    taskform.reset();
    return datosProcesados;
}
const postData = async () => {
    const newUser = getData();
    console.log('Enviando:', newUser);
    
    try {
        const response = await fetch ('http://154.38.171.54:3001/priceB',{
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        });
        if (response.ok){
            const jsonResponse = await response.json();
            console.log('Respuesta recibida:', jsonResponse);
            const {Id, CodTransaccion, IdMarca} = jsonResponse;
            console.log(`Registro consedido: ${Id}, ${CodTransaccion}, ${IdMarca}`);
        }
    } catch (error){
        console.log(error);
    }
}
// Función para buscar datos por ID
const buscarDatosPorId = async (id) => {
    try {
        const response = await fetch(`http://154.38.171.54:3001/priceB/${id}`);
        if (response.ok) {
            const jsonResponse = await response.json();
            mostrarDatos(jsonResponse); // Mostrar los datos en la página
        } else {
            console.log('Error al buscar datos:', response.status);
        }
    } catch (error) {
        console.log('Error de red:', error);
    }
}

// Función para mostrar los datos en la página
const mostrarDatos = (datos) => {
    const container = document.getElementById('resultados');
    container.innerHTML = ''; // Limpiar resultados anteriores
    const elemento = document.createElement('div');
    elemento.textContent = `ID: ${datos.id}, Código de Transacción: ${datos.CodTransaccion}, Marca: ${datos.IdMarca}, Categoría: ${datos.IdCategoria}, Tipo: ${datos.IdTipo}, Valor Unitario: ${datos.ValorUnitario}, Proveedor: ${datos.IdProveedor}, Número Serial: ${datos.NumeroSerial}, Empresa Responsable: ${datos.IdEmpresaResponsable}, Estado: ${datos.IdEstado}`;
    container.appendChild(elemento);
}

// Agregar evento de clic al botón de búsqueda
document.querySelector("#btnbuscar ").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

    // Mostrar el cuadro de diálogo
    document.getElementById("dialogoBuscar").style.display = "block";
});

// Agregar evento de clic al botón "Aceptar" del cuadro de diálogo
document.getElementById("btnAceptar").addEventListener("click", async function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del botón

    // Obtener el ID ingresado por el usuario
    const id = document.getElementById("idBuscar").value.trim();

    if (id) {
        // Realizar la búsqueda de datos por ID
        await buscarDatosPorId(id);

        // Ocultar el cuadro de diálogo después de buscar los datos
        document.getElementById("dialogoBuscar").style.display = "none";
    } else {
        console.log('ID no válido.');
    }
});

// Agregar evento de clic al botón "Cancelar" del cuadro de diálogo
document.getElementById("btnCancelar").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del botón

    // Ocultar el cuadro de diálogo sin realizar ninguna acción
    document.getElementById("dialogoBuscar").style.display = "none";
});



// Función para eliminar datos por ID en el servidor
const eliminarDatosPorId = async (id) => {
    try {
        const response = await fetch(`http://154.38.171.54:3001/priceB/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log('Datos eliminados exitosamente.');
            alert('Los datos se eliminaron exitosamente.');
        } else {
            console.log('Error al eliminar datos:', response.status);
            alert('Hubo un error al eliminar los datos.');
        }
    } catch (error) {
        console.log('Error de red:', error);
        alert('Hubo un error de red al eliminar los datos.');
    }
}

// Agregar evento de clic al botón de eliminar
document.querySelector(".btonEliminar").addEventListener("click", function(event) {
    event.preventDefault(); 

    // Mostrar el cuadro de diálogo
    document.getElementById("dialogoEliminar").style.display = "block";
});

// Agregar evento de clic al botón "Aceptar" del cuadro de diálogo
document.getElementById("btnAceptar1").addEventListener("click", async function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del botón

    // Obtener el ID ingresado por el usuario
    const id = document.getElementById("idEliminar").value.trim();

    if (id) {
        // Confirmar si el usuario está seguro de eliminar los datos
        const confirmacion = confirm('¿Está seguro de eliminar estos datos?');
        if (confirmacion) {
            // Realizar la eliminación de datos por ID
            await eliminarDatosPorId(id);

            // Ocultar el cuadro de diálogo después de eliminar los datos
            document.getElementById("dialogoEliminar").style.display = "none";

            // Eliminar los datos de la pantalla
            const container = document.getElementById('resultados');
            container.innerHTML = '';
        }
    } else {
        console.log('ID no válido.');
    }
});

// Agregar evento de clic al botón "Cancelar" del cuadro de diálogo
document.getElementById("btnCancelar1").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del botón

    // Ocultar el cuadro de diálogo sin realizar ninguna acción
    document.getElementById("dialogoEliminar").style.display = "none";
});

// Función para obtener los datos por ID desde el servidor
const obtenerDatosPorId = async (id) => {
    try {
        const response = await fetch(`http://154.38.171.54:3001/priceB/${id}`);
        if (response.ok) {
            const jsonResponse = await response.json();
            return jsonResponse;
        } else {
            console.log('Error al buscar datos:', response.status);
            return null;
        }
    } catch (error) {
        console.log('Error de red:', error);
        return null;
    }
};

// Agregar evento de clic al elemento .btnEditar
document.querySelector(".btnEditar").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

    // Mostrar el cuadro de diálogo de edición
    document.getElementById("dialogoEditar").style.display = "block";
});

// Agregar evento de clic al botón "Aceptar" del cuadro de diálogo de edición
document.getElementById("btnAceptar2").addEventListener("click", async function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del botón

    // Obtener el ID ingresado por el usuario
    const id = document.getElementById("idEditar").value.trim();

    if (id) {
        // Obtener los datos por ID desde el servidor
        const datos = await obtenerDatosPorId(id);
        if (datos) {
            // Rellenar los campos del formulario de edición con los datos obtenidos
            document.querySelector('input[name="id"]').value = datos.id;
            document.querySelector('input[name="CodTransaccion"]').value = datos.CodTransaccion;

            // Mostrar el formulario de edición en la pantalla
            document.getElementById("taskform").style.display = "block";

            // Ocultar el cuadro de diálogo de edición después de mostrar los datos para editar
            document.getElementById("dialogoEditar").style.display = "none";
        } else {
            console.log('No se encontraron datos con ese ID.');
        }
    } else {
        console.log('ID no válido.');
    }
});

// Agregar evento de clic al botón de guardar del formulario
taskform.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Enviar los datos al servidor
    const datosGuardados = await postData();
    mostrarDatos(datosGuardados);
});