import React, { useEffect, useRef } from 'react';

const STAR_COLORS = ['255, 255, 255', '255, 255, 255', '200, 220, 255', '255, 236, 210', '170, 240, 220'];
const MAX_STARS = 450;
const PIXELS_PER_STAR = 4200;

const rand = (min, max) => min + Math.random() * (max - min);

const makeStars = (width, height) => {
    const count = Math.min(MAX_STARS, Math.round((width * height) / PIXELS_PER_STAR));
    return Array.from({ length: count }, () => {
        const bright = Math.random() < 0.06;
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            r: bright ? rand(1.2, 1.9) : rand(0.3, 1.1),
            alpha: rand(0.35, 1),
            twinkle: rand(0.6, 2.2), // radians per second
            phase: Math.random() * Math.PI * 2,
            depth: rand(0.02, 0.12), // how far it drifts with scroll (parallax)
            color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
            bright,
        };
    });
};

const makeShootingStar = (width, height) => {
    const angle = rand(Math.PI * 0.15, Math.PI * 0.3); // heading down-left or down-right
    const leftToRight = Math.random() < 0.5;
    return {
        x: leftToRight ? rand(-0.1, 0.5) * width : rand(0.5, 1.1) * width,
        y: rand(-0.05, 0.35) * height,
        vx: Math.cos(angle) * rand(900, 1400) * (leftToRight ? 1 : -1),
        vy: Math.sin(angle) * rand(900, 1400),
        length: rand(120, 260),
        life: 0,
        maxLife: rand(0.7, 1.2), // seconds
    };
};

/**
 * Night sky for the dark theme: twinkling stars that drift a little as you scroll,
 * plus the occasional shooting star. Sits behind the page content (see _starry-night.scss).
 */
const StarryNight = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let width = 0;
        let height = 0;
        let stars = [];
        let shooting = [];
        let nextShot = rand(1, 3);
        let frame = 0;
        let last = performance.now();

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const widthChanged = window.innerWidth !== width;
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            // phones fire resize as the URL bar shows/hides; keep the same sky unless the width changed
            if (widthChanged) stars = makeStars(width, height);
        };

        const drawStars = (t) => {
            const scroll = window.scrollY;
            stars.forEach((s) => {
                const twinkle = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(t * s.twinkle + s.phase);
                const y = (((s.y - scroll * s.depth) % height) + height) % height;
                ctx.globalAlpha = s.alpha * twinkle;

                if (s.bright) {
                    const glow = ctx.createRadialGradient(s.x, y, 0, s.x, y, s.r * 5);
                    glow.addColorStop(0, `rgba(${s.color}, 0.9)`);
                    glow.addColorStop(1, `rgba(${s.color}, 0)`);
                    ctx.fillStyle = glow;
                    ctx.fillRect(s.x - s.r * 5, y - s.r * 5, s.r * 10, s.r * 10);
                }

                ctx.fillStyle = `rgb(${s.color})`;
                ctx.beginPath();
                ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        };

        const drawShootingStars = (dt) => {
            shooting = shooting.filter((s) => {
                s.life += dt;
                s.x += s.vx * dt;
                s.y += s.vy * dt;
                const progress = s.life / s.maxLife;
                if (progress >= 1) return false;

                // fade in fast, fade out slow
                const fade = progress < 0.15 ? progress / 0.15 : 1 - (progress - 0.15) / 0.85;
                const speed = Math.hypot(s.vx, s.vy);
                const tailX = s.x - (s.vx / speed) * s.length;
                const tailY = s.y - (s.vy / speed) * s.length;

                const trail = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
                trail.addColorStop(0, `rgba(255, 255, 255, ${0.95 * fade})`);
                trail.addColorStop(0.3, `rgba(170, 240, 220, ${0.45 * fade})`);
                trail.addColorStop(1, 'rgba(41, 165, 135, 0)');
                ctx.strokeStyle = trail;
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();

                ctx.fillStyle = `rgba(255, 255, 255, ${fade})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
                ctx.fill();
                return true;
            });
        };

        const render = (now) => {
            const dt = Math.min(0.05, (now - last) / 1000); // clamp after a hidden tab
            last = now;
            ctx.clearRect(0, 0, width, height);
            drawStars(now / 1000);

            nextShot -= dt;
            if (nextShot <= 0) {
                shooting.push(makeShootingStar(width, height));
                if (Math.random() < 0.2) shooting.push(makeShootingStar(width, height)); // sometimes a pair
                nextShot = rand(2.5, 6);
            }
            drawShootingStars(dt);
            frame = requestAnimationFrame(render);
        };

        resize();
        if (reduceMotion) {
            // a still sky that only re-draws for scroll / resize
            const still = () => {
                ctx.clearRect(0, 0, width, height);
                drawStars(0);
            };
            const onResize = () => { resize(); still(); };
            still();
            window.addEventListener('resize', onResize);
            window.addEventListener('scroll', still, { passive: true });
            return () => {
                window.removeEventListener('resize', onResize);
                window.removeEventListener('scroll', still);
            };
        }

        frame = requestAnimationFrame(render);
        window.addEventListener('resize', resize);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', resize);
        };
    }, []);

    return (
        <div className="starryNight" aria-hidden="true">
            <canvas ref={canvasRef} />
        </div>
    );
};

export default StarryNight;
