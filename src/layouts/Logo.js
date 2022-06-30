import { Link } from "react-router-dom";
import sushi_logo from '../assets/images/logos/sushi-log.jpeg';

const Logo = () => {
  return (
    <Link to="/">
      <div style={{ marginLeft: '8px', marginBottom: '-15px', padding: '0px' }}>
        <img src={sushi_logo} style={{ width: '120px' }} />
      </div>
    </Link>
  );
};

export default Logo;
