import React, { useState } from 'react';
import { TextInput, Menu, Autocomplete } from '@mantine/core';
import { INodeContentTypes } from './types';


// Define the type for menu items
type MenuItem = {
  label: string;
  value: INodeContentTypes;
};

const menuItems: MenuItem[] = [
  { label: 'Text', value: 'richtext' },
  { label: 'Image', value: 'image' },
  // { label: 'Video', value: 'video' },
  { label: 'Document', value: 'document' },
  // { label: 'Table', value: 'table' },
  // { label: 'Poll', value: 'poll' },
];
const InputWithSlashCommand: React.FC = () => {

  // // Handle input change
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   setInputValue(value);

  //   // Show menu if the first character is "/" and hide otherwise
  //   setShowMenu(value.startsWith('/'));
  // };

  // // Handle menu item selection
  // const handleSelect = (item: MenuItem) => {
  //   // Append selected item to input value or replace the current value
  //   // Adjust according to your needs
  //   setInputValue(item.label);
  //   setShowMenu(false); // Hide menu after selection
  // };

  return (
    <div>
      <Autocomplete
        placeholder="enter anything"
        value=''
        data={menuItems}
      />
      {/* {showMenu && (
        <Menu
          width={200}
          position="bottom-end"
          transitionProps={{
            transition: 'pop-top-right',
          }}
          onClose={() => setShowMenu(false)}
          onOpen={() => setShowMenu(true)}
        >
          {menuItems.map((item, index) => (
            <Menu.Item key={index} onClick={() => handleSelect(item)}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      )} */}
    </div>
  );
};

export default InputWithSlashCommand;
