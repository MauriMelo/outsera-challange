import * as fs from 'fs';
import { Injectable } from '@nestjs/common';

interface ReadCSVConfig<T> {
  delimiter: string;
  headers: T[];
}

@Injectable()
export default class CSVHelper {
  private static defaultParams = {
    delimiter: ';',
    headers: [],
  };

  public static readCsv<const Cols extends string>(
    filePath: string,
    params: Partial<ReadCSVConfig<Cols>>,
  ) {
    const { delimiter, headers } = Object.assign(
      {},
      this.defaultParams,
      params,
    );
    const fileRaw = fs.readFileSync(filePath, 'utf8');

    const lines = fileRaw.split('\n');
    if (!lines.length) {
      throw new Error('CSV file is empty or not formatted correctly.');
    }

    const [_, ...rest] = lines;

    const data = rest.reduce<Record<Cols, string>[]>((arr, line: string) => {
      if (line.trim()) {
        arr.push(this.lineSplit(line, delimiter, headers));
      }

      return arr;
    }, []);

    return {
      header: headers,
      data: data,
    };
  }

  private static lineSplit<Cols extends string>(
    line: string,
    delimiter: string,
    headers: Cols[],
  ) {
    const values = line.split(delimiter);
    const obj: Record<Cols, string> = {} as Record<Cols, string>;

    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    return obj;
  }
}
