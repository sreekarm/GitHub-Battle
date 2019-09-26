import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
//Component is concerned with
//--State
//--Lifecycle
//--UI

class App extends React.Component {
    render() {
        return(
            <div>
                First Draft!
            </div>
        )
    }
}

ReactDOM.render(
    //React Element
    <App />,
    //Where to render this element
    document.getElementById('app')
)