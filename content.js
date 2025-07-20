/*const script = document.createElement("script");
script.src = chrome.runtime.getURL("injected.js");
script.onload = () => script.remove();
(document.head || document.documentElement).appendChild(script);*/
window.addEventListener("yt-navigate-finish", () => {
  setTimeout(()=>{
		const script = document.createElement("script");
		script.src = chrome.runtime.getURL("injected.js");
		script.onload = () => script.remove();
		(document.head || document.documentElement).appendChild(script);
  }, 500);
});

const play = document.querySelector('.html5-video-player');
previousAdplaying=false;
if(play){
	const observer = new MutationObserver((mutationsList) => {
	  for(const mutation of mutationsList) {
		if (
		  mutation.type === 'attributes' &&
		  mutation.attributeName === 'class'
		) {
		  const isAdNow = play.classList.contains('ad-showing');
		  previousAdplaying=isAdNow;
		  if (!isAdNow && previousAdplaying) {
			 setTimeout(()=>{
				const script = document.createElement("script");
				script.src = chrome.runtime.getURL("injected.js");
				script.onload = () => script.remove();
				(document.head || document.documentElement).appendChild(script);
			}, 500);
		  }
		}
	  }
	});

	observer.observe(play, {
	  attributes: true,
	  attributeFilter: ['class']
	});
	
}
  


