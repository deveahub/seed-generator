export type ToastType = 'success';

export interface ToastData {
  text: string;
  type: ToastType;
  key: string;
}

export type ToastsData = Array<ToastData>;
