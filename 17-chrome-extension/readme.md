# Chrome Extensions

## Objectives

## Your First Chrome Extension

We're going to be following the [Getting Started Tutorial](https://developer.chrome.com/extensions/getstarted) to make our first Chrome extension, which will allow the user to change the background color of any page. A chrome extension's components could include **background scripts**, **content scripts**, **options page**, as well as other JavaScript, HTML, or CSS files as needed. We'll talk about each of these components in more detail, later, but first, we need to create a **manifest** for our extension.

## The Manifest

Every chrome extension must have a `manifest.json` file that contains specific information about the extension. We'll revist the manifest in detail, but you can [read more about it](https://developer.chrome.com/extensions/manifest).

In the root directory of the extension project, create a `manifest.json` file with the following content:

```json
{
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "manifest_version": 2
}
```

At this point, we can create a local extension in Chrome just by adding it as an extension in developer mode.

Open Chrome and in the address bar type `chrome://extensions`. There should be a toggle in the upper right-hand corner to toggle developer mode `on` and `off`. Toggle it to `on`. Click the `load unpacked` button in the top-left. Navigate to the exercise directory and click `select`. You should now see the extension in the top-left of the extensions list.

## Creating a Background Script

Right now, our extension doesn't do anything because our extension is just a `manifest` file. We're going to give our extension some `instructions` by creating a **[background script](https://developer.chrome.com/extensions/background_pages)** that will listen for events. Any component that we want to include in our extension must be added to the `mainfest`.

```json
{
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "manifest_version": 2
}
```

Update the `manifest.json` file to include a "background" property that contains information about where the script is located, and wether the script is persistent.

Extensions, like JavaScript, are event-based. We're used to thinking about events that are limited to the webpage our script is loaded into; events like `onClick` and `onSubmit`. Now, our events are in a different scope; they are browser event. Such events can include creating a bookmark, closing a tab, etc. We listen to, and handle, these events in **background scripts**. These scripts are usually non-persistent, meaning they get unloaded after the script goes idle.
The tutorial gives us a note here about persistent vs non-persistent background scripts

> The only occasion to keep a background script persistently active is if the extension uses chrome.webRequest API to block or modify network requests. The webRequest API is incompatible with non-persistent background pages.

Basically, if you ever need to use `webRequest`, you should use a presistent script. Otherwise, it should be non-persistent.

As mentioned, there are a whole bunch of [events available on the chrome runtime.](https://developer.chrome.com/extensions/runtime#event-onStartup) We're going to tell our extension to do something when the `chrome.runtime.onInstalled` event fires. Lets create a `background.js` file.

```js
//background.js
chrome.runtime.onInstalled.addListener(function() {
  // code here
});
```

This looks pretty similar to the events we've seen in the past, except the event we're listening for is associated with the browser (chrome.runtime), instead of a DOM element (like a form).

We're going to create a persistent variable using the [storage API](https://developer.chrome.com/apps/storage) that will store the color that we want to change the background color to. By saving this to `storage`, our other component files will be able to retrieve it. We're not in a NodeJS environment, so we cant `import` or `require` files from each other.

```js
//background.js
chrome.runtime.onInstalled.addListener(function() {
  // use the store API to save the color we want to use into local storage
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });
});
```

We'll also need to update the `manifest.json` because any extension that needs to use `storage` needs to have permission from the user. We can add a "permissions" property to the `manifest.json`, like so:

```json
{
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "permissions": ["storage"],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "manifest_version": 2
}
```

This means the user will be notified when they are installing the extension that the extension requires access to local storage, and the user will have to allow that access.

Now, we can go back to our extension's page in Chrome and click the **reload** link. We should now see a link to view the **background page**. If you click on that, a dev-tools window pops up, and you should see "The color is green" printed to the console.

## Creating A User Interface

Our interface will consist of a [popup](https://developer.chrome.com/extensions/user_interface#popup) that will render when a user clicks on the extension's icon, which we'll add to the browser toolbar. For this, we just need to create a `popup.html` file.

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      button {
        height: 30px;
        width: 30px;
        outline: none;
      }
    </style>
  </head>
  <body>
    <button id="changeColor"></button>
  </body>
</html>
```

Our popup is just going to render a button, pretty simple. Like the background script, we need to register the `popup.html` file in the `manifest.json` file.

```json
{
  "name": "Getting Started Example",
  "version": "1.0",
  "description": "Build an Extension!",
  "permissions": ["storage"],
  "background": {
    "scripts": ["background.js"],
    "persistent": false
  },
  "page_action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "images/get_started16.png",
      "32": "images/get_started32.png",
      "48": "images/get_started48.png",
      "128": "images/get_started128.png"
    }
  },
  "icons": {
    "16": "images/get_started16.png",
    "32": "images/get_started32.png",
    "48": "images/get_started48.png",
    "128": "images/get_started128.png"
  },
  "manifest_version": 2
}
```

Here, we're adding a [PageAction](https://developer.chrome.com/extensions/pageAction). The `chrome.pageAction` API is used create icons in the Chrome toolbar. We're telling the extension to use `popup.html` to render the UI after the icon is clicked. We're also telling it which files to use for the icon.

When we reload the extension, we should see a new icon in the toolbar that looks like a grey-scale 'G'. But when you click on it, you just get a menu. No button. What gives?

We still need to tell the browser when the user can interact with the `popup`. We're going to use the [declarativeContent](https://developer.chrome.com/extensions/declarativeContent) API, which allows use to take actions depending on what content is on the page. For now, lets limit the extension to only be active when the `hostEqual` "developer.chrome.com".

```js
//background.js
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });

  // declarativeContent allows us to show our extensions action depending on
  // certain conditions. Here, we are only allowing our extension to work on a
  // certain host.
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "developer.chrome.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
```

We'll need to update the `manifest.json` again to include `declarativeContent` in the "permissions".

```json
{
  "name": "Getting Started Example",
  ...
  "permissions": ["declarativeContent", "storage"],
  ...
}
```

Now, if we refresh the extension and go to `chrome.developers.com` in Chrome, we can see the icon change from grey-scale to color. If you click the icon, you'll just see an empty button.
We're going to modify the color of the button to match the background color that we set in `storage`. First, lets create a `popup.js` file.

```js
//popup.js
let changeColor = document.getElementById("changeColor");
chrome.storage.sync.get("color", data => {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute("value", data.color);
});
```

We can include the script in the `popup.html` file.

```html
<html>
  ...
  <body>
    <button id="changeColor"></button>
    <script src="popup.js"></script>
  </body>
