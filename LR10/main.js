
var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');
var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

for (var i = 1; i <= 5; i++) {

  var newImage = document.createElement('img');

  newImage.setAttribute('src', 'images/pic' + i + '.jpg');

  thumbBar.appendChild(newImage);

  newImage.onclick = function(e) {

    var imgSrc = e.target.getAttribute('src');
  
    displayedImage.setAttribute('src', imgSrc);
  };
}

btn.onclick = function() {

  var currentClass = btn.getAttribute('class');
  
  if (currentClass === 'dark') {
 
    btn.setAttribute('class', 'light');
    btn.textContent = 'Світліше';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)'; 
  } else {
  
    btn.setAttribute('class', 'dark');
    btn.textContent = 'Темніше';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)'; 
  }
};