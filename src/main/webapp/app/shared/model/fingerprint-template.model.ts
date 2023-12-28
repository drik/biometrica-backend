export interface IFingerprintTemplate {
  id?: string;
  templateVersion?: string | null;
  templateDataContentType?: string | null;
  templateData?: string | null;
  originalImageContentType?: string | null;
  originalImage?: string | null;
  originalImageMime?: string | null;
  originalImageExtension?: string | null;
}

export const defaultValue: Readonly<IFingerprintTemplate> = {};
