import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <nav style={{display:'flex', gap:12, padding:'8px 0'}}>
      <Link to="/">Home</Link>
      <Link to="/seconda">Seconda</Link>
    </nav>
  );
}

