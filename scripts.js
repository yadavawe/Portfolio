// Toggle grayscale on profile pic on click or Enter key
const profilePic = document.getElementById('profilePic');
profilePic.addEventListener('click', toggleGrayscale);
profilePic.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    toggleGrayscale();
    e.preventDefault();
  }
});

function toggleGrayscale() {
  if (profilePic.style.filter === 'grayscale(100%)') {
    profilePic.style.filter = 'none';
  } else {
    profilePic.style.filter = 'grayscale(100%)';
  }
}

// Fade-in sections on scroll
const sections = document.querySelectorAll('.section');
function checkSections() {
  const triggerBottom = window.innerHeight * 0.85;
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', checkSections);
window.addEventListener('load', checkSections);

// Simple form validation and submission (mock)
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    const res = await fetch("http://localhost:3001/api/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Message sent successfully!");
      e.target.reset();
    } else {
      alert("Error sending message. Please try again later.");
    }
  } catch (err) {
    alert("Failed to send. Server error.");
  }
});
