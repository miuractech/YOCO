import { FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import usePreviewImage from './hooks/previewHook';
import useStorage from './hooks/useStorage';
import {
  IconFileUpload,
  IconPhoto,
  IconUpload,
  IconX,
} from '@tabler/icons-react';
import { stateUrl } from './miurac-image';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { Button, Group, Progress, Text, rem } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
type Props = {
  editMode: boolean;
  setUrl: React.Dispatch<React.SetStateAction<stateUrl | null>>;
  app: FirebaseApp;
  getUrl: (url: string | string[]) => unknown | void;
  updateFirestore: boolean;
  allowMultiple: boolean;
  count?: (current: number, total: number) => void;
};

export default function UploadImage({
  editMode,
  setUrl,
  app,
  getUrl,
  updateFirestore,
  allowMultiple,
  count,
}: Props) {
  const [previewUpload, setpreviewUpload] = useState<null | string>(null);
  const [progress, setProgress] = useState({
    Total: 0,
    current: 0,
  });
  const user = getAuth(app).currentUser;
  const { upload, loading } = useStorage({ app, updateFirestore });
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  // const { acceptedFiles, getRootProps, getInputProps, fileRejections } =
  //   useDropzone({
  //     accept: {
  //       'image/*': ['.png', '.svg', '.jpg', '.jpeg'],
  //     },
  //   });
  const previewUploads = usePreviewImage(acceptedFiles[0]);

  const handlePreview = async () => {
    if (editMode) {
      setUrl({ url: previewUploads.preview, fileName: acceptedFiles[0]?.name });
    } else {
      try {
        if (allowMultiple) {
          const urls: string | string[] = [];
          let currentCount = 0;
          for (const acptFile of acceptedFiles) {
            currentCount = currentCount + 1;
            const url = (await upload({
              file: acptFile,
              path: `uploads/${user?.uid}/images`,
              fileName: acptFile.name,
            })) as string;
            urls.push(url);
            if (count) {
              count(currentCount, acceptedFiles.length);
              setProgress({
                current: currentCount,
                Total: acceptedFiles.length,
              });
            }
          }
          getUrl(urls);
        } else {
          const url = (await upload({
            file: acceptedFiles[0],
            path: `uploads/${user?.uid}/images`,
            fileName: acceptedFiles[0].name,
          })) as string;
          getUrl(url);
        }
      } catch (err) {
        // console.log(err);
      }
    }
  };
  useEffect(() => {
    if (previewUploads.preview) {
      handlePreview();
    }
  }, [previewUploads.preview]);

  if (loading) {
    return (
      <div>
        <Progress animated value={(progress.current / progress.Total) * 100} />
        <Text ta="center">{progress.current + '/' + progress.Total}</Text>
      </div>
    );
  }
  return (
    <div>
      {previewUpload ? (
        <div>
          <img
            height={200}
            width={200}
            src={previewUpload}
            alt="uploaded img"
          />
          <div
            style={{
              display: 'flex',
              columnGap: '20px',
              justifyContent: 'center',
              paddingTop: '30px',
            }}
          >
            <Button variant="filled" onClick={() => setpreviewUpload('')}>
              Cancel
            </Button>
            <Button variant="filled">Save</Button>
          </div>
        </div>
      ) : (
        <Dropzone
          onDrop={(files) => setAcceptedFiles(files)}
          onReject={(files) => {
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Unsupported File!',
              message: 'Only image files are accepted!',
              color: 'red',
              icon: <IconX />,
              loading: false,
            });
          }}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-blue-6)',
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-red-6)',
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: 'var(--mantine-color-dimmed)',
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>
        // <section style={{ cursor: 'pointer' }}>
        //   <div
        //     {...getRootProps({ className: 'dropzone' })}
        //       style={{ height: '100%', minHeight: 300, marginTop: "50px" }}
        //   >
        //     <input {...getInputProps()} />
        //       <div className='flex justify-center'>
        //         <IconFileUpload />
        //     </div>
        //     <Text variant="text" color={'gray'} align="center">
        //       click to upload or drop files to upload
        //     </Text>
        //     {fileRejections.length > 0 && (
        //       <Text color={'red'} align="center">
        //         Only Images are accepted
        //       </Text>
        //     )}
        //   </div>
        // </section>
      )}
    </div>
  );
}
