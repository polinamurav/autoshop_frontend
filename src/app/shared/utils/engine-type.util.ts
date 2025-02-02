import {EngineTypeType} from "../../../types/engine-type.type";

export class EngineTypeUtil {
  static getEngineType(status: EngineTypeType | undefined | null): { name: string } {
    let name = 'Дизель';

    switch (status) {
      case EngineTypeType.DIESEL:
        name = 'Дизель';
        break;
      case EngineTypeType.HYBRID:
        name = 'Гибрид';
        break;
      case EngineTypeType.PETROL:
        name = 'Бензин';
        break;
    }

    return {name};
  }
}
