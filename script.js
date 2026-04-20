class LoadingScene extends Phaser.Scene {
    constructor() {
        super("loadingScene");
    }

    init() {
        this.cameras.main.setBackgroundColor(0x005b3d);
    }

    preload() {
        this.diceSpinningVideo = this.load.video('diceSpinningVideo', './assets/MP4s/spinningDice.mp4', 'loadeddata', false, true);
    }

    create() {
        this.savingText = this.add.text(-100, 570, "Loading", {fontFamily: 'Pixelify Sans', fontSize: '32px', fill: '#fff' }).setOrigin(0.5); 
        this.diceSpinningVideo = this.add.video(-50, 570, 'diceSpinningVideo');
        this.diceSpinningVideo.setScale(0.05);
        this.diceSpinningVideo.play(true);

        this.timeline = this.add.timeline();
        this.timeline.add({
            at: 400,
            tween: {
                targets: this.savingText,
                x: 80,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });
        this.timeline.add({
            at: 0,
            tween: {
                targets: this.diceSpinningVideo,
                x: 170,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });
        this.timeline.play();

        this.time.delayedCall(9000, () => {
            this.thankYouText = this.add.text(500, -100, "(this is the end of the demo)", {
                fontFamily: 'Pixelify Sans',
                fontSize: '32px',
                fill: '#fff'
            }).setOrigin(0.5);
            this.tweens.add({
                targets: this.thankYouText,
                y: 300,
                duration: 1000,
                ease: 'Sine.Out',
            });
        });
    }
}

class SaveScene extends Phaser.Scene {
    constructor() {
        super("saveScene");
    }

    preload() {
        this.MojiFace = this.load.image('catFace', './assets/images/MojiFace.png');
        this.savingMojiFace = this.load.image('savingMojiFace', './assets/images/MojiFace.png');
    }

    create() {
        this.saveRectangle = this.add.rectangle(500, -90, 730, 130, 0x02704a);
        this.savingText = this.add.text(-100, 570, "Saving", {fontFamily: 'Pixelify Sans', fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.warningText = this.add.text(500, -100, "When the\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0logo appears in the bottom left, the game is saving your progress, DON’T quit out while the game is saving", {
            fontFamily: 'Pixelify Sans', 
            fontSize: '32px', 
            fill: '#fff',
            wordWrap: {
                width: 700,
                useAdvancedWrap: true
            },
            align: 'center'
        }).setOrigin(0.5);

        // add both the cat pictures
        this.MojiFaceImage = this.add.image(360, -50, 'catFace');
        this.MojiFaceImage.setScale(3);

        this.savingMojiFaceImage = this.add.image(-50, 570, 'savingMojiFace');
        this.savingMojiFaceImage.setScale(3);

        // add timeline and tweens
        this.timeline = this.add.timeline();
        this.timeline.add({
            at: 200,
            tween: {
                targets: this.savingText,
                x: 70,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });
        this.timeline.add({
            at: 0,
            tween: {
                targets: this.savingMojiFaceImage,
                x: 155,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });
        this.timeline.add({
            at: 700,
            tween: {
                targets: this.MojiFaceImage,
                y: 267,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });
        this.timeline.add({
            at: 0,
            tween: {
                targets: [this.warningText, this.saveRectangle],
                y: 300,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });
        this.timeline.add({
            at: 1000,
            tween: {
                targets: this.savingMojiFaceImage,
                alpha: 0,
                duration: 1000,
                ease: 'Sine.InOut'
            }
        });
        this.timeline.add({
            at: 2000,
            tween: {
                targets: this.savingMojiFaceImage,
                alpha: 1,
                duration: 1000,
                ease: 'Sine.InOut'
            }
        });

        this.timeline.add({
            at: 3000,
            tween: {
                targets: this.savingMojiFaceImage,
                alpha: 0,
                duration: 1000,
                ease: 'Sine.InOut'
            }
        });

        this.timeline.add({
            at: 4000,
            tween: {
                targets: this.savingMojiFaceImage,
                alpha: 1,
                duration: 1000,
                ease: 'Sine.InOut',
                onComplete: () => {
                    this.tweens.add({
                        targets: [this.warningText, this.saveRectangle],
                        y: -100,
                        duration: 1000,
                        ease: 'Sine.In',
                    });
                    this.tweens.add({
                        targets: this.MojiFaceImage,
                        y: -50,
                        duration: 870,
                        ease: 'Sine.In',
                    });
                    this.tweens.add({
                        targets: this.savingText,
                        x: -200,
                        duration: 1000,
                        ease: 'Sine.In',
                    });
                    this.tweens.add({
                        targets: this.savingMojiFaceImage,
                        x: -100,
                        duration: 1000,
                        ease: 'Sine.In',
                        onComplete: () => {
                            this.cameras.main.fadeOut(1000, 0, 91, 61);
                            this.time.delayedCall(1000, () => {
                                this.scene.start("loadingScene");
                            });
                        }
                    });
                }
            }
        });

        this.timeline.play();
    }
}

class TitleScreen extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {
        // preload dice images and title text
        this.Dice1 = this.load.image('1.png', './assets/images/1.png');
        this.Dice2 = this.load.image('2.png', './assets/images/2.png');
        this.Dice3 = this.load.image('3.png', './assets/images/3.png');
        this.Dice4 = this.load.image('4.png', './assets/images/4.png');
        this.Dice5 = this.load.image('5.png', './assets/images/5.png');
        this.DiceDungeonText = this.load.image('DiceDungeonText.png', './assets/images/DiceDungeonText.png');

        // preload video
        this.DiceRollingVideo = this.load.video('DiceRollingVideo', './assets/MP4s/diceRolling.mp4', 'loadeddata', false, true);
    }

    create() {
        // change background color
        this.cameras.main.setBackgroundColor(0x0a5239);
        // make rect
        this.menuRectangle = this.add.rectangle(-200, 300, 400, 550, 0x02704a);

        // add dice images to scene and set scale
        this.dice1 = this.add.image(-100, 100, '1.png');
        this.dice1.setScale(10);
        this.dice2 = this.add.image(-100, 200, '2.png');
        this.dice2.setScale(10);
        this.dice3 = this.add.image(-100, 300, '3.png');
        this.dice3.setScale(10);
        this.dice4 = this.add.image(-100, 400, '4.png');
        this.dice4.setScale(10);
        this.dice5 = this.add.image(-100, 500, '5.png');
        this.dice5.setScale(10);

        this.DiceRollingVideo = this.add.video(710, 350, 'DiceRollingVideo');
        this.DiceRollingVideo.setScale(0.5);
        this.DiceRollingVideo.play();

        this.DiceDungeonText = this.add.image(725, -70, 'DiceDungeonText.png');
        this.DiceDungeonText.setScale(0.6);

        this.firstText = this.add.text(-200, 100, "Load Save", {fontFamily: 'Pixelify Sans', fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.secondText = this.add.text(-200, 200, "New Game", {fontFamily: 'Pixelify Sans', fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.thirdText = this.add.text(-200, 300, "Settings", {fontFamily: 'Pixelify Sans', fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.fourthText = this.add.text(-200, 400, "Credits", {fontFamily: 'Pixelify Sans', fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.fifthText = this.add.text(-200, 500, "Exit", {fontFamily: 'Pixelify Sans', fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        this.timeline = this.add.timeline();

        // Different tweens for each element in the scene, added to a timeline to play in sequence with delays between them
        this.timeline.add({
            at: 0,
            tween: {
                targets: this.menuRectangle,
                x: 225,
                duration: 1500,
                ease: 'Sine.Out'
            }
        });

        this.timeline.add({
            at: 200,
            tween: {
                targets: this.firstText,
                x: 250,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });

        this.timeline.add({
            at: 400,
            tween: {
                targets: this.secondText,
                x: 250,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });

        this.timeline.add({
            at: 600,
            tween: {
                targets: this.thirdText,
                x: 250,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });

        this.timeline.add({
            at: 800,
            tween: {
                targets: this.fourthText,
                x: 250,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });

        this.timeline.add({
            at: 1000,
            tween: {
                targets: this.fifthText,
                x: 250,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });

        this.timeline.add({
            at: 1200,
            tween: {
                targets: this.dice1,
                x: 100,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });
        
        this.timeline.add({
            at: 1400,
            tween: {
                targets: this.dice2,
                x: 100,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });

        this.timeline.add({
            at: 1600,
            tween: {
                targets: this.dice3,
                x: 100,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });

        this.timeline.add({
            at: 1800,
            tween: {
                targets: this.dice4,
                x: 100,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });

        this.timeline.add({
            at: 2000,
            tween: {
                targets: this.dice5,
                x: 100,
                duration: 1000,
                ease: 'Sine.Out'
            }
        });
        
        this.timeline.add({
            at: 2200,
            tween: {
                targets: this.DiceDungeonText,
                y: 70,
                duration: 1500,
                ease: 'Sine.Out'
            }
        });

        this.timeline.play();

        this.time.delayedCall(5000, () => {
            this.pulseTween = this.tweens.add({
                targets: this.dice1,
                scale: 10.5,
                duration: 500,
                yoyo: true,
                repeat: -1
            });
        });
        this.dice1.setInteractive();
        this.dice1.on('pointerover', () => {
            
            if (this.pulseTween) {
                this.pulseTween.stop();
            }

            this.tweens.add({
                targets: this.dice1,
                scale: 11,
                duration: 200,
                ease: 'Sine.Out'
            });
        });
        this.dice1.on('pointerout', () => {
            this.tweens.add({
                targets: this.dice1,
                scale: 10,
                duration: 200,
                ease: 'Sine.InOut',
                onComplete: () => {
                    // Restart the pulse after hover ends
                    if (this.pulseTween) {
                        this.pulseTween = this.tweens.add({
                            targets: this.dice1,
                            scale: 10.5,
                            duration: 500,
                            yoyo: true,
                            repeat: -1
                        });
                    }
                }
            })
        });
        this.dice1.on('pointerdown', () => {
            this.timeline.stop();
            this.timeline = this.add.timeline();
            this.timeline.add({
                at: 0,
                tween: {
                    targets: [this.menuRectangle, this.firstText, this.secondText, this.thirdText, this.fourthText, this.fifthText],
                    x: -200,
                    duration: 1000,
                    ease: 'Sine.In',
                    onComplete: () => {
                        this.scene.start("saveScene");
                    }
                }
            });

            this.timeline.add({
                at: 0,
                tween: {
                    targets: [this.dice1, this.dice2, this.dice3, this.dice4, this.dice5],
                    x: -100,
                    duration: 500,
                    ease: 'Sine.In'
                }
            });

            this.timeline.add({
                at: 0,
                tween: {
                    targets: this.DiceDungeonText,
                    y: -70,
                    duration: 1000,
                    ease: 'Sine.In'
                }
            });

            this.timeline.add({
                at: 0,
                tween: {
                    targets: this.DiceRollingVideo,
                    y: 900,
                    duration: 1000,
                    ease: 'Sine.In'
                }
            });

            this.timeline.play();
        });
    }

}

class Logo extends Phaser.Scene {
    constructor() {
        super("logoScene");
    }

    init() {
        this.cameras.main.setBackgroundColor(0x729482);
    }

    preload() {
        // loads the cat image
        this.load.image('Moji_Pixel 3.png', './assets/Moji_Pixel 3.png');
        this.load.spritesheet('Moji_Pixel_Walking_Spritesheet.png', "./assets/images/Moji_Pixel_Walking_Spritesheet.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("Moji_Pixel_Idle_Spritesheet.png", "./assets/images/Moji_Pixel_Idle_Spritesheet.png", { frameWidth: 32, frameHeight: 32 });

        // add audio assets
        this.catMeow = this.load.audio('catMeow', ['./assets/audio/catMeow.wav', './assets/audio/catMeow.mp3']);
        this.backgroundMusic = this.load.audio('backgroundMusic', ['./assets/audio/backgroundMusic.wav', './assets/audio/backgroundMusic.mp3']);
    }

    create() {

        // start background music and set it to loop
        this.sound.play('backgroundMusic', { loop: true });

        // add text to scene
        this.madeByText = this.add.text(500, -100, "A game by", {fontFamily: 'Pixelify Sans', fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.pixelCatText = this.add.text(500, 700, "Pixel Cat", {fontFamily: 'Pixelify Sans', fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

        // timeline for tweens
        const timeline = this.add.timeline();
        // adds Moji spritesheets to scene and creates animations for them, sets idle to invisible and plays walking animation
        this.MojiWalking = this.add.sprite(-300, 300, 'Moji_Pixel_Walking_Spritesheet.png');
        this.MojiWalking.setScale(10);
        this.MojiIdle = this.add.sprite(500, 300, 'Moji_Pixel_Idle_Spritesheet.png');
        this.MojiIdle.setScale(10);
        this.anims.create({
            key: 'Moji_Walk_Animation',
            frames: this.anims.generateFrameNumbers('Moji_Pixel_Walking_Spritesheet.png', { start: 0, end: 11 }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'Moji_Idle_Animation',
            frames: this.anims.generateFrameNumbers('Moji_Pixel_Idle_Spritesheet.png', { start: 0, end: 7 }),
            frameRate: 3,
            repeat: -1
        });
        this.MojiIdle.setVisible(false);
        this.MojiWalking.play('Moji_Walk_Animation');

        // set up tweens to be used in the timeline
        timeline.add({
            at: 0,
            tween: {
                targets: this.MojiWalking,
                x: 500,
                duration: 3999,
                ease: 'Sine.Out',
                onComplete: () => {
                    this.MojiWalking.stop();
                    this.MojiIdle.setVisible(true);
                    this.MojiIdle.play('Moji_Idle_Animation', false, 4); // need it to start on the 2nd frame to match the walking animation
                    this.sound.play('catMeow');
                    this.MojiWalking.setVisible(false);
                }
            }
        });

        timeline.add({
            at: 3500,
            tween: {
                targets: this.madeByText,
                y: 100,
                duration: 2000,
                ease: 'Sine.Out'
            }
        });

        timeline.add({
            at: 4000,
            tween: {
                targets: this.pixelCatText,
                y: 500,
                duration: 2000,
                ease: 'Sine.Out'
            }
        });

        timeline.add({
            at: 6000,
            tween: {
                targets: [this.MojiWalking],
                x: 1200,
                duration: 4000,
                ease: 'Sine.In',
                onStart: () => {
                    this.MojiIdle.stop();
                    this.MojiIdle.setVisible(false);
                    this.MojiWalking.setVisible(true);
                    this.MojiWalking.play('Moji_Walk_Animation');
                }
            }
        });

        timeline.add({
            at: 7500,
            tween: {
                targets: this.pixelCatText,
                y: 1000,
                duration: 2000,
                ease: 'Sine.In'
            }
        })

        timeline.add({
            at: 7000,
            tween: {
                targets: this.madeByText,
                y: -500,
                duration: 2000,
                ease: 'Sine.In'
            }
        })

        timeline.add({
            at: 10000,
            event: "sceneSwitch"
        });

        

        timeline.play();

        // event listener for scene switch at end of timeline
        timeline.on("sceneSwitch", () => {
            this.cameras.main.fadeOut(1000, 2, 91, 60);
            this.time.delayedCall(1000, () => {
                this.scene.start("titleScene");
            });
        });
    }


    update() {
    }
}

class StartScene extends Phaser.Scene {
    constructor() {
        super("startScene");
    }

    init() {
        this.cameras.main.setBackgroundColor(0x729482);
    }

    preload() {
        this.load.image('Button', './assets/images/Button.png');
    }
    
    create() {
        // add interactive start button (ensures user has clicked before playing audio in logo scene)
        this.startButton = this.add.image(500, 200, 'Button');
        this.fullScreenButton = this.add.image(500, 500, 'Button');
        this.startButton.setScale(10);
        this.fullScreenButton.setDisplaySize(300, 75);
        this.startButton.setInteractive();
        this.startButton.on('pointerdown', () => {
            this.scene.start("logoScene");
        });
        // create text
        this.startButtonText = this.add.text(500, 200, 'Start', {
            fontFamily: 'Pixelify Sans',
            fontSize: '150px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 0,
        }).setOrigin(0.5);
        this.fullscreenRecommendationText = this.add.text(500, 400, 'Make sure your browser is in fullscreen mode for best experience', {
            fontFamily: 'Pixelify Sans',
            fontSize: '32px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 0,
            wordWrap: {
                width: 600,
                useAdvancedWrap: true
            },
            align: 'center'
        }).setOrigin(0.5);

        this.fullScreenButton.setInteractive();
        this.fullScreenButton.on('pointerdown', () => {
            if (!this.scale.isFullscreen) {
                this.scale.startFullscreen();
            } else {
                this.scale.stopFullscreen();
            }
        });
        this.fullScreenButtonText = this.add.text(500, 500, 'Toggle Fullscreen', {
            fontFamily: 'Pixelify Sans',
            fontSize: '32px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 0,
        }).setOrigin(0.5);
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 1000,
    height: 600,
    backgroundColor: 0x0a5239,
    scene: [StartScene, SaveScene, LoadingScene, TitleScreen, Logo],
    // code to fix render settings to work for pixel art
    render: {
        pixelArt: true,
        antialias: false
    },
}

let game = new Phaser.Game(config);
