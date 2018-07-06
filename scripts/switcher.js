console.log('SWTICHER.JS');

let hostname;
browser.tabs.onUpdated.addListener( handleUpdated) ;
browser.tabs.onActivated.addListener( handleActivated );

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
    hostname = currentURL.hostname;
    switchColor();
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function switchColor() {
	var colorMappings = browser.storage.local.get('colorMappings');
	colorMappings.then( function(item) {
		colorMappings = item.colorMappings;
		if ( colorMappings[hostname] ) {
			browser.theme.update( themes[ colorMappings[hostname] ] );
		} else {
      browser.theme.reset();
    }
	}, onError);
}


const themes = {
  'white': {
    colors: {
     accentcolor: '#000',
     textcolor: '#FFF',
    }
  },
  'black': {
    colors: {
     accentcolor: '#FFF',
     textcolor: '#000',
    }
  },
  'blue': {
    colors: {
     accentcolor: '#2257f7',
     textcolor: '#000',
    }
  },
  'red': {
    colors: {
     accentcolor: '#ea070a',
     textcolor: '#000',
    }
  },
  'green': {
    colors: {
     accentcolor: '#11db3d',
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
  'purple': {
    colors: {
     accentcolor: '#a020f0',
     textcolor: '#000',
    }
  },
};




