// Use `var` instead of `const` for smaller OTW.

// I typically have only one header on the page at a time,
// which is why I'm okay with making a selector this broad.
var header = document.querySelector("header");

window.onscroll = handleScroll;

function handleScroll() {
  var currentScrollPosition = window.scrollY;
  var windowHeight = window.innerHeight;
  var offsetPercentage = currentScrollPosition / windowHeight;

  header.style.background = `rgba(255, 255, 255, ${offsetPercentage})`;
}
