import * as React from 'React';
import { EventEmitter } from 'fbemitter';

interface Props {
    isPlaying: boolean,
    emitter: EventEmitter
}

export default class StartButton extends React.Component<Props, {}> {

    public emitter = this.props.emitter

    onClickStartButton() {
        console.log(this);
        this.emitter.emit('typing.start.button.clicked')
    }

    render() {
        return (
            <>
                <button
                    type='button'
                    onClick={this.onClickStartButton.bind(this)}
                    disabled={this.props.isPlaying}
                >Press To Start</button>
            </>
        )
    }
}
