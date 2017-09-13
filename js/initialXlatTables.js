var initialXlatTables = {
	'en': {
		'TURKCE': 'Turkish (Türkçe)',
		'ENGLISH': 'English (İngilizce)',
		'LOGIN_TITLE' : 'Please Enter Your Information',
		'USER_NAME' : 'Username',
		'USER_PASSWORD' : 'Password',
		'REMEMBER_ME' : 'Remember Me',
		'LOGIN' : 'Login',
		'FORGOT' : 'I forgot my password',
		'REGISTER' : 'I want to register',

		'RET_PASS' : 'Retrieve Password',
		'ENT_EMAIL' : 'Enter your email and to receive instructions',
		'E_MAIL' : 'EMail',
		'SEND' : 'Send Me',
		'LOGIN_RET' : 'Back to login',

		'USER_REG' : 'New User Registration',
		'ENTER_DET' : 'Enter Your Details To Begin:',
		'RE_PASS' : 'Repeat Password',
		'ACCEPT' : 'I Accept The User Agreement',
		'RESET' : 'Reset',
		'REG_BTN' : 'Register',
		///////////////////////////////////////
		'FIRST_NAME_MINLENGTH': 'First name must have at least {{len}} characters.',
		'FIRST_NAME_MAXLENGTH': 'First name must have at most {{len}} characters.',
		'AGE_MAX': 'Age cannot be higher than {{years}}.',
		'INCORRECT_FIELDS': function(parameters) {
			if(parameters.n == 1) return 'INCORRECT_FIELDS_SINGULAR';
			else return 'INCORRECT_FIELDS_PLURAL';
		},
		'INCORRECT_FIELDS_PLURAL': '{{n}} input fields were incorrect.'
	},
	'tr': {
		'TURKCE': 'Turkish (Türkçe)',
		'ENGLISH': 'English (İngilizce)',
		'LOGIN_TITLE' : 'Lütfen Bilgilerinizi Giriniz',
		'USER_NAME' : 'Kullanıcı Adı',
		'USER_PASSWORD' : 'Şifre',
		'REMEMBER_ME' : 'Beni Hatırla',
		'LOGIN' : 'Giriş',
		'FORGOT' : 'Şifremi Unuttum',
		'REGISTER' : 'Kayıt Ol',

		'RET_PASS' : 'Parola Al',
		'ENT_EMAIL' : 'Talimatları Almak İçin E-postanızı Girin',
		'E_MAIL' : 'E-Posta',
		'SEND' : 'Gönder',
		'LOGIN_RET' : 'Girişe Geri Dön',

		'USER_REG' : 'Yeni Kullanıcı Kaydı',
		'ENTER_DET' : 'Başlamak İçin Bilgilerinizi Girin:',
		'RE_PASS' : 'Şifreyi Tekrar Girin',
		'ACCEPT' : 'Kullanıcı Sözleşmesini Kabul Ediyorum',
		'RESET' : 'Sıfırla',
		'REG_BTN' : 'Kayıt',
		///////////////////////////////////////
		'FIRST_NAME_MINLENGTH': 'First name must have at least {{len}} characters.',
		'FIRST_NAME_MAXLENGTH': 'First name must have at most {{len}} characters.',
		'AGE_MAX': 'Age cannot be higher than {{years}}.',
		'INCORRECT_FIELDS': function(parameters) {
			if(parameters.n == 1) return 'INCORRECT_FIELDS_SINGULAR';
			else return 'INCORRECT_FIELDS_PLURAL';
		},
		'INCORRECT_FIELDS_PLURAL': '{{n}} input fields were incorrect.'
	}
};
