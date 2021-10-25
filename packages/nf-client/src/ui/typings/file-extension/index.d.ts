declare module 'file-extension' {
  export default (filename: string, opts?: { preserveCase: boolean }): string => filename;
}
