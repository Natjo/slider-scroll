/**
 * @module Slider
 * @param {HTMLElement} el 
 * 
 */

function Slider(slider) {
    const isTouch = 'ontouchstart' in document.documentElement;
    const content = slider.querySelector('.slider-content');
    const items = content.querySelectorAll('.item');
    const pagination = slider.querySelector('.slider-pagination');
    const btn_next = slider.querySelector('.next');
    const btn_prev = slider.querySelector('.prev');
    const focusEls = slider.querySelectorAll('.item a,.item button,.item input');
    let bullets = [];
    let offsetX = 0;
    let index = 0;
    let length = 1;
    let paddingLeft;
    let req;
    let downX = 0;

    const getLength = () => {
        length = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].offsetLeft < content.scrollWidth - content.offsetWidth + paddingLeft) {
                length++;
            }
        }
    }

    getLength();

    focusEls.forEach(el => {
        el.onfocus = () => {
            const item = el.closest('.item');
            index = [...item.parentNode.children].indexOf(item);
            if (index > length) index = length;
            goto();
        }
    });

    if (pagination) {
        for (let i = 0; i < items.length; i++) {
            const bullet = document.createElement('button');
            bullet.value = i;
            bullet.className = "hide";
            bullet.setAttribute('aria-hidden', true);
            bullet.setAttribute('tabindex', -1);
            pagination.appendChild(bullet);
            bullets.push(bullet);
        }
    }

    function fakeScrollTo(end) {
        let init = null;
        let time;
        const start = content.scrollLeft;
        const duration = 600;
        const easeOutQuart = (t, b, c, d) => -c * ((t = t / d - 1) * t * t * t - 1) + b;
        const easeOutCubic = (t, b, c, d) => c * ((t = t / d - 1) * t * t + 1) + b;
        const easeOutQuint = (t, b, c, d) => c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        const easeOutExpo = (t, b, c, d) => (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        const startAnim = timeStamp => {
            init = timeStamp;
            draw(timeStamp);
        }
        const draw = now => {
            time = now - init;
            content.scrollTo(Math.round(easeOutCubic(time, start, end - start, duration)), 0);
            req = requestAnimationFrame(draw);
            time >= duration && cancelAnimationFrame(req);
        }
        req = requestAnimationFrame(startAnim)
    };

    const mouseMove = e => {
        content.classList.add('onswipe');
        content.scrollTo(-e.clientX + offsetX, 0);
    };

    const resize = () => {
        paddingLeft = slider.offsetLeft;
        const bound = slider.getBoundingClientRect();
        slider.style.setProperty('--left', `${bound.left}px`);
        slider.style.setProperty('--right', `${document.body.clientWidth - bound.right}px`);
        getLength();
        goto();
    };

    function controlStatus() {
        if (pagination) {
            for (let i = 0; i < bullets.length; i++) {
                bullets[i].classList[i === index ? 'add' : 'remove']('active');
                bullets[i].classList[i <= length ? 'remove' : 'add']('hide')
            }
            if (bullets.length == 1) bullets[0].classList.add('hide')
        }
        if (btn_prev) {
            if (index <= 0) btn_prev.setAttribute('aria-disabled', true);
            else btn_prev.removeAttribute('aria-disabled');
            btn_prev.classList[length === 0 ? 'add' : 'remove']('hide');
        }
        if (btn_next) {
            if (index == length) btn_next.setAttribute('aria-disabled', true);
            else btn_next.removeAttribute('aria-disabled');
            btn_next.classList[length === 0 ? 'add' : 'remove']('hide');
        }
    }

    const goto = () => {
        controlStatus();
        const itempos = items[index].offsetLeft - paddingLeft;
        let diff = itempos - (content.scrollWidth - content.offsetWidth);
        if (diff < 0) diff = 0;
        cancelAnimationFrame(req);
        fakeScrollTo(itempos - diff);
    };

    function getIndex() {
        if (content.scrollLeft - downX > 40) index++;
        if (content.scrollLeft - downX < - 40) index--;
        if (index <= 0) index = 0;
        if (index > length) index = length;
    }

    const mouseUp = e => {
        getIndex();
        goto();
        window.removeEventListener('mousemove', mouseMove);
        window.removeEventListener('mouseup', mouseUp);
        content.classList.remove('onswipe');
    };

    const mouseDown = val => {
        cancelAnimationFrame(req);
        downX = content.scrollLeft;
        offsetX = val + content.scrollLeft;
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
        return false;
    };

    const next = () => {
        index++;
        if (index >= length) index = length;
        if (pagination) {
            if (index >= bullets.length - 1) index = bullets.length - 1;
        }
        goto();
    };

    const prev = () => {
        index--;
        if (index <= 0) index = 0;
        goto();
    };

    if (btn_next) btn_next.onclick = () => next();
    if (btn_prev) btn_prev.onclick = () => prev();

    bullets.forEach(bullet => {
        bullet.onclick = () => {
            index = Number(bullet.value);
            goto();
        }
    })

    this.enable = () => {
        slider.classList.add('slider');
        index = 0;
        resize();
        if (!isTouch) {
            content.onmousedown = e => mouseDown(e.clientX);
            window.addEventListener('resize', resize, { passive: true });
        } else {
            content.classList.add('touchable');
            content.addEventListener("scroll", () => {
                index = -1;
                getIndex();
                controlStatus();
            }, { passive: true });
        }
    };

    this.disable = () => {
        slider.classList.remove('slider');
        content.onmousedown = null;
        window.removeEventListener('resize', resize);
        mouseUp();
    };
}

export default Slider;