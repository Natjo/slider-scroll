
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
        <div class="item"><a href="">2</a></div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item"><button>6</button></div>
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

#### js
```javascript
import Slider from "../modules/slider"
const slider = new Slider(document.querySelector('.slider'));
slider.enable();
```

### Slider full width and without controls
#### html
```html
<div class="slider full">
    <ul class="slider-content" aria-label="Last news">
        <li class="item"><a href="">1</a></li>
        <li class="item"><a href="">2</a></li>
        <li class="item"><a href="">3</a></li>
        <li class="item"><a href="">4</a></li>
    </ul>
</div>
```
#### css
```css
.slider{
    @media (max-width: 599px){
        --nb: 2;
    }
    @media (min-width: 600px){
        --col: 12;
        --nb: 4;
    }
}
```

### Slider full width and controls
#### html
```html
<div class="slider full">
    <ul class="slider-content" aria-label="Last news">
        <li class="item"><a href="">1</a></li>
        <li class="item"><a href="">2</a></li>
        <li class="item"><a href="">3</a></li>
        <li class="item"><a href="">4</a></li>
    </ul>
    <button class="slider-btn prev" aria-hidden="true" tabindex="-1">prev</button>
    <button class="slider-btn next" aria-hidden="true" tabindex="-1">next</button>
</div>
```
#### css
```css
.slider{
    grid-template-columns: var(--offset) auto var(--offset);

    .slider-content{
        grid-column: 1/-1;
    }
    .slider-btn{
        grid-column: 2;
    }

    @media (max-width: 599px){
        --nb: 2;
    }
    @media (min-width: 600px){
        --col: 12;
        --nb: 4;
    }
}
```


## Demo
<a href="https://codepen.io/natjo/pen/eYGWwEo" target="_blank">See codepen demo</a>

<a href="https://codepen.io/natjo/pen/xxewXvK?editors=1111" target="_blank">See last demo</a>