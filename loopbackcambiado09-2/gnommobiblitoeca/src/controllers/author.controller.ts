import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Author} from '../models';
import {AuthorRepository} from '../repositories';

export class AuthorController {
  constructor(
    @repository(AuthorRepository)
    public authorRepository : AuthorRepository,
  ) {}

  @post('/authors', {
    responses: {
      '200': {
        description: 'Author model instance',
        content: {'application/json': {schema: getModelSchemaRef(Author)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Author, {
            title: 'NewAuthor',
            
          }),
        },
      },
    })
    author: Author,
  ): Promise<Author> {
    return this.authorRepository.create(author);
  }

  @get('/authors/count', {
    responses: {
      '200': {
        description: 'Author model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Author) where?: Where<Author>,
  ): Promise<Count> {
    return this.authorRepository.count(where);
  }

  @get('/authors', {
    responses: {
      '200': {
        description: 'Array of Author model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Author, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Author) filter?: Filter<Author>,
  ): Promise<Author[]> {
    return this.authorRepository.find(filter);
  }

  @patch('/authors', {
    responses: {
      '200': {
        description: 'Author PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Author, {partial: true}),
        },
      },
    })
    author: Author,
    @param.where(Author) where?: Where<Author>,
  ): Promise<Count> {
    return this.authorRepository.updateAll(author, where);
  }

  @get('/authors/{id}', {
    responses: {
      '200': {
        description: 'Author model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Author, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Author, {exclude: 'where'}) filter?: FilterExcludingWhere<Author>
  ): Promise<Author> {
    return this.authorRepository.findById(id, filter);
  }

  @patch('/authors/{id}', {
    responses: {
      '204': {
        description: 'Author PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Author, {partial: true}),
        },
      },
    })
    author: Author,
  ): Promise<void> {
    await this.authorRepository.updateById(id, author);
  }

  @put('/authors/{id}', {
    responses: {
      '204': {
        description: 'Author PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() author: Author,
  ): Promise<void> {
    await this.authorRepository.replaceById(id, author);
  }

  @del('/authors/{id}', {
    responses: {
      '204': {
        description: 'Author DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.authorRepository.deleteById(id);
  }
}
