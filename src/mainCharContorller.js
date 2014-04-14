var mainCharController = cc.Node.extend({
	ctor: function(width,height,mainChar){
		this._super();
		this.WIDTH = width;
		this.HEIGHT = height;
		this.mainChar = mainChar;
		this.xV = 0;
		this.yV = 0;
		this.keyL = false;
		this.keyR = false;
		this.keyU = false;
		this.keyD = false;
		this.keyA = false;

	},
	update: function(dt){
		// console.log("eie");
		if(this.keyL) this.xV = -4;
		if(this.keyR) this.xV = 4;
		if(this.keyU) this.yV = 4;
		if(this.keyD) this.yV = -4;
		this.move();
	},
	onKeyDown: function(e){
		// console.log("Down : "+e);
		if(e == 37){
			if(!this.keyR){ 
				this.keyL = true;
				this.mainChar.setFlippedX(true);
				this.mainChar.facing = 0;
			}
			// console.log(this.keyL);
		}
		if(e == 39){
			if(!this.keyL) {
				this.keyR = true;
				this.mainChar.setFlippedX(false);
				this.mainChar.facing = 1;
			}
			// this.move();
			// console.log(this.keyR);
		}
		if(e == 38){
			if(!this.keyD) this.keyU = true;
			// console.log(this.keyU);
		}
		if(e == 40){
			if(!this.keyU) this.keyD = true;
			// console.log(this.keyD);
		}
		if(e== 32){
			if(!this.keyA){
				this.keyA = true;
				this.Attack();
			}
		}
	},
	onKeyUp: function(e){
		// console.log("Re : "+e);
		if(e == 37){
			this.keyL = false;
			this.xV = 0;
			// console.log(this.keyL);
		}
		if(e == 39){
			this.keyR = false;
			this.xV = 0;
			// console.log(this.keyR);
		}
		if(e == 38){
			this.keyU = false;
			this.yV = 0;
			// console.log(this.keyU);
		}
		if(e == 40){
			this.keyD = false;
			this.yV = 0;
			// console.log(this.keyD);2
		}
		if(e == 32){
			this.keyA = false;
		}

	},
	move: function(){
		var pos = this.mainChar.getPosition();
		if(pos.y+this.yV <= this.HEIGHT && pos.y+this.yV >=0){
			this.mainChar.setPosition(pos.x+this.xV,pos.y+this.yV);
		}
	},
	Attack: function(){
		this.mainChar.isAttack = true;
		// console.log("Attack!!");
		for(var i = 0;i<this.mainChar.enemys.length;i++){
			this.mainChar.enemys[i].isAttacked();
		}
		this.mainChar.isAttack = false;
	}
})