//---------step 2) typical div selection, with canvas twist of 2d context-------------
// REORDERED - SETUP AND ATTACH CANVAS
const width = 750, height = 400;

const canvas = d3.select('#vanilla')
  .append('canvas')
  .attr('width', width)
  .attr('height', height);

const context = canvas.node().getContext('2d'); //sets up our drawing space


//REORDERED - PUT EVERYTHING INTO GENERIC UPDATE (CREATES COLOR DATA ANEW, CLEARS CANVAS, AND LOADS FROM VIRTUAL DOM TO CANVAS)
const update = function(){
//---------step 1) fake some data-------------------
const data = [];

let num = document.getElementById('text-input').value;
console.log(num);

d3.range(num).forEach(el=> {
  data.push({ value: el });
});


//--------- step 3) bind data to a custom virtual element in place of svg-------------------

const customBase = document.createElement('custom');
const custom = d3.select(customBase);

//add grid

// Settings for a grid with 10 cells in a row,
// 100 cells in a block and 1000 cells in a row.
const groupSpacing = 4;
const cellSpacing = 2;
const offsetTop = height / 5;
const cellSize = Math.floor((width - 11 * groupSpacing) / 100) - cellSpacing;

//and bind

function databind(data) {
// Get a scale for the colours - not essential but nice.
	colorScale = d3.scaleSequential(d3.interpolateSpectral).domain(d3.extent(data, function(d) { return d.value; }));

  var join = custom.selectAll('custom.rect').data(data); // akin to the typical svg.selectAll()

  var enterSel = join.enter()//enter append sequence and then attribtue dot-notations --- THIS WILL BE OUR RAW STORE VALUES/ADJUSTMENTS FROM STORE
		  .append('custom')
		  .attr('class', 'rect')
		  .attr("x", function(d, i){
			    var x0 = Math.floor(i / 100) % 10, x1 = Math.floor(i % 10);
			    return groupSpacing * x0 + (cellSpacing + cellSize) * (x1 + x0 * 10);
			  	})
		  .attr("y", function(d, i){
				  var y0 = Math.floor(i / 1000), y1 = Math.floor(i % 100 / 10);
				  return groupSpacing * y0 + (cellSpacing + cellSize) * (y1 + y0 * 10);
					})
		  .attr('width', cellSize)
		  .attr('height', cellSize)
		  .attr('fillStyle', function(d){ return colorScale(d.value) } );

/* THIS IS A SHORTENED MODIFICATION... I'M ADDING THE VALUES ABOVE W/O TRANSITION (CAUSE REALLY IT'S JUST VIRTUAL DOM) */

	// join.merge(enterSel) // so go from 0, no color to grid size, colored with transition... ie this is update
	// 	  .transition()
	// 	  .attr('width', cellSize)
	// 	  .attr('height', cellSize)
	// 	  .attr('fillStyle', function(d){ return colorScale(d.value) } );//rework color later testing things here

	// // //can't style when binding... but this is roughly equiv of passing data like .attr('fill', d => d.somevalue ) which is easy to do in d3 (vs sticking into style)

	// var exitSel = join.exit() // and this is d3 exit, should we call it
	// 	  .transition()
	// 	  .attr('width', 0)
	// 	  .attr('height', 0)
	// 	  .remove();

}; // done with databind

//--------- step 4) create a draw function that works with canvas, reading values from the virtual dom made in step 3 binding-------------------

function draw() {

	context.clearRect(0, 0, width, height); //redraw the whole canvas, actually familiar from redrawing w/ react handling of updates

	var elements = custom.selectAll('custom.rect');

	elements.each(function(d,i) { // For each virtual/custom element...
  	var node = d3.select(this);
  	let fill = node.attr('fillStyle');

	  context.fillStyle = fill;
	  context.fillRect(node.attr('x'), node.attr('y'), cellSize, cellSize);

	});

} // draw()

//--------- step 5) evoke and use for a static drawing-------------------

databind(data);
draw();

}

update(); // for initial, non-form round
