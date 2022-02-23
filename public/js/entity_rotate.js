AFRAME.registerComponent("rotate-y", {
  init: function() {
    var object = this.el;
    console.log(object);
  },
  tick: function() {
    this.el.object3D.rotation.y += 0.01;
  }
});


AFRAME.registerComponent("key-input", {
  init: function() {
      document.addEventListener("keydown", event => {
      if (event.isComposing || event.keyCode === 32) { 
        this.el.setAttribute('material', 'color', 'blue');
      }
      });
    
      document.addEventListener("keyup", event => {
      if (event.isComposing || event.keyCode === 32) { 
        this.el.setAttribute('material', 'color', 'tomato');
      }
      });
  }
});


AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var box = document.querySelector("#boxanim");
    var lastIndex = -1;
    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {
      lastIndex = (lastIndex + 1) % COLORS.length;
      this.setAttribute('material', 'color', COLORS[lastIndex]);
      console.log('I was clicked at: ', evt.detail.intersection.point);
      
      box.setAttribute('material', 'color', "yellow");
    });
  }
});







