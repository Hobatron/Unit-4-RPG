// document.getElementById("myAudio").volume = 0.125;
var ourChars = ["warrior", "wizard", "archer"];
var selectedChar;
var charDetails = {
    "warrior": "What more does one need than the thrill of combat to keep him sane. Death is resorved for those who deserve it...",
    "wizard": [
        "After speaking with the local Hedge-born clout, finaly some direction. ",
        "A rumor? Not the first nor the last, in the search for the Orb of Baaj"
    ],

    "archer": "A few coin, offered to brave the cavren. Searching for a ones 'missing' brother, she expects a trap lie ahead. Easy prey.",
}


$(document).ready(function () {
    var viewing = false;

    var MainGame = {

        transition: function (funcName) {
            $("#mainWindow > *").fadeOut(600);
            $("#topHUD > p").fadeOut(600);
            MainGame[funcName]();

        },

        showChars: function(){
            $("#topHUD > p").fadeIn(600);
            $(".charContainer").removeClass("fade");
            $(".charContainer > img").removeClass("fade");
            $(".charContainer").fadeIn(600);
            $(".charContainer > img").fadeIn(600);
            viewing = false;
        },


        charSelected: function (char) {
            $.each(ourChars, function (index, value) {
                if (char != value) {
                    $("#" + value).addClass("fade");
                    viewing = true
                    if (char != "wizard") {

                    } else {
                        $.each(charDetails.wizard, function () {
                            console.log("test");
                        });
                    }
                    $("#charCard").fadeIn(600);
                };

            });
        },

        startGame: function () {
            
        },
    };


    $(".charListener").click(function () {
        selectedChar = this.id;
        if (!viewing) {
            MainGame.charSelected(this.id);
        };
    });
    $("#return").click(function () {
        $("#charCard").fadeOut(600);
        $.each(ourChars, function (index, value) {
            $("#" + value).removeClass("fade");
        });
        viewing = false;
    });

    $("#choose").click(function () {
        MainGame.transition("startGame");
    });



});
 