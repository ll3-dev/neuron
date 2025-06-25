import {
  CharacterCount,
  CodeBlockLowlight,
  Color,
  CustomKeymap,
  GlobalDragHandle,
  HighlightExtension,
  HorizontalRule,
  Mathematics,
  Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TextStyle,
  TiptapImage,
  TiptapLink,
  TiptapUnderline,
  UpdatedImage,
  UploadImagesPlugin,
  Youtube
} from 'novel'

import AutoJoiner from 'tiptap-extension-auto-joiner'

import { common, createLowlight } from 'lowlight'
import { Markdown } from 'tiptap-markdown'

// const aiHighlight = AIHighlight

const placeholder = Placeholder.configure({
  placeholder: "명령어 사용시에는 '/'를 입력하세요."
})
const tiptapLink = TiptapLink.configure({
  HTMLAttributes: {
    class:
      'text-muted-foreground underline underline-offset-[3px] hover:text-primary transition-colors cursor-pointer'
  }
})

const tiptapImage = TiptapImage.extend({
  addProseMirrorPlugins() {
    return [
      UploadImagesPlugin({
        imageClass: 'opacity-40 rounded-lg border border-stone-200'
      })
    ]
  }
}).configure({
  allowBase64: true,
  HTMLAttributes: {
    class: 'rounded-lg border border-muted'
  }
})

const updatedImage = UpdatedImage.configure({
  HTMLAttributes: {
    class: 'rounded-lg border border-muted'
  }
})

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: 'not-prose pl-2 '
  }
})
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: 'flex gap-2 items-start my-4'
  },
  nested: true
})

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: 'mt-4 mb-6 border-t border-muted-foreground'
  }
})

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: 'list-disc list-outside leading-3 -mt-2'
    }
  },
  orderedList: {
    HTMLAttributes: {
      class: 'list-decimal list-outside leading-3 -mt-2'
    }
  },
  listItem: {
    HTMLAttributes: {
      class: 'leading-normal -mb-2'
    }
  },
  blockquote: {
    HTMLAttributes: {
      class: 'border-l-4 border-primary'
    }
  },
  codeBlock: {
    HTMLAttributes: {
      class: 'rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium'
    }
  },
  code: {
    HTMLAttributes: {
      class: 'rounded-md bg-muted px-1.5 py-1 font-mono font-medium',
      spellcheck: 'false'
    }
  },
  horizontalRule: false,
  dropcursor: {
    color: '#DBEAFE',
    width: 4
  },
  gapcursor: false
})

const codeBlockLowlight = CodeBlockLowlight.configure({
  // configure lowlight: common /  all / use highlightJS in case there is a need to specify certain language grammars only
  // common: covers 37 language grammars which should be good enough in most cases
  lowlight: createLowlight(common)
})

const youtube = Youtube.configure({
  HTMLAttributes: {
    class: 'rounded-lg border border-muted'
  },
  inline: false
})

const mathematics = Mathematics.configure({
  HTMLAttributes: {
    class: 'text-foreground rounded p-1 hover:bg-accent cursor-pointer'
  },
  katexOptions: {
    throwOnError: false
  }
})

const characterCount = CharacterCount.configure()

const markdownExtension = Markdown.configure({
  html: true,
  tightLists: true,
  tightListClass: 'tight',
  bulletListMarker: '-',
  linkify: false,
  breaks: false,
  transformPastedText: false,
  transformCopiedText: false
})

const globalDragHandle = GlobalDragHandle.configure({
  scrollThreshold: 0
})

export const defaultExtensions = [
  starterKit,
  placeholder,
  tiptapLink,
  tiptapImage,
  updatedImage,
  taskList,
  taskItem,
  horizontalRule,
  // aiHighlight,
  codeBlockLowlight,
  youtube,
  mathematics,
  characterCount,
  TiptapUnderline,
  markdownExtension,
  HighlightExtension,
  TextStyle,
  Color,
  CustomKeymap,
  globalDragHandle,
  AutoJoiner
]
