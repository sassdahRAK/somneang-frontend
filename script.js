// Toggle like/heart button on song rows
function toggleLike(btn) {
  btn.classList.toggle('liked');
  const svg = btn.querySelector('svg');
  if (btn.classList.contains('liked')) {
    svg.setAttribute('fill', 'currentColor');
  } else {
    svg.setAttribute('fill', 'none');
  }
}
 
// Set active nav item in bottom navigation
function setActive(el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
}
 
// Toggle show more / show less icon rotation
function toggleShowMore() {
  const btn = document.getElementById('show-more-btn');
  btn.classList.toggle('rotated');
}