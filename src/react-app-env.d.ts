/// <reference types="react-scripts" />

declare namespace JSX {
  interface IntrinsicElements {
    'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      url?: string;
      background?: string;
    }, HTMLElement>;
  }
}