class Intro extends Phaser.Scene {
    constructor() {
        super("introScene");
    }

    preload() {
        // loads the cat image
        this.load.image('Moji_Pixel 3.png', './assets/Moji_Pixel 3.png');
    }

    create() {
        // adds the cat to the scene, starting off-screen to the left
        this.Moji = this.add.image(-300, 300, 'Moji_Pixel 3.png');
        this.Moji.setScale(0.5);
        this.tweens.add({
            targets: this.Moji,
            x: 300,
            duration: 2000,
            ease: 'EaseOutSine'
        })
    }

    update() {
        // moves the cat into center from the left
        if (this.Moji.x < 400) {
            this.Moji.x += 5;
        }
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0x729482,
    scene: [Intro],
}

let game = new Phaser.Game(config);
