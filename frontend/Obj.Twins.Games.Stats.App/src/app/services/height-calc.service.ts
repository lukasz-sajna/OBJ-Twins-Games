import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeightCalcService {
  public calculateHeightFittedToScreen(element: HTMLElement | null, additionalOffset: number = 0): string {
    const topOffset = this.calcaulateTopOffset(element);
    const totalOffset = topOffset + additionalOffset;
    return `calc(100vh - ${totalOffset}px)`;
  }

  private calcaulateTopOffset(element: HTMLElement | null): number {
    if (!element) {
      return 0;
    }

    return element.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
  }

}
