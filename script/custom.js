// visual
ScrollTrigger.create({
  trigger: "#visual",
  start: "94% top",

  onLeaveBack: () => {
    // visual로 돌아왔을 때
    gsap.to(".checker", {
      opacity: 0,
      duration: 0.2,
    });

    gsap.to("#header nav li", {
      color: "#212121",
      duration: 0.2,
    });
  },
});

ScrollTrigger.create({
  trigger: "#visual",
  start: "-1% top",
  end: "bottom top",

  onEnter: () => (visualMode = true),
  onEnterBack: () => (visualMode = true),

  onLeave: () => (visualMode = false),
  onLeaveBack: () => (visualMode = false),
});

// first section
let t1 = gsap.timeline({
  scrollTrigger: {
    id: "pin_first",
    trigger: ".section_first",
    start: "top top",
    end: "+=2000",
    scrub: 1,
    pin: true,
  },
});
t1.to(".section_first article", {
  rotateY: 180,
  stagger: 0.2,
}).to(
  {},
  {
    duration: 0.3,
  },
);

// third section
let cards = gsap.utils.toArray(".section_third li");

let currentIndex = -1;

function activeVideo(index) {
  // 이미 재생 중인 카드면 아무것도 안 함
  if (currentIndex === index) return;

  currentIndex = index;

  $(".section_third li video").each(function () {
    this.pause();
    this.currentTime = 0;

    gsap.to(this, {
      opacity: 0,
      duration: 0.3,
    });
  });

  const vid = cards[index].querySelector("video");

  vid.play();

  gsap.to(vid, {
    opacity: 1,
  });
}

function stopAllVideos() {
  $(".section_third video").each(function () {
    this.pause();
    this.currentTime = 0;

    gsap.to(this, {
      opacity: 0,
      duration: 0.2,
    });
  });

  currentIndex = -1;
}

let t2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_third",
    start: "top top",
    end: "+=4000",
    scrub: 1,
    pin: true,
  },
});

cards.forEach((card, index) => {
  t2.to(cards, {
    flex: "1 1 10%",
  });

  t2.to(
    card,
    {
      flex: "1 1 70%",
      onUpdate: () => {
        activeVideo(index);
      },
    },
    // "<",
  );
});

ScrollTrigger.create({
  trigger: ".section_third",
  start: "top top",
  end: "bottom top",

  onLeave: stopAllVideos,

  onLeaveBack: stopAllVideos,
});

// header
let sections = [
  ".section_first",
  ".section_second",
  ".section_third",
  ".section_fourth",
];
let navColors = ["#eeede4", "#212121", "#eeede4", "#eeede4"];

sections.forEach((section, i) => {
  ScrollTrigger.create({
    id: `nav-${i}`,
    trigger: section,
    start: "top top",
    onEnter: () => {
      moveChecker(i);
      sectionTitle(section);
      gsap.to("#header nav li", {
        color: navColors[i],
        duration: 0.2,
      });
      gsap.to(`${section} .text_cover`, {
        width: 0,
        delay: 0.6,
        duration: 0.6,
        ease: "power2.in",
      });
    },
    onEnterBack: () => {
      moveChecker(i);
      sectionTitle(section);
      gsap.to("#header nav li", {
        color: navColors[i],
        duration: 0.2,
      });
    },
  });
});

function moveChecker(index) {
  let target = $("header nav li").eq(index);

  gsap.to(".checker", {
    left: target.position().left,
    width: target.outerWidth(),
    opacity: 1,
    duration: 0.35,
    ease: "power2.out",
  });
}

$("header li").on("click", function (e) {
  e.preventDefault();
  let i = $(this).index();
  let st = ScrollTrigger.getById(`nav-${i}`);

  $("html,body").animate(
    {
      scrollTop: st.start + 1,
    },
    600,
  );
});

let scrollTimer;

$(window).on("scroll", function () {
  $("#header nav ul").addClass("active");

  clearTimeout(scrollTimer);

  scrollTimer = setTimeout(() => {
    if (!visualMode && !$("#header nav ul").is(":hover")) {
      $("#header nav ul").removeClass("active");
    }
  }, 1200);
});

