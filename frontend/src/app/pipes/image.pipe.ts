import { Pipe, PipeTransform } from '@angular/core';
import { environment as env } from '../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (value) return env.apiUrl + '/uploads/' + value;
    return '/assets/images/image_not_found.png';
  }
}
