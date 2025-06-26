//tło intro
VANTA.DOTS({
    el: "#intro",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    size: 8.3,
    spacing: 44.0,
    showLines: false,
  });
//automatyczny scroll
  let container = document.getElementById("container");
  let anchor = document.getElementById("title1");
  document.onwheel = function (e) {
    if (e.deltaY > 0 && window.scrollY == 0) {
      container.parentNode.scrollTo({
        top: anchor.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  };
