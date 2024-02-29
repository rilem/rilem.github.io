function Hop(height = 42) {
    // main body
    gsap.to(".chess-piece", { duration: 0.3, ease: "power2.Out", y: -height });
    gsap.to(".chess-piece", { duration: 0.5, ease: "bounce.out", y: 0, delay: 0.3 });
    LookTo(0,-35);

    // head
    gsap.to(".head", { duration: 0.35, ease: "power2.Out", y: -20 });
    gsap.to(".head", { duration: 0.5, ease: "bounce.out", y: 0, delay: 0.35 });

    // face
    gsap.to(".face", { duration: 0.2, ease: "power2.Out", y: 10, delay: 0.4});
    gsap.to(".face", { duration: 1, ease: "elastic.out", y: 0, delay: 0.6});

    setTimeout(function() { LookTo(0,35);}, 400);
    setTimeout(function() { LookTo(0,0);}, 800);

    //BigEyes();
    WobbleBody();
}

function PickUp() {
    gsap.to(".chess-piece", { duration: 0.2, ease: "power3.Out", y: -80 });
    gsap.to(".chess-piece", { duration: 0.4, ease: "power2.Out", rotation: 5 });
    LookTo(0,35);
    WobbleBody(0.6, 1.2);
}

function PutDown() {
    // TODO: prevent overlapping by interupting current animation
    gsap.to(".chess-piece", { duration: 0.5, ease: "bounce.out", y: 0, delay: 0.1 });
    gsap.to(".chess-piece", { duration: 0.2, ease: "power2.Out", rotation: 0 });
    LookTo(0,0);
}

function BigEyes() {
    gsap.to(".eye", { duration: 0.4, ease: "power2.Out", scale: 2 });
    gsap.to(".eye", { duration: 1, ease: "elastic.out", scale: 1, delay: 0.4 });
}

function WobbleBody(speed = 1, force = 1) {
    gsap.to(".chess-piece", { duration: 0.1 * speed, ease: "power2.Out", scaleY: 0.8 * force });
    gsap.to(".chess-piece", { duration: 0.1 * speed, ease: "power2.Out", scaleX: 1.2 * force });
    gsap.to(".chess-piece", { duration: 0.8 * speed, ease: "elastic.out", scaleX: 1, delay: 0.1 * speed });
    gsap.to(".chess-piece", { duration: 0.8 * speed, ease: "elastic.out", scaleY: 1, delay: 0.1 * speed });
}

function ChangeSkin(skin) {ChangeBody("body-"+skin);ChangeHead("head-"+skin)}

function ChangeBody(body) {
    var objs = document.getElementsByClassName("body-graphic");
    for (var i = 0; i < objs.length; i++) {objs[i].data = "img/" + body + ".svg";}
}

function ChangeHead(head) {
    var objs = document.getElementsByClassName("head-graphic");
    for (var i = 0; i < objs.length; i++) {objs[i].data = "img/" + head + ".svg";}
}

function LookTo(x, y) {
    var objs = document.getElementsByClassName("pupil");
    for (var i = 0; i < objs.length; i++) {
        gsap.to(objs[i], { duration: 0.2, ease: "power2.InOut", xPercent: x, yPercent: y });
    }
    gsap.to(".face", { duration: 0.3, ease: "power2.InOut",xPercent: x * .05, yPercent: y * .05 });
}

document.addEventListener('DOMContentLoaded', function() {
    var draggableElement = document.getElementById('draggable');
    var offsetX, offsetY;
    var isDragging = false;

    draggableElement.addEventListener('mousedown', function(e) {
        // Call the function when drag starts
        PickUp();
        
        offsetX = e.offsetX;
        offsetY = e.offsetY;
        isDragging = true;
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            var newX = e.clientX - offsetX;
            var newY = e.clientY - offsetY;
            draggableElement.style.left = newX + 'px';
            draggableElement.style.top = newY + 'px';
        }
    });

    document.addEventListener('mouseup', function() {
        if (isDragging) {PutDown();}
        isDragging = false;
    });
});


