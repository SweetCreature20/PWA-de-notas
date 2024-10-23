// Al cargar la página, obtén las notas guardadas en localStorage y muestralas.

document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('noteForm'); // Formulario para agregar notas
    const noteInput = document.getElementById('noteInput'); // Campo de texto   para la nueva nota
    const noteList = document.getElementById('notesContainer'); // Contenedor


// Función para mostrar las notas guardadas
function displayNotes() {
    noteList.innerHTML = ''; // Limpia el contenedor antes de mostrar las notas
    const notes = JSON.parse(localStorage.getItem('notes')) || []; // Obtiene las notas de localStorage
    notes.forEach((note, index) => {

    const noteElement = document.createElement('div'); // Crea un contenedor para cada nota
    noteElement.classList.add('note'); // Agrega una clase CSS para estilizar la nota
    noteElement.textContent = note; // Establece el contenido de la nota
    noteList.appendChild(noteElement); // Añade la nota al contenedor
    });
}
// Agregar nueva nota y guardarla en localStorage

    noteForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    const newNote = noteInput.value.trim(); // Obtiene el valor de la nota, eliminando espacios en blanco

    if (newNote !== '') {

// Si la nota no está vacia, procede a guardarla

    const notes = JSON.parse(localStorage.getItem('notes')) || []; //Obtiene las notas existentes de localStorage
    notes.push(newNote); // Añade la nueva nota al array

    // Guardar las notas actualizadas en localStorage

    localStorage.setItem('notes', JSON.stringify(notes));

    // Limpiar el campo de entrada 
    noteInput.value = "";

    // Volver a mostrar las notas actualizadas 
    displayNotes();

} else {
    // Si la nota está vacía, muestra una alerta
    alert("Por favor, escribe algo antes de agregar la nota.");
  }
});

// Llama a displayNotes al cargar la página para mostrar las notas ya guardadas

displayNotes();

});