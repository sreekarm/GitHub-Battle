import React from 'react'

export default class Hover extends React.Component{
    state = {
        hovering: false
    }
    mouseOver = () => {
        this.setState({
            hovering: true
        })
    }
    mouseOut = () => {
        this.setState({
            hovering: true
        })
    }

    render(){
        const props = {
            [propName]: this.state.hovering,
            ...this.props
        }
        return(
            <div onMouseOver = {this.mouseOver} onMouseOut = {this.mouseOut}>
                {this.props.children(this.state.hovering)}
            </div>
        )
    }
}