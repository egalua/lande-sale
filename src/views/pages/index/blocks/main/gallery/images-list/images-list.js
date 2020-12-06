import './img/gallery-images.js'
import PopupGallery from './gallery-slider/gallery-slider.js'


// const gallery = new PopupGallery('images-box');
// gallery.openPopupGallery(0);

class Gallery{
    constructor(className = 'gallery'){
        this.cssNames = {
            // секция галереи: картинки + описание
            gallery: 'gallery',
            // контейнер галереи: картинки и всё, что нужно для popupGallery
            popupGalleryBox: 'images-box',
            // лента с preview картинками
            tape: 'img-contents__imgs-tape',
            // элемент ленты
            tapeItem: 'img-contents__imgs-tape-item',
            // viewfinder для ленты с preview картинками
            viewfinder: 'img-contents__imgs-tape-hidden-box'
        };
        this.cssNames.gallery = className;
        // секция галерея: картинки + описание
        this.gallery = document.querySelector('.' + className);
        // всплывающая галерея
        this.popupGallery = new PopupGallery(this.cssNames.popupGalleryBox);

        // установка обработчиков событий галереи
        this.setHandlers();
    }
    // ----- Handlers -----
    setHandlers(){
        // отменя стандартной реакции при клике по ссылкам
        this.gallery.addEventListener('click', (e)=>{
            e.preventDefault();
        });

        // клик по preview картинке
        const smallImgClickHandler = this.smallImgClickHandler.bind(this);
        this.gallery.addEventListener('click', smallImgClickHandler);
    }
    smallImgClickHandler(event){
        let target = event.target;
        target = target.closest('.' + this.cssNames.tapeItem);

        if(target !== null){
            const itemIdx = this.getTapeItemIdx(target);
            if(itemIdx != -1)
                this.popupGallery.openPopupGallery(itemIdx);
        }
    }
    // ----- get methods -----
    /**
     * Возвращает индекс элемента ленты preview картинок
     * @param {HTMLElement} item элемент ленты
     * @returns {Integer} индекс элемента item ленты preview картинок или -1, если ничего не нашел
     */
    getTapeItemIdx(item){
        const tape = item.parentNode;
        const items = tape.querySelectorAll('.' + this.cssNames.tapeItem);

        for(let i = 0; i < items.length; i++){
            if(items[i] == item) return i;
        }
        return -1;

    }
}

const gallery = new Gallery('gallery');