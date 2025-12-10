import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.18);
  max-height: ${({ expanded, contentHeight }) => (expanded ? `${260 + contentHeight}px` : '260px')};
  transition: max-height 0.45s ease, transform 0.3s ease, box-shadow 0.3s ease;
  background: #0b1520;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 48px rgba(0, 0, 0, 0.22);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: filter 0.35s ease;
  filter: ${({ dimmed }) => (dimmed ? 'grayscale(100%) brightness(0.7)' : 'none')};
`;

const TextOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.2));
  color: #e2e8f0;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const ShortText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MoreHint = styled.span`
  font-size: 0.9rem;
  color: #cbd5e1;
  margin-top: 0.4rem;
  display: inline-block;
  opacity: 0.9;
`;

const LongTextPanel = styled.div`
  background: #ffffff;
  color: #1f2937;
  max-height: ${({ expanded, contentHeight }) => (expanded ? `${contentHeight}px` : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  padding: ${({ expanded }) => (expanded ? '1.15rem 1.1rem 1.35rem' : '0 1.1rem')};
  border-top: 1px solid #e5e7eb;
  line-height: 1.5;
`;

const InnerContent = styled.div`
  /* Wrapper to measure content height */
`;

const ImageWithText = ({ imageUrl, shortText, longText }) => {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef(null);

  const calculateHeight = () => {
    if (contentRef.current) {
      // Calculate height of the text content + estimated padding of the container (approx 50px for top+bottom)
      setContentHeight(contentRef.current.offsetHeight + 50);
    }
  };

  useEffect(() => {
    calculateHeight();
    window.addEventListener('resize', calculateHeight);
    return () => window.removeEventListener('resize', calculateHeight);
  }, [longText]);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  return (
    <ImageContainer
      expanded={expanded}
      contentHeight={contentHeight}
      onClick={toggleExpanded}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image src={imageUrl} alt={shortText} dimmed={hovered || expanded} />
      <TextOverlay visible={hovered && !expanded}>
        <ShortText>{shortText}</ShortText>
        {!expanded && <MoreHint>Click to read more</MoreHint>}
      </TextOverlay>
      <LongTextPanel expanded={expanded} contentHeight={contentHeight}>
        <InnerContent ref={contentRef}>
          {longText}
        </InnerContent>
      </LongTextPanel>
    </ImageContainer>
  );
};

export default ImageWithText;