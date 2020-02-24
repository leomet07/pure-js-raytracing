class Boundary {
    constructor(x1, y1, x2, y2) {
        this.a = {
            "x": x1,
            "y": y1
        };
        this.b = {
            "x": x2,
            "y": y2
        };
    }

    show() {
        //draw the line
        // set line color

        
        context.stroke();
        context.beginPath();
        context.moveTo(this.a.x, this.a.y);
        context.lineTo(this.b.x, this.b.y);
        context.lineWidth = 5;

        //line(this.a.x, this.a.y, this.b.x, this.b.y);
    }

}