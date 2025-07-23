declare module 'pdf-parse' {
  interface PDFInfo {
    numpages: number;
    numrender: number;
    info: any;
    metadata: any;
    version: string;
  }

  interface PDFParseResult {
    text: string;
    info: PDFInfo;
    metadata: any;
  }

  interface PDFParseOptions {
    version?: string;
    pagerender?: Function;
    max?: number;
    timeout?: number;
    disableAutoFetch?: boolean;
    disableStream?: boolean;
  }

  function pdf(buffer: Buffer, options?: PDFParseOptions): Promise<PDFParseResult>;

  export = pdf;
}
