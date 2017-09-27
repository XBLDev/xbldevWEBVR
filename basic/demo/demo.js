/*!
 *
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

/* eslint-env es6 */

class Demo {

  static get CAMERA_SETTINGS () {
    return {
      viewAngle: 45,
      near: 0.1,
      far: 10000
    };
  }

  constructor () {
    this.worldWidth;
    this.worldDepth;
    this.worldHalfWidth;
    this.worldHalfDepth;
    this._data;
    this._width;
    this._height;
    this._renderer;
    this._camera;
    this._aspect;
    this._settings;
    this._box;
    this._container = document.querySelector('#container');

    this.clearContainer();
    this.createRenderer();

    this._onResize = this._onResize.bind(this);
    this._update = this._update.bind(this);
    this._onResize();

    this.createScene();
    this.createMeshes();
    this.createCamera();

    this._addEventListeners();
    requestAnimationFrame(this._update);
  }

  _update () {
    const ROTATION_VALUE = 4;
    const time = window.performance.now() * 0.0001;

    // this._box.rotation.x = Math.sin(time) * ROTATION_VALUE;
    // this._box.rotation.y = Math.cos(time) * ROTATION_VALUE;

    this._render();
  }

  _render () {
    this._renderer.render(this._scene, this._camera);
    requestAnimationFrame(this._update);
  }

  _onResize () {
    this._width = window.innerWidth;
    this._height = window.innerHeight;
    this._aspect = this._width / this._height;

    this._renderer.setSize(this._width, this._height);

    if (!this._camera) {
      return;
    }

    this._camera.aspect = this._aspect;
    this._camera.updateProjectionMatrix();
  }

  _addEventListeners () {
    window.addEventListener('resize', this._onResize);
  }

  clearContainer () {
    this._container.innerHTML = '';
  }

  createRenderer () {
    this._renderer = new THREE.WebGLRenderer();
    this._container.appendChild(this._renderer.domElement);
  }

  createCamera () {
    this._settings = Demo.CAMERA_SETTINGS;
    this._camera = new THREE.PerspectiveCamera(
        this._settings.viewAngle,
        this._aspect,
        this._settings.near,
        this._settings.far
    );

		this._camera.position.y = this.getY( this.worldHalfWidth, this.worldHalfDepth ) * 100 + 100;


  }

  createScene () {
    this._scene = new THREE.Scene();
		// this._scene.background = new THREE.Color( 0xbfd1e5 );
    
  }




  generateHeight( width, height ) 
  {
        var data = []; 
        var perlin = new ImprovedNoise();
        var size = width * height; 
        var quality = 2; 
        var z = Math.random() * 100;
        
        for ( var j = 0; j < 4; j ++ ) 
        {
          if ( j === 0 ) 
          {
            for ( var i = 0; i < size; i ++ ) 
            {
              data[ i ] = 0;
            }
          }
          for ( var i = 0; i < size; i ++ ) 
          {
						var x = i % width, y = ( i / width ) | 0;
						data[ i ] += perlin.noise( x / quality, y / quality, z ) * quality;
					}
					quality *= 4;
				}
				return data;
  }
      
	getY( x, z ) {
				return ( this._data[ x + z * this.worldWidth ] * 0.2 ) | 0;
	}


