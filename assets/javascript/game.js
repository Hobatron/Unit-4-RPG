// document.getElementById("myAudio").volume = 0.125;
var gameStarting = false;
var ourTurn = true;
var currentHP = 40;
var leveling = false;
var fightNum = 0;
var monsters = {
    goblin: { img: "ChainGoblin.png", hp: 10, atk: 2 },
    undead: { img: "Undead.png", hp: 24, atk: 4 },
    boss: { img: "Boss.png", hp: 40, atk: 8 }
};
var currentMonster = monsters[Object.keys(monsters)[fightNum]];
var selectedChar;

var charDetails = {
    "warrior": {
        story: "What more does one need than the thrill of combat to keep him sane. Death is resorved for those who deserve it...",
        skills: {
            twinStrike: {
                atk: "Twin Strike",
                1: [5, 10],
                2: [8, 15],
                3: [13, 22]
            },
            thrust: {
                atk: "Thrust",
                1: [8, 8],
                2: [18, 18],
                3: [28, 28]
            },
            pommelStrike: {
                atk: "Pommel Strike",
                1: [1, 3, 1],
                2: [2, 8, 1],
                3: [9, 15, 2]
            }
        }
    },
    "wizard": {
        story: "After speaking with the local Hedge-born clout, finaly some direction. ",
        story2: "A rumor? Not the first nor the last, in the search for the Orb of Baaj",
        skills: {
            fireball: {
                atk: "Fireball",
                1: [5, 10],
                2: [8, 15],
                3: [13, 22]
            },
            chargedBolt: {
                atk: "Charged Bolt",
                1: [1, 15],
                2: [1, 35],
                3: [1, 55]
            },
            iceNova: {
                atk: "Ice Nova",
                1: [1, 3, 1],
                2: [2, 8, 1],
                3: [9, 15, 2]
            }
        },
    },

    "archer": {
        story: "A few coin, offered to brave the cavren. Searching for a ones 'missing' brother, she expects a trap lie ahead. Easy prey.",
        skills: {
            broadArrow: {
                atk: "Broad Arrow",
                1: [5, 10],
                2: [8, 15],
                3: [13, 22]
            },
            glassArrow: {
                atk: "Glass Arrow",
                1: [1, 15],
                2: [1, 35],
                3: [1, 55]
            },
            stunGrenade: {
                atk: "Stun Grenade",
                1: [1, 3, 1],
                2: [2, 8, 1],
                3: [9, 15, 2]
            }
        }
    }
};

$(document).ready(function () {
    var viewing = false;

    var MainGame = {

        transition: function (funcName) {
            $("#topHUD > p").fadeOut(600);
            $("#charCard").fadeOut(600);
            $(".charContainer > img").fadeOut(600);
            setTimeout(function () { MainGame[funcName](); }, 600);
        },

        loadEnemy: function () {
            console.log(currentMonster);
            $("#monsterBlock > img").attr("src", "assets/imgs/" + currentMonster.img);
            $("#monsterBlock > p ").text("Life: " + currentMonster.hp)
        },

        levelUp: function () {
            $("#monsterBlock > p ").text("This monster has been defeated, click a skill to level it up");
            leveling = true;
        },

        attack: function(exAtk, atkLevel) {
            console.log(exAtk +" : "+atkLevel);
            var ourDmg = charDetails[selectedChar].skills[exAtk][atkLevel];
            ourDmg = Math.floor(Math.random() * (ourDmg[1]-ourDmg[0]+1)) + ourDmg[0];
            currentMonster.hp = currentMonster.hp - ourDmg;
            $("#monsterBlock > p ").text("Life: " + currentMonster.hp)
            if (currentMonster.hp < 1) {
                fightNum++;
                currentMonster = monsters[Object.keys(monsters)[fightNum]];
                this.levelUp()
            };
            ourTurn = true;
        },

        showChars: function () {
            $("#topHUD > p").fadeIn(600);
            $(".charContainer").removeClass("fade");
            $(".charContainer > img").removeClass("fade");
            $(".charContainer").fadeIn(600);
            $(".charContainer > img").fadeIn(600);
            viewing = false;
        },


        charSelected: function (char) {
            $.each(charDetails, function (index, value) {
                if (char != index) {
                    $("#" + index).addClass("fade");
                    viewing = true

                    if (char != "wizard") {

                    } else {

                    }
                    $("#charCard").fadeIn(600);
                };

            });
        },

        setupGame: function () {
            $("#currentHP").text("Your Life: "+currentHP);
            var simple = 0;
            $.each(charDetails, function (index) {
                simple++;
                if (selectedChar != index) {
                    $("#" + simple).remove();
                    $("#" + index).remove();
                } else {
                    var inc = 0
                    $.each(charDetails[selectedChar].skills, function(index,value){
                        inc++;
                        $("#atk"+inc).text(value.atk);
                        $("#atk"+inc).attr("value", index);
                        $("#atk"+inc).data("level", 1)
                    });

                }
            });

            $("#" + selectedChar).fadeIn(600);
            $("#mainWindow").removeClass("justify-content-center");
            $("#fightWindow").fadeIn(600);
            setTimeout(function () { MainGame.loadEnemy(); }, 600);
        },


    };


    $(".charListener").click(function () {
        if (!viewing) {
            selectedChar = this.id;
            MainGame.charSelected(this.id);
        };
    });
    $("#return").click(function () {
        $("#charCard").fadeOut(600);
        $.each(charDetails, function (index) {
            $("#" + index).removeClass("fade");
        });
        viewing = false;
    });

    $("#choose").click(function () {
        if (!gameStarting) {
            MainGame.transition("setupGame");
            gameStarting = true;
        };
    });

    $(".attack").click(function(){
        if (!leveling){
            MainGame.attack(this.value, $("#" + this.id).data().level);
        } else {
            $("#" + this.id).data().level++;
            leveling = false;
            MainGame.loadEnemy();
        };
    });

});
