var Enemy = cc.Sprite.extend({
	ctor: function(mainChar){
		this._super();
		this.mainChar = mainChar;
		this.sX = 0;
		this.sY = 0;
		this.HP = 100;
		this.standAction  = this.createStandAction();
		this.walkAction = this.createWalkAction();
		this.runAction(this.standAction);
		this.vX = 0.5;
		this.vY = 0.5;
		this.state = 0;
		this.setScale(1.5);
		this.radius = 150;
		this.attR = 50;
		this.damage = 1;

	},
	update: function( dt ){
		var mainPosition = this.mainChar.getPosition();
		var position = this.getPosition();
		if(this.inRange()){
			if(this.healthBar != null && !this.healthBar.started){
				this.healthBar.started = true;
				this.addChild( this.healthBar );
			}
			this.move();
		}
		else{
			this.switchState(0);
		}
		if(this.healthBar == null && this.getContentSize().width!=0){
			console.log(this.getContentSize().width);
			this.healthBar = new EnemyHealthBar(this.getContentSize().width);
			this.setHealthBar(this.healthBar);
		}
		if(this.state == 2){
			this.attack();
		}

	},
	inRange: function(){
		var mainPosition = this.mainChar.getPosition();
		var position = this.getPosition();

		square_dist = Math.pow((position.x - mainPosition.x),2) + Math.pow((position.y - mainPosition.y),2)
    	return square_dist <= Math.pow(this.radius,2); 
	},
	move: function(){
		var position = this.getPosition();
		var mainPosition = this.mainChar.getPosition();
		if(mainPosition.x <= position.x) this.switchFac(0);
		else this.switchFac(1);

		if((mainPosition.x + this.attR >= position.x && mainPosition.x - this.attR <= position.x) && mainPosition.y == position.y){
			this.switchState(2);

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
    		else if(n==2){
    			this.stopAction(this.walkAction);
    			this.runAction(this.standAction);
    		}
    		this.state = n;
    	}
    },
    setHealthBar: function( healthBar ) {
		this.healthBar = healthBar;
		this.healthBar.setScale( 0.3 );
		this.healthBar.setPosition( -4, -10 );
	},
	isAttacked: function(){
		var enemyBox = this.getBoundingBoxToWorld();
		var mainBox = this.mainChar.getBoundingBoxToWorld();
		if(cc.rectOverlapsRect(enemyBox,mainBox)){
			// console.log("HIT!!");
			console.log(this.mainChar.facing);
			console.log(enemyBox.x +" "+mainBox.x);
			if((enemyBox.x >= mainBox.x && this.mainChar.facing == 1)||(enemyBox.x <= mainBox.x && this.mainChar.facing == 0 )){
				this.HP-=10;
				this.healthBar.setHP(this.HP);
				if(this.HP <= 0)this.removeFromParent(true);
			}
		}
	},
	attack: function(){
		this.mainChar.attacked(this.damage);
	}
});