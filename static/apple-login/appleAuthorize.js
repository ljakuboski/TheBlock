document.addEventListener('musickitloaded', () => {
  fetch("http://ec2-3-88-85-136.compute-1.amazonaws.com:3001/appleToken", {method: "GET", headers: {'Content-Type':'application/json'}}).then(response => response.json()).then(response => {

    const music = MusicKit.configure({
        developerToken: response.token,
        app: {
            name: 'AppleMusicKitExample',
            build: '1978.4.1'
        }
    });

    document.getElementById('apple-login-btn').addEventListener('click', () => {
        // music.authorize().then(musicUserToken => {
        //     //console.log(`Authorized, music-user-token: ${musicUserToken}`);
        //     //app.get('/setAppleToken', (req, res) => res.send(JSON.stringify({token: musicUserToken})))
        //     $.ajax({
		    //          url: 'http://ec2-3-88-85-136.compute-1.amazonaws.com:3001/setSpotifyToken',
		    //          data:{
			  //               'token': musicUserToken,
        //               'username': document.cookie
        //           }
	      //     }).done(function(){
		    //         console.log("send");
	      //     });
        //     window.location.href = "http://ec2-3-88-85-136.compute-1.amazonaws.com/home";
        // });
        music.authorize().then(function(result){
            $.ajax({
		             url: 'http://ec2-3-88-85-136.compute-1.amazonaws.com:3001/setSpotifyToken',
		             data:{
			                'token': result,
                      'username': document.cookie
                  }
	          }).done(function(){
		            console.log("send");
	          });
              window.location.href = "http://ec2-3-88-85-136.compute-1.amazonaws.com/home";
            }, function(err) {
              console.log("Something went wrong! Please try again.");
              window.alert("Whoops! Something went wrong. Please try again."); // Error: "It broke"
            });
            window.music = music;
    });
});
});
