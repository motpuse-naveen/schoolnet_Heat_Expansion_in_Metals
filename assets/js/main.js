//Basic Template initialise start
// copper - incremental of 1
// iron - incremental of 9
// brass - incremental of 2
// bronze - incremental of 1
var noOfSlides;
var slides = document.getElementsByClassName("Slides");
var slideIndex = 1;
var currentslide;
var metalBall = "";
var metalBallD = "";
let timer;
let ballDiameter = "2";
let incremental = 0;
let copperVal = 0.000001;
let ironVal = 0.000009;
let brassVal = 0.000002;
let bronzeVal = 0.000001;
let metalVal = 0;
let settimerV = '';
let coolTimerS = false;
let heatTimerS = false;
let resetClicked = false;

var showSlides = function () {
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  currentslide = slides[slideIndex - 1];
  slides[slideIndex - 1].style.display = "block";
}
//Basic Template initialise ends

//Observation Tab scroll
$(document).on('click', '#downScroller', function () {
  $('#contentsName').css('top', '-177px')
  $('#upScroller').css('display', 'block')
});

$(document).on('click', '#upScroller', function () {
  $('#contentsName').css('top', '33px')
});


//File close Func
$(document).on('click', '#closeBtn', function () {
  window.close();
});

//Worksheet Func starts
$('#workSheetDiv').on('click', function () {
  $('#file-input').trigger('click');
});
function OpenWord() {
  var mylink = document.getElementById("MyLink");
  mylink.setAttribute("href", "assets/docs/heat_expansion_word.doc");
  mylink.click();
}
//Worksheet Func ends

$(document).ready(function () {
  showSlides(slideIndex);
});

$('.mettalBall').on('click', function () {
  resetClicked = true;
  metalBall = $(this).attr('class').split(/\s+/)[1].replace('Div', '');
  metalBallD = metalBall;
  $('.mettalBall').css('opacity', '1');
  $(this).css('opacity', '0.5');
  $('.mettalBallPlaceholder').css({ 'background-image': 'url(assets/images/' + metalBall + '.png)' });
});

$('.burnerDiv').on('click', function () {
  if (!heatTimerS) {
    if (metalBall != "") {
      if (resetClicked == true) {
        $('.ballDiameterText').text("2");
        resetClicked = false;
      }
      heatTimerS = true;
      clearInterval(timer);
      $('.flameDiv').css('display', 'block');
      $('.mettalBall').css('pointer-events', 'none');
      heatTimer();
    } else {
      $('.flameDiv,.threshold').css('display', 'none');
      clearInterval(timer);
      if ($('.ballDiameterText').text() >= 2.000020) {
        $('.resetDiv').css('display', 'block');
        coolTimer();
      }
    }
  } else {
    heatTimerS = false;
    $('.flameDiv,.threshold').css('display', 'none');
    clearInterval(timer);
    if ($('.ballDiameterText').text() > 2.000020) {
      coolTimer();
    }
  }
});

var leftarray = [];
var toparray = [];
var element = (document.querySelectorAll(".dragelem"));
elementid = [];
var dragelem = (document.querySelectorAll(".dragelem"));
for (var i = 0; i < element.length; i++) {
  elementid.push(element[i].id);
  toparray.push(parseInt($(dragelem[i]).css("top")));
  leftarray.push(parseInt($(dragelem[i]).css("left")));
}
var click = {};
var beforeNum = 188;

$('.dragStandDiv').draggable({
  start: function (e, ui) {
    click.x = e.clientX;
    click.y = e.clientY;
  },
  drag: function (e, ui) {
    var original = ui.originalPosition;
    var last = (e.pageX - click.x + original.left) / zoom;
    var last1 = (e.pageY - click.y + original.top) / zoom;
    if (last1.toFixed(0) > 169 && metalBallD != "") {
      $('.dragStandDiv').css('background-image', 'url(assets/images/dragStand2.png)');
    } else {
      $('.dragStandDiv').css('background-image', 'url(assets/images/dragStand.png)');
    }
    if ($('.ballDiameterText').text() >= 2.000020) {
      beforeNum = 175;
    } else {
      beforeNum = 188;
    }
    if (last1.toFixed(0) <= beforeNum) {
      ui.position = {
        left: 13,
        top: last1
      };
    } else {
      ui.position = {
        left: 13,
        top: beforeNum
      };
    }
    if (last1 <= 65) {
      ui.position = {
        left: 13,
        top: 65
      };
    }
    if ($('.ballDiameterText').text() >= 2.000020 && !coolTimerS && last1 > 160) {
      $('.threshold').css('display', 'block');
    }
  },
  stop: function () {

    $(this).css({ 'top': '115px', 'right': '7px' });
    $('.dragStandDiv').css('background-image', 'url(assets/images/dragStand.png)');
  },
});



