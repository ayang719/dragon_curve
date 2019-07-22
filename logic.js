let savePoint = [0,0];
let endPoint = [0,0];

const drawLine = function(start, end) {
    [startX, startY] = start;
    [endX, endY] = end;
    ctx.beginPath()
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX ,endY);
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
}

// drawLine([0,50], [100, 50]);

const testDragonCurve = function(order, length) {
    let origin = [0, 0];
    let start = [0,0];
    let end = [100, 0];
    drawLine(start, end);
    let rotation = rotate45(100, 0, 90, origin);
    console.log(rotation);
    console.log(end);
    drawLine(start, rotation);
    start = end;
    end = rotate45(200, 0, 270, end);
    drawLine(start, end);
}

const dragonCurve = function(order, length, start) {
    dragonCurveRecursive(order, length, 1, start, [0,0]);
}

const dragonCurveRecursive = function(order, length, sign, start, end) {
    let NEnd = [];
    
    if(sign > 0) {
        NEnd = [start[0] + length, start[1]];
    } else {
        NEnd = [start[0], start[1] + length];
    }
    if (order === 0) {
        drawLine(start, end);
    } else {
        let rootHalf = (1/2) ** (1/2);
        savePoint = end;
        dragonCurveRecursive(order -1, length * rootHalf, 1, savePoint, NEnd);
        // savePoint = NEnd;
        console.log(end);
        end = rotate45(end[0], end[1], (sign* -90), NEnd);
        console.log(end);
        savePoint = end;
        dragonCurveRecursive(order - 1, length * rootHalf, -1, NEnd, end);
    }
}

const rotate45 = function(x, y, degrees, origin) {
    
    let turns = 0
    if (degrees < 0) {
        degrees = 360 + degrees;
        turns = degrees / 45;
    } else {
        turns = degrees / 45;
    }

    // debugger;
    let x1 = x;
    let y1 = y;
    while(turns > 0) {
        turns -= 1;
        [x1,y1] = turn45(x1,y1, origin);
    }
    return [x1,y1]
}

const turn45 = function(x,y, origin) {
    y = y - origin[1];
    x = x - origin[0];
    if(Math.abs(x) === Math.abs(y)) {
        if(y < 0 && x > 0) {
            y = Math.abs(y);
            y = -(Math.sqrt(2 * (y**2)));
            x = 0;
        } else if(y < 0 && x < 0) {
            x = Math.abs(x);
            x = -(Math.sqrt(2 * (x ** 2)));
            y = 0;
        } else if(y > 0 && x > 0) {
            x = Math.sqrt(2 * (x ** 2));
            y = 0;
        } else if(y > 0 && x < 0) {
            y = Math.sqrt(2 * (y ** 2));
            x = 0;
        }
    } else if(y > 0) {
        x = Math.sqrt((y**2) / 2);
        y = Math.sqrt((y**2) / 2);
    } else if(x > 0) {
        x = Math.sqrt((x**2) / 2);
        y = -(x);
    } else if(y < 0) {
        y = Math.abs(y);
        x = -(Math.sqrt((y**2) / 2));
        y = -(Math.sqrt((y**2) / 2));
    } else if(x < 0) {
        x = Math.abs(x);
        y = Math.sqrt((x**2) / 2);
        x = -(Math.sqrt((x**2) / 2))
    }
    x += origin[0];
    y += origin[1];
    return [x,y];
}

var drawGrid = function (w, h, id) {
    var canvas = document.getElementById(id);
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = w;
    ctx.canvas.height = h;

    ctx.beginPath();
    for (x = 0; x <= w; x += 20) {
        for (y = 0; y <= h; y += 20) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
            ctx.stroke();
        }
    }

};


// drawGrid(1000, 1000, "canvas-el");
const canvas = document.getElementById('canvas-el');
const ctx = canvas.getContext('2d');
let transX = canvas.width * 0.5;
let transY = canvas.height * 0.5;
ctx.translate(transX, transY);
// testDragonCurve(2, 10);
dragonCurve(15, 100, [0,0])