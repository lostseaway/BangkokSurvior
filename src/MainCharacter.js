var MainChar = cc.Sprite.extend({ 
	ctor : function(){
		this._super();
		this.setAnchorPoint(cc.p(0.5,0.5));
		this.standAction  = this.createStandAction();
		this.runAction(this.standAction);
	},
	createStandAction : function(){
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'img/mainChar_s1.png' );
		animation.addSpriteFrameWithFile( 'img/mainChar_s2.png' );
		animation.addSpriteFrameWithFile( 'img/mainChar_s3.png' );
		animation.addSpriteFrameWithFile( 'img/mainChar_s4.png' );

		// console.log( animation.getDelayPerUnit() );
		animation.setDelayPerUnit( 0.5 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
	}
});