</html>
```

Next, we'll need to update the `popup.js` file again to add the user interaction of clicking on the button. When the button is clicked, we'll dynamically add a script to the users **activeTab** that will change the background color of the `body` to be the color of our button.

```js
//popup.js
...
changeColor.onclick = function(element) {
  let color = element.target.value;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        {code: `document.body.style.backgroundColor = "${color}";`});
  });
};
```

Here, we're adding an **eventListener** to the button. When clicked, our extension will **query the browser for the active tab**, using the [tabs API](https://developer.chrome.com/extensions/tabs). The query provides us with a callback function that has an array of tabs that was found. Since we're using the `activeTab: true` option, there should only be one item in the array, as a user can only have one active tab at a time.

In the active tabe, we then use `executeScript` to inject some code into the tab, thus changing the background color of the active tab when the user clicks on our extension's button.

Before it works, though, we need to update `manifest.json` to give our extension permission to use the `activeTab`.

```json
{
  "name": "Getting Started Example",
  ...
  "permissions": ["activeTab", "declarativeContent", "storage"],
  ...
}
```

Now, if we refresh our extension, then click on the button we can see the background color change!

## User Options

The user can only change the background color to be green. Let's change that by creating an options page. Create an `options.html` file with the following contents:

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      button {
        height: 30px;
        width: 30px;
        outline: none;
        margin: 10px;
      }
    </style>
  </head>
  <body>
    <div id="buttonDiv"></div>
    <div><p>Choose a different background color!</p></div>
  </body>
  <script src="options.js"></script>
</html>
```

We'll update the `manifest.json` file to tell our extension which HTML file to use for the options page.

```json
{
  "name": "Getting Started Example",
  ...
  "options_page": "options.html",
  ...
  "manifest_version": 2
  }
```

Now, if we refresh the extension and click on the DETAILS button, we should see an "extension options" link near the bottom of the details page.  If you click on that link, it will open the options page, which just shows the `<p>` tag.

Lets create a `options.js` file to progromatticaly create some buttons.

```js
// options.js

let page = document.getElementById("buttonDiv");
const kButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];

function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement("button");
    button.style.backgroundColor = item;
    button.addEventListener("click", function() {
      chrome.storage.sync.set({ color: item }, function() {
        console.log("color is " + item);
      });
    });
    page.appendChild(button);
  }
}

constructOptions(kButtonColors);

```

Here we can see we are looping through the array of colors and adding an event listener on each button that will update our `storage` to store a different color. This about wraps up the tutorial section.

## Adding a Color Select Input Type

