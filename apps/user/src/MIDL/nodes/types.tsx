import { INodeContent } from "../contents/types";


export interface INodeType {
  id: string; // Unique identifier for the node
  title: string; // Title of the node
  position:{
    x:number,
    y:number,
  },
  data:any,
  contents: INodeContent[]; // Detailed content of the node
  parentId?: string | null; // ID of the parent node, if this is a child node
  childIds?: string[]; // IDs of child nodes, if any
//   children?:INodeType[]
  createdAt: string; // Creation date of the node
//   updatedAt: Date; // Last update date of the node
  tags?: string[]; // Tags for categorization
  // Additional properties can include access rights, comments, etc.
}


