let currentURL;

function handleUpdated(tabId, changeInfo, tab) {
  if( changeInfo.status === 'complete') {
  	browser.tabs.query({currentWindow: true, active: true}).then(getURL, onError);
  	// console.log('updated', currentURL)
  }
}

function handleActivated(e){
	browser.tabs.query({currentWindow: true, active: true}).then(getURL, onError);
}

function getURL(tabs) {
    currentURL = tabs[0].url;
    switchColor();
}

function onGot(item) {
  console.log(item);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function switchColor() {
	var colorMappings = browser.storage.local.get();
	// colorMappings.then(onGot, onError);
	// console.log('swithcing maybe...');

	if ( colorMappings.currentURL ) {
		browser.theme.update( themes[ colorMappings.currentURL ] );
	} else {
	}
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

browser.tabs.onUpdated.addListener(handleUpdated);
browser.tabs.onActivated.addListener(handleActivated);

//todo dont' use 'then'




