const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const c = canvas.getContext("2d");

// c.fillStyle = "rgba(255, 0, 0, 0.3)";
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = "rgba(0, 0, 255, 0.3)";
// c.fillRect(500, 200, 100, 100);
// c.fillStyle = "rgba(0, 255, 0, 0.3)";
// c.fillRect(400, 300, 100, 100);

// console.log(canvas);

// Line

// c.beginPath();

// c.moveTo(50, 300);
// c.lineTo(300, 100);

// c.strokeStyle = "blue";
// c.stroke();

// Arc / Circle

// const colors = ["blue", "red", "green", "violet", "yellow", "indigo"];

// for (let i = 0; i <= 1000; i++) {
// 	let x = Math.random() * canvas.width;
// 	let y = Math.random() * canvas.height;
// 	c.beginPath();
// 	c.arc(x, y, 100, 0, Math.PI * 2, false);
// 	c.strokeStyle = colors[Math.floor(Math.random() * colors.length) + 1];
// 	console.log(c.strokeStyle);
// 	c.stroke();
// }

const mouse = {
	x: undefined,
	y: undefined
}

let maxRadius = 40;
let minRadius = 5;

const colorArray = [
	'#E54B4B',
	'#FFA987',
	'#F7EBE8',
	'#444140',
	'#1E1E24',
]

window.addEventListener('mousemove', (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
})

window.addEventListener('touchmove', (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
});

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
})
class Circle {
	constructor(x, y, dx, dy, radius) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.radius = radius;
		this.minRadius = radius;
		this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
	}

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
	}

	update() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		// interactivity
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
			if (this.radius < maxRadius)
				this.radius += 4;
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

	}
}

// let circle = new Circle(200, 200, 3, 3, 30);
// let circle2 = new Circle(300, 200, 3, 3, 30);
let circleArray = [];


function init() {
	circleArray = [];

	for (let i = 0; i < 1000; i++) {
		let radius = Math.random() * 5 + 1;
		let x = Math.random() * (innerWidth - radius * 2) + radius;
		let y = Math.random() * (innerHeight - radius * 2) + radius;
		let dx = (Math.random() - 0.5) * 3;
		let dy = (Math.random() - 0.5) * 3;

		circleArray.push(new Circle(x, y, dx, dy, radius));
	}
}

function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);

	circleArray.forEach(x => {
		x.draw();
		x.update();
	});
}

init();

animate();
