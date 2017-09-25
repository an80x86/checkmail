var initialXlatTables = {
	'en': {
		'TURKCE': 'Turkish (Türkçe)',
		'ENGLISH': 'English (İngilizce)',

		'TITLE_TAG': 'checkmail.co',
		'CONTENT_TAG': 'User login page',
		'COMPANY_TAG': 'CheckMail.Co Admin',
		'VERSION_TAG': 'v1.0',
		'COPYRIGHT_TAG': 'CheckMail, Inc. 2017',

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

		'WELCOME': 'Welcome',
		'LOGOUT': 'Logout',
		'TASK_DETAILS': 'See tasks with details',
		'TASK_TITLE': 'Tasks',
		'NOTIFICATION_TITLE': 'Notifications',
		'NOTIFICATION_DETAILS': 'See all notifications',
		'MESSAGE_TITLE': 'Messages',
		'MESSAGE_DETAILS': 'See all messages',
		'DASHBOARD': 'Dashboard',
		'LOGIN_ERROR': 'User or password is incorrect!',
		'CHECKBYONE_TITLE' : 'Email Verification One by One',
		'EMAIL_TITLE1': 'Check E-mail Address',
		'EMAIL_ENTER': 'Enter Email Address',
		'EMAIL_OK': 'Mail address verified.',
		'EMAIL_ERR': 'Mail address not verified!',
		'COUNTER': 'Remaining Credit',
		'PASS_C': 'Change Password',
		'OK_C': 'Okay',
		'PASS_CH': 'Changed.',

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

		'TITLE_TAG': 'checkmail.co',
		'CONTENT_TAG': 'Kullanıcı Bilgileri',
		'COMPANY_TAG': 'CheckMail.Co Yönetim Paneli',
		'VERSION_TAG': 'v1.0',
		'COPYRIGHT_TAG': 'CheckMail, Inc. 2017',

		'LOGIN_TITLE' : 'Lütfen Bilgilerinizi Giriniz',
		'USER_NAME' : 'Kullanıcı Adı',
		'USER_PASSWORD' : 'Şifre',
		'REMEMBER_ME' : 'Beni Hatırla',
		'LOGIN' : 'Giriş',
		'FORGOT' : 'Şifremi Unuttum',
		'REGISTER' : 'Kayıt Ol',

		'WELCOME': 'Merhaba',
		'LOGOUT': 'Çıkış',
		'TASK_DETAILS': 'Görev Detaylarına Bak',
		'TASK_TITLE': 'Görevler',
		'NOTIFICATION_TITLE': 'Bildirimler',
		'NOTIFICATION_DETAILS': 'Bildirim Detaylarına Bak',
		'MESSAGE_TITLE': 'Mesajlar',
		'MESSAGE_DETAILS': 'Mesaj Detaylarına Bak',
		'DASHBOARD':'Gösterge Paneli',
		'LOGIN_ERROR': 'Kullanıcı veya şifre hatalı!',
		'CHECKBYONE_TITLE' : 'Tek Tek E-Posta Doğrulama',
		'EMAIL_TITLE1': 'Adresi Doğrula',
		'EMAIL_ENTER': 'E-Posta Adresi Gir',
		'EMAIL_OK': 'Mail adresi doğrulanmıştır.',
		'EMAIL_ERR': 'Mail adresi doğrulanamamıştır!',
		'COUNTER': 'Kalan Kontör',
		'PASS_C': 'Şifre Değiştir',
		'OK_C': 'Tamam',
		'PASS_CH': 'Değiştirildi.',

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
