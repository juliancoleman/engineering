var d = document;
var el = d.querySelector(".hero-half");
var h = d.querySelector("header");
var ha = d.querySelectorAll("header nav a.light");

var threshold = (length = 100) => Array.from({ length }, (_, k) => k / length);

function replaceCx(f, t) {
  ha.forEach((a) => { a.classList.replace(f, t); });
}

function observeFn(entries) {
  var e = entries[0];

  if (e.isIntersecting) {
    if (h.classList.contains("active")) {
      h.classList.remove("active", "sticky");
    }

    var inverseRatio = 1.0 - e.intersectionRatio;
    var bg = `rgba(255, 255, 255, ${inverseRatio})`;
    h.style.background = bg;

    if (e.intersectionRatio > 0.6) {
      replaceCx("dark", "light");
    } else {
      replaceCx("light", "dark");
    }
  } else {
    replaceCx("light", "dark");
    h.classList.add("active");
  }
}

if (!el && !d.querySelector(".hero")) {
  replaceCx("light", "dark");
  h.classList.add("active", "sticky");
} else if (el) {
  var ob = new IntersectionObserver(observeFn, { threshold: threshold() });
  ob.observe(el);
}
