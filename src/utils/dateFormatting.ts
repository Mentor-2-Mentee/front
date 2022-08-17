export default class DateFormatting {
  date?: Date;
  constructor(getDateValue: Date | null) {
    if (!getDateValue) return;
    this.date = new Date(getDateValue);
  }

  get YYYY_MM_DD(): string {
    if (this.date === undefined) return "";
    const YYYY = this.date.getFullYear().toString();
    const MM = (this.date.getMonth() + 1).toString().padStart(2, "0");
    const DD = this.date.getDate().toString().padStart(2, "0");
    return `${YYYY}-${MM}-${DD}`;
  }

  get HH_MM_SS(): string {
    if (this.date === undefined) return "";
    const HH = this.date.getHours().toString();
    const MM = this.date.getMinutes().toString().padStart(2, "0");
    const SS = this.date.getSeconds().toString().padStart(2, "0");
    return `${HH}:${MM}:${SS}`;
  }

  get HH_MM(): string {
    if (this.date === undefined) return "";
    const HH = this.date.getHours().toString();
    const MM = this.date.getMinutes().toString().padStart(2, "0");
    return `${HH}:${MM}`;
  }

  prettyTimeStamp(timeStamp: string): string {
    const YYYY_MM_DD_regExp = /\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])/;
    const YYYY_MM_DD = YYYY_MM_DD_regExp.exec(timeStamp);

    const HH_MM_SS_regExp = /([01][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])/;
    const HH_MM_SS = HH_MM_SS_regExp.exec(timeStamp);

    if (!YYYY_MM_DD || !HH_MM_SS) return "";

    return `${YYYY_MM_DD[0].toString()} ${HH_MM_SS[0].toString()}`;
  }
}
