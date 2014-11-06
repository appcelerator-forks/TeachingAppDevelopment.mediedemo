function doClickUseCamera(e){
	// Use Camera button has been clicked, now to the fun stuff
	
	Ti.Media.showCamera({
		success: function(e){
			if(e.mediaType === Ti.Media.MEDIA_TYPE_PHOTO){
				$.ivShowPic.image = e.media;
			}else if(e.mediaType === Ti.Media.MEDIA_TYPE_VIDEO){
				// create e new window to display the video in
				var w = Ti.UI.createWindow({
					title: "The Video",
					backgroundColor: "#000"
				});	
				// create the player
				var player = Ti.Media.createVideoPlayer({
					media: e.media
				});
				// add the player to the window
				w.add(player);
				// listen for the video to finish
				player.addEventListener("complete", function(e){
					w.remove(player); //remove the player
					player = null; // clean up
					w.close();
				}); 
				w.open();
				
			}else{
				alert("MediaType: " + e.mediaType + " not supported.");
			}
			
			
				
		},cancel: function(){
			//Called if the camera operation is cancelled
			
		},error: function(error){
			// called when there's an error
			var a = Titanium.UI.createAlertDialog({title:'Camera'});
			if (error.code == Titanium.Media.NO_CAMERA) {
				a.setMessage('Please run this test on device');
			} else {
				a.setMessage('Unexpected error: ' + error.code);
			}
			a.show();
			
		},
		//Settings
		saveToPhotoGallery:true,
    	// allowEditing and mediaTypes are iOS-only settings
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
		
	});
	
}

$.win.open();
