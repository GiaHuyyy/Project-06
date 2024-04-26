const sliderList = document.querySelector(".ratting__list");
const sliderItems = document.querySelectorAll(".ratting__item");
const dotsItems = document.querySelectorAll(".ratting__dot");
const sliderWidth = sliderItems[0].offsetWidth;
let positionX = 0;
let index = 0;

function changeSlide(sliderIndex) {
    // Xóa class "ratting__dot-active" khỏi dot đang được active
    dotsItems.forEach((dot) => {
        dot.classList.remove("ratting__dot-active");
    });

    // Thêm class "ratting__dot-active" vào dot được active
    dotsItems[sliderIndex].classList.add("ratting__dot-active");

    // Cập nhật chỉ số và vị trí mới cho slide
    index = sliderIndex;
    positionX = -index * (sliderWidth); // Thêm 30px vào kích thước slide

    // Di chuyển tới slider tương ứng
    sliderList.style.transform = `translateX(${positionX}px)`;
}

// Function to update slide width based on container width
function updateSlideWidth() {
    const containerWidth = document.querySelector(".container").offsetWidth; // Lấy kích thước của phần tử có class .container
    sliderWidth = containerWidth; 
    sliderItems.forEach((slide) => {
        slide.style.width = `${containerWidth}px`; // Đặt kích thước của mỗi slide bằng kích thước của phần tử có class .container
    });
    positionX = -index * (containerWidth); 
    sliderList.style.transform = `translateX(${positionX}px)`; // Áp dụng transform để hiển thị slide hiện tại
}

// Gọi hàm cập nhật kích thước slide khi tải trang và khi thay đổi kích thước trình duyệt
window.addEventListener("DOMContentLoaded", updateSlideWidth);
window.addEventListener("resize", updateSlideWidth);

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