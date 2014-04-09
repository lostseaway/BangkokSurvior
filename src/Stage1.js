var Stage1 = cc.Node.extend({
	ctor: function(mainChar,fatory) {
		this._super();
		this.WIDTH = 1000;
		this.HEIGHT = 200;
		this.mainChar = mainChar;
		this.fatory = fatory;
		this.fatory.hScene = this.HEIGHT;
		this.enemy = null;



		this.bg = new BackgroundLayer();
        this.bg.setPosition(cc.p(0,0));
        this.addChild(this.bg);

        this.mainChar.setPosition(cc.p(100,100));
		this.addChild(this.mainChar);

		this.spawnEnemy(5);
	},
	update : function(dt){
		if(this.enemy.length == 0)console.log("all enemy down!");
	},
	spawnEnemy: function(number){
		this.enemy = this.fatory.getEnemy(number);

		for(var i = 0;i < this.enemy.length;i++){
			this.enemy[i].setPosition(cc.p(this.enemy[i].sX,this.enemy[i].sY));
			this.enemy[i].scheduleUpdate();
			this.addChild(this.enemy[i]);
		}
		this.mainChar.enemys = this.enemy;
	}
});