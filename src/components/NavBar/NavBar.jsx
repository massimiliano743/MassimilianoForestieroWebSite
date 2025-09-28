import { Link } from 'react-router-dom';
import './NavBar.less';

export function NavBar() {
    return (
        <>
            <nav style={{display: 'flex', gap: 12, padding: '8px 0'}}>
                <Link to="/">Home</Link>
                <Link to="/seconda">Seconda</Link>
            </nav>
            <div className="button">
                Ciao sono il NavBar di Test per il css less
            </div>
        </>
    );
}
