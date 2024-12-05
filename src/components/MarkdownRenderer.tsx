import React from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownComponentProps {
  code: string;
}

const MarkdownComponent: React.FC<MarkdownComponentProps> = ({ code }) => {
  return (
    <Markdown
      children={code}
      components={{
        code({ children, className, ...rest }) {
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighte
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={dark}
            />
          ) : (
            <code {...rest} className={className}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};
export default MarkdownComponent;
