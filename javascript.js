// ╔══════════════════════════════════════════════════════╗
      // ║           EMAILJS CONFIGURATION                     ║
      // ║  Replace these 3 values with your EmailJS keys      ║
      // ╚══════════════════════════════════════════════════════╝
      const EMAILJS_PUBLIC_KEY = "I6_TPi9YSrQbCMHwz"; // Account → General
      const EMAILJS_SERVICE_ID = "service_hliqmos"; // Email Services
      const EMAILJS_TEMPLATE_ID = "template_2tewvpz"; // Email Templates

      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // ─── TOAST HELPER ───
      function showToast(type, title, subtitle) {
        // Remove any existing toast
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

        // Trigger animation
        requestAnimationFrame(() => {
          requestAnimationFrame(() => toast.classList.add("show"));
        });

        // Auto dismiss after 4 seconds
        setTimeout(() => {
          toast.classList.remove("show");
          setTimeout(() => toast.remove(), 400);
        }, 4000);
      }

      // ─── SEND EMAIL ───
      function sendEmail() {
        const name = document.getElementById("from_name").value.trim();
        const email = document.getElementById("from_email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Basic validation
        if (!name) {
          showToast("error", "Name is required", "Please enter your name.");
          return;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showToast(
            "error",
            "Invalid email",
            "Please enter a valid email address.",
          );
          return;
        }
        if (!message) {
          showToast(
            "error",
            "Message is required",
            "Please write a message before sending.",
          );
          return;
        }

        // Check keys are configured
        if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
          showToast(
            "error",
            "Not configured yet",
            "Please set up your EmailJS keys in the code.",
          );
          return;
        }

        // Show loading state
        const btn = document.getElementById("sendBtn");
        btn.classList.add("loading");

        const templateParams = {
          from_name: name,
          from_email: email,
          subject: subject || "Portfolio Contact Form",
          message: message,
          to_email: "rr.villasica@gmail.com",
        };

        emailjs
          .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
          .then(() => {
            btn.classList.remove("loading");
            showToast(
              "success",
              "Message sent!",
              "Royce will get back to you soon.",
            );
            // Clear form
            document.getElementById("from_name").value = "";
            document.getElementById("from_email").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";
          })
          .catch((err) => {
            btn.classList.remove("loading");
            console.error("EmailJS error:", err);
            showToast(
              "error",
              "Failed to send",
              "Something went wrong. Try emailing directly.",
            );
          });
      }

      // ─── MOBILE MENU ───
      function toggleMenu() {
        document.getElementById("navLinks").classList.toggle("open");
      }
      document.querySelectorAll(".nav-links a").forEach((a) => {
        a.addEventListener("click", () =>
          document.getElementById("navLinks").classList.remove("open"),
        );
      });

      // ─── SCROLL ANIMATIONS ───
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add("visible"), i * 80);
            }
          });
        },
        { threshold: 0.12 },
      );

      document
        .querySelectorAll("[data-animate]")
        .forEach((el) => observer.observe(el));

      // ─── STAGGER PROJECT / EDU CARDS ───
      const skillObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add("visible"), i * 100);
            }
          });
        },
        { threshold: 0.1 },
      );
      document
        .querySelectorAll(".project-card, .edu-card, .cert-card")
        .forEach((el) => skillObserver.observe(el));

      // ─── STAGGER TECH STACK LOGO CARDS ───
      const logoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const cards = entry.target.querySelectorAll(".ts-logo-card, .ts-competency-tag");
              cards.forEach((card, i) => {
                setTimeout(() => card.classList.add("visible"), i * 60);
              });
            }
          });
        },
        { threshold: 0.1 },
      );
      document.querySelectorAll(".ts-section").forEach((el) => logoObserver.observe(el));