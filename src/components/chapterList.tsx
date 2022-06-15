import * as React from 'react';
import styled from '@emotion/styled';
import 'twin.macro';
import tw from 'twin.macro';
import FlameWrapper from './flameWrapper';

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
      {tableOfContents.map((item, i) => {
        return (
          <div key={i}>
            <li
              style={{
                paddingLeft: depth !== 0 ? '1em' : '0',
              }}
              tw="mb-1"
            >
              <div tw="mb-1">
                <a href={item.url}>{item.title}</a>
              </div>
              {item.items && (
                <Items tableOfContents={item.items} depth={depth + 1} />
              )}
            </li>
          </div>
        );
      })}
    </ul>
  );
};

const ChapterList: React.FC<Props> = ({ tableOfContents }) => {
  return (
    <FlameWrapper>
      <div tw="p-5">
        <p tw="text-2xl mb-3">項目</p>
        <div tw="ml-2">
          <Items tableOfContents={tableOfContents} depth={0} />
        </div>
      </div>
    </FlameWrapper>
  );
};

type Props = {
  tableOfContents: TocItems[];
};

export default ChapterList;
