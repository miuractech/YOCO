export type INodeContentTypes = 'richtext' | 'document' | 'link' | 'image'; //| 'audio' | 'video' |

export interface INodeContent {
  title: string;
  type: INodeContentTypes; // Plain text content or markdown
  content: string;
  preview?: string;
  id?: string;
}
