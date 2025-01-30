import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeDModel = ({name, fov=75, camz=5, scale=3}) => {
    const mountRef = useRef(null);
    const [error, setError] = useState(null);
    const [isInView, setIsInView] = useState(true);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            fov,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            1000
        );

        // Renderer setup with antialias for smoother edges
        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });

        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Load the model
        const loader = new GLTFLoader();
        try {
            loader.load(
                `/public/models/${name}.glb`,
                (gltf) => {
                    const model = gltf.scene;

                    // Set orange color and make the model semi-transparent
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.material = new THREE.MeshStandardMaterial({
                                color: 0x4c3219,
                                metalness: 0.5,
                                roughness: 0.5,
                                // opacity: 0.3, // Set opacity to 50%
                                // transparent: true // Enable transparency
                            });
                        }
                    });

                    // Scale the model
                    model.scale.set(scale, scale, scale);

                    // Rotate the model
                    model.rotation.x = -Math.PI / 2;
                    model.rotation.z = -Math.PI;

                    // Center the model
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    model.position.sub(center);

                    scene.add(model);

                    // Animation
                    const animate = () => {
                        if (isInView) {
                            model.rotation.z += 0.005; // Rotate around Z axis
                        }
                        renderer.render(scene, camera);
                        requestAnimationFrame(animate);
                    };
                    animate();
                },
                // Progress loading
                (xhr) => {
                    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
                },
                // Handle errors
                (error) => {
                    console.error('Error loading model:', error);
                    setError('Failed to load 3D model');
                }
            );
        } catch (err) {
            console.error('Error in model loading setup:', err);
            setError('Failed to initialize 3D viewer');
        }

        // Set camera position
        camera.position.z = camz;

        // Handle window resize
        const handleResize = () => {
            if (!mountRef.current) return;

            camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        // Intersection Observer to detect visibility
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        observer.observe(mountRef.current);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [isInView]);

    return (
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {error ? (
                <div className="absolute inset-0 flex items-center justify-center text-red-500">
                    {error}
                </div>
            ) : (
                <div
                    ref={mountRef}
                    className="absolute inset-0 w-full h-full"
                />
            )}
        </div>
    );
};

export default ThreeDModel;