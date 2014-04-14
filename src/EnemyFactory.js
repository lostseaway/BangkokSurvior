var EnemyFactory = cc.Node.extend({
	ctor: function(mainChar){
		this.mainChar = mainChar;
	},
	getEnemy: function( number , position){
		set = [];
		for(var i = 0;i < number ;i++){
			var enemy = new Enemy(this.mainChar);
			this.genPostion(enemy , position);
			set.push(enemy);
		}
		return set;
	},
	genPostion: function( enemy , position ){
		var setX = [position - 700, position - 100];
		enemy.sX = setX[Math.round(Math.random())];
		enemy.sY = Math.round(Math.random()*this.hScene);
		console.log("sX : "+enemy.sX+" sY : "+enemy.sY);

	}
});