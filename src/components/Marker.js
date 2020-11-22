import React from 'react';
import './Marker.css';

const Marker = (props) => {
    const { color, name} = props;
    return (
        <div>
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: 'pointer',zIndex:"-1"}}
          title={name}
        />
        <div className="pulse" />
      </div>
    );
  };

  export default Marker;