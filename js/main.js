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

function refresh() {
  var $ul = document.querySelector('ul');
  var li;
  var ulLastChild = $ul.lastElementChild;

  while (ulLastChild) {
    $ul.removeChild(ulLastChild);
    ulLastChild = $ul.lastElementChild;
  }
  for (var i = 0; i < data.entries.length; i++) {
    li = createnewEntryLi(data.entries[i]);
    $ul.appendChild(li);
  }
}
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
  refresh();
  // create new entry should return 1 li
  // make variable for ul inside handlesub
  // loop through nd append each li to the ul

  $dataViewEntries[1].className = '';
  $dataViewCreateEntries[0].className = 'hidden';
}

document.addEventListener('DOMContentLoaded', createnewEntryLi);

function createnewEntryLi(entry) {

  return generateDomTree('li', {},
    [generateDomTree('div', { class: 'row' },
      [generateDomTree(
        'div', { class: 'column-half' },
        [generateDomTree('img', { class: 'img-view-entries-size', src: entry.entryPhotoURL })
        ]), generateDomTree(
        'div', { class: 'column-half' },
        [generateDomTree('h3', { textContent: entry.entryTitle, class: 'h3-entry-view' }),
          generateDomTree('div', { class: 'entries-notes-spacing', textContent: entry.entryNotes })
        ])])]);
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
  }
  return element;
}

window.addEventListener('click', handleClick);
var $dataViewEntries = document.querySelectorAll('[data-view=entries]');
var $dataViewCreateEntries = document.querySelectorAll('[data-view=entry-form]');

function handleClick(event) {
  if (event.target.textContent === 'Entries') {
    $dataViewEntries[1].className = '';
    $dataViewCreateEntries[0].className = 'hidden';
  } else if (event.target.matches('.button-new') === true) {
    $dataViewEntries[1].className = 'hidden';
    $dataViewCreateEntries[0].className = '';
  }
}

/*
if i click on entries
create entry page should become hidden
and entry view page should become active

if i click save
the page should not reload
the paage should switch to view entries
the li that you saved should be appended to top of page

*/
