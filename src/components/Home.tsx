import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="homeContainer">
      
      <div className=""> {/* ใช้ div ใหม่เพื่อรวมปุ่ม */}
        <Link to="/main">
          <button className="homeButton">Test1</button>
        </Link>
        <Link to="/add">
          <button className="homeButton">Test2</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
