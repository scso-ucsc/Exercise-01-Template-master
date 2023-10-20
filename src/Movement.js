class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    preload() {
        this.load.spritesheet("character", "./assets/spritesheets/Character_002.png", {
            frameWidth: 48, //Because the sprites are 48 pixels wide
            frameHeight: 48 //If no frameHeight specified, it will be the same as frameWidth
        });
    }

    create() {
        this.cameras.main.setBackgroundColor("0xFACADE"); //Sets colour of main stage
        
        this.player = this.physics.add.sprite(width / 2, height / 2, "character", 1).setScale(2); //binding a property to this scene called player and adding it to the physics system
        //x, y, sprite, frame (frames are 0-indexed)
        //x scales from the left, y scales from the top
        //.setScale changes it size (2 = 2x the size)
        this.player.body.setCollideWorldBounds(true); //Prevents walking off the screen
        this.player.body.setSize(28, 38).setOffset(10, 10); //Sets collision box and sets offset of collision box

        this.PLAYER_VELOCITY = 500; //PLAYER_VELOCITY is in all caps to denote constant

        cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: "idle-down",
            frameRate: 0, //0 because of 1 frame animation
            repeat: -1, //-1 means repeat infinitely
            frames: this.anims.generateFrameNumbers("character", {
                start: 1, //1 because frame 1 is the idle frame
                end: 1
            })
        }); //Creating an animation

        this.anims.create({
            key: "idle-up",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("character", {
                start: 10,
                end: 10
            })
        });

        this.anims.create({
            key: "idle-left",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("character", {
                start: 4,
                end: 4
            })
        });

        this.anims.create({
            key: "idle-right",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("character", {
                start: 7,
                end: 7
            })
        });

        this.anims.create({
            key: "walk-down",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("character", {
                start: 0, //Row 1 of spritesheet
                end: 2
            })
        });

        this.anims.create({
            key: "walk-up",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("character", {
                start: 9, //Row 4 of spritesheet
                end: 11
            })
        });

        this.anims.create({
            key: "walk-left",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("character", {
                start: 3, //Row 2 of spritesheet
                end: 5
            })
        });

        this.anims.create({
            key: "walk-right",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("character", {
                start: 6, //Row 3 of spritesheet
                end: 8
            })
        });

        // this.player.play("walk-down"); //For testing animations
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0) //In update() because the value changes every frame
        //Set to x=0, y=0 to make it neutral and reset every frame
        // let playerDirection = "down"; 

        if(cursors.left.isDown){ //If left key is being held down
            playerDirection = "left";
            playerVector.x = -1; //Change x value of vector
        } else if(cursors.right.isDown){ //If right key is being held down
            playerDirection = "right";
            playerVector.x = 1;
        }

        if(cursors.up.isDown){ //If up key is being held down
            playerDirection = "up";
            playerVector.y = -1; //Change y value of vector
        } else if(cursors.down.isDown){ //If down key is being held down
            playerDirection = "down";
            playerVector.y = 1;
        }

        playerVector.normalize(); //NOTE: WHEN SPRITE IS MOVING DIAGONAL, THEY'RE MOVING FASTER. THIS IS DUE TO US TRAVELLING VIA A HYPOTENUSE. 
        //Therefore we use normalise

        // this.player.x += playerVector.x * this.PLAYER_VELOCITY; //cmd '/' turns chunks of code to a comment
        // this.player.y += playerVector.y * this.PLAYER_VELOCITY;
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y);

        let playerMovement;
        playerVector.length() ? playerMovement = "walk" : playerMovement = "idle" //.length() gives length of vector
        this.player.play(playerMovement + "-" + playerDirection, true); //Takes concat of animation name to determine which to play, true ignores animation call if already playing
    }
}