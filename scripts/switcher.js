var hostName;

browser.tabs.onUpdated.addListener( handleUpdated) ;
browser.tabs.onActivated.addListener( handleActivated );
browser.windows.onFocusChanged.addListener( handleActivated );

function handleUpdated(tabId, changeInfo, tab) {
  if( changeInfo.status === 'complete') {
  	browser.tabs.query({currentWindow: true, active: true}).then(getURL, onError);
  }
}

function handleActivated(e){
	browser.tabs.query({currentWindow: true, active: true}).then(getURL, onError);
}

function getURL(tabs) {
    var currentURL = new URL(tabs[0].url);
    hostName = currentURL.hostname;
    switchColor();
}

function switchColor() {
	var colorMappings = browser.storage.local.get('colorMappings');
	colorMappings.then( function(item) {
		colorMappings = item.colorMappings || {};
		if ( colorMappings[hostName] ) {
			browser.theme.update( { colors: {
    		     accentcolor: colorMappings[hostName],
    		     textcolor: '#000',
    		    }
    		} );
		} else {
      browser.theme.reset();
    }
	}, onError);
}

//open sidebar from Toolbar Button (aka browser action)
browser.browserAction.onClicked.addListener( function() {
	browser.sidebarAction.open();
} );

function onError(error) {
  console.log(`Error: ${error}`);
}
