define([
    'backbone',
    'syphon',
    'tmpl/register',
    'models/user',
    'views/abstract'
], function(
    Backbone,
    Syphon,
    tmpl,
    User,
    Abstract
){

    var View = Abstract.extend({

        el: '#register',
        template: tmpl,
        model: User,

        events: {
            'submit #reg-form' : 'register',
            'input #username_input' : 'username_oninput',
            'input #password_input' : 'password_oninput',
            'input #password_repeat' : 'password_oninput'
        },

        initialize: function () {},

        register: function() {
            var userData = Syphon.serialize(this);
            this.model.register(userData);
            return false;
        },
	
	username_oninput: function () {
        var input = document.getElementById('username_input');

        if (input.value.length < 3) {
            input.setCustomValidity('Имя пользователя слишком короткое');
        } else if (input.value.length >= 30) {
            input.setCustomValidity('Имя пользователя слишком длинное');
        } else {
            var regx = new RegExp("^[A-Za-z0-9_.]{3,30}$");
            if (!regx.test(input.value)) {
                input.setCustomValidity('Разрешены латинские буквы, цифры, точка и подчеркивание');
            } else {
                input.setCustomValidity('');
            }
        }

    },
	password_oninput: function() {

		if (document.getElementById('password_input').value !=
			document.getElementById('password_repeat').value) {
			document.getElementById('password_repeat')
			.setCustomValidity('Пароли должны совпадать');
		} else {
			document.getElementById('password_repeat').setCustomValidity('');
		}
	}
    });

    return new View();
});
