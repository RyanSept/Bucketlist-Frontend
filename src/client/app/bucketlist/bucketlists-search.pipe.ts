import { PipeTransform, Pipe } from '@angular/core';
import { IBucketlist } from './bucketlist.interface';

@Pipe({
  name: 'bucketlistsSearch'  
})

// Custom pipe for searching through bucketlists for matching names
export class BucketlistsSearchPipe implements PipeTransform{
    transform(bucketlist: IBucketlist[], filterBy: string): IBucketlist[]{
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        // return list of bucketlists with matches if filter string exists
        return filterBy ? bucketlist.filter(
    (bucketlist: IBucketlist) => {return bucketlist.name.toLocaleLowerCase().indexOf(filterBy) !== -1}) : bucketlist;
    }
}