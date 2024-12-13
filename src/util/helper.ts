import fs from 'fs';
import moment from 'moment-timezone';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

export class Helper {
  static cloneObject(data: any) {
    return JSON.parse(JSON.stringify(data));
  }
  static replaceObject(data: any, result: any) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (data[key] != null) result[key] = data[key];
      }
    }
  }

  public static convertStringToArray(data: string): string[] {
    return data.split(',').map((item) => item.trim());
  }
  public static paginationResult(
    skip: number,
    limit: number,
    result: IFindAndCountAll,
    other?: any,
  ) {
    let countPage: number = result.count / limit;
    if (countPage.toString().includes('.'))
      countPage = Number(countPage.toString().split('.')[0]) + 1;

    let currentPage = Math.floor(skip / limit) + 1;
    let nextPage = 0;
    let previousPage = 0;

    nextPage = countPage > currentPage ? currentPage + 1 : 0;
    previousPage = currentPage > 1 ? currentPage - 1 : 0;

    return {
      ...other,
      records: result.count,
      pages: countPage,
      currentPage,
      nextPage,
      previousPage,
      rows: result.rows,
    };
  }
  static async unlinkFile(path: string) {
    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('File deleted successfully');
      }
    });
  }

  static currentDateTime() {
    return moment().tz('Asia/Bangkok').format(moment.defaultFormat);
  }
  static currentTime() {
    const t = moment().tz('Asia/Bangkok');
    return t.toString().substring(16, 25);
  }
  static currentDate() {
    return moment().tz('Asia/Bangkok').format(moment.HTML5_FMT.DATE);
  }
  static currentYear() {
    return new Date().getFullYear().toString();
  }
  static async sendErrorToSlack(data: any) {
    try {
      const headers = {
        headers: {
          Accept: 'application/json',
        },
      };
      await axios.post(
        process.env.SLACK_WEBHOOK_CHANNEL!,
        { text: data },
        { ...headers },
      );
    } catch (error: any) {}
  }

  public static async comparePassword(
    enteredPassword: string,
    dbPassword: string,
  ) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
interface IFindAndCountAll {
  count: number;
  rows: Array<any>;
}
