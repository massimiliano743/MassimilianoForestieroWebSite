import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.less';

export function Gallery() {
    const [albums, setAlbums] = useState([]);
    
    // Use local emulator in development, and production URL otherwise
    const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://127.0.0.1:5001/massimilianoforesti-3914-5d676/us-central1' 
        : 'https://massimilianoforesti-3914-5d676.web.app';

    useEffect(() => {
        fetch(`${baseUrl}/api/get-gallery-albums`)
            .then(res => res.json())
            .then(data => {
                if(data.albums) {
                    setAlbums(data.albums);
                }
            })
            .catch(err => console.error('API Error:', err));
    }, [baseUrl]);

    return (
        <div className={'content-page-template'}>
            <div className={'gallery-page'}>
                <div className={'title'}>
                    <h1>Gallery</h1>
                </div>
                <div className={'gallery-content'}>
                    {albums.map((album, index) => (
                        <Link key={index} to={`/gallery/${album.folderName}`} state={{ albumPath: album.folderNameReal }}>
                            <div className={'card-album'}>
                                <div className={'image-album'}>
                                    {album.firstImage && <img src={album.firstImage} alt={`Album ${album.folderName}`}/>}
                                </div>
                                <div className={'name-album'}>{album.folderName.replace(/-/g, ' ')}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
