import './index.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPlay, faPause, faHistory } from '@fortawesome/free-solid-svg-icons';

function str_pad_left(string, pad, length) {

  return (new Array(length + 1).join(pad) + string).slice(-length);

}

class Title extends React.Component {
  render() {
    return (
      <h1>Pomodoro Timer</h1>
    )
  }
}

class TimerSettings extends React.Component {

  constructor(props) {
    super(props);
    this.handleBreakDown = this.handleBreakDown.bind(this);
    this.handleBreakUp = this.handleBreakUp.bind(this);
    this.handleSessionDown = this.handleSessionDown.bind(this);
    this.handleSessionUp = this.handleSessionUp.bind(this);
  }

  handleBreakDown() {
    var output = 'break down';
    this.props.onClick(output);
  }
    
  handleBreakUp() {
    var output = 'break up';
    this.props.onClick(output);
  }
    
  handleSessionDown() {
    var output = 'session down';
    this.props.onClick(output);
  }
    
  handleSessionUp() {
    var output = 'session up';
    this.props.onClick(output);
  }
    
  render() {

    let breakLength = this.props.value.breakLength / 60;
    let sessionLength = this.props.value.sessionLength / 60;

    return (
      <div className="settings__wrapper">
        <span>
          <h3 id="break-label" className="align__left">Break Length</h3><h3 id="session-label" className="align__right">Session Length</h3>
        </span>
        <span>
          <button id="break-decrement" onClick={this.handleBreakDown}>
            <FontAwesomeIcon icon={ faChevronDown } />
          </button>
          <span id="break-length" className="mlr_10">{breakLength}</span>
          <button id="break-increment" onClick={this.handleBreakUp} className="mr_25">
            <FontAwesomeIcon icon={ faChevronUp } />
          </button>
          <button id="session-decrement" onClick={this.handleSessionDown} className="ml_25">
            <FontAwesomeIcon icon={ faChevronDown } />
          </button>
          <span id="session-length" className="mlr_10">{sessionLength}</span>
          <button id="session-increment" onClick={this.handleSessionUp}>
            <FontAwesomeIcon icon={ faChevronUp } />
          </button>
        </span>
      </div>
    )
  }
}

class Clock extends React.Component {

  render() {

    let clockType = this.props.value.clockType;
    const clockTypeCaps = clockType.charAt(0).toUpperCase() + clockType.slice(1)
    return (
      <div className="timer__wrapper">
        <h3 id="timer-label" className="timer__pd">Timer: {clockTypeCaps}</h3>
        <h3 id="time-left">{this.props.value.timer}</h3>
      </div>
    )
  }
}

class Options extends React.Component {

  constructor(props) {
    super(props);
    this.handlePlayClicked = this.handlePlayClicked.bind(this);
    this.handleResetClicked = this.handleResetClicked.bind(this);
    this.paused = true;
  }

  handlePlayClicked() {
    var output = (this.paused) ? 'play clicked' : 'pause clicked';
    this.props.onClick(output);
  }

  handleResetClicked(){
    var output = 'reset';
    this.props.onClick(output);
  }

  render() {

    this.paused = this.props.value.paused;
    let thisIcon = '';
    if (this.paused) {
      thisIcon = <FontAwesomeIcon icon={ faPlay } />;
    } else {
      thisIcon = <FontAwesomeIcon icon={ faPause } />;
    }

    return (
      <div>
          <span>
            <button id="start_stop" onClick={this.handlePlayClicked} className="mlr_10">
              {thisIcon}
            </button>
          </span>
          <span>
            <button id="reset" onClick={this.handleResetClicked} className="mlr_10">
              <FontAwesomeIcon icon={ faHistory } />
            </button>
          </span>
      </div>
    )
  }
}

