import React, { useEffect, useState } from 'react';
import { INodeContent } from './types';
import { RTEComponent } from '@codebase/MIDL';
import { ActionIcon, Box, Button, ButtonGroup, Card } from '@mantine/core';
import { IconEdit, IconPencil, IconPlus, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '@codebase/configs';
import { showNotification } from '@mantine/notifications';

type Props = {
  content: INodeContent;
  updateContent: (content: INodeContent) => Promise<void>;
};

export default function NodeContent({ content, updateContent }: Props) {
  const { projectId } = useParams();
  const [editMode, setEditMode] = useDisclosure(false);
  const [value, setvalue] = useState(content.content);
  useEffect(() => {
    setvalue(content.content);
  }, [content]);
  switch (content.type) {
    case 'richtext':
      return editMode ? (
        <div>
          <RTEComponent value={value} onChange={(e) => setvalue(e)} />
          <ButtonGroup>
            <Button
              onClick={() => {
                updateContent({
                  id: content.id,
                  title: '',
                  type: content.type, // Plain text content or markdown
                  content: value,
                })
                  .then(() => {
                    setvalue('');
                    setEditMode.close();
                  })
                  .catch((error) => {
                    console.log(error);

                    showNotification({
                      id: `reg-err-${Math.random()}`,
                      autoClose: 5000,
                      title: 'Error!',
                      message: 'Unexpected error happened. try again!',
                      color: 'red',
                      icon: <IconX />,
                      loading: false,
                    });
                  });
              }}
              size="xs"
              color="green"
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setvalue(content.content);
                setEditMode.close();
              }}
              size="xs"
              color="red"
            >
              Discard
            </Button>
          </ButtonGroup>
        </div>
      ) : (
        <Card className="relative">
          <div className="absolute right-1 top-1 z-10">
            <ActionIcon
              color="red"
              onClick={setEditMode.open}
              variant="default"
              className=""
            >
              <IconPencil stroke={1} />
            </ActionIcon>
          </div>
          <RTEComponent value={content.content} />
        </Card>
      );
    default:
      return;
  }
}
