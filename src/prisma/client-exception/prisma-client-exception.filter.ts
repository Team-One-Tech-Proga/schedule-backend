//src/prisma-client-exception.filter.ts

import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpServer,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

export type ErrorCodesStatusMapping = {
  [key: string]: number;
};

@Catch(Prisma?.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  private errorCodesStatusMapping: ErrorCodesStatusMapping = {
    P2000: HttpStatus.BAD_REQUEST,
    P2001: HttpStatus.NOT_FOUND,
    P2002: HttpStatus.CONFLICT,
    P2003: HttpStatus.INTERNAL_SERVER_ERROR,
    P2004: HttpStatus.INTERNAL_SERVER_ERROR,
    P2005: HttpStatus.BAD_REQUEST,
    P2006: HttpStatus.BAD_REQUEST,
    P2007: HttpStatus.INTERNAL_SERVER_ERROR,
    P2008: HttpStatus.BAD_REQUEST,
    P2009: HttpStatus.INTERNAL_SERVER_ERROR,
    P2010: HttpStatus.BAD_REQUEST,
    P2011: HttpStatus.BAD_REQUEST,
    P2012: HttpStatus.BAD_REQUEST,
    P2013: HttpStatus.BAD_REQUEST,
    P2014: HttpStatus.BAD_REQUEST,
    P2015: HttpStatus.NOT_FOUND,
    P2016: HttpStatus.INTERNAL_SERVER_ERROR,
    P2017: HttpStatus.BAD_REQUEST,
    P2018: HttpStatus.NOT_FOUND,
    P2019: HttpStatus.BAD_REQUEST,
    P2020: HttpStatus.PAYLOAD_TOO_LARGE,
    P2021: HttpStatus.NOT_FOUND,
    P2022: HttpStatus.NOT_FOUND,
    P2023: HttpStatus.BAD_REQUEST,
    P2024: HttpStatus.REQUEST_TIMEOUT,
    P2025: HttpStatus.NOT_FOUND,
    P2026: HttpStatus.METHOD_NOT_ALLOWED,
  };
  constructor(
    applicationRef?: HttpServer,
    errorCodesStatusMapping?: ErrorCodesStatusMapping,
  ) {
    super(applicationRef);

    if (errorCodesStatusMapping) {
      this.errorCodesStatusMapping = Object.assign(
        this.errorCodesStatusMapping,
        errorCodesStatusMapping,
      );
    }
  }
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const statusCode = this.errorCodesStatusMapping[exception.code];
    const message = `[${exception.code}]: ${this.exceptionShortMessage(
      exception.message,
    )}`;

    if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
      return super.catch(exception, host);
    }

    super.catch(new HttpException({ statusCode, message }, statusCode), host);
  }

  private exceptionShortMessage(message: string): string {
    //console.log(message);
    const shortMessage = message.substring(message.indexOf('→'));

    return shortMessage
      .substring(shortMessage.indexOf('\n'))
      .replace(/\n/g, '')
      .trim();
  }
}
