var GameLayer = cc.LayerColor.extend({
    init: function() {
        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );
 
        // this.mainChar  = new mainChar(0,10);
        // this.mainChar.setPosition(new cc.Point(0 * 40 ,10 * 40));
        // this.addChild(this.mainChar);
        // this.mainChar.scheduleUpdate();

        this.mainChar = new MainChar();
        this.mainChar.setPosition(cc.p(100,400));
        this.addChild(this.mainChar);

        this.setKeyboardEnabled( true );
 
        return true;
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


