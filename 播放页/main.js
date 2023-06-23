var audio = document.getElementById("myAudio");//音乐元素
var slider = document.querySelector(".player_progress__play");//播放部分
var hidden =document.querySelector(".hidden");
var slider_after = document.querySelector(".svg_rage");//未播放部分
var playBtn = document.getElementById('play'); // 播放按钮
var coordinate = document.querySelector(".player_progress__inner");//坐标操纵以及坐标点选
var Rect = coordinate.getBoundingClientRect();//获取进度条位置属性
var state = false;//设置播放状态
var list_true = [];//记录列表
// let src = audio.getAttribute('src');//记录上次的src
var Serial_song;//实时记录播放序号
//喜欢状态
var like_state=[];
sliderupdate();
function sliderupdate(){
	// 监听音频元素的timeupdate事件，以实时更新进度条的值
	audio.addEventListener("timeupdate", function(){
	  var change_Percent = toPercent(audio.currentTime,audio.duration);
		slider.style.width = change_Percent;
		slider_after.setAttribute('width', (100 - parseFloat(change_Percent)).toFixed(6) + '%');
	});
}
playBtn.addEventListener('click', function() {
	play_state();
});
//判断播放状态
function play_state(){
	if(audio.getAttribute('src')){
	if(!state){
		//暂停状态
		audio.play();
		state = true;
		playBtn.style.background = "url('svg/暂停.svg')";
		}
	else{
		//播放状态（）
		audio.pause();
		state = false;
		playBtn.style.background = "url('svg/播放.svg')";
	}}
	else alert("当前列表无歌曲！");
};
//上一曲点击事件
var pre = document.getElementById('Pre');
pre.addEventListener("click",function(){
	preSong();
	audio.oncanplay = function() {
	  // 等待音频准备完成后，播放上歌曲
	  audio.play();
	}
});

//下一曲
var Next = document.getElementById('Next');
Next.addEventListener("click",function(){
	nextSong();
	audio.oncanplay = function() {
	  // 等待音频准备完成后，播放下一首歌曲
	  audio.play();
	}
	});
//下一曲逻辑：现在我有目前播放的序号，位置已经确定
function nextSong(){
	if(audio.getAttribute('src')){
		//不是最后一个
		if(Serial_song != list_true.length-1){
			var Serial_song_pre = Serial_song;
			Serial_song++;
			setlistcolor(Serial_song_pre,Serial_song);
			audio.setAttribute('src',list_true[Serial_song]);
			playBtn.style.background = "url('svg/暂停.svg')";
			state = true;
			setbackground(Serial_song);
			return;
		}
		else {
			var Serial_song_pre = Serial_song;
			Serial_song = 0;
			setlistcolor(Serial_song_pre,Serial_song);
			audio.setAttribute('src',list_true[Serial_song]);
			playBtn.style.background = "url('svg/暂停.svg')";
			state = true;
			setbackground(Serial_song);
			return;
		}
	}
	else alert("当前列表暂无歌曲");
	}
//上一曲逻辑：现在我有目前播放的序号，位置已经确定
function preSong(){
	if(audio.getAttribute('src')){
		//不是第一个
		if(Serial_song != 0){
			var Serial_song_pre = Serial_song;
			Serial_song--;
			setlistcolor(Serial_song_pre,Serial_song);
			audio.setAttribute('src',list_true[Serial_song]);
			playBtn.style.background = "url('svg/暂停.svg')";
			state = true;
			setbackground(Serial_song);
			return;
		}
		else {
			var Serial_song_pre = Serial_song;
			Serial_song = list_true.length-1;
			setlistcolor(Serial_song_pre,Serial_song);
			audio.setAttribute('src',list_true[Serial_song]);
			playBtn.style.background = "url('svg/暂停.svg')";
			state = true;
			setbackground(Serial_song);
			return;
		}
	}
	else alert("当前列表暂无歌曲");
}
function toPercent(currTime,allTime) {
  if (isNaN(currTime) || isNaN(allTime) || allTime === 0) {
    return 0; // 如果值不合法，返回 0
  }

  return (currTime/allTime*100).toFixed(6) + '%';
}
//进度条变化
coordinate.addEventListener("click",function(event){
  	var x = event.clientX - Rect.left;
  	var click_change = (parseFloat(toPercent(x,Rect.width))/100).toFixed(6);
	audio.currentTime = (audio.duration*click_change).toFixed(6);
	audio.play();
	playBtn.style.background = "url('svg/暂停.svg')";
	state = true;
  })
  
	//播放结束后播放下一曲
