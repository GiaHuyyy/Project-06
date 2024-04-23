const sliderList = document.querySelector(".ratting__list");
const sliderItems = document.querySelectorAll(".ratting__item");
const dotsItems = document.querySelectorAll(".ratting__dot");
const sliderWidth = sliderItems[0].offsetWidth;
let positionX = 0;
let index = 0;

// Update sliderWidth width when window resize
// Hàm cập nhật kích thước của slide
// function updateSlideWidth() {
//     const windowWidth = window.innerWidth; // Kích thước chiều rộng của trình duyệt
//     sliderItems.forEach((slide) => {
//         slide.style.width = `${windowWidth}px`; // Gán chiều rộng của slide bằng kích thước chiều rộng của trình duyệt
//     });
// }

// // Gọi hàm cập nhật kích thước slide khi tải trang và khi thay đổi kích thước trình duyệt
// window.addEventListener("DOMContentLoaded", updateSlideWidth);
// window.addEventListener("resize", updateSlideWidth);

// Change slide auto
function changeSlide(sliderIndex) {
    // Xóa class "ratting__dot-active" khỏi dot đang được active
    dotsItems.forEach((dot) => {
        dot.classList.remove("ratting__dot-active");
    });

    // Thêm class "ratting__dot-active" vào dot được active
    dotsItems[sliderIndex].classList.add("ratting__dot-active");

    // Cập nhật chỉ số và vị trí mới cho slide
    index = sliderIndex;
    positionX = -index * sliderWidth;

    // Di chuyển tới slider tương ứng
    sliderList.style.transform = `translateX(${positionX}px)`;
}

// Events clicked dot
[...dotsItems].forEach((item, sliderIndex) =>
    item.addEventListener("click", function () {
        // Kiểm tra nếu dot được nhấn khác với slide hiện tại
        if (sliderIndex != index) {
            changeSlide(sliderIndex);
        }
    })
);

// Loop animation change slide
function loopChangeSlide() {
    setInterval(() => {
        let nextIndex = index + 1;
        if (nextIndex >= sliderItems.length) {
            nextIndex = 0;
        }
        changeSlide(nextIndex);
    }, 2500);
}

// Start event loop animation change slide
loopChangeSlide();
