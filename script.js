class TitleScreen extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    preload() {

    }

    create() {
        this.titleText = this.add.text(400, 300, "My Game Title", { fontSize: '64px', fill: '#fff' });
    }

    update() {

    }

}

class Logo extends Phaser.Scene {
    constructor() {
        super("introScene");
    }

    preload() {
        // loads the cat image
        this.load.image('Moji_Pixel 3.png', './assets/Moji_Pixel 3.png');
        this.load.spritesheet('Moji_Pixel_Walking_Spritesheet.png', "./assets/Moji_Pixel_Walking_Spritesheet.png", { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet("Moji_Pixel_Idle_Spritesheet.png", "./assets/Moji_Pixel_Idle_Spritesheet.png", { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // adds Moji (the cat) to the scene, starting off-screen to the left
        this.MojiWalking = this.add.sprite(-300, 300, 'Moji_Pixel_Walking_Spritesheet.png');
        this.MojiWalking.setScale(10);
        this.MojiIdle = this.add.sprite(400, 300, 'Moji_Pixel_Idle_Spritesheet.png');
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
        this.tweens.add({
            targets: this.MojiWalking,
            x: 400,
            duration: 2000,
            ease: 'Sine.Out'
        })
    }

    update() {
        if (this.MojiIdle.visible == false && this.MojiWalking.x >= 400) {
            this.MojiWalking.stop();
            this.MojiIdle.setVisible(true);
            this.MojiIdle.play('Moji_Idle_Animation');
            this.MojiWalking.setVisible(false);
        }
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0x729482,
    scene: [Logo],
    // code to fix render settings to work for pixel art
    render: {
        pixelArt: true,
        antialias: false
    },
}

let game = new Phaser.Game(config);
