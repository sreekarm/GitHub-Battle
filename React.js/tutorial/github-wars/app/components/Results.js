import React from 'react'
import {battle} from '../utils/api'
import {FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser} from 'react-icons/fa'
import Card from './Card'

export default class extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }
    componentDidMount(){
        const {playerOne, playerTwo} = this.props

        battle([playerOne, playerTwo])
            .then(() => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
            }).catch((message) => {
                this.setState({
                    error: message,
                    loading: false
                })
            })
    }
    render(){
        const{winner, loser, error, loading} = this.state

        if(loading === true){
            return <p>LOADING...</p>
        }

        if(error){
            <p className='center-text error'> {error} </p>
        }

        return(
            <div className='grid space-around container-sm'>
                <Card 
                    header={winner.score === loser.score ? 'Tie' : 'Winner'}
                    subheader={'Score: ${winner.score.toLocaleString()}'}
                    avatar={winner.profile.avatar_url}
                    href={winner.profile.html_url}
                    name={winner.profile.login}
                >
                    <ul className='card-list'>
                        <li>
                            <FaUser color='rgb(225,112,112)' size={22} />
                            {winner.profile.name}
                        </li>
                        {winner.profile.location && (
                            <li>
                                <FaCompass color='rgb(147, 117, 254)' size={22} />
                                {winner.profile.location}
                            </li>
                        )}
                        {winner.profile.company && (
                            <li>
                                <FaBriefcase color='rgb(114,169,215)' size={22} />
                                {winner.profile.company}
                            </li>
                        )}
                        <li>
                            <FaUsers color='rgb(129, 199, 86)' size={22} />
                            {winner.profile.followers.toLocaleString()} followers 
                        </li>
                        <li>
                            <FaUserFriends color='rgb(99, 147, 241)' size={22} />
                            {winner.profile.following.toLocaleString()} following
                        </li>
                    </ul>
                </ Card>
                <Card
                header={winner.score === loser.score ? 'Tie' : 'Loser'}
                subheader={'Score: ${loser.score.toLocaleString()}'}
                avatar={loser.profile.avatar_url}
                name={loser.profile.login}
                href={loser.profile.html_url}
                >
                    <ul className='card-list'>
                        <li>
                            <FaUser color='rgb(225,112,112)' size={22} />
                            {loser.profile.name}
                        </li>
                        {loser.profile.location && (
                            <li>
                                <FaCompass color='rgb(147, 117, 254)' size={22} />
                                {loser.profile.location}
                            </li>
                        )}
                        {loser.profile.company && (
                            <li>
                                <FaBriefcase color='rgb(114,169,215)' size={22} />
                                {loser.profile.company}
                            </li>
                        )}
                        <li>
                            <FaUsers color='rgb(129, 199, 86)' size={22} />
                            {loser.profile.followers.toLocaleString()} followers 
                        </li>
                        <li>
                            <FaUserFriends color='rgb(99, 147, 241)' size={22} />
                            {loser.profile.following.toLocaleString()} following
                        </li>
                    </ul>
                </Card>        
            </div>
        )
    }
}