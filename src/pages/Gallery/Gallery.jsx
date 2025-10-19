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

    useEffect(() => {
        fetch('/api/get-name-folders-gallery')
        .then(res => res.json())
        .then(data => {
            const mapped = data.map(item => ({
                folderName: item.folderName.replace(/_/g, ' '),
                folderNameReal: item.folderName,
                firstImage: item.firstImage
            }));
            setFolderGallery(mapped);
        })
        .catch(err => console.error('Errore:', err));
    }, []);

    function showGallery(folder) {
        setSelectedFolder(folder.folderNameReal);

        fetch(`/api/get-first-image-folders-gallery?folderName=${folder.folderNameReal}`)
        .then(res => res.json())
        .then(data => {
            const mappedFiles = data.filteredFiles.map(filename => ({
                src: `/imagePersonalWebsite/Gallery/${folder.folderNameReal}/img/${filename}`,
                width: 1200,
                height: 800,
                alt: filename
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
                                    src={`/imagePersonalWebsite/Gallery/${folder.folderNameReal}/img/${folder.firstImage}`}
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

    return (
        <div className="content-page-template single-gallery-page">
            <div className={'go-back-gallery-title-page'}>
                <div className={'album-name-gallery'}>{selectedFolder}</div>
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
