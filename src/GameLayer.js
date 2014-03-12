var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.mainChar = new MainChar();
        this.factory = new EnemyFactory(this.mainChar);
        this.Stage1 = new Stage1(this.mainChar,this.factory);
        this.contorller = new mainCharController(this.Stage1.WIDTH,this.Stage1.HEIGHT,this.mainChar);
        this.addChild(this.contorller);
        this.contorller.scheduleUpdate();
        this.addChild(this.Stage1);
        this.setKeyboardEnabled( true );

 
        return true;
    },
    onKeyDown: function(e){
        this.contorller.onKeyDown(e);
    },
    onKeyUp: function(e){
        this.contorller.onKeyUp(e);
    }
});

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});


