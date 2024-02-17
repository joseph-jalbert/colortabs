var host,
  hostname,
  port,
  href;

browser.tabs.onUpdated.addListener(handleUpdated);
browser.tabs.onActivated.addListener(handleActivated);
browser.windows.onFocusChanged.addListener(handleActivated);

function handleUpdated(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    browser.tabs.query({ currentWindow: true, active: true }).then(getURL, onError);
  }
}

function handleActivated(e) {
  browser.tabs.query({ currentWindow: true, active: true }).then(getURL, onError);
}

function getURL(tabs) {
  var currentURL = new URL(tabs[0].url);

  host = currentURL.host;
  hostname = currentURL.hostname;
  port = currentURL.port;
  href = currentURL.href;

  switchColor();
}

function changeTheme(color) {
  browser.theme.update({
    colors: {
      frame: color,
      backgroundtext: '#000',
    }
  });
}

function switchColor() {
  var colorMappings = browser.storage.local.get('colorMappings');
  colorMappings.then(function (item) {
    colorMappings = item.colorMappings || {};

    let foundMatch = false;

    // iterate through all mappings with regexps
    for (let hostRegexpString of Object.entries(colorMappings).filter(entry => entry[1].regexp).map(x => x[0])) {
      let hostRegexp = new RegExp(hostRegexpString);

      console.log(href);

      if (href.match(hostRegexp)) {
        changeTheme(colorMappings[hostRegexpString].color);
        foundMatch = true;
        break;
      }
    }

    // if we didn't had a match, try the simple mappings
    if (!foundMatch) {
      if ( colorMappings[ host ] ) {
        changeTheme( colorMappings[host] );
      } else if ( port.length !== 0 && colorMappings[ hostname ] ) {
        changeTheme( colorMappings[hostname] );
      } else {
        browser.theme.reset();
      }
    }
  }, onError);
}

//open sidebar from Toolbar Button (aka browser action)
browser.browserAction.onClicked.addListener(function () {
  browser.sidebarAction.open();
});

function onError(error) {
  console.log(`Error: ${error}`);
}
