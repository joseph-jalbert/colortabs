console.log('OPTIONS.JS', document);

var settingsTable = document.getElementById('settings'),
    colorMappings;

getMappings();

//render saved mappings
function renderMappings( mode ) {
  for (domain in colorMappings) {
    var newRow = `
        <tr id="${ domain }">
            <td>${ domain }</td>
            <td class="${ colorMappings[domain] }">${ colorMappings[domain] }</td>
            <td><button class="delete">delete</button></td>
        </tr>
    `;
    settingsTable.insertAdjacentHTML( 'beforeend', newRow );
  }
}

function getMappings() {
  var colorMappingsPromise = browser.storage.local.get('colorMappings');
      colorMappingsPromise.then(onGot, onError);
}

function onGot(item) {
  colorMappings = item.colorMappings || {};
  renderMappings();  
}

function onError(error) {
  console.log(`Error: ${error}`);
}

settingsTable.addEventListener( 'click', function(e) {
  var domain;
  if ( e.target.className === 'delete' ) {
    domain = e.target.parentElement.parentElement.id;
    //remove row from DOM and entry from mappings object
    e.target.parentElement.parentElement.remove();
    delete colorMappings[domain];
    browser.storage.local.set({colorMappings});
  }
});









