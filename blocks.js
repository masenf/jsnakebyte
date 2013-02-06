/* Initialize the blocks for the game */

function initBlocks(width, height)
{
    blocks = new Array;         // this will store the completed blocks
    var background = '#111111';
    var tempCanvas = document.createElement('canvas');
    tempCanvas.setAttribute('width', width);
    tempCanvas.setAttribute('height', height);
    tempCanvas.setAttribute('id', 'tempCanvas');
    document.getElementById('temp').appendChild(tempCanvas);
    var c=tempCanvas.getContext('2d');

    // BEGIN BLOCKS DRAWING
    
    // 0 : JSB_EMPTY empty space (set main background color here)
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    blocks[0] = c.getImageData(0,0,width,height);
    JSB_EMPTY = 0;

    // 1 : JSB_BORDER
    var orange = '#ef5b00';
    var snake_color = '#1fdf00';
    c.lineWidth = height / 8;
    c.fillStyle = orange;
    c.fillRect(0,0,width,height);
    c.strokeStyle = snake_color;
    c.beginPath();
    for (i = c.lineWidth / 2; i < height; i+=2*c.lineWidth)
    {
        c.moveTo(0,i);
        c.lineTo(width,i);
    }
    c.stroke();
    blocks[1] = c.getImageData(0,0,width,height);
    JSB_BORDER = 1;

    var horiz_width = height / 8;
    var vert_width = width / 8;
    // 2 : JSB_SNAKE_UP
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.lineWidth = width / 8;
    c.beginPath();
    c.moveTo(2*c.lineWidth,0);
    c.lineTo(2*c.lineWidth,height);
    c.moveTo(6*c.lineWidth,0);
    c.lineTo(6*c.lineWidth,height);
    c.stroke();
    blocks[2] = c.getImageData(0,0,width,height);
    JSB_SNAKE_UP = 2;

    // 3 : JSB_SNAKE_LT
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.lineWidth = height / 8;
    c.beginPath();
    c.moveTo(0,2*c.lineWidth);
    c.lineTo(width,2*c.lineWidth);
    c.moveTo(0, 6*c.lineWidth);
    c.lineTo(width, 6*c.lineWidth);
    c.stroke();
    blocks[3] = c.getImageData(0,0,width,height);
    JSB_SNAKE_LT = 3;

    // 4 : JSB_SNAKE_DN
    blocks[4] = blocks[JSB_SNAKE_UP];
    JSB_SNAKE_DN = JSB_SNAKE_UP;

    // 5 : JSB_SNAKE_RT
    blocks[5] = blocks[JSB_SNAKE_LT];
    JSB_SNAKE_RT = JSB_SNAKE_LT;

    // 6 : JSB_SNAKE_UR
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.beginPath();
    c.moveTo(2*vert_width,height);
    c.lineTo(2*vert_width,6*horiz_width);
    c.moveTo(6*vert_width,height);
    c.lineTo(6*vert_width,2*horiz_width);
    c.lineWidth = vert_width;
    c.stroke();
    c.beginPath();
    c.moveTo(0,2*horiz_width);
    c.lineTo(6*vert_width,2*horiz_width);
    c.moveTo(0,6*horiz_width);
    c.lineTo(2*vert_width,6*horiz_width);
    c.lineWidth = horiz_width;
    c.stroke();
    blocks[6] = c.getImageData(0,0,width,height);
    JSB_SNAKE_UR = 6;

    // 7 : JSB_SNAKE_UL
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.beginPath();
    c.moveTo(2*vert_width,height);
    c.lineTo(2*vert_width,2*horiz_width);
    c.moveTo(6*vert_width,height);
    c.lineTo(6*vert_width,6*horiz_width);
    c.lineWidth = vert_width;
    c.stroke();
    c.beginPath();
    c.moveTo(width,2*horiz_width);
    c.lineTo(2*vert_width,2*horiz_width);
    c.moveTo(width,6*horiz_width);
    c.lineTo(6*vert_width,6*horiz_width);
    c.lineWidth = horiz_width;
    c.stroke();
    blocks[7] = c.getImageData(0,0,width,height);
    JSB_SNAKE_UL = 7;

    // 8 : JSB_SNAKE_LL
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.beginPath();
    c.moveTo(2*vert_width,0);
    c.lineTo(2*vert_width,6*horiz_width);
    c.moveTo(6*vert_width,0);
    c.lineTo(6*vert_width,2*horiz_width);
    c.lineWidth = vert_width;
    c.stroke();
    c.beginPath();
    c.moveTo(width,2*horiz_width);
    c.lineTo(6*vert_width,2*horiz_width);
    c.moveTo(width,6*horiz_width);
    c.lineTo(2*vert_width,6*horiz_width);
    c.lineWidth = horiz_width;
    c.stroke();
    blocks[8] = c.getImageData(0,0,width,height);
    JSB_SNAKE_LL = 8;

    // 9 : JSB_SNAKE_LR
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.beginPath();
    c.moveTo(2*vert_width,0);
    c.lineTo(2*vert_width,2*horiz_width);
    c.moveTo(6*vert_width,0);
    c.lineTo(6*vert_width,6*horiz_width);
    c.lineWidth = vert_width;
    c.stroke();
    c.beginPath();
    c.moveTo(0,2*horiz_width);
    c.lineTo(2*vert_width,2*horiz_width);
    c.moveTo(0,6*horiz_width);
    c.lineTo(6*vert_width,6*horiz_width);
    c.lineWidth = horiz_width;
    c.stroke();
    blocks[9] = c.getImageData(0,0,width,height);
    JSB_SNAKE_LR = 9;

    // 10 : JSB_SNAKEHEAD_UPDN
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.beginPath();
    c.moveTo(4*vert_width,0);
    c.lineTo(4*vert_width,height)
    c.moveTo(2*vert_width,3*horiz_width);
    c.lineTo(2*vert_width,5*horiz_width);
    c.moveTo(6*vert_width,3*horiz_width);
    c.lineTo(6*vert_width,5*horiz_width);
    c.lineWidth = vert_width * 2;
    c.stroke();
    blocks[10] = c.getImageData(0,0,width,height);
    JSB_SNAKEHEAD_UPDN = 10;

    // 11 : JSB_SNAKEHEAD_LTRT
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.beginPath();
    c.moveTo(0,4*horiz_width);
    c.lineTo(width, 4*horiz_width)
    c.moveTo(3*vert_width,2*horiz_width);
    c.lineTo(5*vert_width,2*horiz_width);
    c.moveTo(3*vert_width,6*horiz_width);
    c.lineTo(5*vert_width,6*horiz_width);
    c.lineWidth = horiz_width * 2;
    c.stroke();
    blocks[11] = c.getImageData(0,0,width,height);
    JSB_SNAKEHEAD_LTRT = 11;

    // 12 : JSB_SNAKETAIL_UPDN
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.lineWidth = vert_width * 3;
    c.beginPath();
    c.moveTo(4*vert_width,horiz_width);
    c.lineTo(4*vert_width,7*horiz_width);
    c.stroke();
    blocks[12] = c.getImageData(0,0,width,height);
    JSB_SNAKETAIL_UPDN = 12;

    // 13 : JSB_SNAKETAIL_LTRT
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.lineWidth = horiz_width * 3;
    c.beginPath();
    c.moveTo(vert_width,4*horiz_width);
    c.lineTo(7*vert_width,4*horiz_width);
    c.stroke();
    blocks[13] = c.getImageData(0,0,width,height);
    JSB_SNAKETAIL_LTRT = 13;

    // 14 : JSB_APPLE
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.strokeStyle = '#FF0000';
    c.beginPath();
    c.moveTo(1*vert_width,4*horiz_width);
    c.lineTo(7*vert_width,4*horiz_width);
    c.lineWidth = vert_width * 2;
    c.stroke();
    c.beginPath();
    c.moveTo(4*vert_width,1*horiz_width);
    c.lineTo(4*vert_width,7*horiz_width);
    c.lineWidth = horiz_width * 2;
    c.stroke();
    blocks[14] = c.getImageData(0,0,width,height);
    JSB_APPLE = 14;
    // 15 : JSB_BONUSAPPLE (not implemented)
	
    // 16 : JSB_PLUM
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.strokeStyle = '#D234E0';
    c.beginPath();
	c.arc(4 * vert_width, 4 * horiz_width, 3 * horiz_width, 0, 2 * Math.PI, false);
    c.lineWidth = vert_width * 2;
    c.stroke();
    blocks[16] = c.getImageData(0,0,width,height);
    JSB_PLUM = 16;
    
    // 18 : JSB_TIMER timer (time left)
    var blue = '#1d22f1';
    c.lineWidth = height / 8;
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.strokeStyle = blue;
    var spacing = width / 4;
    var row = 0;
    c.beginPath();
    for (i = c.lineWidth / 2; i < height; i+=c.lineWidth)
    {
        for (j = row % 2; j < 5; j+=2)
        {
                c.moveTo(j*spacing,i);
                c.lineTo((j+1)*spacing,i);
        }
        row++;
    }
    c.stroke();
    blocks[18] = c.getImageData(0,0,width,height);
    JSB_TIMER = 18;

    // 25 : JSB_ENTRY
    blocks[25] = blocks[JSB_EMPTY];
    JSB_ENTRY = 25;
    // 26 : JSB_EXIT
    blocks[26] = blocks[JSB_EMPTY];
    JSB_EXIT = 26;
    // 27 : DOOR_MAIN
    var door = '#d233e3';
    c.fillStyle=door;
    c.fillRect(0,0,width,height);
    blocks[27] = c.getImageData(0,0,width,height);
    JSB_DOOR_MAIN = 27;
    // 28 : DOOR_EDGE_LT
    c.strokeStyle = '#FFF';
    c.beginPath();
    c.moveTo(horiz_width * 2,0);
    c.lineTo(horiz_width * 2,height);
    c.lineWidth = horiz_width * 2;
    c.stroke()
    blocks[28] = c.getImageData(0,0,width,height);
    JSB_DOOR_EDGE_LT = 28;
    // 28 : DOOR_EDGE_RT
    c.putImageData(blocks[JSB_DOOR_MAIN],0,0);
    c.strokeStyle = '#FFF';
    c.beginPath();
    c.moveTo(horiz_width * 6,0);
    c.lineTo(horiz_width * 6,height);
    c.lineWidth = horiz_width * 2;
    c.stroke()
    blocks[29] = c.getImageData(0,0,width,height);
    JSB_DOOR_EDGE_RT = 29;

    // BEGIN BUILT IN LEVEL BLOCKS
    // 201 : ROOM_02_1
    var orange = '#fb7100';
    var yellow = '#3dce00';
    c.lineWidth = height / 4;
    c.fillStyle = orange;
    c.fillRect(0,0,width,height);
    c.strokeStyle = yellow;
    c.beginPath();
    for (i = c.lineWidth / 2; i < height; i+=2*c.lineWidth)
    {
        c.moveTo(0,i);
        c.lineTo(width,i);
    }
    c.stroke();
    blocks[201] = c.getImageData(0,0,width,height);
    JSB_ROOM_02_1 = 201;
    
    // 301 : ROOM_03_1
    var blue = '#d335e1';
    var orange = '#eb6300';
    c.lineWidth = height / 8;
    c.fillStyle = orange;
    c.fillRect(0,0,width,height);
    c.strokeStyle = blue;
    c.beginPath();
    for (i = c.lineWidth / 2; i < height; i+=2*c.lineWidth)
    {
        c.moveTo(0,i);
        c.lineTo(width,i);
    }
    c.stroke();
    blocks[301] = c.getImageData(0,0,width,height);
    JSB_ROOM_03_1 = 301;

    // 401 : ROOM_04_1
    var white = '#eee';
    c.lineWidth = height / 16;
    c.fillStyle = white;
    c.fillRect(0,0,width,height);
    c.strokeStyle = background;
    c.beginPath();
    for (i = c.lineWidth / 2; i < height; i+=4*c.lineWidth)
    {
        c.moveTo(0,i);
        c.lineTo(width,i);
    }
    c.stroke();
    blocks[401] = c.getImageData(0,0,width,height);
    JSB_ROOM_04_1 = 401;
    
    // 501 : ROOM_05_1
    c.lineWidth = height / 8;
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.strokeStyle = white;
    var spacing = width / 4;
    var row = 0;
    c.beginPath();
    for (i = c.lineWidth / 2; i < height; i+=c.lineWidth)
    {
        for (j = row % 2; j < 5; j+=2)
        {
                c.moveTo(j*spacing,i);
                c.lineTo((j+1)*spacing,i);
        }
        row++;
    }
    c.stroke();
    blocks[501] = c.getImageData(0,0,width,height);
    JSB_ROOM_05_1 = 501;
    
    // 601 : ROOM_06_1
    c.lineWidth = height / 8;
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.strokeStyle = "#d82ad8";
    var spacing = width / 4;
    var row = 0;
    c.beginPath();
    for (i = c.lineWidth / 2; i < height; i+=c.lineWidth)
    {
        for (j = row % 2; j < 5; j+=2)
        {
                c.moveTo(j*spacing,i);
                c.lineTo((j+1)*spacing,i);
        }
        row++;
    }
    c.stroke();
    blocks[601] = c.getImageData(0,0,width,height);
    JSB_ROOM_06_1 = 601;
   
    // 701 : ROOM_07_1
    c.lineWidth = height / 8;
    c.fillStyle=background;
    c.fillRect(0,0,width,height);
    c.strokeStyle = "#f26000";
    var spacing = width / 4;
    var row = 0;
    c.beginPath();
    for (i = c.lineWidth / 2; i < height; i+=c.lineWidth)
    {
        for (j = row % 2; j < 5; j+=2)
        {
                c.moveTo(j*spacing,i);
                c.lineTo((j+1)*spacing,i);
        }
        row++;
    }
    c.stroke();
    blocks[701] = c.getImageData(0,0,width,height);
    JSB_ROOM_07_1 = 701;
    
    // 801 : ROOM_08_1
    var purple = '#da28d8';
    var yellow = '#1fdf00';
    c.lineWidth = height / 4;
    c.fillStyle = purple;
    c.fillRect(0,0,width,height);
    c.strokeStyle = yellow;
    c.beginPath();
    for (i = c.lineWidth / 2; i < height; i+=2*c.lineWidth)
    {
        c.moveTo(0,i);
        c.lineTo(width,i);
    }
    c.stroke();
    blocks[801] = c.getImageData(0,0,width,height);
    JSB_ROOM_08_1 = 801;

    initRooms();
    return blocks;
}
