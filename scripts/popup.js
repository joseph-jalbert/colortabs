const addMapping = document.getElementById('add-mapping'),
		goToOptions = document.getElementById('go-to-options'),
		colors = document.getElementById('color-select');

var colorMappings,
    hostName;

goToOptions.addEventListener( 'click', function() {
	browser.runtime.openOptionsPage();
});

//load saved mappings
var loadMappingsPromise = browser.storage.local.get('colorMappings').then( loadMappings, onError );
//get current hostname
var getHostNamePromise = browser.tabs.query( {currentWindow: true, active: true} ).then( getHostName, onError );

function loadMappings(item) {
  colorMappings = item.colorMappings || {};
}

function getHostName(tabsObject) {
	var currentURL = new URL( tabsObject[0].url );
	hostName = currentURL.hostname;
}

//save mapping
addMapping.addEventListener( 'click', function() {
	colorMappings[hostName] = colors.value;
	browser.storage.local.set( {colorMappings} );
	browser.theme.update(
		{ colors: {
		     accentcolor: colors.value,
		     textcolor: '#000',
		    }
		}
	);
});

//set dropdown to value appropriate value if hostname already saved
Promise.all( [loadMappingsPromise, getHostNamePromise] ).then( function() {
		if ( colorMappings[hostName] ) {
			colors.value = colorMappings[hostName];
		}
}	);

function onError(error) {
  console.log(`Error: ${error}`);
}
