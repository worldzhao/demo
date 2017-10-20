window.onload = function () {
    makeSureImgs();
    window.addEventListener('scroll', makeSureImgs);
};

function isInSight(pic) { //  判断图片是否距离可视区域只有100px
    const bounding = pic.getBoundingClientRect();
    const clientHeight = window.innerHeight || document.documentElement.clientHeight;
    if (bounding.top - 100 <= clientHeight) {
        return true;
    }
    return false;
}

function makeSureImgs() { // 对每一张图片是否处于区域内进行判断
    const imgs = document.querySelectorAll('.pic');
    const imgsArr = [].slice.call(imgs);
    for (let i = 0; i < imgsArr.length; i++) {
        const img = imgsArr[i];
        if (isInSight(img)) {
            loadImg(img);
        }
    }
}

function loadImg(img) { // 加载图片
    if (!img.src) {
        const source = img.dataset.src;
        img.src = source;
    }
}