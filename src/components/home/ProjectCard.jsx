import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 14px;
  box-shadow: 0 14px 32px rgba(0, 0, 0, 0.14);
  overflow: hidden;
  transition: transform 0.35s ease, box-shadow 0.35s ease, filter 0.2s ease;
  cursor: ${({ interactive }) => (interactive ? 'pointer' : 'default')};
  position: relative;
  isolation: isolate;
  pointer-events: ${({ interactive }) => (interactive ? 'auto' : 'none')};
  
  display: flex;
  flex-direction: row;
  align-items: stretch;

  &:hover {
    transform: ${({ interactive }) => (interactive ? 'translateY(-8px) scale(1.01)' : 'none')};
    box-shadow: ${({ interactive }) => (interactive ? '0 24px 60px rgba(0, 0, 0, 0.2)' : '0 14px 32px rgba(0, 0, 0, 0.14)')};
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProjectImage = styled.img`
  width: 35%;
  min-width: 250px;
  aspect-ratio: 1/1; /* Force square aspect ratio */
  object-fit: cover;
  filter: saturate(1.02);

  @media (max-width: 768px) {
    width: 100%;
    aspect-ratio: 1/1; /* Ensure square aspect ratio on smaller screens too */
  }
`;

const ProjectInfo = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
`;

const TagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.1rem;
`;

const TagBadge = styled.span`
  background: ${({ color }) => color || '#e2e8f0'};
  color: #0f172a;
  padding: 0.35rem 0.55rem;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.6);
`;

const Timeline = styled.div`
  margin-top: 0.75rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 700;
  color: #0f172a;
  background: #eef2ff;
  padding: 0.35rem 0.6rem;
  border-radius: 10px;
  font-size: 0.9rem;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
  align-self: flex-start; /* Prevents stretching in flex column */
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  background: #6366f1;
  border-radius: 50%;
`;

const ProjectCard = ({
  title,
  description,
  imageUrl,
  tags = [],
  tagColors = {},
  timeline,
  interactive = true,
}) => {
  return (
    <Card interactive={interactive}>
      <ProjectImage src={imageUrl} alt={title} />
      <ProjectInfo>
        <ProjectTitle>{title}</ProjectTitle>
        <ProjectDescription>{description}</ProjectDescription>
        {tags.length > 0 && (
          <TagsRow>
            {tags.map((tag) => (
              <TagBadge key={tag} color={tagColors[tag]}>
                {tag}
              </TagBadge>
            ))}
          </TagsRow>
        )}
        {timeline && (
          <Timeline>
            <Dot />
            {timeline}
          </Timeline>
        )}
      </ProjectInfo>
    </Card>
  );
};

export default ProjectCard;
