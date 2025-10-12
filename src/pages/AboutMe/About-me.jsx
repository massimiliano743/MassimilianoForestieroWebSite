import './About-me.less';

export function AboutMe() {
    return (
        <div className={'content-page-template'}>
            <div className={'about-me-page'}>
                <div className={'title'}>
                    <h1>About Me</h1>
                </div>
                <div className={'description'}>
                    <div className={'text-description'}>
                        I am Massimiliano and I am a photography and travel enthusiast.<br/>
                        I began to develop my interest in photography at the age of 17, when my passion for travel led
                        me to explore magical places, worthy of being immortalized in one shot.<br/>
                        For me Photography means stopping a moment, to make it become a memory capable of blocking time.
                        An instant that, instead of flying away, can be seen again and again.<br/>
                        A single click able to stop fleeting time forever.<br/>
                        Time, this indefinable element, which, over the years, I have learned to trap not only through
                        photography but also through the creation of videos.
                        Moving images that, this time, represent its flow, within different places and in different
                        cultures.<br/>
                        A universally valid time but which seems to flow in a discordant way looking at the most
                        disparate cultural contexts, social situations and landscapes.<br/>
                        Each memory is in a frame<br/>
                        In one second, 24 frames.<br/>
                        In a video about ten thousand memories.<br/>

                        Here they are, these are most of my "frames".
                        <br/>

                        <div className={'separator'}></div>

                        Mi chiamo Massimiliano e sono un appassionato di fotografia e viaggi.<br/>
                        Ho iniziato a coltivare l’interesse per la fotografia all'età di 17 anni, quando la mia passione
                        per i viaggi mi ha portato ad esplorare luoghi magici, meritevoli di essere immortalati in uno
                        scatto.<br/>
                        Per me Fotografia significa fermare un istante, per farlo diventare un ricordo in grado di
                        bloccare il tempo. Un istante che invece di volare via si può vedere e rivedere.<br/>
                        Un singolo click in grado di fermare per sempre il tempo labile.<br/>
                        Tempo, questo elemento indefinibile, che negli anni ho imparato ad intrappolare non solo tramite
                        la fotografia ma anche tramite la creazione di video.
                        Immagini in movimento che questa volta rappresentano il suo scorrere, all’interno di diversi
                        luoghi e nelle diverse culture.<br/>
                        Un tempo universalmente valido ma che sembra scorrere in modo discorde guardando i contesti
                        culturali, le situazioni sociali e i paesaggi più disparati.<br/>
                        Ogni ricordo si trova in un frame<br/>
                        In un secondo 24 frames.<br/>
                        In un video decine di migliaia di ricordi.<br/>

                        Ecco, questi sono gran parte dei miei “frames”.
                    </div>
                    <div className={'image-description'}>
                        <img src={`/imagePersonalWebsite/Profile/profilo.jpg`} alt={'profile-image'}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

