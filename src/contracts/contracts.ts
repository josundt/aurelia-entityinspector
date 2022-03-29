export type EntityType = object | any[] | Date | string | number | boolean | null;

export type ComplexType = (object | any[]) & Record<string, EntityType>;

export interface ReferenceObject {
    "$ref": string;
    [key: string]: any;
}

/* eslint-disable id-denylist */
export enum EntityKind {
    object = 0,
    array = 1,
    date = 2,
    string = 3,
    number = 4,
    boolean = 5,
    null = 6,
    reference = 7,
    unknown = 8
}
/* eslint-enable id-denylist */

export interface PropertyModel {
    name: string;
    value: EntityType;
    objectId?: string;
    kind: EntityKind;
    hasChildren: boolean;
}
