"use client";

import EditorJS from "@editorjs/editorjs";
import { useEffect, useRef, useState } from "react";

export default function Editor() {
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef<EditorJS>();

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const Table = (await import("@editorjs/table")).default;

    const List = (await import("@editorjs/list")).default;
    const Paragraph = (await import("@editorjs/paragraph")).default;
    const Embed = (await import("@editorjs/embed")).default;
    const Warning = (await import("@editorjs/warning")).default;
    const Code = (await import("@editorjs/code")).default;
    const LinkTool = (await import("@editorjs/link")).default;
    // const Image = (await import('@editorjs/image')).default;
    const Raw = (await import("@editorjs/raw")).default;
    const Quote = (await import("@editorjs/quote")).default;
    const Marker = (await import("@editorjs/marker")).default;
    const CheckList = (await import("@editorjs/checklist")).default;
    const Delimiter = (await import("@editorjs/delimiter")).default;
    const InlineCode = (await import("@editorjs/inline-code")).default;
    const SimpleImage = (await import("@editorjs/simple-image")).default;
    const Image = (await import("@editorjs/image")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor-js",
        tools: {
            header:Header,
          list: List,
          paragraph: Paragraph,
          embed: Embed,
          table: Table,
          warning: Warning,
          code: Code,
          link: LinkTool,
            image: {
              class: SimpleImage,
              inlineToolbar: true
            },
          raw: Raw,
          quote: Quote,
          marker: Marker,
          checklist: CheckList,
          delimiter: Delimiter,
          inlineCode: InlineCode,
          simpleImage: SimpleImage,
        },
        onReady: () => {console.log('Editor.js is ready to work!')},
   
        inlineToolbar: true


//    onChange: (api, event) => {
//      console.log('Now I know that Editor\'s content changed!', event)
//    }
      });
      ref.current = editor;
      try {
        await editor.isReady;
        console.log('Editor.js is ready to work!')
        /** Do anything you need after editor initialization */
      } catch (reason) {
        console.log(`Editor.js initialization failed because of ${reason}`)
      }

       onChange: (api, event) => {
     console.log('Now I know that Editor\'s content changed!', event)
   }
    }
    
  };
  useEffect(() => {
    setIsMounted(true);

    if (typeof window === "undefined") {
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
    };

    if (isMounted) {
      init();

      return () => {
        if (ref.current) {
          ref.current.destroy();
        }
      };
    }
  }, [isMounted]);

  const save = () => {
    console.log("save ?");
    if (ref.current) {
      ref.current.save().then((outputData) => {
        console.log("Article data: ", outputData);
        alert(JSON.stringify(outputData));
      });
    }
  };

  

  return (
    <>
      <div id="editor-js" className="prose prose-lg max-w-full min-h-screen" />
      <button onClick={save} className="bg-zinc-900 text-white p-5">Save</button>
    </>
  );
}
