import { Injectable, PipeTransform } from '@nestjs/common';
import * as fs from 'fs';
import { promisify } from 'util';
import * as sharp from 'sharp';

const readFileAsync = promisify(fs.readFile);

@Injectable()
export class OptimizeFilePipe
  implements PipeTransform<Express.Multer.File, Promise<Express.Multer.File>>
{
  async transform(file: Express.Multer.File): Promise<Express.Multer.File> {
    const fileBuffer = await readFileAsync(file.path);

    await sharp(fileBuffer).resize(200).toFile(file.path);

    return file;
  }
}
