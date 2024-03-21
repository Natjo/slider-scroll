
# Slider scroll

![version](https://img.shields.io/github/manifest-json/v/Natjo/slider-scroll)

Slider with the native scroll.<br>
! polyfill if (behavior: 'smooth') not supported 

## Parameters
| Parameter | Type | Description |
| ------ | ------ | ------ |
| el | HTMLElement | Element |

## Methods
| Method | Type | Description |
| ------ | ------ | ------ |
| enable | function | Activate the slider |
| disable | function | Desactivate the slider and remove events|

## Options
| Class  | Description |
| ------ | ------ |
| auto | Slides per view auto |

## Usage

### javascript
```javascript
import Slider from "../modules/slider"
const slider = document.querySelector('.myslider');
const myslider = new Slider(slider);
myslider.enable();
```

### Slides per view auto
#### html
```html
<div class="slider auto">
    <button class="slider-btn prev">prev</button>
    <button class="slider-btn next">next</button>
    <div class="slider-content">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item">6</div>
    </div>
    <div class="slider-pagination"></div>
</div>
```
#### css
```css
.slider{
    .item{
        background: pink;
        width: 600px;
        height: 300px;

        &:nth-child(2){
            width: 200px;
        }
        &:nth-child(3){
            width: 300px;
        }
    }
}
```

### Slides per view fixed
#### html
```html
<div class="slider">
    <button class="slider-btn prev">prev</button>
    <button class="slider-btn next">next</button>
    <div class="slider-content">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item">6</div>
    </div>
    <div class="slider-pagination"></div>
</div>
```
#### css
```css
.slider{
    --nb: 2;

    .item{
        background: antiquewhite;
        aspect-ratio: 1.5;
    }
    @media (min-width: 768px){
        --nb: 3;
    }
}
```



## Demo
<!-- <a href="https://codepen.io/natjo/pen/eYGWwEo" target="_blank">See codepen demo</a> -->

<a href="https://codepen.io/natjo/pen/xxewXvK?editors=1111" target="_blank">See codepen demo</a>