console.log('OPTIONS.JS');

browser.runtime.openOptionsPage();

var settingsTable = document.getElementById('settings'),
    addMapping = document.getElementById('color-mapping-button'),
    colorMappings;

getMappings();

//render all saved mappings

function renderMappings( mode ) {
  for (domain in colorMappings) {
    var newRow = `
        <tr id="${ domain }">
            <td>${ domain }</td>
            <td>${ colorMappings[domain] }</td>
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

addMapping.addEventListener( 'click', function() {

    var color = document.getElementById('color-select').value,
        domain = document.getElementById('color-mapping-domain').value;
    colorMappings[domain] = color;
    browser.storage.local.set({colorMappings});
    
    var newRow  = settingsTable.insertRow(-1);
      newRow.id = domain;
      newCell = newRow.insertCell(-1).insertAdjacentHTML( 'beforeend', domain );
      newCell = newRow.insertCell(-1).insertAdjacentHTML( 'beforeend', colorMappings[domain] );
      newCell = newRow.insertCell(-1).insertAdjacentHTML( 'beforeend', '<button class="delete">delete</button>' );

});

settingsTable.addEventListener( 'click', function(e) {
  var domain;
  if ( e.target.className === 'delete' ) {
    domain = e.target.parentElement.parentElement.id;
    //remove row from DOM and entry for mappings object
    e.target.parentElement.parentElement.remove();
    delete colorMappings[domain];
    browser.storage.local.set({colorMappings});
  }
});









