function doClickUseCamera(e){
	// Use Camera button has been clicked, now to the fun stuff
	
	Ti.Media.showCamera({
		success: function(e){
			if(e.mediaType === Ti.Media.MEDIA_TYPE_PHOTO){
				Ti.API.info(e.media.getNativePath());
				$.ivShowPic.image = e.media;
			}else if(e.mediaType === Ti.Media.MEDIA_TYPE_VIDEO){
				// TODO handle video on android
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

// Record video on android

var videourl = "";
function doClickAndroidVideo(e){
	var intent = Ti.Android.createIntent({action : 'android.media.action.VIDEO_CAPTURE'});
	
	$.win.activity.startActivityForResult(intent, function(e) {
        if (e.resultCode == Ti.Android.RESULT_OK) {
            if (e.intent.data != null) {
                // If everything went OK, save a reference to the video URI
                videourl = e.intent.data;
                $.playButton.visible = true;
    	    }
            else {
                Ti.API.error('Could not retrieve media URL!');
            }
        }
        else if (e.resultCode == Ti.Android.RESULT_CANCELED) {
            Ti.API.trace('User cancelled video capture session.');
        }
        else {
            Ti.API.error('Could not record video!');
        }
    });
}

function doPlayBack(){
    var player = Ti.Media.createVideoPlayer({ url: videourl, autoplay: true});
    $.win.add(player);
}

$.win.open();
