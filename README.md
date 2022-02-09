
# Slider scroll

![version](https://img.shields.io/github/manifest-json/v/Natjo/slider-scroll)

Slider with the native scroll.
! not supported in safari (behavior: 'smooth')

## Parameters
| Parameter | Type | Description |
| ------ | ------ | ------ |
| el | HTMLElement | Element |

## Methods
| Method | Type | Description |
| ------ | ------ | ------ |
| create | function | Activate the slider |
| destroy | function | Desactivate the slider |

## Options
| Class  | Description |
| ------ | ------ |
| full | To have full width slider |


### Slider in container
```html
<div class="slider myslider">
    <ul class="slider-content">
        <li class="item"><a href="">1</a></li>
        <li class="item"><a href="">2</a></li>
        <li class="item"><a href="">3</a></li>
        <li class="item"><a href="">4</a></li>
        <li class="item"><a href="">5</a></li>
        <li class="item"><a href="">6</a></li>
        <li class="item"><a href="">7</a></li>
    </ul>
    <button class="slider-btn prev" aria-hidden="true" tabindex="-1">prev</button>
    <button class="slider-btn next" aria-hidden="true" tabindex="-1">next</button>
</div>
```

### Slider full width
```html
<div class="slider myslider">
    <ul class="slider-content full">
        <li class="item"><a href="">1</a></li>
        <li class="item"><a href="">2</a></li>
        <li class="item"><a href="">3</a></li>
        <li class="item"><a href="">4</a></li>
    </ul>
</div>
```

#### javascript
```javascript
const slider = document.querySelector('.myslider');
const myscroll = new scroller(slider);
myscroll.enable();
```

#### css
```css
.myslider{
    @media (min-width: 768px){
        --nb: 4;
    }
}
```

## Demo
[See codepen demo](https://codepen.io/natjo/pen/eYGWwEo)