import React from "preact/compat";

const isServer = typeof window === "undefined";
let id = 0;

const hydrate = (Component: React.FC) => (props: any) => {
  id += 1;

  const scriptSrc = `
    window.__STATE__.components[${id}]={name:${JSON.stringify(
    Component.name
  )},props:${JSON.stringify(props)}}
  `;

  return (
    <>
      {isServer && (
        <script
          dangerouslySetInnerHTML={{ __html: scriptSrc }}
          data-cmp-id={id}
        />
      )}
      <Component {...props} />
    </>
  );
};

export default hydrate;
