import React, { Component } from 'react'

export const Context = React.createContext();

export class Provider extends Component {
    constructor(props) {
        super(props)
        this.setCurrentLang = (lang) => this.setState({ lang })
        this.state = {
            lang: 'pt',
            setCurrentLang: this.setCurrentLang
        }
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}