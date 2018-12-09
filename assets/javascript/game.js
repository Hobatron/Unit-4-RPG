// document.getElementById("myAudio").volume = 0.125;
var ourChars = ["warrior", "wizard", "archer"];
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

        charSelection: {
            charSelected: function (char) {
                $.each(ourChars, function (index, value) {
                    if (char != value) {
                        $("#" + value).addClass("selected");
                        viewing = true
                        if (char != "wizard") {
                            
                        } else {
                            $.each(charDetails.wizard, function(){
                                
                            });
                        }
                        $("#charCard").fadeIn(600);
                    }

                })
            },

        },

        return: {

        },






    };


    $(".charListener").click(function () {
        if (!viewing) {
            MainGame.charSelection.charSelected(this.id);
        }
    });
    $("#return").click(function (){
        
    });


});
