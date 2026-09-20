export function JsonLd({ data }: { data: object | object[] }) {
  // Defense-in-depth: escape "<" so a "</script>" substring in any string
  // value can't break out of the script tag, even though this data is only
  // ever our own static/computed content, never raw user input.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
