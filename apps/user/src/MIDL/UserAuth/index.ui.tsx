import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm, yupResolver } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Container,
  Grid,
  LoadingOverlay,
  Center,
} from '@mantine/core';
import { GithubIcon } from '@mantinex/dev-icons';
import React from 'react';
import { googleAuth } from './func/googleAuth';
import * as Yup from 'yup';
import { githubAuth } from './func/githubAuth';
import { emailAuth } from './func/emailAuth';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  userName: Yup.string()
    .min(2, 'Username must be at least 2 characters')
    .max(50, 'Username must be less than 50 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    )
    .required('Password is required'),
  // terms: Yup.boolean()
  //   .oneOf([true], 'You must accept the terms and conditions')
  //   .required('You must accept the terms and conditions'),
});
export type authType = {
  email: string;
  userName: string;
  password: string;
  terms: boolean;
};
export default function AuthenticationForm(props: PaperProps) {
  const [type, toggle] = useToggle<'login' | 'register'>(['login', 'register']);
  const form = useForm<authType>({
    initialValues: {
      email: '',
      userName: '',
      password: '',
      terms: false,
    },

    validate: yupResolver(validationSchema),
  });

  return (
    <React.Suspense fallback={<LoadingOverlay visible />}>
      <Container fluid className="m-0 p-0">
        <Grid m={0} p={0}>
          <Grid.Col span={{ base: 12, xs: 12, md: 6 }} m={0} p={0}>
            <div
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1710415273379-741f889cbf65?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
              className="flex bg-cover bg-center h-screen min-h-[450px] m-0 p-0"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, xs: 12, md: 6 }} m={0} p={0}>
            <Center className="h-full">
              <Paper maw={500} radius="md" p="xl" withBorder {...props}>
                <Text size="lg" fw={500}>
                  Welcome to YOCO, {type} with
                </Text>

                <Group grow mb="md" mt="md">
                  <Button
                    leftSection={<GoogleIcon />}
                    variant="default"
                    radius="xl"
                    onClick={googleAuth}
                  >
                    Google
                  </Button>
                  <Button
                    leftSection={
                      <GithubIcon style={{ width: '1rem', height: '1rem' }} />
                    }
                    variant="default"
                    radius="xl"
                    onClick={githubAuth}
                  >
                    Github
                  </Button>
                </Group>

                <Divider
                  label="Or continue with email"
                  labelPosition="center"
                  my="lg"
                />

                <form
                  onSubmit={form.onSubmit((vals) => {
                    emailAuth(type, vals);
                  })}
                >
                  <Stack>
                    {type === 'register' && (
                      <TextInput
                        label="User Name"
                        placeholder="Your name"
                        radius="md"
                        {...form.getInputProps('userName')}
                      />
                    )}

                    <TextInput
                      required
                      label="Email"
                      placeholder="hello@miurac.com"
                      {...form.getInputProps('email')}
                      radius="md"
                    />

                    <PasswordInput
                      required
                      label="Password"
                      placeholder="Your password"
                      {...form.getInputProps('password')}
                      radius="md"
                    />

                    {type === 'register' && (
                      <Checkbox
                        label="I accept terms and conditions"
                        checked={form.values.terms}
                        onChange={(event) =>
                          form.setFieldValue(
                            'terms',
                            event.currentTarget.checked
                          )
                        }
                      />
                    )}
                  </Stack>

                  <Group justify="space-between" mt="xl">
                    <Anchor
                      component="button"
                      type="button"
                      c="dimmed"
                      onClick={() => toggle()}
                      size="xs"
                    >
                      {type === 'register'
                        ? 'Already have an account? Login'
                        : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" color="violet" radius="xl">
                      {upperFirst(type)}
                    </Button>
                  </Group>
                </form>
              </Paper>
            </Center>
          </Grid.Col>
        </Grid>
      </Container>
    </React.Suspense>
  );
}

function GoogleIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 256 262"
      style={{ width: '0.9rem', height: '0.9rem' }}
      {...props}
    >
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      />
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      />
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      />
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      />
    </svg>
  );
}
