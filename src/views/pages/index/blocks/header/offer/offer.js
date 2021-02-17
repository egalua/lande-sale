/**
 * Класс кнопки, прилипающей к верхнему краю экрана
 * при скролле страницы
 */
class stickyButton{
    constructor(buttonClass){
        this.cssNames = {
            stikyClass: 'call-button_sticky'
        };
        this.button = document.querySelector('.' + buttonClass);
        // начальное положение кнопки относительно страницы
        this.yOffset = this._getTopPositionButton();
        this.setHandlers();

    }
    // ----- handlers -----
    setHandlers(){
        const scrollHandler = this.scrollHandler.bind(this);
        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('resize', scrollHandler);
        const resizeHandler = this.resizeHandler.bind(this);
        window.addEventListener('resize', resizeHandler);
    }
    scrollHandler(e){
        // должно работать только на мобильных: vw<168
        if(this._getViewportWidth() < 768){
            const self = this;
            if(this.yOffset < window.pageYOffset){
                // прижатая к верху кнопка
                if(!this.button.classList.contains(this.cssNames.stikyClass)){
                    window.requestAnimationFrame(()=>{
                        self.button.classList.add(self.cssNames.stikyClass);
                    });
                }
            } else {
                // обычный вид кнопки
                if(this.button.classList.contains(this.cssNames.stikyClass)){
                    window.requestAnimationFrame(()=>{
                        self.button.classList.remove(self.cssNames.stikyClass);
                    });
                }
            }
        }        
    }
    resizeHandler(e){
        if(this._getViewportWidth() < 768){
            this.yOffset = this._getTopPositionButton();
        }
    }
    // ------ get methods -----
    /**
     * Возвращает текущее значение ширины viewport
     * @returns {Float} ширина viewport
     */
    _getViewportWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    /**
     * Возвращает вертикальное смещение кнопки 
     * от начала документа (т.е. yOffset)
     * @returns {Float} y смещение от начала документа
     */
    _getTopPositionButton(){
        let box = this.button.getBoundingClientRect();
        return box.top + window.pageYOffset;
    }
}

const btn = new stickyButton('call-button');