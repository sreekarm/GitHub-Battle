import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Popular from './components/Popular'
import Battle from './components/Battle'
import ThemeProvider from '../contexts/theme'
import Nav from './components/Nav'
import {BrowserRouter as Router, Route} from 'react-router-dom'
//Component is concerned with
//--State
//--Lifecycle
//--UI

class App extends React.Component {
    constructor(){
        super(props)

        this.state = {
            theme: 'light',
            toggleTheme: () => {
                this.setState(({theme}) => ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            } 
        }
    }
    render() {
        return(
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme} >
                        <div className = 'container'>
                            <Nav />

                            <Route exact path='/' component={Popular} />
                            <Route path='/' component={Battle} />
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(
    //React Element
    < App />,
    //Where to render this element
    document.getElementById('app')
)