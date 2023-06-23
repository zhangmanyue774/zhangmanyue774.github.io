let loading = document.querySelector('.loading');

function redirectToPage(url) {
  window.location.href = url;
}

document.addEventListener('click', function() {
  // 显示加载圈
  loading.style.display = 'flex';
  // 添加全局模糊效果和闪烁效果。
  document.body.classList.add('blur');
  document.body.addEventListener('animationend', () => {
    document.body.classList.remove('blur');
  }, {once: true});

  // 6秒后跳转至目标页面
  setTimeout(function(){
    redirectToPage("登录-注册/index.html");
  }, 6000);

  // 5秒后隐藏加载圈
  setTimeout(function(){
    loading.style.display = 'none';
  }, 6000);
});