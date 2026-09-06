/**
 * Template post. Copy this file, rename it to your slug, and add a matching
 * entry to ../posts.meta.json. It is marked `draft` there, so it renders in
 * `npm run dev` but is never built or listed on the live site.
 */
export default function WritingYourFirstPost() {
  return (
    <>
      <p>
        Everything below is plain JSX. The <code>.prose</code> wrapper in the page shell styles
        headings, paragraphs, lists, code and quotes for you, so a post is usually just text with
        the occasional element around it.
      </p>

      <h2>Headings</h2>
      <p>
        Use <code>h2</code> for sections and <code>h3</code> beneath them. The post title is already
        rendered as the <code>h1</code> by the page, so starting at <code>h2</code> keeps the
        document outline correct for screen readers and for search engines.
      </p>

      <h3>A subsection</h3>
      <p>
        Links look like <a href="https://kafka.apache.org/documentation/">this one</a> and pick up
        the site&rsquo;s amber accent automatically.
      </p>

      <h2>Code</h2>
      <p>
        Inline code such as <code>consumer.commitSync()</code> sits in the flow of a sentence.
        Longer samples go in a block, which scrolls horizontally rather than forcing the page to:
      </p>
      <pre>
        <code>{`props.forEach((record) => {
  if (seen.contains(record.key())) return;   // already handled
  process(record);
  seen.add(record.key());
});`}</code>
      </pre>

      <h2>Lists and quotes</h2>
      <ul>
        <li>Unordered lists work as expected.</li>
        <li>So do ordered ones.</li>
        <li>Keep items short; they are for scanning.</li>
      </ul>
      <blockquote>
        A pull quote, for the one sentence you want a skimming reader to actually stop on.
      </blockquote>

      <h2>Images</h2>
      <p>
        Drop an image into <code>public/blog/</code> and reference it with a leading{' '}
        <code>import.meta.env.BASE_URL</code>, or import it directly so Vite fingerprints it. Images
        are capped to the content width automatically.
      </p>
    </>
  );
}
