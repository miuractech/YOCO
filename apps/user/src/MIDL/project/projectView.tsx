import { ActionIcon, Card } from '@mantine/core';
import { IProject } from '../Projects/store';
import Nodes from '../nodes/Nodes';
import { sampleNodes } from '../nodes/sample';
import { IconArrowUpLeft, IconCheckbox, IconSquare } from '@tabler/icons-react';
import { useRef, useState } from 'react';

type Props = {
  project: IProject;
};

export default function ProjectView({ project }: Props) {
  
  return (
    <div className="h-screen w-screen relative">
     
        <Nodes blocks={[project]} />
   
      <div className="absolute z-10 left-1/2 bottom-0">
        <Card withBorder>
          <div className="flex gap-2">
            <ActionIcon variant="outline" color="gray" size={'xl'}>
              <IconArrowUpLeft />
            </ActionIcon>
            <ActionIcon
              draggable
              onDragStart={(event) =>
                event.dataTransfer.setData('application/reactflow', 'default')
              }
              variant="outline"
              color="gray"
              size={'xl'}
            >
              <IconSquare />
            </ActionIcon>
          </div>
        </Card>
      </div>
    </div>
  );
}
