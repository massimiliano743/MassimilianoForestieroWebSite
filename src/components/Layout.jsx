import {NavBar} from './NavBar/NavBar';
import {Footer} from "./Footer/Footer";

export function Layout({ children }) {
  return (
      <div style={{width: '100%'}}>
          <NavBar/>
          <main>{children}</main>
          <Footer/>
    </div>
  );
}

