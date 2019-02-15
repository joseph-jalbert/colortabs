var host,
    hostname,
    port;

browser.tabs.onUpdated.addListener( handleUpdated) ;
browser.tabs.onActivated.addListener( handleActivated );
browser.windows.onFocusChanged.addListener( handleActivated );

function handleUpdated(tabId, changeInfo, tab) {
  if( changeInfo.status === 'complete') {
  	browser.tabs.query({currentWindow: true, active: true}).then(getURL, onError);
  }
}

function handleActivated( e ){
	browser.tabs.query({currentWindow: true, active: true}).then(getURL, onError);
}

function getURL( tabs ) {
    var currentURL = new URL( tabs[0].url );

    host = currentURL.host;
    hostname = currentURL.hostname;
    port = currentURL.port;

    switchColor();
}

function changeTheme( entry, mappings ) {
  browser.theme.update( { colors: {
     frame: mappings[ entry ],
     backgroundtext: '#000',
    }
  });
}

function switchColor() {
	var colorMappings = browser.storage.local.get( 'colorMappings' );
	colorMappings.then( function( item ) {
		colorMappings = item.colorMappings || {};
		if ( colorMappings[ host ] ) {
		  changeTheme( host, colorMappings );
		} else if ( port.length !== 0 && colorMappings[ hostname ] ) {
      changeTheme( hostname, colorMappings );
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
