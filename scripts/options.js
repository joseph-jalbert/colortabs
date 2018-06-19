console.log('OPTIONS.JS');
browser.runtime.openOptionsPage();

var colorMappingsPromise = browser.storage.local.get('colorMappings'),
    mappingForm = document.getElementById('mapping-input'),
    colorMappings;

    colorMappingsPromise.then(onGot, onError);
//browser.storage.local.get('colorMappings') || 
// mappings.forEach( function(m) {
//     mappingForm.insertBefore
// });

function onGot(item) {
  console.log('onGot');
  console.log(item);
  colorMappings = item.colorMappings || {};

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
    // document.getElementById('settings').appendChild( newRow );
  }
}


function onError(error) {
  console.log(`Error: ${error}`);
}

document.addEventListener( 'click', function(e) {
  if (e.target.id === 'color-mapping-button') {
    console.log('save stuff w/ storage API!');

    var color = document.getElementById('color-select').value,
        domain = document.getElementById('color-mapping-domain').value;
    colorMappings[domain] = color;
    // console.log(domain);
    // console.log(color);
    // console.log(colorMappings);
    browser.storage.local.set({colorMappings});
  }

});








