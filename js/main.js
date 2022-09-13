var $form = document.querySelector('form');
var $placeholderImg = document.querySelector('.placeholder-img');
var $photoURL = document.querySelector('#photo-url');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');

$photoURL.addEventListener('input', handleInput);

function handleInput(event) {
  var enteredURL = event.target.value;
  $placeholderImg.setAttribute('src', enteredURL);
}

$form.addEventListener('submit', handleSubmit);

var newEntry = {};

function handleSubmit(event) {
  newEntry = {
    entryTitle: $title.value,
    entryPhotoURL: $photoURL.value,
    entryNotes: $notes.value,
    entry: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  event.preventDefault();
  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

window.addEventListener('beforeunload', handleUnload);

function handleUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data value', dataJSON);
}