audio.addEventListener('ended', function onEnded() {
      audio.pause();
      // 更新进度条
      slider.style.width = '0';
      slider_after.setAttribute('width' , '100%');
	  nextSong();

      audio.oncanplay = function() {
        // 继续播放音频
        audio.play();
      }
	  ;})
//音乐文件路径
//进度条样式画布
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 定义波浪线相关参数
const waveWidth = 0.20; //波浪线的宽度
const waveHeight = canvas.height / 6; //波浪线的高度，为 Canvas 高度的一半
const speed = 0.2; //波浪线的速度
let offset = 0; //波浪线的偏移量，初始为0

function draw() {
  // 清除画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // 开始绘制路径
  ctx.beginPath();
  // 绘制波浪线
  ctx.moveTo(0, canvas.height / 2); // 移动到起点
  for (let x = 0; x <= canvas.width; x++) {
    // 使用sin函数计算y值
    const y = canvas.height / 2 + waveHeight * Math.sin(x * waveWidth + offset);
    // 绘制曲线段
    ctx.lineTo(x, y);
  }
  // 设置样式并绘制路径
  ctx.strokeStyle = '#1abc9c';
  ctx.lineWidth = 3.5;
  ctx.stroke();
  // 更新偏移量，使波浪线产生动效
  offset += speed;
  // 通过requestAnimationFrame方法循环调用draw函数，实现波浪线动效
  requestAnimationFrame(draw);
}
draw();
// 调用draw函数，开始绘制波浪线动效
var back_button = document.querySelector(".bottom_list");
var list = document.getElementById("Music_List");
var list_list = document.getElementById("Music_List_list");
list.addEventListener("click",function(){
	list_list.style.right = "0";
	const bodyElements = document.querySelectorAll("body > *:not(.blur-background):not(#Music_List_list)");
	bodyElements.forEach((element) => {
	  element.style.display = "none";
	});
});
back_button.addEventListener("click",function(){
	list_list.style.right = "-100%";
	const bodyElements = document.querySelectorAll("body > *:not(.blur-background):not(#Music_List_list)");
	bodyElements.forEach((element) => {
	  element.style.display = "";
	});
})
//点击非音乐列表部分，弹窗收回
 const leftWidth = window.innerWidth / 4*3;
      // 给 body 标签添加点击事件监听器
      document.body.addEventListener("click", function(event) {
        // 获取鼠标点的横坐标
        const x = event.clientX;

        // 判断鼠标点击在页面左半部分
        if (x < leftWidth) {
          // 当鼠标点击在左半部分时执行该函数
          myFunction();
        }
      });

      function myFunction() {
        list_list.style.right = "-100%";
		const bodyElements = document.querySelectorAll("body > *:not(.blur-background):not(#Music_List_list)");
		bodyElements.forEach((element) => {
		  element.style.display = "";
		});
      }
//播放器列表部分
 // 设置音乐文件所在文件夹的路径