let coolTimer = function () {
  if ($('.ballDiameterText').text().length > 0) {
    coolTimerS = true;
    $('.burnerDiv').css('pointer-events', 'none');
    $('.threshold').css('display', 'none');
    if (metalBallD == "copper") {
      metalBallVal = 0.000002;
    } else if (metalBallD == "iron") {
      metalBallVal = 0.000003;
    } else if (metalBallD == "brass") {
      metalBallVal = 0.000002;
    } else {
      metalBallVal = 0.000002;
    }
    ballDiameter = $('.ballDiameterText').text();
    let ballDiaCool = (parseFloat(ballDiameter) - parseFloat(metalBallVal)).toFixed(6);
    if (ballDiaCool <= 2.000000) {
      ballDiaCool = 2.000000;
    }
    $('.ballDiameterText').text(ballDiaCool);
    if (ballDiaCool > 2.00000) {
      settimerV = setTimeout(() => {
        coolTimer();
      }, 1000);
    }
  } else {
    $('.ballDiameterText').text('');
  }
}

let totalSeconds = 0;
let heatTimer = function () {
  timer = setInterval(() => {
    totalSeconds += 20;
    var minutes = pad(parseInt(totalSeconds / 60));
    var seconds = pad((totalSeconds % 60));
    if (minutes < 60) {
      if (metalBallD == "bronze") {
        if (minutes + ":" + seconds == "10:00" || minutes + ":" + seconds == "08:00") {
          ballDia_incr(eval(metalBallD + 'Val'));
        }
        if (totalSeconds % 40 == 0) {
          ballDia_incr(eval(metalBallD + 'Val'));
        }
      } else {
        ballDia_incr(eval(metalBallD + 'Val'));
      }

    } else {
      clearInterval(timer);
      minutes = pad(0);
      heatTimer();
    }
    $('.clockText').text(minutes + ":" + seconds);
  }, 1000);
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}


let ballDia_incr = function (metalBallVal) {
  incremental += metalBallVal;
  let ballDia = (parseFloat(ballDiameter) + parseFloat(incremental)).toFixed(6);
  if (metalBallD == "iron" && ballDia == 2.000009) {
    ballDia = 2.000008;
    incremental = 0.000008;
  }
  if (ballDia > 2.000019) {
    heatTimerS = null;
    metalBall = "";
  }
  $('.ballDiameterText').text(ballDia);
}

$('.resetDiv').on('click', function () {
  metalBallD = "";
  metalBall = "";
  ballDiameter = "2";
  totalSeconds = 0;
  incremental = 0;
  coolTimerS = false;
  resetClicked = false;
  $('.burnerDiv').css('pointer-events', 'all');
  $('.clockText').text("00:00");
  $('.ballDiameterText').text('');
  $('.threshold,.resetDiv').css('display', 'none');
  $('.mettalBallPlaceholder').css({ 'background-image': 'none' });
  $('.mettalBall').css({ 'opacity': '1', 'pointer-events': 'all' });
});

