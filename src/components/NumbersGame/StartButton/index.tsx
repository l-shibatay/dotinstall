import * as React from 'React';

import bus from '../bus';
import './style.css';

interface State {}

interface Props {}

export default class StartButton extends React.Component<Props, State> {
    onClickStartButton() {
        bus.emit('numbersgame.startButton.clicked')
    }
    render() {
        return (
            <button type='button' className='startButton'
                onClick={ this.onClickStartButton.bind(this) }>
                START
            </button>
        )
    }
}
