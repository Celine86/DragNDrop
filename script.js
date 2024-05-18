// ECRAN TACTILE
// Fonction pour gérer le drag'n'drop tactile
function handleTouchStart(e) {
  const touch = e.touches[0];
  const target = e.target;
  // Calculer les différences entre la position de l'élément et le point de contact
  const rect = target.getBoundingClientRect();
  const offsetX = touch.clientX - rect.left;
  const offsetY = touch.clientY - rect.top;
  // Stocker les données de l'élément en cours de déplacement
  target.setAttribute("data-offsetX", offsetX);
  target.setAttribute("data-offsetY", offsetY);
  // Passer la position de l'élément à absolute afin de le placer au-dessus des autres éléments
  target.style.position = "absolute";
  // Stocker la position de défilement de la page
  target.setAttribute("data-scrollX", window.scrollX);
  target.setAttribute("data-scrollY", window.scrollY);
  // Déplacer l'élément sous le doigt
  target.style.left = touch.clientX - offsetX + "px";
  target.style.top = touch.clientY - offsetY + "px";
}
function handleTouchMove(e) {
  const touch = e.touches[0];
  const target = e.target;
  // Obtenir les données de déplacement de l'élément
  const offsetX = parseFloat(target.getAttribute("data-offsetX"));
  const offsetY = parseFloat(target.getAttribute("data-offsetY"));
  // Calculer les nouvelles positions en fonction du déplacement du doigt et de la position de défilement
  const newX = touch.clientX - offsetX + window.scrollX;
  const newY = touch.clientY - offsetY + window.scrollY;
  // Déplacer l'élément
  target.style.left = newX + "px";
  target.style.top = newY + "px";
  // Désactiver le scroll auto en n'appelant pas e.preventDefault
  // e.preventDefault();
}
function handleTouchEnd(e) {
  const target = e.target;
  // Supprimer les données de déplacement de l'élément
  target.removeAttribute("data-offsetX");
  target.removeAttribute("data-offsetY");
  // Passer la position de l'élément à static afin de l'intégrer à son parent
  target.style.position = "static";
  // Obtenir la zone de drop ciblée
  const dropzones = document.querySelectorAll(".dropzone");
  const touch = e.changedTouches[0];
  const dropzone = [...dropzones].find((zone) => {
    const rect = zone.getBoundingClientRect();
    return (
      touch.clientX >= rect.left &&
      touch.clientX <= rect.right &&
      touch.clientY >= rect.top &&
      touch.clientY <= rect.bottom
    );
  });
  // Si une zone de drop est trouvée, ajouter l'élément à cette zone
  if (dropzone && dropzone !== target.parentElement) {
    dropzone.appendChild(target);
  }
}
// Ajouter des gestionnaires d'événements tactiles aux éléments draggable
const touchscreendraggables = document.querySelectorAll(".draggable");
touchscreendraggables.forEach((draggable) => {
  draggable.addEventListener("touchstart", handleTouchStart);
  draggable.addEventListener("touchmove", handleTouchMove, { passive: true });
  draggable.addEventListener("touchend", handleTouchEnd);
});


/*
// SOURIS
// Fonction pour gérer le drag'n'drop
function handleDragStart(e) {
  // Ajouter des données à l'événement drag
  e.dataTransfer.setData("text/plain", e.target.id);
}
function handleDragOver(e) {
  // Empêcher le comportement par défaut qui annulerait le drop
  e.preventDefault();
  // Définir le comportement du curseur pendant le dragover
  e.dataTransfer.dropEffect = "move";
}
function handleDrop(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  const draggableElement = document.getElementById(data);
  const dropzone = e.target;
  // Vérifier si la case de drop est autorisée (cases 2 à 8) et que l'élément provient de dropzone1
  if (dropzone.classList.contains("dropzone") && !dropzone.classList.contains("dropzone1")) {
    // Déplacer l'élément vers la cible
    dropzone.appendChild(draggableElement);
  }
}
// Ajouter des gestionnaires d'événements aux éléments draggable
const mousedraggables = document.querySelectorAll(".draggable");
mousedraggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", handleDragStart);
});
// Ajouter des gestionnaires d'événements aux éléments dropzone
const mousedropzones = document.querySelectorAll(".dropzone");
mousedropzones.forEach((dropzone) => {
  dropzone.addEventListener("dragover", handleDragOver);
  dropzone.addEventListener("drop", handleDrop);
});
*/