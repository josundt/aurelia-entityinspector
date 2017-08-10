export type EntityType = object | any[] | Date | string | number | boolean | null;

export type ComplexType = (object | any[]) & { [key: string]: EntityType; };

export interface ReferenceObject {
    "$ref": string;
    [key: string]: any;
}

export enum EntityKind {
    object,
    array,
    date,
    string,
    number,
    boolean,
    null,
    reference,
    unknown
}

export interface PropertyModel {
    name: string;
    value: EntityType;
    objectId?: string;
    kind: EntityKind;
    hasChildren: boolean;
}
