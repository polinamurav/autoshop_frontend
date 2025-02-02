import {StatusTypeType} from "../../../types/status-type.type";

export class StatusUtil {
  static getStatus(status: StatusTypeType | undefined | null): { name: string } {
    let name = 'Ожидание';

    switch (status) {
      case StatusTypeType.DONE:
        name = 'Подтверждено';
        break;
      case StatusTypeType.REJECT:
        name = 'Отказано';
        break;
    }

    return {name};

  }
}
