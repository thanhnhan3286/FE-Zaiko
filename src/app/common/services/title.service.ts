import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  public constructor(
    private titleService: Title
  ) { }
  public updateTitle(): void {
    let selectorsValueStatic = '.group-search-container span.title,.forgot-pwd-mail-page span.title,.login-page span.title';
    let dataElement: NodeListOf<HTMLElement> =
      document.querySelectorAll(selectorsValueStatic);

    if (dataElement && dataElement.length > 0) {
      let title = dataElement[dataElement.length - 1].textContent ? dataElement[dataElement.length - 1].textContent :
        (dataElement[dataElement.length - 2].textContent ? dataElement[dataElement.length - 2].textContent : dataElement[dataElement.length - 3].textContent as string);

      if (title) {
        this.titleService.setTitle(title);
      }
    }
  }

}
