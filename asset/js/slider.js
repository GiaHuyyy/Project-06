const sliderList = document.querySelector(".ratting__list");
const sliderItems = document.querySelectorAll(".ratting__item");
const dotsItems = document.querySelectorAll(".ratting__dot");
let sliderWidth = sliderItems[0].offsetWidth;
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
    positionX = -index * sliderWidth;

    // Di chuyển tới slider tương ứng
    sliderList.style.transform = `translateX(${positionX}px)`;
}

// Hàm cập nhật chiều rộng của item dựa trên chiều rộng của cha
function updateSlideWidth() {
    // Lấy kích thước của phần tử có class .container (cha)
    const containerWidth = document.querySelector(".rating__wrap").offsetWidth;
    sliderWidth = containerWidth;
    sliderItems.forEach((slide) => {
        // Đặt kích thước của mỗi slide bằng kích thước của phần tử có class .container (cha)
        slide.style.width = `${containerWidth}px`;
    });
    positionX = -index * containerWidth;
    // Áp dụng transform để hiển thị slide hiện tại
    sliderList.style.transform = `translateX(${positionX}px)`;
}

// Cập nhật kích thước slide khi tải trang
window.addEventListener("DOMContentLoaded", updateSlideWidth);
// Cập nhật kích thước slide khi thay đổi kích thước trình duyệt
window.addEventListener("resize", updateSlideWidth);

// Sự kiện click vào dot để chuyển slide tương ứng
[...dotsItems].forEach((item, sliderIndex) =>
    item.addEventListener("click", function () {
        // Kiểm tra nếu dot được nhấn khác với slide hiện tại
        if (sliderIndex != index) {
            changeSlide(sliderIndex);
        }
    })
);

// Hàm chuyển slide
function loopChangeSlide() {
    setInterval(() => {
        let nextIndex = index + 1;
        if (nextIndex >= sliderItems.length) {
            nextIndex = 0;
        }
        changeSlide(nextIndex);
    }, 5000);
}

// Gọi vòng lặp chuyển slide
loopChangeSlide();

// Sự kiện chuyển slide bằng cách vuốt bằng tay hoặc kéo chuột
let startX;
let currentX;
let isDragging = false;

function handleTouchStart(e) {
    //Lấy vị trí khi bắt đầu nhấn xuống
    startX = e.touches[0].clientX;
    isDragging = true;
}

// Hàm tạo trải nghiệm người dùng khi kéo slide bằng cách di chuyển slide khi đang kéo
function handleTouchMove(e) {
    if (!isDragging) return;
    // Liên tục lấy vị trí mới cho đến khi dừng kéo
    currentX = e.touches[0].clientX;
    const diffX = currentX - startX;
    // Di chuyển slide khi đang kéo dựa trên khoảng cách từ 'startX' -> 'currentX'
    sliderList.style.transform = `translateX(${positionX + diffX}px)`;
}

function handleTouchEnd() {
    isDragging = false;
    const threshold = 100;
    const diffX = currentX - startX;
    // Nếu khoảng cách kéo hơn ngưỡng 100px thì cho phép chuyển slide tiếp theo
    if (Math.abs(diffX) > threshold) {
        // Nếu khoảng cách > 0 => dịch slider sang trái
        // Nếu khoảng cách < 0 => dịch slider sang phải
        const direction = diffX > 0 ? -1 : 1;
        const nextIndex = index + direction;

        if (nextIndex >= 0 && nextIndex < sliderItems.length) {
            changeSlide(nextIndex);
        }
    } else {
        sliderList.style.transform = `translateX(${positionX}px)`;
    }
}

function handleMouseDown(e) {
    startX = e.clientX;
    console.log("Bắt đầu " + startX);
    isDragging = true;
}

function handleMouseMove(e) {
    if (!isDragging) return;
    currentX = e.clientX;
    console.log("Kết thúc " + currentX);
    const diffX = currentX - startX;
    console.log("Kết quả " + diffX);
    sliderList.style.transform = `translateX(${positionX + diffX}px)`;
}

function handleMouseUp() {
    isDragging = false;
    const threshold = 100;
    const diffX = currentX - startX;
    if (Math.abs(diffX) > threshold) {
        const direction = diffX > 0 ? -1 : 1;
        const nextIndex = index + direction;
        console.log("Hướng " + direction);
        if (nextIndex >= 0 && nextIndex < sliderItems.length) {
            changeSlide(nextIndex);
        }
    } else {
        sliderList.style.transform = `translateX(${positionX}px)`;
    }
}

sliderList.addEventListener("touchstart", handleTouchStart);
sliderList.addEventListener("touchmove", handleTouchMove);
sliderList.addEventListener("touchend", handleTouchEnd);

sliderList.addEventListener("mousedown", handleMouseDown);
sliderList.addEventListener("mousemove", handleMouseMove);
sliderList.addEventListener("mouseup", handleMouseUp);
