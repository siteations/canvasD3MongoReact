var React = require('react');
var ReactDOM = require('react-dom');

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

    render() {
    return (
        <div>
            Hello World - this will be a react section.
        </div>
        )
    }
}

ReactDOM.render(<Main />, document.getElementById('app'));
