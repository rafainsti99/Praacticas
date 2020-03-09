import {DefaultCrudRepository} from '@loopback/repository';
import {Authors, AuthorsRelations} from '../models';
import {BibliotecagnommoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AuthorsRepository extends DefaultCrudRepository<
  Authors,
  typeof Authors.prototype.id,
  AuthorsRelations
> {
  constructor(
    @inject('datasources.bibliotecagnommo') dataSource: BibliotecagnommoDataSource,
  ) {
    super(Authors, dataSource);
  }
}
