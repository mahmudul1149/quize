const finalScore = localStorage.getItem('finalScore');
if (finalScore !== null) {
  document.getElementById('result_score').innerText = finalScore;
} else {
  window.location.href = 'index.html';
}