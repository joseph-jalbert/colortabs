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
	browser.storage.local.set({colorMappings});
	browser.theme.update( themes[colors.value] );
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

const themes = {
  'grey': {
    colors: {
     accentcolor: '#000',
     textcolor: '#FFF',
    }
  },
  'white': {
    colors: {
     accentcolor: '#FFF',
     textcolor: '#000',
    }
  },
  'red': {
    colors: {
     accentcolor: '#ff0000',
     textcolor: '#000',
    }
  },
  'orange': {
    colors: {
     accentcolor: '#ffa500',
     textcolor: '#000',
    }
  },
  'yellow': {
    colors: {
     accentcolor: '#ffff00',
     textcolor: '#000',
    }
  },
  'green': {
    colors: {
     accentcolor: '#00ff00',
     textcolor: '#000',
    }
  },
  'dark-green': {
    colors: {
     accentcolor: '#006400',
     textcolor: '#000',
    }
  },
  'blue': {
    colors: {
     accentcolor: '#0E4D92',
     textcolor: '#000',
    }
  },
  'teal': {
    colors: {
     accentcolor: '#008080',
     textcolor: '#000',
    }
  },
  'purple': {
    colors: {
     accentcolor: '#551a8b',
     textcolor: '#000',
    }
  }
};








