import {Entity, model, property} from '@loopback/repository';

@model()
export class Authors extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;


  constructor(data?: Partial<Authors>) {
    super(data);
  }
}

export interface AuthorsRelations {
  // describe navigational properties here
}

export type AuthorsWithRelations = Authors & AuthorsRelations;
