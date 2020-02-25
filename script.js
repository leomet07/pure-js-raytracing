let walls = []
let context
let canvas
let particle
let xoff = 0
let yoff = 0
let move = true
let desktop_div = document.querySelector("#desktop")
let mobile_div = document.querySelector("#mobile")
window.onload = function () {
    //detect if it is mobile
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // mobile!
        console.log("Mobile")
        desktop_div.style.display = "none"
        mobile_div.style.display = "block"
    } else {
        console.log("Desktop")
        desktop_div.style.display = "block"
        mobile_div.style.display = "none"
    }


    canvas = document.getElementById("game");
    let width = canvas.width
    let height = canvas.height
    context = canvas.getContext("2d");
    for (let i = 0; i < 4; i++) {
        let x1 = Math.floor(Math.random() * width);
        let x2 = Math.floor(Math.random() * width);
        let y1 = Math.floor(Math.random() * height);
        let y2 = Math.floor(Math.random() * height);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    //get borders around the canvas
    walls.push(new Boundary(0, 0, width, 0));
    walls.push(new Boundary(width, 0, width, height));
    walls.push(new Boundary(width, height, 0, height));
    walls.push(new Boundary(0, height, 0, 0));

    //create the "eye"
    particle = new Particle();
    setInterval(gameloop, 1000 / 60);

    canvas.addEventListener('mousemove', e => {
        let x = e.clientX;
        let y = e.clientY;
        if (move) {
            //move the paritcle (requires 360 rays)
            particle.update(x, y)
            particle.rays = [];


            //console.log(particle.pos.y - y, particle.pos.x - x)
            for (let a = 0; a < 360; a += 1) {
                particle.rays.push(new Ray(particle.pos, (a * Math.PI / 180)));
            }

        } else {
            //make the particle look around instead
            particle.rays = [];
            let radians = (Math.atan2(particle.pos.y - y, particle.pos.x - x) * 180 / Math.PI) - 180;

            //console.log(particle.pos.y - y, particle.pos.x - x)
            for (let a = radians - 10; a < radians + 10; a += 1) {
                particle.rays.push(new Ray(particle.pos, (a * Math.PI / 180)));
            }
        }




    });

    canvas.addEventListener('click', function () {
        toggleview()
    }, false);
}

function gameloop() {

    //blit a bg
    //blitting onto screen
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);



    //particle.update(noise(xoff) * width, noise(yoff) * height);
    particle.show()
    particle.look(walls);

    for (let wall of walls) {
        wall.show();
    }



}

function toggleview() {
    move = !move
}