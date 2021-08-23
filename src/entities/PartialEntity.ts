import { IListItem } from './IListItem';

// Define an entity type based on (derived from) list item where the id property is the only required property.
// It is useful to declare entities where the id is required to identify, update or find the item, but the rest is optional.
export type PartialEntity<TEntity extends IListItem> = Partial<TEntity> & Pick<TEntity, 'id'>;
