function handleUpdated(tabId, changeInfo, tab) {
  if( changeInfo.status === 'complete') {
  	browser.tabs.query({currentWindow: true, active: true}).then(logTabs, onError);
  }
}

function handleActivated(e){
	browser.tabs.query({currentWindow: true, active: true}).then(logTabs, onError);
}

function logTabs(tabs) {
    let tab = tabs[0];
    console.log(tab.url);
}

function onError(err){
    console.error(err);
}

browser.tabs.onUpdated.addListener(handleUpdated);
browser.tabs.onActivated.addListener(handleActivated);




