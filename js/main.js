var $form = document.querySelector('form');
var $placeholderImg = document.querySelector('.placeholder-img');
var $photoURL = document.querySelector('#photo-url-entry-form');
var $title = document.querySelector('#title-entry-form');
var $notes = document.querySelector('#notes-entry-form');
var $ul = document.querySelector('ul');
var $h2NewEntriesTitle = document.querySelector('#new-entries-title');
var $h2EditEntryTitle = document.querySelector('#edit-entry-title');
$photoURL.addEventListener('input', handleInput);

function handleInput(event) {
  var enteredURL = event.target.value;
  $placeholderImg.setAttribute('src', enteredURL);
}

$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  if ($h2NewEntriesTitle.className === '') {
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

    var newEntryDomTree = createNewEntryLi(newEntry);
    $ul.prepend(newEntryDomTree);
  } else if ($h2EditEntryTitle.className === '') {
    data.editing.entryTitle = $title.value;
    data.editing.entryPhotoURL = $photoURL.value;
    data.editing.entryNotes = $notes.value;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entry === data.entries[i].entry) {
        data.entries[i] = data.editing;
        newEntryDomTree = createNewEntryLi(newEntry);
        // $ul.replaceChild(newEntryDomTree, )
        //  YOU WERE FIGURING OUT HOW TO USE REPLACE CHILD
        // GET NODE LIST DOCUMENT.QUEEARYSELECTORSLL('[data-entry-id[0]]') AND FIGURE OUT HOW TO GET THE EXACT LI
        // console.log('data.editing', data.editing);
        // console.log('data.entries[i]', data.entries[i]);
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

// set attriute data-entry-id = newEntryId to each new li
// listen for clicks onparent elemement of all rendered entries aka add event listener on the ul
// if edit icon is clicked show the form
// also, find the matching entry object in the data model and assign it to editing property if an edit item was clicked
// basically, you'll run a for loop thats the length of entries so u can look through each one until you find the one with the entry id property
// that matches the id property of the parent li of the button that was clicked (refer to dom delegation if u have to)
// then, prepopulate the entry form with the clicked entries values from the object found in the data model
// so by clicking on it, i can see which li its a part of, thus i can look inside of it, thus i can pull the data from there and insert it into my values for the edit box

// update submit handler function to conditionally add a new entry object or update the existing one
// under what conditions would you add a new entry object??
// well to answet that you would have to log the +/- of  adding a new object vs updating the existing object
// ok so lets assume im fine doing it the way that im doing now
// we have a submit listener on the form that's really listening for the button to be clicked
// once that happens a question is going to need to be answered
// since new entry AND edit share the same page
// is the data on the screen new data OR is it edited data?
// an easy way to tell will be to check the title,
// if the titles value is 'new entry', then you will act as if it is a new object
// if the titles value is 'edit entry' then you will act as if it isn't and thus you will edit the already existing data
// okay scrap that ^ do this v instead
// if data.entries.editing = null  then do nothing, but if its not empty then do what?
// well what do you want to happen?
// if it's not null then i want to assign the values in the input boxes to the properties in the object that they originated from
// when i submit i want to save the data to the corresponding object
// how do i get the correspoding object
