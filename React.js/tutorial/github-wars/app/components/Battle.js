import React from 'react'
import {FaUserFriends, FaFighterJet, FaTrophy} from 'react-icons/fa'

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

export default class Battle extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Instructions />
            </React.Fragment>
        )
    }
}