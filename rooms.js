/* rooms.js -- the levels */

/* rooms are defined like so: 
 * room_spec = [
 *  	[x, y, width, height, block_type, <fill>, <percent>]
 *		[ ... ]
 *		[ ... ] ]
 *      thickness - if true, fills the rectangle specified (otherwise makes border)
 *      percent - if true, specify x, y, width, height in relative coordinates (100x100)
 *
 *      if percent is false, specify all coordinates in absolute blocks (keep in mind that
 *      a border around the entire room takes up 1 block on each side.
 *
 *      Rules are applied to a blank room in order, specify JSB_EMPTY as block type
 *      to 'erase'
 *
 * */
function initRooms()
{
    rs = new Array();
    rs[1] = new Array();
    rs[2] = [ [25, 50, 50, 1, JSB_ROOM_02_1, false, true ] ];
    rs[3] = [ [25,50,50,1, JSB_ROOM_03_1, false, true],
              [50,25,1,50, JSB_ROOM_03_1, false, true] ];
    rs[4] = [ [22, 23, 56, 1, JSB_ROOM_04_1, false, true],
              [22, 50, 56, 1, JSB_ROOM_04_1, false, true],
              [22, 78, 56, 1, JSB_ROOM_04_1, false, true],
              [22, 23, 1, 55, JSB_ROOM_04_1, false, true] ];
    rs[5] = [ [22, 25, 1, 52, JSB_ROOM_05_1, false, true],
              [50, 25, 1, 52, JSB_ROOM_05_1, false, true],
              [78, 25, 1, 52, JSB_ROOM_05_1, false, true],
              [22, 50, 56, 1, JSB_ROOM_05_1, false, true] ];
    rs[6] = [ [25, 25, 50, 50, JSB_ROOM_06_1, false, true],
              [48, 25, 4, 1, JSB_EMPTY, false, true] ];
    rs[7] = [ [21, 25, 60, 50, JSB_ROOM_07_1, false, true],
              [24, 0, 10, 100, JSB_EMPTY, true, true],
              [21, 50, 46, 1, JSB_ROOM_07_1, false, true] ];
    rs[8] = [ [0, 50, 46, 1, JSB_ROOM_08_1, false, true],
              [54, 58, 46, 1, JSB_ROOM_08_1, false, true] ];
}
function blank_room(width, height) {
    var l = new Array();
    for (i = 0; i < width; i++)
    {
        l[i] = new Array();
        for (j = 0; j < height; j++)
        {
            l[i][j] = JSB_EMPTY;
        }
    }
    return l;
}

function create_room(room_spec, width, height) {
    var l = blank_room(width, height);

    for (i in room_spec)
    {
        var x = room_spec[i][0];
        var y = room_spec[i][1];
        var w = room_spec[i][2];
        var h = room_spec[i][3];
        var block = room_spec[i][4];
        var fill = (room_spec[i][5]) ? true : false;
        var percent = (room_spec[i][6]) ? true : false;

        if (percent)            // convert coordinates to absolute blocks
        {
            x = Math.floor(x * width / 100);
            y = Math.floor(y * height / 100);
            w = Math.ceil(w * width / 100);
            h = Math.ceil(h * height / 100);
        }

        if (fill)
        {
            for (i = x; i < x + w; i++)
            {
                for (j = y; j < h; j++)
                    l[i][j] = block;
            }
        } else {
            for (i = x; i < x + w; i++)
            {
                l[i][y] = block;
                l[i][y+(h-1)] = block;
            }
            for (j = y; j < y + h; j++)
            {
                l[x][j] = block;
                l[x+(w-1)][j] = block;
            }
        }
    }

    return l;
}
function getRoom(l, width, height)
{
    if (!l)
        l = 1;

    return create_room(rs[l], width, height);
}
