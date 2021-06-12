export interface IEntityMapper<TEntity> {
  map(listItem: object): TEntity;
}