$(document).ready(function(){
    var streamers = ["ESL_SC2", "cretetion", "freecodecamp", "OgamingSC2"];

    var twitchUserData = [];

    var streamDataV = "";

    var clientId = "?client_id=rwh926q8ctfv1ehglohd745jwasutw";

    var twitchStream = "https://api.twitch.tv/kraken/streams/"

    var twitchChannel = "https://api.twitch.tv/kraken/channels/";

    var allClicked = false;

    getUserData();


   document.getElementById('all').addEventListener("click", function() {

       console.log(twitchUserData);

   });

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
    function emptyAll()
    {
        var content = document.getElementById('div');
        content.classList.remove("input-group", "content", "container")

    }

    function getUserData(){
        streamers.forEach(function(twitchUser) {
            getStreamData(twitchUser);
        })
    }

    function getStreamData(user) {

        fetch(twitchStream + user + clientId)
            .then(function(response) {

                return response.json();

            }).then(function(data) {
               //  console.log(data);
                var tempData = {};

                if(!data.stream) {
                    tempData.stream = "Offline";
                }
                else {
                    tempData.stream = data.stream.game;
                }

                tempData.link = data._links.self;
                twitchUserData.push(tempData);

            //send out another fetch request to get profile data
            fetch(twitchChannel + user + clientId)
               .then(function(response) {

                return response.json();

                }).then(function(profileData) {
                    console.log(profileData);
                    tempData.name = profileData.display_name;
                    tempData.logo = profileData.logo;
                    twitchUserData.push(tempData);
                }).catch(function(err) {
                    //todo show error display in html
                    console.log("Not able to get ", err);
            })

            }).catch(function(err) {
                //todo shoaw error display in html
                console.log("Not able to fetch stream data", err);
        })
    }

    function displayProfilePic(callBack)
    {
        var mainContainer = document.getElementById('mainContainer');


        var content = document.createElement('div');
        content.classList.add("input-group", "content", "container");
        content.setAttribute("id","content")

        var userPicDiv = document.createElement('div');
        userPicDiv.classList.add('userPic');

        var users = document.createElement('div');
        users.classList.add("users");

        var image = document.createElement('img');
        image.classList.add("img-circle", "profilePictue");
        image.setAttribute("alt","Twitch Logo");

        if(!callBack.logo)
        {
          image.setAttribute('src', "https://s3-us-west-2.amazonaws.com/web-design-ext-production/p/Twitch_474x356.png");
        }

        else
        {
           image.setAttribute('src', callBack.logo);
        }

        var twitchUser = document.createElement('a');
        twitchUser.setAttribute("href", callBack._links.self);
        twitchUser.innerHTML = callBack.display_name;


        userPicDiv.appendChild(image);
        content.appendChild(userPicDiv);

        users.appendChild(twitchUser);
        content.appendChild(users);

        mainContainer.appendChild(content);
    }








    //fetch all users using twitch api



    //fetch the user using HTML5 web api instead of Jquery
    //it's faster because we are not including the whole of jquery and calling just a small portion of it
//
//    for(var i = 0; i < streamers.length; i++)
//    {
//        fetch(twitchUrl + streamers[i] + id).then(function(response)
//        {
//            //handle the response as json with a built json method
//            return response.json();
//
//        }).then(function(data)
//        {
//
//            console.log(data);
//
//            var mainContainer = document.getElementById('mainContainer');
//            var content = document.createElement('div');
//            content.classList.add("input-group", "content", "container");
//            content.setAttribute("id","content")
//
//            var userPicDiv = document.createElement('div');
//            userPicDiv.classList.add('userPic');
//
//            var users = document.createElement('div');
//            users.classList.add("users");
//
//            var image = document.createElement('img');
//            image.classList.add("img-circle", "profilePictue");
//            image.setAttribute("alt","Twitch Logo");
//
//            if(!data.logo)
//            {
//              image.setAttribute('src', "https://s3-us-west-2.amazonaws.com/web-design-ext-production/p/Twitch_474x356.png");
//            }
//
//            else
//            {
//               image.setAttribute('src', data.logo);
//            }
//
//            var twitchUser = document.createElement('a');
//            twitchUser.setAttribute("href", data._links.self);
//            twitchUser.innerHTML = data.display_name;
//
//
//
//            userPicDiv.appendChild(image);
//            content.appendChild(userPicDiv);
//
//            users.appendChild(twitchUser);
//            content.appendChild(users);
//
//            mainContainer.appendChild(content);
//
//
////
////          we have gotten the user object
//////        lets extract the id and fetch the stream status
//            let twitchStream =  "https://api.twitch.tv/kraken/streams/" + data._id + "?client_id=rwh926q8ctfv1ehglohd745jwasutw";
//
//            //make the fetch
//            fetch(twitchStream).then(function(response)
//            {
//                return response.json();
//
//            }).then(function(finalData)
//            {
//
//                console.log(finalData);
//
//                var twitchStatus;
//                var backColor;
//                var twitchStream;
//
//                var stream = document.createElement('div');
//                stream.classList.add('stream');
//
//                twitchStream = document.createElement('a');
//                twitchStream.setAttribute("href", "#");
//
//
//
//                if(!finalData.stream)
//                {
//                    twitchStream.innerHTML = "Offline";
//                    document.getElementById('content').style.backgroundColor = "red";
//
//                    //offline.push(streamers[]);
//
//                    //console.log(offline);
//
//                }
//
//                else
//                {
//                    twitchStream.innerHTML = "Online";
//                    document.getElementById('content').style.backgroundColor = "aqua";
//                }
//
//
//                stream.appendChild(twitchStream);
//                content.appendChild(stream);
//
//                mainContainer.appendChild(content);
//
//
//
////                console.log(content);
//
//            });
//
//        }).catch(function(err)
//        {
//           console.log("Error, request not completed");
//        });
//    }
});
