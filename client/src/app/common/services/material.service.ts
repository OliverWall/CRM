export class MaterialService {
  static toast(message: string) {
    // @ts-ignore
    M.toast({html: message});
  }
}
