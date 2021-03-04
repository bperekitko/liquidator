// For SCSS
declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// For CSS Modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// For SCSS Modules
declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// For SVG Files
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

// For JSON files
declare module '*.json' {
  const value: any;
  export default value;
}

declare module '*.png' {
  const value: any;
  export = value;
}
