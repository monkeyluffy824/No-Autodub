function determineType(){
	let path=window.location.pathname;
	let url=window.location.href;
	if(path.startsWith('/shorts')){
		return 'shorts';
	}else if(path.startsWith('/watch') && url.includes('v=')){
		return 'video';
	}else{
		return 'Other';
	}
	
}

function checkIsVideoLoaded(){
	let type= determineType();
	let trackMainDetails;
	if(type==='video'){
		const player= document.getElementById('movie_player');
		let videoData=player.getVideoData();
		if(videoData!=null && videoData !=undefined){
			let availableAudioTracks=player.getAvailableAudioTracks();
			if(availableAudioTracks.length>1){
				let currentAudioTrack=player.getAudioTrack();
				console.log('current Audio', currentAudioTrack);
				let originalAudioTrack=availableAudioTracks.filter(track=>{
					for(let k in track){
						if(typeof track[k]==='object' && (track[k]['name']!=null && track[k]['name']!=undefined)){
							trackMainDetails=k;
							return track[k]['name'].toLowerCase().includes('original');
						}
					}
				});
				if(originalAudioTrack.length==1){
					if(currentAudioTrack[trackMainDetails]['name']!=originalAudioTrack[0][trackMainDetails]['name']){
						console.log('Shifting to original audio track');
						if(player.setAudioTrack(originalAudioTrack[0])){
							player.playVideo();
						}
					}
				}
			}
		}else{
			setTimeout(checkIsVideoLoaded(),100);
		}
	}else if(type==='shorts'){
		const player= document.getElementById('shorts-player');
		console.log('player', JSON.stringify(player));
		console.dir(player);
		let videoData=player.getVideoData();
		if(videoData!=null && videoData !=undefined){
			let availableAudioTracks=player.getAvailableAudioTracks();
			if(availableAudioTracks.length>1){
				let currentAudioTrack=player.getAudioTrack();
				let originalAudioTrack=availableAudioTracks.filter(track=>{
					for(let k in track){
						if(typeof track[k]==='object' && (track[k]['name']!=null && track[k]['name']!=undefined)){
							trackMainDetails=k;
							return track[k]['name'].toLowerCase().includes('original');
						}
					}
				});
				if(originalAudioTrack.length==1){
					if(currentAudioTrack[trackMainDetails]['name']!=originalAudioTrack[0][trackMainDetails]['name']){
						console.log('Shifting to original audio track');
						if(player.setAudioTrack(originalAudioTrack[0])){
							player.playVideo();
						}
					}
				}
				
			}
		}else{
			setTimeout(checkIsVideoLoaded(),100);
		}
	}
}

checkIsVideoLoaded();

			