class Timer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      breakLength: 300,
      sessionLength: 1500,
      secondsTimer: 1500,
      paused: true,
      clockType: 'session',
      displayTimer: '25:00'
    }
    this.countdown = 0;
    this.handleSettingClick = this.handleSettingClick.bind(this);
    this.handleOptionClick = this.handleOptionClick.bind(this);
  }

  handleSettingClick = (settingUpdate) => {
    if (this.state.paused) {
      switch (settingUpdate) {    
        case 'break up':
          if (this.state.breakLength < 3600) {
            if (this.state.clockType === 'break') {
              let newDisplayTimer = this.getTimerValue(this.state.secondsTimer + 60);
              this.setState({breakLength: this.state.breakLength + 60, secondsTimer: this.state.breakLength + 60, displayTimer: newDisplayTimer});
            } else {
              this.setState({breakLength: this.state.breakLength + 60});
            }
          }
          break;
        case 'break down':
          if (this.state.breakLength > 60) {
            if (this.state.clockType === 'break') {
              let newDisplayTimer = this.getTimerValue(this.state.secondsTimer - 60);
              this.setState({breakLength: this.state.breakLength - 60, secondsTimer: this.state.breakLength - 60, displayTimer: newDisplayTimer});
            } else {
              this.setState({breakLength: this.state.breakLength - 60});
            }
          }
          break;
        case 'session up':
          if (this.state.sessionLength < 3600) {
            if (this.state.clockType === 'session') {
              let newDisplayTimer = this.getTimerValue(this.state.secondsTimer + 60);
              this.setState({sessionLength: this.state.sessionLength + 60, secondsTimer: this.state.sessionLength + 60, displayTimer: newDisplayTimer});
            } else {
              this.setState({sessionLength: this.state.sessionLength + 60});
            }
          }
          break;
        case 'session down':
          if (this.state.sessionLength > 60) {
            if (this.state.clockType === 'session') {
              let newDisplayTimer = this.getTimerValue(this.state.secondsTimer - 60);
              this.setState({sessionLength: this.state.sessionLength - 60, secondsTimer: this.state.sessionLength - 60, displayTimer: newDisplayTimer});
            } else {
              this.setState({sessionLength: this.state.sessionLength - 60});
            }
          }
          break;
        default:
          break;
      }
    }
  }

  getTimerValue(inputSecs) {
    let minutes = parseInt(Math.floor(inputSecs / 60));
    let seconds = parseInt(inputSecs - minutes * 60);
    return str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
  }

  appTimer() {

    let clockType = this.state.clockType;
    let currentTimer = this.state.secondsTimer - 1;

    var newDisplayTimer = this.getTimerValue(currentTimer);
    
    if (currentTimer !== 0) {
      this.setState({secondsTimer: currentTimer, displayTimer: newDisplayTimer});
    } else
    if (clockType === 'session' && currentTimer === 0) {
      this.audioPlay.play();
      this.setState({clockType: 'break', secondsTimer: this.state.breakLength + 1, displayTimer: newDisplayTimer});
    } else
    if (clockType === 'break' && currentTimer === 0) {
      this.audioPlay.play();
      this.setState({clockType: 'session', secondsTimer: this.state.sessionLength + 1, displayTimer: newDisplayTimer});  
    }
  }

  handleOptionClick = (option) => {

    if (option === 'play clicked') {
      this.setState({paused: false});
      this.countdown = setInterval(this.appTimer.bind(this), 1000);
    } else if (option === 'pause clicked') {
      this.setState({paused: true});
      clearInterval(this.countdown);
    } else if (option === 'reset') {
      if (!this.state.paused) {
        clearInterval(this.countdown);
      }
      this.audioPlay.pause();
      this.audioPlay.currentTime = 0;
      this.setState({
        breakLength: 300,
        sessionLength: 1500,
        secondsTimer: 1500,
        paused: true,
        clockType: 'session',
        displayTimer: '25:00'
      }, () => console.log('Timer reset'));
    }
  }

  render() {
    return (
      <div className="container">
        <Title />
        <TimerSettings 
          value={{breakLength: this.state.breakLength, sessionLength: this.state.sessionLength}} 
          onClick={this.handleSettingClick} />
        <Clock value={{clockType: this.state.clockType, timer: this.state.displayTimer}} />
        <Options value={{paused: this.state.paused}} onClick={this.handleOptionClick} /> 
        <audio id="beep" preload="auto" ref={(audio) => this.audioPlay = audio}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
      </div>
    )
  }
}

function App() {
  return (
      <Timer />
  );
}

export default App;
