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
//点击跳转
const codeLoginBtn = document.getElementById('code-login-btn');
const passwordLoginBtn = document.getElementById('password-login-btn');

codeLoginBtn.addEventListener('click', () => {
  // 点击验证码登录按钮时跳转到指定链接1
  window.location.href = '验证码/index.html';
});

passwordLoginBtn.addEventListener('click', () => {
  // 点击密码登录按钮时跳转到指定链接2
  window.location.href = '密码/index.html';
});