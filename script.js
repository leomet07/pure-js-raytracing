let walls = []
let context
let canvas
let particle
let xoff = 0
let yoff = 0
window.onload = function () {
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
        console.log(x, y)
        particle.update(x, y)

    });
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