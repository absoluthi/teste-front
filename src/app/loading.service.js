export class LoadingService {
  constructor() {
    this.loadingElement = document.getElementById('loading')
  }

  startLoading() {
    return this.loadingElement.style.display = 'flex';
  }
  finishLoading() {
    return this.loadingElement.style.display = 'none';
  }
}