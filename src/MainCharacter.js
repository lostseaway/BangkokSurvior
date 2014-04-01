var MainChar = cc.Sprite.extend({ 
	ctor : function(){
		this._super();
		this.setAnchorPoint(cc.p(0.3,0));
		this.standAction  = this.createStandAction();
		this.runAction(this.standAction);
		this.isAttack = false;
		this.enemys = null;
		this.facing = 1;
		this.maxHP = 1000;
		this.HP = 1000;
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
	},
	setHealthBar: function( healthBar ) {
		this.healthBar = healthBar;
	},
	Attacked : function(damage){
		this.HP -= damage;
		console.log(this.HP/this.maxHP);
		this.healthBar.setHP((this.HP/this.maxHP)*100);
	}
});