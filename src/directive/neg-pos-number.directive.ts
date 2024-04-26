/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[numberNegAndPos]'
})
export class NumberNegAndPosDirective {


  public constructor(private elementRef: ElementRef, private control: NgControl) { }

  @HostListener('input', ['$event'])

  public onInput(event: InputEvent): void {

    const value = this.elementRef.nativeElement.value;

    if (value === '') {
      return;
    }

    const allowedCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-'];
    const allowedCharacters1 = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const allowedCharactersJapanese = ['ぁ', 'あ', 'ぃ', 'い', 'ぅ', 'う', 'ぇ', 'え', 'ぉ', 'お', 'か', 'が', 'き', 'ぎ', 'く', 'ぐ', 'け', 'げ', 'こ', 'ご', 'さ', 'ざ', 'し', 'じ', 'す', 'ず', 'せ', 'ぜ', 'そ', 'ぞ', 'た', 'だ', 'ち', 'ぢ', 'つ', 'づ', 'て', 'で', 'と', 'ど', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ば', 'ひ', 'び', 'ふ', 'ぶ', 'へ', 'べ', 'ほ', 'ぼ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'];
    const allowedCharactersJapaneseNumber = ['０', '１', '２', '３', '４', '５', '６', '７', '８', '９'];

    for (const character of value) {
      if (value[0] === '-') {
        if (!allowedCharacters.includes(character) || allowedCharactersJapanese.includes(character) || allowedCharactersJapaneseNumber.includes(character) || (value.split('-').length - 1) > 1) {
          // event.data = value.replace(character, '');
          this.control?.control?.patchValue('', { emitEvent: true });
          break;
        }
      } else {
        if (!allowedCharacters1.includes(character) || allowedCharactersJapanese.includes(character) || allowedCharactersJapaneseNumber.includes(character) || (value.split('-').length - 1) > 1) {
          // event.data = value.replace(character, '');
          this.control?.control?.patchValue('', { emitEvent: true });
          break;
        }
      }

    }
  }
}