  createMeshes () {
    const WIDTH = 1;
    const HEIGHT = 1;
    const DEPTH = 1;

    // Box.
    const boxGeometry = new THREE.BoxGeometry(WIDTH, HEIGHT, DEPTH);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMaterial2 = new THREE.MeshBasicMaterial( { 
      color: 0x00ff00 , 
      side: THREE.BackSide,       
      wireframe: true,//default: true
    });


    // this._box = new THREE.Mesh(boxGeometry, boxMaterial);
    this._box = new THREE.Mesh(boxGeometry, boxMaterial2);    
    this._box.position.z = -5;

    // Room.
    const roomGeometry = new THREE.BoxGeometry(10, 2, 10, 10, 2, 10);
    const roomMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,//default: true
      opacity: 1,//default: 0.3
      transparent: false,//default: true
      side: THREE.BackSide
    });
    const material = new THREE.MeshBasicMaterial( { 
      color: 0xffff00 , 
      side: THREE.BackSide,       
      wireframe: true,//default: true
    });


    // const room = new THREE.Mesh(roomGeometry, roomMaterial);
    const room = new THREE.Mesh(roomGeometry, material);
    room.position.z = -5;

    this.worldWidth = 128;
    this.worldDepth = 128;
    this.worldHalfWidth = this.worldWidth / 2, this.worldHalfDepth = this.worldDepth / 2;



		this._data = this.generateHeight( this.worldWidth, this.worldDepth );

    const matrix = new THREE.Matrix4();
    const pxGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
    pxGeometry.attributes.uv.array[ 1 ] = 0.5;
    pxGeometry.attributes.uv.array[ 3 ] = 0.5;
    pxGeometry.rotateY( Math.PI / 2 );
    pxGeometry.translate( 50, 0, 0 );
    const nxGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
    nxGeometry.attributes.uv.array[ 1 ] = 0.5;
    nxGeometry.attributes.uv.array[ 3 ] = 0.5;
    nxGeometry.rotateY( - Math.PI / 2 );
    nxGeometry.translate( - 50, 0, 0 );
    const pyGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
    pyGeometry.attributes.uv.array[ 5 ] = 0.5;
    pyGeometry.attributes.uv.array[ 7 ] = 0.5;
    pyGeometry.rotateX( - Math.PI / 2 );
    pyGeometry.translate( 0, 50, 0 );
    const pzGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
    pzGeometry.attributes.uv.array[ 1 ] = 0.5;
    pzGeometry.attributes.uv.array[ 3 ] = 0.5;
    pzGeometry.translate( 0, 0, 50 );
    const nzGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
    nzGeometry.attributes.uv.array[ 1 ] = 0.5;
    nzGeometry.attributes.uv.array[ 3 ] = 0.5;
    nzGeometry.rotateY( Math.PI );
    nzGeometry.translate( 0, 0, -50 );
    //
    // BufferGeometry cannot be merged yet.
    const tmpGeometry = new THREE.Geometry();
    const pxTmpGeometry = new THREE.Geometry().fromBufferGeometry( pxGeometry );
    const nxTmpGeometry = new THREE.Geometry().fromBufferGeometry( nxGeometry );
    const pyTmpGeometry = new THREE.Geometry().fromBufferGeometry( pyGeometry );
    const pzTmpGeometry = new THREE.Geometry().fromBufferGeometry( pzGeometry );
    const nzTmpGeometry = new THREE.Geometry().fromBufferGeometry( nzGeometry );
        
    const ambientLight = new THREE.AmbientLight( 0xcccccc );
		this._scene.add( ambientLight );


    for ( var z = 0; z < this.worldDepth; z ++ ) {
      for ( var x = 0; x < this.worldWidth; x ++ ) {
        var h = this.getY( x, z );
        matrix.makeTranslation(
          x * 100 - this.worldHalfWidth * 100,
          h * 100,
          z * 100 - this.worldHalfDepth * 100
        );
        var px = this.getY( x + 1, z );
        var nx = this.getY( x - 1, z );
        var pz = this.getY( x, z + 1 );
        var nz = this.getY( x, z - 1 );
        tmpGeometry.merge( pyTmpGeometry, matrix );
        if ( ( px !== h && px !== h + 1 ) || x === 0 ) {
          tmpGeometry.merge( pxTmpGeometry, matrix );
        }
        if ( ( nx !== h && nx !== h + 1 ) || x === this.worldWidth - 1 ) {
          tmpGeometry.merge( nxTmpGeometry, matrix );
        }
        if ( ( pz !== h && pz !== h + 1 ) || z === this.worldDepth - 1 ) {
          tmpGeometry.merge( pzTmpGeometry, matrix );
        }
        if ( ( nz !== h && nz !== h + 1 ) || z === 0 ) {
          tmpGeometry.merge( nzTmpGeometry, matrix );
        }
      }
    }

    var geometry = new THREE.BufferGeometry().fromGeometry( tmpGeometry );
		geometry.computeBoundingSphere();


    
    var texture = new THREE.TextureLoader().load( 'textures/minecraft/atlas.png' );
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.LinearMipMapLinearFilter;

		var mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( 
      { map: texture, 
      } ) );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
    directionalLight.position.set( 1, 1, 0.5 ).normalize();
    
    
    this._scene.add( directionalLight );


		this._scene.add( mesh );

    // this._scene.add(this._box);
    // this._scene.add(room);
  }




}