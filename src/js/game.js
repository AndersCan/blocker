// mods by Patrick OReilly 
// Twitter: @pato_reilly Web: http://patricko.byethost9.com

var width = window.innerWidth;
var height = window.innerHeight;


var game = new Phaser.Game(width, height, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
    game.load.image('flyer', 'assets/sprites/phaser-dude.png');
    game.load.image('block', 'assets/sprites/blocker.png');

    //game.load.image('bouncer', 'assets/sprites/phaser-dude.png');
}

var image;
var bouncer;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
    image = game.add.sprite(0, 0, 'flyer');


    game.physics.enable(image, Phaser.Physics.ARCADE);

    //  This gets it moving
    image.body.velocity.setTo(200, 200);

    //  This makes the game world bounce-able
    image.body.collideWorldBounds = true;

    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors. "1" is 100% energy return
    image.body.bounce.set(1);

    ////
    //bouncer = new Phaser.Rectangle(0, 550, 800, 50);
    bouncer = game.add.sprite(300, 500, 'block');
    game.physics.enable(bouncer, Phaser.Physics.ARCADE);
    bouncer.body.collideWorldBounds = true;

    bouncer.body.immovable = true;
    var left = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    left.onDown.add(moveleft, this);

    var right = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    right.onDown.add(moveright, this);

    left.onUp.add(stop);
    right.onUp.add(stop);

    //bouncer.body.maxVelocity.x = 300;
    bouncer.body.maxVelocity.y = 0;


    // enable touch

    //  Input Enable the sprites
    bouncer.inputEnabled = true;

    //  Allow dragging - the 'true' parameter will make the sprite snap to the center
    bouncer.input.enableDrag(true);


// Create walls
//    var leftWall = game.add.sprite(0, 0, null);
//    game.physics.enable(leftWall, Phaser.Physics.ARCADE);
//    leftWall.body.setSize(50, 50, 0, 0); // set the size of the rectangle


    //var graphics = game.add.graphics(100, 100);
    //graphics.lineStyle(2, 0x0000FF, 1);
    //graphics.drawRect(50, 250, 100, 100);
}

var speed = 400;
function moveright() {
    bouncer.body.velocity.setTo(speed, 0);

}
function moveleft() {
    bouncer.body.velocity.setTo(-speed, 0);
}

function stop() {
    bouncer.body.velocity.setTo(0, 0);
}


function update() {
    game.physics.arcade.collide(image, bouncer, function() { console.log("Crash"); }, null, this);
    //nothing required here

}

function render() {

    //debug helper
    //game.debug.spriteInfo(image, 32, 32);
    //game.debug.body(bouncer);

}