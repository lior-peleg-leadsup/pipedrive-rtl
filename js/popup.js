'use strict';


document.addEventListener('DOMContentLoaded', function () {


var enabled = true; //enabled by default
var toggleBtn = document.getElementById('toggle');

toggleBtn.onclick = () => {
    enabled = !enabled;
    toggleBtn.textContent = enabled ? 'Disable' : 'Enable';
    chrome.storage.local.set({enableRTL:enabled});

    var code = 'window.location.reload();';
    chrome.tabs.executeScript({code: code});

    window.close();
};


chrome.storage.local.get('enableRTL', data => {
    enabled = (data.enableRTL == true || data.enableRTL === undefined) ? true : false;
    toggleBtn.textContent = enabled ? 'Disable' : 'Enable';
});


//Pipeline RTL or LTR (1=RTL, 2=LTR)
var versionRadio = document.getElementsByName('version');
chrome.storage.local.get('version', data => {  
  var checkedVersion = data.version === undefined ? 1 : data.version;

  for (var i = 0; i < versionRadio.length; i++) {
  
    if(versionRadio[i].id == checkedVersion){
      versionRadio[i].checked = true;
    }
    else
    {
      versionRadio[i].checked = false;
    }

    
    versionRadio[i].addEventListener('click', changeVersion);
  }
});



function changeVersion(e){

  var version = document.querySelector("input[name=version]:checked").value;
  chrome.storage.local.set({version:version});

  var code = 'window.location.reload();';
  chrome.tabs.executeScript({code: code});

  window.close();

// if(version == 1){ //rtl for pipelineSummary
//   chrome.tabs.insertCSS({file: "pipedrive-rtl-pipelineSummary.css"});
// }
// else
// { //pipedrive-ltr-basic for pipelineSummary
//   chrome.tabs.insertCSS({file: "pipedrive-ltr-pipelineSummary.css"});
// }
  
}

});
