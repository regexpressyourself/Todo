import React from 'react';
import axios from 'axios';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleQuoteChange = this.handleQuoteChange.bind(this);
        this.state = {
            name: "",
            quote: ""
        }
    }

    handleSubmit() {
        let data ={
            name: this.state.name,
            quote: this.state.quote
        }
        axios.post('/query', data)
             .then(function (response) {
                 console.log(response);
             })
             .catch(function (error) {
                 console.log(error);
             });
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }

    handleQuoteChange(e) {
        this.setState({quote: e.target.value});
    }

    render() {
        return (
            <div>
                <h1>
                    Wow!
                </h1>
                <form onSubmit={this.handleSubmit}>
                    <input onChange={this.handleNameChange} type="text" placeholder="name" name="name" />
                    <input onChange={this.handleQuoteChange} type="text" placeholder="quote" name="quote" />
                    <button type="submit">Submit</button>
                </form>
            </div>

        )
    }
}
export default Home;
