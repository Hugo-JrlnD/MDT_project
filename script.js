import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
//import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Fetch the canvas element created in index.html, replace 'canvas' with the id of your canvas
const canvas = document.getElementById('canvas');

// Create a WebGLRenderer and set its width and height
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // Antialiasing is used to smooth the edges of what is rendered
    antialias: true,
    // Activate the support of transparency
    //alpha: true
});

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );

const controls = new OrbitControls(camera, canvas);
camera.position.set(4.18,15,30);
camera.lookAt(new THREE.Vector3(4.18, 15, 0));

window.addEventListener('resize', () => {
    // Update the camera
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

const textureLoader = new THREE.TextureLoader();

/*const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );*/

// Adding a background
/*let textureEquirec = textureLoader.load( 'brown_photostudio_01.jpg' );
textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
textureEquirec.colorSpace = THREE.SRGBColorSpace;

scene.background = textureEquirec;*/

// IMPORTATION MODELISATION MUR VEGETAL 

var mtlLoader = new MTLLoader();
let plateforme = undefined;
mtlLoader.load("Plateforme.mtl", function(materials)
{
    materials.preload();
    var objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("Plateforme.obj", function(object)
    {    
        plateforme = object;
        plateforme.scale.set(0.01, 0.01, 0.01);
        plateforme.rotation.x = - Math.PI / 2;
        scene.add( plateforme );
    });
});

var mtlLoader2 = new MTLLoader();
let cache_mecanisme = undefined;
mtlLoader2.load("Cache_Mecanisme.mtl", function(materials)
{
    materials.preload();
    var objLoader2 = new OBJLoader();
    objLoader2.setMaterials(materials);
    objLoader2.load("Cache_Mecanisme.obj", function(object)
    {    
        cache_mecanisme = object;
        cache_mecanisme.position.z = 5;
        cache_mecanisme.scale.set(0.01, 0.01, 0.01);
        cache_mecanisme.rotation.x = - Math.PI / 2; 
        scene.add( cache_mecanisme );
    });
});

var mtlLoader3 = new MTLLoader();
let modules;
mtlLoader3.load("Modules.mtl", function(materials)
{
    materials.preload();
    var objLoader3 = new OBJLoader();
    objLoader3.setMaterials(materials);
    objLoader3.load("Modules.obj", function(object)
    {    
        modules = object;
        modules.position.set(0.5,22.5,-2.3);
        modules.scale.set(0.01, 0.01, 0.01);

        scene.add( modules );
    });
});


// PARQUET + MURS + PLAFOND
// PARQUET
const geometry = new THREE.BoxGeometry( 100, 1, 40 );
const texture = new THREE.TextureLoader().load( "wood_planks_diff_4k.jpg" );
const material = new THREE.MeshBasicMaterial( {
  color: 0xffffff,
  map: texture
} );
const parquet = new THREE.Mesh( geometry, material );
parquet.position.set(4.5,-0.8,15.5);
scene.add( parquet );

// MURS
const geometry_mur1 = new THREE.BoxGeometry( 46.5, 1, 30.5 );
const texture_mur1 = new THREE.TextureLoader().load( "concrete_floor_02_diff_4k.jpg" );
const material_mur1 = new THREE.MeshBasicMaterial( {
  color: 0xffffff,
  map: texture_mur1
} );
const mur1 = new THREE.Mesh( geometry_mur1, material_mur1 );
mur1.position.set(-22.2,15,-4);
mur1.rotation.x = - Math.PI / 2; 
scene.add( mur1 );

const geometry_mur2 = new THREE.BoxGeometry( 46.5, 1, 30.5 );
const texture_mur2 = new THREE.TextureLoader().load( "concrete_floor_02_diff_4k.jpg" );
const material_mur2 = new THREE.MeshBasicMaterial( {
  color: 0xffffff,
  map: texture_mur2
} );
const mur2 = new THREE.Mesh( geometry_mur2, material_mur2 );
mur2.position.set(31,15,-4);
mur2.rotation.x = - Math.PI / 2; 
scene.add( mur2 );

const geometry_mur3 = new THREE.BoxGeometry( 6.8, 1, 3 );
const texture_mur3 = new THREE.TextureLoader().load( "concrete_floor_02_diff_4k.jpg" );
const material_mur3 = new THREE.MeshBasicMaterial( {
  color: 0xffffff,
  map: texture_mur3
} );
const mur3 = new THREE.Mesh( geometry_mur3, material_mur3 );
mur3.position.set(4.4,28.76,-4);
mur3.rotation.x = - Math.PI / 2; 
scene.add( mur3 );

// PLAFOND
const plafond = new THREE.Mesh(
    new THREE.BoxGeometry( 100, 1, 40 ),
    new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true })
);
plafond.position.set(4.5,30,16.5);
scene.add( plafond );


