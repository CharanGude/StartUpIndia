import React from 'react';
import './index.css';
import man from '../../assets/man.jpg';

const Greeting = props => {
   const { user } = props;
    return (
        <div className="greeting">
            <img className="user-image" src={man} alt="user-image" />
            <div>
              <span className="hello">Hello,</span>
              <h1 className="username">{user}</h1>
            </div>
        </div>
    );
}

export default Greeting;