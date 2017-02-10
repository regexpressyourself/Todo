import React from 'react';

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
