import { IItems } from './items.interface';
export interface IBucketlist{
    id: number,
    name: string,
    items: IItems,
    created_by: number,
    date_created: string,
    date_modified: string,
}