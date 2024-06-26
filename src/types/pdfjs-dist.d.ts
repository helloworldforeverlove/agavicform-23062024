declare module 'pdfjs-dist/build/pdf' {
    import { PDFDocumentProxy, PDFPageProxy, PDFWorker } from 'pdfjs-dist/types/src/display/api';
    export const GlobalWorkerOptions: { workerSrc: string };
    export function getDocument(src: string | Uint8Array | { data: Uint8Array }): PDFDocumentLoadingTask;

    export interface PDFDocumentLoadingTask {
        promise: Promise<PDFDocumentProxy>;
    }

    export interface PDFDocumentProxy {
        numPages: number;
        getPage(pageNumber: number): Promise<PDFPageProxy>;
    }

    export interface PDFPageProxy {
        getViewport(params: { scale: number }): PDFPageViewport;
        render(params: { canvasContext: CanvasRenderingContext2D, viewport: PDFPageViewport }): PDFPageRenderTask;
    }

    export interface PDFPageViewport {
        width: number;
        height: number;
    }

    export interface PDFPageRenderTask {
        promise: Promise<void>;
    }
}
