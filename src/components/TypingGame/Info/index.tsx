import * as React from 'React';
import Target from '../Target';
import './style.css';

interface Props {
    score: number,
    miss: number,
    remainingTime: number
}

export default class App extends React.Component<Props, {}> {

    getRemainingTime() {
        return `${(this.props.remainingTime / 1000).toFixed(2)}ms`;
    }

    render() {

        return (
            <div>
                <div className="info">
                    <p>Letter count: { this.props.score }</p>
                    <p>Miss count: { this.props.miss }</p>
                    <p>Time Left: { this.getRemainingTime() }</p>
                </div>
            </div>
        )
    }
}
