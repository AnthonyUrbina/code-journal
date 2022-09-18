var $form = document.querySelector('form');
var $placeholderImg = document.querySelector('.placeholder-img');
var $photoURL = document.querySelector('#photo-url-entry-form');
var $title = document.querySelector('#title-entry-form');
var $notes = document.querySelector('#notes-entry-form');
var $ul = document.querySelector('ul');
var $h2NewEntriesTitle = document.querySelector('#new-entries-title');
var $h2EditEntryTitle = document.querySelector('#edit-entry-title');
// var deleteEntryButton = document.querySelector('.delete-entry');

$photoURL.addEventListener('input', handleInput);

function handleInput(event) {
  var enteredURL = event.target.value;
  $placeholderImg.setAttribute('src', enteredURL);
}

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  if (data.editing === null) {
    var newEntry = {
      entryTitle: $title.value,
      entryPhotoURL: $photoURL.value,
      entryNotes: $notes.value,
      entry: data.nextEntryId
    };

    data.nextEntryId++;
    data.entries.unshift(newEntry);
    $placeholderImg.src = 'css/images/placeholder-image-square.jpg';
    $form.reset();

    var newEntryDomTree = createNewEntryLi(newEntry);
    $ul.prepend(newEntryDomTree);
  } else if (data.editing !== null) {
    var $allLi = document.querySelectorAll('li');
    data.editing.entryTitle = $title.value;
    data.editing.entryPhotoURL = $photoURL.value;
    data.editing.entryNotes = $notes.value;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entry === data.entries[i].entry) {
        data.entries[i] = data.editing;
        newEntryDomTree = createNewEntryLi(data.editing);
        $ul.replaceChild(newEntryDomTree, $allLi[i]);
      }
    }
  }
  viewSwap();

}

function viewSwap() {
  if (data.view === 'entries') {
    $dataViewEntries[1].className = '';
    $dataViewEntryForm[0].className = 'hidden';
    $h2NewEntriesTitle.className = '';
  } else if (data.view === 'entry-form') {
    $dataViewEntries[1].className = 'hidden';
    $dataViewEntryForm[0].className = '';
  }
}

document.addEventListener('DOMContentLoaded', preExistingEntries);

function preExistingEntries(event) {
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
    { 'data-entry-id': entry.entry },
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
    $form.reset();
    $placeholderImg.src = 'css/images/placeholder-image-square.jpg';
  } else if (event.target.matches('.button-new') === true) {
    $dataViewEntries[1].className = 'hidden';
    $dataViewEntryForm[0].className = '';
    data.view = 'entry-form';
    $h2NewEntriesTitle.className = '';
    $h2EditEntryTitle.className = 'hidden';
    data.editing = null;
  } else if (event.target.matches('#button-save-entry-form') === true) {
    data.view = 'entries';
  } else if (event.target.matches('.fa-solid') === true) {
    $dataViewEntries[1].className = 'hidden';
    $dataViewEntryForm[0].className = '';
    data.view = 'entry-form';
    $h2EditEntryTitle.className = '';
    $h2NewEntriesTitle.className = 'hidden';

  }
}
$ul.addEventListener('click', handleEditIconClick);
$ul.addEventListener('click', getEditClickParentLi);

function getEditClickParentLi(event) {
  var iconClosestLi = event.target.closest('[data-entry-id]');
  if (event.target.tagName === 'I') {
    var editLiId = parseInt(iconClosestLi.dataset.entryId);
  }
  return editLiId;
}

function handleEditIconClick(event) {
  var iconClosestLi = event.target.closest('[data-entry-id]');
  if (event.target.tagName === 'I') {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entry === parseInt(iconClosestLi.dataset.entryId)) {
        data.editing = data.entries[i];
        $placeholderImg.src = data.editing.entryPhotoURL;
        $photoURL.value = data.editing.entryPhotoURL;
        $title.value = data.editing.entryTitle;
        $notes.value = data.editing.entryNotes;
      }
    }
  }
}
