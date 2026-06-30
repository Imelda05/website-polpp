// ===== SLIDER =====
var track = document.getElementById('sliderTrack');
if (track) {
    var slides = track.querySelectorAll('.slide');
    var dots = document.querySelectorAll('#sliderDots span');
    var prevBtn = document.getElementById('prevSlide');
    var nextBtn = document.getElementById('nextSlide');
    var currentIndex = 0;
    var totalSlides = slides.length;
    var autoSlideInterval;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        dots.forEach(function(dot, i) {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function nextSlide() { goToSlide(currentIndex + 1); }
    function prevSlide() { goToSlide(currentIndex - 1); }

    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }

    dots.forEach(function(dot) {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            goToSlide(parseInt(dot.dataset.index));
            startAutoSlide();
        });
    });

    // Touch support
    var touchStartX = 0;
    var touchEndX = 0;
    track.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoSlide();
    });
    track.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 40) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
        startAutoSlide();
    });

    goToSlide(0);
    startAutoSlide();
}

// ===== HAMBURGER MENU =====
var hamburger = document.getElementById('hamburger');
var navMenu = document.getElementById('navMenu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-menu a').forEach(function(link) {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    document.querySelectorAll('.nav-menu > li').forEach(function(li) {
        var link = li.querySelector('a');
        if (li.querySelector('.dropdown')) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    li.classList.toggle('open');
                }
            });
        }
    });
}

// ===== ACTIVE NAV LINK =====
var currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu > li > a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            var offset = 80;
            var top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: top, behavior: 'smooth' });
        }
    });
});

// ===== SARAN BUTTON =====
var btnSaran = document.querySelector('.btn-saran');
if (btnSaran) {
    btnSaran.addEventListener('click', function() {
        alert('Terima kasih! Silakan tulis saran dan kritik Anda di form yang tersedia. Kami akan segera merespons.');
    });
}

// ===== PROFIL ITEMS CLICK =====
document.querySelectorAll('.profil-item').forEach(function(item) {
    item.addEventListener('click', function() {
        var label = this.querySelector('h4') ? this.querySelector('h4').textContent : 'Profil';
        alert('Anda membuka halaman: ' + label + '\n\n(Halaman ini sedang dalam pengembangan.)');
    });
});

// ===== PUBLIKASI & DOKUMENTASI ITEMS =====
document.querySelectorAll('.pub-item, .dok-item, .berita-item, .foto-card, .agenda-card, .dokumen-list a, .agenda-list .agenda-item')
    .forEach(function(el) {
        el.addEventListener('click', function(e) {
            e.stopPropagation();
            var text = this.textContent.trim().slice(0, 40);
            alert('Anda membuka: ' + text + '\n\n(Halaman ini sedang dalam pengembangan.)');
        });
    });

console.log('🌿 Website Satpol PP Kabupaten Muba siap!');
