const addMapping = document.getElementById('add-mapping'),
	  goToOptions = document.getElementById('go-to-options'),
	  colors = document.getElementById('color-select'),
	  addMappingApp = document.getElementById('add-mapping-app'),
	  colorsApp = document.getElementById('color-select-app')
	  ;

var colorMappings,
    host,
    app;

goToOptions.addEventListener( 'click', function() {
	browser.runtime.openOptionsPage();
});

//get current hostname whenever switching windows, tabs, or navigating to new page
function getHostName() {
	browser.tabs.query( {currentWindow: true, active: true} ).then( setHostName, onError );
}

function setHostName( tabsObject ) {
	var currentURL = new URL( tabsObject[0].url );
	host = currentURL.host;
	var arrPath = currentURL.pathname.split("/");
	app = arrPath[1];
	//match color of input to saved domain
	browser.storage.local.get( 'colorMappings' ).then( function( item ) {
		colorMappings = item.colorMappings || {};
		if ( colorMappings[ host ] ) {
			colors.value = colorMappings[ host ];
		} else {
			colors.value = '#FFFFFF';
		}
		if ( colorMappings[ host +"/"+ app ] ) {
			colorsApp.value = colorMappings[ host +"/"+ app ];
		} else {
			colorsApp.value = '#FFFFFF';
		}		
	});
}

getHostName();

browser.tabs.onUpdated.addListener( handleUpdated) ;
browser.tabs.onActivated.addListener( handleActivated );
browser.windows.onFocusChanged.addListener( handleActivated );

function handleUpdated( tabId, changeInfo, tab ) {
  if( changeInfo.status === 'complete') {
	  getHostName();
  }
}
function handleActivated( e ){
	getHostName();
}

//load saved mappings
browser.storage.local.get('colorMappings').then( loadMappings, onError );

function loadMappings(item) {
  colorMappings = item.colorMappings || {};
}
//save new mapping
addMapping.addEventListener( 'click', function() {
	colorMappings[ host ] = colors.value;
	browser.storage.local.set( {colorMappings} );
	browser.theme.update(
		{ colors: {
		     frame: colors.value,
		     backgroundtext: '#000',
		    }
		}
	);
});

addMappingApp.addEventListener( 'click', function() {
	colorMappings[ host +"/"+ app ] = colorsApp.value;
	browser.storage.local.set( {colorMappings} );
	browser.theme.update(
		{ colors: {
		     frame: colorsApp.value,
		     backgroundtext: '#000',
		    }
		}
	);
});

function onError(error) {
  console.log(`Error: ${error}`);
}
