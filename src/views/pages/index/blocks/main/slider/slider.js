import './img/slider-images.js'

class Slider{
    constructor(sliderId){
        this.cssNames = {
            sliderBox: 'slider-box',
            title: 'slider-box__title',
            viewfinder: 'tape-hiding-box',
            tape: 'tape-hiding-box__tape',
            tapeItem: 'tape-hiding-box__tape-item',
            activeTapeItem: 'tape-hiding-box__tape-item_active',
            descriptionBox: 'description-box',
            descriptionList: 'list-box',
            descriptionItem: 'item-box',
            activeDescriptionItem: 'list-box__item-box_active',
            controlBox: 'slider-box__control',
            controlItem: 'slider-box__control-item',
            activeControlItem: 'slider-box__control-item_active'
        };
        this.slider = document.querySelector('#' + sliderId);
        this.viewFinder = this.slider.querySelector('.' + this.cssNames.viewfinder);
        this.tape = this.viewFinder.querySelector('.' + this.cssNames.tape);
        this.tapeItem = this.tape.querySelector('.' + this.cssNames.tapeItem);
        this.descList = this.slider.querySelector('.' + this.cssNames.descriptionList);
        this.controlBox = this.slider.querySelector('.' + this.cssNames.controlBox)
        
        this.setHandlers();
    }
    // ----- handlers -----
    /**
     * Обработчик клика по пунктам списка описаний слайдов
     * @param {Event} ev объект события
     */
    clickItemsHandler(ev){
        let target = ev.target;
        // пункт списка (блок <li>)
        target = target.closest('.' + this.cssNames.descriptionItem);

        if(target !== null){

            // определить индекс элемента в списке
            // снять класс активности с предыдущего элемента  
            // снять класс активности со слайдов
            // снять класс активности с conrol элементов
            // requestAnimationFrame: 
            // установить класс активности на текущем пункте
            // установить класс активности на слайд с определённым раннее индексом
            // установить класс активности на control элемент с определённым раннее индексом
            // сдвинуть ленту на слайд с классом активности

            const nextIdx = this.getCurrentIdx(target);
            this.clearActivity();
            
            const self = this;
            window.requestAnimationFrame(()=>{
                self.setActivity(nextIdx);
            });
        }
    }
    // ----- set methods ----- 
    /**
     * Устанавливает обработчики событий
     */
    setHandlers(){
        const clickItemsHandler = this.clickItemsHandler.bind(this);
        this.slider.addEventListener('click', clickItemsHandler);

    }
    /**
     * Устанавливает классы активности у всех необходимых элементов
     * @param {Inteder} idx индекс элементов, у которых нужно установить класс активности
     */
    setActivity(idx){
        this.descList.children[idx].classList.add(this.cssNames.activeDescriptionItem);
        this.controlBox.children[idx].classList.add(this.cssNames.activeControlItem);
        this.tape.children[idx].classList.add(this.cssNames.activeTapeItem);
    }
    // ----- get methods ----- 
    /**
     * Возвращает индекс дочернего элемента или -1 в случае неудачи
     * @param {HTMLElement} childEl дочерний элемент
     * @returns {Integer}
     */
    getCurrentIdx(childEl){
        const parent = childEl.parentNode;
        const childs = parent.children;

        for(let i = 0; i < childs.length; i++){
            if(childs[i] == childEl){
                return i;
            }
        }
        return -1;

    }

    // ----- clear metods -----
    /**
     * Удаляет классы активности у всех необходимых элементов
     */
    clearActivity(){
        this.clearChildClass(this.descList, this.cssNames.activeDescriptionItem);
        this.clearChildClass(this.controlBox, this.cssNames.activeControlItem);
        this.clearChildClass(this.tape, this.cssNames.activeTapeItem);
    }
    /**
     * Удаляет класс className у всех дочерних элементов parent
     * @param {HTMLElement} parent родительский элемент
     * @param {String} className удаляемый класс
     */
    clearChildClass(parent, className){
        const childs = parent.children;
        for(let i = 0; i < childs.length; i++){
            childs[i].classList.remove(className);
        }
    }
    // ----- move methods ----- 

}

const infoSlider = new Slider('slider');

