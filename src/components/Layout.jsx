import {NavBar} from './NavBar/NavBar';

export function Layout({ children }) {
  return (
      <div style={{width: '100%'}}>
        <NavBar/>
      <main>{children}</main>
    </div>
  );
}

