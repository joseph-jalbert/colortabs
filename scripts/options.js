var settingsTable = document.getElementById('settings'),
    colorMappings;

//render saved mappings
function renderMappings() {
    var rowsHTML = ``;
    for (hostName in colorMappings) {
        rowsHTML += `
            <tr id="${ hostName }">
                <td>${ hostName }</td>
                <td style="background-color: ${ colorMappings[hostName] }">${ colorMappings[hostName] }</td>
                <td><button class="delete">delete</button></td>
            </tr>
        `;
    }
    settingsTable.innerHTML = rowsHTML;
}

function getMappings() {
    browser.storage.local.get('colorMappings').then(onGot, onError);
}

async function onGot(item) {
    colorMappings = item.colorMappings || {};
    await renderMappings();
}

getMappings();

settingsTable.addEventListener( 'click', function(e) {
    var hostName;
    if ( e.target.className === 'delete' ) {
        hostName = e.target.parentElement.parentElement.id;
        //remove row from DOM and entry from mappings object
        e.target.parentElement.parentElement.remove();
        delete colorMappings[hostName];
        browser.storage.local.set({colorMappings});
    }
});

let exportButton = document.getElementById('exportButton'),
    exportLink = document.getElementById('exportLink');

exportButton.onclick = function() {
    browser.storage.local.get('colorMappings').then( (mappings) => {
        let exportJSON = JSON.stringify( mappings, null, 4 ),
            blob = new Blob( [exportJSON], {type: 'octet/stream'} ),
            exportURL = window.URL.createObjectURL( blob );

        browser.downloads.download( { url: exportURL, filename: 'color-tabs-saved-entries.json', saveAs: true } );
    });
};

//reload script when switching to options page tab, so list will always be fresh
browser.tabs.onActivated.addListener( handleActivated );
browser.windows.onFocusChanged.addListener( handleActivated );

function handleActivated() {
	browser.tabs.query({currentWindow: true, active: true}).then(getURL, onError);
}

function getURL(tabs) {
    var currentURL = new URL(tabs[0].url);
    if ( currentURL.href = "about:addons" ) {
        getMappings();
    }
}

function onError(error) {
    console.log( `Error: ${error}` );
}
