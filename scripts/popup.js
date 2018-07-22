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

//TODO show user confimation of save and immediately change
function saveMapping(tabs) {
	var currentURL = new URL(tabs[0].url);
	domain = currentURL.hostname;
	color = document.getElementById('color-select').value;
	colorMappings[domain] = color;
	browser.storage.local.set({colorMappings});
	browser.theme.update( themes[color] );
}

addMapping.addEventListener( 'click', function() {
	browser.tabs.query({currentWindow: true, active: true}).then(saveMapping, onError);
});

goToOptions.addEventListener( 'click', function() {
	browser.runtime.openOptionsPage();
});

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