var procedCount = 1;
$('.prevProcd').on('click', function () {
  if (procedCount > 2) {
    procedCount--;
    $('.prevProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
    $('.nextProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
  } else {
    procedCount = 1;
    $('.prevProcd').css({ 'opacity': '0.5', 'pointer-events': 'none' });
  }
  $('.showObj,.showObjTxt').css('display', 'block');
  $('.procedSteps').css('display', 'none');
  $('.procedSteps' + procedCount).css('display', 'block');
  $('.procdNum').text(procedCount + ")");
});
$('.nextProcd').on('click', function () {
  if (procedCount < 5) {
    procedCount++;
    $('.nextProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
    $('.prevProcd').css({ 'opacity': '1', 'pointer-events': 'all' });
    $('.showObj,.showObjTxt').css('display', 'block');
  } else {
    procedCount = 6;
    $('.showObj,.showObjTxt').css('display', 'none');
    $('.nextProcd').css({ 'opacity': '0.5', 'pointer-events': 'none' });
  }
  $('.procedSteps').css('display', 'none');
  $('.procedSteps' + procedCount).css('display', 'block');
  $('.procdNum').text(procedCount + ")");
});

$('.closeProcd').on('mouseover', function () {
  $('.closeProcd').addClass('closeProcdAfter');
  $('.closeProcd').removeClass('closeProcdBefore');
  $('.closeProcd').attr('src', 'assets/images/closeProd.gif').css('cursor', 'pointer');
});
$('.closeProcd').on('mouseout', function () {
  $('.closeProcd').addClass('closeProcdBefore');
  $('.closeProcd').removeClass('closeProcdAfter');
  $('.closeProcd').attr('src', 'assets/images/closeUp.png');
});

$('.procdClick').on('mouseover', function () {
  $('.procdClick').attr('src', 'assets/images/procdHover.gif');
  $('.procdClick').css('cursor', 'pointer');
});
$('.procdClick').on('mouseout', function () {
  $('.procdClick').attr('src', 'assets/images/procdClick.png');
});

$('.procdClick').on('click', function () {
  $(this).css('display', 'none');
  $('.procdAnim').attr('src', 'assets/images/procedure.gif').css('display', 'block');
  setTimeout(() => {
    $('.mainProcdiv').css('display', 'block');
  }, 3800);
});

$('.closeProcd').on('click', function () {
  $('.mainProcdiv').css('display', 'none');
  $('.procdAnim').attr('src', 'assets/images/closeProcdiv.gif').css('display', 'block');
  setTimeout(() => {
    $('.procdClick').css('display', 'block');
    $('.procdAnim').css('display', 'none');
  }, 1900);
});

$('.closeProcd').on('mouseover', function () {
  $('.closeProcdTxt').css('display', 'block');
});

$('.closeProcd').on('mouseout', function () {
  $('.closeProcdTxt').css('display', 'none');
});

$('.showObj').on('mouseover', function () {
  $(this).attr('src', 'assets/images/showObj.gif').css('cursor', 'pointer');
  if (procedCount == 1) {
    $('.mettalBall').css('opacity', '1');
    $('.ballText, .ballDiameterDiv, .timerDiv, .burnerDiv, .standDiv, .dragStandDiv, .mettalBallPlaceholder, .mettalBallText, .flameDiv, .resetDiv').css('opacity', '0.3');
  }
  if (procedCount == 2) {
    $('.burnerDiv, .flameDiv').css('opacity', '1');
    $('.ballText, .ballDiameterDiv, .timerDiv, .standDiv, .dragStandDiv, .mettalBallText, .mettalBallPlaceholder, .mettalBall, .resetDiv').css('opacity', '0.3');
  }
  if (procedCount == 3 || procedCount == 5) {
    $('.dragStandDiv').css('opacity', '1');
    $('.ballText, .ballDiameterDiv, .timerDiv, .standDiv, .burnerDiv, .mettalBallText,.mettalBallPlaceholder, .mettalBall, .flameDiv, .resetDiv').css('opacity', '0.3');
  }
  if (procedCount == 4) {
    $('.burnerDiv, .timerDiv, .flameDiv').css('opacity', '1');
    $('.ballText, .ballDiameterDiv, .standDiv, .dragStandDiv, .mettalBallText,.mettalBallPlaceholder, .mettalBall, .resetDiv').css('opacity', '0.3');
  }
  if (procedCount == 6) {
    $('.resetDiv').css('opacity', '1');
    $('.ballText, .ballDiameterDiv, .timerDiv, .burnerDiv, .standDiv, .dragStandDiv,.mettalBallPlaceholder, .mettalBall, .mettalBallText, .flameDiv').css('opacity', '0.3');
  }
});

$('.showObj').on('mouseout', function () {
  $(this).attr('src', 'assets/images/showObjM.gif');
  $('.ballText, .ballDiameterDiv, .timerDiv, .burnerDiv, .standDiv, .dragStandDiv, .mettalBall,.mettalBallPlaceholder, .mettalBallText, .flameDiv, .resetDiv').css('opacity', '1');
});