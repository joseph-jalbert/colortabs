

let url;
browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	url = tab.url;
    if (url !== undefined && changeInfo.status == "complete") {
    	alert(url);
    	changeColor();
	}    
});

browser.tabs.onActivated.addListener(function(evt){ 
  browser.tabs.get(evt.tabId, function(tab){ 
    url = tab.url;
    alert(url);
    changeColor();
  }); 
});


function changeColor() {

}














