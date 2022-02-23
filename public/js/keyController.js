
const jointsEnum = {HEAD: 0 ,ROOTL: 1, ELBOWL: 2, ROOTR: 3, ELBOWR: 4};
var jointsOriginal, jointsCopy, actualJoints, activeJoint;
var robotModel, armature;
var HEAD ,ROOTL, ELBOWL, ROOTR, ELBOWR, ROOT;
function initRealRobot(){
    robotModel = robot.components["gltf-model"].model;
    scene = robotModel.parent.parent;
    
    for(let i = 0; i < robotModel.children.length; i++){
      if(robotModel.children[i].name == "Armature")
        armature = robotModel.children[i];
    }
    console.log(armature);
    setRobot(armature);
  }


  function setRobot(realModel){
    robotPosition = robot.getAttribute('position');
    let raycaster = new THREE.Raycaster();
    ROOT = realModel.children[2];
    HEAD = realModel.children[2].children[0];
    ROOTR = realModel.children[2].children[1];
    ELBOWR = realModel.children[2].children[1].children[0];
    ROOTL = realModel.children[2].children[2];
    ELBOWL = realModel.children[2].children[2].children[0];
    ROOTR.rotation.z += 2;
    activeJoint = ROOTR;
    console.log(ROOT);
    console.log(ROOTR.rotation.z,ROOTR.rotation.x,ROOTR.rotation.y);
    activeJoint.rotation.z += 0;
    activeJoint.rotation.y += 0;
    activeJoint.rotation.x += 0;
    console.log(getMouseDegrees);
  }
  
  document.addEventListener('mousemove', function(e) {
    var mousecoords = getMousePos(e);
    moveJoint(mousecoords, activeJoint, 90);
  });
  
  function getMousePos(e) {
    return { x: e.clientX, y: e.clientY };
  }

  function moveJoint(mouse, joint, degreeLimit) {
    let degrees; 
    //  console.log(joint.name);
    switch (joint.name) {
      case "Bone001":
        degrees = getMouseDegrees(mouse.x, mouse.y, 50);
        moveHead(joint, degrees);
        break;
      case "Bone002":
        degrees = getMouseDegrees(mouse.x, mouse.y, 90);
        moveRootHand(joint,degrees);
        break;
      case "Bone003":
        degrees = getMouseDegrees(mouse.x, mouse.y, 70);
        moveElbowHand(joint,degrees);
        break;
      case "Bone004":
        degrees = getMouseDegrees(mouse.x, mouse.y, 90);
        moveRootHand(joint,degrees);
        break;
      case "Bone005":
        degrees = getMouseDegrees(mouse.x, mouse.y, 70);
        moveElbowHand(joint,degrees);
        break;
      default:
        break;

    }
  }

  function moveHead(joint,degrees){
    joint.rotation.y = -THREE.Math.degToRad(degrees.x);
    joint.rotation.z = THREE.Math.degToRad(degrees.y);
  }

  function moveRootHand(joint,degrees){
    joint.rotation.y = THREE.Math.degToRad(degrees.x);
    joint.rotation.z = (-THREE.Math.degToRad(degrees.y)+1.5);
  }

  function moveElbowHand(joint,degrees){
    joint.rotation.y = THREE.Math.degToRad(degrees.x);
    joint.rotation.z = (-THREE.Math.degToRad(degrees.y)+1);
}

  $(document).ready(function() {
  $(window).keypress(function(e) {
    var code = e.which;
    console.log(code);
    switch (code) {
      case 99:
        activeJoint = HEAD;
        break;
      case 118:
        activeJoint = ROOTR;
        break;
      case 98:
        activeJoint = ELBOWR;
        break;
      case 120:
        activeJoint = ROOTL;
        break;
      case 122:
        activeJoint = ELBOWL;
        break;
      default:
        break;
    }
  });
});