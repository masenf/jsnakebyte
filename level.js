/* level.js: level, movement, board handling */


function initGame(canvas_id, width, height, block_size)
{
	// attach to and resize the main canvas
    c = document.getElementById(canvas_id);
    c.setAttribute('width',width*block_size);
    c.setAttribute('height',height*block_size);

    // create the board object
    var board = {
        ctx : c.getContext('2d'),
        block_size : block_size,
        width : width,					// width and height defined in block units (not px)
        height : height,
        board : new Array,				// staging area for changes
        active_board : new Array,		// what is currently displayed
        blocks : initBlocks(block_size,block_size),
        board_timer : 0,
        board_timer_max : 0,
        door_open : false,
        clearBoard : function ()
        {
            for (i = 0; i<this.board.length; i++)
            {
                for (j = 0; j<this.board[i].length; j++)
                    this.board[i][j] = JSB_EMPTY;
            }
        },
        drawBorder : function ()
        {
            for (j = 0; j < this.height; j++)
            {
                this.board[0][j] = (j < this.height - this.height/4) ? JSB_TIMER : JSB_BORDER;
                this.board[this.width-1][j] = (j < this.height - this.height/4) ? JSB_TIMER : JSB_BORDER;
            }
            for (i = 0; i < this.width; i++)
            {
                this.board[i][0] = JSB_BORDER;
                this.board[i][this.height-1] = JSB_BORDER;
            }
        },
        loadRoom : function (room)
        {
            if (room)
            {
                this.board = room;
            } else {
                this.clearBoard();
            }
            this.drawBorder();
        },
        openDoor : function (x,y,type)           // where x,y specify the location for the door, type is the block_type for the door
        {
            this.board[x-2][y] = JSB_DOOR_EDGE_LT;
            this.board[x-1][y] = JSB_DOOR_MAIN;
            this.board[x][y] = type;
            this.board[x+1][y] = JSB_DOOR_MAIN;
            this.board[x+2][y] = JSB_DOOR_EDGE_RT;
            this.door_open = true;
        },
        closeDoor : function (x,y)
        {
            for (i=x-2; i <= x+2; i++)
                this.board[i][y] = JSB_BORDER;
            this.door_open = false;
        },
        incrementTimer : function ()
        {
            var base = Math.floor(this.height - this.height / 4);
            var old_height = Math.floor((3 * this.height / 4)*(this.board_timer / this.board_timer_max));
            this.board_timer++;
            var new_height = Math.floor((3 * this.height / 4)*(this.board_timer / this.board_timer_max));
            for (j = base - new_height; j <= base - old_height; j++)
            {
                this.board[0][j] = JSB_BORDER;
                this.board[this.width-1][j] = JSB_BORDER;
            }
            return parseInt(this.board_timer / this.board_timer_max);
        },
        resetTimer : function () { 
            this.board_timer = 0; 
            this.board_timer_max = Math.floor(Math.sqrt(this.height * this.width) * 1.8); 
            this.drawBorder(); 
        },
        updateBoard : function()
        {
            for (i = 0; i<this.width; i++)
            {
                for (j = 0; j<this.height; j++)
                {
                    if (this.active_board[i][j] != this.board[i][j])
                    {
                        this.ctx.putImageData(this.blocks[this.board[i][j]],i*this.block_size,j*this.block_size);
                        this.active_board[i][j] = this.board[i][j];
                    }
                }
            }

        },
		plums : new Array(),			// stores the position and direction of all plums
		clearPlums : function () {
			this.plums = new Array();
		},
		stepPlums : function () {
			for (p in this.plums)
			{
				var pl = this.plums[p];
				var dir = pl.dir;
				var possibilities = [dir, 
				                    (dir + 3) % 4, 
									(dir + 1) % 4, 
									(dir + 2) % 4];
				var newpos = {x:0, y:0, dir:0};
				for (d in possibilities)
				{
					var dir = possibilities[d];
					newpos.x = pl.x;
					newpos.y = pl.y;
					newpos.dir = dir;
					// determine new coordinates for plum
					switch (newpos.dir)
					{
						case 0:			// UP-RIGHT
							newpos.y--;
							newpos.x++;
							break;
						case 1:			// UP-LEFT
							newpos.y--
							newpos.x--;
							break;
						case 2:			// DOWN-LEFT
							newpos.y++;
							newpos.x--;
							break;
						case 3:			// DOWN-RIGHT
							newpos.y++
							newpos.x++;
							break;
					}
					if (this.board[newpos.x][newpos.y] == 0)
					{
						this.board[pl.x][pl.y] = JSB_EMPTY;
						this.board[newpos.x][newpos.y] = JSB_PLUM;
						this.plums[p] = newpos;
						break;
					}
				}
			}
		}
    };
    var snake = {
        /* direction codes:
         * 0 - up
         * 1 - left
         * 2 - down
         * 3 - right
         * 4 - upper right corner
         * 5 - upper left corner
         * 6 - lower left corner
         * 7 - lower right corner
         */

        length : 0,
        max_length : 10,
        links : new Array(),
        moves : new Array(),
        head : function () { return this.links[this.links.length - 1]; },
        queue_turn : function (str_direction) {
            if (str_direction.toLowerCase() == 'left' || str_direction.toLowerCase() == 'right')
                this.moves.push(str_direction.toLowerCase());
        },
        left : function () {          	// return new direction and block type for turn
            var neck = this.head();
            var turn = {
                dir : (neck.dir + 1) % 4,
                block : neck.dir + 4 + JSB_SNAKE_UP
            };
            console.log("new dir: " + turn.dir + "; block: " + turn.block);
            return turn;
        },
        right : function () {
            var neck = this.head();
            var turn = {
                dir : (neck.dir > 0) ? neck.dir - 1 : 3,
                block : ((neck.dir == 3) ? 4 : neck.dir + 5) + JSB_SNAKE_UP
            };
            console.log("new dir: " + turn.dir + "; block: " + turn.block);
            return turn;
        },
        step : function () {            // move the snake ahead animation step
            var link = {				// the new head link
                x : this.head().x,
                y : this.head().y,
                dir : this.head().dir,
                block : this.head().block
            };
            var changed = new Array;	// store changed cells and only update them
            // see if there is a move queued
            if (this.moves.length > 0)
            {
                var next_move = this.moves.shift();
                if (next_move == 'left')
                    next_move = this.left();
                else if (next_move == 'right')
                    next_move = this.right();
                if (next_move.block) 
                {
                    this.links[this.links.length - 1].dir = next_move.dir;
                    this.links[this.links.length - 1].block = next_move.block;
                    link.dir = next_move.dir;
                    link.block = next_move.dir + JSB_SNAKE_UP;
                    changed.push({x : this.head().x, y : this.head().y, block : next_move.block});
                }
            } else {
                // advance the special head piece
				var h = this.head();
                changed.push({x : h.x, y : h.y, block : h.block});
            }
			// determine new coordinates for head
            switch (link.dir)
            {
                case 0:			// UP
                    link.y--;
                    break;
                case 1:			// LEFT
                    link.x--;
                    break;
                case 2:			// DOWN
                    link.y++;
                    break;
                case 3:			// RIGHT
                    link.x++;
                    break;
            }
            if (link.y >= 0)			// allows for exiting a room (only add the link if
            {							// it is within the bounds of the board)
                this.links.push(link);
                this.length++;
            }

			// advance the tail, unless we're growing
            if (this.length > this.max_length)
            {
                changed.push({x : this.links[0].x, y : this.links[0].y, block : 0});
                this.links.shift();
                this.length--;
                if (this.length > 0)
                    changed.push({x : this.links[0].x, y : this.links[0].y, block : ((this.links[0].dir % 2) + JSB_SNAKETAIL_UPDN)});
            }
            return changed;
        }
    }

	// main game controller
    var game = {
        apples : 0,
        entrance : 0,
        timer_active : true,
        reset : function (x,y,dir) {  // reset the snake and start it at pos(x,y)
            var link = {
                x : x,
                y : y,
                dir : dir,
                block : dir + 2
            };
            this.entrance = link;
            this.apples = 0;
            this.board.clearBoard();
            this.board.resetTimer();
            this.board.openDoor(x,y,JSB_ENTRY);
            this.board.updateBoard();
            this.snake.moves = new Array();
            this.snake.links = new Array();
            this.snake.length = 1;
            this.snake.max_length = 10;
            this.snake.links.push(link);
            this.redraw();
            this.timer_active = true;
        },
        redraw : function (changed) {
            var head = this.snake.head();
            
            // close doors if necessary
            if (this.board.door_open)
            {
                if (this.board.board[this.entrance.x][this.entrance.y] == JSB_EMPTY)
                    this.board.closeDoor(this.entrance.x, this.entrance.y);
            }

            // update snake body changes
            for (ch in changed)
                this.board.board[changed[ch].x][changed[ch].y] = changed[ch].block;
				
			// update plum positions
			this.board.stepPlums();
            
            // snag next collision
            if (head) 
            {
                var collision = this.board.board[head.x][head.y];
                // update snake head position
				if (collision != JSB_PLUM)
					this.board.board[head.x][head.y] = ((head.dir % 2) + JSB_SNAKEHEAD_UPDN);
            }

            if (collision == JSB_APPLE)
                this.apples--;

            // update the board timer
            if (this.timer_active)
                var boardtime = this.board.incrementTimer();

            this.board.updateBoard();

            return {collision : collision, board_timer : boardtime};
        },
        spawnApple : function () {
           var x=Math.floor(Math.random()*this.board.width);
           var y=Math.floor(Math.random()*this.board.height);
           if (this.board.board[x][y] == JSB_EMPTY)
           {
               this.board.board[x][y] = JSB_APPLE;
               this.apples++;
               this.board.updateBoard();
           } else {
               this.spawnApple();
           }
        },
		spawnPlum : function (x,y,dir) {
			/* Plum directional codes:
			 *    0 - upper right
			 *    1 - upper left
			 *    2 - lower left
			 *    3 - lower right
			 */
			 var plum = {
				x : x,
				y : y,
				dir : dir};
			this.board.plums.push(plum);
		},
        board : board,
        snake : snake
    };

    // initialize the bounds of the board
    for (i = 0; i<width; i++)
    {
        game.board.board[i] = new Array;
        game.board.active_board[i] = new Array;
        for (j = 0; j<height; j++)
        {
            game.board.board[i][j] = 0;
            game.board.active_board[i][j] = 1;
        }
    }

    return game;
}