var filePaths = ['music/BIGBANG (빅뱅) - BLUE (2015 BIGBANG WORLD TOUR_MADE_IN SEOUL LIVE VER_).ogg', 'music/BIGBANG - BAE BAE.ogg', 'music/BIGBANG - BANG BANG BANG (뱅뱅뱅).ogg', 'music/BIGBANG - FLOWER ROAD (꽃 길).ogg', 'music/BIGBANG - FXXK IT.ogg', 'music/BIGBANG - GIRLFRIEND (女朋友).ogg', 'music/BIGBANG - IF YOU.ogg', 'music/BIGBANG - LAST DANCE.ogg', "music/BIGBANG - Let's not fall in love (우리 사랑하지 말아요).ogg", 'music/BIGBANG - LOSER (失败者).ogg', 'music/BIGBANG - SOBER (清醒).ogg', 'music/BIGBANG - WE LIKE 2 PARTY.ogg', 'music/BIGBANG - 봄여름가을겨울 (Still Life).ogg', 'music/G-DRAGON (权志龙) - Window.ogg', 'music/G-DRAGON (权志龙) - 기억 만이라도 (即使只有回忆) (Live).ogg', 'music/G-DRAGON - INTRO_ 권지용 (Middle Fingers-Up).ogg', 'music/G-DRAGON - OUTRO_ 신곡 (Divina Commedia) (神曲).ogg', 'music/G-DRAGON - SUPER STAR.ogg', 'music/G-DRAGON - 개소리 (BULLSHIT).ogg', 'music/G-DRAGON - 무제 (无题) (Untitled, 2014).ogg', 'music/GD&TOP - ZUTTER (쩔어).ogg', 'music/IU (아이유) - 斑马，斑马 (Live).ogg', 'music/IU (아이유) - 至少有那天 (你的意义 中文版).ogg', 'music/ROSÉ - Gone.ogg', 'music/ROSÉ - On The Ground.ogg', 'music/TAEYANG (太阳) - Seed.ogg', 'music/陈奕迅 - 让我留在你身边.ogg','music/徐秉龙 - 白羊.mp3','music/于文文 - 体面.mp3'];
 //设置歌曲数量
 function setSongNumber(filePaths){
	var song_number = document.querySelector(".list_top_lettle");
	const spanElement = song_number.querySelector("span");
	const length = filePaths.length;
	var message = `${length} 首歌曲`;
	spanElement.textContent = message;
 }
 setlist();
 // 在按钮点击事件中执行该函数，创建列表
function setlist(){
     setSongNumber(filePaths);
     // 将该回调函数的代码放在这里
     const allname_regex = /\/([^/]+)\.[^.]+$/i;
      for (let i = 0; i < filePaths.length; i++) {
     		  //存储歌曲信息
     		  list_true[i]=filePaths[i];
			  like_state[i] = false;
     		//歌曲信息转换
     		// 匹配歌曲全名称
     		const allname = filePaths[i].match(allname_regex)[1];
     		// 匹配艺术家名称
     		const artname_regex = /^([^ ]+ [^ ]+)/i;
     		const artname = allname.match(artname_regex)[1];
     		
     		// 匹配歌曲名称（不包含艺术家名称）
     		const songname = allname.replace(`${artname} - `, "");
        // 歌单获取
          const songList = document.querySelector('.song_list');
          // 创建元素并设置属性及文本内容
          const songMessage = document.createElement('div');
          songMessage.classList.add('song_message'); // 设置 class 属性
		  songMessage.setAttribute('id',`${i}`);
     	  const divspan = document.createElement('div');//文本div
          const span1 = document.createElement('span');
          span1.textContent = songname;
          const br = document.createElement('br');
          const span2 = document.createElement('span');
          span2.textContent = artname;
		  const svgdiv = document.createElement('div');
          const div1 = document.createElement('div');
          const div2 = document.createElement('div');
          const div3 = document.createElement('div');
		  div1.style.background = 'url("svg/列表播放.svg")';
          div2.style.background = 'url("svg/列表喜欢.svg")';
          div3.style.background = 'url("svg/单曲删除.svg")';
        
          // 组合元素
     		  songList.appendChild(songMessage);
     		  songMessage.appendChild(divspan);
          divspan.appendChild(span1);
          divspan.appendChild(br);
          divspan.appendChild(span2);
     		  songMessage.appendChild(svgdiv);
          svgdiv.appendChild(div1);
          svgdiv.appendChild(div2);
          svgdiv.appendChild(div3);
      }
      audio.setAttribute('src',filePaths[0]);
      Serial_song = 0;
	  Modifyshow();
	  setlistcolor(0,0);
	  delete_song();
}
//delete清空歌单
var clear = document.getElementById("delete");
clear.addEventListener("click",function(){
	const element = document.querySelector(".song_list");
	element.innerHTML = '';
	list_true.splice(0, list_true.length);
	var song_number = document.querySelector(".list_top_lettle");
	const spanElement = song_number.querySelector('span');
	const length = list_true.length;
	var message = `${length} 首歌曲`;
	spanElement.textContent = message;
	audio.setAttribute('src','');
})
function setlistcolor(Serial_song_pre,Serial_song_new){
	var songMessage_pre = document.getElementsByClassName('song_message')[Serial_song_pre];
	var songMessage_new = document.getElementsByClassName('song_message')[Serial_song_new];
	// 获取该song_message元素下的第一个直接孩子
	var spanDiv_pre = songMessage_pre.querySelector('div:first-child');
	var spanDiv_new = songMessage_new.querySelector('div:first-child');
	//删除旧的
	spanDiv_pre.style.textShadow = "";
	spanDiv_pre.style.transform = "";
	spanDiv_pre.style.color = "";
	//添加新的
	spanDiv_new.style.textShadow = "0 2px 5px plum";
	spanDiv_new.style.transform = "scale(1.03)";
	spanDiv_new.style.color = "plum";
}
function Modifyshow(){
    var songMessages = document.getElementsByClassName("song_message");
	//span部分
    for (var i = 0; i < list_true.length; i++) {
        var firstDiv = songMessages[i].querySelector("div > div:first-child");
        // 添加闭包来保留每个i值
        spanclick(firstDiv);
    }
	//播放按钮部分
	for (var i = 0; i < list_true.length; i++) {
		//song_message的第二个孩子的第一个孩子
	    var firstDiv = songMessages[i].querySelector("div:last-child > div:first-child");
	    playclick(firstDiv);
		}
}
//span点击事件
function spanclick(firstDiv) {
	    firstDiv.addEventListener("click", function() {
	        // 访问该事件监听器所在的迭代轮次的i值
	        var index = (firstDiv.closest('.song_message')).getAttribute("id");
			//记录旧的Serial_song值
			var Serial_song_pre = Serial_song;
	        // 将i值赋值给Serial_song变量
	        Serial_song = index;
	
			setbackground(Serial_song);
			audio.pause();
			audio.setAttribute("src",list_true[Serial_song]);
			setlistcolor(Serial_song_pre,Serial_song);
			audio.oncanplay = function() {
			  playBtn.style.background = "url('svg/暂停.svg')";
			  // 等待音频准备完成后，播放上歌曲
			  audio.play();
			}
	    })
	} 
