import * as React from 'React';

import bus from '../bus';
import './style.css';

interface State {}

interface Props {
    isPlaying: boolean
}

export default class StartButton extends React.Component<Props, State> {
    onClickStartButton() {
        bus.emit('numbersgame.startButton.clicked')
    }
    getLabel() {
        return this.props.isPlaying ? 'RESTART?' : 'START'
    }
    render() {
        const classNames = ['startButton']
        if (this.props.isPlaying) classNames.push('is-playing')

        return (
            <button type='button' className={ classNames.join(' ') }
                onClick={ this.onClickStartButton.bind(this) }>
                { this.getLabel() }
            </button>
        )
    }
}
