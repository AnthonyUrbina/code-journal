/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('data value');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

window.addEventListener('beforeunload', handleUnload);

function handleUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data value', dataJSON);
}
