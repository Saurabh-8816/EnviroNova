import React from 'react';
import './Projects.css';

const Projects: React.FC = () => {
  return (
    <>
      <div className="banner">
        {/* 3D Scene - contains slider around model */}
        <div className="scene">
          {/* Model in center at z=0 */}
          <div className="model" style={{ backgroundImage: 'url(/model.png)' }}></div>
          
          {/* Cards rotate around the model */}
          <div className="slider" style={{'--quantity':10} as React.CSSProperties}>
            <div className="item"  style={{'--position':1} as React.CSSProperties}><img src="/img1.jpg" alt="" /></div>
            <div className="item"  style={{'--position':2} as React.CSSProperties}><img src="/img2.jpg" alt="" /></div>
            <div className="item"  style={{'--position':3} as React.CSSProperties}><img src="/img3.jpg" alt="" /></div>
            <div className="item"  style={{'--position':4} as React.CSSProperties}><img src="/img4.jpg" alt="" /></div>
            <div className="item"  style={{'--position':5} as React.CSSProperties}><img src="/img5.jpg" alt="" /></div>
            <div className="item"  style={{'--position':6} as React.CSSProperties}><img src="/img6.jpg" alt="" /></div>
            <div className="item"  style={{'--position':7} as React.CSSProperties}><img src="/img7.jpg" alt="" /></div>
            <div className="item"  style={{'--position':8} as React.CSSProperties}><img src="/img8.jpg" alt="" /></div>
            <div className="item"  style={{'--position':9} as React.CSSProperties}><img src="/img9.jpg" alt="" /></div>
            <div className="item" style={{'--position':10} as React.CSSProperties}><img src="/img10.jpg" alt="" /></div>
          </div>
        </div>
        
        <div className="content">
          {/* <h1 data-content="EnviroNova">
             EnviroNova
            </h1> */}
            <div className="author">
              <h2>Environemental engineering</h2>
              {/* <p>Web Design Here</p> */}
            </div>
        </div>
      </div>
    </>
  );
};

export default Projects; 