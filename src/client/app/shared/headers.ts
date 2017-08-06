import { Headers } from '@angular/http';

export const content_headers = new Headers();
content_headers.append('Accept', 'application/json');
content_headers.append('Content-Type', 'application/json');