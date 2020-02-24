class Particle {
    constructor() {
        this.pos = {
            "x": (canvas.width / 2),
            "y": (canvas.height / 2)
        };
        this.rays = [];

        for (let a = 0; a < 360; a += 1) {
            this.rays.push(new Ray(this.pos, a * Math.PI / 180));
        }

    }

    update(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    look(walls) {
        for (let i = 0; i < this.rays.length; i++) {
            const ray = this.rays[i];
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const d = Math.sqrt(Math.pow(Math.abs(this.pos.x - pt.x), 2) + Math.pow(Math.abs(this.pos.y - pt.y), 2));

                    if (d < record) {
                        record = d;
                        closest = pt;
                    }
                }
            }
            if (closest) {

                //draw the ray
                // colorMode(HSB);
                // stroke((i + frameCount * 2) % 360, 255, 255, 50);
                context.strokeStyle = 'white';
                context.stroke();
                context.strokeStyle = 'white';
                context.beginPath();
                context.moveTo(this.pos.x, this.pos.y);
                context.lineTo(closest.x, closest.y);
                context.lineWidth = 1;
                context.strokeStyle = 'white';

            }
        }
    }

    show() {


        context.beginPath();
        context.arc(this.pos.x, this.pos.y, 5, 0, 2 * Math.PI);
        context.stroke();



        for (let ray of this.rays) {
            ray.show();
        }

    }
}