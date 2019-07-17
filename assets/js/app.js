/**
 * Version 2.0 - Intersection Observers
 */

var el = document.querySelector(".hero-half");
var hero = document.querySelector(".hero");
var header = document.querySelector("header");
var headerAnchors = document.querySelectorAll("header nav a.light");

/**
 * buildThresholdList
 *
 * Generates a sequence of numbers based on a
 * given number of stops.
 *
 * Example:
 *
 *     buildThresholdList(5);  //=> [0, 0.2, 0.4, 0.6, 0.8]
 *     buildThresholdList(20); //=> [0, 0.05, 0.1,...0.9, 0.95]
 *     buildThresholdList();   //=> [0, 0.01, 0.02,...0.98, 0.99]
 *
 * @param {number} length the number of stops
 */
function buildThresholdList(length = 100) {
  return Array.from({ length }, (_v, k) => k / length);
}

/**
 * anchorReplaceClass
 *
 * Iterates over each anchor tag in the header
 * and replaces a given class with another.
 *
 * @param {string} from the class name to be replaced
 * @param {string} to the replacing class name
 */
function anchorReplaceClass(from, to) {
  headerAnchors.forEach((a) => {
    a.classList.replace(from, to);
  });
}

function observeFn(entries) {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      // Remove the `active` class if the header has it.
      // This happens when the hero banner is scrolled out
      // of view, and then back into view.
      if (header.classList.contains("active")) {
        header.classList.remove("active");
      }

      // Fade in-out the header's white background as we scroll.
      var inverseRatio = 1.0 - e.intersectionRatio;
      var background = `rgba(255, 255, 255, ${inverseRatio})`;
      header.style.background = background;

      // Change the link color as the background becomes
      // more or less opaque.
      var opacityThreshold = 0.6;
      if (e.intersectionRatio > opacityThreshold) {
        anchorReplaceClass("dark", "light");
      } else {
        anchorReplaceClass("light", "dark");
      }
    } else {
      // The hero banner is out of view at this point.
      // Set the anchors to dark and give the header a
      // box shadow.
      anchorReplaceClass("light", "dark");
      header.classList.add("active");
    }
  });
}

var opts = {
  root: null,                      // root=null defaults to viewport
  threshold: buildThresholdList(), // number of stops
};

// If the element we want to observe doesn't exist,
// and we are not on the home page, we will want the
// header to default to its scrolled state.
if (!el && !hero) {
  anchorReplaceClass("light", "dark");
  header.classList.add("active");
  header.classList.add("sticky");
} else {
  var ob = new IntersectionObserver(observeFn, opts);
  ob.observe(el);
}

////////

/**
 * Version 1.0 - Scroll Event Listener
 */

// var header = document.querySelector("header");
// var headerAnchors = document.querySelectorAll("header nav a.light");

// window.onscroll = handleScroll;

// function handleScroll() {
//   var currentScrollPosition = window.scrollY;
//   var windowHeight = window.innerHeight / 2;
//   var offsetPercentage = currentScrollPosition / windowHeight;

//   header.style.background = `rgba(255, 255, 255, ${offsetPercentage})`;

//   if (offsetPercentage > 0.60) {
//     headerAnchors.forEach((anchor) => {
//       anchor.classList.replace("light", "dark");
//     });
//   } else {
//     headerAnchors.forEach((anchor) => {
//       anchor.classList.replace("dark", "light");
//     });
//   }

//   if (offsetPercentage > 1) {
//     header.classList.add("shadow");
//   } else {
//     header.classList.remove("shadow");
//   }
// }
