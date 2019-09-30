import React from 'react'
import PropTypes from 'prop-types'
import {FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle} from 'react-icons/fa'
import Results from './Results'

function Instructions(){
    return(
        <div className='instructions-container'>
            <h1 className='center-text header-lg'>
                Instructions
            </h1>
            <ol className='container-sm grid center-text battle-instructions'>
                <li>
                    <h3  className='header-sm'> Enter two GitHub users </h3>
                    <FaUserFriends className='bg-light' color='rgb(192,168,1)' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'> Fight! </h3>
                    <FaFighterJet className='bg-light' color='rgb(172,16,108)' size={140} />
                </li>
                <li>
                    <h3 className='header-sm'> Reveal winner </h3>
                    <FaTrophy className='bg-light' color='rgb(255,252,0)' size={140} />
                </li>
            </ol>
        </div>
    )
}

class PlayerInput extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            username: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleSubmit(event){
        event.preventDefault()

        this.props.onSubmit(this.state.username)
    }

    handleChange(event){
        this.setState({
            username: event.target.value
        })
    }

    render(){
        <form className='column player' onSubmit={this.handleSubmit}>
            <label htmlFor='username' className='player-label'>
                {this.props.label}
            </label>
            <div className='row player-inputs'>
                <input 
                type='text'
                id='username'
                className='input-light'
                placeholder='GitHub username'
                autoComplete='off'
                value={this.state.username}
                onChange={this.handleChange}
                />
                <button
                className='btn btn-dark'
                type='submit'
                disabled={!this.state.username}
                >
                    Submit
                </button>
            </div>
        </form>
    }
}

PlayerInput.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

function PlayerPreview({username, onReset, label}) {
    return(
        <div className='column player'>
            <h3 className='player-label'> {label} </h3>
            <div className='row bg-light'>
                <div className='player-info'>
                    <img
                    className='avatar-small'
                    src={'https://github.com/${username}.png?size=200'}
                    alt={'Avatar for ${username}'}
                    />
                    <a
                        href={'htps:github.com/${username'}
                        className='link'>
                        {username}
                    </a>
                </div>
                <button className='btn-clear flex-center' onClick={onReset}>
                    <FaTimesCircle color='rgb(96, 69, 211)' size={26} />
                </button>
            </div>
        </div>
    )
} 

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired
}

export default class Battle extends React.Component{
    constructor(props){
        super(props)

        this.state={
            playerOne: null,
            playerTwo: null,
            battle: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset= this.handleReset.bind(this)
    }
    handleSubmit(id, player){
        this.setState({
            [id]: player
        })
    }
    handleReset(id){
        this.setState({
            [id]: null
        })
    }
    render(){
        const{playerOne, playerTwo, battle} = this.state

        if(battle === true){
            return <Results playerOne={playerOne} playerTwo={playerTwo} />
        }
        
        return(
            <React.Fragment>
                <Instructions />

                <div className='players-container'>
                    <h1 className='center-text header-lg'> Players </h1>
                    <div className='row space-around'>
                        {playerOne === null 
                            ?   <PlayerInput
                                    label='Player One'
                                    onSubmit={(player) => this.handleSubmit('playerOne', player)}
                                />
                            :   <PlayerPreview
                                    username={playerOne}
                                    label='Player One'
                                    onReset={() => this.handleReset('playerOne')}
                                />    
                        }
                        {playerTwo === null
                            ?   <PlayerInput 
                                    label='Player Two'
                                    onSubmit={(player) => this.handleSubmit('playerTwo', player)}
                                />
                            :   <PlayerPreview
                                    username={playerTwo}
                                    label='Player Two'
                                    onReset={() => this.handleReset('playerTwo')}
                                />
                        }
                    </div>

                {playerOne && playerTwo && (
                    <button
                    className='btn btn-dark btn-space'
                    onClick={() => this.setState({battle: true})}>
                        Battle
                    </button>
                )}    
                </div>

            </React.Fragment>
        )
    }
}