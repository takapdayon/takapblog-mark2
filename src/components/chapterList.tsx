import * as React from 'react';
import styled from '@emotion/styled';
import 'twin.macro';
import tw from 'twin.macro';

type ItemsProps = {
  tableOfContents: TocItems[];
  depth: number;
};

export type TocItems = {
  url: string;
  title: string;
  items?: TocItems[];
};

const Items: React.FC<ItemsProps> = ({ tableOfContents, depth }) => {
  return (
    <ul>
      {tableOfContents.map(item => (
        <li
          key={item.url}
          style={{
            paddingLeft: depth !== 0 ? '1em' : '0',
          }}
        >
          <a href={item.url}>{item.title}</a>
          {item.items && (
            <Items tableOfContents={item.items} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
};

const ChapterList: React.FC<Props> = ({ tableOfContents }) => {
  return (
    <div>
      目次
      <Items tableOfContents={tableOfContents} depth={0} />
    </div>
  );
};

type Props = {
  tableOfContents: TocItems[];
};

export default ChapterList;
