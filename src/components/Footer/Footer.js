import './Footer.less';

export function Footer() {
    const year = new Date().getFullYear();
    return (
        <>
            <footer>
                <div className={`footer-left-part`}>
                    <p>© {year} Massimiliano Forestiero. All rights reserved.</p>
                </div>
                <div className={`footer-right-part`}>
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
            </footer>
        </>
    );
}