// section title animation
function sectionTitle(section) {
  $(section)
    .find(".section_title .label")
    .stop(true, true)
    .animate({ height: "100%" }, function () {
      $(section)
        .find(".section_title h3")
        .stop()
        .animate({ width: "100%" }, function () {
          setTimeout(function () {
            $(section)
              .find(".section_title h3")
              .stop()
              .animate({ width: "0" }, function () {
                $(section)
                  .find(".section_title .label")
                  .stop()
                  .animate({ height: "0" });
              });
          }, 1600);
        });
    });
}
// second section
gsap.to(".section_second .con1", {
  scrollTrigger: {
    trigger: ".section_second .con1",
    toggleActions: "play none none reset",
  },
  x: 0,
  opacity: 1,
  duration: 1.4,
});
gsap.to(".section_second .con2", {
  scrollTrigger: {
    trigger: ".section_second .con2",
    toggleActions: "play none none reset",
  },
  x: 0,
  opacity: 1,
  duration: 1.4,
});

// fourth section
const pandaMap = [
  "00000000000000000000000000000000",
  "00000000000000000011111110000000",
  "00000000000000001111111111100000",
  "00000000000111111111111111110000",
  "00000000001111111111111111111000",
  "00000000110000111111111111111000",
  "00000001100000011111111111110000",
  "00000001011110011111111100000000",
  "00000011111110011111111000000000",
  "00000111111110001111111100000000",
  "00011100000011101111100110000000",
  "00111100000001101111100010000000",
  "00111000000000111111000011000000",
  "00111000000000011111000001100000",
  "00011000000000011111000000100000",
  "00001000001110011111000000110000",
  "00001000001110011110000000010000",
  "00001011000110011110100000011000",
  "00001011000000111101111000011000",
  "00001111000001111011111100001000",
  "00000110001001110111111100001100",
  "00000011011011100111111100001100",
  "00000011111110000111111100001100",
  "00000011111111000111111110011110",
  "00000011111111110111111110111110",
  "00000011111100111111111111111110",
  "00000011111100000111111111111110",
  "00000011111100000001111110111110",
  "00000011111000000000111110011110",
  "00000111111000000000111110011100",
  "00000111110000000000011100000000",
  "00000000000000000000000000000000",
];

let wrap = document.querySelector(".dot_anime");

for (let y = 0; y < 32; y++) {
  for (let x = 0; x < 32; x++) {
    let pixel = document.createElement("div");
    pixel.className = "pixel";

    if (pandaMap[y][x] === "1") {
      pixel.classList.add("dot");
    }

    wrap.appendChild(pixel);
  }
}
let t3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section_fourth",
    start: "top top",
  },
});
t3.to(".section_fourth .dot", {
  delay: 0.6,
  y: 0,
})
  .to(".section_fourth .dot_anime", {
    filter: "blur(6px)",
    duration: 2.6,
    delay: 3.2,
  })
  .to(".section_fourth .panda_logo", {
    opacity: 1,
  });

gsap.from(".section_fourth .left", {
  scrollTrigger: {
    trigger: ".section_fourth",
    toggleActions: "play none none reset",
  },
  x: "-20%",
  opacity: 0,
  duration: 1.4,
});
document.querySelectorAll(".dot").forEach((el) => {
  el.style.transitionDelay = Math.random() * 1 + "s";
});

gsap.from(".section_fourth .right", {
  scrollTrigger: {
    trigger: ".section_fourth",
    toggleActions: "play none none reset",
  },
  x: "20%",
  opacity: 0,
  duration: 1.4,
});
// submit button
$(".submit-btn").on("mouseenter", function () {
  $(this)
    .stop()
    .animate({ width: "80px" }, function () {
      $(this)
        .find("i")
        .stop()
        .animate({ left: "150%" }, function () {
          $(".submit-btn span").stop().animate({ top: "50%" });
          $(".submit-btn i").css({ left: "-150%" });
        });
    });
});
$(".submit-btn").on("mouseleave", function () {
  $(".submit-btn span").stop().animate({ top: "150%" });
  $(".submit-btn i").stop().animate({ left: "50%" });
  $(".submit-btn").stop().animate({ width: "40px" });
});
// EmailJS 초기화
emailjs.init({
  publicKey: "I27rGQflRaS_Ma99t",
});

const form = document.getElementById("contact-form");
const statusText = document.getElementById("form-status");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  statusText.innerText = "메일 전송 중...";

  emailjs
    .sendForm("service_vutkqrc", "template_2azqjlr", form)
    .then(() => {
      statusText.innerText = "메일이 전송되었습니다.";

      form.reset();
    })
    .catch((error) => {
      console.error(error);

      statusText.innerText =
        "메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.";
    });
});
