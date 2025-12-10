import React from 'react';
import styled from 'styled-components';
import ImageWithText from './ImageWithText';
import Education from './Education';

const AboutMeContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 2rem;
`;

const Bio = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  margin: 2.5rem auto 1rem;
  max-width: 760px;
`;

const ImagesSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const GalleryIntro = styled.p`
  font-size: 1rem;
  color: #475569;
  margin: 1rem auto 2rem;
  max-width: 760px;
`;

const Separator = styled.div`
  height: 3px;
  width: 60%;
  background: ${({ theme }) => theme.colors.text};
  opacity: 0.2;
  margin: 4rem auto;
  border-radius: 2px;
`;

const EducationSection = styled.div`
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 2rem;
  text-align: center;
`;

const images = [
  {
    imageUrl: '/images/aboutme/me-swim.jpg',
    shortText: 'Me, airborn during a dive during a national swimming competition.',
    longText: `I started swimming since the age of 11. At year 12, I decided to enter competitive swimming. 
              And 5 years later, I entered my first national competition. At 20 years old, I competed at the
              national University championship, in which I swam against Johann Ndoye-Brouard and Clément Secchy, both
              are now olympic swimmers. Although I didn't get to be an olympic athlete, my passion for this
              sport never died and never will.`,
  },
  {
    imageUrl: '/images/aboutme/me-food.jpg',
    shortText: 'Tasting my way through new places, fuelled by curiosity.  -Ramen at Kodawari Ramen',
    longText: `I’m pretty sure my spirit animal is a wandering 'snail'—always on the hunt for the next delicious adventure
              Mornings aren’t real until I’ve negotiated a peace treaty between my 'pain au chocolat' and my 'croissant', and if 'baguettes and jam'
              aren’t in my hand by lunchtime, my survival instincts kick in.
              Dinner? It’s my Oscar ceremony: 'Choucroute' as the lead, 'Tarte flambée' as the supporting act, and dessert stealing the show every single time.
              Because life’s too short not to taste the rainbow of every menu.`,
  },
  {
    imageUrl: '/images/aboutme/me-arena-defense.jpg',
    shortText: 'Sitting in the stands at Paris Arena la Défense during the Paris Olympics 2024.',
    longText: `My love for sport doesn't just end at my determination for performance. It also translates to
              a passion for competition and fascination for the power of teamwork.
              My trip to Paris made me realize how powerful a whole nation can become just to support their athletes.
              In a time with all the conflicts, a moment like the Paris 2024 Olympics, is just a joy to live through...`,
  },
];

const AboutMe = () => {
  return (
    <AboutMeContainer>
      <Title>About Me</Title>
      <ProfileImage src="/images/aboutme/photo_me.png" alt="My Photo" />
      <GalleryIntro>
        I was born on May 16, 2002 into a loving Korean family, which gave me the unique opportunity to experience both Korean and French cultures. 
        Growing up between these two worlds, I learned to blend the strong work ethic of Korea with the creativity and values of France. Over the years, 
        I’ve taken part in a wide range of activities from sports and music to community projects, that have shaped me into the person I am today.
        <br /><br />
        I am an industrial AI and automation engineer, driven by a strong motivation to solve complex industrial challenges through 
        advanced technologies. My specialization lies in artificial intelligence applied to industry, with a focus on anomaly detection, machine optimization, 
        and predictive maintenance (PHM). My background allows me to combine expertise in automation, electronics, mechanics, and computer science to 
        develop innovative and robust solutions tailored to industrial environments. Curious, detail-oriented, and results-driven, I bring full commitment 
        to every project with the goal of making a meaningful impact on operational performance.
        <br /><br />
        In 2025, I graduated valedictorian from my Master’s in Mechatronics, Energy and Intelligent Systems — a broad, multidisciplinary program covering 
        project management, mechanical design, electronics, automation, energy management and artificial intelligence. I chose to specialize in applying AI 
        directly to industrial processes, bridging the gap between advanced algorithms and real-world machinery — a background that sets me apart from traditional 
        data scientists.
      </GalleryIntro>
      <ImagesSection>
        {images.map((image, index) => (
          <ImageWithText
            key={index}
            imageUrl={image.imageUrl}
            shortText={image.shortText}
            longText={image.longText}
          />
        ))}
      </ImagesSection>
      <Bio>
        {/* The user will add their bio here */}
      </Bio>
      
      <Separator />
      
      <EducationSection>
        <SectionTitle>Education</SectionTitle>
        <Education />
      </EducationSection>

    </AboutMeContainer>
  );
};

export default AboutMe;
