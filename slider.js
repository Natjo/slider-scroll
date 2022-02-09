/**
 * @module Slider
 * @param {HTMLElement} el 
 * 
 */

// Change animation by scrollIntoView when supported
function scroller(slider){
	const isTouch = 'ontouchstart' in document.documentElement;
	const content = slider.querySelector('.slider-content');
	const items = content.querySelectorAll('.item');
	const btn_next = slider.querySelector('.next');
	const btn_prev = slider.querySelector('.prev');
	let offsetX = 0;
	let index = 0;
	let itemW;
	let downX;	
	let gap;
	let nb;
	
	const mouseMove = e => {
		content.classList.add('onswipe');
		content.scrollTo(-e.clientX + offsetX, 0);
	};
	
	const resize = () => {
		gap = parseInt(getComputedStyle(content).gridColumnGap);
		nb = parseInt(getComputedStyle(slider).getPropertyValue('--nb')) || 1;
		itemW = items[0].offsetWidth;
		goto(index);
	}
	
	const goto = num => {
    	content.scrollTo({
			left: (itemW + gap) * num,
			behavior: 'smooth'
		});
	}

	const mouseUp = e => {
		index = 0;
		items.forEach((item,i) => {
			if(item.offsetLeft - (itemW / 2) - gap < content.scrollLeft) index = i;
		});
		goto(index);
		window.removeEventListener('mousemove', mouseMove);
		window.removeEventListener('mouseup', mouseUp);
		content.classList.remove('onswipe');
	}

	const mouseDown = val => {	
		downX = val;
		offsetX = downX + content.scrollLeft;
		window.addEventListener('mousemove', mouseMove);
		window.addEventListener('mouseup', mouseUp);
		return false;
	}
	
	const next = () => {
		index++;
		if(index >= items.length - nb) index = items.length - nb;
		goto(index);
	}

	const prev = () => {
		index--;
		if(index <= 0) index = 0;
		goto(index);
	}
	
	if(btn_next) btn_next.onclick = () => next();
	if(btn_prev) btn_prev.onclick = () => prev();
	
	this.enable = () => {
		if(!isTouch){
			resize();
			content.onmousedown = e => mouseDown(e.clientX);
			window.addEventListener('resize', resize, {passive: true});
		}
	}
	
	this.disable = () => {
		content.onmousedown = null;
		window.removeEventListener('resize',resize);
		mouseUp();
	}
}



export default Slider;