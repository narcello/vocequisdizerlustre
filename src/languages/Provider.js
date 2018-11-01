import React, { Component } from 'react'

export const MIN_SIZE_DESKTOP = 583;

export const Context = React.createContext();

const isMobile = () => {
    return (window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth) < MIN_SIZE_DESKTOP
}

export class Provider extends Component {
    constructor(props) {
        super(props)
        this.setCurrentLang = (lang) => this.setState({ lang })
        this.state = {
            lang: 'pt',
            setCurrentLang: this.setCurrentLang,
            ehBrowser: true
        }
        this.updateDimensions = this.updateDimensions.bind(this)
    }
    updateDimensions() {
        const ehBrowser = !isMobile()
        this.setState({ ehBrowser })
    }
    componentWillMount() {
        this.updateDimensions()
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}