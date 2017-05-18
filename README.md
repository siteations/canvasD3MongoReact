# canvasD3MongoReact
This code will build from Lars Verspohl's [tutorial on media](https://medium.freecodecamp.com/d3-and-canvas-in-3-steps-8505c8b27444), on canvas-d3...
+ a) so vanilla front-end versions *d3.select() with just the dom, some fake data, and canvas*
+ b) react component versions (to combine virtual DOM strategies) *componentDidMount() loading of fake data, react rendering, and canvas*
and, to complete the full scenario,
+ c) pull from a backend/api structure using a mongodb database. *back-end routes with not-so-fake data seeded/retrieved from mongo, react-redux dispatching/store, react rendering, and canvas*

I'll segment tests as different components/div's (since I have a vector-lover's skepticism of pixels/blobs, but also) 
to increase legibility of options for d3 combo's. In that sense, all three of the above test will include interactive and non-interactive variations.

Lar's covers *a* above, feel free to clone/fork the whole thing and 'npm install' to get started. 
I might leave some notes on not-so-fake data sources and my slightly weird mongo setup, but I'm presuming folks can read my webpack.config/package.json.

*Happy canvas tinkering*
