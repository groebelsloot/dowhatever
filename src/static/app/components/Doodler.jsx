export default class Doodler extends React.PureComponent {

	constructor(props) {
		super(props);
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

	//TODO mouse pos
	draw(e) {
		const c = document.getElementById("doodler_canvas");
		var ctx = c.getContext("2d");
        ctx.clearRect (0, 0, c.width, c.height);
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(0,0, 200, 100);//time progressing
	}

	render() {
		return (
			<div id="doodler" className="doodler">
				<canvas
					id="doodler_canvas"
					width="1024"
					height="1024"
					onMouseDown={this.draw.bind(this)}
				>
				</canvas>
			</div>
		)
	}
}