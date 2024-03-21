import { ComponentType, useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import { IProject } from '../Projects/store';
import {
  ActionIcon,
  Center,
  Drawer,
  HoverCard,
  Modal,
  Paper,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconArrowsMaximize,
  IconFile,
  IconLetterT,
  IconLink,
  IconPhoto,
  IconPlus,
} from '@tabler/icons-react';
import NodeContent from '../contents';
import { INodeContent, INodeContentTypes } from '../contents/types';
import { db } from '@codebase/configs';
import { useParams } from 'react-router-dom';

export const BaseNode = ({
  data,
  addContent,
  updateContent
}: {
  data: IProject;
  addContent: (type: string) => void;
  updateContent: (contents: INodeContent[]) => Promise<void>;
}): React.ReactNode => {
  const [modalOpen, modalToogle] = useDisclosure(false);
  console.log(data);

  const { projectId } = useParams();
  return (
    <Paper withBorder className=" p-2 rounded-sm">
      <Center className="gap-2">
        <Text>{data.title}</Text>
        <ActionIcon
          variant="default"
          onClick={modalToogle.open}
          size={'xs'}
          radius={'xs'}
        >
          <IconArrowsMaximize size={10} />
        </ActionIcon>
      </Center>
      <Handle
        type="source"
        position={Position.Bottom}
        id={data.id + '-bottom-handle'}
        isConnectable
      />
      <Handle
        type="source"
        position={Position.Right}
        id={data.id + '-left-handle'}
        isConnectable
      />
      <div className="shadow-none bg-transparent border-none"></div>
      <Drawer opened={modalOpen} onClose={modalToogle.close}>
        <div className="grid gap-2">
        {data.contents?.map((content,index) => (
          <NodeContent content={content} updateContent={(newVal)=>{ return updateContent(data.contents.map(t=>(t.id === newVal.id?newVal:t)))
          }}  />
        ))}
        </div>
        <br />
        <HoverCard
          styles={{ dropdown: { background: 'transparent', border: 'none' } }}
          width={280}
          offset={-10}
          position="right"
          transitionProps={{ transition: 'pop' }}
          shadow="md"
        >
          <HoverCard.Target>
            <ActionIcon radius={'xl'}>
              <IconPlus />
            </ActionIcon>
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <div className="flex gap-2 m-2 bg-transparent">
              {contentMenus.map((menu) => (
                <Tooltip label={menu.label}>
                  <ActionIcon
                    onClick={() => addContent(menu.name)}
                    variant="white"
                    radius={'xl'}
                  >
                    {menu.icon}
                  </ActionIcon>
                </Tooltip>
              ))}
            </div>
          </HoverCard.Dropdown>
        </HoverCard>
      </Drawer>
    </Paper>
  );
};

const contentMenus: {
  label: string;
  name: INodeContentTypes;
  icon: JSX.Element;
}[] = [
  { label: 'Text', name: 'richtext', icon: <IconLetterT size={14} /> },
  { label: 'Image', name: 'image', icon: <IconPhoto size={14} /> },
  { label: 'Link', name: 'link', icon: <IconLink size={14} /> },
  { label: 'Document', name: 'document', icon: <IconFile size={14} /> },
];
