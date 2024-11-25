import { Pipe, PipeTransform } from '@angular/core';
import { format, formatDistanceToNow } from 'date-fns';

@Pipe({
  name: 'chatTime'
})
export class ChatTimePipe implements PipeTransform {

  transform(value: string | Date): string {
    const messageDate = new Date(value);
    const now = new Date();
    const diffInMs = now.getTime() - messageDate.getTime();
    const oneDayInMs = 24 * 60 * 60 * 1000;
    if (diffInMs < oneDayInMs) {
      return formatDistanceToNow(messageDate, { addSuffix: true });
    } else {
      return format(messageDate, 'dd MMM yyyy, HH:mm');
    }
  }

}
