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
  var $ul = document.querySelector('ul');
  var newEntryDomTree = createNewEntryLi(newEntry);
  $ul.prepend(newEntryDomTree);
  viewSwap();

}

function viewSwap() {
  if (data.view === 'entries') {
    $dataViewEntries[1].className = '';
    $dataViewEntryForm[0].className = 'hidden';
  } else if (data.view === 'entry-form') {
    $dataViewEntries[1].className = 'hidden';
    $dataViewEntryForm[0].className = '';

  }
}

document.addEventListener('DOMContentLoaded', preExistingEntries);

function preExistingEntries(entry) {
  var $ul = document.querySelector('ul');
  var li;
  for (var i = 0; i < data.entries.length; i++) {
    li = createNewEntryLi(data.entries[i]);
    $ul.appendChild(li);
  }
  viewSwap();

}
function createNewEntryLi(entry) {
  return generateDomTree(
    'li',
    {},
    [generateDomTree(
      'div',
      { class: 'row' },
      [generateDomTree(
        'div',
        { class: 'column-half' },
        [generateDomTree(
          'img',
          { class: 'img-view-entries-size', src: entry.entryPhotoURL })]),
      generateDomTree(
        'div',
        { class: 'column-half' },

        [generateDomTree(
          'div',
          { class: 'h3-icon-flex' },
          [generateDomTree(
            'h3',
            { textContent: entry.entryTitle, class: 'h3-entry-view' }),
          generateDomTree('i', { class: 'fa-solid fa-pen-to-square' })]),
        // [generateDomTree(
        //   'h3',
        //   { textContent: entry.entryTitle, class: 'h3-entry-view' }),
        generateDomTree(
          'div',
          { class: 'entries-notes-spacing', textContent: entry.entryNotes })
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
var $dataViewEntryForm = document.querySelectorAll('[data-view=entry-form]');

function handleClick(event) {
  if (event.target.textContent === 'Entries') {
    $dataViewEntries[1].className = '';
    $dataViewEntryForm[0].className = 'hidden';
    data.view = 'entries';
  } else if (event.target.matches('.button-new') === true) {
    $dataViewEntries[1].className = 'hidden';
    $dataViewEntryForm[0].className = '';
    data.view = 'entry-form';
  } else if (event.target.matches('#button-save') === true) {
    data.view = 'entries';

  }
}
