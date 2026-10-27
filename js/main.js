/**
 * Portfolio · Asier Rodríguez
 * 1) Campo de partículas del hero (se detiene fuera de pantalla y con movimiento reducido).
 * 2) Marca la sección activa en la navegación.
 * Sin dependencias externas.
 */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    /* ---------- Partículas ---------- */
    var canvas = document.getElementById('particleCanvas');
    var hero = document.getElementById('inicio');

    if (canvas && hero && canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var particles = [];
        var width = 0;
        var height = 0;
        var frameId = null;
        var heroVisible = true;

        var rand = function (min, max) { return Math.random() * (max - min) + min; };

        function makeParticle() {
            return {
                x: rand(0, width),
                y: rand(0, height),
                r: rand(0.8, 2),
                vx: rand(-0.12, 0.12),
                vy: rand(-0.12, 0.12),
                phase: rand(0, Math.PI * 2)
            };
        }

        function resize() {
            var dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = hero.clientWidth;
            height = hero.clientHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            var count = Math.round(Math.min(60, Math.max(18, (width * height) / 22000)));
            particles = [];
            for (var i = 0; i < count; i++) { particles.push(makeParticle()); }
            draw(0);
        }

        function draw(time) {
            ctx.clearRect(0, 0, width, height);
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                var alpha = 0.35 + 0.35 * Math.sin(time / 1200 + p.phase);
                ctx.fillStyle = 'rgba(201, 182, 255, ' + alpha.toFixed(3) + ')';
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function step(time) {
            for (var i = 0; i < particles.length; i++) {
                var p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) { p.x = width; } else if (p.x > width) { p.x = 0; }
                if (p.y < 0) { p.y = height; } else if (p.y > height) { p.y = 0; }
            }
            draw(time);
            frameId = window.requestAnimationFrame(step);
        }

        function start() {
            if (frameId === null && heroVisible && !document.hidden && !reduceMotion.matches) {
                frameId = window.requestAnimationFrame(step);
            }
        }

        function stop() {
            if (frameId !== null) {
                window.cancelAnimationFrame(frameId);
                frameId = null;
            }
        }

        var resizeTimer;
        window.addEventListener('resize', function () {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(function () { stop(); resize(); start(); }, 150);
        });

        document.addEventListener('visibilitychange', function () {
            if (document.hidden) { stop(); } else { start(); }
        });

        if ('IntersectionObserver' in window) {
            new IntersectionObserver(function (entries) {
                heroVisible = entries[0].isIntersecting;
                if (heroVisible) { start(); } else { stop(); }
            }).observe(hero);
        }

        var onMotionChange = function () {
            if (reduceMotion.matches) { stop(); draw(0); } else { start(); }
        };
        if (reduceMotion.addEventListener) {
            reduceMotion.addEventListener('change', onMotionChange);
        } else if (reduceMotion.addListener) {
            reduceMotion.addListener(onMotionChange);
        }

        resize();
        start();
    }

    /* ---------- Navegación: sección activa ---------- */
    var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
    var sections = links
        .map(function (a) { return document.querySelector(a.getAttribute('href')); })
        .filter(Boolean);

    if (links.length && sections.length && 'IntersectionObserver' in window) {
        var setCurrent = function (id) {
            links.forEach(function (a) {
                if (a.getAttribute('href') === '#' + id) {
                    a.setAttribute('aria-current', 'true');
                } else {
                    a.removeAttribute('aria-current');
                }
            });
        };

        var sectionObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) { setCurrent(entry.target.id); }
            });
        }, { rootMargin: '-35% 0px -60% 0px' });

        sections.forEach(function (s) { sectionObserver.observe(s); });

        // Al llegar al final de la página, la última sección no alcanza la banda del observador.
        window.addEventListener('scroll', function () {
            var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            if (atBottom) { setCurrent(sections[sections.length - 1].id); }
        }, { passive: true });
    }
})();
