'use client'
import dynamic from 'next/dynamic';
import React, { useState } from 'react'

const EditorBlock = dynamic(() => import("../../components/Edit/Editor"), {
  ssr: false,
});



const page = () => {
  const [editorData, setEditorData] = useState<any | undefined>();

  return (
    <div>
                <EditorBlock data={editorData} onChange={setEditorData} holder="editorjs-container" />

    </div>
  )
}

export default page