Lets add an input that acts as a color selector inside the `popup.html` file.

```html
<html>
  ...
  <body>
    <input type="color" id="color-input"/>
    <button id="changeColor">Set Color</button>
    <script src="popup.js"></script>
  </body>
</html>
```

Refresh the extension and open the popup. Now we see a color select! Lets modify the `popup.js` to work with the new input type. When we click the button now, we want to get the value from the input, and then update `storage` to store the new color value before we update the background color. This way, when you reload the page the most recent color will be loaded.

```js
// popup.js

// create a variable to store a reference to the input node
let colorInput = document.getElementById("color-input")
let changeColor = document.getElementById("changeColor")

chrome.storage.sync.get("color", data => {
  colorInput.setAttribute("value", data.color);
});

changeColor.onclick = function(){
  // get the color from the input
  let color = colorInput.value

  // set the color in storage
  chrome.storage.sync.set({color: color})

  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, {
      code: `document.body.style.backgroundColor = "${color}";`
    });
  });
}
```

Lastly, we can remove the first couple of lines from `background.js` which set the color when the extension is loaded. 

 
 ## Twitter Redactor Extension

 Lets create an extension that will redact tweets based on an array of of strings. First, lets start with the `manifest.json`

```json
{
  "name": "Twitter Redactor",
  "version": "1.0",
  "description": "Redacts tweets containing blacklisted words",
  "permissions": ["activeTab"],
  "content_scripts": [
    {
      "matches": ["https://twitter.com/*"],
      "js": ["content.js"],
      "css": ["content.css"]
    }
  ],
  "icons": {
    "16": "images/get_started16.png",
    "32": "images/get_started32.png",
    "48": "images/get_started48.png",
    "128": "images/get_started128.png"
  },
  "manifest_version": 2
}
```

Instead of using a `background script`, we're going to use a [content script](https://developer.chrome.com/extensions/content_scripts). Content scripts are files that run directly in the context of a web page. They have access to the DOM. 

Before creating the script, lets go to twitter and look at some of the markup. We can see that tweets are wrapped in a div with a class called `.tweet`, and inside the div is another DOM node with a class of `js-tweet-text`. 

> notice the 'js' prefix here. This is a convention that is used for classes that are to be interacted with using JavaScript. We don't want to target "styling" classes because those could change which would break our JavaScript. Instead, we use "js"-prefixed classes because we know those shouldn't change. 

Now that we have an understanding of the markup, we can create the `content.js` file.
Lets start by creating a blacklist, which will be an array of strings.

Lets create a `content.js` file. 

```js
// content.js
const blacklist = ['tween', 'millenial', 'lit']
```

The idea here is that we are going query the document for all of the tweet text classes, and then for each tweet, loop through the blacklist and wrap the offending word in a `<span>` element that has some styling.

Lets create a function that gets the tweets.

```js
// content.js
const blacklist = ['tween', 'millenial', 'lit']
const getTweets = () => document.querySelectorAll('.js-tweet-text)
```

Simple enough. Now, lets create a function that will redact our tweets.

```js
// content.js
const blacklist = ['tween', 'millenial', 'lit']
...

const redactTweets = () => {
  //get the tweets
  const tweets = getTweets()
  // loop through the tweets
  tweets.forEach(tweet => {
    // get inner HTML of tweets. This will be a string, that also contains the markup. 
    // Its important that we keep the existing markup.
    let text = tweet.innerHTML

    // loop through the blacklist
    blacklist.forEach(word => {
      // create a new Regular Expression object that we will use to replace text content
      const re = new RegExp('(' + word + ')', 'gi')

      // using the RegExp object, we replace any text that matches the object
      text = text.replace(re, '<span class="twitter-redacted">$1</span>')
    })

    // set the innerHTML using the new, updated text
    tweet.innerHTML = text
  })
}
```

Now, we just need to call the function.

```js
// content.js
const blacklist = ['tween', 'millenial', 'lit']
...
window.onload = () => {
  redactTweets()
}
```

Lastly, lets create the `content.css` file that will style on new `twitter-redacted` class.

```css
#content.css

.twitter-redacted{
  color: black !important;
  background-color: black !important;
}
```

Cool, lets install the extension and try it out.

Welp, it works, but it only works on the first several tweets because twitter loads tweets dynamically. How can we make sure to get all the tweets?

The easiest (read: laziest) way is to simply call `redactTweets()` in an `window.scroll` event.

```js
// content.js
...
window.onload = () => {
  redactTweets()
}

window.addEventListener('scroll', () => {
  redactTweets()
})
```




