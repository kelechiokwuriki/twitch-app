(function(){

   const streamers = ["ESL_SC2", "cretetion", "freecodecamp", "OgamingSC2"];
   var onlineStreamers = [];
   var offlineStreamers = [];

   var twitchUserData = [];
   var onlineUserData;

    document.getElementById('all').addEventListener("click", function() {
      // console.log(twitchUserData);
      //had to use jquery here man
      //clear items before showing
      $("#newContent").empty();

      for (var i = 0; i < twitchUserData.length; i++) {
         displayProfile(twitchUserData[i].name,
            twitchUserData[i].stream,
            twitchUserData[i].logo,
            twitchUserData[i].link,
            twitchUserData[i].nameColor,
            twitchUserData[i].channelUrl
         );
      }
   });

   document.getElementById('online').addEventListener("click", function() {
      //had to use jquery here man
      //clear items before showing
      $("#newContent").empty();

      //display online users
      for (var i = 0; i < onlineStreamers.length; i++) {
         displayProfile(onlineStreamers[i].name,
            onlineStreamers[i].stream,
            onlineStreamers[i].logo,
            onlineStreamers[i].link,
            onlineStreamers[i].nameColor,
            onlineStreamers[i].channelUrl)
      }
         // console.log(offlineStreamers);
   });

   document.getElementById('offline').addEventListener("click", function() {
      //had to use jquery here man
      //clear items before showing
      $("#newContent").empty();

      //display online users
      for (var i = 0; i < offlineStreamers.length; i++) {
         displayProfile(offlineStreamers[i].name,
            offlineStreamers[i].stream,
            offlineStreamers[i].logo,
            offlineStreamers[i].link,
            offlineStreamers[i].nameColor,
            offlineStreamers[i].channelUrl)
      }
         // console.log(offlineStreamers);
   });

    (function getUserData() {
        streamers.forEach(function(twitchUser) {
            getStreamData(twitchUser);
        })
    })();

    function getStreamData(user) {
      var clientId = "?client_id=rwh926q8ctfv1ehglohd745jwasutw";
      var twitchStream = "https://api.twitch.tv/kraken/streams/"
      var twitchChannel = "https://api.twitch.tv/kraken/channels/";

        fetch(twitchStream + user + clientId)
            .then(function(response) {

                return response.json();

            }).then(function(data) {
               console.log(data);
                var tempData = {};

                if(data.stream === null) {
                    tempData.stream = "Offline";
                    tempData.nameColor = "red";
                }

                else if (data.stream === undefined) {
                   tempData.stream = "Account closed";
                   tempData.nameColor = "red";

                }
                else {

                    tempData.stream = data.stream.game;
                    tempData.channelUrl = data.stream.channel.url;
                    tempData.nameColor = "green";
                }

            //send out another fetch request to get profile data
            fetch(twitchChannel + user + clientId)
               .then(function(response) {

                return response.json();

                }).then(function(profileData) {
                    //console.log(profileData);
                    tempData.name = profileData.display_name;
                    tempData.link = "https://www.twitch.tv/" + profileData.display_name;
                    tempData.logo = profileData.logo;

                    twitchUserData.push(tempData);

                    //push onlineStreamers users to onlineStreamers array
                    onlineStreamers = twitchUserData.filter(function(el) {
                       return (el.stream !== "Offline");
                    });

                    //push online users to offlineStreamers array
                    offlineStreamers = twitchUserData.filter(function(el) {
                       return (el.stream === "Offline");
                    });


                }).catch(function(err) {
                    //todo show error display in html
                    console.log("Not able to get ", err);
            })

            }).catch(function(err) {
                //todo shoaw error display in html
                console.log("Not able to fetch stream data", err);
        })
    }

    function displayProfile(name, status, logo, link, nameColor, streamLink)
    {
      var mainContainer = document.getElementById('mainContainer');
      var newContent = document.getElementById('newContent');

      var content = document.createElement('div');
      content.setAttribute("id","content");
      if(status === "Offline") { content.style.backgroundColor = nameColor; }
      content.classList.add("input-group", "content", "container");

      var userPicDiv = document.createElement('div');
      userPicDiv.classList.add('userPic');

      var users = document.createElement('div');
      users.classList.add("users");

      var image = document.createElement('img');
      image.classList.add("img-circle", "profilePictue");
      image.setAttribute("alt","Twitch Logo");

      if(!logo) { image.setAttribute('src', "https://s3-us-west-2.amazonaws.com/web-design-ext-production/p/Twitch_474x356.png"); }
      else { image.setAttribute('src', logo); }

      var twitchUser = document.createElement('a');
      twitchUser.setAttribute("href", link);
      twitchUser.setAttribute("target", "_blank");
      twitchUser.innerHTML = name;

      var stream = document.createElement('div');
      stream.classList.add('stream');

      var twitchStream = document.createElement('a');
      if(streamLink) { twitchStream.setAttribute("href", streamLink); }
      twitchStream.innerHTML = status;
      twitchStream.setAttribute("target", "_blank");

      userPicDiv.appendChild(image);
      content.appendChild(userPicDiv);
      users.appendChild(twitchUser);
      content.appendChild(users);
      mainContainer.appendChild(content);
      stream.appendChild(twitchStream);
      content.appendChild(stream);
      newContent.appendChild(content)
      mainContainer.appendChild(newContent);
   }

})();

    //This is service worker. A javascript technology to help in network operations including caching. For our application, we don't want to fetch data every time from the API endpoint, as this slows the speed of the app.
    //1. check for service worker availability and register it
//    if('serviceWorker' in navigator){
//
//        navigator.serviceWorker
//        .register('sw.js')
//        .then(function(registeration) {
//            console.log("Service worker registered", registeration);
//        })
//        .catch(function(err) {
//            console.log("Service worker failed to register", err);
//        })
//    }
//
   //  function emptyAll()
   //  {
   //      var content = document.getElementById('div');
   //      content.classList.remove("input-group", "content", "container")
    //
   //  }
