import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'
import {FaUser, FaStar, FaCodeBranch, FaExclamationTriangle} from 'react-icons/fa'
import Card from './Card'
import Loading from './Loading'
import Tooltip from './Tooltip'

function LanguagesNav({selected, onUpdateLanguage}) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python' ]
    return(
        <ul className = 'flex-center'>
            {languages.map((language) => (
                <li key= {language}>
                    <button 
                        className='btn-clear-nav-link'
                        style={language === selected ? {color: 'rgb(191, 47, 29)'} : null}
                        onClick={() => onUpdateLanguage(language)}>    
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid({repos}){
    return(
        <ul className='grid space-around'>
            {repos.map((repo, index) => {
                const {name, owner, html_url, stargazers_count, forks, open_issues} = repo
                const {login, avatar_url} = owner

                return(
                    <li key={html_url}>
                        <Card
                        header={'#${index + 1}'}
                        avatar={avatar_url}
                        href={html_url}
                        name={login}
                        >
                            <ul className='card-list'>
                            <li>
                                <Tooltip text="GitHub username">
                                    <FaUser color='rgb(255, 189, 111)' size={22} />
                                    <a href={'https://github.com/${login}'}>
                                        {login}
                                    </a>
                                </Tooltip>
                            </li>
                            <li>
                                <FaStar color='rgb(255,212, 7)' size={22} />
                                {stargazers_count.toLocaleString()} stars
                            </li>
                            <li>
                                <FaCodeBranch color='rgb(127, 191, 244)' size={22} />
                                {forks.toLocaleString()} forks
                            </li>
                            <li>
                                <FaExclamationTriangle color='rgb(144,186, 208)' size={22} />
                                {open_issues.toLocaleString()} issues open
                            </li>
                            </ul>
                        </Card>

                        <h4 className='header-lg center-text'>
                            #{index + 1}
                        </h4>
                        <img
                            className='avatar'
                            src={avatar_url}
                            alt={'Avatar for ${login}'}
                        />
                        <h2 className='center-text'>
                            <a className='link' href={html_url}>{login}</a>
                        </h2>
                        
                    </li>
                )
            })}
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

export default class Popular extends React.Component {
    state = {
        selectedLanguage: 'All',
        repos: {},
        error: null,
    }
    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }
    updateLanguage = (selectedLanguage) => {
        this.setState({
            selectedLanguage,
            error: null,
        })
    
        if(!this.state.repos[selectedLanguage]){
            fetchPopularRepos(selectedLanguage) 
            {
                ((data) => {
                    this.setState(({repos}) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                ((error) => {
                    console.warn('Error fetching repositories', error)
                    this.setState({
                        error: 'Ran into an error while fetching repositories'
                    })
                })
            }    
        }
    }
    isLoading = () => {
        const {selectedLanguage, repos, error} = this.state
        
        return !repos[selectedLanguage] && error === null
    }
    render() {
        const{selectedLanguage, repos, error} = this.state

        return(
            <React.Fragment>
                <LanguagesNav
                    selected = {selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
        
                {this.isLoading() && <Loading text='Fetching repositories' />}

                {error && <p className='center-text error'>{error}</p>}

                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}
            </React.Fragment>
        )
    }
}