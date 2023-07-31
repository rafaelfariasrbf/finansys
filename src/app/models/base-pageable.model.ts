import { BasePageableMetaModel } from "./base-pageable-meta.model";

export interface BasePageable<T> {
    data: T[];
    meta: BasePageableMetaModel;
    links?: any[];
}
