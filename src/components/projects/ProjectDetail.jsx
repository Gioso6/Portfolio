import React from 'react';
import styled from 'styled-components';

const DetailContainer = styled.div`
  position: relative;
  padding: 3rem 2.5rem 3.5rem;
  max-width: 1100px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 1rem;
  background: #0f172a;
  color: #ffffff;
  border: none;
  border-radius: 50px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.22);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.25s ease, background 0.25s ease;
  position: sticky;
  top: 0;
  z-index: 2;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.28);
    background: #111827;
  }
`;

const Arrow = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  border-top: 2px solid currentColor;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
`;

const ProjectTitle = styled.h1`
  font-size: 2.6rem;
  margin: 1.5rem 0 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0.25rem 0 1.5rem;
`;

const TagBadge = styled.span`
  background: ${({ color }) => color || '#e2e8f0'};
  color: #0f172a;
  padding: 0.4rem 0.75rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
`;

const TimelineBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #eef2ff;
  color: #111827;
  padding: 0.45rem 0.75rem;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.95rem;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6366f1;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 75%;
  max-width: 960px;
  margin: 1rem auto 2rem;
  border-radius: 16px;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  aspect-ratio: 1/1; /* Force square aspect ratio */
  object-fit: cover; /* Crop and center */
  display: block;
`;

const ProjectDescription = styled.div`
  font-size: 1.2rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 auto;
  max-width: 900px;

  p {
    margin-bottom: 1.5rem;
  }

  h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
  }

  ul {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  img, video {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 2rem auto;
    border-radius: 8px;
  }
`;

const ProjectDetail = ({ project, onBack, tagColors = {} }) => {
  return (
    <DetailContainer>
      <BackButton onClick={onBack}>
        <Arrow />
        Back to list
      </BackButton>
      <ProjectTitle>{project.title}</ProjectTitle>
      <TagRow>
        {project.tags?.map((tag) => (
          <TagBadge key={tag} color={tagColors[tag]}>
            {tag}
          </TagBadge>
        ))}
        {project.timeline && (
          <TimelineBadge>
            <Dot />
            {project.timeline}
          </TimelineBadge>
        )}
      </TagRow>
      
      <ImageWrapper>
        <ProjectImage src={project.imageUrl} alt={project.title} />
      </ImageWrapper>

      <ProjectDescription>{project.longDescription}</ProjectDescription>
    </DetailContainer>
  );
};

export default ProjectDetail;
