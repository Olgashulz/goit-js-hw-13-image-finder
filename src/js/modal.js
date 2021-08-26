import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export default function openModal (event) {

    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
      }
      // console.log(event.target);
      // console.log(event.target.dataset.source);

      const imgChange = `<img src= "${event.target.dataset.source}" height="600"/>`;
      const instance = basicLightbox.create(imgChange);
      
      instance.show();
}