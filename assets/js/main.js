/*
 * IHL TRANSPORT – sdílená logika stránky
 * (jazykový přepínač, mobilní menu, scroll animace, mapa Evropy)
 */
(function () {
  "use strict";

  var LANG_KEY = "ihl-lang";
  var DEFAULT_LANG = "cs";

  function getStoredLang() {
    try {
      return localStorage.getItem(LANG_KEY);
    } catch (e) {
      return null;
    }
  }

  function storeLang(lang) {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      /* localStorage nedostupné (soukromý režim) - jazyk se prostě nepamatuje */
    }
  }

  function currentPageKey() {
    return document.body.getAttribute("data-page") || "home";
  }

  function applyLanguage(lang) {
    var dict = (window.TRANSLATIONS && window.TRANSLATIONS[lang]) || {};
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      var pairs = el.getAttribute("data-i18n-attr").split(";");
      pairs.forEach(function (pair) {
        var parts = pair.split(":");
        if (parts.length !== 2) return;
        var attr = parts[0].trim();
        var key = parts[1].trim();
        if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
      });
    });

    var page = currentPageKey();
    var title = dict["meta.title." + page];
    var description = dict["meta.description." + page];
    if (title) {
      document.title = title;
      var ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute("content", title);
    }
    if (description) {
      var metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", description);
      var ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", description);
    }

    /* dict["nav.langSwitch"] already holds the label of the OTHER language
       (e.g. cs -> "EN"), so the general data-i18n loop above sets the
       button text correctly. Only the aria-label needs a manual ternary. */
    document.querySelectorAll(".lang-switch").forEach(function (btn) {
      btn.setAttribute(
        "aria-label",
        lang === "cs" ? "Switch to English" : "Přepnout do češtiny"
      );
    });

    storeLang(lang);
  }

  function initLanguage() {
    var lang = getStoredLang() || DEFAULT_LANG;
    applyLanguage(lang);
    document.querySelectorAll(".lang-switch").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var next = document.documentElement.lang === "cs" ? "en" : "cs";
        applyLanguage(next);
      });
    });
  }

  function initMobileNav() {
    var toggle = document.querySelector(".nav-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.querySelectorAll(".main-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        document.body.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initHeaderShadow() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Bezpečnostní pojistka: pokud by IntersectionObserver z nějakého důvodu
     (starší prohlížeč, rozšíření blokující API, apod.) prvek neodhalil,
     po chvíli ho zobrazíme natvrdo – obsah nesmí zůstat trvale neviditelný. */
  function revealWithFallback(el, className, delay) {
    var timer = setTimeout(function () {
      el.classList.add(className);
    }, delay);
    return timer;
  }

  function initScrollReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("revealed"); });
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    items.forEach(function (el) {
      observer.observe(el);
      revealWithFallback(el, "revealed", 2500);
    });
  }

  function initEuropeMap() {
    var map = document.querySelector(".europe-map");
    if (!map) return;
    if (!("IntersectionObserver" in window)) {
      map.classList.add("in-view");
      return;
    }
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            map.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(map);
    revealWithFallback(map, "in-view", 2500);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initLanguage();
    initMobileNav();
    initHeaderShadow();
    initScrollReveal();
    initEuropeMap();
  });
})();
