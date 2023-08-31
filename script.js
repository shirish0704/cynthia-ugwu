const init = () => {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
};
init();
const firstPageAnimation = () => {
  var tl = gsap.timeline();

  tl.from(".nav", {
    y: "20",
    opacity: 0,
    duration: 1,
  }).from(".heading h1, .heading h5", {
    y: "10",
    opacity: 0,
    duration: 1.5,
    delay: -0.7,
    ease: Expo.easeInOut,
    stagger: 0.3,
  });
  tl.from(".heading-part2 h5", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    delay: -1,
    ease: Expo.easeInOut,
    stagger: 0.4,
  });
  tl.from(".herofooter", {
    y: -10,
    opacity: 0,
    delay: -1,
    duration: 1.5,
    ease: Expo.easeInOut,
  });
};

var timeOut;

const circleSkew = () => {
  var xscale = 1;
  var yscale = 1;
  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", (dets) => {
    clearTimeout(timeOut);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;

    circleMouseFollower(xscale, yscale);
    timeOut = setTimeout(() => {
      document.querySelector(
        "#minicircle"
      ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
};

const circleMouseFollower = (xscale, yscale) => {
  window.addEventListener("mousemove", (dets) => {
    document.querySelector(
      "#minicircle"
    ).style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
};

circleSkew();
firstPageAnimation();
circleMouseFollower();

document.querySelectorAll(".elem").forEach((elem) => {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mousemove", (dets) => {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      top: diff,
      left: dets.clientX,
      ease: Power3,
      rotate: gsap.utils.clamp(-20, 20, diffrot),
      duration: 1,
    });
  });
  elem.addEventListener("mouseleave", () => {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 1,
    });
  });
});

gsap.from(".section .elem", {
  opacity: 0,
  duration: 2,
  y: 30,
  ease: Power3,
  scrollTrigger: {
    trigger: ".section .elem",
    scroller: "#main",
    start: "top 80%",
  },
});
gsap.from(".subscribe", {
  opacity: 0,
  duration: 2,
  y: 30,
  ease: Power3,
  scrollTrigger: {
    trigger: ".subscribe",
    scroller: "#main",
    start: "top 90%",
  },
});
gsap.from(".about .textabout", {
  opacity: 0,
  duration: 2,
  y: 30,
  ease: Power3,
  scrollTrigger: {
    trigger: ".about .textabout",
    scroller: "#main",
    start: "top 90%",
  },
});
