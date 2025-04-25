import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'

import { ParseULIDPipe } from './parse-ulid.pipe'

@Injectable()
export class OptionalParseULIDPipe
  implements PipeTransform<string | undefined, Promise<string | undefined>>
{
  private readonly parseULIDPipe = new ParseULIDPipe()

  async transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): Promise<string | undefined> {
    if (typeof value === 'undefined' || value === null) {
      return undefined
    }

    return this.parseULIDPipe.transform(value, metadata)
  }
}
