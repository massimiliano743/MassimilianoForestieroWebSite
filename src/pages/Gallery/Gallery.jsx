import {useState, useEffect} from "react";
import './Gallery.less';
import RowsPhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/rows.css";

export function Gallery() {
    const [folderGallery, setFolderGallery] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState(null);
    const [files, setFiles] = useState([]);
    const [index, setIndex] = useState(-1);
    const baseUrl = "https://massimilianoforesti-3914-5d676.web.app";

    useEffect(() => {
        // Fetch the list of albums from the new endpoint
        fetch(`${baseUrl}/api/get-gallery-albums`)
            .then(res => res.json())
            .then(data => {
                setFolderGallery(data.albums || []);
            })
            .catch(err => console.error('Errore:', err));
    }, []);

    function showGallery(folder) {
        setSelectedFolder(folder);

        // Fetch images for the selected album
        fetch(`${baseUrl}/api/get-images-album?album=${folder.folderNameReal}`)
            .then(res => res.json())
            .then(data => {
                const mappedFiles = (data.files || []).map(url => ({
                    src: url,
                    width: 1200,
                    height: 800,
                    alt: url.split('/').pop() // Use filename from URL as alt text
                }));
                setFiles(mappedFiles);
            })
            .catch(err => console.error("Errore API:", err));
    }

    function goBack() {
        setSelectedFolder(null);
        setFiles([]);
        setIndex(-1);
    }

    // Render album selection view
    if (!selectedFolder) {
        return (
            <div className="content-page-template gallery-page">
                {folderGallery.map((folder, idx) => (
                    <div
                        className="singleImageTiles"
                        key={idx}
                        onClick={() => showGallery(folder)}
                    >
                        {folder.firstImage && (
                            <>
                                <img
                                    src={folder.firstImage} // Use the direct URL for the cover
                                    alt={folder.folderName}
                                />
                                <div className="caption-img-gallery">{folder.folderName}</div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    // Render single album view
    return (
        <div className="content-page-template single-gallery-page">
            <div className={'go-back-gallery-title-page'}>
                <div className={'album-name-gallery'}>{selectedFolder.folderName}</div>
                <button className={'back-button-to-single-gallery'} onClick={goBack}>
                    <div className={'icon-back-left'}></div>
                    <div className={'text-button'}>Album List</div>
                </button>
            </div>

            {files.length === 0 ? (
                <div>Caricamento immagini...</div>
            ) : (
                <>
                    <RowsPhotoAlbum
                        photos={files}
                        layout="rows"
                        onClick={({index: current}) => setIndex(current)}
                    />
                    <Lightbox
                        open={index >= 0}
                        index={index}
                        slides={files}
                        close={() => setIndex(-1)}
                    />
                </>
            )}
        </div>
    );
}
