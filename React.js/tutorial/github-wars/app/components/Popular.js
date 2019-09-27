import React from 'react'
import PropTypes from 'prop-types'
import { fetchPopularRepos } from '../utils/api'

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

export default class Popular extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null,
        }
        this.updateLanguage = this.updateLanguage.bind(this)
        this.isLoading = this.isLoading.bind(this)
    }
    componentDidMount(){
        this.updateLanguage(this.state.selectedLanguage)
    }
    updateLanguage(selectedLanguage){
        this.setState({
            selectedLanguage,
            error: null
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
    isLoading(){
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
        
                {this.isLoading() && <p>LOADING...</p>}

                {error && <p>{error}</p>}

                {repos[selectedLanguage] && <pre>{JSON.stringify(repos[selectedLanguage], null ,2)}</pre>}
            </React.Fragment>
        )
    }
}