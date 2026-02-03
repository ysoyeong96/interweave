//서브메뉴
$(function(){
  $('.gnb li').mouseenter(function(){  // gnb li에 마우스를 올리면
    $(this).children('.submenu').addClass('on'); // submenu에 on 클래스 추가
  });

  $('.gnb li').mouseleave(function(){ // gnb li에서 마우스를 빼면 
    $(this).children('.submenu').removeClass('on'); //submenu의 on 클래스 제거
  });
});

//검색창
  const searchBtn = document.querySelector('.search_ico');
  const fieldset = document.querySelector('#search');

  searchBtn.addEventListener('click', function(e){
    e.preventDefault(); // 버튼 submit 방지
    fieldset.classList.toggle('active');
  });


//공간소개
document.addEventListener('DOMContentLoaded', () => {
    // floor 영역
    const floors = document.querySelectorAll('#space .floor');

    // 배경 이미지 (img_wrap 안의 img)
    const bgImg = document.querySelector('#space .img_wrap img');

    floors.forEach((floor, index) => {
        floor.addEventListener('mouseenter', () => {

            // floor active 초기화
            floors.forEach(f => f.classList.remove('active'));

            // 현재 floor 활성화
            floor.classList.add('active');

            // index → floor 번호 (1부터 시작)
            const floorNum = index + 1;

            // 네이밍 규칙에 맞춰 이미지 경로 생성
            const newSrc = `images/main/floor${floorNum}_bg.jpg`;

            // 배경 이미지 교체
            bgImg.src = newSrc;
        });
    });
});

//tab
function openBoard(evt, boardName) {
	  var i, x, tablinks;
	  x = document.getElementsByClassName("board");
	  for (i = 0; i < x.length; i++) {
		x[i].style.display = "none";
	  }
	  tablinks = document.getElementsByClassName("tablink");
	  for (i = 0; i < x.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	  }
	  document.getElementById(boardName).style.display = "block";
	  evt.currentTarget.className += " active";
}

//------------------------- 서브 ---------------------------------
//brand story - 인트로 타이핑 
const textElements = gsap.utils.toArray('#story01 .typing');
textElements.forEach(text => {
  gsap.to(text, {
    backgroundSize: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: text,
      start: 'center 20%',
      end: 'center 100%',
      scrub: true,
    },
  });
});

//brand story - 사진 제어
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".img_frame",
  { width: 1000 },
  {
    width: 1200,
    ease: "none",
    scrollTrigger: {
      trigger: "#story01 .sub_top",
      start: "top top",
      end: "bottom center",
      scrub: true
    }
  }
);

//brand story line scrolled
document.addEventListener("DOMContentLoaded", function () {
  const line = document.querySelector('.tit_box .line');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        line.classList.add('line_scrolled');
      } else {
        // 화면에서 사라지면 다시 애니메이션 가능하게 클래스 제거
        line.classList.remove('line_scrolled');
      }
    });
  }, { threshold: 0.5 });

  observer.observe(line);
});


//store04 - core section
        document.addEventListener("DOMContentLoaded", () => {
            const columns = document.querySelectorAll('.slide-column');
            const bgTarget = document.getElementById('bg-target');
            let currentIndex = 0;
            let slideTimer;

            function updateSlide(index) {
                // 1. 모든 컬럼 초기화
                columns.forEach(col => col.classList.remove('active'));

                // 2. 현재 컬럼 활성화
                const activeCol = columns[index];
                activeCol.classList.add('active');

                // 3. 배경 이미지 변경 (data-img 값 가져오기)
                const newImg = activeCol.dataset.img;
                console.log("이미지 경로:", newImg);
                bgTarget.style.backgroundImage = 'url("' + newImg + '")';

                // 인덱스 업데이트
                currentIndex = index;
            }

            function autoSlide() {
                let nextIndex = (currentIndex + 1) % columns.length;
                updateSlide(nextIndex);
            }

            // 초기 이미지 설정
            updateSlide(0);

            // 4초마다 실행
            slideTimer = setInterval(autoSlide, 4000);

            // 클릭 시 수동 전환 및 타이머 리셋
            columns.forEach((col, index) => {
                col.addEventListener('click', () => {
                    updateSlide(index);
                    clearInterval(slideTimer); // 사용자가 클릭하면 자동 재생 잠시 정지 후 재시작
                    slideTimer = setInterval(autoSlide, 4000);
                });
            });
        });