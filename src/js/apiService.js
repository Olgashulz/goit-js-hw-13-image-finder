const KEY_API = '10507999-623e060cae639baa9b9819f90';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';


export default class NewGallery {
  constructor(page = 1, inputValue = 'cats', ) {
    this.page = page;
    this.inputValue = inputValue;
 }

  async fetchPictures() {
    const response = await fetch(`${BASE_URL}${this.inputValue}&page=${this.page}&per_page=12&key=${KEY_API}`);
    return await response.json();
  } 
  
   getPictures(inputValue) {
    return this.fetchPictures()

  }
  setInputValue (value) {
    this.inputValue = value;
  }

  incrementPage() {
    return this.page += 1;
  }

  returnStartPage() {
    return this.page =1;
  }
}

