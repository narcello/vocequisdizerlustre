import React from 'react'
import './Bio.css'
import { bio } from '../../languages/languages'
import { Context } from '../../providers/Provider'

class Bio extends React.Component {
    render() {
        return (
            <Context.Consumer>
                {(context) => (
                    <React.Fragment>
                        <div id='bioSection'>
                            <div id='bioText'>
                                {bio[context.lang].title}
                            </div>
                            <div id='autor'>Leon Carelli</div>
                        </div>
                    </React.Fragment>
                )}
            </Context.Consumer>
        )

    }
}

export default Bio