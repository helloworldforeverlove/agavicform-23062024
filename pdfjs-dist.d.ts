declare module 'pdfjs-dist/build/pdf' {
    export const GlobalWorkerOptions: {
        workerSrc: string;
    };
    export function getDocument(src: string | Uint8Array | any): any;
}

declare module 'pdfjs-dist/build/pdf.worker.entry' {}
