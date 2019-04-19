import * as React from 'react'
import { BrowserRouter, Route, Link } from 'react-router-dom'

import Home from './components/Home'
import TypingGame from './components/TypingGame'
import NumbersGame from './components/NumbersGame'
import Quiz from './components/Quiz'
import Puzzle from './components/Puzzle'
import SlideShow from './components/SlideShow'
import Doubt from './components/Doubt'

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <nav className='navigation'>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/type'>TypingGame</Link></li>
                        <li><Link to='/number'>NumbersGame</Link></li>
                        <li><Link to='/quiz'>Quiz</Link></li>
                        <li><Link to='/puzzle'>Puzzle</Link></li>
                        <li><Link to='/slideshow'>SlideShow</Link></li>
                        <li><Link to='/doubt'>Doubt</Link></li>
                    </ul>
                </nav>
                <main className='container'>
                    <Route exact path='/' component={Home} />
                    <Route path='/type' component={TypingGame} />
                    <Route path='/number' component={NumbersGame} />
                    <Route path='/quiz' component={Quiz} />
                    <Route path='/puzzle' component={Puzzle} />
                    <Route path='/slideshow' component={SlideShow} />
                    <Route path='/doubt' component={Doubt} />
                </main>
            </BrowserRouter>
        )
    }
}
