/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "./stencil-public-runtime";
export namespace Components {
    interface TalisPdfViewer {
        "annotations": string;
        "currentPage": number;
        "depotUrl": string;
        "pageCount": number;
        "token": string;
    }
}
declare global {
    interface HTMLTalisPdfViewerElement extends Components.TalisPdfViewer, HTMLStencilElement {
    }
    var HTMLTalisPdfViewerElement: {
        prototype: HTMLTalisPdfViewerElement;
        new (): HTMLTalisPdfViewerElement;
    };
    interface HTMLElementTagNameMap {
        "talis-pdf-viewer": HTMLTalisPdfViewerElement;
    }
}
declare namespace LocalJSX {
    interface TalisPdfViewer {
        "annotations"?: string;
        "currentPage"?: number;
        "depotUrl"?: string;
        "pageCount"?: number;
        "token"?: string;
    }
    interface IntrinsicElements {
        "talis-pdf-viewer": TalisPdfViewer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "talis-pdf-viewer": LocalJSX.TalisPdfViewer & JSXBase.HTMLAttributes<HTMLTalisPdfViewerElement>;
        }
    }
}
