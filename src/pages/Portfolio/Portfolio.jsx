import * as React from "react";
import './Portfolio.less';
import Lightbox from "yet-another-react-lightbox";
import {useEffect, useState} from "react";
import {RowsPhotoAlbum} from "react-photo-album";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/styles.css";


export function Portfolio() {
    const [index, setIndex] = useState(-1);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetch('/api/get-images-portfolio')
        .then(res => res.json())
        .then(data => {
            const images = data.files.map(url => ({
                src: url,
                width: 1200,
                height: 800,
                alt: url.split('/').pop()
            }));
            setFiles(images);
        });
    }, []);

    return (
        <div className={'content-page-template portfolio-page'}>
            {files.length === 0 ? (
                <div>Caricamento immagini...</div>
            ) : (
                <>
                    <RowsPhotoAlbum
                        photos={files}
                        componentsProps={(containerWidth) => ({
                            image: {loading: (containerWidth || 0) > 600 ? "eager" : "lazy"},
                        })}
                        onClick={({index: current}) => {
                            setIndex(current);
                        }}
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
