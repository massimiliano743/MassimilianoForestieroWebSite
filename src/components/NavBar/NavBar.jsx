import { Link } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import './NavBar.less';

export function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <nav className={`nav-right-part${isOpen ? ' is-open' : ''}`}>
                <div className={`nav-right-part${isOpen ? ' is-open' : ''}`}>
                    <Link
                        to=""
                        className={`menu-single-item${isOpen ? ' is-open' : ''}`}
                        onClick={() => setIsOpen(!isOpen)}>
                        <img className={'my-logo'} src={isMobile ? "/img/hamburger-menu.svg" : "/img/logo_bianco.png"}
                             alt="Logo"/>
                    </Link>
                    <Link className={'menu-single-item'} to="/">Home</Link>
                    <Link className={'menu-single-item'} to="/About-me">About</Link>
                    <Link className={'menu-single-item'} to="/Wip">Gallery</Link>
                    <Link className={'menu-single-item'} to="/Wip">Portfolio</Link>
                    <Link className={'menu-single-item'} to="/Wip">Contacts</Link>
                    <Link className={'menu-single-item'} to="/Wip">Log-In</Link>
                </div>
                <div className={`nav-left-part ${isOpen ? ' is-open' : ''}`}>
                    <a className={'linkedin social-logo'}
                       href="https://www.linkedin.com/in/massimiliano-luigi-forestiero-244183b0/" target="_blank"
                       rel="noopener noreferrer" aria-label="LinkedIn"/>
                    <a className={'facebook social-logo'} href="https://www.facebook.com/massimiliano.forestiero/"
                       target="_blank" rel="noopener noreferrer" aria-label="facebook"/>
                    <a className={'instagram social-logo'} href="https://www.instagram.com/massimiliano743/?hl=it"
                       target="_blank" rel="noopener noreferrer" aria-label="instagram"/>
                    <a className={'x social-logo'} href="https://x.com/massimiliano94" target="_blank"
                       rel="noopener noreferrer" aria-label="X"/>
                    <a className={'youtube social-logo'}
                       href="https://www.youtube.com/c/MassimilianoForestiero/featured" target="_blank"
                       rel="noopener noreferrer" aria-label="youtube"/>
                </div>
            </nav>
        </>
    );
}
