import './img/footer-imgs.js'

class FormHandler{
    constructor(formId){
        this.feedback = document.querySelector("#" + formId);
        this.cssNames = {
            form: 'form',
            email: "form__email",
            name: "form__name",
            submit: "form__send"
        }
        this.setHandlers();
    }
    // ----- handlers методы -----
    setHandlers(){
        const form = this.feedback.querySelector('.' + this.cssNames.form);

        const checkFieldHandler = this.checkFieldHandler.bind(this);
        const sendFormHandler = this.sendFormHandler.bind(this);

        form.addEventListener('submit', checkFieldHandler);
        form.addEventListener('submit', sendFormHandler);
    }
    /**
     * Проверка полей формы
     * @param {Event} ev объект события
     */
    checkFieldHandler(ev){
        
        const isOk = true;
        // ev.preventDefault();

        const mailField = this.feedback.querySelector('.' + this.cssNames.email);
        const nameField = this.feedback.querySelector('.' + this.cssNames.name);

        const mail = mailField.value;
        const name = nameField.value;
        console.log('checkFieldHandler: Проверка данных формы');
        console.log('checkFieldHandler: name = ', name);
        console.log('checkFieldHandler: mail = ', mail);

        if(!isOk){
            ev.preventDefault();
            // код для показа пользователю предупреждения
        }
    }
    /**
     * Обработчик отпраки формы
     * @param {Event} ev объект события
     */
    sendFormHandler(ev){
        ev.preventDefault();
        let target = ev.target;
        // код для самостоятельной отправки данных формы
        // требует принимающего кода на сервере
        // нужен обработчик ответа серверного скрипта

        console.log('sendFormHandler: Код для отправки формы без перезагрузки страницы');
    }
    
}


const formHandler = new FormHandler('feedback');