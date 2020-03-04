import {DefaultCrudRepository} from '@loopback/repository';
import {Author, AuthorRelations} from '../models';
import {BibliotecagnommoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AuthorRepository extends DefaultCrudRepository<
  Author,
  typeof Author.prototype.dni,
  AuthorRelations
> {
  constructor(
    @inject('datasources.bibliotecagnommo') dataSource: BibliotecagnommoDataSource,
  ) {
    super(Author, dataSource);
  }
}
