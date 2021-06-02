import { Blog, ContentTable, H, Syntax } from "@components/Blog/";
import { ContentTableEntry } from "@components/Blog/ContentTable";
import SmartLink from "@components/SmartLink";
import {
  useAvifInCloudflare as post1,
  useAvifInFrameworks as post2,
  useAvifInNetlify as meta,
  useAvifInWordpress as post3,
} from "lib/meta";
import { useState } from "react";

export default function BlogPost() {
  const [contentTable, setContentTable] = useState<ContentTableEntry[]>([]);

  function contentTableCallback(entry: ContentTableEntry) {
    contentTable.push(entry);
    setContentTable([...contentTable]);
  }
  return (
    <Blog postMeta={meta} posts={[post1, post2, post3]}>
      <ContentTable contentTable={contentTable} />
      <H contentTableCallback={contentTableCallback} level={2} text="Wishing for native support" />
      Many Netlify users wanted a native solution that would allow them to deliver images in WebP or
      AVIF format at any time. However, at the time of the article on February 21, there is no easy
      way to enable this feature. Instead,{" "}
      <b>
        you can enable AVIF files through Netlify's header tag and then ship AVIF files with a
        native image HTML tag
      </b>
      , as we explained here:
      <SmartLink link="/blog/tutorials/use-avif-in-html/" text="How to use AVIF in HTML" />
      <H contentTableCallback={contentTableCallback} level={2} text="Defining custom headers" />
      While using the image tag on Netlify seems to work, there was a problem with using. avif
      files. When trying to view the images inside Firefox, we noticed that the images did not show
      up. This problem did not occur in Chrome, but it did happen in Firefox.
      <br /> We found that the response headers returned the Content-Type: application/octet-stream,
      which caused Firefox to refuse to display data. We resolved the bug by{" "}
      <b>defining custom headers within the Netlify configuration file (Netlify.toml).</b>
      <Syntax language="js">
        {`[[headers]]
for = "*.avif"
[headers.values]
Content-Type = "image/avif"`}
      </Syntax>
      <H contentTableCallback={contentTableCallback} level={2} text="Summary" />
      Enabling AVIF support on Netlify is not easy as simply clicking a single button. However, it
      can be easily achieved by customizing the configuration file to your specific needs. If this
      is the first time you hear about the configuration file, I suggest you take a look at its
      <SmartLink
        ext
        link="docs.netlify.com/configure-builds/file-based-configuration/"
        text="documentation"
      />
      to find other ways to use this file.
    </Blog>
  );
}
