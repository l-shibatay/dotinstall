import * as React from 'React';
import {EventEmitter} from 'fbemitter';

import Target from './Target';
import Info from './Info';
import StartButton from './StartButton';

interface Props {}

interface State {
    targetWord: string,
    inputStream: string,
    index: number,
    score: number,
    miss: number,
    idle: boolean,
    remainingTime: number,
}

export default class TypingGame extends React.Component<Props, State> {
    private initialMessage: string = 'Click to start';
    private keyupHandler: any;
    private timer: any;
    private timeLimit: number = 10 * 1000;
    private words: ReadonlyArray<string> = (`
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Quas sint ducimus voluptas officiis iure ab deleniti eos dicta,
        dolore blanditiis ipsum sunt consequatur placeat provident quae
        dolor odio tempore saepe!
    `).split(' ').map(word => word.trim()).filter(word => !!word)

    public emitter = new EventEmitter();
    public state: State = {
        targetWord: this.initialMessage,
        inputStream: '',
        index: 0,
        score: 0,
        miss: 0,
        remainingTime: 0,
        idle: true
    };

    componentDidMount() {
        this.emitter.addListener('typing.start.button.clicked', () => {
            this.startGame()
        })
        this.keyupHandler = this.handleKeyDown.bind(this);
    }

    startGame() {
        if (!this.state.idle) return;

        this.setState({
            idle: false,
            targetWord: this.getWordFromWords(),
            index: 0,
            score: 0,
            miss: 0,
            inputStream: ''
        });
        window.addEventListener('keyup', this.keyupHandler);
        this.startTimer();
    }

    startTimer() {
        this.setState({
            remainingTime: this.timeLimit
        });
        this.timer = setInterval(() => {
            this.setState({
                remainingTime: this.state.remainingTime - 10
            })
            if (this.state.remainingTime === 0) {
                clearInterval(this.timer);
                this.endGame();
            }
        }, 10);
    }

    endGame() {
        window.removeEventListener('keyup', this.keyupHandler);
        this.setState({
            idle: true,
            remainingTime: 0,
            inputStream: ''
        });
        setTimeout(() => this.showResult(), 100);
    }

    showResult() {
        const acuracy: number = this.state.score / (this.state.score + this.state.miss) * 100 || 0;
        alert(`Game Over!!\nScore: ${this.state.score}\nMiss: ${this.state.miss}\nAcuracy: ${acuracy.toFixed(2)}%`);
        this.setState({
            targetWord: this.initialMessage
        });

    }

    getWordFromWords() {
        return this.words[Math.floor(Math.random() * this.words.length)];
    }

    handleKeyDown(evt: KeyboardEvent) {
        const key: string = evt.key;
        if (key.length !== 1) return;

        let inputStream: string = this.state.inputStream;

        if (this.state.targetWord[this.state.index] === key) {
            this.setState({
                inputStream: this.state.inputStream + String(key),
                score: this.state.score + 1,
                index: this.state.index + 1
            });

            if (this.state.index === this.state.targetWord.length) {
                this.setState({
                    targetWord: this.getWordFromWords(),
                    index: 0,
                    inputStream: ''
                });
            }
        } else {
            this.setState({
                miss: this.state.miss + 1
            });
        }
    }

    render() {
        return (
            <div>
                <Target
                    textNode={ this.state.targetWord }
                    index={ this.state.index }
                />
                <Info
                    score={ this.state.score }
                    miss={ this.state.miss }
                    remainingTime={ this.state.remainingTime }
                />
                <StartButton
                    emitter={this.emitter}
                    isPlaying={!this.state.idle}
                />
            </div>
        )
    }
}
