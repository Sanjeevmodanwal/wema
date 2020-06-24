import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
/**
 * Generated class for the SafeHtmlPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
 /* transform(value: string, ...args) {
    return value.toLowerCase();
  }
  
   transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }*/
  constructor(private sanitizer:DomSanitizer){}

 
  transform(value: string, args: string) : string {
    // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    // let trail = args.length > 1 ? args[1] : '...';
    let limit = args ? parseInt(args, 12) : 12;
    let trail = '...';
    return value.length > limit ? value.substring(0, limit) + trail : value;


  }

  
}
