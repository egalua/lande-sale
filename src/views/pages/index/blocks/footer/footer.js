import './img/footer-imgs.js'

class FormHandler{
    constructor(formId){
        this.feedback = document.querySelector("#" + formId);
        this.cssNames = {
            form: 'form',
            email: "form__email",
            name: "form__name",
            submit: "form__send",
            fields: "form__field",
            errorField: "form__field_error",
            reporte: 'form-block__send-message',
            reporteText: 'form-block__send-message-content',
            activeReport: 'form-block__send-message_active',
            closeReport: 'form-block__send-message-close'
        }
        this.setHandlers();
        this.action = 'http://landing2/send.php';
    }
    // ----- handlers методы -----
    setHandlers(){
        const form = this.feedback.querySelector('.' + this.cssNames.form);
        
        const sendFormHandler = this.sendFormHandler.bind(this);
        const resetErrorHandler = this.resetErrorHandler.bind(this);
        const closeSendReportHandler = this.closeSendReportHandler.bind(this);

        // form.addEventListener('submit', checkFieldHandler);
        form.addEventListener('submit', sendFormHandler);
        form.addEventListener('input', resetErrorHandler);
        this.feedback.addEventListener('click', closeSendReportHandler);
    }
    /**
     * Проверка полей формы
     * @returns массив полей с ошибками или пустой масссив, если ошибок нет
     */
    getFormDataErrors(){
        // массив с именами полей (name), в которых есть ошибки ввода
        const errArr = [];
        // поля формы
        const mailField = this.feedback.querySelector('.' + this.cssNames.email);
        const nameField = this.feedback.querySelector('.' + this.cssNames.name);
        // введённое значение
        const mail = mailField.value;
        const name = nameField.value;

        // регулярное выражение для теста email
        const mailRegExp = /\S+@\S+\.\S+/;

        if(name == ''){
            errArr.push(nameField.name);
        }
        if(!mailRegExp.test(mail)){
            errArr.push(mailField.name);
        }

        return errArr;
    }
    /**
     * Сброс подсветки полей ввода с ошибками
     * @param {Event} event объект события
     */
    resetErrorHandler(event){
        let target = event.target;
        target = target.closest('.' + this.cssNames.errorField);

        if(target !== null){
            target.classList.remove(this.cssNames.errorField);
        }
    }
    /**
     * Обработчик отпраки формы
     * @param {Event} ev объект события
     */
    sendFormHandler(ev){
        ev.preventDefault();
        let target = ev.target;
        const self = this;

        // имена полей с ошибками ввода
        const errorFields = this.getFormDataErrors();
        // форма
        const form = this.feedback.querySelector('.' + this.cssNames.form);

        if(errorFields.length == 0){

            // поля формы и кнопка
            const nameField = form.querySelector('.' + this.cssNames.name);
            const emailField = form.querySelector('.' + this.cssNames.email);
            const submitButton = form.querySelector('.' + this.cssNames.submit);

            // объект для AJAX запросов
            let request = new XMLHttpRequest();
            // окно с сообщением об отправке
            const openSendReport = this.openSendReport.bind(this);

            // обработчик результата отправки формы
            function readyStateChange(){
                // из 5 состояний ловим только 3: "вызван метод send", "идет загрузка", "операция завершена"
                if(request.status >= 200 && request.status < 400){
                    // код выполняется при успешной отправке данных на сервер

                    // если операция ещё не завершена
                    if(request.readyState != 4) return;

                    // ответ сервера в формате json
                    console.log('sendFormHandler: request.response = ', request.response);
                    // ответ сервера в виде js объекта (формирование ответа см. серверная часть)
                    const json = request.response;
                    
                    // действия в случае успеха и неудачи
                    if(json.result == "success"){
                        // окно с отчетом об отпркавке
                        const okReport = "<p>Ваша заявка отправлена.</p><p>Мы свяжемся с Вами в ближайшее время.</p>";
                        console.log('sendFormHandler: сообщение отправлено, request.status = ', request.status);
                        openSendReport(okReport);
                        // чистим поля формы 
                        nameField.value = '';
                        emailField.value = '';
                    } else { // если произошла ошибка
                        const errorReport = "<p>К сожалению, произошла ошибка при отправке формы.</p><p>Пожалуйста, свяжитесь с нами по телефону <a href='tel:88001111111'>8 800 1111111</a></p>";
                        console.log('sendFormHandler: произошла ошибка request.response = ', request.response, '; request.status = ', request.status);
                        openSendReport(errorReport);
                        
                    }
                } else { // Если не удалось связаться с php файлом
                    const errorMessage = "<p>К сожалению где-то на сервере произошла ошибка.</p><p>Пожалуйста, позвоните нам по телефону <a href='tel:88001111111'>8 800 1111111</a> и мы всё исправим.</p>";
                    console.log('sendFormHandler: Не удалось связаться с php файлом request.status = ', request.status);
                    openSendReport(errorMessage);
                    
                }
            }
            // тело сообщения
            const body =    nameField.name      + '=' + nameField.value + '&' + 
                            emailField.name     + '=' + emailField.value + '&' + 
                            submitButton.name   + '=' + submitButton.value;

            // Обработчик неудачной отправки запроса (Если не удалось отправить запрос. Стоит блок на хостинге)
            request.onerror = function(){
                const errorMessage = "<p>К сожалению где-то на сервере произошла ошибка.</p><p>Пожалуйста, позвоните нам по телефону <a href='tel:88001111111'>8 800 1111111</a> и мы всё исправим.</p>";
                console.log('sendFormHandler: Не удалось отправить запрос. Стоит блок на хостинге ');
                openSendReport(errorMessage);
                
            };
            request.responseType = "json";
            request.open("POST", this.action);
            request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            request.onreadystatechange = readyStateChange;
            // отправить запрос
            request.send(body);
        } else {
            // код для подсветки поля с ошибкой

            for(let i in errorFields){
                // поле ввода с ошибкой
                const errFielr = form.querySelector('.'+this.cssNames.fields+'[name='+errorFields[i]+']');
                
                if(!errFielr.classList.contains(this.cssNames.errorField)){
                    errFielr.classList.add(this.cssNames.errorField);
                }
            }
            
        }
    }
    /**
     * Открывает отчет об отправке сообщения
     * @param {String} report отчет о доставке
    */
    openSendReport(report){
        const sendReportBox = this.feedback.querySelector('.' + this.cssNames.reporte);
        const contentBox = sendReportBox.querySelector('.' + this.cssNames.reporteText);
        if( !sendReportBox.classList.contains(this.cssNames.activeReport) ){
            sendReportBox.classList.add(this.cssNames.activeReport);
            contentBox.innerHTML = report;
        }
    }
    /**
     * Закрывает отчет об отправке сообщения
     * @param {Event} ev объект событие
     */
    closeSendReportHandler(ev){
        let target = ev.target;
        target = target.closest(this.cssNames.closeReport);

        const sendReportBox = this.feedback.querySelector('.' + this.cssNames.reporte);

        if(target !== null){
            sendReportBox.classList.remove(this.cssNames.activeReport);
        } else {
            sendReportBox.classList.remove(this.cssNames.activeReport);
        }
        
        
    }
    // this.showSendReport();
}


const formHandler = new FormHandler('feedback');