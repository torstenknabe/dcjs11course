let colorInput = document.getElementById("color-input")
let changeColor = document.getElementById("changeColor")

chrome.storage.sync.get("color", data => {
  colorInput.setAttribute("value", data.color);
});

changeColor.onclick = function(){
  let color = colorInput.value
  chrome.storage.sync.set({color: color})
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: `document.body.style.backgroundColor = "${color}";`
    });
  });
}