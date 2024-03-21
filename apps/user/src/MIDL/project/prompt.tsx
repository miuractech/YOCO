import { ActionIcon, Modal, Textarea } from '@mantine/core';
import { IconWand } from '@tabler/icons-react';
import { useState } from 'react';

export default function Prompt() {
  const [opened, setOpened] = useState(false);
  return (
    <div>
      <ActionIcon onClick={()=>setOpened(true)} size={'sm'}>
        {' '}
        <IconWand />
      </ActionIcon>{' '}
      <Modal opened={opened} onClose={() => setOpened(false)}>
        <Textarea label="Prompt" />
      </Modal>
    </div>
  );
}
