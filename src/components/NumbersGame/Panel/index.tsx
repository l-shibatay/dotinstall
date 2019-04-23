import * as React from 'React';

import bus from '../bus';
import './style.css';

interface State {
    passed: boolean,
    started: boolean
}

interface Props {
    tapTarget: number,
    number: number,
}

export default class Panel extends React.Component<Props, State> {

    public state:State = {
        passed: false,
        started: false
    }

    componentDidMount() {
        this.bindAllListeners();
    }
    bindAllListeners() {
        bus.addListener('numbersGame.game.started', this.onGameStarted.bind(this));
    }
    onGameStarted() {
        this.setState({ started: true })
    }
    onClickPanel() {
        if (this.props.tapTarget === this.props.number) {
            this.setState({ passed: true });
            bus.emit('numbersGame.panel.passed');
        }
    }
    render() {
        const className = ['panel']
        if (this.state.passed) className.push('is-passed')
        if (!this.state.started) className.push('is-hidden')

        return (
            <div className={ className.join(' ') }
                onClick={ this.onClickPanel.bind(this) }>
                <span>{ this.props.number }</span>
            </div>
        )
    }
}
