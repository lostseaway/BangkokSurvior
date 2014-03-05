var Stage1 = cc.Node.extend({
	ctor: function(mainChar){
		this._super();
		this.WIDTH = 1000;
		this.HEIGHT = 200;
		this.mainChar = mainChar;
		this.mainChar.setPosition(cc.p(10,10));
		this.addChild(this.mainChar);
	}
});