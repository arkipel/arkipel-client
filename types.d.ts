declare module '*.gif';
declare module '*.jpg';
declare module '*.png';
declare module '*.ttf';

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
