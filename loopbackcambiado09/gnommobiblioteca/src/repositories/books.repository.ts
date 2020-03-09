import {DefaultCrudRepository} from '@loopback/repository';
import {Books, BooksRelations} from '../models';
import {BibliotecagnommoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class BooksRepository extends DefaultCrudRepository<
  Books,
  typeof Books.prototype.id,
  BooksRelations
> {
  constructor(
    @inject('datasources.bibliotecagnommo') dataSource: BibliotecagnommoDataSource,
  ) {
    super(Books, dataSource);
  }
}
