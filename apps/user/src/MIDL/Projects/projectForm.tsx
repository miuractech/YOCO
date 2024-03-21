import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, Modal, Text, TextInput, Textarea } from '@mantine/core';
import * as yup from 'yup';
import { yupResolver } from '@mantine/form';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { projectCollection } from './useProjects';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { MiuracImage } from '@codebase/miurac-image';
import { IProject } from './store';
import { useStore } from '../../app/store';

// Define a Yup schema for validation, based on the IProject interface
const projectSchema = yup.object().shape({
  title: yup.string().min(3, 'min 3 characters').required('Name is required'),
  description: yup.string().required('Description is required'),
});

export const ProjectForm = ({
  children,
  project,
}: {
  children: React.ReactNode;
  project?: IProject;
}) => {
  const form = useForm<IProject>({
    validate: yupResolver(projectSchema),
    initialValues: {
      title: '',
      description: '',
      createdAt: new Date().toString(),
      id: 'root',
      updatedAt: new Date().toString(),
      contents: [],
      position: { x: 100, y: 100 },
      projectId: '',
      image: '',
      data: {},
    },
  });
  const { user, setProjects, projects } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (project) form.setValues(project);
  }, [project]);
  return (
    <div>
      <div onClick={() => setModalOpen(true)}>{children}</div>
      <Modal
        title="Project"
        size={'xl'}
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <form
          className="grid gap-3"
          onSubmit={form.onSubmit((values) => {
            setLoading(true);
            try {
              if (project) {
                updateDoc(doc(projectCollection, project.projectId), { ...values });
              } else {
                addDoc(projectCollection, { ...values, uid: user?.uid }).then(
                  (docSnap) => {
                    updateDoc(doc(projectCollection, docSnap.id), {
                      projectId: docSnap.id,
                    });
                    if (projects)
                      setProjects([...projects, { ...values, uid: user?.uid }]);
                    else setProjects([{ ...values, uid: user?.uid }]);
                  }
                );
              }

              setModalOpen(false);
            } catch (error) {
                showNotification({
                  id: `reg-err-${Math.random()}`,
                  autoClose: 5000,
                  title: 'Error!',
                  message: 'Unexpected error happened. try again!',
                  color: 'red',
                  icon: <IconX />,
                  loading: false,
                });
            } finally {
              setLoading(false);
            }
          })}
        >
          <TextInput
            required
            label="Project Name"
            placeholder="Enter project name"
            name="projectName"
            {...form.getInputProps('title')}
          />
          <Textarea
            required
            name="projectDescription"
            label="Project Description"
            placeholder="Enter project description"
            autosize
            minRows={3}
            {...form.getInputProps('description')}
            mt="md"
          />
          <div>
            <Text fw={500} size="sm">
              Project image
            </Text>
            <MiuracImage
              image={form.values.image}
              updateFirestore={true}
              editConfig={{ aspectX: 1, aspectY: 1 }}
              setUrlFunc={(url: string | string[]) => {
                if (typeof url === 'string') {
                  form.setFieldValue('image', url);
                }
              }}
            />
          </div>
          <Button loading={loading} type="submit" mt="lg">
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};
