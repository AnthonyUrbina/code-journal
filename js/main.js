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
  event.preventDefault();

  var newEntry = {
    entryTitle: $title.value,
    entryPhotoURL: $photoURL.value,
    entryNotes: $notes.value,
    entry: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $placeholderImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

document.addEventListener('DOMContentLoaded', createnewEntryLi);

function createnewEntryLi(entry) {

  for (var i = 0; i < data.entries.length; i++) {
    generateDomTree('li', {},
      [generateDomTree('div', { class: 'row' },
        [generateDomTree(
          'div', { class: 'column-half' },
          [generateDomTree('img', { class: 'img-view-entries-size', src: data.entries[i].entryPhotoURL })
          ]), generateDomTree(
          'div', { class: 'column-half' },
          [generateDomTree('h3', { textContent: data.entries[i].entryTitle }),
            generateDomTree('div', { class: 'entries-notes-spacing', textContent: data.entries[i].entryNotes })
          ])])]);
  }

}

function generateDomTree(tagName, attributes, children) {
  if (!children) {
    children = [];
  }
  var element = document.createElement(tagName);
  for (var key in attributes) {
    if (key === 'textContent') {
      element.textContent = attributes.textContent;
    } else {
      element.setAttribute(key, attributes[key]);
    }
  }
  for (var i = 0; i < children.length; i++) {
    element.appendChild(children[i]);
    var $ul = document.querySelector('ul');
    $ul.appendChild(element);
  }
  return element;
}
