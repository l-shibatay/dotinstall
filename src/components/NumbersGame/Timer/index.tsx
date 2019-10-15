import * as React from 'React'

import bus from '../bus'
import './style.css'

interface Props {
}

interface State {
    time: number,
}

export default class Timer extends React.Component<Props, State> {

    private timerid:any;

    public state: State = {
        time: 0,
    }

    componentDidMount() {
        bus.addListener('numbersgame.game.started', this.startTimer.bind(this))
        bus.addListener('numbersgame.game.finished', this.clearTimer.bind(this))
    }

    startTimer() {
        this.setState({
            time: 0,
        })

        this.timerid = setInterval(() => {
            this.setState({
                time: this.state.time + 10
            })
        }, 10)
    }

    clearTimer() {
        clearInterval(this.timerid)
    }

    getFormatTime() {
        return (this.state.time / 1000).toFixed(2)
    }

    render() {
        return (
            <div className='timer'>
                {this.getFormatTime()}
            </div>
        )
    }
}
