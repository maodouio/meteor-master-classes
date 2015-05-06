(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Tracker = Package.tracker.Tracker;
var Deps = Package.tracker.Deps;

/* Package-scope variables */
var T9n, __coffeescriptShare;

(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n.coffee.js                                                                    //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
        

Meteor.startup(function() {
  if (Meteor.isClient) {
    return UI.registerHelper('t9n', function(x, params) {
      return T9n.get(x, true, params.hash);
    });
  }
});

T9n = (function() {
  function T9n() {}

  T9n.maps = {};

  T9n.defaultLanguage = 'en';

  T9n.language = '';

  T9n.dep = new Deps.Dependency();

  T9n.depLanguage = new Deps.Dependency();

  T9n.missingPrefix = ">";

  T9n.missingPostfix = "<";

  T9n.map = function(language, map) {
    if (!this.maps[language]) {
      this.maps[language] = {};
    }
    this.registerMap(language, '', false, map);
    return this.dep.changed();
  };

  T9n.get = function(label, markIfMissing, args) {
    var ret, _ref, _ref1;
    if (markIfMissing == null) {
      markIfMissing = true;
    }
    if (args == null) {
      args = {};
    }
    this.dep.depend();
    this.depLanguage.depend();
    if (typeof label !== 'string') {
      return '';
    }
    ret = ((_ref = this.maps[this.language]) != null ? _ref[label] : void 0) || ((_ref1 = this.maps[this.defaultLanguage]) != null ? _ref1[label] : void 0) || (markIfMissing ? this.missingPrefix + label + this.missingPostfix : label);
    if (Object.keys(args).length === 0) {
      return ret;
    } else {
      return this.replaceParams(ret, args);
    }
  };

  T9n.registerMap = function(language, prefix, dot, map) {
    var key, value, _results;
    if (typeof map === 'string') {
      return this.maps[language][prefix] = map;
    } else if (typeof map === 'object') {
      if (dot) {
        prefix = prefix + '.';
      }
      _results = [];
      for (key in map) {
        value = map[key];
        _results.push(this.registerMap(language, prefix + key, true, value));
      }
      return _results;
    }
  };

  T9n.getLanguage = function() {
    this.depLanguage.depend();
    return this.language;
  };

  T9n.getLanguages = function() {
    this.dep.depend();
    return Object.keys(this.maps).sort();
  };

  T9n.setLanguage = function(language) {
    if (!this.maps[language] || this.language === language) {
      return;
    }
    this.language = language;
    return this.depLanguage.changed();
  };

  T9n.replaceParams = function(str, args) {
    var key, re, value;
    for (key in args) {
      value = args[key];
      re = new RegExp("@{" + key + "}", 'g');
      str = str.replace(re, value);
    }
    return str;
  };

  return T9n;

})();

this.T9n = T9n;

this.t9n = function(x, includePrefix, params) {
  return T9n.get(x);
};
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/ar.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ar;

ar = {
  add: "اضف",
  and: "و",
  back: "رجوع",
  changePassword: "غير كلمة السر",
  choosePassword: "اختر كلمة السر",
  clickAgree: "بفتح حسابك انت توافق على",
  configure: "تعديل",
  createAccount: "افتح حساب جديد",
  currentPassword: "كلمة السر الحالية",
  dontHaveAnAccount: "ليس عندك حساب؟",
  email: "البريد الالكترونى",
  emailAddress: "البريد الالكترونى",
  emailResetLink: "اعادة تعيين البريد الالكترونى",
  forgotPassword: "نسيت كلمة السر؟",
  ifYouAlreadyHaveAnAccount: "اذا كان عندك حساب",
  newPassword: "كلمة السر الجديدة",
  newPasswordAgain: "كلمة السر الجديدة مرة اخرى",
  optional: "اختيارى",
  OR: "او",
  password: "كلمة السر",
  passwordAgain: "كلمة السر مرة اخرى",
  privacyPolicy: "سياسة الخصوصية",
  remove: "ازالة",
  resetYourPassword: "اعادة تعيين كلمة السر",
  setPassword: "تعيين كلمة السر",
  sign: "تسجيل",
  signIn: "تسجيل الدخول",
  signin: "تسجيل الدخول",
  signOut: "تسجيل الخروج",
  signUp: "افتح حساب جديد",
  signupCode: "رمز التسجيل",
  signUpWithYourEmailAddress: "سجل ببريدك الالكترونى",
  terms: "شروط الاستخدام",
  updateYourPassword: "جدد كلمة السر",
  username: "اسم المستخدم",
  usernameOrEmail: "اسم المستخدم او البريد الالكترونى",
  "with": "مع",
  info: {
    emailSent: "تم ارسال البريد الالكترونى",
    emailVerified: "تم تأكيد البريد الالكترونى",
    passwordChanged: "تم تغيير كلمة السر",
    passwordReset: "تم اعادة تعيين كلمة السر"
  },
  error: {
    emailRequired: "البريد الالكترونى مطلوب",
    minChar: "سبعة حروف هو الحد الادنى لكلمة السر",
    pwdsDontMatch: "كلمتين السر لا يتطابقان",
    pwOneDigit: "كلمة السر يجب ان تحتوى على رقم واحد على الاقل",
    pwOneLetter: "كلمة السر تحتاج الى حرف اخر",
    signInRequired: "عليك بتسجبل الدخول لفعل ذلك",
    signupCodeIncorrect: "رمز التسجيل غير صحيح",
    signupCodeRequired: "رمز التسجيل مطلوب",
    usernameIsEmail: "اسم المستخدم لا يمكن ان يكون بريد الكترونى",
    usernameRequired: "اسم المستخدم مطلوب",
    accounts: {
      "Email already exists.": "البريد الالكترونى مسجل",
      "Email doesn't match the criteria.": "البريد الالكترونى لا يتوافق مع الشروط",
      "Invalid login token": "رمز الدخول غير صالح",
      "Login forbidden": "تسجيل الدخول غير مسموح",
      "Service unknown": "خدمة غير معروفة",
      "Unrecognized options for login request": "اختيارات غير معلومة عند تسجيل الدخول",
      "User validation failed": "تأكيد المستخدم فشل",
      "Username already exists.": "اسم المستخدم مسجل",
      "You are not logged in.": "لم تسجل دخولك",
      "You've been logged out by the server. Please log in again.": "لقد تم تسجيل خروجك من قبل الخادم. قم بتسجيل الدخول مجددا.",
      "Your session has expired. Please log in again.": "لقد انتهت جلستك. قم بتسجيل الدخول مجددا.",
      "No matching login attempt found": "لم نجد محاولة دخول مطابقة",
      "Password is old. Please reset your password.": "كلمة السر قديمة. قم باعادة تعيين كلمة السر.",
      "Incorrect password": "كلمة السر غير صحيحة.",
      "Invalid email": "البريد الالكترونى غير صالح",
      "Must be logged in": "يجب ان تسجل دخولك",
      "Need to set a username or email": "يجب تعيين اسم مستخدم او بريد الكترونى",
      "old password format": "صيغة كلمة السر القديمة",
      "Password may not be empty": "كلمة السر لا يمكن ان تترك فارغة",
      "Signups forbidden": "فتح الحسابات غير مسموح",
      "Token expired": "انتهى زمن الرمز",
      "Token has invalid email address": "الرمز يحتوى على بريد الكترونى غير صالح",
      "User has no password set": "المستخدم لم يقم بتعيين كلمة سر",
      "User not found": "اسم المستخدم غير موجود",
      "Verify email link expired": "انتهى زمن رابط تأكيد البريد الالكترونى",
      "Verify email link is for unknown address": "رابط تأكيد البريد الالكترونى ينتمى الى بريد الكترونى غير معروف",
      "Match failed": "المطابقة فشلت",
      "Unknown error": "خطأ غير معروف"
    }
  }
};

T9n.map("ar", ar);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/zh_cn.coffee.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var zh_cn;

zh_cn = {
  add: "添加",
  and: "和",
  back: "返回",
  changePassword: "修改密码",
  choosePassword: "新密码",
  clickAgree: "点击注册表示您同意",
  configure: "配置",
  createAccount: "创建账户",
  currentPassword: "当前密码",
  dontHaveAnAccount: "没有账户？",
  email: "电子邮箱",
  emailAddress: "电邮地址",
  emailResetLink: "邮件重置链接",
  forgotPassword: "忘记密码？",
  ifYouAlreadyHaveAnAccount: "如果您已有账户",
  newPassword: "新密码",
  newPasswordAgain: "再输一遍新密码",
  optional: "可选的",
  OR: "或",
  password: "密码",
  passwordAgain: "再输一遍密码",
  privacyPolicy: "隐私条例",
  remove: "移除",
  resetYourPassword: "重置您的密码",
  setPassword: "设置密码",
  sign: "登",
  signIn: "登录",
  signin: "登录",
  signOut: "登出",
  signUp: "注册",
  signupCode: "注册码",
  signUpWithYourEmailAddress: "用您的电子邮件地址注册",
  terms: "使用条例",
  updateYourPassword: "更新您的密码",
  username: "用户名",
  usernameOrEmail: "用户名或电子邮箱",
  "with": "与",
  info: {
    emailSent: "邮件已发出",
    emailVerified: "邮件验证成功",
    passwordChanged: "密码修改成功",
    passwordReset: "密码重置成功"
  },
  error: {
    emailRequired: "必须填写电子邮件",
    minChar: "密码至少7个字符长",
    pwdsDontMatch: "两次密码不一致",
    pwOneDigit: "密码中至少有一位数字",
    pwOneLetter: "密码中至少有一位字母",
    signInRequired: "您必须登录后才能查看",
    signupCodeIncorrect: "注册码错误",
    signupCodeRequired: "必须有注册码",
    usernameIsEmail: "是用户名而不是电子邮件地址",
    usernameRequired: "必须填写用户名。",
    accounts: {
      "Email already exists.": "该电子邮件地址已被使用。",
      "Email doesn't match the criteria.": "错误的的电子邮件地址。",
      "Invalid login token": "登录密匙错误",
      "Login forbidden": "登录被阻止",
      "Service unknown": "未知服务",
      "Unrecognized options for login request": "登录请求存在无法识别的选项",
      "User validation failed": "用户验证失败",
      "Username already exists.": "用户名已被占用。",
      "You are not logged in.": "您还没有登录。",
      "You've been logged out by the server. Please log in again.": "您被服务器登出了。请重新登录。",
      "Your session has expired. Please log in again.": "会话过期，请重新登录。",
      "No matching login attempt found": "未发现对应登录请求",
      "Password is old. Please reset your password.": "密码过于老了，请重置您的密码。",
      "Incorrect password": "错误的密码",
      "Invalid email": "不合法的电子邮件地址",
      "Must be logged in": "必须先登录",
      "Need to set a username or email": "必须设置用户名或电子邮件地址",
      "old password format": "较老的密码格式",
      "Password may not be empty": "密码不应该为空",
      "Signups forbidden": "注册被禁止",
      "Token expired": "密匙过期",
      "Token has invalid email address": "密匙对应的电子邮箱地址不合法",
      "User has no password set": "用户没有密码",
      "User not found": "未找到该用户",
      "Verify email link expired": "激活验证邮件的链接已过期",
      "Verify email link is for unknown address": "验证邮件的链接去向未知地址",
      "Match failed": "匹配失败",
      "Unknown error": "未知错误"
    }
  }
};

T9n.map("zh-cn", zh_cn);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/ca.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ca;

ca = {
  add: "afegir",
  and: "i",
  back: "enrere",
  changePassword: "Canviar contrasenya",
  choosePassword: "Escollir contrasenya",
  clickAgree: "Al fer clic a Subscriure aproves la",
  configure: "Disposició",
  createAccount: "Crear compte",
  currentPassword: "Contrasenya actual",
  dontHaveAnAccount: "No tens un compte?",
  email: "Correu",
  emailAddress: "Adreça de correu",
  emailResetLink: "Reiniciar correu",
  forgotPassword: "Has oblidat la contrasenya?",
  ifYouAlreadyHaveAnAccount: "Si ja tens un compte",
  newPassword: "Nova contrasenya",
  newPasswordAgain: "Nova contrasenya (repetir)",
  optional: "Opcional",
  OR: "O",
  password: "Contrasenya",
  passwordAgain: "Contrasenya (repetir)",
  privacyPolicy: "Política de Privacitat",
  remove: "eliminar",
  resetYourPassword: "Resetejar la teva contrasenya",
  setPassword: "Definir contrasenya",
  sign: "Signar",
  signIn: "Entrar",
  signin: "entrar",
  signOut: "Sortir",
  signUp: "Subscriure",
  signupCode: "Còdi de subscripció",
  signUpWithYourEmailAddress: "Subscriure amb el teu correu",
  terms: "Termes d'ús",
  updateYourPassword: "Actualitzar la teva contrasenya",
  username: "Usuari",
  usernameOrEmail: "Usuari o correu",
  "with": "amb",
  info: {
    emailSent: "Correu enviat",
    emailVerified: "Correu verificat",
    passwordChanged: "Contrasenya canviada",
    passwordReset: "Reiniciar contrasenya"
  },
  error: {
    emailRequired: "Es requereix el correu.",
    minChar: "7 caràcters mínim.",
    pwdsDontMatch: "Les contrasenyes no coincideixen",
    pwOneDigit: "mínim un dígit.",
    pwOneLetter: "mínim una lletra.",
    signInRequired: "Has d'iniciar sessió per a fer això.",
    signupCodeIncorrect: "El còdi de subscripció no coincideix.",
    signupCodeRequired: "Es requereix el còdi de subscripció.",
    usernameIsEmail: "L'usuari no pot ser el correu.",
    usernameRequired: "Es requereix un usuari.",
    accounts: {
      "Email already exists.": "El correu ja existeix.",
      "Email doesn't match the criteria.": "El correu no coincideix amb els criteris.",
      "User validation failed": "No s'ha pogut validar l'usuari",
      "Username already exists.": "L'usuari ja existeix.",
      "You've been logged out by the server. Please log in again.": "Has estat desconnectat pel servidor. Si us plau, entra de nou.",
      "Your session has expired. Please log in again.": "La teva sessió ha expirat. Si us plau, entra de nou.",
      "Incorrect password": "Contrasenya invàlida",
      "Must be logged in": "Has d'entrar",
      "Need to set a username or email": "Has d'especificar un usuari o un correu",
      "Signups forbidden": "Registre prohibit",
      "Token expired": "Token expirat",
      "Token has invalid email address": "Token conté un correu invàlid",
      "User has no password set": "Usuari no té contrasenya",
      "User not found": "Usuari no trobat",
      "Verify email link expired": "L'enllaç per a verificar el correu ha expirat",
      "Verify email link is for unknown address": "L'enllaç per a verificar el correu conté una adreça desconeguda"
    }
  }
};

T9n.map("ca", ca);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/cs.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var cs;

cs = {
  add: "přidat",
  and: "a",
  back: "zpět",
  changePassword: "Změnte heslo",
  choosePassword: "Zvolte heslo",
  clickAgree: "Stiskem tlačítka Registrovat souhlasíte s",
  configure: "Nastavit",
  createAccount: "Vytvořit účet",
  currentPassword: "Současné heslo",
  dontHaveAnAccount: "Nemáte účet?",
  email: "Email",
  emailAddress: "Emailová adresa",
  emailResetLink: "Odkaz na reset emailu",
  forgotPassword: "Zapomenuté heslo?",
  ifYouAlreadyHaveAnAccount: "Pokud již máte účet",
  newPassword: "Nové heslo",
  newPasswordAgain: "Nové heslo (zopakovat)",
  optional: "Volitelný",
  OR: "nebo",
  password: "Heslo",
  passwordAgain: "Heslo (zopakovat)",
  privacyPolicy: "Nastavení soukromí",
  remove: "odstranit",
  resetYourPassword: "Resetovat heslo",
  setPassword: "Nastavit heslo",
  sign: "Přihlášení",
  signIn: "Přihlásit se",
  signin: "přihlásit se",
  signOut: "Odhlásit se",
  signUp: "Registrovat",
  signupCode: "Registrační kód",
  signUpWithYourEmailAddress: "Registrovat se emailovou adresou",
  terms: "Podmínky použití",
  updateYourPassword: "Aktualizujte si své heslo",
  username: "Uživatelské jméno",
  usernameOrEmail: "Uživatelské jméno nebo email",
  "with": "s",
  info: {
    emailSent: "Email odeslán",
    emailVerified: "Email ověřen",
    passwordChanged: "Heslo změněno",
    passwordReset: "Heslo resetováno"
  },
  error: {
    emailRequired: "Email je povinný.",
    minChar: "minimální délka hesla je 7 znaků.",
    pwdsDontMatch: "Hesla nesouhlasí",
    pwOneDigit: "Heslo musí obsahovat alespoň jednu číslici.",
    pwOneLetter: "Heslo musí obsahovat alespoň 1 slovo.",
    signInRequired: "Musíte být příhlášeni.",
    signupCodeIncorrect: "Registrační kód je chybný.",
    signupCodeRequired: "Registrační kód je povinný.",
    usernameIsEmail: "Uživatelské jméno nemůže být emailová adresa.",
    usernameRequired: "Uživatelské jméno je povinné."
  },
  accounts: {
    "A login handler should return a result or undefined": "Přihlašovací rutina musí vracet výsledek nebo undefined",
    "Email already exists.": "Email již existuje.",
    "Email doesn't match the criteria.": "Email nesplňuje požadavky.",
    "Invalid login token": "Neplatný přihlašovací token",
    "Login forbidden": "Přihlášení je zakázáno",
    "Service unknown": "Neznámá služba",
    "Unrecognized options for login request": "Nerozpoznaná volba přihlašovacího požadavku",
    "User validation failed": "Validace uživatele selhala",
    "Username already exists.": "Uživatelské jméno již existuje.",
    "You are not logged in.": "Nejste přihlášený.",
    "You've been logged out by the server. Please log in again.": "Byl jste odhlášen. Prosím přihlašte se znovu.",
    "Your session has expired. Please log in again.": "Vaše připojení vypršelo. Prosím přihlašte se znovu.",
    "No matching login attempt found": "Nenalezen odpovídající způsob přihlášení",
    "Password is old. Please reset your password.": "Heslo je staré. Prosíme nastavte si ho znovu.",
    "Incorrect password": "Chybné heslo",
    "Invalid email": "Neplatný email",
    "Must be logged in": "Uživatel musí být přihlášen",
    "Need to set a username or email": "Je třeba zadat uživatelské jméno nebo email",
    "old password format": "starý formát hesla",
    "Password may not be empty": "Heslo nemůže být prázdné",
    "Signups forbidden": "Registrace je zakázaná",
    "Token expired": "Token vypršel",
    "Token has invalid email address": "Token má neplatnou emailovou adresu",
    "User has no password set": "Uživatel nemá nastavené heslo",
    "User not found": "Uživatel nenalezen",
    "Verify email link expired": "Odkaz pro ověření emailu vypršel",
    "Verify email link is for unknown address": "Odkaz pro ověření emailu má neznámou adresu",
    "Match failed": "Nesouhlasí",
    "Unknown error": "Neznámá chyba"
  }
};

T9n.map("cs", cs);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/da.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var da;

da = {
  add: "tilføj",
  and: "og",
  back: "tilbage",
  changePassword: "Skift kodeord",
  choosePassword: "Vælg kodeord",
  clickAgree: "Ved at klikke på tilmeld accepterer du vores",
  configure: "Konfigurer",
  createAccount: "Opret konto",
  currentPassword: "Nuværende kodeord",
  dontHaveAnAccount: "Har du ikke en konto?",
  email: "E-mail",
  emailAddress: "E-mail adresse",
  emailResetLink: "Nulstil E-mail Link",
  forgotPassword: "Glemt kodeord?",
  ifYouAlreadyHaveAnAccount: "Hvis jeg allerede har en konto",
  newPassword: "Nyt kodeord",
  newPasswordAgain: "Nyt kodeord (igen)",
  optional: "Frivilligt",
  OR: "eller",
  password: "Kodeord",
  passwordAgain: "Kodeord (igen)",
  privacyPolicy: "Privatlivspolitik",
  remove: "fjern",
  resetYourPassword: "Nulstil dit kodeord",
  setPassword: "Sæt kodeord",
  sign: "Log",
  signIn: "Log ind",
  signin: "Log ind",
  signOut: "Log ud",
  signUp: "Tilmeld",
  signupCode: "Tilmeldingskode",
  signUpWithYourEmailAddress: "Tilmeld med din e-mail adresse",
  terms: "Betingelser for brug",
  updateYourPassword: "Skift dit kodeord",
  username: "Brugernavn",
  usernameOrEmail: "Brugernavn eller e-mail",
  "with": "med",
  info: {
    emailSent: "E-mail sendt",
    emailVerified: "Email verificeret",
    passwordChanged: "Password ændret",
    passwordReset: "Password reset"
  },
  error: {
    emailRequired: "E-mail er påkrævet.",
    minChar: "Kodeordet skal være mindst 7 tegn.",
    pwdsDontMatch: "De to kodeord er ikke ens.",
    pwOneDigit: "Kodeord kræver mindste et tal.",
    pwOneLetter: "Kodeord kræver mindst et bogstav.",
    signInRequired: "Du skal være logget ind for at kunne gøre det.",
    signupCodeIncorrect: "Tilmeldingskode er forkert.",
    signupCodeRequired: "Tilmeldingskode er påkrævet.",
    usernameIsEmail: "Brugernavn kan ikke være en e-mail adresse.",
    usernameRequired: "Brugernavn skal udfyldes.",
    accounts: {
      "Email already exists.": "E-mail findes allerede.",
      "Email doesn't match the criteria.": "E-mail modsvarer ikke kriteriet.",
      "Invalid login token": "Invalid log ind token",
      "Login forbidden": "Log ind forbudt",
      "Service unknown": "Service ukendt",
      "Unrecognized options for login request": "Ukendte options for login forsøg",
      "User validation failed": "Bruger validering fejlede",
      "Username already exists.": "Brugernavn findes allerede.",
      "You are not logged in.": "Du er ikke logget ind.",
      "You've been logged out by the server. Please log in again.": "Du er blevet logget af serveren. Log ind igen.",
      "Your session has expired. Please log in again.": "Din session er udløbet. Log ind igen.",
      "No matching login attempt found": "Der fandtes ingen login forsøg",
      "Password is old. Please reset your password.": "Kodeordet er for gammelt. Du skal resette det.",
      "Incorrect password": "Forkert kodeord",
      "Invalid email": "Invalid e-mail",
      "Must be logged in": "Du skal være logget ind",
      "Need to set a username or email": "Du skal angive enten brugernavn eller e-mail",
      "old password format": "gammelt kodeord format",
      "Password may not be empty": "Kodeord skal være udfyldt",
      "Signups forbidden": "Tilmeldinger forbudt",
      "Token expired": "Token udløbet",
      "Token has invalid email address": "Token har en invalid e-mail adresse",
      "User has no password set": "Bruger har ikke angivet noget kodeord",
      "User not found": "Bruger ej fundet",
      "Verify email link expired": "Verify email link expired",
      "Verify email link is for unknown address": "Verificer e-mail link for ukendt adresse",
      "Match failed": "Match fejlede",
      "Unknown error": "Ukendt fejl"
    }
  }
};

T9n.map("da", da);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/de.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var de;

de = {
  add: "hinzufügen",
  and: "und",
  back: "zurück",
  changePassword: "Passwort ändern",
  choosePassword: "Passwort auswählen",
  clickAgree: "Durch die Registrierung akzeptieren Sie unsere",
  configure: "Konfigurieren",
  createAccount: "Konto erstellen",
  currentPassword: "Aktuelles Passwort",
  dontHaveAnAccount: "Noch kein Konto?",
  email: "E-Mail",
  emailAddress: "E-Mail Adresse",
  emailResetLink: "Senden",
  forgotPassword: "Passwort vergessen?",
  ifYouAlreadyHaveAnAccount: "Falls Sie ein Konto haben, bitte hier",
  newPassword: "Neues Passwort",
  newPasswordAgain: "Neues Passwort (wiederholen)",
  optional: "Optional",
  OR: "ODER",
  password: "Passwort",
  passwordAgain: "Passwort (wiederholen)",
  privacyPolicy: "Datenschutzerklärung",
  remove: "entfernen",
  resetYourPassword: "Passwort zurücksetzen",
  setPassword: "Passwort festlegen",
  sign: "Anmelden",
  signIn: "Anmelden",
  signin: "anmelden",
  signOut: "Abmelden",
  signUp: "Registrieren",
  signupCode: "Registrierungscode",
  signUpWithYourEmailAddress: "Mit E-Mail registrieren",
  terms: "Geschäftsbedingungen",
  updateYourPassword: "Passwort aktualisieren",
  username: "Benutzername",
  usernameOrEmail: "Benutzername oder E-Mail",
  "with": "mit",
  info: {
    emailSent: "E-Mail gesendet",
    emailVerified: "E-Mail verifiziert",
    PasswordChanged: "Passwort geändert",
    PasswordReset: "Passwort zurückgesetzt"
  },
  error: {
    emailRequired: "E-Mail benötigt.",
    minChar: "Passwort muss mindestens 7 Zeichen lang sein.",
    pwdsDontMatch: "Passwörter stimmen nicht überein.",
    pwOneDigit: "Passwort muss mindestens eine Ziffer enthalten.",
    pwOneLetter: "Passwort muss mindestens einen Buchstaben enthalten.",
    signInRequired: "Sie müssen sich anmelden.",
    signupCodeIncorrect: "Registrierungscode ungültig.",
    signupCodeRequired: "Registrierungscode benötigt.",
    usernameIsEmail: "Benutzername darf keine E-Mail Adresse sein.",
    usernameRequired: "Benutzername benötigt.",
    accounts: {
      "Email already exists.": "Die E-Mail Adresse wird bereits verwendet.",
      "Email doesn't match the criteria.": "E-Mail Adresse erfüllt die Anforderungen nicht.",
      "Invalid login token": "Ungültiger Login-Token",
      "Login forbidden": "Anmeldedaten ungültig",
      "Service unknown": "Dienst unbekannt",
      "Unrecognized options for login request": "Unbekannte Optionen für Login Request",
      "User validation failed": "Die Benutzerdaten sind nicht korrekt",
      "Username already exists.": "Der Benutzer existiert bereits.",
      "You are not logged in.": "Sie sind nicht eingeloggt.",
      "You've been logged out by the server. Please log in again.": "Der Server hat Dich ausgeloggt. Bitte melde Dich erneut an.",
      "Your session has expired. Please log in again.": "Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.",
      "No matching login attempt found": "Kein passender Loginversuch gefunden.",
      "Password is old. Please reset your password.": "Passwort ist abgelaufen. Bitte setzen Sie es zurück.",
      "Incorrect password": "Falsches Passwort",
      "Invalid email": "Ungültige E-Mail Adresse",
      "Must be logged in": "Sie müssen sich anmelden",
      "Need to set a username or email": "Benutzername oder E-Mail Adresse müssen angegeben werden",
      "Password may not be empty": "Das Passwort darf nicht leer sein",
      "Signups forbidden": "Anmeldungen sind nicht erlaubt",
      "Token expired": "Token ist abgelaufen",
      "Token has invalid email address": "E-Mail Adresse passt nicht zum Token",
      "User has no password set": "Kein Passwort für den Benutzer angegeben",
      "User not found": "Benutzer nicht gefunden",
      "Verify email link expired": "Link zur E-Mail Verifizierung ist abgelaufen",
      "Verify email link is for unknown address": "Link zur Verifizierung ist für eine unbekannte E-Mail Adresse",
      "Match failed": "Abgleich fehlgeschlagen",
      "Unknown error": "Unbekannter Fehler"
    }
  }
};

T9n.map("de", de);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/el.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var el;

el = {
  add: "προσθέστε",
  and: "και",
  back: "πίσω",
  changePassword: "Αλλαγή Κωδικού",
  choosePassword: "Επιλογή Κωδικού",
  clickAgree: "Πατώντας Εγγραφή, συμφωνείτε σε",
  configure: "Διαμόρφωση",
  createAccount: "Δημιουργία Λογαριασμού",
  currentPassword: "Τρέχων Κωδικός",
  dontHaveAnAccount: "Δεν έχετε λογαριασμό;",
  email: "Email",
  emailAddress: "Ηλεκτρονική Διεύθυνση",
  emailResetLink: "Αποστολή Συνδέσμου Επαναφοράς",
  forgotPassword: "Ξεχάσατε τον κωδικό;",
  ifYouAlreadyHaveAnAccount: "Αν έχετε ήδη λογαριασμό",
  newPassword: "Νέος Κωδικός",
  newPasswordAgain: "Νέος Κωδικός (ξανά)",
  optional: "Προαιρετικά",
  OR: "Ή",
  password: "Κωδικός",
  passwordAgain: "Κωδικός (ξανά)",
  privacyPolicy: "Πολιτική Απορρήτου",
  remove: "αφαιρέστε",
  resetYourPassword: "Επαναφορά κωδικού",
  setPassword: "Ορίστε Κωδικό",
  sign: "Σύνδεση",
  signIn: "Είσοδος",
  signin: "συνδεθείτε",
  signOut: "Αποσύνδεση",
  signUp: "Εγγραφή",
  signupCode: "Κώδικας Εγγραφής",
  signUpWithYourEmailAddress: "Εγγραφή με την ηλεκτρονική σας διεύθυνση",
  terms: "Όροι Χρήσης",
  updateYourPassword: "Ανανεώστε τον κωδικό σας",
  username: "Όνομα χρήστη",
  usernameOrEmail: "Όνομα χρήστη ή email",
  "with": "με",
  info: {
    emailSent: "Το Email στάλθηκε",
    emailVerified: "Το Email επιβεβαιώθηκε",
    passwordChanged: "Ο Κωδικός άλλαξε",
    passwordReset: "Ο Κωδικός επαναφέρθηκε"
  },
  error: {
    emailRequired: "Το Email απαιτείται.",
    minChar: "7 χαρακτήρες τουλάχιστον.",
    pwdsDontMatch: "Οι κωδικοί δεν ταιριάζουν",
    pwOneDigit: "Ο κωδικός πρέπει να έχει τουλάχιστον ένα ψηφίο.",
    pwOneLetter: "Ο κωδικός πρέπει να έχει τουλάχιστον ένα γράμμα.",
    signInRequired: "Πρέπει να είστε συνδεδεμένος για να πραγματοποιήσετε αυτή την ενέργεια.",
    signupCodeIncorrect: "Ο κώδικας εγγραφής δεν είναι σωστός.",
    signupCodeRequired: "Ο κώδικας εγγραφής απαιτείται.",
    usernameIsEmail: "Το όνομα χρήστη δεν μπορεί να είναι μια διεύθυνση email.",
    usernameRequired: "Το όνομα χρήστη απαιτείται.",
    accounts: {
      "Email already exists.": "Αυτό το email υπάρχει ήδη.",
      "Email doesn't match the criteria.": "Το email δεν ταιριάζει με τα κριτήρια.",
      "Invalid login token": "Άκυρο διακριτικό σύνδεσης",
      "Login forbidden": "Η είσοδος απαγορεύεται",
      "Service unknown": "Άγνωστη υπηρεσία",
      "Unrecognized options for login request": "Μη αναγνωρίσιμες επιλογές για αίτημα εισόδου",
      "User validation failed": "Η επικύρωση του χρήστη απέτυχε",
      "Username already exists.": "Αυτό το όνομα χρήστη υπάρχει ήδη.",
      "You are not logged in.": "Δεν είστε συνδεδεμένος.",
      "You've been logged out by the server. Please log in again.": "Αποσυνδεθήκατε από τον διακομιστή. Παρακαλούμε συνδεθείτε ξανά.",
      "Your session has expired. Please log in again.": "Η συνεδρία έληξε. Παρακαλούμε συνδεθείτε ξανά.",
      "No matching login attempt found": "Δεν βρέθηκε καμία απόπειρα σύνδεσης που να ταιριάζει",
      "Password is old. Please reset your password.": "Ο κωδικός είναι παλιός. Παρακαλούμε επαναφέρετε τον κωδικό σας.",
      "Incorrect password": "Εσφαλμένος κωδικός",
      "Invalid email": "Εσφαλμένο email",
      "Must be logged in": "Πρέπει να είστε συνδεδεμένος",
      "Need to set a username or email": "Χρειάζεται να ορίσετε όνομα χρήστη ή email",
      "old password format": "κωδικός παλιάς μορφής",
      "Password may not be empty": "Ο κωδικός δεν μπορεί να είναι άδειος",
      "Signups forbidden": "Οι εγγραφές απαγορεύονται",
      "Token expired": "Το διακριτικό σύνδεσης έληξε",
      "Token has invalid email address": "Το διακριτικό σύνδεσης έχει άκυρη διεύθυνση email",
      "User has no password set": "Ο χρήστης δεν έχει ορίσει κωδικό",
      "User not found": "Ο χρήστης δεν βρέθηκε",
      "Verify email link expired": "Ο σύνδεσμος επαλήθευσης του email έληξε",
      "Verify email link is for unknown address": "Ο σύνδεσμος επαλήθευσης του email είναι για άγνωστη διεύθυνση",
      "Match failed": "Η αντιστοίχηση απέτυχε",
      "Unknown error": "Άγνωστο σφάλμα"
    }
  }
};

T9n.map("el", el);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/en.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var en;

en = {
  add: "add",
  and: "and",
  back: "back",
  changePassword: "Change Password",
  choosePassword: "Choose a Password",
  clickAgree: "By clicking Register, you agree to our",
  configure: "Configure",
  createAccount: "Create an Account",
  currentPassword: "Current Password",
  dontHaveAnAccount: "Don't have an account?",
  email: "Email",
  emailAddress: "Email Address",
  emailResetLink: "Email Reset Link",
  forgotPassword: "Forgot your password?",
  ifYouAlreadyHaveAnAccount: "If you already have an account",
  newPassword: "New Password",
  newPasswordAgain: "New Password (again)",
  optional: "Optional",
  OR: "OR",
  password: "Password",
  passwordAgain: "Password (again)",
  privacyPolicy: "Privacy Policy",
  remove: "remove",
  resetYourPassword: "Reset your password",
  setPassword: "Set Password",
  sign: "Sign",
  signIn: "Sign In",
  signin: "sign in",
  signOut: "Sign Out",
  signUp: "Register",
  signupCode: "Registration Code",
  signUpWithYourEmailAddress: "Register with your email address",
  terms: "Terms of Use",
  updateYourPassword: "Update your password",
  username: "Username",
  usernameOrEmail: "Username or email",
  "with": "with",
  info: {
    emailSent: "Email sent",
    emailVerified: "Email verified",
    passwordChanged: "Password changed",
    passwordReset: "Password reset"
  },
  error: {
    emailRequired: "Email is required.",
    minChar: "7 character minimum password.",
    pwdsDontMatch: "Passwords don't match",
    pwOneDigit: "Password must have at least one digit.",
    pwOneLetter: "Password requires 1 letter.",
    signInRequired: "You must be signed in to do that.",
    signupCodeIncorrect: "Registration code is incorrect.",
    signupCodeRequired: "Registration code is required.",
    usernameIsEmail: "Username cannot be an email address.",
    usernameRequired: "Username is required.",
    accounts: {
      "Email already exists.": "Email already exists.",
      "Email doesn't match the criteria.": "Email doesn't match the criteria.",
      "Invalid login token": "Invalid login token",
      "Login forbidden": "Login forbidden",
      "Service unknown": "Service unknown",
      "Unrecognized options for login request": "Unrecognized options for login request",
      "User validation failed": "User validation failed",
      "Username already exists.": "Username already exists.",
      "You are not logged in.": "You are not logged in.",
      "You've been logged out by the server. Please log in again.": "You've been logged out by the server. Please log in again.",
      "Your session has expired. Please log in again.": "Your session has expired. Please log in again.",
      "No matching login attempt found": "No matching login attempt found",
      "Password is old. Please reset your password.": "Password is old. Please reset your password.",
      "Incorrect password": "Incorrect password",
      "Invalid email": "Invalid email",
      "Must be logged in": "Must be logged in",
      "Need to set a username or email": "Need to set a username or email",
      "old password format": "old password format",
      "Password may not be empty": "Password may not be empty",
      "Signups forbidden": "Signups forbidden",
      "Token expired": "Token expired",
      "Token has invalid email address": "Token has invalid email address",
      "User has no password set": "User has no password set",
      "User not found": "User not found",
      "Verify email link expired": "Verify email link expired",
      "Verify email link is for unknown address": "Verify email link is for unknown address",
      "Match failed": "Match failed",
      "Unknown error": "Unknown error"
    }
  }
};

T9n.map("en", en);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/es.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var es;

es = {
  add: "agregar",
  and: "y",
  back: "atrás",
  changePassword: "Cambiar contraseña",
  choosePassword: "Eligir contraseña",
  clickAgree: "Al hacer clic en Sucribir apruebas la",
  configure: "Disposición",
  createAccount: "Crear cuenta",
  currentPassword: "Contraseña actual",
  dontHaveAnAccount: "No tienes una cuenta?",
  email: "Email",
  emailAddress: "Dirección de email",
  emailResetLink: "Reiniciar email",
  forgotPassword: "Olvidó su contraseña?",
  ifYouAlreadyHaveAnAccount: "Si ya tiene una cuenta",
  newPassword: "Nueva contraseña",
  newPasswordAgain: "Nueva contraseña (repetir)",
  optional: "Opcional",
  OR: "O",
  password: "Contraseña",
  passwordAgain: "Contraseña (repetir)",
  privacyPolicy: "Póliza de Privacidad",
  remove: "remover",
  resetYourPassword: "Resetear tu contraseña",
  setPassword: "Definir contraseña",
  sign: "Ingresar",
  signIn: "Entrar",
  signin: "entrar",
  signOut: "Salir",
  signUp: "Suscribir",
  signupCode: "Código de suscripción",
  signUpWithYourEmailAddress: "Suscribir con tu email",
  terms: "Términos de uso",
  updateYourPassword: "Actualizar tu contraseña",
  username: "Usuario",
  usernameOrEmail: "Usuario o email",
  "with": "con",
  info: {
    emailSent: "Email enviado",
    emailVerified: "Email verificado",
    passwordChanged: "Contraseña cambiada",
    passwordReset: "Resetear contraseña"
  },
  error: {
    emailRequired: "El email es requerido.",
    minChar: "7 caracteres mínimo.",
    pwdsDontMatch: "Las contraseñas no coinciden",
    pwOneDigit: "mínimo un dígito.",
    pwOneLetter: "mínimo una letra.",
    signInRequired: "Debes iniciar sesión para hacer eso.",
    signupCodeIncorrect: "El código de suscripción no coincide.",
    signupCodeRequired: "Se requiere el código de suscripción.",
    usernameIsEmail: "El usuario no puede ser el email.",
    usernameRequired: "Se requiere un usuario.",
    accounts: {
      "Email already exists.": "El email ya existe.",
      "Email doesn't match the criteria.": "El email no coincide con los criterios.",
      "User validation failed": "No se ha podido validar el usuario",
      "Username already exists.": "El usuario ya existe.",
      "You've been logged out by the server. Please log in again.": "Has sido desconectado por el servidor. Por favor ingresa de nuevo.",
      "Your session has expired. Please log in again.": "Tu sesión ha expirado. Por favor ingresa de nuevo.",
      "Incorrect password": "Contraseña inválida",
      "Must be logged in": "Debes ingresar",
      "Need to set a username or email": "Tienes que especificar un usuario o un email",
      "Signups forbidden": "Registro prohibido",
      "Token expired": "Token expirado",
      "Token has invalid email address": "Token contiene un email inválido",
      "User has no password set": "Usuario no tiene contraseña",
      "User not found": "Usuario no encontrado",
      "Verify email link expired": "El enlace para verificar el email ha expirado",
      "Verify email link is for unknown address": "El enlace para verificar el email contiene una dirección desconocida"
    }
  }
};

T9n.map("es", es);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/es_ES.coffee.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var es_ES;

es_ES = {
  add: "agregar",
  and: "y",
  back: "atrás",
  changePassword: "Cambiar Contraseña",
  choosePassword: "Eligir Contraseña",
  clickAgree: "Si haces clic en Crear Cuenta estás de acuerdo con la",
  configure: "Configurar",
  createAccount: "Crear cuenta",
  currentPassword: "Contraseña actual",
  dontHaveAnAccount: "¿No estás registrado?",
  email: "Email",
  emailAddress: "Dirección de email",
  emailResetLink: "Restaurar email",
  forgotPassword: "¿Has olvidado tu contraseña?",
  ifYouAlreadyHaveAnAccount: "Ya tienes una cuenta, ",
  newPassword: "Nueva Contraseña",
  newPasswordAgain: "Nueva Contraseña (repetición)",
  optional: "Opcional",
  OR: "O",
  password: "Contraseña",
  passwordAgain: "Contraseña (repetición)",
  privacyPolicy: "Póliza de Privacidad",
  remove: "remover",
  resetYourPassword: "Recuperar tu contraseña",
  setPassword: "Definir Contraseña",
  sign: "Entrar",
  signIn: "Entrar",
  signin: "entra",
  signOut: "Salir",
  signUp: "Regístrate",
  signupCode: "Código para registrarte",
  signUpWithYourEmailAddress: "Regístrate con tu email",
  terms: "Términos de Uso",
  updateYourPassword: "Actualizar tu contraseña",
  username: "Usuario",
  usernameOrEmail: "Usuario o email",
  "with": "con",
  info: {
    emailSent: "Email enviado",
    emailVerified: "Email verificado",
    passwordChanged: "Contraseña cambiado",
    passwordReset: "Resetar Contraseña"
  },
  error: {
    emailRequired: "El email es necesario.",
    minChar: "7 carácteres mínimo.",
    pwdsDontMatch: "Contraseñas no coninciden",
    pwOneDigit: "mínimo un dígito.",
    pwOneLetter: "mínimo una letra.",
    signInRequired: "Debes iniciar sesión para esta opción.",
    signupCodeIncorrect: "Código de registro inválido.",
    signupCodeRequired: "Se requiere un código de registro.",
    usernameIsEmail: "El usuario no puede ser una dirección de correo.",
    usernameRequired: "Se quiere nombre de usuario.",
    accounts: {
      "Email already exists.": "El correo ya existe.",
      "Email doesn't match the criteria.": "El correo no coincide.",
      "User validation failed": "No hemos podido verificar el usuario",
      "Username already exists.": "Este usuario ya existe.",
      "You've been logged out by the server. Please log in again.": "Has sido desconectado por el servidor. Por favor inicia sesión de nuevo.",
      "Your session has expired. Please log in again.": "Tu session ha expirado. Por favor inicia sesión de nuevo.",
      "Incorrect password": "Contraseña inválida",
      "Must be logged in": "Debes iniciar sesión",
      "Need to set a username or email": "Debes especificar un usuario o email",
      "Signups forbidden": "Los registros no están permitidos en este momento",
      "Token expired": "El token ha expirado",
      "Token has invalid email address": "EL token contiene un email inválido",
      "User has no password set": "El usuario no tiene contraseña",
      "User not found": "Usuario no encontrado",
      "Verify email link expired": "El enlace para verificar el email ha expierado",
      "Verify email link is for unknown address": "El enlace para verificar el email está asociado a una dirección desconocida"
    }
  }
};

T9n.map("es_ES", es_ES);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/fa.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var fa;

fa = {
  add: "افزودن",
  and: "و",
  back: "برگشت",
  changePassword: "تعویض گذرواژه",
  choosePassword: "انتخاب یک گذرواژه",
  clickAgree: "با انتخاب ثبت‌نام، شما موافق هستید با",
  configure: "پیکربندی",
  createAccount: "ایجاد یک حساب",
  currentPassword: "گذرواژه کنونی",
  dontHaveAnAccount: "یک حساب ندارید؟",
  email: "رایانامه",
  emailAddress: "آدرس رایانامه",
  emailResetLink: "پیوند بازنشانی رایانامه",
  forgotPassword: "گذرواژه‌تان را فراموش کرده‌اید؟",
  ifYouAlreadyHaveAnAccount: "اگر هم‌اکنون یک حساب دارید",
  newPassword: "گذرواژه جدید",
  newPasswordAgain: "گذرواژه جدید (تکرار)",
  optional: "اختيارى",
  OR: "یا",
  password: "گذرواژه",
  passwordAgain: "گذرواژه (دوباره)",
  privacyPolicy: "حریم خصوصی",
  remove: "حذف",
  resetYourPassword: "بازنشانی گذرواژه شما",
  setPassword: "تنظیم گذرواژه",
  sign: "نشان",
  signIn: "ورود",
  signin: "ورود",
  signOut: "خروج",
  signUp: "ثبت‌نام",
  signupCode: "کد ثبت‌نام",
  signUpWithYourEmailAddress: "با آدرس رایانامه‌تان ثبت‌نام کنید",
  terms: "قوانین استفاده",
  updateYourPassword: "گذرواژه‌تان را به روز کنید",
  username: "نام کاربری",
  usernameOrEmail: "نام کاربری یا رایانامه",
  "with": "با",
  info: {
    emailSent: "رایانامه ارسال شد",
    emailVerified: "رایانامه تایید شد",
    passwordChanged: "گذرواژه تغییر کرد",
    passwordReset: "گذرواژه بازنشانی شد"
  },
  error: {
    emailRequired: "رایانامه ضروری است.",
    minChar: "گذرواژه حداقل ۷ کاراکتر.",
    pwdsDontMatch: "گذرواژه‌ها تطابق ندارند",
    pwOneDigit: "گذرواژه باید لااقل یک رقم داشته باشد.",
    pwOneLetter: "گذرواژه یک حرف نیاز دارد.",
    signInRequired: "برای انجام آن باید وارد شوید.",
    signupCodeIncorrect: "کد ثبت‌نام نادرست است.",
    signupCodeRequired: "کد ثبت‌نام ضروری است.",
    usernameIsEmail: "نام کاربری نمی‌توان آدرس رایانامه باشد.",
    usernameRequired: "نام کاربری ضروری است.",
    accounts: {
      "Email already exists.": "رایانامه هم‌اکنون وجود دارد.",
      "Email doesn't match the criteria.": "رایانامه با ضوابط تطابق ندارد.",
      "Invalid login token": "علامت ورود نامعتبر است",
      "Login forbidden": "ورود ممنوع است",
      "Service unknown": "سرویس ناشناس",
      "Unrecognized options for login request": "گزینه‌های نامشخص برای درخواست ورود",
      "User validation failed": "اعتبارسنجی کاربر ناموفق",
      "Username already exists.": "نام کاربری هم‌اکنون وجود دارد.",
      "You are not logged in.": "شما وارد نشده‌اید.",
      "You've been logged out by the server. Please log in again.": "شما توسط سرور خارج شده‌اید. لطفأ دوباره وارد شوید.",
      "Your session has expired. Please log in again.": "جلسه شما منقضی شده است. لطفا دوباره وارد شوید.",
      "No matching login attempt found": "تلاش ورود مطابق یافت نشد",
      "Password is old. Please reset your password.": "گذرواژه قدیمی است. لطفأ گذرواژه‌تان را بازتنظیم کنید.",
      "Incorrect password": "گذرواژه نادرست",
      "Invalid email": "رایانامه نامعتبر",
      "Must be logged in": "باید وارد شوید",
      "Need to set a username or email": "یک نام کاربری یا ایمیل باید تنظیم شود",
      "old password format": "قالب گذرواژه قدیمی",
      "Password may not be empty": "گذرواژه نمی‌تواند خالی باشد",
      "Signups forbidden": "ثبت‌نام ممنوع",
      "Token expired": "علامت رمز منقظی شده است",
      "Token has invalid email address": "علامت رمز دارای آدرس رایانامه نامعتبر است",
      "User has no password set": "کاربر گذرواژه‌ای تنظیم نکرده است",
      "User not found": "کاربر یافت نشد",
      "Verify email link expired": "پیوند تایید رایانامه منقضی شده است",
      "Verify email link is for unknown address": "پیوند تایید رایانامه برای آدرس ناشناخته است",
      "Match failed": "تطابق ناموفق",
      "Unknown error": "خطای ناشناخته"
    }
  }
};

T9n.map("fa", fa);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/fr.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var fr;

fr = {
  add: "Ajouter",
  and: "et",
  back: "retour",
  changePassword: "Modifier le mot de passe",
  choosePassword: "Choisir le mot de passe",
  clickAgree: "En cliquant sur S'enregistrer, vous acceptez notre",
  configure: "Configurer",
  createAccount: "Créer un compte",
  currentPassword: "Mot de passe actuel",
  dontHaveAnAccount: "Vous n'avez pas de compte ?",
  email: "Email",
  emailAddress: "Adresse Email",
  emailResetLink: "Envoyer le mail de réinitialisation",
  forgotPassword: "Vous avez oublié votre mot de passe ?",
  ifYouAlreadyHaveAnAccount: "Si vous avez déjà un compte",
  newPassword: "Nouveau mot de passe",
  newPasswordAgain: "Confirmer le nouveau mot de passe",
  optional: "Optionnel",
  OR: "OU",
  password: "Mot de passe",
  passwordAgain: "Confirmer le mot de passe",
  privacyPolicy: "Politique de confidentialité",
  remove: "Supprimer",
  resetYourPassword: "Reinitialiser votre mot de passe",
  setPassword: "Spécifier le mot de passe",
  sign: "S'enregistrer",
  signIn: "Se Connecter",
  signin: "se connecter",
  signOut: "Se Deconnecter",
  signUp: "S'enregistrer",
  signupCode: "Code d'inscription",
  signUpWithYourEmailAddress: "S'enregistrer avec votre adresse email",
  terms: "Conditions d'utilisation",
  updateYourPassword: "Mettre à jour le mot de passe",
  username: "Nom d'utilisateur",
  usernameOrEmail: "Nom d'utilisateur ou email",
  "with": "avec",
  info: {
    emailSent: "Email envoyé",
    emailVerified: "Email verifié",
    passwordChanged: "Mot de passe modifié",
    passwordReset: "Mot de passe réinitialisé"
  },
  error: {
    emailRequired: "Un email est requis.",
    minChar: "Votre mot de passe doit contenir au minimum 7 caractères.",
    pwdsDontMatch: "Les mots de passe ne correspondent pas",
    pwOneDigit: "Votre mot de passe doit contenir au moins un chiffre.",
    pwOneLetter: "Votre mot de passe doit contenir au moins une lettre.",
    signInRequired: "Vous devez être connecté pour continuer.",
    signupCodeIncorrect: "Le code d'enregistrement est incorrect.",
    signupCodeRequired: "Un code d'inscription est requis.",
    usernameIsEmail: "Le nom d'utilisateur ne peut être le même que l'adresse email.",
    usernameRequired: "Un nom d'utilisateur est requis.",
    accounts: {
      "Email already exists.": "Adresse email déjà utilisée.",
      "Email doesn't match the criteria.": "Adresse email ne correspond pas aux critères.",
      "Invalid login token": "Jeton d'authentification invalide",
      "Login forbidden": "Authentification interdite",
      "Service unknown": "Service inconnu",
      "Unrecognized options for login request": "Options inconnues pour la requête d'authentification",
      "User validation failed": "Echec de la validation de l'utilisateur",
      "Username already exists.": "Nom d'utilisateur déjà utilisé.",
      "You are not logged in.": "Vous n'êtes pas authentifié.",
      "You've been logged out by the server. Please log in again.": "Vous avez été déconnecté par le serveur. Veuillez vous reconnecter.",
      "Your session has expired. Please log in again.": "Votre session a expiré. Veuillez vous reconnecter.",
      "No matching login attempt found": "Aucune tentative d'authentification ne correspond",
      "Password is old. Please reset your password.": "Votre mot de passe est trop ancien. Veuillez le modifier.",
      "Incorrect password": "Mot de passe incorrect",
      "Invalid email": "Email invalide",
      "Must be logged in": "Vous devez être connecté",
      "Need to set a username or email": "Vous devez renseigner un nom d'utilisateur ou une adresse email",
      "old password format": "Ancien format de mot de passe",
      "Password may not be empty": "Le mot de passe ne peut être vide",
      "Signups forbidden": "La création de compte est interdite",
      "Token expired": "Jeton expiré",
      "Token has invalid email address": "Le jeton contient une adresse email invalide",
      "User has no password set": "L'utilisateur n'a pas de mot de passe",
      "User not found": "Utilisateur inconnu",
      "Verify email link expired": "Lien de vérification d'email expiré",
      "Verify email link is for unknown address": "Le lien de vérification d'email réfère à une adresse inconnue",
      "Match failed": "La correspondance a échoué",
      "Unknown error": "Erreur inconnue"
    }
  }
};

T9n.map("fr", fr);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/he.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var he;

he = {
  add: "הוסף",
  and: "ו",
  back: "חזרה",
  changePassword: "שינוי סיסמא",
  choosePassword: "בחירת סיסמא",
  clickAgree: "על ידי לחיצה על הירשם, הינך מסכים",
  configure: "הגדרות",
  createAccount: "הוספת חשבון",
  currentPassword: "סיסמא נוכחית",
  dontHaveAnAccount: "אין לך חשבון?",
  email: "דוא\"ל",
  emailAddress: "דוא\"ל",
  emailResetLink: "שלח קישור לאיפוס סיסמא",
  forgotPassword: "שכחת סיסמא?",
  ifYouAlreadyHaveAnAccount: "אם יש לך חשבון",
  newPassword: "סיסמא חדשה",
  newPasswordAgain: "סיסמא חדשה (שוב)",
  optional: "רשות",
  OR: "או",
  password: "סיסמא",
  passwordAgain: "סיסמא (שוב)",
  privacyPolicy: "למדיניות הפרטיות",
  remove: "הסרה",
  resetYourPassword: "איפוס סיסמא",
  setPassword: "עדכון סיסמא",
  signIn: "כניסה",
  signin: "כניסה",
  signOut: "יציאה",
  signUp: "הרשמה לחשבון",
  signupCode: "קוד הרשמה",
  signUpWithYourEmailAddress: "הירשם באמצעות הדוא\"ל",
  terms: "לתנאי השימוש",
  updateYourPassword: "עדכון סיסמא",
  username: "שם משתמש",
  usernameOrEmail: "שם משמש או דוא\"ל",
  "with": "עם",
  info: {
    emailSent: "נשלחה הודעה לדוא\"ל",
    emailVerified: "כתובת הדוא\"ל וודאה בהצלחה",
    passwordChanged: "סיסמתך שונתה בהצלחה",
    passwordReset: "סיסמתך אופסה בהצלחה"
  },
  error: {
    emailRequired: "חובה להזין כתובת דוא\"ל",
    minChar: "חובה להזין סיסמא בעלת 7 תווים לפחות.",
    pwdsDontMatch: "הסיסמאות אינן זהות.",
    pwOneDigit: "הסיסמא חייבת לכלול ספרה אחת לפחות.",
    pwOneLetter: "הסיסמא חייבת לכלול אות אחת לפחות.",
    signInRequired: "חובה להיכנס למערכת כדי לבצע פעולה זו.",
    signupCodeIncorrect: "קוד ההרשמה שגוי.",
    signupCodeRequired: "חובה להזין את קוד ההרשמה.",
    usernameIsEmail: "של המשתמש לא יכול להיות כתובת דוא\"ל.",
    usernameRequired: "חובה להזין שם משתמש.",
    accounts: {
      "Email already exists.": "הדוא\"ל כבר רשום לחשבון.",
      "Email doesn't match the criteria.": "הדוא\"ל לא מקיים את הקריטריונים.",
      "Invalid login token": "Token כניסה שגוי",
      "Login forbidden": "הכניסה נאסרה",
      "Service unknown": "Service לא ידוע",
      "Unrecognized options for login request": "נסיון הכניסה כלל אופציות לא מזוהות",
      "User validation failed": "אימות המשתמש נכשל",
      "Username already exists.": "שם המשתמש כבר קיים.",
      "You are not logged in.": "לא נכנסת לחשבון.",
      "You've been logged out by the server. Please log in again.": "השרת הוציא אותך מהמערכת. נא להיכנס לחשבונך שוב.",
      "Your session has expired. Please log in again.": "ה-session שלך פג תוקף. נא להיכנס לחשבונך שוב.",
      "No matching login attempt found": "לא נמצא נסיון כניסה מתאים",
      "Password is old. Please reset your password.": "סיסמתך ישנה. נא להחליך אותה.",
      "Incorrect password": "סיסמא שגויה",
      "Invalid email": "דוא\"ל שגוי",
      "Must be logged in": "חובה להיכנס למערכת כדי לבצע פעולה זו.",
      "Need to set a username or email": "חובה להגדיר שם משתמש או דוא\"ל",
      "old password format": "פורמט סיסמא ישן",
      "Password may not be empty": "הסיסמא לא יכולה להיות ריקה",
      "Signups forbidden": "אסור להירשם",
      "Token expired": "ה-token פג תוקף",
      "Token has invalid email address": "ה-token מכיל כתובת דוא\"ל שגוייה",
      "User has no password set": "למשתמש אין סיסמא",
      "User not found": "המשתמש לא נמצא",
      "Verify email link expired": "קישור וידוי הדוא\"ל פג תוקף",
      "Verify email link is for unknown address": "קישור וידוי הדוא\"ל הוא לכתובת לא ידועה",
      "Match failed": "ההתאמה נכשלה",
      "Unknown error": "שגיאה לא ידועה"
    }
  }
};

T9n.map("he", he);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/hr.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var hr;

hr = {
  add: "dodaj",
  and: "i",
  back: "nazad",
  changePassword: "Promjeni zaporku",
  choosePassword: "Izaberi zaporku",
  clickAgree: "Klikom na Registracija, prihvatate naše",
  configure: "Podesi",
  createAccount: "Napravite račun",
  currentPassword: "Trenutna zaporka",
  dontHaveAnAccount: "Vi nemate račun?",
  email: "Email",
  emailAddress: "Email adresa",
  emailResetLink: "Email reset link",
  forgotPassword: "Zaboravili ste zaporku?",
  ifYouAlreadyHaveAnAccount: "Ako već imate račun",
  newPassword: "Nova zaporka",
  newPasswordAgain: "Nova zaporka (ponovno)",
  optional: "neobavezno",
  OR: "ili",
  password: "Zaporka",
  passwordAgain: "Zaporka (ponovno)",
  privacyPolicy: "Izjava o privatnosti",
  remove: "ukloni",
  resetYourPassword: "Resetirajte",
  setPassword: "Postavite zaporku",
  sign: "Prijava",
  signIn: "Prijavi se",
  signin: "prijavi se",
  signOut: "Odjavi se",
  signUp: "Registracija",
  signupCode: "Registracijski kod",
  signUpWithYourEmailAddress: "Registrirajte se sa vašom email adresom",
  terms: "Uslovi korištenja",
  updateYourPassword: "Ažurirajte lozinku",
  username: "Korisničko ime",
  usernameOrEmail: "Korisničko ime ili lozinka",
  "with": "sa",
  info: {
    emailSent: "Email je poslan",
    emailVerified: "Email je verificiran",
    passwordChanged: "Zaproka promjenjena",
    passwordReset: "Zaporka resetirana"
  },
  error: {
    emailRequired: "Email je potreban.",
    minChar: "Zaporka mora sadržavati više od 7 znakova.",
    pwdsDontMatch: "Zaporke se ne poklapaju.",
    pwOneDigit: "Zaporka mora sadržavati barem jednu brojku.",
    pwOneLetter: "Zaporka mora sadržavati barem jedno slovo.",
    signInRequired: "Morate biti prijavljeni za to.",
    signupCodeIncorrect: "Registracijski kod je netočan.",
    signupCodeRequired: "Registracijski kod je potreban.",
    usernameIsEmail: "Korisničko ime ne može biti email.",
    usernameRequired: "Korisničko ime je potrebno.",
    accounts: {
      "Email already exists.": "Email već postoji.",
      "Email doesn't match the criteria.": "Email ne zadovoljava kriterij.",
      "Invalid login token": "Nevažeći  token za prijavu",
      "Login forbidden": "Prijava zabranjena",
      "Service unknown": "Servis nepoznat",
      "Unrecognized options for login request": "Neprepoznate opcije zahtjeva za prijavu",
      "User validation failed": "Provjera valjanosti za korisnika neuspješna.",
      "Username already exists.": "Korisnik već postoji.",
      "You are not logged in.": "Niste prijavljeni.",
      "You've been logged out by the server. Please log in again.": "Odjavljeni ste sa servera. Molimo Vas ponovno se prijavite.",
      "Your session has expired. Please log in again.": "Vaša sesija je istekla. Molimo prijavite se ponovno.",
      "No matching login attempt found": "Pokušaj prijave se ne podudara sa podatcima u bazi.",
      "Password is old. Please reset your password.": "Zaporka je stara. Molimo resetujte zaporku.",
      "Incorrect password": "Netočna zaporka",
      "Invalid email": "Nevažeći email",
      "Must be logged in": "Morate biti prijavljeni",
      "Need to set a username or email": "Morate postaviti korisničko ime ili email",
      "old password format": "stari format zaporke",
      "Password may not be empty": "Zaporka ne može biti prazna",
      "Signups forbidden": "Prijave zabranjenje",
      "Token expired": "Token je istekao",
      "Token has invalid email address": "Token ima nevažeću email adresu",
      "User has no password set": "Korisnik nema postavljenu zaporku",
      "User not found": "Korisnik nije pronađen",
      "Verify email link expired": "Link za verifikaciju emaila je istekao",
      "Verify email link is for unknown address": "Link za verifikaciju emaila je za nepoznatu adresu",
      "Match failed": "Usporedba neuspjela",
      "Unknown error": "Nepoznata pogreška"
    }
  }
};

T9n.map("hr", hr);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/it.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var it;

it = {
  add: "aggiungi",
  and: "e",
  back: "indietro",
  changePassword: "Cambia Password",
  choosePassword: "Scegli una Password",
  clickAgree: "Cliccando Registrati, accetti la nostra",
  configure: "Configura",
  createAccount: "Crea un Account",
  currentPassword: "Password Corrente",
  dontHaveAnAccount: "Non hai un account?",
  email: "Email",
  emailAddress: "Indirizzo Email",
  emailResetLink: "Invia Link di Reset",
  forgotPassword: "Hai dimenticato la password?",
  ifYouAlreadyHaveAnAccount: "Se hai già un account",
  newPassword: "Nuova Password",
  newPasswordAgain: "Nuova Password (di nuovo)",
  optional: "Opzionale",
  OR: "OPPURE",
  password: "Password",
  passwordAgain: "Password (di nuovo)",
  privacyPolicy: "Privacy Policy",
  remove: "rimuovi",
  resetYourPassword: "Reimposta la password",
  setPassword: "Imposta Password",
  sign: "Accedi",
  signIn: "Accedi",
  signin: "accedi",
  signOut: "Esci",
  signUp: "Registrati",
  signupCode: "Codice di Registrazione",
  signUpWithYourEmailAddress: "Registrati con il tuo indirizzo email",
  terms: "Termini di Servizio",
  updateYourPassword: "Aggiorna la password",
  username: "Username",
  usernameOrEmail: "Nome utente o email",
  "with": "con",
  info: {
    emailSent: "Email inviata",
    emailVerified: "Email verificata",
    passwordChanged: "Password cambiata",
    passwordReset: "Password reimpostata"
  },
  error: {
    emailRequired: "L'Email è obbligatoria.",
    minChar: "La Password deve essere di almeno 7 caratteri.",
    pwdsDontMatch: "Le Password non corrispondono",
    pwOneDigit: "La Password deve contenere almeno un numero.",
    pwOneLetter: "La Password deve contenere 1 lettera.",
    signInRequired: "Per fare questo devi accedere.",
    signupCodeIncorrect: "Codice di Registrazione errato.",
    signupCodeRequired: "Il Codice di Registrazione è obbligatorio.",
    usernameIsEmail: "Il Nome Utente non può essere un indirizzo email.",
    usernameRequired: "Il Nome utente è obbligatorio.",
    accounts: {
      "Email already exists.": "Indirizzo email già esistente.",
      "Email doesn't match the criteria.": "L'indirizzo email non soddisfa i requisiti.",
      "Invalid login token": "Codice di accesso non valido",
      "Login forbidden": "Accesso non consentito",
      "Service unknown": "Servizio sconosciuto",
      "Unrecognized options for login request": "Opzioni per la richiesta di accesso non ricunosciute",
      "User validation failed": "Validazione utente fallita",
      "Username already exists.": "Nome utente già esistente.",
      "You are not logged in.": "Non hai effettuato l'accesso.",
      "You've been logged out by the server. Please log in again.": "Sei stato disconnesso dal server. Per favore accedi di nuovo.",
      "Your session has expired. Please log in again.": "La tua sessione è scaduta. Per favore accedi di nuovo.",
      "No matching login attempt found": "Tentativo di accesso corrispondente non trovato",
      "Password is old. Please reset your password.": "La password è vecchia. Per favore reimposta la tua password.",
      "Incorrect password": "Password non corretta",
      "Invalid email": "Email non valida",
      "Must be logged in": "Devi aver eseguito l'accesso",
      "Need to set a username or email": "È necessario specificare un nome utente o un indirizzo email",
      "old password format": "vecchio formato password",
      "Password may not be empty": "La password non può essere vuota",
      "Signups forbidden": "Registrazioni non consentite",
      "Token expired": "Codice scaduto",
      "Token has invalid email address": "Il codice ha un indirizzo email non valido",
      "User has no password set": "L'utente non ha una password impostata",
      "User not found": "Utente non trovato",
      "Verify email link expired": "Link per la verifica dell'email scaduto",
      "Verify email link is for unknown address": "Il link per la verifica dell'email fa riferimento ad un indirizzo sconosciuto",
      "Match failed": "Riscontro fallito",
      "Unknown error": "Errore Sconosciuto"
    }
  }
};

T9n.map("it", it);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/ja.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ja;

ja = {
  add: "足す",
  and: "と",
  back: "戻る",
  changePassword: "パスワードを変更する",
  choosePassword: "パスワードを選ぶ",
  clickAgree: "「登録」をクリックすると同意したことになります",
  configure: "設定する",
  createAccount: "アカウントを作る",
  currentPassword: "現在のパスワード",
  dontHaveAnAccount: "アカウントをお持ちでは無いですか？",
  email: "Eメール",
  emailAddress: "Eメールアドレス",
  emailResetLink: "Eメールリセットリンク",
  forgotPassword: "パスワードをお忘れですか？",
  ifYouAlreadyHaveAnAccount: "もしも既にアカウントをお持ちなら",
  newPassword: "新パスワード",
  newPasswordAgain: "新パスワード(確認)",
  optional: "オプション",
  OR: "または",
  password: "パスワード",
  passwordAgain: "パスワード(確認)",
  privacyPolicy: "プライバシーポリシー",
  remove: "削除する",
  resetYourPassword: "パスワードをリセットする",
  setPassword: "パスワードを設定する",
  sign: "サイン",
  signIn: "サインインする",
  signin: "サインイン",
  signOut: "サインアウトする",
  signUp: "登録する",
  signupCode: "レジストレーションコード",
  signUpWithYourEmailAddress: "Eメールアドレスで登録する",
  terms: "利用条件",
  updateYourPassword: "パスワードを更新する",
  username: "ユーザー名",
  usernameOrEmail: "ユーザー名またはEメール",
  "with": "with",
  info: {
    emailSent: "Eメールを送りました",
    emailVerified: "Eメールが確認されました",
    passwordChanged: "パスワードが変更されました",
    passwordReset: "パスワードがリセットされました"
  },
  error: {
    emailRequired: "Eメールが必要です",
    minChar: "パスワードには最低7文字必要です",
    pwdsDontMatch: "パスワードが違います",
    pwOneDigit: "パスワードは少なくとも1つ数字を含む必要があります",
    pwOneLetter: "パスワードは少なく遠m1つアルファベットを含む必要があります",
    signInRequired: "その操作にはサインインが必要です",
    signupCodeIncorrect: "レジストレーションコードが間違っています",
    signupCodeRequired: "レジストレーションコードが必要です",
    usernameIsEmail: "ユーザー名にEメールアドレスは使えません",
    usernameRequired: "ユーザー名が必要です",
    accounts: {
      "Email already exists.": "そのEメールは既に登録されています",
      "Email doesn't match the criteria.": "Eメールが基準を満たしていません",
      "Invalid login token": "無効なログイントークンです",
      "Login forbidden": "ログインが許可されません",
      "Service unknown": "サービスが不明です",
      "Unrecognized options for login request": "ログインリクエストのオプションが認識できません",
      "User validation failed": "ユーザー確認できません",
      "Username already exists.": "そのユーザー名は既に使われています",
      "You are not logged in.": "ログインしていません",
      "You've been logged out by the server. Please log in again.": "ログアウトされました。再度ログインしてください",
      "Your session has expired. Please log in again.": "セッションが切れました。再度ログインしてください",
      "No matching login attempt found": "対応のログイン試行が見つかりません",
      "Password is old. Please reset your password.": "パスワードが古くなりました。パスワードをリセットしてください",
      "Incorrect password": "パスワードが正しくありません",
      "Invalid email": "Eメールが無効です",
      "Must be logged in": "ログインが必要です",
      "Need to set a username or email": "ユーザー名かEメールを設定する必要があります",
      "old password format": "パスワード形式が古いものです",
      "Password may not be empty": "パスワードが入力されていないようです",
      "Signups forbidden": "サインアップが禁止されています",
      "Token expired": "トークンが切れました",
      "Token has invalid email address": "トークンが無効なEメールアドレスを含んでいます",
      "User has no password set": "パスワードが設定されていません",
      "User not found": "ユーザーが見つかりません",
      "Verify email link expired": "Eメールリンクが切れたか確認する",
      "Verify email link is for unknown address": "Eメールリンクが不明なアドレス用か確認する",
      "Match failed": "一致しませんでした",
      "Unknown error": "不明なエラー"
    }
  }
};

T9n.map("ja", ja);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/pl.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var pl;

pl = {
  add: "dodaj",
  and: "i",
  back: "powrót",
  changePassword: "Zmień hasło",
  choosePassword: "Wybierz hasło",
  clickAgree: "Klikając na Zarejestruj się zgadzasz się z naszą",
  configure: "Konfiguruj",
  createAccount: "Utwórz konto",
  currentPassword: "Aktualne hasło",
  dontHaveAnAccount: "Nie masz konta?",
  email: "Email",
  emailAddress: "Adres email",
  emailResetLink: "Wyślij email z linkiem do zmiany hasła",
  forgotPassword: "Zapomniałeś hasła?",
  ifYouAlreadyHaveAnAccount: "Jeżeli już masz konto",
  newPassword: "Nowe hasło",
  newPasswordAgain: "Nowe hasło (powtórz)",
  optional: "Nieobowiązkowe",
  OR: "LUB",
  password: "Hasło",
  passwordAgain: "Hasło (powtórz)",
  privacyPolicy: "polityką prywatności",
  remove: "usuń",
  resetYourPassword: "Ustaw nowe hasło",
  setPassword: "Ustaw hasło",
  sign: "Podpisz",
  signIn: "Zaloguj się",
  signin: "zaloguj się",
  signOut: "Wyloguj się",
  signUp: "Zarejestruj się",
  signupCode: "Kod rejestracji",
  signUpWithYourEmailAddress: "Zarejestruj się używając adresu email",
  terms: "warunkami korzystania z serwisu",
  updateYourPassword: "Zaktualizuj swoje hasło",
  username: "Nazwa użytkownika",
  usernameOrEmail: "Nazwa użytkownika lub email",
  "with": "z",
  info: {
    emailSent: "Adres email wysłany",
    emailVerified: "Adres email zweryfikowany",
    passwordChanged: "Hasło zmienione",
    passwordReset: "Hasło wyzerowane"
  },
  error: {
    emailRequired: "Wymagany jest adres email.",
    minChar: "7 znaków to minimalna długość hasła.",
    pwdsDontMatch: "Hasła są różne",
    pwOneDigit: "Hasło musi zawierać przynajmniej jedną cyfrę.",
    pwOneLetter: "Hasło musi zawierać 1 literę.",
    signInRequired: "Musisz być zalogowany, aby to zrobić.",
    signupCodeIncorrect: "Kod rejestracji jest nieprawidłowy.",
    signupCodeRequired: "Wymagany jest kod rejestracji.",
    usernameIsEmail: "Adres email nie może być nazwą użytkownika.",
    usernameRequired: "Wymagana jest nazwa użytkownika.",
    accounts: {
      "Email already exists.": "Adres email już istnieje.",
      "Email doesn't match the criteria.": "Adres email nie spełnia kryteriów.",
      "Invalid login token": "Błędny token logowania",
      "Login forbidden": "Logowanie zabronione",
      "Service unknown": "Nieznana usługa",
      "Unrecognized options for login request": "Nieznane parametry w żądaniu logowania.",
      "User validation failed": "Niepoprawna nazwa użytkownika",
      "Username already exists.": "Nazwa użytkownika już istnieje.",
      "You are not logged in.": "Nie jesteś zalogowany.",
      "You've been logged out by the server. Please log in again.": "Zostałeś wylogowane przez serwer. Zaloguj się ponownie.",
      "Your session has expired. Please log in again.": "Twoja sesja wygasła. Zaloguj się ponownie.",
      "No matching login attempt found": "Nie dopasowano danych logowania.",
      "Password is old. Please reset your password.": "Hasło jest stare. Proszę wyzerować hasło.",
      "Incorrect password": "Niepoprawne hasło",
      "Invalid email": "Błędny adres email",
      "Must be logged in": "Musisz być zalogowany",
      "Need to set a username or email": "Wymagane ustawienie nazwy użytkownika lub adresu email",
      "old password format": "stary format hasła",
      "Password may not be empty": "Hasło nie może być puste",
      "Signups forbidden": "Rejestracja zabroniona",
      "Token expired": "Token wygasł",
      "Token has invalid email address": "Token ma niewłaściwy adres email",
      "User has no password set": "Użytkownik nie ma ustawionego hasła",
      "User not found": "Nie znaleziono użytkownika",
      "Verify email link expired": "Link weryfikacyjny wygasł",
      "Verify email link is for unknown address": "Link weryfikacyjny jest dla nieznanego adresu",
      "Match failed": "Błędne dopasowanie",
      "Unknown error": "Nieznany błąd"
    }
  }
};

T9n.map("pl", pl);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/pt.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var pt;

pt = {
  add: "Adicionar",
  and: "e",
  back: "Voltar",
  changePassword: "Alterar senha",
  choosePassword: "Escolha uma senha",
  clickAgree: "Ao clicar em Registrar, você aceita nossos Termos de Uso",
  configure: "Configurar",
  createAccount: "Criar Conta",
  currentPassword: "Senha Atual",
  dontHaveAnAccount: "Não tem conta?",
  email: "E-mail",
  emailAddress: "Endereço de e-mail",
  emailResetLink: "E-mail com link para gerar Nova Senha",
  forgotPassword: "Esqueceu sua senha?",
  ifYouAlreadyHaveAnAccount: "Se você já tem uma conta",
  newPassword: "Nova Senha",
  newPasswordAgain: "Nova Senha (novamente)",
  optional: "Opcional",
  OR: "OU",
  password: "Senha",
  passwordAgain: "Senha (novamente)",
  privacyPolicy: "Política de Privacidade",
  remove: "remover",
  resetYourPassword: "Gerar nova senha",
  setPassword: "Cadastrar Senha",
  sign: "Entrar",
  signIn: "Entrar",
  signin: "entrar",
  signOut: "Sair",
  signUp: "Registrar",
  signupCode: "Código de Registro",
  signUpWithYourEmailAddress: "Registrar utilizando seu endereço de e-mail",
  terms: "Termos de Uso",
  updateYourPassword: "Atualizar senha",
  username: "Nome de usuário",
  usernameOrEmail: "Usuário ou e-mail",
  "with": "com",
  info: {
    emailSent: "E-mail enviado",
    emailVerified: "E-mail verificado",
    passwordChanged: "Senha atualizada",
    passwordReset: "Senha alterada"
  },
  error: {
    emailRequired: "E-mail é obrigatório.",
    minChar: "Senha requer um mínimo de 7 caracteres.",
    pwdsDontMatch: "Senhas não coincidem",
    pwOneDigit: "A Senha deve conter pelo menos um dígito.",
    pwOneLetter: "A Senha deve conter pelo menos uma letra.",
    signInRequired: "Você precisa estar logado para fazer isso.",
    signupCodeIncorrect: "Código de acesso incorreto.",
    signupCodeRequired: "É necessário um código de acesso.",
    usernameIsEmail: "Nome de usuário não pode ser um endereço de e-mail.",
    usernameRequired: "Nome de usuário é obrigatório.",
    accounts: {
      "Email already exists.": "E-mail já existe.",
      "Email doesn't match the criteria.": "E-mail inválido.",
      "Invalid login token": "Token de login inválido",
      "Login forbidden": "Login proibido.",
      "Service unknown": "Serviço desconhecido",
      "Unrecognized options for login request": "Opções desconhecidas para solicitação de login",
      "User validation failed": "Validação de usuário falhou",
      "Username already exists.": "Nome de usuário já existe.",
      "You are not logged in.": "Você não está logado.",
      "You've been logged out by the server. Please log in again.": "Você foi desconectado pelo servidor. Por favor, efetue login novamente.",
      "Your session has expired. Please log in again.": "Sua sessão expirou. Por favor, efetue login novamente.",
      "No matching login attempt found": "Não foi encontrada nenhuma tentativa de login que coincida.",
      "Password is old. Please reset your password.": "Senha expirou. Por favor, cadastre uma nova senha.",
      "Incorrect password": "Senha incorreta",
      "Invalid email": "E-mail inválido",
      "Must be logged in": "É necessário efetuar login",
      "Need to set a username or email": "É necessário configurar um Nome de Usuário ou E-mail",
      "old password format": "Formato de senha antigo",
      "Password may not be empty": "Senha não pode estar em branco",
      "Signups forbidden": "Registros proibidos",
      "Token expired": "Token expirou",
      "Token has invalid email address": "Token tem endereço de e-mail inválido",
      "User has no password set": "Usuário não possui senha cadastrada",
      "User not found": "Usuário não encontrado",
      "Verify email link expired": "O link de verificação de e-mail expirou",
      "Verify email link is for unknown address": "O link de verificação de e-mail está configurado para um endereço desconhecido",
      "Match failed": "Comparação falhou",
      "Unknown error": "Erro desconhecido"
    }
  }
};

T9n.map("pt", pt);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/ro.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ro;

ro = {
  add: "adaugă",
  and: "și",
  back: "înapoi",
  changePassword: "Schimbare parolă",
  choosePassword: "Alege o parolă",
  clickAgree: "Click pe Register, sunteți de acord",
  configure: "Configurare",
  createAccount: "Creați un cont",
  currentPassword: "Parola curentă",
  dontHaveAnAccount: "Nu ai un cont?",
  email: "E-mail",
  emailAddress: "Adresa de e-mail",
  emailResetLink: "Link de resetare parolă",
  forgotPassword: "Ți-ai uitat parola?",
  ifYouAlreadyHaveAnAccount: "Dacă ai deja un cont",
  newPassword: "Parolă nouă",
  newPasswordAgain: "Parolă nouă (din nou)",
  optional: "Opțional",
  OR: "SAU",
  password: "Parolă",
  passwordAgain: "Parolă (din nou)",
  privacyPolicy: "Politica de confidentialitate",
  remove: "Elimină",
  resetYourPassword: "Schimbati parola",
  setPassword: "Setati parola",
  sign: "Înregistrează",
  signIn: "Autentificare",
  signin: "Autentificare",
  signOut: "Deconectare",
  signUp: "Înregistrare",
  signupCode: "Codul de înregistrare",
  signUpWithYourEmailAddress: "Înregistrați-vă adresa de e-mail",
  terms: "Condiții de utilizare",
  updateYourPassword: "Actualizați parola dvs.",
  username: "Nume utilizator",
  usernameOrEmail: "Nume utilizator sau e-mail",
  "with": "cu",
  info: {
    emailSent: "Email trimis",
    emailVerified: "Email verificat",
    passwordChanged: "Parola a fost schimbata",
    passwordReset: "Resetare parola"
  },
  error: {
    emailRequired: "Introduceti Email-ul.",
    minChar: "Parolă minima de 7 caractere ",
    pwdsDontMatch: "Parolele nu se potrivesc",
    pwOneDigit: "Parola trebuie să contină cel puțin o cifră.",
    pwOneLetter: "Parola necesită o scrisoare.",
    signInRequired: "Autentificare.",
    signupCodeIncorrect: "Codul de înregistrare este incorectă.",
    signupCodeRequired: "Aveti nevoie de cod de înregistrare.",
    usernameIsEmail: "Numele de utilizator nu poate fi o adresă de e-mail.",
    usernameRequired: "Introduceti numele de utilizator.",
    accounts: {
      "Email already exists.": "E-mail există deja.",
      "Email doesn't match the criteria.": "E-mail nu se potrivește cu criteriile.",
      "Invalid login token": "Token invalid",
      "Login forbidden": "Autentificare interzisă",
      "Service unknown": "Service necunoscut",
      "Unrecognized options for login request": "Opțiuni nerecunoscute de cerere de conectare",
      "User validation failed": "Validare utilizator nereușit",
      "Username already exists.": "Numele de utilizator existent.",
      "You are not logged in.": "Nu sunteti autentificat.",
      "You've been logged out by the server. Please log in again.": "Ați fost deconectat de către server rugam sa va logati din nou.",
      "Your session has expired. Please log in again.": "Sesiunea a expirat rugam sa va logati din nou.",
      "No matching login attempt found": "Autentificare nereusită",
      "Password is old. Please reset your password.": "Parola expirata, Vă rugăm să resetati parola.",
      "Incorrect password": "Parola incorectă",
      "Invalid email": "E-mail invalid",
      "Must be logged in": "Trebuie sa fii logat",
      "Need to set a username or email": "Adaugati un nume utilizator sau un e-mail",
      "old password format": "Parola cu format vechi",
      "Password may not be empty": "Parola nu poate fi gol",
      "Signups forbidden": "Înscrieri interzisă",
      "Token expired": "Token expirat",
      "Token has invalid email address": "Token are adresă de email invalidă",
      "User has no password set": "Utilizator nu are parola setată",
      "User not found": "Utilizator nu a fost găsit",
      "Verify email link expired": "Link-ul de e-mail a expirat",
      "Verify email link is for unknown address": "Link-ul de e-mail nu corespunde",
      "Match failed": "Potrivire nereușită",
      "Unknown error": "Eroare necunoscută"
    }
  }
};

T9n.map("ro", ro);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/ru.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var ru;

ru = {
  add: "добавить",
  and: "и",
  back: "назад",
  changePassword: "Сменить пароль",
  choosePassword: "Придумайте пароль",
  clickAgree: "Нажав на Регистрация вы соглашаетесь с условиями",
  configure: "Конфигурировать",
  createAccount: "Создать аккаунт",
  currentPassword: "Текущий пароль",
  dontHaveAnAccount: "Нет аккаунта?",
  email: "Email",
  emailAddress: "Email",
  emailResetLink: "Отправить ссылку для сброса",
  forgotPassword: "Забыли пароль?",
  ifYouAlreadyHaveAnAccount: "Если у вас уже есть аккаунт",
  newPassword: "Новый пароль",
  newPasswordAgain: "Новый пароль (еще раз)",
  optional: "Необязательно",
  OR: "ИЛИ",
  password: "Пароль",
  passwordAgain: "Пароль (еще раз)",
  privacyPolicy: "Политики безопасности",
  remove: "Удалить",
  resetYourPassword: "Сбросить пароль",
  setPassword: "Установить пароль",
  sign: "Подпись",
  signIn: "Войти",
  signin: "войти",
  signOut: "Выйти",
  signUp: "Регистрация",
  signupCode: "Регистрационный код",
  signUpWithYourEmailAddress: "Зарегистрируйтесь с вашим email адресом",
  terms: "Условиями пользования",
  updateYourPassword: "Обновить пароль",
  username: "Имя пользователя",
  usernameOrEmail: "Имя пользователя или email",
  "with": "с",
  info: {
    emailSent: "Email отправлен",
    emailVerified: "Email прошел проверку",
    passwordChanged: "Пароль изменен",
    passwordReset: "Пароль сброшен"
  },
  error: {
    emailRequired: "Email обязательно.",
    minChar: "Минимальное кол-во символов для пароля 7.",
    pwdsDontMatch: "Пароли не совпадают",
    pwOneDigit: "В пароле должна быть хотя бы одна цифра.",
    pwOneLetter: "В пароле должна быть хотя бы одна буква.",
    signInRequired: "Необходимо войти для чтобы продолжить.",
    signupCodeIncorrect: "Неправильный регистрационный код.",
    signupCodeRequired: "Необходим регистрациооный код.",
    usernameIsEmail: "Имя пользователя не может быть адресом email.",
    usernameRequired: "Имя пользователя обязательно.",
    accounts: {
      "Email already exists.": "Email уже существует",
      "Email doesn't match the criteria.": "Email не соответствует критериям.",
      "Invalid login token": "Неверный токен для входа",
      "Login forbidden": "Вход запрещен",
      "Service unknown": "Cервис неизвестен",
      "Unrecognized options for login request": "Неизвестные параметры для запроса входа",
      "User validation failed": "Проверка пользователя неудалась",
      "Username already exists.": "Пользователь существует.",
      "You are not logged in.": "Вы не вошли.",
      "You've been logged out by the server. Please log in again.": "Сервер инициировал выход. Пожалуйста войдите еще раз.",
      "Your session has expired. Please log in again.": "Ваша сессия устарела. Пожалуйста войдите еще раз.",
      "No matching login attempt found": "Не было найдено соответствующей попытки войти",
      "Password is old. Please reset your password.": "Пароль устарел. Пожалуйста сбросьте Ваш пароль.",
      "Incorrect password": "Неправильный пароль",
      "Invalid email": "Несуществующий Email",
      "Must be logged in": "Необходимо войти",
      "Need to set a username or email": "Необходимо имя пользователя или email",
      "old password format": "старый формат пароля",
      "Password may not be empty": "Пароль не может быть пустым",
      "Signups forbidden": "Регистрация отключена",
      "Token expired": "Время действия токена истекло",
      "Token has invalid email address": "У токена неправильный email адрес",
      "User has no password set": "У пользователя не установлен пароль",
      "User not found": "Пользователь не найден",
      "Verify email link expired": "Ссылка подтверждения email устарела",
      "Verify email link is for unknown address": "Ссылка подтверждения email для неизвестного адреса",
      "Match failed": "Не совпадают",
      "Unknown error": "Неизвестная ошибка"
    }
  }
};

T9n.map("ru", ru);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/sl.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var sl;

sl = {
  add: "dodaj",
  and: "in",
  back: "nazaj",
  changePassword: "Spremeni geslo",
  choosePassword: "Izberi geslo",
  clickAgree: "S klikom na Registracija se strinjaš",
  configure: "Nastavi",
  createAccount: "Nova registracija",
  currentPassword: "Trenutno geslo",
  dontHaveAnAccount: "Nisi registriran(a)?",
  email: "Email",
  emailAddress: "Email naslov",
  emailResetLink: "Pošlji ponastavitveno povezavo",
  forgotPassword: "Pozabljeno geslo?",
  ifYouAlreadyHaveAnAccount: "Če si že registriran(a),",
  newPassword: "Novo geslo",
  newPasswordAgain: "Novo geslo (ponovno)",
  optional: "Po želji",
  OR: "ALI",
  password: "Geslo",
  passwordAgain: "Geslo (ponovno)",
  privacyPolicy: "z našimi pogoji uporabe",
  remove: "briši",
  resetYourPassword: "Ponastavi geslo",
  setPassword: "Nastavi geslo",
  sign: "Prijava",
  signIn: "Prijava",
  signin: "se prijavi",
  signOut: "Odjava",
  signUp: "Registracija",
  signupCode: "Prijavna koda",
  signUpWithYourEmailAddress: "Prijava z email naslovom",
  terms: "Pogoji uporabe",
  updateYourPassword: "Spremeni geslo",
  username: "Uporabniško ime",
  usernameOrEmail: "Uporabniško ime ali email",
  "with": "z",
  info: {
    emailSent: "E-pošta poslana",
    emailVerified: "Email naslov preverjen",
    passwordChanged: "Geslo spremenjeno",
    passwordReset: "Geslo ponastavljeno"
  },
  error: {
    emailRequired: "Email je obvezen vnos.",
    minChar: "Geslo mora imeti vsaj sedem znakov.",
    pwdsDontMatch: "Gesli se ne ujemata",
    pwOneDigit: "V geslu mora biti vsaj ena številka.",
    pwOneLetter: "V geslu mora biti vsaj ena črka.",
    signInRequired: "Za to moraš biti prijavljen(a).",
    signupCodeIncorrect: "Prijavna koda je napačna.",
    signupCodeRequired: "Prijavna koda je obvezen vnos.",
    usernameIsEmail: "Uporabniško ime ne more biti email naslov.",
    usernameRequired: "Uporabniško ime je obvezen vnos.",
    accounts: {
      "Email already exists.": "Email že obstaja.",
      "Email doesn't match the criteria.": "Email ne odgovarja kriterijem.",
      "Invalid login token": "Napačen prijavni žeton",
      "Login forbidden": "Prijava ni dovoljena",
      "Service unknown": "Neznana storitev",
      "Unrecognized options for login request": "Neznane možnosti v prijavnem zahtevku",
      "User validation failed": "Preverjanje uporabnika neuspešno",
      "Username already exists.": "Uporabniško ime že obstaja",
      "You are not logged in.": "Nisi prijavljen(a).",
      "You've been logged out by the server. Please log in again.": "Odjavljen(a) si s strežnika. Ponovi prijavo.",
      "Your session has expired. Please log in again.": "Seja je potekla. Ponovi prijavo.",
      "No matching login attempt found": "Prijava ne obstaja",
      "Password is old. Please reset your password.": "Geslo je staro. Zamenjaj ga.",
      "Incorrect password": "Napačno geslo",
      "Invalid email": "Napačen email",
      "Must be logged in": "Moraš biti prijavljane(a)",
      "Need to set a username or email": "Prijava ali email sta obvezna",
      "old password format": "stara oblika gesla",
      "Password may not be empty": "Geslo ne sme biti prazno",
      "Signups forbidden": "Prijave onemogočene",
      "Token expired": "Žeton je potekel",
      "Token has invalid email address": "Žeton vsebuje napačen email",
      "User has no password set": "Uporabnik nima gesla",
      "User not found": "Uporabnik ne obstaja",
      "Verify email link expired": "Povezava za potrditev je potekla",
      "Verify email link is for unknown address": "Povezava za potrditev vsebuje neznan naslov",
      "Match failed": "Prijava neuspešna",
      "Unknown error": "Neznana napaka"
    }
  }
};

T9n.map("sl", sl);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/sv.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var sv;

sv = {
  add: "lägg till",
  and: "och",
  back: "tillbaka",
  changePassword: "Ändra lösenord",
  choosePassword: "Välj lösenord",
  clickAgree: "När du väljer att skapa ett konto så godkänner du också vår",
  configure: "Konfigurera",
  createAccount: "Skapa ett konto",
  currentPassword: "Nuvarande lösenord",
  dontHaveAnAccount: "Har du inget konto?",
  email: "E-postadress",
  emailAddress: "E-postadress",
  emailResetLink: "Återställningslänk för e-post",
  forgotPassword: "Glömt ditt lösenord?",
  ifYouAlreadyHaveAnAccount: "Om du redan har ett konto",
  newPassword: "Nytt lösenord",
  newPasswordAgain: "Nytt lösenord (upprepa)",
  optional: "Valfri",
  OR: "ELLER",
  password: "Lösenord",
  passwordAgain: "Lösenord (upprepa)",
  privacyPolicy: "integritetspolicy",
  remove: "ta bort",
  resetYourPassword: "Återställ ditt lösenord",
  setPassword: "Välj lösenord",
  sign: "Logga",
  signIn: "Logga in",
  signin: "logga in",
  signOut: "Logga ut",
  signUp: "Skapa konto",
  signupCode: "Registreringskod",
  signUpWithYourEmailAddress: "Skapa ett konto med din e-postadress",
  terms: "användarvillkor",
  updateYourPassword: "Uppdatera ditt lösenord",
  username: "Användarnamn",
  usernameOrEmail: "Användarnamn eller e-postadress",
  "with": "med",
  info: {
    emailSent: "E-post skickades",
    emailVerified: "E-post verifierades",
    passwordChanged: "Lösenordet har ändrats",
    passwordReset: "Återställ lösenordet"
  },
  error: {
    emailRequired: "Det krävs en e-postaddress.",
    minChar: "Det krävs minst 7 tecken i ditt lösenord.",
    pwdsDontMatch: "Lösenorden matchar inte.",
    pwOneDigit: "Lösenordet måste ha minst 1 siffra.",
    pwOneLetter: "Lösenordet måste ha minst 1 bokstav.",
    signInRequired: "Inloggning krävs här.",
    signupCodeIncorrect: "Registreringskoden är felaktig.",
    signupCodeRequired: "Det krävs en registreringskod.",
    usernameIsEmail: "Användarnamnet kan inte vara en e-postadress.",
    usernameRequired: "Det krävs ett användarnamn.",
    accounts: {
      "Email already exists.": "E-postadressen finns redan.",
      "Email doesn't match the criteria.": "E-postadressen uppfyller inte kriterierna.",
      "Invalid login token": "Felaktig login-token",
      "Login forbidden": "Inloggning tillåts ej",
      "Service unknown": "Okänd service",
      "Unrecognized options for login request": "Okända val för inloggningsförsöket",
      "User validation failed": "Validering av användare misslyckades",
      "Username already exists.": "Användarnamn finns redan.",
      "You are not logged in.": "Du är inte inloggad.",
      "You've been logged out by the server. Please log in again.": "Du har loggats ut av servern. Vänligen logga in igen.",
      "Your session has expired. Please log in again.": "Din session har gått ut. Vänligen ligga in igen.",
      "No matching login attempt found": "Inget matchande loginförsök kunde hittas",
      "Password is old. Please reset your password.": "Ditt lösenord är gammalt. Vänligen återställ ditt lösenord.",
      "Incorrect password": "Felaktigt lösenord",
      "Invalid email": "Ogiltig e-postadress",
      "Must be logged in": "Måste vara inloggad",
      "Need to set a username or email": "Ett användarnamn eller en e-postadress krävs.",
      "old password format": "gammalt lösenordsformat",
      "Password may not be empty": "Lösenordet får inte vara tomt",
      "Signups forbidden": "Registrering förbjuden",
      "Token expired": "Token har gått ut",
      "Token has invalid email address": "Token har ogiltig e-postadress",
      "User has no password set": "Användaren har inget lösenord",
      "User not found": "Användaren hittades inte",
      "Verify email link expired": "Länken för att verifera e-postadress har gått ut",
      "Verify email link is for unknown address": "Länken för att verifiera e-postadress är för en okänd adress.",
      "Match failed": "Matchning misslyckades",
      "Unknown error": "Okänt fel"
    }
  }
};

T9n.map("sv", sv);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/tr.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var tr;

tr = {
  add: "ekle",
  and: "ve",
  back: "geri",
  changePassword: "Şifre Değiştir",
  choosePassword: "Şifre Belirle",
  clickAgree: "Kayıta tıklayarak kabul etmiş olacağınız",
  configure: "Yapılandır",
  createAccount: "Hesap Oluştur",
  currentPassword: "Mevcut Şifre",
  dontHaveAnAccount: "Hesabın yok mu?",
  email: "Eposta",
  emailAddress: "Eposta Adresi",
  emailResetLink: "Email Reset Link",
  forgotPassword: "Şifreni mi unuttun?",
  ifYouAlreadyHaveAnAccount: "Zaten bir hesabın varsa",
  newPassword: "Yeni Şifre",
  newPasswordAgain: "Yeni Şifre (tekrar)",
  optional: "İsteğe Bağlı",
  OR: "VEYA",
  password: "Şifre",
  passwordAgain: "Şifre (tekrar)",
  privacyPolicy: "Gizlilik Politikası",
  remove: "kaldır",
  resetYourPassword: "Şifreni sıfırla",
  setPassword: "Şifre Belirle",
  sign: "Giriş",
  signIn: "Giriş",
  signin: "Giriş",
  signOut: "Çıkış",
  signUp: "Kayıt",
  signupCode: "Kayıt Kodu",
  signUpWithYourEmailAddress: "Eposta adresin ile kaydol",
  terms: "Kullanım Şartları",
  updateYourPassword: "Şifreni güncelle",
  username: "Kullanıcı adı",
  usernameOrEmail: "Kullanıcı adı veya şifre",
  "with": "için",
  info: {
    emailSent: "Eposta iletildi",
    emailVerified: "Eposta doğrulandı",
    passwordChanged: "Şifre değişti",
    passwordReset: "Şifre sıfırlandı"
  },
  error: {
    emailRequired: "Eposta gerekli.",
    minChar: "En az 7 karakterli şifre.",
    pwdsDontMatch: "Şifreler uyuşmuyor",
    pwOneDigit: "Şifre en az bir rakam içermeli.",
    pwOneLetter: "Şifre bir harf gerektiriyor.",
    signInRequired: "Bunun için önce giriş yapmış olmalısın.",
    signupCodeIncorrect: "Kayıt kodu hatalı.",
    signupCodeRequired: "Kayıt kodu gerekli.",
    usernameIsEmail: "Kullanıcı adı bir eposta adresi olamaz.",
    usernameRequired: "Kullanıcı adı gerekli.",
    accounts: {
      "Email already exists.": "Eposta zaten kayıtlı.",
      "Email doesn't match the criteria.": "Eposta kriterleri karşılamıyor.",
      "Invalid login token": "Geçersiz giriş işaretçisi",
      "Login forbidden": "Girişe izin verilmiyor",
      "Service unknown": "Servis tanınmıyor",
      "Unrecognized options for login request": "Giriş isteği için tanınmayan seçenekler",
      "User validation failed": "Kullanıcı doğrulama başarısız",
      "Username already exists.": "Kullanıcı adı zaten kayıtlı.",
      "You are not logged in.": "Kullanıcı girişi yapmadın.",
      "You've been logged out by the server. Please log in again.": "Sunucu tarafından çıkarıldın. Lütfen tekrar kullanıcı girişi yap.",
      "Your session has expired. Please log in again.": "Oturumun zaman aşımına uğradı. Lütfen tekrar kullanıcı girişi yap.",
      "No matching login attempt found": "Eşleşen bir giriş teşebbüsü bulunamadı",
      "Password is old. Please reset your password.": "Şifre eski. Lütfen şifreni sıfırla.",
      "Incorrect password": "Hatalı şifre",
      "Invalid email": "Hatalı eposta",
      "Must be logged in": "Giriş yapmış olmalısın",
      "Need to set a username or email": "Kullanıcı adı veya eposta tanımlamalısın",
      "old password format": "eski şifre biçimi",
      "Password may not be empty": "Şifre boş bırakılamaz",
      "Signups forbidden": "Kayıt yapmaya izin verilmiyor",
      "Token expired": "İşaretçinin süresi geçti",
      "Token has invalid email address": "İşaretçide geçersiz eposta adresi var",
      "User has no password set": "Kullanıcının şifresi tanımlanmamış",
      "User not found": "Kullanıcı bulunamadı",
      "Verify email link expired": "Eposta doğrulama bağlantısı zaman aşımına uğradı",
      "Verify email link is for unknown address": "Eposta doğrulama bağlantısı bilinmeyen bir adres içeriyor",
      "Match failed": "Eşleşme başarısız",
      "Unknown error": "Bilinmeyen hata"
    }
  }
};

T9n.map("tr", tr);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/uk.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var uk;

uk = {
  add: "додати",
  and: "та",
  back: "назад",
  changePassword: "Змінити пароль",
  choosePassword: "Придумайте пароль",
  clickAgree: "Натиснувши на Реєстрація ви погоджуєтеся з умовами",
  configure: "Налаштувати",
  createAccount: "Створити аккаунт",
  currentPassword: "Діючий пароль",
  dontHaveAnAccount: "Немає аккаунта?",
  email: "Email",
  emailAddress: "Email",
  emailResetLink: "Отримати посилання для оновлення паролю",
  forgotPassword: "Забули пароль?",
  ifYouAlreadyHaveAnAccount: "Якщо у вас вже є аккаунт:",
  newPassword: "Новий пароль",
  newPasswordAgain: "Новий пароль (ще раз)",
  optional: "Необов’язково",
  OR: "АБО",
  password: "Пароль",
  passwordAgain: "Пароль (ще раз)",
  privacyPolicy: "Політики безпеки",
  remove: "Видалити",
  resetYourPassword: "Відновити пароль",
  setPassword: "Встановити пароль",
  sign: "Підпис",
  signIn: "Увійти",
  signin: "увійти",
  signOut: "Вийти",
  signUp: "Зареєструватися",
  signupCode: "Реєстраційний код",
  signUpWithYourEmailAddress: "Зареєструйтесь з вашою email адресою",
  terms: "Умовами користування",
  updateYourPassword: "Оновити пароль",
  username: "Ім’я користувача",
  usernameOrEmail: "Ім’я користувача або email",
  "with": "з",
  info: {
    emailSent: "Email відправлено",
    emailVerified: "Email пройшов перевірку",
    passwordChanged: "Пароль змінено",
    passwordReset: "Пароль скинуто"
  },
  error: {
    emailRequired: "Email є обов’язковим.",
    minChar: "Мінімальна кіл-ть символів для паролю 7.",
    pwdsDontMatch: "Паролі не співпадають",
    pwOneDigit: "Пароль повинен містити хоча б одну цифру.",
    pwOneLetter: "Пароль повинен містити хоча б одну букву.",
    signInRequired: "Для продовження необхідно увійти.",
    signupCodeIncorrect: "Невірний реєстраційний код.",
    signupCodeRequired: "Необхідний реєстраційний код.",
    usernameIsEmail: "Ім’я користувача не може бути email адресою.",
    usernameRequired: "Ім’я користувача є обов’язковим.",
    accounts: {
      "Email already exists.": "Email вже існує",
      "Email doesn't match the criteria.": "Email відповідає критеріям.",
      "Invalid login token": "Невірний токен для входу",
      "Login forbidden": "Вхід заборонено",
      "Service unknown": "Невідомий сервіс",
      "Unrecognized options for login request": "Невідомі параметри для запиту входу",
      "User validation failed": "Перевірка користувача не вдалася",
      "Username already exists.": "Користувач існує.",
      "You are not logged in.": "Ви не ввійшли.",
      "You've been logged out by the server. Please log in again.": "Сервер ініціював вихід. Будь ласка увійдіть ще раз.",
      "Your session has expired. Please log in again.": "Ваша сесія застаріла. Будь ласка увійдіть ще раз.",
      "No matching login attempt found": "Не було знайдено відповідної спроби увійти",
      "Password is old. Please reset your password.": "Пароль застарів. Будь ласка, скиньте Ваш пароль.",
      "Incorrect password": "Невірний пароль",
      "Invalid email": "Неіснуючий Email",
      "Must be logged in": "Необхідно увійти",
      "Need to set a username or email": "Необхідно ім’я користувача або email",
      "old password format": "старий формат паролю",
      "Password may not be empty": "Пароль не може бути пустим",
      "Signups forbidden": "Реєстрацію відключено",
      "Token expired": "Час дії токена вичерпано",
      "Token has invalid email address": "Невірна email адреса для токена",
      "User has no password set": "У користувача не встановлено пароль",
      "User not found": "Користувач не знайдений",
      "Verify email link expired": "Посилання підтвердження email застаріло",
      "Verify email link is for unknown address": "Посилання підтвердження email для невідомої адреси",
      "Match failed": "Не співпадають",
      "Unknown error": "Невідома помилка"
    }
  }
};

T9n.map("uk", uk);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/vi.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var vi;

vi = {
  add: "thêm",
  and: "và",
  back: "trở lại",
  changePassword: "Đổi mật khẩu",
  choosePassword: "Chọn một mật khẩu",
  clickAgree: "Bằng cách nhấn vào Đăng ký, bạn đã đồng ý với",
  configure: "Cấu hình",
  createAccount: "Tạo Tài khoản",
  currentPassword: "Mật khẩu hiện tại",
  dontHaveAnAccount: "Chưa có tài khoản?",
  email: "Email",
  emailAddress: "Địa chỉ Email",
  emailResetLink: "Gửi",
  forgotPassword: "Quên mật khẩu?",
  ifYouAlreadyHaveAnAccount: "Nếu bạn đã có tài khoản",
  newPassword: "Mật khẩu mới",
  newPasswordAgain: "Mật khẩu mới (nhập lại)",
  optional: "Tùy chọn",
  OR: "Hoặc",
  password: "Mật khẩu",
  passwordAgain: "Mật khẩu (nhập lại)",
  privacyPolicy: "Chính sách bảo mật",
  remove: "xóa",
  resetYourPassword: "Lấy lại mật khẩu",
  setPassword: "Thiết lập mật khẩu",
  sign: "Ký",
  signIn: "Đăng nhập",
  signin: "đăng nhập",
  signOut: "Đăng xuất",
  signUp: "Đăng ký",
  signupCode: "Mã đăng ký",
  signUpWithYourEmailAddress: "Đăng ký với email của bạn",
  terms: "Điều khoản sử dụng",
  updateYourPassword: "Cập nhật mật khẩu",
  username: "Tên đăng nhập",
  usernameOrEmail: "Tên đăng nhập hoặc email",
  "with": "với",
  info: {
    emailSent: "Email đã được gửi đi!",
    emailVerified: "Email đã được xác minh",
    passwordChanged: "Đã đổi mật khẩu",
    passwordReset: "Lất lại mật khẩu"
  },
  error: {
    emailRequired: "Email phải có.",
    minChar: "Mật khẩu phải có ít nhất 7 ký tự.",
    pwdsDontMatch: "Mật khẩu không giống nhau",
    pwOneDigit: "Mật khẩu phải có ít nhất 1 chữ số.",
    pwOneLetter: "Mật khẩu phải có 1 ký tự chữ.",
    signInRequired: "Phải đăng nhập.",
    signupCodeIncorrect: "Mã số đăng ký sai.",
    signupCodeRequired: "Phải có mã số đăng ký.",
    usernameIsEmail: "Tên đăng nhập không thể là địa chỉ email.",
    usernameRequired: "Phải có tên đăng nhập.",
    accounts: {
      "A login handler should return a result or undefined": "Bộ xử lý đăng nhập phải trả về một kết quả hoặc undefined",
      "Email already exists.": "Email đã tồn tại.",
      "Email doesn't match the criteria.": "Email không phù hợp.",
      "Invalid login token": "Mã đăng nhập không đúng",
      "Login forbidden": "Đăng nhập bị cấm",
      "Service unknown": "Chưa biết Dịch vụ",
      "Unrecognized options for login request": "Tùy chọn không được công nhận đối với yêu cầu đăng nhập",
      "User validation failed": "Xác nhận người dùng thất bại",
      "Username already exists.": "Tên đăng nhập đã tồn tại.",
      "You are not logged in.": "Bạn chưa đăng nhập.",
      "You've been logged out by the server. Please log in again.": "Bạn đã bị đăng xuất bởi máy chủ. Vui lòng đăng nhập lại.",
      "Your session has expired. Please log in again.": "Thời gian đăng nhập đã hết. Vui lòng đăng nhập lại.",
      "No matching login attempt found": "Không tìm thấy đăng nhập phù hợp",
      "Password is old. Please reset your password.": "Mật khẩu đã cũ. Vui lòng lấy lại mật khẩu.",
      "Incorrect password": "Mật khẩu sai",
      "Invalid email": "Email sai",
      "Must be logged in": "Phải đăng nhập",
      "Need to set a username or email": "Phải điền tên đăng nhập hoặc email",
      "old password format": "định dạng mật khẩu cũ",
      "Password may not be empty": "mật khẩu không được để trống",
      "Signups forbidden": "Đăng ký đã bị cấm",
      "Token expired": "Hết phiên đăng nhập",
      "Token has invalid email address": "Phiên đăng nhập chứa địa chỉ email sai",
      "User has no password set": "Người dùng chưa có mật khẩu",
      "User not found": "Không tìm thấy người dùng",
      "Verify email link expired": "Đường dẫn xác nhận email đã hết hạn",
      "Verify email link is for unknown address": "Đường dẫn xác nhận email là cho địa chỉ chưa xác định",
      "Match failed": "Không đúng",
      "Unknown error": "Lỗi chưa được biết"
    }
  }
};

T9n.map("vi", vi);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/no_NB.coffee.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var no_NB;

no_NB = {
  add: "legg til",
  and: "og",
  back: "tilbake",
  changePassword: "Bytt passord",
  choosePassword: "Velg passord",
  clickAgree: "Ved å klikke meld på godtar du vår",
  configure: "Konfigurer",
  createAccount: "Oprett konto",
  currentPassword: "Nåværende passord",
  dontHaveAnAccount: "Har du ikke en konto?",
  email: "E-post",
  emailAddress: "E-postadresse",
  emailResetLink: "Epost nullstillingslenke",
  forgotPassword: "Glemt passord?",
  ifYouAlreadyHaveAnAccount: "Hvis du allerede har en konto",
  newPassword: "Nytt passord",
  newPasswordAgain: "Gjengi nytt passord",
  optional: "Frivillig",
  OR: "eller",
  password: "Passord",
  passwordAgain: "Gjengi passord",
  privacyPolicy: "Personvern",
  remove: "fjern",
  resetYourPassword: "Nullstill passord",
  setPassword: "Sett passord",
  sign: "Logg",
  signIn: "Logg inn",
  signin: "Logg inn",
  signOut: "Logg ut",
  signUp: "Meld på",
  signupCode: "Påmeldingskode",
  signUpWithYourEmailAddress: "Meld på med din e-postadresse",
  terms: "Betingelser for bruk",
  updateYourPassword: "Oppdater passord",
  username: "Brukernavn",
  usernameOrEmail: "Brukernavn eller e-epost",
  "with": "med",
  info: {
    emailSent: "E-post sendt",
    emailVerified: "E-post bekreftet",
    passwordChanged: "Passord endret",
    passwordReset: "Passord nullstillt"
  },
  error: {
    emailRequired: "E-post obligatorisk.",
    minChar: "Passordet må ha minst 7 tegn.",
    pwdsDontMatch: "Passordene er ikke like.",
    pwOneDigit: "Passordet må ha minst ett tall.",
    pwOneLetter: "Passordet må ha minst en bokstav.",
    signInRequired: "Du må være logget inn for å gjøre dette.",
    signupCodeIncorrect: "Påmelding gikk galt.",
    signupCodeRequired: "Påmeldingskode kreves.",
    usernameIsEmail: "Brukernavn kan ikke være en e-postadresse.",
    usernameRequired: "Brukernavn må utfylles.",
    accounts: {
      "Email already exists.": "E-postadressen finnes allerede.",
      "Email doesn't match the criteria.": "E-postadressen møter ikke kriteriet.",
      "Invalid login token": "Ugyldig innloggingstegn",
      "Login forbidden": "Innlogging forbudt",
      "Service unknown": "Ukjent tjeneste",
      "Unrecognized options for login request": "Ukjendte valg ved innloggingsforsøk",
      "User validation failed": "Brukergodkjenning gikk galt",
      "Username already exists.": "Brukernavnet finnes allerede.",
      "You are not logged in.": "Du er ikke logget inn.",
      "You've been logged out by the server. Please log in again.": "Tjeneren loggt deg ut. Logg inn på ny.",
      "Your session has expired. Please log in again.": "Din økt er utløpt. Logg inn på ny.",
      "No matching login attempt found": "Fant ingen samsvarende innloggingsførsøk",
      "Password is old. Please reset your password.": "Passordet er for gammelt. Nullstill passordet ditt.",
      "Incorrect password": "Feil passord",
      "Invalid email": "Ugyldig e-postadresse",
      "Must be logged in": "Du må være innlogget",
      "Need to set a username or email": "Oppgi brukernavn eller e-postadresse",
      "old password format": "gammelt passordformat",
      "Password may not be empty": "Passord må være utfyllt",
      "Signups forbidden": "Påmeldinger ikke tillatt",
      "Token expired": "Økten er utløpt",
      "Token has invalid email address": "Innloggingstegnet har ugyldig e-postadresse",
      "User has no password set": "Brukeren har ikke angitt passord",
      "User not found": "Bruker ikke funnet",
      "Verify email link expired": "Lenke for e-postbekreftelse er utløpt",
      "Verify email link is for unknown address": "Lenke for e-postbekreftelse er for en ukjent adresse",
      "Match failed": "Ikke samsvar",
      "Unknown error": "Ukjent feil"
    }
  }
};

T9n.map("no_NB", no_NB);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/nl.coffee.js                                                                 //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var nl;

nl = {
  add: "toevoegen",
  and: "en",
  back: "terug",
  changePassword: "Wachtwoord wijzigen",
  choosePassword: "Wachtwoord kiezen",
  clickAgree: "Door te registreren accepteer je onze",
  configure: "Configureren",
  createAccount: "Account aanmaken",
  currentPassword: "Huidige wachtwoord",
  dontHaveAnAccount: "Nog geen account?",
  email: "E-mail",
  emailAddress: "E-mailadres",
  emailResetLink: "Verzenden",
  forgotPassword: "Wachtwoord vergeten?",
  ifYouAlreadyHaveAnAccount: "Heb je al een account?",
  newPassword: "Nieuwe wachtwoord",
  newPasswordAgain: "Nieuwe wachtwoord (herhalen)",
  optional: "Optioneel",
  OR: "OF",
  password: "Wachtwoord",
  passwordAgain: "Wachtwoord (herhalen)",
  privacyPolicy: "privacy verklaring",
  remove: "verwijderen",
  resetYourPassword: "Wachtwoord resetten",
  setPassword: "Wachtwoord instellen",
  sign: "Aanmelden",
  signIn: "Aanmelden",
  signin: "aanmelden",
  signOut: "Afmelden",
  signUp: "Registreren",
  signupCode: "Registratiecode",
  signUpWithYourEmailAddress: "Met e-mailadres registreren",
  terms: "gebruiksvoorwaarden",
  updateYourPassword: "Wachtwoord actualiseren",
  username: "Gebruikersnaam",
  usernameOrEmail: "Gebruikersnaam of e-mailadres",
  "with": "met",
  info: {
    emailSent: "E-mail verzonden",
    emailVerified: "E-mail geverifieerd",
    PasswordChanged: "Wachtwoord gewijzigd",
    PasswordReset: "Wachtwoord gereset"
  },
  error: {
    emailRequired: "E-mailadres is verplicht",
    minChar: "Wachtwoord moet tenminste 7 tekens lang zijn.",
    pwdsDontMatch: "Wachtwoorden zijn niet gelijk.",
    pwOneDigit: "Wachtwoord moet tenminste 1 cijfer bevatten.",
    pwOneLetter: "Wachtwoord moet tenminste 1 letter bevatten.",
    signInRequired: "Je moet aangemeld zijn.",
    signupCodeIncorrect: "Registratiecode is ongeldig.",
    signupCodeRequired: "Registratiecode is verplicht.",
    usernameIsEmail: "Gebruikersnaam is gelijk aan e-mail.",
    usernameRequired: "Gebruikersnaam is verplicht.",
    accounts: {
      "Email already exists.": "Dit e-mailadres is al in gebruik.",
      "Email doesn't match the criteria.": "e-mail voldoet niet aan de voorwaarden.",
      "Invalid login token": "Ongeldig login token",
      "Login forbidden": "Aanmelding geweigerd",
      "Service unknown": "Sevice onbekend",
      "Unrecognized options for login request": "Onbekende optie voor login request",
      "User validation failed": "Gebruikers validatie mislukt",
      "Username already exists.": "Gebruikersnaam bestaat al.",
      "You are not logged in.": "Je bent niet ingelogd.",
      "You've been logged out by the server. Please log in again.": "Je bent door de server afgemeld. Opnieuw aanmelden svp.",
      "Your session has expired. Please log in again.": "Je sessie is verlopen. Opnieuw aanmelden svp.",
      "No matching login attempt found": "Geen overeenkomstig login verzoek gevonden.",
      "Password is old. Please reset your Password.": "Wachtwoord is verlopen. Wachtwoord resetten svp.",
      "Incorrect Password": "Onjuist wachtwoord",
      "Invalid email": "Ongeldig e-mailadres",
      "Must be logged in": "Je moet aangemeld zijn",
      "Need to set a username or email": "Gebruikersnaam of e-mailadres moet ingesteld zijn",
      "Password may not be empty": "Wachtwoord mag niet leeg zijn",
      "Signups forbidden": "Registratie verboden",
      "Token expired": "Token is verlopen",
      "Token has invalid email address": "Token heeft ongeldig e-mailadres",
      "User has no Password set": "Geen wachtwoord ingesteld voor gebruiker",
      "User not found": "Gebruiker niet gevonden",
      "Verify email link expired": "E-mail verificatie link is verlopen",
      "Verify email link is for unknown address": "E-mail verificatie link is voor onbekend e-mailadres",
      "Match failed": "Geen match",
      "Unknown error": "Onbekende fout"
    }
  }
};

T9n.map("nl", nl);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function () {

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                     //
// packages/softwarerero:accounts-t9n/t9n/zh_tw.coffee.js                                                              //
//                                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                       //
__coffeescriptShare = typeof __coffeescriptShare === 'object' ? __coffeescriptShare : {}; var share = __coffeescriptShare;
var zh_tw;

zh_tw = {
  add: "添加",
  and: "和",
  back: "返回",
  changePassword: "修改密碼",
  choosePassword: "選擇密碼",
  clickAgree: "點擊註冊, 您同意我們的",
  configure: "配置",
  createAccount: "建立帳號",
  currentPassword: "當前密碼",
  dontHaveAnAccount: "還沒有賬戶?",
  email: "電子郵箱",
  emailAddress: "電郵地址",
  emailResetLink: "電子郵件重設連結",
  forgotPassword: "忘記密碼?",
  ifYouAlreadyHaveAnAccount: "如果您已有賬戶",
  newPassword: "新密碼",
  newPasswordAgain: "新密碼 (重新輸入)",
  optional: "可選的",
  OR: "或",
  password: "密碼",
  passwordAgain: "密碼 (重新輸入)",
  privacyPolicy: "隱私政策",
  remove: "刪除",
  resetYourPassword: "重置您的密碼",
  setPassword: "設置密碼",
  sign: "登",
  signIn: "登入",
  signin: "登入",
  signOut: "登出",
  signUp: "註冊",
  signupCode: "註冊碼",
  signUpWithYourEmailAddress: "使用您的電郵地址註冊",
  terms: "使用條款",
  updateYourPassword: "更新您的密碼",
  username: "用戶名",
  usernameOrEmail: "用戶名或電子郵箱",
  "with": "與",
  info: {
    emailSent: "郵件已發送",
    emailVerified: "郵件已驗證",
    passwordChanged: "密碼已修改",
    passwordReset: "密碼重置"
  },
  error: {
    emailRequired: "必須填寫電子郵件。",
    minChar: "密碼至少需要7個字符。",
    pwdsDontMatch: "密碼不一致。",
    pwOneDigit: "密碼必須至少有一位數字。",
    pwOneLetter: "密碼必須至少有一位字母。",
    signInRequired: "您必須先登錄才能繼續。",
    signupCodeIncorrect: "註冊碼錯誤。",
    signupCodeRequired: "必須有註冊碼。",
    usernameIsEmail: "用戶名不能為電郵地址。",
    usernameRequired: "必須有用戶名。",
    accounts: {
      "Email already exists.": "電郵地址已被使用。",
      "Email doesn't match the criteria.": "電郵地址不符合條件。",
      "Invalid login token": "無效的登錄令牌",
      "Login forbidden": "禁止登錄",
      "Service unknown": "未知服務",
      "Unrecognized options for login request": "無法識別的登錄請求選項",
      "User validation failed": "用戶驗證失敗",
      "Username already exists.": "用戶名已經存在。",
      "You are not logged in.": "您尚未登入。",
      "You've been logged out by the server. Please log in again.": "你已被伺服器登出，請重新登入。",
      "Your session has expired. Please log in again.": "您的協定已過期，請重新登入。",
      "No matching login attempt found": "沒有找到匹配的登入請求",
      "Password is old. Please reset your password.": "密碼是舊的。請重置您的密碼。",
      "Incorrect password": "密碼不正確",
      "Invalid email": "無效的電子郵件",
      "Must be logged in": "必須先登入",
      "Need to set a username or email": "必須設置用戶名或電郵地址",
      "old password format": "舊密碼格式",
      "Password may not be empty": "密碼不能為空的",
      "Signups forbidden": "註冊被禁止",
      "Token expired": "密匙過期",
      "Token has invalid email address": "密匙具有無效的電郵地址",
      "User has no password set": "用戶沒有設置密碼",
      "User not found": "找不到用戶",
      "Verify email link expired": "驗證電郵連結已過期",
      "Verify email link is for unknown address": "驗證電郵連結是未知的地址",
      "Match failed": "匹配失敗",
      "Unknown error": "未知錯誤"
    }
  }
};

T9n.map("zh_tw", zh_tw);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['softwarerero:accounts-t9n'] = {
  T9n: T9n
};

})();

//# sourceMappingURL=softwarerero_accounts-t9n.js.map
