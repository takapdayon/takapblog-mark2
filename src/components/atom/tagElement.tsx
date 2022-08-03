import * as React from 'react';
import { Link } from 'gatsby';
import { FaTag } from '@react-icons/all-files/fa/FaTag';
import { getPathfromTag } from '../../utils/utils';
import 'twin.macro';
import tw from 'twin.macro';

type Props = {
  tagName: string;
  size?: number;
};

const TextSpan = tw.span`
  ml-0.5
`;

const WrapBack = tw.div`
  rounded-full mr-2 py-1 px-2 bg-gray-300
`;

const TagWrapper = tw.div`
  flex items-center text-xs lowercase
`;

const TagElement: React.FC<Props> = ({ tagName, size = 10 }) => {
  return (
    <WrapBack>
      <TagWrapper>
        <Link to={getPathfromTag(tagName)}>
          <FaTag size={size} />
          <TextSpan>{tagName}</TextSpan>
        </Link>
      </TagWrapper>
    </WrapBack>
  );
};

export default TagElement;
