fetch("http://localhost:1337/api/monika-page-title?populate=*")
  .then(res => res.json())
  .then(data => {
    const content = data.data;

    // Seitentitel
    document.getElementById("monika_page_title").textContent = content.monika_page_title;

    // Box 1
    document.getElementById("monika_box1_title").textContent = content.monika_box1_title;
    if (content.monika_box1_image && content.monika_box1_image.url) {
      document.getElementById("monika_box1_image").src =
        "http://localhost:1337" + content.monika_box1_image.url;
    }
    document.getElementById("monika_box1_btn").textContent = content.monika_box1_btn;

    // Box 4
    document.getElementById("monika_box4_title").textContent = content.monika_box4_title;
    if (content.monika_box4_image && content.monika_box4_image.url) {
      document.getElementById("monika_box4_image").src =
        "http://localhost:1337" + content.monika_box4_image.url;
    }
    document.getElementById("monika_box4_btn").textContent = content.monika_box4_btn;

    // Box 3 (Fotos, ganz breit)
    document.getElementById("monika_box3_title").textContent = content.monika_box3_title;
    if (content.monika_box3_image && content.monika_box3_image.url) {
      document.getElementById("monika_box3_image").src =
        "http://localhost:1337" + content.monika_box3_image.url;
    }
    document.getElementById("monika_box3_btn").textContent = content.monika_box3_btn;
  })
  .catch(error => console.error("Fehler:", error));