//列表播放点击事件
function playclick(firstDiv) {
	        firstDiv.addEventListener("click", function() {
	            // 访问该事件监听器所在的迭代轮次的id值
	            var index = (firstDiv.closest('.song_message')).getAttribute("id");
				//记录旧的Serial_song值
				var Serial_song_pre = Serial_song;
	            // 将i值赋值给Serial_song变量
	            Serial_song = index;
		
				setbackground(Serial_song);
				audio.pause();
				audio.setAttribute("src",list_true[Serial_song]);
				setlistcolor(Serial_song_pre,Serial_song);
				audio.oncanplay = function() {
				  playBtn.style.background = "url('svg/暂停.svg')";
				  // 等待音频准备完成后，播放上歌曲
				  audio.play();
				}
	        });
	    }
//通过id判断位置版
function delete_song(){
var songMessages = document.getElementsByClassName("song_message");
  for (var i = 0; i < songMessages.length; i++) {
    var lastDiv = songMessages[i].querySelector("div:last-child > div:last-child");
	(function() {
    lastDiv.addEventListener("click", function (event) {
      event.stopPropagation(); // 阻止事件冒泡
	  // delete_song_change(index);
      var currentBox = event.target.closest('.song_message'); // 获取当前点击的 song_message 元素
	  var index_id = currentBox.getAttribute("id");//获取当前元素id
	   delete_song_change(index_id);
      var nextBox = currentBox.nextElementSibling; // 获取当前 song_message 的下元素
      if (nextBox) { // 如果下元素存在
        currentBox.parentNode.removeChild(currentBox); // 从父元素中删除当前 message
        nextBox.style.top = `${parseInt(nextBox.style.top) - parseInt(currentBox.style.height)}px`; // 将下元素顶上来
        var prevBox = nextBox.previousSibling; // 获取上元素（局部固定隐藏位置）
        while (prevBox && prevBox.className === "song_message") {
          prevBox.style.top = `${parseInt(prevBox.style.top) - parseInt(currentBox.style.height)}px`; // 将上一个兄弟元素顶上来
          currentBox = prevBox; // 更新当前 box 为已经向上移动的元素
          prevBox = currentBox.previousSibling; // 获取下一个上一个兄弟元素
        }
      }
      else {currentBox.parentNode.removeChild(currentBox); 
	  list_true
	  }// 从父元素中删除当前 message；
	  for(var i = index_id;i<songMessages.length;i++){
	  		  var top = document.getElementsByClassName("song_message")[i];
	  		  top.setAttribute('id', `${i}`);
	  }
})})();
}}
function delete_song_change(index){
	list_true.splice(index,1);
	like_state.splice(index,1);
	setSongNumber(list_true);
	if(Serial_song==index){
		Serial_song = 0;
		audio.pause();
		audio.setAttribute("src",list_true[Serial_song]);
		setlistcolor(0,0);
		setbackground(Serial_song);
		audio.oncanplay = function() {
		  playBtn.style.background = "url('svg/暂停.svg')";
		  // 等待音频准备完成后，播放上歌曲
		  audio.play();
		}
	}
	else if(Serial_song>index){
		Serial_song--;
	}
	else if(list_true.length == index){
		return;
	}
}
var img_s = document.querySelector(".image");
var img_z = document.querySelector(".blur-main");
console.log(img_z);
function setbackground(Serial_song) { 
	// 设置背景图片
	var backgroundImage = image_background[Serial_song % 11];
	img_z.style.backgroundImage = `url("${backgroundImage}")`;
    // 设置图片元素
    img_s.setAttribute("src",image_background[Serial_song%11]);
}

