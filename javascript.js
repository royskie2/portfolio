const EMAILJS_PUBLIC_KEY  = "I6_TPi9YSrQbCMHwz";   // Account → General
const EMAILJS_SERVICE_ID  = "service_hliqmos";       // Email Services
const EMAILJS_TEMPLATE_ID = "template_2tewvpz";      // Email Templates

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// ─── TOAST HELPER ───
function showToast(type, title, subtitle) {
  const existing = document.getElementById("toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas ${type === "success" ? "fa-circle-check" : "fa-circle-exclamation"}"></i>
    </div>
    <div class="toast-msg">
      <strong>${title}</strong>
      <span>${subtitle}</span>
    </div>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add("show"));
  });

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ─── SEND EMAIL ───
function sendEmail() {
  const name    = document.getElementById("from_name").value.trim();
  const email   = document.getElementById("from_email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name) {
    showToast("error", "Name is required", "Please enter your name.");
    return;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showToast("error", "Invalid email", "Please enter a valid email address.");
    return;
  }
  if (!message) {
    showToast("error", "Message is required", "Please write a message before sending.");
    return;
  }
  if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
    showToast("error", "Not configured yet", "Please set up your EmailJS keys in the code.");
    return;
  }

  const btn = document.getElementById("sendBtn");
  btn.classList.add("loading");

  const templateParams = {
    from_name:  name,
    from_email: email,
    subject:    subject || "Portfolio Contact Form",
    message:    message,
    to_email:   "rr.villasica@gmail.com",
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      btn.classList.remove("loading");
      showToast("success", "Message sent!", "Royce will get back to you soon.");
      document.getElementById("from_name").value  = "";
      document.getElementById("from_email").value = "";
      document.getElementById("subject").value    = "";
      document.getElementById("message").value    = "";
    })
    .catch((err) => {
      btn.classList.remove("loading");
      console.error("EmailJS error:", err);
      showToast("error", "Failed to send", "Something went wrong. Try emailing directly.");
    });
}

// ─── MOBILE MENU ───
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}
document.querySelectorAll(".nav-links a").forEach((a) => {
  a.addEventListener("click", () =>
    document.getElementById("navLinks").classList.remove("open")
  );
});
