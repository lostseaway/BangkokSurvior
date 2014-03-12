var Enemy = cc.Sprite.extend({
	ctor: function(mainChar){
		this._super();
		this.mainChar = mainChar;
		this.sX = 0;
		this.sY = 0;
		this.standAction  = this.createStandAction();
		this.walkAction = this.createWalkAction();
		this.runAction(this.standAction);
		this.vX = 0.5;
		this.vY = 0.5;
		this.state = 0;
		this.setScale(1.5);
	},
	update: function( dt ){
		var position = this.getPosition();
		var mainPosition = this.mainChar.getPosition();
		if(mainPosition.x <= position.x) this.switchFac(0);
		else this.switchFac(1);

		if(mainPosition.x == position.x && mainPosition.y == position.y){
			this.switchState(0);
		}
		else{
			this.switchState(1);
			if(mainPosition.x > position.x){
				if(mainPosition.y > position.y) this.setPosition(cc.p(position.x + this.vX , position.y + this.vY));
				else if (mainPosition.y < position.y) this.setPosition(cc.p(position.x + this.vX , position.y - this.vY));
				else this.setPosition(cc.p(position.x + this.vX , position.y));
			}
			else if (mainPosition.x < position.x){
				if(mainPosition.y > position.y) this.setPosition(cc.p(position.x - this.vX , position.y + this.vY));
				else if (mainPosition.y < position.y) this.setPosition(cc.p(position.x - this.vX , position.y - this.vY));
				else this.setPosition(cc.p(position.x - this.vX , position.y));
			}
			else{
				if(mainPosition.y > position.y) this.setPosition(cc.p(position.x , position.y + this.vY));
				else if (mainPosition.y < position.y) this.setPosition(cc.p(position.x , position.y - this.vY));
				
			}
		}

	},
	switchFac: function( n ){
		//fac to left side
		if(n == 0){
			this.setFlippedX(false);
		}
		//fac to right side
		if(n == 1){
			this.setFlippedX(true);
		}
	},
	createStandAction: function() {
		var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'img/cerby_s1.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_s1.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_s1.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_s1.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_s1.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_s1.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_s1.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_s2.png' );
		// console.log( animation.getDelayPerUnit() );
		animation.setDelayPerUnit( 0.2 );
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },
    createWalkAction: function(){
    	var animation = new cc.Animation.create();
		animation.addSpriteFrameWithFile( 'img/cerby_l1.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_l2.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_l3.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_l4.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_l3.png' );
		animation.addSpriteFrameWithFile( 'img/cerby_l2.png' );
		// console.log( animation.getDelayPerUnit() );
		animation.setDelayPerUnit( 0.1);
		return cc.RepeatForever.create( cc.Animate.create( animation ) );
    },
    switchState: function(n){
    	if(n!=this.state){
    		if(n==1){
    			this.stopAction(this.standAction);
    			this.runAction(this.walkAction);
    		}
    		else if(n==0){
    			this.stopAction(this.walkAction);
    			this.runAction(this.standAction);
    		}
    		this.state = n;
    	}
    }
});