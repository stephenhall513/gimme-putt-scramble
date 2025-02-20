import Image from 'next/image';

interface EventLogoProps {
  src: string;
  alt: string;
}

const EventLogo: React.FC<EventLogoProps> = ({ src, alt }) => {
  return <Image src={src} alt={alt} width={200} height={100} />;
};

export default EventLogo;