//播放器背景图片
var image_background=['image/BIGBANG (빅뱅)_MADE_4.jpg','image/BIGBANG_FLOWER ROAD (꽃길)_4.jpg','image/BIGBANG_MADE SERIES 《A》_4.jpg','image/BIGBANG_MADE SERIES 《D》_4.jpg','image/BIGBANG_MADE SERIES 《E》_4.jpg','image/BIGBANG_MADE SERIES 《M》_4.jpg','image/GD&TOP_MADE SERIES 《E》_4.jpg','image/G-DRAGON_KWON JI YONG (권지용)_4.jpg','image/ROSÉ_-R-_4.jpg','image/TAEYANG (太阳)_LISA (리사)_Down to Earth_4.jpg','image/陈奕迅_让我留在你身边_4.jpg'];
//是否登录的验证/以及user_song_list加载更新
const login_state = localStorage.getItem('login_state');//当前页面的登录状态（登录：1，未登录：0）
const userIndex = localStorage.getItem('userid');//当前登录用户的用户信息序号获取
const usersJson = localStorage.getItem('users'); // 从 LocalStorage 中获取用户数据
const users = usersJson ? JSON.parse(usersJson) : []; // 解析 JSON 字符串并转换为 JavaScript 对象数组
var username;
var userURL;
var userImage = document.getElementById("userURL");
var username_now = document.getElementById("username");
var back = document.getElementById("back");
console.log(login_state);
//用户信息获取
// 创建遮罩层元素
	const mask = document.createElement('div');
	mask.classList.add('mask'); // 添加 CSS 类名
	document.body.appendChild(mask);
function getUser(){
	// 监听遮罩层元素的 click 事件
	mask.addEventListener('click', function(event) {
	  if (login_state == 0) {
	    event.preventDefault();
	    event.stopPropagation();
	    alert('请先登录');
		window.location.href="../登录-注册/index.html";
	  }
	  else{ 
		  mask.parentNode.removeChild(mask);
		}
	});
}
getUser();
back.addEventListener("click",function(){
	localStorage.setItem('login_state',0);
	window.location.href="../登录-注册/index.html";
})
function setUser(){
	if (login_state == 1) {
	    username=users[userIndex].username;
	    userURL = users[userIndex].ImageURL;
	    userImage.setAttribute("src",userURL);
	    username_now.innerHTML = username;
	    back.style.background = "url('svg/tuichu.svg')";
		mask.parentNode.removeChild(mask);
}}
setUser();
