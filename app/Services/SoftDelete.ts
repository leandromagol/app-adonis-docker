import { LucidRow, ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Model'
import { DateTime } from 'luxon';
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import is from '@sindresorhus/is'
import emptyString = is.emptyString
// Optional null check query
export const softDeleteQuery = (query: ModelQueryBuilderContract<typeof BaseModel>) => {
  query.whereNull('deleted_at')
}
export const softDelete = async (row: LucidRow, column: string = 'deletedAt') => {
    console.log(row,'rowcolum')
  if(!emptyString(row[column])) {
    row[column] = DateTime.local();
    await row.save();
  }
}

