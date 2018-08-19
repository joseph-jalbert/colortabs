var settingsTable = document.getElementById('settings'),
    colorMappings;

getMappings();

//render saved mappings
function renderMappings( mode ) {
  for (hostName in colorMappings) {
    var newRow = `
        <tr id="${ hostName }">
            <td>${ hostName }</td>
            <td style="background-color: ${ colorMappings[hostName] }">${ colorMappings[hostName] }</td>
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

settingsTable.addEventListener( 'click', function(e) {
  var hostName;
  if ( e.target.className === 'delete' ) {
    hostName = e.target.parentElement.parentElement.id;
    //remove row from DOM and entry from mappings object
    e.target.parentElement.parentElement.remove();
    delete colorMappings[hostName];
    browser.storage.local.set({colorMappings});
  }
});

function onError(error) {
  console.log(`Error: ${error}`);
}
