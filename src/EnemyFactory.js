var EnemyFactory = cc.Node.extend({
	ctor: function(mainChar){
		this.sScene = 0;
		this.hScene = 600;
		this.mainChar = mainChar;
	},
	getEnemy: function( number ){
		set = [];
		for(var i = 0;i < number ;i++){
			var enemy = new Enemy(this.mainChar);
			this.genPostion(enemy);
			set.push(enemy);
		}
		return set;
	},
	genPostion: function( enemy ){
		var setX = [this.sScene + 10, this.sScene + 730];
		enemy.sX = setX[Math.round(Math.random())];
		enemy.sY = Math.round(Math.random()*this.hScene);
		console.log("sX : "+enemy.sX+" sY : "+enemy.sY);

	}
});