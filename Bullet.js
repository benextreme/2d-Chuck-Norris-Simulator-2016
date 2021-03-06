var Bullet = function() 
{
	this.image = document.createElement("img");
	
	this.position = new Vector2();
	this.position.set(player.position.x, player.position.y);
	
	this.width = 40;
	this.height = 20;
	this.image.src = "bullet.png";
	
	if (player.direction == 0)
	{
		this.velocity = -20
		this.image.src = "bulletleft.png";

	}
	if (player.direction == 1)
	{
			this.image.src = "bulletright.png";

		this.velocity = 20
	}
};

Bullet.prototype.update = function(deltaTime)
{
	this.position.x += this.velocity * deltaTime * 60;
}
Bullet.prototype.draw = function()
{
	context.save();
	context.drawImage(this.image, this.position.x  - worldOffsetX, this.position.y );
	context.restore();
}
