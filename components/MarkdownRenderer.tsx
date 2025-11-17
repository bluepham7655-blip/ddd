import React from 'react';

// This assumes 'katex' is available globally from the script in index.html
declare const katex: {
  renderToString(latex: string, options?: any): string;
};

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const parts = React.useMemo(() => {
    // Regex to split by $...$ (inline) and $$...$$ (display)
    // It captures the delimiters so we can identify which parts are math.
    const latexRegex = /(\$\$[\s\S]+?\$\$|\$[\s\S]+?\$)/g;
    return content.split(latexRegex);
  }, [content]);

  return (
    <div className="text-base leading-relaxed" style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}>
      {parts.map((part, index) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const isDisplayMode = part.startsWith('$$');
          // Strip delimiters for KaTeX
          const latex = part.substring(
            isDisplayMode ? 2 : 1,
            part.length - (isDisplayMode ? 2 : 1)
          );

          // Avoid rendering empty strings
          if (!latex.trim()) {
            return <span key={index}>{part}</span>;
          }

          try {
            // Defensively check if the global katex object exists before using it.
            if (typeof katex === 'undefined') {
              console.error("KaTeX library not loaded.");
              return <code key={index} className="text-orange-500 font-mono bg-orange-100 p-1 rounded">{part}</code>;
            }
            const html = katex.renderToString(latex, {
              throwOnError: false,
              displayMode: isDisplayMode,
            });
            // Use a span for both inline and display math to maintain flow
            return <span key={index} dangerouslySetInnerHTML={{ __html: html }} />;
          } catch (e) {
            console.error("KaTeX rendering error:", e);
            // Show the raw source with an error style if KaTeX fails
            return <code key={index} className="text-red-500 font-mono bg-red-100 p-1 rounded">{part}</code>;
          }
        }
        // Render normal text, preserving whitespace and newlines for formatting
        return <span key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
      })}
    </div>
  );
};