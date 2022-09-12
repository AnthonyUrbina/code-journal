var $photoURLInput = document.querySelector('form');
var $placeholderImg = document.querySelector('.placeholder-img');

$photoURLInput.addEventListener('input', handleInput);

function handleInput(event) {
  $placeholderImg.setAttribute('src', event.target.value);
}
