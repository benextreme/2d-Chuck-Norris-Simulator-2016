var LEFT = -1;
var RIGHT = 1;

var ANIM_MAX = 9;

var Enemy = function() 
{
	this.image = document.createElement("img");
	this.image.src = "spaghetti2.png";


	this.width = 100;
	this.height = 100;
	
	this.position = new Vector2();
	this.position.set(canvas.width/2, canvas.height/2);
	
	
	this.velocity = RIGHT
	
	this.direction = LEFT;
	
	this.falling = true;
	this.jumping = false;
	this.score = 0;
	this.lives = 3;
	};
	
	
Enemy.prototype.update = function(deltaTime)
{
	this.moveRight = true;
	
	if(this.pause > 0)
	{
		this.pause -= deltaTime;
	}
	else
	{
		var ddx = 0; // acceleration
		var tx = pixelToTile(this.position.x);
		var ty = pixelToTile(this.position.y);
		var nx = (this.position.x)%TILE; // true if enemy overlaps right
		var ny = (this.position.y)%TILE; // true if enemy overlaps below
		var cell = cellAtTileCoord(LAYER_PLATFORMS, tx, ty);
		var cellright = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty);
		var celldown = cellAtTileCoord(LAYER_PLATFORMS, tx, ty + 1);
		var celldiag = cellAtTileCoord(LAYER_PLATFORMS, tx + 1, ty + 1);
		if(this.moveRight)
		{
			if(celldiag && !cellright) 
			{
				ddx = ddx + ENEMY_ACCEL; // enemy wants to go right
			}
			else 
			{
				this.velocity.x = 0;
				this.moveRight = false;
				this.pause = 0.5;
			}
		}
		if(!this.moveRight)
		{
			if(celldown && !cell) 
			{
				ddx = ddx - ENEMY_ACCEL; // enemy wants to go left
			}
			else 
			{
				this.velocity.x = 0;
				this.moveRight = true;
				this.pause = 0.5;
			}
		}
		this.position.x = Math.floor(this.position.x + (deltaTime * this.velocity.x));
		this.velocity.x = bound(this.velocity.x + (deltaTime * ddx),
		-ENEMY_MAXDX, ENEMY_MAXDX);
	}

}





Enemy.prototype.draw = function()
{
	context.drawImage(this.image, this.position.x - worldOffsetX, this.position.y);
}