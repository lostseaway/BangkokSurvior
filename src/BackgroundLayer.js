var BackgroundLayer = cc.Node.extend({
	ctor: function() {
	    // this._super( new cc.Color4B( 127, 255 , 127, 255 ) );
	    this._super();
        this.setPosition( new cc.Point( 0, 0 ) );

		this.sky = cc.Sprite.create('img/sky.jpg');
        this.sky.setAnchorPoint(cc.p(0,0));
        this.sky.setPosition(cc.p(0,0));
        
        this.addChild(this.sky);

        this.floor = cc.Sprite.create( 'img/stage1_floor.png' );
        this.floor.setAnchorPoint(cc.p(0,0));
        this.floor.setPosition(cc.p(0,0));

        this.addChild(this.floor);


    }
});