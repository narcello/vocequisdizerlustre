import React from 'react'
import './Bio.css'

class Bio extends React.Component {
    render() {
        return (
            <div id='bioSection'>
                <div id='bioText'>
                    “Um plano distópico e cinzento cheio de monstros apáticos”
            </div>
                <div id='autor'>Leon Carelli em <i>O Popular</i></div>
            </div>
        )

    }
}

export default Bio