// FURNITURE 
let loader = new GLTFLoader();
loader.load('modern_wooden_cabinet_4k.gltf', (gltf) => {
    const model = gltf.scene;
    model.scale.set(10, 10, 10);
    model.position.set(-20,0,0);
    scene.add(model);
})
loader.load('steel_frame_shelves_01_4k.gltf', (gltf) => {
    const model = gltf.scene;
    model.scale.set(1, 1, 1);
    model.position.set(30,0,0);
    scene.add(model);
})
loader.load('WoodenTable_02_4k.gltf', (gltf) => {
    const model = gltf.scene;
    model.scale.set(15, 15, 15);
    model.position.set(16,0,0);
    scene.add(model);
})
loader.load('fancy_picture_frame_01_4k.gltf', (gltf) => {
    const model = gltf.scene;
    model.scale.set(20, 20, 20);
    model.position.set(-20,17,-3.5);
    scene.add(model);
})
loader.load('modern_coffee_table_02_4k.gltf', (gltf) => {
    const model = gltf.scene;
    model.scale.set(10, 10, 10);
    model.rotation.y = - Math.PI;
    model.position.set(-20,0,15);
    scene.add(model);
})
loader.load('modern_ceiling_lamp_01_4k.gltf', (gltf) => {
    const model = gltf.scene;
    model.scale.set(10, 10, 10);
    model.position.set(-20,17.8,10);
    scene.add(model);
})
loader.load('modern_ceiling_lamp_01_4k.gltf', (gltf) => {
    const model = gltf.scene;
    model.scale.set(10, 10, 10);
    model.position.set(28,17.8,10);
    scene.add(model);
})
loader.load('modern_ceiling_lamp_01_4k.gltf', (gltf) => {
    const model = gltf.scene;
    model.scale.set(10, 10, 10);
    model.position.set(4,20,25);
    scene.add(model);
})
loader.load('potted_plant_01_4k.gltf', (gltf) => {
    const model = gltf.scene;
    model.scale.set(10, 10, 10);
    model.position.set(16,6,0);
    scene.add(model);
})



// LIGHTS 
const lampe_plafond1 = new THREE.PointLight( 0xffffff, 500, 0 );
lampe_plafond1.position.set( -20, 20, 10 );
scene.add( lampe_plafond1 );
const lightHelper_plafond1 = new THREE.PointLightHelper( lampe_plafond1, 1 );
scene.add( lightHelper_plafond1 );

const lampe_plafond2 = new THREE.PointLight( 0xffffff, 500, 0 );
lampe_plafond2.position.set( 28, 20, 10 );
scene.add( lampe_plafond2 );
const lightHelper_plafond2 = new THREE.PointLightHelper( lampe_plafond2, 1 );
scene.add( lightHelper_plafond2 );


const targetObject = new THREE.Object3D(); 
targetObject.position.set(4,15,0);
scene.add(targetObject);

const my_spotLight = new THREE.SpotLight( 0xffffff, 1000, 0, Math.PI/5);
my_spotLight.position.set( 4, 20, 25 );
my_spotLight.target = targetObject;
scene.add( my_spotLight );
/*const lightHelper_spot = new THREE.SpotLightHelper( my_spotLight, 1 );
scene.add( lightHelper_spot );*/ 


// BOUTONS 
const raycaster_pancarte = new THREE.Raycaster();
const raycaster_exit = new THREE.Raycaster();
let pointerPosition = { x: -1, y: -1 };
window.addEventListener('pointerup', (event) => {
    pointerPosition.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointerPosition.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
});

const bouton_vert = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 50, 20),
    new THREE.MeshStandardMaterial({ color: 0x00ff00, transparent: true })
);
bouton_vert.position.set(-4, 15, -2);
scene.add(bouton_vert);

