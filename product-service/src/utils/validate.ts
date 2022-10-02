import { validate as uuidValidate } from 'uuid';
import { HttpException, HttpStatus } from '@nestjs/common';

/** checks the id */
export function checkId(id: string) {
  if (!uuidValidate(id))
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Id is invalid (not uuid)',
      },
      HttpStatus.BAD_REQUEST,
    );
}
