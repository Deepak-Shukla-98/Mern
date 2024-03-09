import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap } from "gsap";
import "./sphere.css";

function Sphere() {
  const canvasRef = useRef();
  useEffect(() => {
    //scene
    const scene = new THREE.Scene();
    //sphere
    const geometry = new THREE.SphereGeometry(3, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: "#00fffg",
      roughness: 0.5,
    });
    //size
    let size = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    //light
    const light = new THREE.PointLight("#ffffff", 20, 100);
    light.position.set(0, 10, 10);
    light.intensity = 60;
    scene.add(light);
    //camera
    const camera = new THREE.PerspectiveCamera(
      45,
      size.width / size.height,
      0.1,
      100
    );
    camera.position.z = 20;
    scene.add(camera);
    //renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(2);
    renderer.render(scene, camera);
    // Controls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    // loop
    window.addEventListener("resize", () => {
      size.width = window.innerWidth;
      size.height = window.innerHeight;
      camera.updateProjectionMatrix();
      camera.aspect = size.width / size.height;
      renderer.setSize(size.width, size.height);
    });
    const loop = () => {
      controls.update();
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
      window.requestAnimationFrame(loop);
    };
    loop();

    //timeline
    const tl = gsap.timeline({ defaults: { duration: 1 } });
    tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { x: 1, y: 1, z: 1 });
    tl.fromTo("nav", { y: "-500%" }, { y: "-420%" });
    tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });
    //
    let mouse = false;
    let rgb = [];
    window.addEventListener("mousedown", () => (mouse = true));
    window.addEventListener("mouseup", () => (mouse = false));
    window.addEventListener("mousemove", (e) => {
      if (mouse) {
        rgb = [
          Math.round((e.pageX / size.width) * 255),
          Math.round((e.pageY / size.height) * 255),
          150,
        ];
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(mesh.material.color, {
          r: newColor.r,
          b: newColor.b,
          g: newColor.g,
        });
      }
    });
  }, []);

  return (
    <div className="container-fluid">
      <canvas ref={canvasRef}></canvas>
      <nav>
        <Link to="/home">Sphere</Link>
        <ul>
          <li>Explore</li>
          <li>Create</li>
        </ul>
      </nav>
      <h1 className="title">Give it a spin</h1>
    </div>
  );
}

export default Sphere;
