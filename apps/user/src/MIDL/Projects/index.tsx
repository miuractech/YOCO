import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Group,
  Image,
  Loader,
  Modal,
  Text,
} from '@mantine/core';
import { IconHeart, IconPlus } from '@tabler/icons-react';
import { useProjects } from './useProjects';
import { ProjectForm } from './projectForm';
import { Link } from 'react-router-dom';

export default function Projects() {
  const { projects } = useProjects();
  if (projects === undefined) return <Loader />;
  return (
    <div className="p-4">
      <div className="text-right">
        <ProjectForm>
          <Button leftSection={<IconPlus />}>Add Project</Button>
        </ProjectForm>
      </div>
      {projects ? (
        <div className="flex">
          {projects.map((project) => (
            <Link to={`/project/${project.projectId}`}>
              <Card withBorder radius="md" p="md" className="max-w-xs">
                <Card.Section>
                  <Image src={project.image} alt={project.title} height={180} />
                </Card.Section>

                <Card.Section className={'border-b-gray-300 p-4'} mt="md">
                  <Group justify="apart">
                    <Text fz="lg" fw={500} tt={'capitalize'}>
                      {project.title}
                    </Text>
                    {/* <Badge size="sm" variant="light">
            {country}
          </Badge> */}
                  </Group>
                  <Text fz="sm" mt="xs">
                    {project.description}
                  </Text>
                </Card.Section>

                <Group mt="xs">
                  <Button radius="md" style={{ flex: 1 }}>
                    Show details
                  </Button>
                  <ActionIcon variant="default" radius="md" size={36}>
                    <IconHeart color="red" stroke={1.5} />
                  </ActionIcon>
                </Group>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          No Projects{' '}
          <ProjectForm>
            <Button leftSection={<IconPlus />}>Create Project</Button>
          </ProjectForm>
        </div>
      )}
    </div>
  );
}