const trait_vert = new THREE.Mesh(
    new THREE.BoxGeometry(5.5, 0.1, 0.1),
    new THREE.MeshStandardMaterial({ color: 0x00ff00, transparent: true })
);
trait_vert.position.set(-1.5, 15, -2);
scene.add(trait_vert);

const g_pancarte = new THREE.BoxGeometry( 20, 10, 0.1 );
const t_pancarte = new THREE.TextureLoader().load( "text1.jpg" );
const m_pancarte = new THREE.MeshBasicMaterial( {
  color: 0xffffff,
  map: t_pancarte,
  transparent: true
} );
const pancarte = new THREE.Mesh( g_pancarte, m_pancarte );
pancarte.position.set(-18,15,3);
pancarte.material.opacity = 0;
scene.add( pancarte );

const g_croix = new THREE.BoxGeometry( 1, 1, 0.1 );
const t_croix = new THREE.TextureLoader().load( "croix.png" );
const m_croix = new THREE.MeshBasicMaterial( {
  color: 0xffffff,
  map: t_croix,
  transparent: true
} );
const croix = new THREE.Mesh( g_croix, m_croix );
croix.position.set(-8.5,19.5,3);
croix.material.opacity = 0;
scene.add( croix );



/* ----------- The good stuff ----------- */

/*
const gui = new GUI();

// The visible property of the sphere is a boolean so this will create a checkbox
gui.add(plant_cube, 'visible').name('visible');
// We can create a folder to organize the parameters
const positionFolder = gui.addFolder( 'Position' );
// x is a number and we defined a min and a max value so this will create a slider, with a step of 1
positionFolder.add(plant_cube.position, 'x', -5, 5, 1).name('X');
// No min and max value so this will create an input field
positionFolder.add(plant_cube.position, 'y').name('Y');
// We defined an array of values so this will create a dropdown
positionFolder.add(plant_cube.position, 'z', [-5, -3, 0, 3]).name('Z');

const styleFolder = gui.addFolder( 'Style' );
// We defined a min and a max value so this will create a slider, with a step of 0.01
styleFolder.add(plant_cube.material, 'opacity', 0, 1, 0.01).name('opacity');
// wireframe is a boolean so this will create a checkbox
styleFolder.add(plant_cube.material, 'wireframe').name('wireframe');
// We will create a color picker that will update the color of the sphere
styleFolder.addColor(plant_cube.material, 'color').name('color')
*/
var cache_mecanisme_pos = 0;
var modules_pos = 0;
var mouvement_CM = 0.05;
var mouvement_mod = 0.01;

// ---------------------------------------------------------------------------------------
const animate = () => {
    
    // Call animate recursively
    requestAnimationFrame(animate);

    if (modules) {
        raycaster_pancarte.setFromCamera(pointerPosition, camera);
        const intersects_crop = raycaster_pancarte.intersectObject(bouton_vert, true);
        if (intersects_crop.length > 0) {
            camera.position.set(-10,15,20);
            camera.lookAt(new THREE.Vector3(-10, 15, 0));
            pancarte.material.opacity = 1;
            croix.material.opacity = 1;
        }
    }
    raycaster_exit.setFromCamera(pointerPosition, camera);
    const intersects_exit = raycaster_exit.intersectObject(croix, false);
    if (intersects_exit.length > 0) {
        camera.position.set(4.18,15,30);
        camera.lookAt(new THREE.Vector3(4.18, 15, 0));
        pancarte.material.opacity = 0;
        croix.material.opacity = 0;
    }
 
    if ((cache_mecanisme_pos > 10)||(cache_mecanisme_pos < 0)) mouvement_CM = - mouvement_CM;
    cache_mecanisme_pos = cache_mecanisme_pos + mouvement_CM;
    if (cache_mecanisme != undefined) cache_mecanisme.position.set(0,0,cache_mecanisme_pos);

    if ((modules_pos > 1)||(modules_pos < -1)) mouvement_mod = - mouvement_mod;
    modules_pos = modules_pos + mouvement_mod;
    if (modules != undefined) modules.position.set(modules.position.x,modules.position.y + mouvement_mod,modules.position.z);

    //controls.update();              // Update the controls
    renderer.render(scene, camera);  // Render the scene
}

// Call animate for the first time
animate();


