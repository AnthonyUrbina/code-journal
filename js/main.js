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

function handleSubmit(event) {
  var newEntry = {
    entryTitle: $title.value,
    entryPhotoURL: $photoURL.value,
    entryNotes: $notes,
    entry: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  event.preventDefault();
  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $title.value = '';
  $notes.value = '';
  $photoURL.value = '';

  return newEntry;
}
