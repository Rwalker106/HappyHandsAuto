// Google Analytics 4 Measurement ID with cookie consent

const G_TAG = "G-7M1NZGJ47Z";

function loadGtag() {
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${G_TAG}`;
  script.async = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  script.onload = () => {
    gtag("js", new Date());
    gtag("config", G_TAG);
    };
}

function showCookieBanner() {
  const banner = document.createElement("div");
  banner.id = "cookie-banner";
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', 'Cookie Consent');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-modal', 'true');
  banner.innerHTML = `
    <p>We use cookies to improve your experience. By using our site, you agree to our <a href="/privacy-policy">Privacy Policy</a>.</p>
    <div class="cookie-banner-actions">
      <button id="accept-cookies">Accept</button>
      <button id="decline-cookies">Decline</button>
    </div>
  `;
  document.body.appendChild(banner);

  const acceptButton = document.getElementById("accept-cookies");
  const declineButton = document.getElementById("decline-cookies"); 

  acceptButton.focus(); // Set focus to the accept button for accessibility

  acceptButton.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "true");
    loadGtag();
    document.body.removeChild(banner);
  });

  declineButton.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "false");
    document.body.removeChild(banner);
  });
}

function checkCookieConsent() {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "true") {
        loadGtag();
    } else if (consent === "false") {
        // Do nothing, user declined cookies
    } else {
        showCookieBanner();
    }
}

document.addEventListener("DOMContentLoaded", checkCookieConsent);