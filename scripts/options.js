console.log('OPTIONS.JS');
console.log(document);
console.log(window);

browser.runtime.openOptionsPage();

var settingsTable = document.getElementById('settings'),
    addMapping = document.getElementById('color-mapping-button'),
    colorMappings;

getMappings();

//render all saved mappings

function renderMappings( mode ) {
  for (domain in colorMappings) {
    console.log('looping...');
    var newRow = `
        <tr class="color-mapping">
            <td>${ domain }</td>
            <td>${ colorMappings[domain] }</td>
            <td><button class="delete">delete</button></td>
        </tr>
    `;
    console.log(newRow);
    console.log(settingsTable);

    settingsTable.insertAdjacentHTML( 'beforeend', newRow );
  }
}


function getMappings() {
  var colorMappingsPromise = browser.storage.local.get('colorMappings');
      colorMappingsPromise.then(onGot, onError);
}

function onGot(item) {
  console.log('onGot');
  colorMappings = item.colorMappings || {};
  renderMappings();  
}

function onError(error) {
  console.log(`Error: ${error}`);
}

addMapping.addEventListener( 'click', function(e) {
    console.log('save stuff w/ storage API!');

    var color = document.getElementById('color-select').value,
        domain = document.getElementById('color-mapping-domain').value;
    colorMappings[domain] = color;
    browser.storage.local.set({colorMappings});
    
    var newRow  = settingsTable.insertRow(-1);
      newCell = newRow.insertCell(-1).insertAdjacentHTML( 'beforeend', domain );
      newCell = newRow.insertCell(-1).insertAdjacentHTML( 'beforeend', colorMappings[domain] );
      newCell = newRow.insertCell(-1).insertAdjacentHTML( 'beforeend', '<button class="delete">delete</button>' );

});









