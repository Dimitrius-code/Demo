// ========================
// Strapi: Homepage Inhalte
// ========================
fetch("http://localhost:1337/api/homepage?populate=*")
  .then((res) => res.json())
  .then((data) => {
    const content = data?.data;

    if (!content) return;

    // Feature 1
    const f1Title = document.getElementById("feature1_title");
    const f1Sub = document.getElementById("feature1_subtitle");
    const f1Img = document.getElementById("feature1_image");

    if (f1Title) f1Title.textContent = content.feature1_title ?? "";
    if (f1Sub) f1Sub.textContent = content.feature1_subtitle ?? "";
    if (f1Img && content.feature1_image?.url) {
      f1Img.src = "http://localhost:1337" + content.feature1_image.url;
    }

    // Feature 2
    const f2Title = document.getElementById("feature2_title");
    const f2Sub = document.getElementById("feature2_subtitle");
    const f2Img = document.getElementById("feature2_image");

    if (f2Title) f2Title.textContent = content.feature2_title ?? "";
    if (f2Sub) f2Sub.textContent = content.feature2_subtitle ?? "";
    if (f2Img && content.feature2_image?.url) {
      f2Img.src = "http://localhost:1337" + content.feature2_image.url;
    }
  })
  .catch((error) => console.error("Fehler:", error));


// ========================
// Kontaktformular (EmailJS)
// ========================
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    sendMail();
  });
}

function sendMail() {
  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const subjectEl = document.getElementById("subject");
  const messageEl = document.getElementById("message");

  const params = {
    name: nameEl ? nameEl.value : "",
    email: emailEl ? emailEl.value : "",
    subject: subjectEl ? subjectEl.value : "",
    message: messageEl ? messageEl.value : "",
  };

  emailjs
    .send("service_ea5x8mk", "template_m5a10sk", params)
    .then(() => {
      alert("Nachricht gesendet!");
      form.reset();
    })
    .catch((err) => {
      console.error("EmailJS Fehler:", err);
      alert("Fehler beim Senden – siehe Konsole (F12)");
    });
}