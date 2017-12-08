export default class Doodler extends React.PureComponent {

	constructor(props) {
		super(props);
		this.down = false;
	}

	componentDidMount() {
	    window.addEventListener('resize', this.updateCanvasDimensions.bind(this));
	    this.updateCanvasDimensions();
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

	        ctx.beginPath();
	        ctx.fillStyle = "#FF0000";
			ctx.arc(pos.x,pos.y,2,0,2*Math.PI);
			ctx.fill();
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