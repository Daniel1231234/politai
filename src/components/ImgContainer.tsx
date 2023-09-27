import { CldImage } from "next-cloudinary"

interface ImgContainerProps {
  publicId: any
}

const ImgContainer: React.FC<ImgContainerProps> = ({ publicId }) => {
  return (
    <CldImage
      src={publicId}
      alt={`photo-${publicId}`}
      width="300"
      height="300"
      fillBackground
    />
  )
}

export default ImgContainer
