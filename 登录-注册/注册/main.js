//点击修改背景色
const header = document.querySelector('.header');
const body = document.querySelector('body');
let isPurple = true;

body.addEventListener('click', function() {
    const gradient = isPurple ? 'to bottom right, #8d6da1, #6badd0' : 'to bottom right, #6badd0, #8d6da1';
    header.style.background = `linear-gradient(${gradient})`;
    body.style.background = `linear-gradient(${gradient})`;
    isPurple = !isPurple;
});
//控件功能
//实时检测手机输入框
    var phoneInput = document.getElementById("phone");
    var regex = /^1[3456789]\d{9}$/; //手机号码正则表达式

    phoneInput.addEventListener("input", function() {
        var phoneNumber = this.value;  // 获取输入框内的手机号码
        var errorMsg = document.getElementById("error-msg");
		
		if(phoneNumber ==""){
			errorMsg.style.display = "none";
			this.style.border = "";
		}
        else if (!regex.test(phoneNumber)) {  // 判断手机号码是否符合格式
            errorMsg.style.display = "block";
            this.style.border = "1px solid red"; // 显示输入框边框样式
        } 
		else {
            errorMsg.style.display = "none";
			this.style.border = "";
        }
    });
	//获取验证码
var code_number = ' ';
var getCode = document.getElementById('get-code'); // 获取获取验证码按钮
var countDownNum = 60; // 倒计时时间设为 60s
getCode.addEventListener('click', function() {
  var self = this;
  var imageInput = document.getElementById('image_code');
  var username = document.getElementById('username');
  var imageValue = imageInput.value.toLowerCase(); // 转换为小写字母形式
  if(!username.value){
	  alert('请输入完整信息');
	  return;
  }
  if (!regex.test(phoneInput.value)) {
    alert('请输入合法手机号码'); // 手机号码不合法时弹窗提示
    return;
  }
  if (imageValue != img_code.toLowerCase()) { // 比较图形验证码输入值与正确值是否相等
    alert('图形验证码输入不正确'); // 如果不相等则提示错误信息
    return; // 并返回，不执行后续代码
  }
  
  var phoneNumber = phoneInput.value; 
  self.innerText = '获取验证码（'+ countDownNum +'s）'; // 按钮文本及倒计时时间
  self.disabled = true; // 禁用按钮
  self.style.marginRight= "0" ;
  self.style.transform = 'scale(1.05)'; // 恢复按钮大小
  
  var countDownInterval = setInterval(function() {
    countDownNum -= 1; // 每秒时间减 1
	if (countDownNum === 50) { // 在倒计时到 50 秒时执行生成随机验证码的代码
	      // 生成随机验证码并填充到输入框中
	      var randomNumber = Math.floor(Math.random() * 90000) + 10000; // 生成 5 位随机数
	      var smsCodeInput = document.getElementById('code');
	      smsCodeInput.value = randomNumber; // 将随机数填充到验证码输入框中
		  code_number = smsCodeInput.value;
	    }
    if (countDownNum === 0) {
      clearInterval(countDownInterval); // 倒计时结束，清除 interval
      self.innerText = '获取验证码'; // 恢复按钮文本
      self.disabled = false; // 恢复按钮可用
    } else {
      self.innerText = '获取验证码（'+ countDownNum +'s）'; // 更新按钮文本及倒计时时间
    }
  }, 1000);
});
  //svg图标返回
  var back=document.querySelector(".close-icon");
  back.addEventListener('click',function(){
	  window.location.href="../index.html";
  })
  //图形验证码
  var img_code = ' ';//用于保存图形文本信息
  var captcha = {
    canvas: null,
    ctx: null,
    width: 100,
    height: 40,
    codeLen: 5,
    codeSet: 'AB0123456789CDEFGHJKMNPQRSTUVWXYZab0123456789cdefghkmnpqrst0123456789uvwxyz',
    code: '',
    init: function() {
      // 获取canvas元素和上下文对象
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');

      // 设置canvas尺寸
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      // 添加canvas元素到容器中
      const captchaBox = document.getElementById('image_im');
      captchaBox.appendChild(this.canvas);

      // 生成验证码文本
      this.generateCode();

      // 绘制验证码图片
      this.drawCaptcha();

      // 监听“刷新”按钮
      document.getElementById('image_im').addEventListener('click', function() {
        captcha.reset();
        captcha.generateCode();
        captcha.drawCaptcha();
      });
    },
    generateCode: function() {
      // 生成验证码文本
      var code = '';
      for (var i = 0; i < this.codeLen; i++) {
        var index = Math.floor(Math.random() * this.codeSet.length);
        code += this.codeSet.charAt(index);
      }
      this.code = code;
	  img_code = this.code;
    },
    drawCaptcha: function() {
      const self = this;

      // 绘制噪点
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          if (Math.random() < 0.05) {
            this.ctx.fillStyle = this.randomColor(0, 50);
            this.ctx.beginPath();
            this.ctx.arc(i + 0.5, j + 0.5, 1, 0, Math.PI * 2);
            this.ctx.fill();
          }
        }
      }

      // 绘制验证码文本
      setTimeout(() => {
        self.ctx.font = 'bold 24px Arial';
        self.ctx.textAlign = 'center';
        self.ctx.textBaseline = 'middle';

        const codeArray = self.code.split('');
        let index = 0;

        const fillTextWithDelay = () => {
          if (index < codeArray.length) {
            // 显示下一个字符
            self.ctx.fillStyle = self.randomColor(20, 60);
            const char = codeArray[index];
            const x = (self.width / (self.codeLen + 1)) * (index + 1);
            const y = self.height / 2;
            self.ctx.fillText(char, x, y);

            // 递归调用自身，继续显示下一个字符
            index++;
            setTimeout(fillTextWithDelay, 100); // 每个字符显示的间隔为100毫秒
          } else {
            // 覆盖部分噪点
            for (let i = 0; i < self.width; i++) {
              for (let j = 0; j < self.height; j++) {
                if (Math.random() < 0.1) {
                  self.ctx.clearRect(i, j, 1, 1);
                }
              }
            }
          }
        };

        fillTextWithDelay();
      }, 500);
    },
    randomColor: function(min, max) {
      var r = Math.floor(Math.random() * (max - min + 1)) + min;
      var g = Math.floor(Math.random() * (max - min + 1)) + min;
      var b = Math.floor(Math.random() * (max - min + 1)) + min;
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    },
    reset: function() {
      // 清空canvas
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.code = '';
    }
  };

  captcha.init();
  //用户名已存在检测测
  var username_input = document.getElementById('username');
  
  username_input.addEventListener('input', function() {
	var errorMsg_usename = document.getElementById("error-msg_user");
	var username = username_input.value;
    const usersJson = localStorage.getItem('users');
    let users = usersJson ? JSON.parse(usersJson) : [];
    const exists = users.some(user => user.username === username);
    if (exists) {
		errorMsg_usename.style.display = "block";
		this.style.border = "1px solid red";
    }
	else{
		errorMsg_usename.style.display = "none";
		this.style.border = "";
	}
  });
  //密码强弱输入检测
