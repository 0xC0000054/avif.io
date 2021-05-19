import _ from "lodash";

export interface SourcesProps {
  sources: string[];
}

export default function Sources(props: SourcesProps) {
  let sources = props.sources.map((original) => {
    original = original.replace(/^https?:\/\//, "");
    let short = original.replace(/\/$/, "");
    if (short.length >= 40) {
      const split = short.split(/[/]/);
      if (split.length > 1) {
        const a = split[0];
        const b = short.slice(-20);
        short = `${a} (..) ${b}`;
      }
    }
    original = `https://${original}`;
    short = short.replace(/\//g, " · ");
    return { original, short };
  });
  sources = _.sortBy(sources, (s) => s.short);

  const listItems = sources.map((source: any) => (
    <li key={source.original} className="source">
      <a target="_blank" rel="noreferrer" href={source.original}>
        {source.short}
      </a>
    </li>
  ));

  return (
    <div id="sources">
      <ol>{listItems}</ol>
    </div>
  );
}
