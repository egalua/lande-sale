class Gallery{
    constructor(className){
        // имена классов основных элементов галереи
        this.cssNames = { 
            // img-contents
            // контейнер с большой картинкой и лентой preview
            commonImgsBox: 'img-contents',
            // Контейнер с кнопками управления и большой картинкой 
            LargeImgsBox: 'img-contents__control-box',
            // левая кнопка рядом с большой картинкой
            LargeImgToLeft: 'img-contents__to-left',
            // правая кнопка рядом с большой картинкой
            LargeImgToRight: 'img-contents__to-right',
            // img-contents__closeBtn
            PopupCloseBtn: 'img-contents__closeBtn',

            // контейнер для ленты preview картинок и кнопок управления
            TapeWrapper: 'img-contents__imgs-tape-wrapper',
            // левая кнопка ленты с preview картинками
            TapeToLeft: 'img-contents__tape-to-left',
            // правая кнопка ленты с preview картинками
            TapeToRight: 'img-contents__tape-to-right',
            
            // лента preview картинок
            ImgsTape: 'img-contents__imgs-tape',
            // элемент ленты preview картинок
            ImgsTapeItem: 'img-contents__imgs-tape-item',
            // активный элемент ленты preview картинок
            ImgsTapeItemActive: 'img-contents__imgs-tape-item_active',
            // ссылка на large вариант preview картинки
            LargeImgLink: 'img-contents__large-img-link',
            // маленькая картинка (preview картинка)
            SmallImg: 'img-contents__small-img',
            // контейнер для "всплывающей" галереи
            GalleryBoxClone: 'galleryBoxClone-js'
        };

        // основной контейнер галереи (css класс images-box)
        this.gallery = document.querySelector('.' + className);
        
        // общий контейнер для большой картинки, кнопок управления и ленты preview картинок
        this.originalCommonImgsBox = this.gallery.querySelector('.' + this.cssNames.commonImgsBox);
        
        this.initPopupGallery();
        this.openPopupGallery(1);
    }
    /**
     * Инициализация всплывающей галереи
    */
    initPopupGallery(){
        let cloneBox = document.createElement('div');
        
        cloneBox.classList.add(this.cssNames.GalleryBoxClone);
        
        document.body.appendChild(cloneBox);
        cloneBox.appendChild(this.originalCommonImgsBox.cloneNode(true));

        this.popupGallery = cloneBox;
    }
    openPopupGallery(itemNum){
        this.popupGallery.style.display = "block";
        // не забыть выключить при выходе
        document.body.style.overflow="hidden";
    }
}

const gallery = new Gallery('images-box');

/*

const imgBox = document.querySelector('.images-box');

imgBox.addEventListener('click', function imgBoxHandler(ev){
    ev.preventDefault();
    console.log('click object = ', ev.target);
});


class gallerySlider{
    constructor(galleryClassName){
        this.originalBox = document.querySelector('.'+galleryClassName);
        this.createGallery();    
        console.log('constructor gallerySlider');
    }
    createGallery(){
        let self = this;
        this.cloneBox = document.querySelector('.galleryBoxClone-js');

        document.body.style.overflow="hidden";

        if(this.cloneBox === null){
            
            this.cloneBox = document.createElement('div'); // новый контейнер для клона галереи
            this.cloneBox.classList.add("galleryBoxClone-js"); 
            this.cloneBox.appendChild(this.originalBox.cloneNode(true)); // полная копия галереи
            document.body.appendChild(this.cloneBox);
            
            // левая кнопка: .galleryBoxClone-js > .img-contents > .img-contents__large-img-box > img-contents__to-left
            this.leftBtn = this.cloneBox.querySelector(".img-contents__to-left");
            
            console.log("createGallery: this.leftBtn = ", this.leftBtn);

            // правая кнопка: .galleryBoxClone-js > .img-contents > .img-contents__large-img-box > img-contents__to-right
            this.rightBtn = this.cloneBox.querySelector(".img-contents__to-right");

            console.log("createGallery: this.rightBtn = ", this.rightBtn);
            
            // кнопка "закрыть" .galleryBoxClone-js > .img-contents > .img-contents__large-img-box > .img-contents__closeBtn
            this.closeBtn = this.cloneBox.querySelector(".img-contents__closeBtn");

            console.log("createGallery: this.closeBtn = ", this.closeBtn);

            // лента (блок <ul>) - будем двигать с помощью css translateX()

            this.tape = this.cloneBox.querySelector(".img-contents__imgs-tape");

            console.log("createGallery: this.tape = ", this.tape);
            
            // для тестов: присваиваем первой preview картинке в ленте active
            
            this.tape.querySelectorAll('.img-contents__imgs-tape-item')[0].classList.add('img-contents__imgs-tape-item_active');

            // для тестов: заглушка - обработчик кновки close

            this.closeBtn.addEventListener('click', function(ev){
                self.cloneBox.style.display='';
                document.body.style.overflow="";
            })


    }
            
        this.cloneBox.style.display="block";
            console.log("createGallery: this.cloneBox is creat = ", this.cloneBox);
            

    }
}

let gallery = new gallerySlider('img-contents');

*/


// что должен уметь объект gallerySlider?
// при клике на preview картинку 
// создавать на базе html блока со списком картинок (блок установленного формата)
// растянутый на весь экран всплывающий блок с функционалом просмотра фото галереи 
// все preview картинки собораются в ленту
// лента отображается внизу блока
// над лентой окно для показа увеличенного варианта изображения
// при клике на фото из ленты - оно открывается в окне для показа увеличенного варианта изображения
// есть кнопки управления: при клике на кнопку со стрелкой влево - лента едет влево
// при клике на кнопку со стрелкой вправо - лента едет вправо
// шаг прокрутки можно менять
// при клике на кнопку close блок галереи исчезает (dispkay:none)
// при повторном клике на preview картинку использовать уже созданный блок (display:block)
//
// при клике по возможным кнопкам перемотки на исходном блоке перемещать ленту с preview картинками
// 

// какие свойства должны быть у него?
// ссылки на основные html компоненты (окно показа, preview, лента, кнопка закрыть, влево, вправо, )
// разные обработчики событий
// метод создания "всплывающего" блока
// методы должны поддерживать анимацию и её отсутствие