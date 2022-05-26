import * as React from 'react';
import { Link } from 'gatsby';
import { FaTag } from '@react-icons/all-files/fa/FaTag';
import { getPathfromTag } from '/src/utils/utils';
import 'twin.macro';
import tw from 'twin.macro';

const TagElement: React.FC<Props> = ({ tagName, size = 10 }) => {
  return (
    <TagWrapper>
      <Link to={getPathfromTag(tagName)}>
        <FaTag size={size} />
        {tagName}
      </Link>
    </TagWrapper>
  );
};

type Props = {
  tagName: string;
  size?: number;
};

const TagWrapper = tw.div`
  inline bg-gray-300 mr-2 py-1 px-2 rounded-full text-xs lowercase text-gray-700
`;

export default TagElement;
