const script = document.createElement("script");
script.src = chrome.runtime.getURL("injected.js");
script.onload = () => script.remove();
(document.head || document.documentElement).appendChild(script);

window.addEventListener("yt-navigate-finish", () => {
  setTimeout(()=>{
		const script = document.createElement("script");
		script.src = chrome.runtime.getURL("injected.js");
		script.onload = () => script.remove();
		(document.head || document.documentElement).appendChild(script);
  }, 500);
});