// Exercise 01: Normalized Movement
// Name: Sean Eric So
// Date: October 20, 2023

// Spritesheet by ElvGames: https://elv-games.itch.io/free-fantasy-dreamland-sprites
// phaser.d.ts file: https://raw.githubusercontent.com/photonstorm/phaser/master/types/phaser.d.ts

"use strict"

let config = {
    type: Phaser.AUTO,
    render:{
        pixelArt: true //Helps to render pixelArt
    },
    physics: {
        default: "arcade", //Set the game to have arcade physics
        arcade: { //Our defined arcade physics
            //debug: true
        }
    },
    width: 800,
    height: 800,
    scene: [ Movement ]
}

let game = new Phaser.Game(config)

let cursors
let { height, width } = game.config //Let {height, width} = same properties from game.config
let playerDirection = "down"; 