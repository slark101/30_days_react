import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import './timeline.css';

class ActiviyItem extends React.Component{
  render(){
    const {activity}=this.props;
    return (
      <div className='item'>
        <div className='avatar'>
          <img
            alt={activity.text}
            src={activity.user.avatar}
          />
          {activity.user.name}
        </div>
        <span className='time'>
          {activity.timestamp}
        </span>
        <p>{activity.text}</p>
        <div className='commentCount'>
          {activity.comments.length}
        </div>
      </div>
    )
  }
}

class Header extends React.Component {
  render(){
    return (
      <div className='header'>
        <div className='menuIcon'>
          <div className='dashTop'></div>
          <div className='dashBottom'></div>
          <div className='circle'></div>
        </div>
        <div className='fa fa-more'></div>
        <span className='title'>{this.props.title}</span>
        <input
          type='text'
          className='searchInput'
          placeholder='Search ...'
        />
        <div className='fa fa-search searchIcon'></div>
      </div>
    )
  }
}

class Content extends React.Component {
  render(){
    const {activities}=this.props;
    return (
      <div className='content'>
        <div className='line'></div>
        {activities.map((activity)=>(<ActiviyItem activity={activity}/>)
        )}
      </div>
    )
  }
}

const activities = [
  {
    timestamp:new Date().getTime(),
    text:'Ate lunch',
    user:{
      id: 1, name:'Nate',
      avatar:'http://www.croop.cl/UI/twitter/images/doug.jpg',
    },
    comments:[{from:'Ari',text:'Me too!'}],
  },
  {
    timestamp:new Date().getTime(),
    text:'Woke up early for a beatiful run',
    user:{
      id: 2, name:'Ari',
      avatar:'http://www.croop.cl/UI/twitter/images/doug.jpg',
    },
    comments:[{from:'Nate',text:'I am so jealous'}],
  },
]

class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = this.getTime();
  }

  setTimer(){
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.updateClock.bind(this),1000);
  }

  updateClock(){
    const currentTime = new Date();
    this.setState({currentTime:currentTime},this.setTimer());
  }

  render(){
    // const currentTime = new Date(),
    //       hours = currentTime.getHours(),
    //       minutes = currentTime.getMinutes(),
    //       seconds = currentTime.getSeconds(),
    //       ampm = hours>=12?'pm':'am';
    const {hours,minutes,seconds,ampm}=this.state;
    return (
      <div className='clock'>
        {
          hours == 0?12:
            (hours>12)?
              hours-12:hours
        }:{
          minutes >9? minutes:`0${minutes}`
        }:{
          seconds>9?seconds:`0${seconds}`
        } {ampm}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className='notificationsFrame'>
          <div className='panel'>
            <Header title="Timeline"/>
            <Clock/>
            <Content activities={activities}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
