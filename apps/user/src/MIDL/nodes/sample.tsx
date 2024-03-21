import { v4 } from 'uuid';
import { INodeType } from './types';

export const sampleNodes: INodeType[] = [
  {
    id: 'parent1',
    title: 'Science 101',
    position: { x: 250, y: 250 },
    data: {},
    contents: [
      {
        title: 'Introduction to Science',
        type: 'richtext',
        content:
          'Science is a systematic enterprise that builds and organizes knowledge in the form of testable explanations and predictions about the universe.',
      },
    ],
    childIds: ['child1', 'child2', 'child3', 'child4', 'child5'],
    createdAt: new Date().toString(),
    tags: ['science', 'education'],
  },
  {
    id: 'child1',
    title: 'Biology Basics',
    position: { x: 150, y: 450 },
    data: {},

    contents: [
      {
        title: 'What is Biology?',
        type: 'richtext',
        content:
          'Biology is the natural science that studies life and living organisms.',
      },
    ],
    parentId: 'parent1',
    createdAt: new Date().toString(),
    tags: ['biology'],
  },
  {
    id: 'child2',
    title: 'Physics Fundamentals',
    data: {},
    position: { x: 350, y: 450 },
    contents: [
      {
        title: 'Understanding Physics',
        type: 'richtext',
        content:
          'Physics is the natural science that studies matter, its motion and behavior through space and time.',
      },
    ],
    parentId: 'parent1',
    createdAt: new Date().toString(),
    tags: ['physics'],
  },
  {
    id: 'child3',
    data: {},
    title: 'Chemistry Introduction',
    position: { x: 550, y: 450 },
    contents: [
      {
        title: 'Basics of Chemistry',
        type: 'richtext',
        content:
          'Chemistry is the scientific discipline involved with elements and compounds composed of atoms, molecules, and ions.',
      },
    ],
    parentId: 'parent1',
    createdAt: new Date().toString(),
    tags: ['chemistry'],
  },
  {
    id: 'child4',
    title: 'Earth Science Overview',
    data: {},
    position: { x: 750, y: 450 },
    contents: [
      {
        title: 'Studying the Earth',
        type: 'richtext',
        content:
          "Earth science is the study of the Earth and its neighbors in space. It involves the study of various aspects of the Earth's structure, composition, and processes.",
      },
    ],
    parentId: 'parent1',
    createdAt: new Date().toString(),
    tags: ['earth science'],
  },
  {
    id: 'child5',
    title: 'Astronomy for Beginners',

    data: {},
    position: { x: 950, y: 450 },
    contents: [
      {
        title: 'Exploring the Universe',
        type: 'richtext',
        content:
          'Astronomy is the study of the sun, moon, stars, planets, comets, gas, galaxies, gas, dust and other non-earthly bodies and phenomena.',
      },
    ],
    parentId: 'parent1',
    createdAt: new Date().toString(),
    tags: ['astronomy'],
  },
];

export const defaultNode: INodeType = {
  id: v4(),
  title: 'untitled',
  data: {},
  position: { x: 250, y: 250 },
  contents: [
    {
      title: 'Introduction to Science',
      type: 'richtext',
      content:
        'Science is a systematic enterprise that builds and organizes knowledge in the form of testable explanations and predictions about the universe.',
    },
  ],
  childIds: ['child1', 'child2', 'child3', 'child4', 'child5'],
  createdAt: new Date().toString(),
  tags: ['science', 'education'],
};
// Assume child3, child4, and child5 have similar structures to child1 and child2, but with appropriate content.

export const testNode: INodeType = {
  id: 'node1',
  data: {},
  title: 'untitled',
  position: {
    x: 100,
    y: 200,
  },
  contents: [
    {
      title: 'Text Content',
      type: 'richtext',
      content: 'This is a simple text content.',
    },
    {
      title: 'Rich Text Content',
      type: 'richtext',
      content: 'This is <b>rich text</b> content with <i>HTML</i> elements.',
    },
    // {
    //   title: 'Audio Content',
    //   type: 'audio',
    //   content: 'audio-file.mp3',
    //   preview: 'audio-preview.png',
    // },
    // {
    //   title: 'Video Content',
    //   type: 'video',
    //   content: 'video-file.mp4',
    //   preview: 'video-preview.png',
    // },
    {
      title: 'Document Content',
      type: 'document',
      content: 'document-file.pdf',
      preview: 'document-preview.png',
    },
    {
      title: 'Link Content',
      type: 'link',
      content: 'https://example.com',
    },
  ],
  parentId: null,
  childIds: ['node2', 'node3'],

  createdAt: new Date().toString(),
  tags: ['sample', 'node'],
};
