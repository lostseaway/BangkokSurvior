var Stage1 = cc.Node.extend({
	ctor: function(mainChar,fatory) {
		this._super();
		this.WIDTH = 2400;
		this.HEIGHT = 200;
		this.mainChar = mainChar;
		this.fatory = fatory;
		this.fatory.hScene = this.HEIGHT;
		this.enemy = [];
		this.vStage = 4;
		this.isMove = true;
		this.isSpawn = false;
		this.set = [1600,2400];


		this.bg = new BackgroundLayer();
        this.bg.setPosition(cc.p(0,0));
        this.addChild(this.bg);

        this.mainChar.setPosition(cc.p(100,100));
		this.addChild(this.mainChar);

		// this.spawnEnemy(5);
	},
	update : function(dt){
		var mainPos = this.mainChar.getBoundingBoxToWorld();
		for(var i = 0;i<this.enemy.length;i++){
			if(!this.enemy[i].isAlive)this.enemy.splice(i,1);
		}
		if(this.isMove){

			if(mainPos.x>=700)this.moveBG(-this.vStage);
			if(mainPos.x<=50)this.moveBG(this.vStage);
		}
		if(this.enemy.length == 0) this.isMove = true;
		if(this.mainChar.getPosition().x >=this.set[0]){
			this.isMove = false;
			// this.isSpawn = true;
			this.spawnEnemy(3,this.set[0]);
			this.set.splice(0,1);
		}

		

	},
	spawnEnemy: function(number,position){
		this.enemy = this.fatory.getEnemy(number,position);

		for(var i = 0;i < this.enemy.length;i++){
			this.enemy[i].setPosition(cc.p(this.enemy[i].sX,this.enemy[i].sY));
			this.enemy[i].scheduleUpdate();
			this.addChild(this.enemy[i]);
		}
		this.mainChar.enemys = this.enemy;
	},
	moveBG : function(v){
		var stagePos = this.getPosition();
		if(v>=0 && stagePos.x==0)return
		this.setPosition(cc.p(stagePos.x+v,stagePos.y));

	}
});