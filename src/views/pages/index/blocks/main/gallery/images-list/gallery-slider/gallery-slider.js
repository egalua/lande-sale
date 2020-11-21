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

            this.tape = this.cloneBox.querySelector(".img-contents__thumbs");

            console.log("createGallery: this.tape = ", this.tape);
            
            // для тестов: присваиваем первой preview картинке в ленте active
            
            this.tape.querySelectorAll('.img-contents__thumb')[0].classList.add('img-contents__thumb_active');

            // для тестов: заглушка - обработчик кновки close

            this.closeBtn.addEventListener('click', function(ev){
                self.cloneBox.style.display='';
                document.body.style.overflow="";
            })


    }
            
        this.cloneBox.style.display="block";
            console.log("createGallery: this.cloneBox is creat = ", this.cloneBox);
            

        // не хватает кнопки close и кнопок next / prev    
        
        // стили настроим из css отдельно для клонированного блока

    }
}

let gallery = new gallerySlider('img-contents');

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