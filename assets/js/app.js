// Use `var` instead of `const` for smaller OTW.

// I typically have only one header on the page at a time,
// which is why I'm okay with making a selector this broad.
var header = document.querySelector("header");
var headerAnchors = document.querySelectorAll("header nav a.light");

window.onscroll = handleScroll;

function handleScroll() {
  var currentScrollPosition = window.scrollY;
  var windowHeight = window.innerHeight;
  var offsetPercentage = currentScrollPosition / windowHeight;

  header.style.background = `rgba(255, 255, 255, ${offsetPercentage})`;

  if (offsetPercentage > 0.5) {
    headerAnchors.forEach((anchor) => {
      anchor.classList.replace("light", "dark");
    });

    header.classList.add("shadow");
  } else {
    headerAnchors.forEach((anchor) => {
      anchor.classList.replace("dark", "light");
    });

    header.classList.remove("shadow");
  }
}
