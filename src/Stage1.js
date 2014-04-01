var Stage1 = cc.Node.extend({
	ctor: function(mainChar,fatory) {
		this._super();
		this.WIDTH = 1000;
		this.HEIGHT = 200;
		this.mainChar = mainChar;
		this.fatory = fatory;
		this.fatory.hScene = this.HEIGHT;
		this.spawnEnemy(5);

		this.mainChar.setPosition(cc.p(100,100));
		this.addChild(this.mainChar);
	},
	spawnEnemy: function(number){
		var enemy = this.fatory.getEnemy(number);

		for(var i = 0;i < enemy.length;i++){
			enemy[i].setPosition(cc.p(enemy[i].sX,enemy[i].sY));
			enemy[i].scheduleUpdate();
			this.addChild(enemy[i]);
		}
		this.mainChar.enemys = enemy;
	}
});