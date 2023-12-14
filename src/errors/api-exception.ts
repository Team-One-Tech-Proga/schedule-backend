import { ApiProperty } from '@nestjs/swagger';
import { HttpExceptionBody } from '@nestjs/common/interfaces/http/http-exception-body.interface';

export class ApiException implements HttpExceptionBody {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  error?: string;
}
