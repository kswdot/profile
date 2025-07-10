
  // 모달 열기
  document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('hidden');
        document.querySelector('.navbar')?.classList.add('hidden');
      }
    });
  });

  // 모달 닫기 (X 버튼 또는 바깥 영역 클릭 시)
  document.querySelectorAll('.modal .close').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').classList.add('hidden');
      document.querySelector('.navbar')?.classList.remove('hidden');
    });
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.add('hidden');
      document.querySelector('.navbar')?.classList.remove('hidden');
    }
  });

  // ESC 키 누르면 모달 닫기
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
      });
      document.querySelector('.navbar')?.classList.remove('hidden');
    }
  });

  // 모든 탭 메뉴 처리 (모달별 독립적으로)
  document.querySelectorAll('.desk-tabs').forEach(tabs => {
    const tabButtons = tabs.querySelectorAll('.tab-btn');
    const tabPanels = tabs.parentElement.querySelectorAll('.tab-panel');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.dataset.tab;
        tabPanels.forEach(panel => panel.classList.add('hidden'));
        tabs.parentElement.querySelector(`#${targetId}`).classList.remove('hidden');
      });
    });
  });



// 프로젝트 자세히 보기 이미지 JS
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function updateCarousel(index) {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${index * slideWidth}px)`;
  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel(currentIndex);
});
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel(currentIndex);
});
dots.forEach((dot, idx) => {
  dot.addEventListener("click", () => {
    currentIndex = idx;
    updateCarousel(currentIndex);
  });
});

// 클릭 시 확대 (모달)
slides.forEach(img => {
  img.addEventListener("click", () => {
    const src = img.getAttribute("src");
    const zoom = document.createElement("div");
    zoom.innerHTML = `<div class="zoom-overlay"><img src="${src}" /></div>`;
    document.body.appendChild(zoom);

    zoom.querySelector(".zoom-overlay").addEventListener("click", () => {
      zoom.remove();
    });
  });
});


// Formspree JS
document.getElementById('contact-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);
  const action = 'https://formspree.io/f/mjkrqjpr'; 

  try {
    const response = await fetch(action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert('메일이 성공적으로 전송되었습니다!');
      form.reset();
    } else {
      alert('메일 전송에 실패했습니다. 다시 시도해주세요.');
    }
  } catch (error) {
    alert('오류가 발생했습니다.');
    console.error(error);
  }
});

// 다크모드 토글 JS
    AOS.init();
  document.querySelector('.mode-toggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
  });