var passwordInput = document.getElementById('password_1');
var pwdStrengthBox = document.getElementById('pwd-strength-box');

passwordInput.addEventListener('input', function() {
  var pwdStrength = checkPasswordStrength(this.value);

  if (this.value === '') { // 如果输入框的值为空
    pwdStrengthBox.className = ''; // 则清空密码强度显示元素的类名
    return; // 并返回，不执行以下的代码
  }
  
  if (pwdStrength === 0) {
    pwdStrengthBox.className = 'pwdbad';
  } else if (pwdStrength === 1) {
    pwdStrengthBox.className = 'pwdnormal';
  } else {
    pwdStrengthBox.className = 'pwdfull';
  }
});

function checkPasswordStrength(pwd) {
  var level = 0;
  if (/[a-zA-Z]/.test(pwd)) level++;
  if (/[0-9]/.test(pwd)) level++;
  if (/[\W]/i.test(pwd)) level++;
  if (pwd.length < 6) level = 0;
  else if (pwd.length < 12) level = level === 3 ? 2 : level;
  else level = 3;
  return level;
}
//储存注册信息
// 注册信息存储
const ImageURLs = ['头像/mmexport1687425264607.jpg','头像/4b2a5d95ac5dd98c.jpg','头像/6f34820d6acaec85.jpg','头像/7d685ae54efdfb1.jpg','头像/-33f33c3e3d46203d.jpg','头像/98a020df7f99921.jpg','头像/98a020df7f99921.jpg','头像/mmexport1687424122578.png'];
const registerBtn = document.getElementById('login_lo');

registerBtn.addEventListener('click', () => {
  const agreeCheckbox = document.getElementById('agreement');//获取复选框
  // 获取表单中各个输入框的值
  const username = document.getElementById('username').value;
  const phone = document.getElementById('phone').value;
  const image_code= document.getElementById('image_code').value;
  const code = document.getElementById('code').value;
  const password_1 = document.getElementById('password_1').value;
  const password = document.getElementById('password_2').value;
  ImageURL = ImageURLs[Math.floor(Math.random() * 8)];//随机获取默认头像

  //判断复选框是否选中
  if (!agreeCheckbox.checked) {
	  alert('请勾选同意协议');
	  return;
	}
  // 判断各个值是否为空
  if (!username || !phone || !image_code || !code || !password || !password_1) {
	alert('请填写完整信息！');
	return;
  }
  else {
	  if (code != code_number) {
	        alert("验证码输入错误！");
	  	  return;
	      }
	  else if (password != password_1) {
	        alert("两次密码输入不相同");
	        return;
	      }
  }

  // 检查LocalStorage中是否已经存在该用户名或手机号
  const usersJson = localStorage.getItem('users');
  let users = usersJson ? JSON.parse(usersJson) : [];
  const exists = users.some(user => user.phone === phone);
  if (exists) {
    alert('该手机号已经被注册！');
	location.reload();
    return;
  }
  // 自动生成id
  const id = Math.floor(10000 + Math.random() * 90000);
  // 将信息存储在对象中
  const user = {
    id,
    vip: false,
    username,
    phone,
    password,
	ImageURL,
	user_songlist:[]
  };

  // 将用户信息追加到数组中
  users.push(user);

  // 将数组转换为JSON格式，并存储在本地存储中
  localStorage.setItem('users', JSON.stringify(users));

  alert("注册成功，点击跳转登录页面");
  window.location.href = "../index.html";
});
//密码不一致对比
var passwordInput = document.getElementById("password_2");//取得密码2输入框
    passwordInput.addEventListener("input", function() {
		var password_1 = document.getElementById("password_1").value;
        var passwordValue = this.value;  // 获取输入框内的密码
        var errorMsg_paaaword = document.getElementById("error-msg_passwaod");
		if(passwordValue ==" "){
			errorMsg_paaaword.style.display = "none";
			this.style.border = "";
		}
        else if (passwordValue != password_1) {  // 判断密码是否一致
            errorMsg_paaaword.style.display = "block";
            this.style.border = "1px solid red"; // 显示输入框边框样式
        } 
		else {
            errorMsg_paaaword.style.display = "none";
			this.style.border = "";
        }
    });
	//禁用输入框历史下拉框
	var form = document.getElementsByTagName('form')[0];
	form.autocomplete = 'off';