import DrawUtil from '../util/DrawUtil';

/*
READ: https://stackoverflow.com/questions/5329661/is-there-any-way-to-accelerate-the-mousemove-event
*/

export default class Doodler extends React.PureComponent {

	constructor(props) {
		super(props);
		this.down = false;
		this.prevPoint = null;
	}

	componentDidMount() {
	    window.addEventListener('resize', this.updateCanvasDimensions.bind(this));
	    this.updateCanvasDimensions();
	    /*
	    var f = DrawUtil.createInterpolant([0, 1, 2, 3, 4], [0, 1, 4, 9, 16]);
		var message = '';
		for (var x = 0; x <= 4; x += 0.5) {
			var xSquared = f(x);
			message += x + ' squared is about ' + xSquared + '\n';
		}
		alert(message);
		*/
	}

	componentWillUnmount() {
		console.debug('removing this event listener');
		window.removeEventListener('resize', this.updateCanvasDimensions.bind(this));
	}

	updateCanvasDimensions() {
		const c = document.getElementById('doodler_canvas');
		const container = document.getElementById('doodler');
		if(container) {
			c.width = container.offsetWidth;
			c.height = container.offsetHeight;
		}
	}

	mouseDown() {
		this.down = true;
	}

	mouseUp() {
		this.down = false;
	}

	//TODO mouse pos
	draw(e) {
		if(this.down) {
			const c = document.getElementById("doodler_canvas");
			var pos = this.getMousePos(c, e);
			var ctx = c.getContext("2d");
	        //ctx.clearRect (0, 0, c.width, c.height);

	        //ctx.fillRect(pos.x, pos.y, 2, 2);//time progressing

	        //ctx.beginPath();
	        //ctx.fillStyle = "#FF0000";
			//ctx.arc(pos.x,pos.y,2,0,2*Math.PI);
			//ctx.fill();


			if(this.prevPoint == null) {
				console.debug('null again')
				this.prevPoint = {x : pos.x, y : pos.y }
			} else {
				var f = DrawUtil.createInterpolant([this.prevPoint.x, pos.x], [this.prevPoint.y, pos.y]);
				//console.debug(this.prevPoint.x, f(this.prevPoint.x), pos.x, f(pos.x));
				ctx.beginPath();
				ctx.fillStyle = "#FF0000";
				ctx.moveTo(this.prevPoint.x, f(this.prevPoint.x));
				ctx.lineTo(pos.x, f(pos.x));
				ctx.stroke();
				this.prevPoint = null;
			}


			// ctx.beginPath();
			// ctx.fillStyle = "#FF0000";
			// ctx.moveTo(10, 10);
			// ctx.lineTo(300,300);
			// ctx.lineWidth = 15;
			// ctx.stroke();
			// ctx.closePath();



	    }
	}

	getMousePos(canvas, evt) {
	    const rect = canvas.getBoundingClientRect();
	    return {
	      x: evt.clientX - rect.left,
	      y: evt.clientY - rect.top
	    };
	}

	render() {
		return (
			<div id="doodler" className="doodler">
				<canvas
					id="doodler_canvas"
					width="1024"
					height="1024"
					onMouseDown={this.mouseDown.bind(this)}
					onMouseUp={this.mouseUp.bind(this)}
					onMouseMove={this.draw.bind(this)}
				>
				</canvas>
			</div>
		)
	}
}