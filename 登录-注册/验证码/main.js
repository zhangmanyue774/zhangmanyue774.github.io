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
  var code_number = " ";
  var getCode = document.getElementById('get-code'); // 获取获取验证码按钮
  var countDownNum = 60; // 倒计时时间设为 60s
	
  getCode.addEventListener('click', function() {
    var self = this;
	if (!regex.test(phoneInput.value)) {
	     alert('请输入合法手机号码'); // 手机号码不合法时弹窗提示
	     return;
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
  //登录事件
  const login = document.getElementById('login_lo');
  
  login.addEventListener('click',function(){
	  const agreeCheckbox = document.getElementById('agreement');//获取复选框
	  const phone_value = document.getElementById('phone').value;//获取手机号
	  const code = document.getElementById('code').value;
	  if (!agreeCheckbox.checked) {
	  	  alert('请勾选同意协议');
	  	  return;
	  	}
		if(!phone_value){
			alert("手机号码不能为空！");
			return;
		}
		// 检查LocalStorage中是否已经存在该用户名或手机号
		const usersJson = localStorage.getItem('users');
		let users = usersJson ? JSON.parse(usersJson) : [];
		const exists = users.findIndex(user => user.phone === phone_value);
		if (exists) {
		  if(code != code_number)
		  {
			  if(!code){
				  alert("验证码不能为空！");
				  return;
			  }
			  alert("验证码输入错误，请重新输入！");
			  return;
		  }
		  else{
		  localStorage.setItem('userid', exists);//用户序号（当前用户信息快速获取）
		  localStorage.setItem('login_state',1);//页面登录状态
		  alert("登录成功！点击跳转")
		  window.location.href="../../播放页/index.html";
		}
		}
		else{
			alert("用户不存在!");
			location.reload();
			return;
			}
	});
	//禁用输入框历史下拉框
	var form = document.getElementsByTagName('form')[0];
	form.autocomplete = 'off';