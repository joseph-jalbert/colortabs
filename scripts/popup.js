const addMapping = document.getElementById('add-mapping'),
		goToOptions = document.getElementById('go-to-options'),
		colors = document.getElementById('color-select');

var colorMappings,
    hostName;

goToOptions.addEventListener( 'click', function() {
	browser.runtime.openOptionsPage();
});

//get current hostname whenever switching windows, tabs, or navigating to new page

function getHostName() {
	browser.tabs.query( {currentWindow: true, active: true} ).then( setHostName, onError );
}

function setHostName(tabsObject) {
	var currentURL = new URL( tabsObject[0].url );
	hostName = currentURL.hostname;
}

getHostName();

browser.tabs.onUpdated.addListener( handleUpdated) ;
browser.tabs.onActivated.addListener( handleActivated );
browser.windows.onFocusChanged.addListener( handleActivated );

function handleUpdated(tabId, changeInfo, tab) {
  if( changeInfo.status === 'complete') {
	  getHostName()
  }
}
function handleActivated(e){
	getHostName()
}

//load saved mappings
browser.storage.local.get('colorMappings').then( loadMappings, onError );

function loadMappings(item) {
  colorMappings = item.colorMappings || {};
}
//save new mapping
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

function onError(error) {
  console.log(`Error: ${error}`);
}
