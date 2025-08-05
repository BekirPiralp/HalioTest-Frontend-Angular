declare module 'alertifyjs' {
  interface AlertifyNotifier {
    delay(ms: number): AlertifyNotifier;
    position(pos: string): AlertifyNotifier;
    closeOthers(): AlertifyNotifier;
    setting(setting: string, value: any): AlertifyNotifier;
    settings(settings: object): AlertifyNotifier;
    maxLogItems(count: number): AlertifyNotifier;
  }

  interface Alertify {
    alert(message: string, onOk?: () => void): void;
    confirm(message: string, onOk?: () => void, onCancel?: () => void): void;
    prompt(
      message: string,
      onOk?: (value: string) => void,
      onCancel?: () => void,
      placeholder?: string
    ): void;
    success(message: string): AlertifyNotifier;
    error(message: string): AlertifyNotifier;
    warning(message: string): AlertifyNotifier;
    message(message: string): AlertifyNotifier;
    log(message: string): AlertifyNotifier;
    notify(message: string, type?: string, wait?: number, callback?: () => void): AlertifyNotifier;
    closeLog(): void;
    clearAll(): void;
    set(setting: string, value: any): void;
    get(setting: string): any;
  }

  const alertify: Alertify;
  export default alertify;
}
