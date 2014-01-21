/**
* 
*/
Background = Class.extend({
	img: null,

	onImageLoad: function() {
		// Callback context.
		var img = this;
		console.log("Image Loaded");
		game.ctx.drawImage(img, 0, 0);
		game.canvas.appendChild(img);
	},

	setup: function() {
	  	this.img = new Image();
	  	this.img.onload = this.onImageLoad;
	  	this.img.src = "img/pig.png";
	}
});