import {NavBar} from '../components/NavBar/NavBar';

export function Layout({ children }) {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto', fontFamily: 'sans-serif' }}>
        <NavBar/>
      <main>{children}</main>
    </div>
  );
}

