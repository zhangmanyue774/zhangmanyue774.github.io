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
  //svg图标返回
  var back=document.querySelector(".close-icon");
  back.addEventListener('click',function(){
	  window.location.href="../index.html";
  })
  //显示和隐藏密码
    var password = document.getElementById('password'); // 获取密码输入框
    var togglePassword = document.querySelector(".show"); // 获取眼睛图标
    var isPasswordVisible = false; // 初始时密码不可见
  
    togglePassword.addEventListener('click', function() {
      if (!isPasswordVisible) { // 如果密码不可见，则切换为可见
        password.type = 'text';
        togglePassword.src = '../../image/图标/ic_menu_item_hide.svg';
        isPasswordVisible = true;
      } else { // 否则切换为不可见
        password.type = 'password';
        togglePassword.src = '../../image/图标/ic_menu_item_show.svg';
        isPasswordVisible = false;
      }
    });
	//登录事件
	const login = document.getElementById('login_lo');
	
	login.addEventListener('click',function(){
		  const agreeCheckbox = document.getElementById('agreement');//获取复选框
		  const phone_value = document.getElementById('phone').value;//获取手机号
		  const password = document.getElementById('password').value;
		  if (!agreeCheckbox.checked) {
		  	  alert('请勾选同意协议');
		  	  return;
		  	}
			if(!phone_value|| !password){
						  alert('手机号或密码不能为空');
						  return;
			}
			// 检查手机号和密码是否在库中
			const usersJson = localStorage.getItem('users');
			let users = usersJson ? JSON.parse(usersJson) : [];
			const exists = users.findIndex(user => user.phone === phone_value && user.password === password);
			if (exists!== -1) {
			  localStorage.setItem('userid', exists);//用户序号（当前用户信息快速获取）
			  localStorage.setItem('login_state',1);//页面登录状态
			  alert("登录成功！点击跳转！")
			  window.location.href="../../播放页/index.html";
			}
			else{
				alert("手机号或密码错误，请重新输入");
				location.reload();
				return;
			}
		});
		//禁用输入框历史下拉框
		var form = document.getElementsByTagName('form')[0];
		form.autocomplete = 'off';
