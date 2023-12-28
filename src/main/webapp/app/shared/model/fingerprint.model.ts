import { IFingerprintTemplate } from 'app/shared/model/fingerprint-template.model';
import { FingerName } from 'app/shared/model/enumerations/finger-name.model';
import { HandName } from 'app/shared/model/enumerations/hand-name.model';

export interface IFingerprint {
  id?: string;
  uuid?: string;
  fingerName?: keyof typeof FingerName;
  handName?: keyof typeof HandName;
  template?: IFingerprintTemplate | null;
}

export const defaultValue: Readonly<IFingerprint> = {};
