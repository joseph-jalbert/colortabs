console.log('popup.JS', document);

var addMapping = document.getElementById('add-mapping'),
		goToOptions = document.getElementById('go-to-options'),
    colorMappings,
    domain,
    color;

getMappings();

function getMappings() {
  var colorMappingsPromise = browser.storage.local.get('colorMappings');
      colorMappingsPromise.then(onGot, onError);
}

function onGot(item) {
  colorMappings = item.colorMappings || {};
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function saveMapping(tabs) {
	var currentURL = new URL(tabs[0].url);
	domain = currentURL.hostname;
	color = document.getElementById('color-select').value;
	colorMappings[domain] = color;
	browser.storage.local.set({colorMappings});
}

addMapping.addEventListener( 'click', function() {
	browser.tabs.query({currentWindow: true, active: true}).then(saveMapping, onError);
});

goToOptions.addEventListener( 'click', function() {
	browser.runtime.openOptionsPage();
});












