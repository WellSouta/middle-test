import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'

import { Category } from './category.entity'
import { EntityBase } from './common/entity-base'
import { MultiLanguageField } from './fields/multi-language.field'
import { UserFavorite } from './user-favorite.entity'

@Entity('products')
export class Product extends EntityBase {
  @ApiProperty({
    type: 'string',
    description: 'Product name'
  })
  @Column('text')
  public name!: string

  @ApiProperty({
    type: MultiLanguageField,
    description: 'Product title'
  })
  @Column('jsonb')
  public title!: MultiLanguageField

  @ApiProperty({
    type: MultiLanguageField,
    description: 'Product description'
  })
  @Column('jsonb')
  public description!: MultiLanguageField

  @ApiProperty({
    type: 'number',
    description: 'Product price'
  })
  @Column('money')
  public price!: number

  @ApiProperty({
    type: 'string',
    format: 'uuid',
    description: 'Category ID'
  })
  @Column('uuid')
  public categoryId!: string

  @ApiProperty({
    type: () => [Category],
    description: 'Category'
  })
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  public category!: Category

  @ApiProperty({
    type: () => [UserFavorite],
    description: 'Users who favorited this product'
  })
  @OneToMany(() => UserFavorite, (favorite) => favorite.product)
  public favoritedBy!: UserFavorite[]
}
