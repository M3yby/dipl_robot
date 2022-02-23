var scene, robot;
var keys, locks;
var robotCopyModel, armatureCopy;
var stats;
var fps = 0;
var socket = io();
const loader = new THREE.GLTFLoader();
let example = new THREE.Object3D();
loader.load( "3dmodel/body/kpi3.gltf", gltf => {
          console.log(gltf);
          const scene = gltf.scene 
} );

AFRAME.registerComponent('manager', {
  schema: {
    robotCopy: {type: 'selector', default: ""},
    raycaster: {type: 'selector', default: ""}
  },
  init: function () {
    robot = this.el;
    console.log(robot);
    stats = new Stats();
    console.log(socket);
    let robotCopy = this.data.robotCopy;
    let raycaster = this.data.raycaster;
    robot.addEventListener('model-loaded', function () {
      initRealRobot();
    })
    
    robotCopy.addEventListener('model-loaded', function () {
      robotCopyModel = robotCopy.components["gltf-model"].model;
      
      scene = robotCopyModel.parent.parent;
      for(let i = 0; i < robotCopyModel.children.length; i++){
        if(robotCopyModel.children[i].name == "Armature")
          armatureCopy = robotCopyModel.children[i];
      }

      armatureCopy.traverse(child => {
        if (child.isBone) {
          console.log(child.name);
        }
        if(child instanceof THREE.Mesh){
          child.castShadow = true;
          child.receiveShadow = true;
        }
      })
      setRobot(armatureCopy);
    })


    
  },


  tick: function () {
    stats.begin();
}


});

AFRAME.registerComponent("cam-switch", {
  init: function() {
    console.log("cams");
    var robotCam = document.querySelector("#rig2");
    var observerCam = document.querySelector("#playerhead");
    var observer = document.querySelector("#rig");
    var robot = document.querySelector("#robot");
    var body = document.querySelector("#fullbody");
    // var thirdCameraEl = document.querySelector("#first-camera");
    document.addEventListener("keyup", e => {
      if (e.which === 49) {
        robotCam.setAttribute("camera", "active", true);
        observerCam.setAttribute("camera", "active", false);
        robotCam.setAttribute("look-controls", "enabled", true);
        observerCam.setAttribute("look-controls", "enabled", false);
        observer.setAttribute("wasd-controls", "enabled", false);
        robot.setAttribute("movement-controls", "enabled", true);
        observer.setAttribute("movement-controls", "enabled", false);
        body.setAttribute("movement-controls", "enabled", false);
        // robotcam.setAttribute('rotation', {x: 0, y: 90, z: 0})
      }
    });
    document.addEventListener("keyup", e => {
      if (e.which === 50) {
        robotCam.setAttribute("camera", "active", false);
        observerCam.setAttribute("camera", "active", true);
        observerCam.setAttribute("look-controls", "enabled", true);
        robotCam.setAttribute("look-controls", "enabled", false);   
        robot.setAttribute("movement-controls", "enabled", false);
        body.setAttribute("movement-controls", "enabled", true);
      }
    });
  }
});