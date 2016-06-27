import React, { Component, PropTypes } from 'react';

export default class TestModel extends Component  {



componentDidMount() 
                {
                 const model = this.props.model;
                 console.log(this.props);

                            var SCREEN_WIDTH = window.innerWidth;
                            var SCREEN_HEIGHT = window.innerHeight;
                            var FLOOR = -250;
                            var container;
                            var controls;
                            var camera, scene;
                            var renderer;
                            var zmesh, geometry;
                            var mouseX = 0, mouseY = 0;
                            var windowHalfX = window.innerWidth / 2;
                            var windowHalfY = window.innerHeight / 2;                          

                            document.addEventListener( 'mousemove', onDocumentMouseMove, false );

                            console.log('aaa');
                            console.log(model);
                            if(model) {
                                console.log('111');
                                init();
                                animate();    
                            }
                            
                            function init() {

                                container = document.getElementById( 'container' );
                      			camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 100000 );
                                camera.position.set( 200, -180, 800 );
                                scene = new THREE.Scene();

                                //Parameters of the lights on the scene
                 		        var light = new THREE.DirectionalLight( 0xffffff, 1 );
                                light.position.set( 0, 140, 500 );
                                light.position.multiplyScalar( 1.1 );
                                light.color.setHSL( 0.6, 0.075, 1 );
                                scene.add( light );

                                //The main object gives a place to display any models            
                   			    renderer = new THREE.WebGLRenderer( { antialias: true } );
                                renderer.setClearColor( 0xffffff );
                                renderer.setPixelRatio( window.devicePixelRatio );
                                renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
                                container.appendChild( renderer.domElement );

                                // Uploading model
                                // Controls targets  allow to move camera around model                           
                                var loader = new THREE.JSONLoader();
                                var callbackMale = function ( geometry, materials ) { createScene( geometry, materials, 0, FLOOR, 0, 0 ) };
                                loader.load( '/dist/models/'+model, callbackMale );
                        
                                controls = new THREE.OrbitControls( camera, renderer.domElement );
                                controls.target.set( 0, 3000, 0 );
                                controls.addEventListener( 'change', render );
                            }

                            // Creating scene
                            // The place to display any models    
                              function createScene( geometry, materials, x, y, z, b ) {
                                zmesh = new THREE.Mesh( geometry, new THREE.MultiMaterial( materials ) );
                                zmesh.position.set( x, y, z );
                                zmesh.scale.set( 2, 2, 2 );
                                scene.add( zmesh );
                            
                            }
                            //Interactive view of models regards to speed mouse move
                                function onDocumentMouseMove( event ) {
                                mouseX = ( event.clientX - windowHalfX ) * 10;
                                mouseY = ( event.clientY - windowHalfY ) * 10;
                            }
                            //Animate the state of model to move
                                function animate() {
                                requestAnimationFrame( animate );
                                controls.update();
                                render();
                            }
                            //The main function to display model to make it visible
                            function render() {
                       
                                camera.lookAt( scene.position );
                                renderer.render( scene, camera );      
                            }     
                        }

    
  render() {       
    return (
        <div id="container"></div>
    );
  }
}



             