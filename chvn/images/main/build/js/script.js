var SCROLL_HEIGHT = 520;

window.onload = function () {

  var slider = new loadCarousel('.carousel-type-1');
  slider.start();

  var dropdown = new dropdownChange('.chvn-dropdown .dropdown-menu  ');
  dropdown.start();
};

function loadCarousel(element) {
  this.slider = $(element);
}

loadCarousel.prototype.start = function() {
    this.slider.owlCarousel({
        items: 1,
        nav: true,
        loop: true,
        autoplay: true,
        navText: ['<span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span>', '<span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span>']
    });
};
// loadCarousel.prototype.start = function() {
//   this.slider.owlCarousel({
//     items: 1,
//     loop: true,
//     nav: true,
//     navText: ['<i class="glyphicon glyphicon-menu-left"></i>', '<i class="glyphicon glyphicon-menu-right"></i>']
//   });
// };

function dropdownChange(element) {
  this.dropdown = document.querySelectorAll(element);
}

dropdownChange.prototype.start = function() {
  for(var i=0; i < this.dropdown.length; i+=1) {
    var dropdownEvent = this.dropdown[i].querySelectorAll("li a");
    var scroll = this.dropdown[i].querySelectorAll('.scrollable-menu');
    var btnScroll = this.dropdown[i].querySelectorAll('.scroll');
    var scrollDropdown = this.dropdown[i].querySelector('ul');
    
    this.loadScrollDropdown(scrollDropdown, btnScroll);

    for(var j=0; j< dropdownEvent.length; j+=1) {
      dropdownEvent[j].onclick = this.event.bind(this);
    }

    for(var j=0; j< scroll.length; j+=1) {
      scroll[j].onscroll = this.onScroll.bind(this);
    }

    for(var j=0; j< btnScroll.length; j+=1) {
      btnScroll[j].onclick = this.scrollEvent.bind(this);
    }
  }
}

dropdownChange.prototype.loadScrollDropdown = function(scrollDropdown, btnScroll) {
  var scrollHeight = scrollDropdown.offsetHeight;
  var node = btnScroll;

    var elem = document.getElementById("dropdown-menu-fixheight");
    if(elem) {
        SCROLL_HEIGHT = elem.getAttribute("data-height");
        elem.style.maxHeight = SCROLL_HEIGHT + "px";
    }

  if (scrollHeight > SCROLL_HEIGHT) {
    for(var i=0; i < node.length; i++) {
      node[i].classList.remove('disabled');
    }
  } else {
    for(var i=0; i < node.length; i++) {
      node[i].classList.add('disabled');
    }
  }
}

dropdownChange.prototype.removeClass = function(element) {
  var node = element.querySelectorAll("li");
  for(var i=0; i < node.length; i++) {
    node[i].classList.remove('active');
  }
}

dropdownChange.prototype.event = function (e) {
  //e.stopPropagation();
  e.preventDefault();
  var target = e.target || e.srcElement;
  //var parent = target.parentNode.parentNode.parentNode;
  var parent = target.closest(".dropdown-menu");
  var btn = parent.parentNode.querySelector('.btn');
  
  btn.innerHTML = target.innerHTML;
  this.removeClass(parent);

  target.parentNode.classList.add('active');

};

dropdownChange.prototype.onScroll = function(e) {
 
}

dropdownChange.prototype.scrollEvent = function(e) {
  e.stopPropagation();
  var target = e.target;
  var scrollMenu = target.parentNode.querySelector(".scrollable-menu");
  
  if (target.classList.contains("scroll-top")) {
    scrollMenu.scrollTop = scrollMenu.scrollTop - 100;
  } else {
    scrollMenu.scrollTop = scrollMenu.scrollTop + 100;
  }
}

