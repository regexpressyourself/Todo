import React from 'react';
require('../assets/css/main.scss');

class App extends React.Component {
    render() {
        return (
            <div>
                {React.cloneElement(this.props.children)}
            </div>
        )
    }
}
export default App;
