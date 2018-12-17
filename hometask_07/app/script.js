window.onload = function () {
    // Определние каждого поля ввода
    var urname = document.getElementById('urname');
    var db = document.getElementById('db');
    var phone = document.getElementById('phone');
    var email = document.getElementById('email');
    var city = document.getElementById('city');
    var messages = document.getElementById('messages');
    var cancel = document.getElementById('cancel');
    var formContainer = document.getElementById('formContainer');

    // И регулярного выражения к нему
    var urnameRE = /^[а-яё]{2,}$/i;
    var dbRE = /^\d{2}\.\d{2}\.\d{4}$/;
    var phoneRE = /^\+7\d{10}$/;
    var emailRE = /^([a-z0-9]+(\.[a-z0-9]+)?)+@[a-z0-9]+\.[a-z]+$/i;
    var cityRE = /^[а-яё]+([\- ]?[а-яё]+)+$/i;
    var messagesRE = /[а-яё]+/i;

    // Функция проверки значения полей ввода на соответсвие РВ
    var checkThese = function (field, RE){
        if (RE.test(field.value)===false){
            field.classList.add('falseField');

            var ul = document.getElementById('errorFieldsList');
            var li = document.createElement('li');
            li.textContent = field.title;
            ul.appendChild(li);


        }
        else{
            if(field.classList.contains('falseField')) field.classList.remove('falseField');
        }
    };

    // Функция при отправке формы
    formContainer.onsubmit = function(){
        var ul = document.getElementById('errorFieldsList');
        ul.innerHTML = '';

        checkThese(urname,urnameRE);
        checkThese(db,dbRE);
        checkThese(phone,phoneRE);
        checkThese(email,emailRE);
        checkThese(city,cityRE);
        checkThese(messages,messagesRE);

        if(ul.innerHTML){
            $('.falseField').effect('bounce', 300);
            $('#errorDialog').dialog('open');
            return false;
        }
    };

    // Функция при сбросе
    cancel.addEventListener('click', function(){
        urname.classList.remove('falseField');
        db.classList.remove('falseField');
        phone.classList.remove('falseField');
        email.classList.remove('falseField');
        city.classList.remove('falseField');
        messages.classList.remove('falseField');
    });
    // JQUI для полей автозаполнения и выбора даты
    // День Рождения (Дата)
    $('#db').datepicker({
        firstDay : 1,
        dateFormat : 'dd.mm.yy',
        monthNames : ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябь','Декабрь'],
        dayNamesMin : ['Вс','Пн','Вт','Ср','Чт','Пт','Сб']
    });
    //Выбор города (Автозаполнение)
    $.ajax({
        url : 'jsons/ajax.json',
        dataType : 'json',
        success : function (cities) {
            $('#city').autocomplete({
                minLength: 3,
                source : cities
            });
        }
    });

    //Ошибка при отправке формы: Диалоговое окно.
    $('#errorDialog').dialog({
        autoOpen : false,
        modal : true,
        width : 800
    });
};
