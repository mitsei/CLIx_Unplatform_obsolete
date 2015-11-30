var game = new Phaser.Game(800, 600, Phaser.CANVAS, '',{preload:preload, create:create, update:update});
//static_url += 'static/modules/inclined_plane_experiment/';

function preload() {
          
    game.load.image('triangle', static_url + 'triangle.png',200,200);   //this loads a spritesheet (cachekey, filename, dimensions of one single frame in the spritesheet x, y)
    game.load.image('wheel', static_url + 'wheel.png',50,50);
    game.load.image('sky', static_url + 'sky.png');
    game.load.image('crumb', static_url + 'crumb.png');
    // game.load.image('stars', 'stars-tilingsprite.png'); // this loads an image (in that case an image that is usable as tilingimage in x and y directions)
    // game.load.image('hills', 'hills-tilingsprite.png'); // another image that can be used as tiling image in the x direction
    // game.load.tilemap('testmap', 'test-tilemap-polygon.json', null, Phaser.Tilemap.TILED_JSON);  // this loads the json tilemap created with tiled (cachekey, filename, type of tilemap parser)
    // game.load.image('test-tileset', 'test-tileset.png'); // this loads a very important image - it is the tileset image used in tiled to create the map  (cachekey, filename)
    /*
    this tileset image is loaded in tiled to create the tilemap, the NAME of this tileset will automatically be the name of the file without extension - this name is stored in the json file as
    reference to the specific tileset image. (you could rename this tileset in tiled but don't confuse yourself) 
    the "cachekey" needs to be the exact same name the tilset is named in tiled !
    */
    game.load.physics('physicsData', static_url + 'shapefile.json');

}

var cursors;

var triangle;
var triangleProperties;
var triangleHeight;

//var triangleLocation = [[200, 0], [200, 200], [0, 200]];
var triangleModel;

var wheel;


function create() {
    
    
    game.physics.startSystem(Phaser.Physics.P2JS); 
    game.physics.p2.gravity.y = 10000; //1400 
    game.physics.p2.friction = 100;
    // game.physics.p2.restitution = 0.8;
    //  A simple background for our game
    sky = game.add.sprite(0, 0, 'sky');
    sky.fixedToCamera=true;
    
    triangle = game.add.sprite(650,(game.world.height-100), 'triangle');
    // triangle.anchor.setTo(20,2);
    
    
    
    game.physics.p2.enable(triangle);
    triangle.body.clearShapes();
    // triangle.body.loadPolygon('physicsData', 'triangle');
    // triangle.body.addShape([[200, 0], [200, 200], [0, 200]]);
    //triangle.body.adjustCenterOfMass();
    
    //triangle.body.addPolygon({},[[200, 0], [200, 200], [0, 200],[0,0]]);
    triangle.body.static = true;
    //  var polygon = new p2.Body({ mass : 1, position:[0,2] }); 
    //  var path = [[200, 0], [200, 200], [0, 200], [0.5, 0.5]];
    //  polygon.fromPolygon(path); 
    //  triangle.body.data.addBody(polygon);
    

    wheel = game.add.sprite(780, 380, 'wheel');
    //wheel.anchor.setTo(0.5,0.5);
    wheel.scale.setTo(0.05,0.05); 
    game.physics.p2.enable(wheel);
    wheel.body.setCircle(15,0,0);


    triangle.body.debug = true;
    // wheel.body.debug = true;



    triangleProperties = game.add.text(16, 16, wheel.body.angularVelocity , { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    //var jsonData = JSON.parse(game.cache.getPhysicsData('physicsData'));
    triangleModel = game.cache.getPhysicsData('physicsData');
    scaleBody(triangleModel.triangle, 2, 1.5)
    triangle.scale.setTo(2,1.5)
    triangle.body.loadPolygon('physicsData', 'triangle');
    triangle.body.static = true;    
    
    crumbs = game.add.group();
    crumbGenerator = game.time.events.loop(Phaser.Timer.SECOND * .01, generateCrumb);
    crumbGenerator.timer.start();

}

function update() {
        
    triangleProperties.text = Math.abs(Math.round(wheel.body.angularVelocity*10) / 10);

    // var xScale = 0.999; yScale = 1.001;

    // triangle.scale.x *= xScale;
    // triangle.scale.y *= yScale;
    // scaleBody(triangleModel.triangle, xScale, yScale);
    // triangle.body.clearShapes();
    // // triangle.anchor.setTo(1,1);
    // triangle.body.loadPolygon('physicsData', 'triangle');
    // triangle.body.addPolygon({}, triangleLocation);
    // triangle.body.adjustCenterOfMass();
    // triangle.body.debugBody.draw();
    // crumbs.forEach(function(sprite) {
    //     crumb.alpha -= .1;
    // });
   
    if (cursors.left.isDown)
    {
        //  Move to the left
        wheel.body.angularForce += -100;

    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        wheel.body.angularForce += 100;

    }

    // triangle.body.addPolygon({}, [[0, -50], [-50, 0], [0, 50], [50, 0]]);

}

function scaleBody(objectModel, xScale, yScale) {
    //objectModel[0].forEach(function(x) { x *= 1.5 });

    var index; var len;
    for ( index = 0, len = objectModel[0].shape.length; index < len; index++) {
        //console.log(objectModel[0].shape[index]);
        
        if (index % 2 === 0) {
            objectModel[0].shape[index] *= xScale; } // x transform
        else { objectModel[0].shape[index] *= yScale;} // y transform
    }
}


// function transformBody(bodyData, xScale, yScale, xOffset, yOffset) {

//     var index; var len;
//     for ( index = 0, len = bodyData.length; index < len; index++) {
        
//         // x transform
//         bodyData[index][0] += xOffset;
//         bodyData[index][0] *= xScale; 
        
//         // y transform
//         bodyData[index][0] *= xOffset;
//         bodyData[index][0] *= yScale; 
        
//     }
// }

var generateCrumb = function() {
    crumb = crumbs.create(wheel.x,wheel.y, 'crumb')
    crumb.anchor.setTo(.5,.5);
    crumb.scale.setTo(0.3,0.3); 
    //     crumbTimeout = game.time.events.add(Phaser.Timer.SECOND * 2, function() {
    //    this.crumb.alpha -= 1;
    //      });
    //      crumbTimeout.timer.start();
    
};
